
############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/rework-plugins'
log                       = CND.get_logger 'plain',     badge
info                      = CND.get_logger 'info',      badge
whisper                   = CND.get_logger 'whisper',   badge
alert                     = CND.get_logger 'alert',     badge
debug                     = CND.get_logger 'debug',     badge
warn                      = CND.get_logger 'warn',      badge
help                      = CND.get_logger 'help',      badge
urge                      = CND.get_logger 'urge',      badge
#...........................................................................................................
# rework                    = require 'rework'
# styl                      = require 'styl'




#-----------------------------------------------------------------------------------------------------------
@foobar_super = ->
  return ( ast, rw ) =>
    # debug '©MittE', arguments
    for { selectors, declarations, position, } in ast[ 'rules' ]
      continue unless declarations?
      for declaration in declarations
        { property, value, } = declaration
        continue unless /^foobar$/.test property
        debug '©RVpL8', property, value
        declaration[ 'property' ] = '-moz-supercssyeah'
  #.........................................................................................................
  return null
