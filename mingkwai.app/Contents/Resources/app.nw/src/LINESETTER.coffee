

############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/LINESETTER'
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
D                         = require 'pipedreams2'
$                         = D.remit.bind D
TEACUP                    = require 'coffeenode-teacup'
LODASH                    = require 'lodash'
#...........................................................................................................
LineBreaker               = require 'linebreak'


#===========================================================================================================
# TAG RENDERING
#-----------------------------------------------------------------------------------------------------------
@_render_open_tag = ( name, attributes ) ->
  return ( @_render_empty_tag name, attributes ).replace /<\/[^>]+>$/, ''

#-----------------------------------------------------------------------------------------------------------
@_render_close_tag = ( name ) ->
  return "</#{name}>"

#-----------------------------------------------------------------------------------------------------------
@_render_empty_tag = ( name, attributes ) ->
  return TEACUP.render => TEACUP.TAG name, attributes


#===========================================================================================================
# UNICODE LINE BREAKING
#-----------------------------------------------------------------------------------------------------------
# D.$break_lines = ( settings ) ->
#   ### Uses the [linebreak](https://github.com/devongovett/linebreak) module to find line break opportunities
#   in a text using the Unicode Line Breaking Algorithm (UAX #14). For each text that arrives in the stream,
#   `$break_lines` will send out one ore more 'events' (lists) of the format

#   ```
#   [ 'line-breaker-part', idx, part, required, position, ]
#   ```

#   where the first part identifies the event type, `idx` is a running enumeration of texts that have arrived,
#   `part` is part of the text in question, `required` indicates whether a line break after that part is
#   optional or required, and `position` contains the index of the first character *after* the current `part`.

#   When `incremental` is set to `true`, then `part` will be the next substring after which a linebreak is
#   possible; when `incremental` is set to `false` (the default), then `part` will contain the entire
#   text up to the breakpoint; therefore, given a text `'So. Here we go!'`, the events will be either
#   (with `incremental` set to `false`):

#   ```coffee
#   [ 'line-breaker-part', 0, 'So. ', false, 4 ]
#   [ 'line-breaker-part', 0, 'Here ', false, 9 ]
#   [ 'line-breaker-part', 0, 'we ', false, 12 ]
#   [ 'line-breaker-part', 0, 'go!', false, 15 ]
#   [ 'line-breaker-part', 0, null, null, null ]
#   ```

#   or (with `incremental` set to `true`):

#   ```coffee
#   [ 'line-breaker-part', 0, 'So. ', false, 4 ]
#   [ 'line-breaker-part', 0, 'So. Here ', false, 9 ]
#   [ 'line-breaker-part', 0, 'So. Here we ', false, 12 ]
#   [ 'line-breaker-part', 0, 'So. Here we go!', false, 15 ]
#   [ 'line-breaker-part', 0, null, null, null ]
#   ```

#   ###
#   #.........................................................................................................
#   ### https://github.com/devongovett/linebreak ###
#   LineBreaker     = require 'linebreak'
#   idx             = -1
#   last_position   = null
#   incremental     = settings?[ 'incremental'  ] ? yes
#   #.........................................................................................................
#   return $ ( text, send ) =>
#     idx          += +1
#     line_breaker  = new LineBreaker text
#     breakpoint    = null
#     #.......................................................................................................
#     while breakpoint = line_breaker.nextBreak()
#       { position, required, } = breakpoint
#       #.....................................................................................................
#       if incremental and last_position? then  part = text[ last_position ... breakpoint.position ]
#       else                                    part = text[               ... breakpoint.position ]
#       last_position = position
#       send [ 'line-breaker-part', idx, part, required, position, ]
#     #.......................................................................................................
#     send [ 'line-breaker-part', idx, null, null, null, ]

#-----------------------------------------------------------------------------------------------------------
@_break_lines = ( text, settings ) ->
  text            = text.replace /\n/g, ' '
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
@_$break_lines = ->
  #.........................................................................................................
  return $ ( event, send ) =>
    if event[ 0 ] is 'text'
      event[ 0 ]  = 'text-parts'
      event[ 1 ]  = @_break_lines event[ 1 ], { incremental: yes, }
    send event

#-----------------------------------------------------------------------------------------------------------
@_$disperse_texts = ->
  #.........................................................................................................
  return $ ( event, send ) =>
    [ type, tail..., ]  = event
    if type is 'text-parts'
      for text_part in tail[ 0 ]
        send [ 'text-part', text_part, ]
    else
      send event


