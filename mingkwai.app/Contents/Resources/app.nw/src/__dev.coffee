
( require 'guy-trace' ).limit 10


############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
# #...........................................................................................................
# TEXT                      = require 'coffeenode-text'
# TYPES                     = require 'coffeenode-types'
# BNP                       = require 'coffeenode-bitsnpieces'
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/browser'
log                       = CND.get_logger 'plain',   badge
info                      = CND.get_logger 'info',    badge
alert                     = CND.get_logger 'alert',   badge
debug                     = CND.get_logger 'debug',   badge
warn                      = CND.get_logger 'warn',    badge
urge                      = CND.get_logger 'urge',    badge
whisper                   = CND.get_logger 'whisper', badge
help                      = CND.get_logger 'help',    badge
echo                      = CND.echo.bind CND
# #...........................................................................................................
# suspend                   = require 'coffeenode-suspend'
# step                      = suspend.step
# after                     = suspend.after
# sleep                     = suspend.sleep
#...........................................................................................................
D2                        = require 'pipedreams2'
D                         = require 'pipedreams'
$                         = D2.remit.bind D2
TEACUP                    = require 'coffeenode-teacup'
_XXX_id                   = ( require 'jsoid' ).new_jsoid()
LODASH                    = require 'lodash'

#-----------------------------------------------------------------------------------------------------------
D2.new_hyphenator = ( hyphenation = null, min_length = 4 ) ->
  ### https://github.com/bramstein/hypher ###
  Hypher        = require 'hypher'
  hyphenation  ?= require 'hyphenation.en-us'
  HYPHER        = new Hypher hyphenation
  return HYPHER.hyphenateText.bind HYPHER

#-----------------------------------------------------------------------------------------------------------
D2.$hyphenate = ( hyphenation = null, min_length = 4 ) ->
  hyphenate = @new_hyphenator hyphenation, min_length
  return $ ( text, send ) => send hyphenate text, min_length

#-----------------------------------------------------------------------------------------------------------
D2.break_lines = ( text, settings ) ->
  LineBreaker     = require 'linebreak'
  last_position   = null
  incremental     = settings?[ 'incremental'  ] ? yes
  extended        = settings?[ 'extended'     ] ? no
  #.........................................................................................................
  line_breaker    = new LineBreaker text
  R               = []
  #.......................................................................................................
  while breakpoint = line_breaker.nextBreak()
    { position, required, } = breakpoint
    #.....................................................................................................
    if incremental and last_position? then  part = text[ last_position ... breakpoint.position ]
    else                                    part = text[               ... breakpoint.position ]
    last_position = position
    R.push if extended then [ part, required, position, ] else part
  #.......................................................................................................
  return R

