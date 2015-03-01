

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
extra_css_rules           = require './xcss-rules'


#-----------------------------------------------------------------------------------------------------------
handler_by_properties =

  #---------------------------------------------------------------------------------------------------------
  '-mkts-draggable': ( rule ) ->
    { media, selectors, property, value, } = rule
    unless value is 'xy'
      throw new Error "unknown value for xCSS property #{property}: #{value}"
    for selector in selectors
      targets = $ selector
      # targets.draggable()
      help "found #{targets.length} targets for `#{selector} { #{property}: #{value}; }"

  #---------------------------------------------------------------------------------------------------------
  '-mkts-foobar': ( rule ) ->
    { selectors, property, value, } = rule
    debug '©uhbsC', rule

#-----------------------------------------------------------------------------------------------------------
( $ 'document' ).ready =>
  # ( $ '.draggable' ).draggable()
  for rule in extra_css_rules[ 'rules' ]
    { property, } = rule
    if ( handler = handler_by_properties[ property ] )?
      handler rule
    else
      warn "no handler for xCSS property #{rpr property}; skipping"







