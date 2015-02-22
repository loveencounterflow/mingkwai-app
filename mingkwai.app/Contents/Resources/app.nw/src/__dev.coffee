
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
D                         = require 'pipedreams2'
$                         = D.remit.bind D
TEACUP                    = require 'coffeenode-teacup'
LODASH                    = require 'lodash'
LINESETTER                = require './LINESETTER'
LineBreaker               = require 'linebreak'


# #-----------------------------------------------------------------------------------------------------------
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

# #-----------------------------------------------------------------------------------------------------------
# D.break_lines = ( text, settings ) ->
#   LineBreaker     = require 'linebreak'
#   last_position   = null
#   incremental     = settings?[ 'incremental'  ] ? yes
#   extended        = settings?[ 'extended'     ] ? no
#   #.........................................................................................................
#   line_breaker    = new LineBreaker text
#   R               = []
#   #.......................................................................................................
#   while breakpoint = line_breaker.nextBreak()
#     { position, required, } = breakpoint
#     #.....................................................................................................
#     if incremental and last_position? then  part = text[ last_position ... breakpoint.position ]
#     else                                    part = text[               ... breakpoint.position ]
#     last_position = position
#     R.push if extended then [ part, required, position, ] else part
#   #.......................................................................................................
#   return R

# #-----------------------------------------------------------------------------------------------------------
# $break_lines = ->
#   #.........................................................................................................
#   return $ ( event, send ) ->
#     if event[ 0 ] is 'text'
#       event[ 0 ]  = 'text-parts'
#       event[ 1 ]  = D.break_lines event[ 1 ], { incremental: yes, }
#     send event

# #-----------------------------------------------------------------------------------------------------------
# D.$disperse_texts = ->
#   #.........................................................................................................
#   return $ ( event, send ) ->
#     [ type, tail..., ]  = event
#     if type is 'text-parts'
#       for text_part in tail[ 0 ]
#         send [ 'text-part', text_part, ]
#     else
#       send event

# #-----------------------------------------------------------------------------------------------------------
# $hyphenate = ( P... ) ->
#   hyphenate = D.new_hyphenator P...
#   #.........................................................................................................
#   return $ ( event, send ) ->
#     event[ 1 ] = hyphenate event[ 1 ] if event[ 0 ] is 'text'
#     send event

# #-----------------------------------------------------------------------------------------------------------
# prune_buffer = ( buffer, last_buffer_length ) ->
#   closed_tag_count = 0
#   #........................................................................................................
#   for idx in [ last_buffer_length - 1 .. 0 ] by -1
#     [ type, tail..., ] = buffer[ idx ]
#     switch type
#       #.....................................................................................................
#       when 'text-part', 'empty-tag', 'lone-tag'
#         buffer.splice idx, 1
#       #.....................................................................................................
#       when 'close-tag'
#         buffer.splice idx, 1
#         closed_tag_count += +1
#       #.....................................................................................................
#       when 'open-tag'
#         if closed_tag_count > 0
#           buffer.splice idx, 1
#           closed_tag_count += -1
#       #.....................................................................................................
#       else
#         warn "ignored event of type #{rpr type}"
#   #........................................................................................................
#   return buffer

# #-----------------------------------------------------------------------------------------------------------
# $produce_lines = ( source, state ) ->
#   buffer          = []
#   last_buffer     = null
#   state[ 'next' ] = no
#   #.........................................................................................................
#   f = ( event, send ) =>
#     [ type, tail..., ] = event
#     # debug '©Hbbu8', state[ 'next' ], JSON.stringify buffer
#     #.......................................................................................................
#     if state[ 'next' ]
#       throw new Error "should never happen" unless last_buffer?
#       state[ 'next' ] = no
#       send [ 'set-line', last_buffer, false, ]
#       prune_buffer buffer, last_buffer.length
#       last_buffer     = null
#     #.......................................................................................................
#     switch type
#       #.....................................................................................................
#       when 'open-tag', 'close-tag'
#         buffer.push event
#       #.....................................................................................................
#       when 'lone-tag', 'empty-tag'
#         buffer.push event
#         last_buffer = LODASH.clone buffer
#         send [ 'test-line', buffer, false, ]
#       #.....................................................................................................
#       when 'text-part'
#         buffer.push event
#         last_buffer = LODASH.clone buffer
#         send [ 'test-line', buffer, false, ]
#   #.........................................................................................................
#   return $ ( event, send ) =>
#     [ type, tail..., ] = event
#     #.......................................................................................................
#     # debug '©PapQo', type
#     switch type
#       #.....................................................................................................
#       when 'end'
#         ### TAINT buffer may be empty at this point ###
#         # warn '©u9dNV', JSON.stringify buffer
#         send [ 'set-line', buffer, true, ]
#         send event
#       #.....................................................................................................
#       else
#         f event, send

