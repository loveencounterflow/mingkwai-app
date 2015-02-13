
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
#...........................................................................................................
suspend                   = require 'coffeenode-suspend'
step                      = suspend.step
after                     = suspend.after
sleep                     = suspend.sleep
#...........................................................................................................
D2                        = require 'pipedreams2'
D                         = require 'pipedreams'
$                         = D2.remit.bind D2
# TEACUP                    = require 'coffeenode-teacup'
# _XXX_id                   = ( require 'jsoid' ).new_jsoid()
LODASH                    = require 'lodash'
LINESETTER                = require './LINESETTER'


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
$break_lines = ->
  #.........................................................................................................
  return $ ( event, send ) ->
    if event[ 0 ] is 'text'
      event[ 0 ]  = 'text-parts'
      event[ 1 ]  = D2.break_lines event[ 1 ], { incremental: yes, }
    send event

#-----------------------------------------------------------------------------------------------------------
D2.$disperse_texts = ->
  #.........................................................................................................
  return $ ( event, send ) ->
    [ type, tail..., ]  = event
    if type is 'text-parts'
      for text_part in tail[ 0 ]
        send [ 'text-part', text_part, ]
    else
      send event

#-----------------------------------------------------------------------------------------------------------
$hyphenate = ( P... ) ->
  hyphenate = D2.new_hyphenator P...
  #.........................................................................................................
  return $ ( event, send ) ->
    event[ 1 ] = hyphenate event[ 1 ] if event[ 0 ] is 'text'
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
    # debug '©Hbbu8', state[ 'next' ], JSON.stringify buffer
    #.......................................................................................................
    if state[ 'next' ]
      throw new Error "should never happen" unless last_buffer?
      state[ 'next' ] = no
      send [ 'set-line', last_buffer, false, ]
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
        send [ 'test-line', buffer, false, ]
      #.....................................................................................................
      when 'text-part'
        buffer.push event
        last_buffer = LODASH.clone buffer
        send [ 'test-line', buffer, false, ]
  #.........................................................................................................
  return $ ( event, send ) =>
    [ type, tail..., ] = event
    #.......................................................................................................
    # debug '©PapQo', type
    switch type
      #.....................................................................................................
      when 'end'
        ### TAINT buffer may be empty at this point ###
        # warn '©u9dNV', JSON.stringify buffer
        send [ 'set-line', buffer, true, ]
        send event
      #.....................................................................................................
      else
        f event, send

#-----------------------------------------------------------------------------------------------------------
$convert_to_html = ->
  #.........................................................................................................
  return $ ( meta_event, send ) =>
    [ meta_type, buffer, is_last, ] = meta_event
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
              html += LINESETTER._render_open_tag tail...
              open_tags.unshift tail[ 0 ]
            #...............................................................................................
            when 'close-tag'
              html += LINESETTER._render_close_tag tail[ 0 ]
              open_tags.shift()
            #...............................................................................................
            when 'lone-tag'
              html += LINESETTER._render_open_tag tail...
            #...............................................................................................
            when 'empty-tag'
              html += LINESETTER._render_empty_tag tail...
            #...............................................................................................
            when 'text-part'
              ### TAINT escaping `<`, `>`, `&` ??? ###
              html += tail[ 0 ]
            #...............................................................................................
            else
              warn "ignored event of type #{rpr type}"
        #...................................................................................................
        html += LINESETTER._render_close_tag tag_name for tag_name in open_tags
        send [ meta_type, html, is_last, ]
      #.....................................................................................................
      when 'end'
        # debug '©weadg', 'end'
        send meta_event
      #.....................................................................................................
      else
        warn "ignored event of meta-type #{rpr meta_type}"

#-----------------------------------------------------------------------------------------------------------
$consume_lines = ( state, text, test_line, accept_line, handler ) ->
  #.........................................................................................................
  return $ ( meta_event, send ) =>
    [ meta_type, html, is_last, ] = meta_event
    #.......................................................................................................
    switch meta_type
      when 'test-line'  then state[ 'next' ] = test_line html
      when 'set-line'   then accept_line html, is_last
      when 'end'        then handler null
      else warn "ignored event of meta-type #{rpr meta_type}"

### -> LINESETTER ###

#-----------------------------------------------------------------------------------------------------------
$throttle_items = ( items_per_second ) ->
  buffer    = []
  count     = 0
  idx       = 0
  _send     = null
  timer     = null
  has_ended = no
  #.........................................................................................................
  emit    = ->
    if ( data = buffer[ idx ] ) isnt undefined
      buffer[ idx ] = undefined
      idx   += +1
      count += -1
      _send data
    #.......................................................................................................
    if has_ended and count < 1
      clearInterval timer
      _send.end()
    #.......................................................................................................
    return null
  #.........................................................................................................
  start   = ->
    timer = setInterval emit, 1 / items_per_second * 1000
  #---------------------------------------------------------------------------------------------------------
  return $ ( data, send, end ) =>
    if data?
      unless _send?
        _send = send
        start()
      buffer.push data
      count += +1
    #.......................................................................................................
    if end?
      has_ended = yes

#-----------------------------------------------------------------------------------------------------------
@demo_3 = ->
  text_idx = -1
  texts = [
    """<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, exasperated, and certainly"""
    # """So."""
    # """So. Here we go!"""
    # """x <span class='x'></span> y"""
    # """Just as she <b><i>said</i></b> this, she noticed that <i>one of the trees had a door
    #       leading right into it.</i> 'That's very curious!' she thought. 'But
    #       everything's curious today. I think I may as well go in at once.' And in
    #       she &#x4e00; went."""
    # """<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, period."""
    ]
  #.........................................................................................................
  test_line = ( html ) =>
    ### Must return whether HTML exceeds line length. ###
    return html.length > 25
  #.........................................................................................................
  accept_line = ( html, is_last ) =>
    help html, if is_last then '*' else ''
    return null
  #---------------------------------------------------------------------------------------------------------
  typeset_text = ( text, test_line, accept_line, handler ) =>
    #.......................................................................................................
    input = D2.create_throughstream()
    input
      .pipe D2.HTML.$parse()
      .pipe $throttle_items 5
      .pipe D2.$show()
      # .pipe D2.HTML.$collect_texts()
      # # .pipe D2.HTML.$collect_closing_tags()
      # .pipe D2.HTML.$collect_empty_tags()
      # .pipe $hyphenate()
      # .pipe $break_lines()
      # .pipe D2.$disperse_texts()
      # .pipe D2.$sub ( source, sink, state ) ->
      #   source
      #     # .pipe $ ( event, send ) => whisper JSON.stringify event; send event
      #     .pipe $produce_lines source, state
      #     .pipe $convert_to_html()
      #     .pipe $consume_lines state, text, test_line, accept_line, handler
      #     .pipe sink
      # # .pipe $ ( event, send ) => info '©56', JSON.stringify event; send event
    #.......................................................................................................
    input.on 'end', =>
      whisper "input ended."
      handler null
    #.......................................................................................................
    info '©28u', rpr text
    input.write text
    input.end()
  #---------------------------------------------------------------------------------------------------------
  step ( resume ) =>
    for text in texts
      yield typeset_text text, test_line, accept_line, resume
      # debug '©7XCYz', rpr text
  #.........................................................................................................
  return null


############################################################################################################
unless module.parent?
  # @demo_1()
  # @demo_2()
  @demo_3()












