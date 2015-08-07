

############################################################################################################
# njs_path                  = require 'path'
# njs_fs                    = require 'fs-extra'
# join                      = njs_path.join
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr
badge                     = 'MKTS/mingkwai-styles-fix'
warn                      = CND.get_logger 'warn',    badge
help                      = CND.get_logger 'help',    badge
debug                     = CND.get_logger 'debug',    badge
info                      = CND.get_logger 'info',    badge
#...........................................................................................................
### TAINT selectors not properly ordered ###
xcss_rules                = require './xcss-rules'

#-----------------------------------------------------------------------------------------------------------
handler_by_properties =

  #---------------------------------------------------------------------------------------------------------
  '-mkts-draggable': ( rule ) ->
    { media, selectors, property, value, } = rule
    unless value is 'xy'
      throw new Error "unknown value for xCSS property #{property}: #{value}"
    for selector in selectors
      targets = $ selector
      targets.draggable()
      help "found #{targets.length} targets for `#{selector} { #{property}: #{value}; }`  "

  #---------------------------------------------------------------------------------------------------------
  '-mkts-columns': ( rule ) ->
    { media, selectors, property, value, } = rule
    unless value in [ 'all', '1', ]
      throw new Error "unknown value for xCSS property #{property}: #{value}"

  #---------------------------------------------------------------------------------------------------------
  '-mkts-foobar': ( rule ) ->
    { selectors, property, value, } = rule
    debug '©uhbsC', rule

#-----------------------------------------------------------------------------------------------------------
( $ 'document' ).ready =>
  # ( $ '.draggable' ).draggable()
  for rule in xcss_rules[ 'rules' ]
    { property, } = rule
    if ( handler = handler_by_properties[ property ] )?
      handler rule
    else
      warn "no handler for xCSS property #{rpr property}; skipping"
  #.........................................................................................................


  #=========================================================================================================
  # TOOL ACTIONS
  #---------------------------------------------------------------------------------------------------------
  ### Although not strictly xCSS rules, we process behaviors that rely on tag names (rather than
  style names used in names) right here. ###
  #.........................................................................................................
  # ( $ 'document' ).on 'mousemove', ( event ) ->
  #   debug '©YC6EG', [ event.pageX, event.pageY, ]
  #   window[ 'app' ][ 'mouse-position' ] = [ event.pageX, event.pageY, ]
  #.........................................................................................................
  ( $ 'i' ).on 'mouseover', ( event ) ->
    ( $ @ ).switchClass 'small', 'medium'
  #.........................................................................................................
  ( $ 'i' ).on 'mouseout', ( event ) ->
    ( $ @ ).switchClass 'medium', 'small'
  #.........................................................................................................
  ( $ 'tool, i' ).on 'click', ( event ) ->
    if ( action = ( $ @ ).attr 'action' )?
      if ( method = window[ 'app' ]?[ 'MKTS' ]?[ 'ACTIONS' ]?[ action ] )?
        help "clicked on tool; action #{rpr action}"
        method()
      else
        warn "unknown action #{rpr action}"
    else
      warn "`<tool>` tag without `action` attribute"
    #.......................................................................................................
    return false