# #-----------------------------------------------------------------------------------------------------------
# $convert_to_html = ->
#   #.........................................................................................................
#   return $ ( meta_event, send ) =>
#     [ meta_type, buffer, is_last, ] = meta_event
#     #.......................................................................................................
#     switch meta_type
#       #.....................................................................................................
#       when 'test-line', 'set-line'
#         ### Note: as per
#         https://medium.com/the-javascript-collection/lets-write-fast-javascript-2b03c5575d9e#1e23, using
#         `+=` should be faster than `[].join ''`. ###
#         html      = ''
#         open_tags = []
#         #...................................................................................................
#         for event in buffer
#           [ type, tail..., ] = event
#           switch type
#             #...............................................................................................
#             when 'open-tag'
#               html += LINESETTER._render_open_tag tail...
#               open_tags.unshift tail[ 0 ]
#             #...............................................................................................
#             when 'close-tag'
#               html += LINESETTER._render_close_tag tail[ 0 ]
#               open_tags.shift()
#             #...............................................................................................
#             when 'lone-tag'
#               html += LINESETTER._render_open_tag tail...
#             #...............................................................................................
#             when 'empty-tag'
#               html += LINESETTER._render_empty_tag tail...
#             #...............................................................................................
#             when 'text-part'
#               ### TAINT escaping `<`, `>`, `&` ??? ###
#               html += tail[ 0 ]
#             #...............................................................................................
#             else
#               warn "ignored event of type #{rpr type}"
#         #...................................................................................................
#         html += LINESETTER._render_close_tag tag_name for tag_name in open_tags
#         send [ meta_type, html, is_last, ]
#       #.....................................................................................................
#       when 'end'
#         # debug '©weadg', 'end'
#         send meta_event
#       #.....................................................................................................
#       else
#         warn "ignored event of meta-type #{rpr meta_type}"

# #-----------------------------------------------------------------------------------------------------------
# $consume_lines = ( state, text, test_line, accept_line, handler ) ->
#   #.........................................................................................................
#   return $ ( meta_event, send ) =>
#     [ meta_type, html, is_last, ] = meta_event
#     #.......................................................................................................
#     switch meta_type
#       when 'test-line'  then state[ 'next' ] = test_line html
#       when 'set-line'   then accept_line html, is_last
#       when 'end'        then handler null
#       else warn "ignored event of meta-type #{rpr meta_type}"

# ### -> LINESETTER ###

# #-----------------------------------------------------------------------------------------------------------
# $throttle_items = ( items_per_second ) ->
#   buffer    = []
#   count     = 0
#   idx       = 0
#   _send     = null
#   timer     = null
#   has_ended = no
#   #.........................................................................................................
#   emit    = ->
#     if ( data = buffer[ idx ] ) isnt undefined
#       buffer[ idx ] = undefined
#       idx   += +1
#       count += -1
#       _send data
#     #.......................................................................................................
#     if has_ended and count < 1
#       clearInterval timer
#       _send.end()
#     #.......................................................................................................
#     return null
#   #.........................................................................................................
#   start   = ->
#     timer = setInterval emit, 1 / items_per_second * 1000
#   #---------------------------------------------------------------------------------------------------------
#   return $ ( data, send, end ) =>
#     if data?
#       unless _send?
#         _send = send
#         start()
#       buffer.push data
#       count += +1
#     #.......................................................................................................
#     if end?
#       has_ended = yes

