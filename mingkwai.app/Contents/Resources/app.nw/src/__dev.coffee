
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
badge                     = '眀快排字机/__dev'
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
$disperse_texts = ->
  #.........................................................................................................
  return $ ( event, send ) ->
    [ type, tail..., ]  = event
    if type is 'text-parts'
      for text_part in tail[ 0 ]
        send [ 'text-part', text_part, ]
    else
      send event

#-----------------------------------------------------------------------------------------------------------
prune_buffer = ( buffer, last_buffer_length ) ->
  closed_tag_count = 0
  #........................................................................................................
  for idx in [ last_buffer_length - 1 .. 0 ] by -1
    [ type, tail..., ] = buffer[ idx ]
    switch type
      #.....................................................................................................
      when 'text-part', 'empty-tag', 'lone-tag'
        buffer.splice idx, 1
      #.....................................................................................................
      when 'close-tag'
        buffer.splice idx, 1
        closed_tag_count += +1
      #.....................................................................................................
      when 'open-tag'
        if closed_tag_count > 0
          buffer.splice idx, 1
          closed_tag_count += -1
      #.....................................................................................................
      else
        warn "ignored event of type #{rpr type}"
  #........................................................................................................
  return buffer

#-----------------------------------------------------------------------------------------------------------
$produce_lines = ( source, state ) ->
  buffer          = []
  last_buffer     = null
  state[ 'next' ] = no
  #.........................................................................................................
  f = ( event, send ) =>
    [ type, tail..., ] = event
    debug '©Hbbu8', state[ 'next' ], JSON.stringify tail
    #.......................................................................................................
    if state[ 'next' ]
      throw new Error "should never happen" unless last_buffer?
      state[ 'next' ] = no
      send [ 'set-line', last_buffer, ]
      prune_buffer buffer, last_buffer.length
      last_buffer     = null
    #.......................................................................................................
    switch type
      #.....................................................................................................
      when 'open-tag', 'close-tag'
        buffer.push event
      #.....................................................................................................
      when 'lone-tag', 'empty-tag'
        buffer.push event
        last_buffer = LODASH.clone buffer
        send [ 'test-line', buffer, ]
      #.....................................................................................................
      when 'text-part'
        buffer.push event
        last_buffer = LODASH.clone buffer
        send [ 'test-line', buffer, ]
  #.........................................................................................................
  return $ ( event, send ) =>
    [ type, tail..., ] = event
    #.......................................................................................................
    switch type
      #.....................................................................................................
      when 'end'
        warn '©u9dNV', buffer
        warn '©u9dNV', last_buffer
        # last_buffer = LODASH.clone buffer
        # send [ 'set-line', buffer, ] if buffer.length > 0
        _buffer = LODASH.clone buffer
        buffer.length = 0
        for _event in _buffer
          f _event, send
        debug '©T3FHy', state[ 'next' ]
        #   source.write element
        # if state[ 'next' ]
        #   throw 'XXX'
        # else
        #   send [ 'set-line', buffer, ]
        # send event
      #.....................................................................................................
      else
        f event, send

#-----------------------------------------------------------------------------------------------------------
$convert_to_html = ( state ) ->
  #.........................................................................................................
  return $ ( meta_event, send ) =>
    [ meta_type, buffer, ] = meta_event
    #.......................................................................................................
    switch meta_type
      #.....................................................................................................
      when 'test-line', 'set-line'
        ### Note: as per
        https://medium.com/the-javascript-collection/lets-write-fast-javascript-2b03c5575d9e#1e23, using
        `+=` should be faster than `[].join ''`. ###
        html      = ''
        open_tags = []
        #...................................................................................................
        for event in buffer
          [ type, tail..., ] = event
          switch type
            #...............................................................................................
            when 'open-tag'
              html += render_open_tag tail...
              open_tags.unshift tail[ 0 ]
            #...............................................................................................
            when 'close-tag'
              html += render_close_tag tail[ 0 ]
              open_tags.shift()
            #...............................................................................................
            when 'lone-tag'
              html += render_open_tag tail...
            #...............................................................................................
            when 'empty-tag'
              html += render_empty_tag tail...
            #...............................................................................................
            when 'text-part'
              ### TAINT escaping `<`, `>`, `&` ??? ###
              html += tail[ 0 ]
            #...............................................................................................
            else
              warn "ignored event of type #{rpr type}"
        #...................................................................................................
        html += render_close_tag tag_name for tag_name in open_tags
        send [ meta_type, html, ]
      #.....................................................................................................
      when 'end'
        send meta_event
      #.....................................................................................................
      else
        warn "ignored event of meta-type #{rpr meta_type}"

#-----------------------------------------------------------------------------------------------------------
$consume_lines = ( state ) ->
  #.........................................................................................................
  return $ ( meta_event, send ) =>
    [ meta_type, html, ] = meta_event
    #.......................................................................................................
    switch meta_type
      #.....................................................................................................
      when 'test-line'
        if html.length > 25
          urge '©7bm7z', html
          state[ 'next' ] = yes
      #.....................................................................................................
      when 'set-line'
        help '©cJelq', html
      #.....................................................................................................
      else
        warn 'X', "ignored event of meta-type #{rpr meta_type}"

### -> LINESETTER ###
#-----------------------------------------------------------------------------------------------------------
render_open_tag = ( name, attributes ) ->
  return ( render_empty_tag name, attributes ).replace /<\/[^>]+>$/, ''

#-----------------------------------------------------------------------------------------------------------
render_close_tag = ( name ) ->
  return "</#{name}>"

#-----------------------------------------------------------------------------------------------------------
render_empty_tag = ( name, attributes ) ->
  # ### NB `teacup` has a bug (IMHO) that causes it to modify the `attributes` object when rendering; to
  # prevent it from modifying buffered elements, we always pass it a copy of the `attributes` POD. ###
  # return TEACUP.render => TEACUP.TAG name, LODASH.clone attributes
  return TEACUP.render => TEACUP.TAG name, attributes


#-----------------------------------------------------------------------------------------------------------
@demo_3 = ->
  text = """So. Here we go!"""
  text = """Just as she <b><i>said</i></b> this, she noticed that <i>one of the trees had a door
          leading right into it.</i> 'That's very curious!' she thought. 'But
          everything's curious today. I think I may as well go in at once.' And in
          she &#x4e00; went."""
  text = """x <span class='x'></span> y"""
  text = """<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, period."""
  text = """<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, exasperated, and certainly"""
  info text
  #.........................................................................................................
  input = D2.create_throughstream()
  input
    .pipe D2.$parse_html()
    .pipe $collect_texts()
    # .pipe $collect_closing_tags()
    .pipe $collect_empty_tags()
    .pipe $hyphenate()
    .pipe $break_lines()
    .pipe $disperse_texts()
    .pipe D2.$sub ( source, sink, state ) ->
      source
        .pipe $produce_lines source, state
        .pipe $convert_to_html state
        .pipe $consume_lines state
        .pipe sink
    .pipe $ ( event, send ) =>
      info JSON.stringify event

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












