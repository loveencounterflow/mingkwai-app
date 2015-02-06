

############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
# #...........................................................................................................
# TEXT                      = require 'coffeenode-text'
# TYPES                     = require 'coffeenode-types'
# BNP                       = require 'coffeenode-bitsnpieces'
#...........................................................................................................
CND                       = require 'coffeenode-trm'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/linesetter'
log                       = CND.get_logger 'plain',   badge
info                      = CND.get_logger 'info',    badge
alert                     = CND.get_logger 'alert',   badge
debug                     = CND.get_logger 'debug',   badge
warn                      = CND.get_logger 'warn',    badge
urge                      = CND.get_logger 'urge',    badge
whisper                   = CND.get_logger 'whisper', badge
help                      = CND.get_logger 'help',    badge
echo                      = CND.echo.bind CND
#...........................................................................................................
# NW                        = require 'nw.gui'
# win                       = NW.Window.get()
#...........................................................................................................
suspend                   = require 'coffeenode-suspend'
step                      = suspend.step
after                     = suspend.after
sleep                     = suspend.sleep
#...........................................................................................................
D2                        = require 'pipedreams2'
remit                     = D2.remit.bind D2
# CHR                       = require 'coffeenode-chr'
Htmlparser                = ( require 'htmlparser2' ).Parser
TEACUP                    = require 'coffeenode-teacup'
#...........................................................................................................
### https://github.com/devongovett/linebreak ###
LineBreaker               = require 'linebreak'
#...........................................................................................................
# npm install hypher hyphenation.en-us
### https://github.com/bramstein/hypher ###
hyphenate                   = null
do ->
  _Hypher                     = require 'hypher'
  _hypher_english             = require 'hyphenation.en-us'
  _HYPHER                     = new _Hypher _hypher_english
  hyphenate                   = _HYPHER.hyphenateText.bind _HYPHER

# #-----------------------------------------------------------------------------------------------------------
# ### TAINT workaround to obtain web browser context;
# see https://github.com/nwjs/nw.js/wiki/Differences-of-JavaScript-contexts ###
# @LINESETTER = {}



#-----------------------------------------------------------------------------------------------------------
partition_text = ( text ) ->
  line_breaker  = new LineBreaker text
  breakpoint    = null
  R             = []
  while breakpoint = line_breaker.nextBreak()
    R.push text[ ... breakpoint.position ]
  return R

#-----------------------------------------------------------------------------------------------------------
render_open_tag = ( name, attributes ) ->
  return ( TEACUP.render => TEACUP.TAG name, attributes ).replace /<\/[^>]+>$/, ''

#-----------------------------------------------------------------------------------------------------------
render_close_tag = ( name ) ->
  return "</#{name}>"

#-----------------------------------------------------------------------------------------------------------
new_html_parser = ( settings, stream ) ->
  lone_tags = """area base br col command embed hr img input keygen link meta param
    source track wbr""".split /\s+/
  #.........................................................................................................
  handlers =
    #.......................................................................................................
    onopentag:  ( name, attributes )  ->
      if name in lone_tags
        stream.write [ 'lone-tag', [ name, attributes, ] ]
      else
        stream.write [ 'open-tag', [ name, attributes, ] ]
    #.......................................................................................................
    onclosetag: ( name ) ->
      unless name in lone_tags
        stream.write [ 'close-tag', name, ]
    #.......................................................................................................
    ontext: ( text ) ->
      stream.write [ 'text', text, ]
    #.......................................................................................................
    onend: ->
      stream.write [ 'end', ]; stream.end()
    #.......................................................................................................
    onerror: ( error ) ->
      throw error
  #.........................................................................................................
  return new Htmlparser handlers, settings

#-----------------------------------------------------------------------------------------------------------
$distribute_lines = ( test_line, send_line, done ) ->
  last_opener = ''
  buffer      = []
  last_idx    = 0
  overflows   = no
  #---------------------------------------------------------------------------------------------------------
  return remit ( event, send, end ) =>
    [ type, data, pending_tags, ] = event
    switch type
      #.....................................................................................................
      when 'end'
        send event
      #.....................................................................................................
      when 'text-parts'
        closer  = ( render_close_tag name for name in pending_tags ).join ''
        prefix  = last_opener.replace /\xad$/, '-'
        idx     = -1
        parts   = data
        # for part, idx in data
        loop
          idx        += +1
          part        = parts[ idx ]
          break unless part?
          ### TAINT must escape HTML-sensitive characters; NCRs? ###
          opener      = prefix + part
          probe_part  = part.replace /\xad$/, '-'
          probe_part  = probe_part.replace /\x20+$/, ''
          probe       = prefix + probe_part + closer
          overflows   = test_line probe
          debug '©xlcUa', parts, idx
          if overflows
            warn buffer[ buffer.length - 1 ]
            # debug '©xlcUa', parts, idx
            chr_count = parts[ idx - 1 ].length
            parts.splice 0, idx
            for sub_part, sub_idx in parts
              parts[ sub_idx ] = sub_part[ chr_count .. ]
            idx = -1
            ### TAINT need not buffer all candidates ###
            send_line buffer[ buffer.length - 2 ][ 6 ]
          buffer.push [ opener, closer, part, parts, idx, overflows, probe, ]
          last_opener = opener
      #.....................................................................................................
      when 'open-tag'
        opener      = last_opener + render_open_tag data...
        closer      = ( render_close_tag name for name in pending_tags ).join ''
        probe       = opener + closer
        overflows   = test_line probe
        if overflows
          warn buffer[ buffer.length - 1 ]
        buffer.push [ opener, closer, null, null, null, overflows, probe, ]
        last_opener = opener
      #.....................................................................................................
      when 'close-tag'
        opener      = last_opener + render_close_tag data
        closer      = ( render_close_tag name for name in pending_tags ).join ''
        probe       = opener + closer
        # buffer.push [ opener, closer, null, ]
        last_opener = opener
      #.....................................................................................................
      else
        warn "ignoring #{type}"
    #.......................................................................................................
    if end?
      send_line null
      done()
      end()