# #-----------------------------------------------------------------------------------------------------------
# @demo_3 = ->
#   text_idx = -1
#   texts = [
#     """<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, exasperated, and certainly"""
#     # """So."""
#     # """So. Here we go!"""
#     # """x <span class='x'></span> y"""
#     # """Just as she <b><i>said</i></b> this, she noticed that <i>one of the trees had a door
#     #       leading right into it.</i> 'That's very curious!' she thought. 'But
#     #       everything's curious today. I think I may as well go in at once.' And in
#     #       she &#x4e00; went."""
#     # """<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, period."""
#     ]
#   #.........................................................................................................
#   test_line = ( html ) =>
#     ### Must return whether HTML exceeds line length. ###
#     return html.length > 25
#   #.........................................................................................................
#   accept_line = ( html, is_last ) =>
#     help html, if is_last then '*' else ''
#     return null
#   #---------------------------------------------------------------------------------------------------------
#   typeset_text = ( text, test_line, accept_line, handler ) =>
#     #.......................................................................................................
#     input = D.create_throughstream()
#     input
#       .pipe D.HTML.$parse()
#       .pipe $throttle_items 5
#       .pipe D.$show()
#       # .pipe D.HTML.$collect_texts()
#       # # .pipe D.HTML.$collect_closing_tags()
#       # .pipe D.HTML.$collect_empty_tags()
#       # .pipe $hyphenate()
#       # .pipe $break_lines()
#       # .pipe D.$disperse_texts()
#       # .pipe D.$sub ( source, sink, state ) ->
#       #   source
#       #     # .pipe $ ( event, send ) => whisper JSON.stringify event; send event
#       #     .pipe $produce_lines source, state
#       #     .pipe $convert_to_html()
#       #     .pipe $consume_lines state, text, test_line, accept_line, handler
#       #     .pipe sink
#       # # .pipe $ ( event, send ) => info '©56', JSON.stringify event; send event
#     #.......................................................................................................
#     input.on 'end', =>
#       whisper "input ended."
#       handler null
#     #.......................................................................................................
#     info '©28u', rpr text
#     input.write text
#     input.end()
#   #---------------------------------------------------------------------------------------------------------
#   step ( resume ) =>
#     for text in texts
#       yield typeset_text text, test_line, accept_line, resume
#       # debug '©7XCYz', rpr text
#   #.........................................................................................................
#   return null


# #-----------------------------------------------------------------------------------------------------------
# @demo_4 = ->
#   input = D.create_throughstream()
#   state =
#     fits: true
#   #---------------------------------------------------------------------------------------------------------
#   prune_buffer = ( buffer ) ->
#     ### TAINT in reality more complicated; should store last good buffer length ###
#     R = buffer.splice 0, Math.max 1, buffer.length - 1
#     return R
#   #---------------------------------------------------------------------------------------------------------
#   test_line = ( line ) ->
#     return line.length < 7
#   #---------------------------------------------------------------------------------------------------------
#   input
#     .pipe @_$break_lines()
#     .pipe @_$disperse_texts()
#     #.......................................................................................................
#     .pipe do =>
#       ### assemble buffer ###
#       buffer = []
#       return $ ( event, send ) =>
#         [ type, text, ] = event
#         switch type
#           #.................................................................................................
#           when 'text-part'
#             buffer.push text
#             send [ 'test-line', buffer, ]
#             # help '©xrm5T', state[ 'fits' ], buffer.join ''
#           #.................................................................................................
#           when 'end'
#             if buffer.length isnt 0
#               send [ 'set-line', buffer, ]
#               buffer.length = 0
#               send event
#           else
#             warn "ignored event of type #{rpr type}"
#         #...................................................................................................
#         # warn '©xrm5T', state[ 'fits' ], buffer.join ''
#         unless state[ 'fits' ]
#           state[ 'fits' ]   = true # necessary?
#           ok_buffer         = prune_buffer buffer
#           send [ 'set-line', ok_buffer, ]
#           if buffer.length > 0
#             send [ 'test-line', buffer, ]
#             # buffer is only one element long: if it doesn't fit, it must still be typeset on
#             # a line of its own:
#             unless length = ( buffer.length is 1 )
#               throw new Error "expected buffer of length 1, is #{length}"
#             unless state[ 'fits' ]
#               ok_buffer = prune_buffer buffer
#               send [ 'set-line', ok_buffer, ]
#     #.......................................................................................................
#     .pipe do =>
#       ### build line ###
#       return $ ( event, send ) =>
#         [ type, buffer, ] = event
#         if type is 'test-line'
#           send [ 'test-line', buffer.join '', ]
#           # urge '©xrm5T', state[ 'fits' ], buffer.join ''
#         else
#           send event
#     #.......................................................................................................
#     .pipe do =>
#       ### test line ###
#       return $ ( event, send ) =>
#         [ type, line, ] = event
#         if type is 'test-line'
#           state[ 'fits' ] = test_line line
#           # debug '©j8nTB', fits, rpr line
#         else
#           send event
#     #.......................................................................................................
#     .pipe D.$show()
#   #---------------------------------------------------------------------------------------------------------
#   text = """a bbbbbbbbbbbb c d e ff g h"""
#   input.write [ 'text', text, ]
#   input.write [ 'end', ]
#   input.end()

