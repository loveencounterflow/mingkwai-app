

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
xcss_rules                = require './xcss-rules'

#-----------------------------------------------------------------------------------------------------------
@rules_from_node = ( app, node ) ->
  unless node.length is 1
    throw new Error "argument `node` must contain single element, has #{node.length}"
  R                                   = {}
  { '%selectors': selectors, rules }  = xcss_rules
  #.........................................................................................................
  ### TAINT selectors not properly ordered ###
  for selector, idxs of selectors
    # debug '©vbWoS', selector, node.is selector
    continue unless node.is selector
    for idx in idxs
      { property, value, }  = rules[ idx ]
      R[ property ]         = value
  #.........................................................................................................
  return R






