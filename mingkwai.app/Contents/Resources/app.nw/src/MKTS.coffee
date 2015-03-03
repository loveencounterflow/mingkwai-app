




############################################################################################################
# njs_path                  = require 'path'
# njs_fs                    = require 'fs'
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/MKTS'
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
# NW                        = require 'nw.gui'
# win                       = NW.Window.get()
# #...........................................................................................................
# suspend                   = require 'coffeenode-suspend'
# step                      = suspend.step
# immediately               = suspend.immediately
# after                     = suspend.after
# sleep                     = suspend.sleep
#...........................................................................................................
app                       = null
MKTS                      = @

#===========================================================================================================
# INITIALIZER
#-----------------------------------------------------------------------------------------------------------
module.exports = ( _app ) ->
  app = _app
  return MKTS

#===========================================================================================================
# ACTIONS
#-----------------------------------------------------------------------------------------------------------
@actions = {}

@actions[ 'demo' ]
@actions[ 'demo-1' ]
@actions[ 'print' ]
@actions[ 'print-preview' ]
@actions[ 'open' ]
@actions[ 'save' ]
@actions[ 'save-as' ]

#-----------------------------------------------------------------------------------------------------------
@actions[ 'view-test' ] = =>
  window.location.href = './test.html'