#===========================================================================================================
# TEXT HYPHENATION
#-----------------------------------------------------------------------------------------------------------
@_$hyphenate = ( P... ) ->
  hyphenate = D.new_hyphenator P...
  #.........................................................................................................
  return $ ( event, send ) =>
    event[ 1 ] = hyphenate event[ 1 ] if event[ 0 ] is 'text'
    send event

#-----------------------------------------------------------------------------------------------------------
@_prune_buffer = ( buffer, last_buffer_length ) ->
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
@_$produce_lines = ( state ) ->
  buffer          = []
  last_buffers    = []
  state[ 'next' ] = no
  #.........................................................................................................
  add_buffer = ->
    last_buffers.push LODASH.clone buffer
    last_buffers.shift() if last_buffers.length > 2
    return null
  #.........................................................................................................
  f = ( event, send ) =>
    debug '©8Ijx0', event, state[ 'next']
    [ type, tail..., ] = event
    # debug '©Hbbu8', state[ 'next' ], JSON.stringify buffer
    #.......................................................................................................
    if state[ 'next' ]
      last_buffer = last_buffers.shift()
      # warn '©gBgD8', 'buffer:     ', @_convert_to_html buffer
      # warn '©gBgD8', 'last_buffer:', @_convert_to_html last_buffer
      # warn '©gBgD8', 'last_buffers:', last_buffers.length
      throw new Error "should never happen" unless last_buffer?
      state[ 'next' ] = no
      send [ 'set-line', last_buffer, false, ]
      @_prune_buffer buffer, last_buffer.length
      # if buffer.length > 0
      #   warn '©FLfln', buffer.length
      #   return true
      last_buffers.length = 0
    #.......................................................................................................
    switch type
      #.....................................................................................................
      when 'open-tag', 'close-tag'
        buffer.push event
      #.....................................................................................................
      when 'lone-tag', 'empty-tag'
        buffer.push event
        add_buffer()
        send [ 'test-line', buffer, false, ]
      #.....................................................................................................
      when 'text-part'
        buffer.push event
        add_buffer()
        send [ 'test-line', buffer, false, ]
    #.......................................................................................................
    return false
  #.........................................................................................................
  return $ ( event, send ) =>
    [ type, tail..., ] = event
    #.......................................................................................................
    # debug '©PapQo', type
    debug '©skZ5C', 'called'
    switch type
      #.....................................................................................................
      when 'end'
        ### TAINT buffer may be empty at this point ###
        warn '©u9dNV', JSON.stringify buffer
        send [ 'set-line', buffer, true, ]
        send event
      #.....................................................................................................
      else
        if f event, send
          null
          # ### TAINT necessary to copy buffer? ###
          # _buffer       = LODASH.clone buffer
          # # debug '©a5DvO', 'buffer', buffer
          # buffer.length = 0
          # for event in _buffer
          #   debug '©skZ5C', 'resending', JSON.stringify _buffer
          #   f event, send

#-----------------------------------------------------------------------------------------------------------
@_convert_to_html = ( buffer ) ->
  ### Note: as per
  https://medium.com/the-javascript-collection/lets-write-fast-javascript-2b03c5575d9e#1e23, using
  `+=` should be faster than `[].join ''`. ###
  R         = ''
  open_tags = []
  #...................................................................................................
  for event in buffer
    [ type, tail..., ] = event
    switch type
      #...............................................................................................
      when 'open-tag'
        R += @_render_open_tag tail...
        open_tags.unshift tail[ 0 ]
      #...............................................................................................
      when 'close-tag'
        R += @_render_close_tag tail[ 0 ]
        open_tags.shift()
      #...............................................................................................
      when 'lone-tag'
        R += @_render_open_tag tail...
      #...............................................................................................
      when 'empty-tag'
        R += @_render_empty_tag tail...
      #...............................................................................................
      when 'text-part'
        ### TAINT escaping `<`, `>`, `&` ??? ###
        R += tail[ 0 ]
      #...............................................................................................
      else
        warn "ignored event of type #{rpr type}"
  #...................................................................................................
  ( R += @_render_close_tag tag_name ) for tag_name in open_tags
  return R