#-----------------------------------------------------------------------------------------------------------
@set_lines = ( source, test_line, send_line, done ) ->
  settings    = decodeEntities: yes
  stream      = D2.create_throughstream()
  html_parser = new_html_parser settings, stream
  html_parser.write source
  html_parser.end()
  stream
    .pipe $join_text_nodes()
    .pipe $hyphenate()
    .pipe $collect_tags()
    .pipe D2.$show()
    .pipe $split_texts()
    .pipe $distribute_lines test_line, send_line, done
    .pipe D2.$on_end ( send, end ) =>
      end()

#-----------------------------------------------------------------------------------------------------------
$join_text_nodes = ->
  ### Make sure that all the text content of a given range of the source is represented by a single text
  node; in the browser, this is done using
  [node.normalize()](https://developer.mozilla.org/en-US/docs/Web/API/Node.normalize). ###
  buffer = []
  return remit ( event, send, end ) ->
    #.......................................................................................................
    if event?
      [ type, tail..., ] = event
      if type is 'text'
        buffer.push tail[ 0 ]
      else
        send [ 'text', buffer.join '', ] if buffer.length > 0
        buffer.length = 0
        send event
    #.......................................................................................................
    if end?
      send [ 'text', buffer.join '', ] if buffer.length > 0
      end()

#-----------------------------------------------------------------------------------------------------------
$hyphenate = ->
  ### TAINT must allow language settings ###
  return remit ( event, send ) ->
    [ type, tail..., ] = event
    if type is 'text'
      send [ 'text', hyphenate tail[ 0 ], ]
    else
      send event

#-----------------------------------------------------------------------------------------------------------
$collect_tags = ->
  pending_tag_buffer = []
  #.........................................................................................................
  return remit ( event, send ) ->
    [ type, tail..., ] = event
    if type is 'open-tag'
      pending_tag_buffer.unshift tail[ 0 ][ 0 ]
    else if type is 'close-tag'
      pending_tag_buffer.shift()
    unless type is 'end'
      event.push pending_tag_buffer[ .. ]
    send event

#-----------------------------------------------------------------------------------------------------------
$split_texts = ->
  #.........................................................................................................
  return remit ( event, send ) ->
    [ type, tail..., ] = event
    if type is 'text'
      text  = tail[ 0 ]
      parts = partition_text text
      send [ 'text-parts', parts, tail[ 1 ] ]
    else
      send event

# #-----------------------------------------------------------------------------------------------------------
# @demo = ( test_line ) ->
#   source = """<p>The <b class='x'>Dormouse</b> <u>was <i>inexplicably</i> falling asleep</u> <i>again</i>.</p>"""
#   source = """The <b class='x'>Dormouse</b> <u>was <i>inexplicably</i> falling asleep</u> <i>again</i>."""
#   try_htmlparser2 source, test_line


# ############################################################################################################
# unless module.parent?
#   source = """A<span><b><i>B</i>C</b></span>D"""
#   source = """foo <span><b><i>is it</i><br> &#x0061;</b>&jzr#xe000; x < y  really</span> baz"""
#   source = """<p>The <b class='x'>Dormouse</b> <u>was <i>inexplicably</i> falling asleep</u> <i>again</i>.</p>"""
#   try_htmlparser2 source

  # text = """The Dormouse had
  #       closed its eyes by this time, and was going off into
  #       a doze;
  #       """
  #       # but, on being pinched by the Hatter, it woke up again with
  #       # a little shriek, and went on: '—that begins with an M, such as
  #       # mouse-traps, and the moon, and memory, and muchness—you know you say
  #       # things are "much of a muchness"—did you ever see such a thing as a
  #       # drawing of a muchness?'
  # text = hyphenate text


###

foo <b><i>is it</i> really</b> baz

'foo'
'foo', ' '
'foo', ' ', <b><i>, 'is', ⬇, ⬇
'foo', ' ', <b><i>, 'is', ' ', ⬇, ⬇
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ⬇
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', ⬇
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', 'really', ⬇
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', 'really', ⬇, ' '
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', 'really', ⬇, ' ', 'baz'

'foo'
'foo '
'foo <b><i>is</i></b>'
'foo <b><i>is </i></b>'
'foo <b><i>is it</i></b>'
'foo <b><i>is it</i> </b>'
'foo <b><i>is it</i> really</b>'
'foo <b><i>is it</i> really</b> '
'foo <b><i>is it</i> really</b> baz'


###