# #-----------------------------------------------------------------------------------------------------------
# @demo_6 = ->
#   #.........................................................................................................
#   add_prefix = $ ( event, send ) =>
#     if CND.isa_text ( text = event[ 1 ] )
#       event[ 1 ] = '*' + text
#     send event
#   #.........................................................................................................
#   add_suffix = $ ( event, send ) =>
#     if CND.isa_text ( text = event[ 1 ] )
#       event[ 1 ] = text + '*'
#     send event
#   #.........................................................................................................
#   text  = """a bbbbbbbbbbbb c d e ff g h"""
#   transforms = [
#     @_$break_lines()
#     @_$disperse_texts()
#     add_prefix
#     add_suffix
#     D.$show()
#     ]
#   #---------------------------------------------------------------------------------------------------------
#   input = D.create_throughstream()
#   input
#     .pipe D.$link transforms
#     .pipe $ ( data, send ) ->
#       urge data
#       send data
#   input.write [ 'text', text, ]
#   input.write [ 'end', ]
#   input.end()

### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### Unchanged ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###


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
    # debug '©FHCro', type is 'text-parts'
    if type is 'text-parts'
      for text_part in tail[ 0 ]
        send [ 'text-part', text_part, ]
    else
      send event

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
        meta_event[ 1 ] = buffer = LODASH.clone buffer
        is_last         = yes
        first_idx       = null
        # debug '©QJQXu', first_idx, ( JSON.stringify buffer )
        for idx in [ buffer.length - 1 .. 0 ] by -1
          [ type, text, ]   = part = buffer[ idx ]
          if part[ 0 ] is 'text-part'
            first_idx       = idx
            replacement     = if is_last then '-' else ''
            text            = text.replace /\xad$/, replacement
            text            = text.replace /\s+$/, '' if is_last
            text            = text.replace /&/g, '&amp;'
            text            = text.replace /</g, '&lt;'
            text            = text.replace />/g, '&gt;'
            buffer[ idx ]   = [ 'text-part', text, ]
          is_last         = no
        if first_idx?
          # debug '©QJQXu', first_idx, JSON.stringify buffer
          buffer[ first_idx ][ 1 ] = buffer[ first_idx ][ 1 ].replace /^\s+/, ''
    #.......................................................................................................
    send meta_event

### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### Changed ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###




### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###

#-----------------------------------------------------------------------------------------------------------
@_prune_buffer = ( buffer, last_good_buffer_length ) ->
  closed_tag_count  = 0
  R                 = buffer[ ... last_good_buffer_length ]
  R.pop() while R.length > 0 and R[ R.length - 1 ][ 0 ] in [ 'open-tag', 'close-tag', ]
  #........................................................................................................
  last_good_buffer_length = Math.min last_good_buffer_length, buffer.length
  for idx in [ last_good_buffer_length - 1 .. 0 ] by -1
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
        warn "1 ignored event of type #{rpr type}"
  #........................................................................................................
  debug '©HbYgl', R
  return R