#-----------------------------------------------------------------------------------------------------------
@_$correct_hyphens_etc = ->
  #.........................................................................................................
  return $ ( meta_event, send ) =>
    [ meta_type, buffer, is_last, ] = meta_event
    #.......................................................................................................
    switch meta_type
      #.....................................................................................................
      when 'test-line', 'set-line'
        ### TAINT consider to move the buffer cloning to an earlier transformer. ###
        buffer          = LODASH.clone buffer
        meta_event[ 1 ] = buffer
        is_last         = yes
        first_idx       = null
        for idx in [ buffer.length - 1 .. 0 ] by -1
          [ type, text, ] = part = buffer[ idx ]
          continue unless part[ 0 ] is 'text-part'
          first_idx       = idx
          replacement     = if is_last then '-' else ''
          text            = text.replace /\xad$/, replacement
          text            = text.replace /\s+$/, '' if is_last
          text            = text.replace /&/g, '&amp;'
          text            = text.replace /</g, '&lt;'
          text            = text.replace />/g, '&gt;'
          is_last         = no
          buffer[ idx ]   = [ 'text-part', text, ]
        if first_idx?
          buffer[ first_idx ][ 1 ] = buffer[ first_idx ][ 1 ].replace /^\s+/
    #.......................................................................................................
    send meta_event

#-----------------------------------------------------------------------------------------------------------
@_$convert_to_html = ->
  #.........................................................................................................
  return $ ( meta_event, send ) =>
    [ meta_type, buffer, is_last, ] = meta_event
    #.......................................................................................................
    switch meta_type
      #.....................................................................................................
      when 'test-line', 'set-line'
        html = @_convert_to_html buffer
        # debug '©936Ly', buffer, rpr html
        send [ meta_type, html, is_last, ]
      #.....................................................................................................
      else
        send meta_event

#-----------------------------------------------------------------------------------------------------------
@_$consume_lines = ( state, text, test_line, accept_line, handler ) ->
  #.........................................................................................................
  return $ ( meta_event, send ) =>
    [ meta_type, html, is_last, ] = meta_event
    #.......................................................................................................
    switch meta_type
      when 'test-line'  then state[ 'next' ] = not test_line html
      when 'set-line'   then accept_line html, is_last
      when 'end'        then handler null
      else warn "ignored event of meta-type #{rpr meta_type}"


#===========================================================================================================
#
#-----------------------------------------------------------------------------------------------------------
@set_lines = ( text, test_line, accept_line, handler ) =>
  state = next: no
  #.........................................................................................................
  input = D.create_throughstream()
  input
    .pipe D.HTML.$parse()
    .pipe D.HTML.$collect_texts()
    # .pipe D.HTML.$collect_closing_tags()
    .pipe D.HTML.$collect_empty_tags()
    .pipe @_$hyphenate()
    .pipe @_$break_lines()
    .pipe @_$disperse_texts()
    # .pipe D.$throttle_items 2
    .pipe @_$produce_lines state
    # .pipe @_$correct_hyphens_etc()
    # .pipe @_$convert_to_html()
    .pipe D.$show()
    # .pipe @_$consume_lines state, text, test_line, accept_line, handler
  #.........................................................................................................
  input.on 'end', =>
    whisper "input ended."
    # handler null
  #.........................................................................................................
  info '©28u', rpr text
  input.write text
  input.end()


#===========================================================================================================
# BALANCED COLUMNS
#-----------------------------------------------------------------------------------------------------------
@get_column_linecounts = ( strategy, line_count, column_count ) ->
  ### thx to http://stackoverflow.com/a/1244369/256361 ###
  R   = []
  #.........................................................................................................
  switch strategy
    #.......................................................................................................
    when 'even'
      for col in [ 1 .. column_count ]
        R.push ( line_count + column_count - col ) // column_count
    #.......................................................................................................
    else
      throw new Error "unknown strategy #{rpr strategy}"
  #.........................................................................................................
  return R


#===========================================================================================================
# DEMO
#-----------------------------------------------------------------------------------------------------------
@_demo = ->
  text_idx = -1
  texts = [
    """So."""
    """So. Here we go!"""
    """x <span class='x'></span> y"""
    """<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, exasperated, and certainly"""
    """Just as she <b><i>said</i></b> this, she noticed that <i>one of the trees had a door
          leading right into it.</i> 'That's very curious!' she thought. 'But
          everything's curious today. I think I may as well go in at once.' And in
          she &#x4e00; went."""
    """<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, period."""
    ]
  #.........................................................................................................
  test_line = ( html ) =>
    ### Must return whether HTML fits into one line. ###
    return html.length <= 25
  #.........................................................................................................
  accept_line = ( html, is_last ) =>
    ### Inserts text line into document ###
    help html, if is_last then '*' else ''
    return null
  #---------------------------------------------------------------------------------------------------------
  step ( resume ) =>
    for text in texts
      yield @set_lines text, test_line, accept_line, resume
  #.........................................................................................................
  return null


############################################################################################################
unless module.parent?
  @_demo()