#-----------------------------------------------------------------------------------------------------------
D2.$break_lines = ( settings ) ->
  ### Uses the [linebreak](https://github.com/devongovett/linebreak) module to find line break opportunities
  in a text using the Unicode Line Breaking Algorithm (UAX #14). For each text that arrives in the stream,
  `$break_lines` will send out one ore more 'events' (lists) of the format

  ```
  [ 'line-breaker-part', idx, part, required, position, ]
  ```

  where the first part identifies the event type, `idx` is a running enumeration of texts that have arrived,
  `part` is part of the text in question, `required` indicates whether a line break after that part is
  optional or required, and `position` contains the index of the first character *after* the current `part`.

  When `incremental` is set to `true`, then `part` will be the next substring after which a linebreak is
  possible; when `incremental` is set to `false` (the default), then `part` will contain the entire
  text up to the breakpoint; therefore, given a text `'So. Here we go!'`, the events will be either
  (with `incremental` set to `false`):

  ```coffee
  [ 'line-breaker-part', 0, 'So. ', false, 4 ]
  [ 'line-breaker-part', 0, 'Here ', false, 9 ]
  [ 'line-breaker-part', 0, 'we ', false, 12 ]
  [ 'line-breaker-part', 0, 'go!', false, 15 ]
  [ 'line-breaker-part', 0, null, null, null ]
  ```

  or (with `incremental` set to `true`):

  ```coffee
  [ 'line-breaker-part', 0, 'So. ', false, 4 ]
  [ 'line-breaker-part', 0, 'So. Here ', false, 9 ]
  [ 'line-breaker-part', 0, 'So. Here we ', false, 12 ]
  [ 'line-breaker-part', 0, 'So. Here we go!', false, 15 ]
  [ 'line-breaker-part', 0, null, null, null ]
  ```

  ###
  #.........................................................................................................
  ### https://github.com/devongovett/linebreak ###
  LineBreaker     = require 'linebreak'
  idx             = -1
  last_position   = null
  incremental     = settings?[ 'incremental'  ] ? yes
  #.........................................................................................................
  return $ ( text, send ) =>
    idx          += +1
    line_breaker  = new LineBreaker text
    breakpoint    = null
    #.......................................................................................................
    while breakpoint = line_breaker.nextBreak()
      { position, required, } = breakpoint
      #.....................................................................................................
      if incremental and last_position? then  part = text[ last_position ... breakpoint.position ]
      else                                    part = text[               ... breakpoint.position ]
      last_position = position
      send [ 'line-breaker-part', idx, part, required, position, ]
    #.......................................................................................................
    send [ 'line-breaker-part', idx, null, null, null, ]

  # normalize       = settings?[ 'normalize'    ] ? no
  # #.........................................................................................................
  # if normalize and not CND.isa_function normalize
  #   normalize = ( text ) ->
  #     R = text
  #     R = R.replace /\s+$/,  ''
  #     R = R.replace /\xad$/, '-'
  #     R = R.replace /\xad/g, ''
  #     return R
      # part          = normalize part if normalize


#-----------------------------------------------------------------------------------------------------------
D2._new_html_parser = ( settings, stream ) ->
  ### NB.: Will not send empty text nodes; will not join ('normalize') adjacent text nodes. ###
  lone_tags = """area base br col command embed hr img input keygen link meta param
    source track wbr""".split /\s+/
  #.........................................................................................................
  handlers =
    #.......................................................................................................
    onopentag:  ( name, attributes )  ->
      if name in lone_tags
        if name is 'wbr'
          throw new Error "illegal <wbr> tag with attributes" if ( Object.keys attributes ).length > 0
          ### as per https://developer.mozilla.org/en/docs/Web/HTML/Element/wbr ###
          stream.write [ 'text', '\u200b' ]
        else
          stream.write [ 'lone-tag', name, attributes, ]
      else
        stream.write [ 'open-tag', name, attributes, ]
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
  Htmlparser = ( require 'htmlparser2' ).Parser
  return new Htmlparser handlers, settings

#-----------------------------------------------------------------------------------------------------------
D2.$parse_html = ->
  settings    = decodeEntities: yes
  stream      = D2.create_throughstream()
  html_parser = @_new_html_parser settings, stream
  _send       = null
  #.........................................................................................................
  stream.on 'data', ( data ) -> _send data
  stream.on 'end',           -> _send.end()
  #.........................................................................................................
  return $ ( source, send, end ) =>
    _send = send
    if source?
      html_parser.write source
    if end?
      html_parser.end()

#-----------------------------------------------------------------------------------------------------------
$collect_closing_tags = ->
  ### Keeps trace of all opened tags and adds a list to each event that speels out the names of tags to be
  closed at that point; that list anticipates all the `close-tag` events that are due to arrive later in the
  stream. ###
  pending_tag_buffer = []
  #.........................................................................................................
  return $ ( event, send ) ->
    # debug '©LTGTp', event
    [ type, tail..., ] = event
    if type is 'open-tag'
      pending_tag_buffer.unshift tail[ 0 ][ 0 ]
    else if type is 'close-tag'
      pending_tag_buffer.shift()
    unless type is 'end'
      event.push pending_tag_buffer[ .. ]
    send event

#-----------------------------------------------------------------------------------------------------------
$collect_texts = ->
  text_buffer = []
  _send       = null
  #.........................................................................................................
  send_buffer = ->
    if text_buffer.length > 0
      _send [ 'text', text_buffer.join '', ]
      text_buffer.length = 0
  #.........................................................................................................
  return $ ( event, send ) ->
    _send               = send
    [ type, tail..., ]  = event
    if type is 'text'
      text_buffer.push tail[ 0 ]
    else
      send_buffer()
      send event

#-----------------------------------------------------------------------------------------------------------
$collect_empty_tags = ->
  ### Detects situations where an openening tag is directly followed by a closing tag, such as in `foo
  <span class='x'></span> bar`, and turns such occurrances into single `empty-tag` events to simplifiy
  further processing. ###
  last_event = null
  #.........................................................................................................
  return $ ( event, send ) ->
    [ type, tail..., ] = event
    if type is 'open-tag'
      send last_event if last_event?
      last_event = event
      return
    if type is 'close-tag' and last_event?
      send [ 'empty-tag', last_event[ 1 .. ]..., ]
      last_event = null
      return
    if last_event?
      send last_event
      last_event = null
    send event

#-----------------------------------------------------------------------------------------------------------
$hyphenate = ( P... ) ->
  hyphenate = D2.new_hyphenator P...
  #.........................................................................................................
  return $ ( event, send ) ->
    event[ 1 ] = hyphenate event[ 1 ] if event[ 0 ] is 'text'
    send event

#-----------------------------------------------------------------------------------------------------------
$break_lines = ->
  #.........................................................................................................
  return $ ( event, send ) ->
    if event[ 0 ] is 'text'
      event[ 0 ]  = 'text-parts'
      event[ 1 ]  = D2.break_lines event[ 1 ], { incremental: yes, }
    send event

#-----------------------------------------------------------------------------------------------------------
$test_lines = ( state ) ->
  buffer = []
  xxxxx = no
  return $ ( event, send ) =>
    # debug '©rvekb', event
    [ type, tail..., ] = event
    return if xxxxx
    #.......................................................................................................
    switch type
      #.....................................................................................................
      when 'open-tag', 'close-tag'
        buffer.push event
      #.....................................................................................................
      when 'text-parts'
        [ text_parts
          close_tags ] = tail
        for text_part, idx in text_parts
          # do ( text_part ) =>
          #   setImmediate =>
          buffer.push text_part
          debug '©REf0J', ( JSON.stringify buffer ), state[ 'next' ]
          break if state[ 'next' ]
          send buffer
      #.....................................................................................................
      when 'empty-tag', 'lone-tag'
        buffer.push event
        send buffer
      #.....................................................................................................
      else
        warn 'A', "ignored event of type #{rpr type}"
    #.......................................................................................................
    if state[ 'next' ]
      xxxxx = true

### -> LINESETTER ###
#-----------------------------------------------------------------------------------------------------------
render_open_tag = ( name, attributes ) ->
  return ( render_empty_tag name, attributes ).replace /<\/[^>]+>$/, ''

#-----------------------------------------------------------------------------------------------------------
render_close_tag = ( name ) ->
  return "</#{name}>"

#-----------------------------------------------------------------------------------------------------------
render_empty_tag = ( name, attributes ) ->
  ### NB `teacup` has a bug (IMHO) that causes it to modify the `attributes` object when rendering; to
  prevent it from modifying buffered elements, we always pass it a copy of the `attributes` POD. ###
  return TEACUP.render => TEACUP.TAG name, LODASH.clone attributes


#-----------------------------------------------------------------------------------------------------------
@demo_3 = ->
  text = """So. Here we go!"""
  text = """Just as she <b><i>said</i></b> this, she noticed that <i>one of the trees had a door
          leading right into it.</i> 'That's very curious!' she thought. 'But
          everything's curious today. I think I may as well go in at once.' And in
          she &#x4e00; went."""
  text = """x <span class='x'></span> y"""
  text = """<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she explained."""
  #.........................................................................................................
  input = D2.create_throughstream()
  input
    .pipe D2.$parse_html()
    .pipe $collect_texts()
    # .pipe $collect_closing_tags()
    .pipe $collect_empty_tags()
    .pipe $hyphenate()
    .pipe $break_lines()
    .pipe D2.$sub ( source, sink, state ) ->
      source
        .pipe $test_lines state
        .pipe do =>
          line      = []
          return $ ( line_parts, send ) ->
            chr_count = 0
            open_tags = []
            line      = []
            last_line = null
            if ( line_parts[ 1 ]?[ 2 ] )?
              line_parts[ 1 ]?[ 2 ][ 'foo' ] = 'baz'
            # warn '©QnEBe', line_parts, _XXX_id line_parts[ 1 ]?[ 2 ]
            for line_part, idx in line_parts
              if CND.isa_text line_part
                line.push line_part
                chr_count += line_part.length
              else
                [ type, tail..., ] = line_part
                switch type
                  when 'open-tag'
                    line.push render_open_tag tail...
                    open_tags.unshift line_part[ 1 ]
                  when 'close-tag'
                    line.push render_close_tag tail[ 0 ]
                    open_tags.shift()
                  when 'lone-tag'
                    line.push render_open_tag tail...
                  when 'empty-tag'
                    # help '©WozZo', JSON.stringify line_parts
                    line.push render_empty_tag tail...
                  else
                    warn 'B', "ignored event of type #{rpr type}"
            if chr_count > 15
              state[ 'next' ] = yes
              source.write [ 'next', ]
            for open_tag in open_tags
              line.push render_close_tag open_tag
            urge '©TNH8e', chr_count, if line? then line.join '' else '### no line yet ###'
            # debug '©QTjvy', ( JSON.stringify line_parts ), chr_count
        .pipe sink
    .pipe D2.$show()
    # .pipe D2.$sub ( source, sink ) ->
    #   source
    #     .pipe D2.$break_lines yes
    #     #...................................................................................................
    #     .pipe do =>
    #       line      = []
    #       chr_count = 0
    #       return $ ( event, send ) ->
    #         [ type, idx, part, required, position, ] = event
    #         if type is 'line-breaker-part'
    #           # whisper event
    #           if part?
    #             chr_count += part.length
    #             if chr_count > 25
    #               send line.join ''
    #               line.length = 0
    #               chr_count   = part.length
    #             line.push part
    #           else
    #             if line.length > 0
    #               send line.join ''
    #             ### TAINT not correct with multiple texts? ###
    #             source.end()
    #         #...............................................................................................
    #         else
    #           send event
    #     #...................................................................................................
    #     .pipe $ ( line, send ) =>
    #       help line.replace /\s+/g, ' '
    #       send line
    #     .pipe sink
    # #.......................................................................................................

  #---------------------------------------------------------------------------------------------------------
  input.write text
  input.end()

#-----------------------------------------------------------------------------------------------------------
@demo_1 = ->
  text = """So. Here we go!"""
  text = """It's supercalifragilistic, she explained."""
  text = """Just as she said this, she noticed that one of the trees had a door
          leading right into it. 'That's very curious!' she thought. 'But
          everything's curious today. I think I may as well go in at once.' And in
          she went."""
  #.........................................................................................................
  input = D2.create_throughstream()
  input
    .pipe D2.$hyphenate()
    .pipe D2.$sub ( source, sink ) ->
      source
        .pipe D2.$break_lines { incremental: yes, }
        #...................................................................................................
        .pipe do =>
          line      = []
          chr_count = 0
          return $ ( event, send ) ->
            [ type, idx, part, required, position, ] = event
            if type is 'line-breaker-part'
              # whisper event
              if part?
                chr_count += part.length
                if chr_count > 25
                  send line.join ''
                  line.length = 0
                  chr_count   = part.length
                line.push part
              else
                if line.length > 0
                  send line.join ''
                ### TAINT not correct with multiple texts? ###
                source.end()
            #...............................................................................................
            else
              send event
        #...................................................................................................
        .pipe $ ( line, send ) =>
          help line.replace /\s+/g, ' '
          send line
        .pipe sink
    #.......................................................................................................

  #---------------------------------------------------------------------------------------------------------
  input.write text
  input.end()

#-----------------------------------------------------------------------------------------------------------
@demo_2 = ->
  input     = D2.create_throughstream()
  epsilon   = 0.1
  # _end    = null
  has_ended = {}
  #.........................................................................................................
  input
    .pipe D2.$sub ( source, sink, XXX_end ) ->
      source
        .pipe $ ( n, send ) ->
          send Math.sqrt n
        .pipe $ ( n, send ) ->
          whisper "(#{n})"
          if ( Math.abs n - 1 ) < epsilon
            send n
            source.end() if source.ended
          else
            source.write n
        .pipe sink
    .pipe D2.$show()
    .pipe D.$on_end -> urge 'ok'
  #.........................................................................................................
  for n in [ 3, 4, 1e6,  0.1, ]
    input.write n
  input.end()


############################################################################################################
unless module.parent?
  # @demo_1()
  # @demo_2()
  @demo_3()