#-----------------------------------------------------------------------------------------------------------
@_$assemble_buffer = ( state ) =>
  buffer                  = []
  last_good_buffer_length = null
  #.........................................................................................................
  return $ ( event, send ) =>
    [ type, tail..., ] = event
    #.......................................................................................................
    switch type
      #.....................................................................................................
      when 'open-tag', 'close-tag'
        buffer.push event
      #.....................................................................................................
      when 'text-part'
        buffer.push event
        send [ 'test-line', buffer, ]
        # help '©xrm5T', state[ 'fits' ], buffer.join ''
      #.....................................................................................................
      when 'lone-tag', 'empty-tag'
        buffer.push event
        send [ 'test-line', buffer, false, ]
      #.....................................................................................................
      when 'end'
        if buffer.length isnt 0
          send [ 'set-line', buffer, ]
          buffer.length = 0
          send event
      else
        warn "2 ignored event of type #{rpr type}"
    #.......................................................................................................
    # warn '©xrm5T', state[ 'fits' ], buffer.join ''
    if state[ 'fits' ]
      last_good_buffer_length = buffer.length
      # debug '©GErvU', 'last_good_buffer_length:', last_good_buffer_length, JSON.stringify buffer
    else
      state[ 'fits' ]   = true # necessary?
      good_buffer       = @_prune_buffer buffer, last_good_buffer_length
      warn '©FCIOb', good_buffer, buffer
      if good_buffer.length > 0
        send [ 'set-line', good_buffer, ]
        if buffer.length > 0
          send [ 'test-line', buffer, ]
          # buffer is only one element long: if it doesn't fit, it must still be typeset on
          # a line of its own:
          # unless length = ( buffer.length is 1 )
          #   throw new Error "expected buffer of length 1, is #{length}"
          if state[ 'fits' ]
            last_good_buffer_length = buffer.length
            # debug '©GErvU', 'last_good_buffer_length:', last_good_buffer_length, JSON.stringify buffer
          else
            good_buffer = @_prune_buffer buffer, last_good_buffer_length
            if good_buffer.length > 0
              send [ 'set-line', good_buffer, ]
      else
        ### TAINT necessary to copy buffer? ###
        # send [ 'set-line', LODASH.clone buffer, ]
        send [ 'set-line', buffer, ]
        @_prune_buffer buffer, buffer.length

# #-----------------------------------------------------------------------------------------------------------
# @_$build_line = ( state ) =>
#   return $ ( event, send ) =>
#     [ type, buffer, ] = event
#     if type is 'test-line'
#       send [ 'test-line', buffer.join '', ]
#       # urge '©xrm5T', state[ 'fits' ], buffer.join ''
#     else
#       send event

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
        warn "3 ignored event of type #{rpr type}"
  #...................................................................................................
  ( R += @_render_close_tag tag_name ) for tag_name in open_tags
  return R

#-----------------------------------------------------------------------------------------------------------
@_$convert_to_html = ( state ) ->
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
@_$test_line = ( state, test_line ) =>
  ### test line ###
  return $ ( event, send ) =>
    [ type, line, ] = event
    if type is 'test-line'
      state[ 'fits' ] = test_line line
      # debug '©j8nTB', fits, rpr line
    send event

#-----------------------------------------------------------------------------------------------------------
@demo_5 = ->
  input = D.create_throughstream()
  state =
    fits:           true
    is_first_line:  yes
    is_last_line:   no
  #---------------------------------------------------------------------------------------------------------
  set_lines = ( text, test_line, set_line ) =>
    input
      .pipe D.HTML.$parse()
      .pipe D.HTML.$collect_texts()
      # .pipe D.HTML.$collect_closing_tags()
      .pipe D.HTML.$collect_empty_tags()
      .pipe @_$break_lines()
      .pipe @_$disperse_texts()
      .pipe @_$assemble_buffer  state
      .pipe @_$correct_hyphens_etc()
      .pipe @_$convert_to_html  state
      # .pipe D.$show()
      .pipe @_$test_line        state, test_line
      .pipe $ ( event, send ) =>
        [ type, line, ] = event
        switch type
          when 'test-line'
            if state[ 'fits' ]
              urge line
            else
              warn line
          when 'set-line'
            help line
        send event
    #---------------------------------------------------------------------------------------------------------
    input.write text
    # input.write [ 'end', ]
    input.end()
  #---------------------------------------------------------------------------------------------------------
  test_line = ( line ) ->
    return line.length < 12
  #---------------------------------------------------------------------------------------------------------
  set_line = ( line, is_first, is_last ) ->
    urge line
    return null
  #---------------------------------------------------------------------------------------------------------
  # text = """<i><b class='x'>a bbbbbbbbbbbb</b> foo bar</i> <img src='x.jpg'> baz oomph"""
  text = """<i>a <b>b</b> c d</i> e <img src='x.jpg'> f g h"""
  set_lines text, test_line, set_line






############################################################################################################
unless module.parent?
  # @demo_4()
  @demo_5()
  # @demo_6()









