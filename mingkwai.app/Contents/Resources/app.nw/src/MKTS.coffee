




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
ƒ                         = ( x, precision = 2 ) -> x.toFixed precision

#===========================================================================================================
# INITIALIZER
#-----------------------------------------------------------------------------------------------------------
module.exports = ( _app ) ->
  app = _app
  return MKTS


#===========================================================================================================
# ZOOM
#-----------------------------------------------------------------------------------------------------------
@ZOOM = {}

# #-----------------------------------------------------------------------------------------------------------
# @ZOOM.revert_zoom = ( me ) ->
#   ### TAINT code duplication ###
#   return unless ( last_zoom_level = me[ '%memo' ][ 'last-zoom-level' ] )?
#   return @zoom_to me, last_zoom_level

# #-----------------------------------------------------------------------------------------------------------
# @ZOOM.zoom_percent_from_level = ( me, level = null ) ->
#   level ?= win.zoomLevel
#   return ( level - me[ 'base-zoom-level' ] ) * 1.2 * 100

  # me[ '%memo' ][ 'last-zoom-level' ]  = win.zoomLevel
  # win.zoomLevel                       = level ? me[ 'base-zoom-level' ]
  # #.........................................................................................................
  # return win.zoomLevel

# #-----------------------------------------------------------------------------------------------------------
# @ZOOM.zoom = ( me, delta ) ->
#   me[ '%memo' ][ 'last-zoom-level' ]  = win.zoomLevel
#   #.........................................................................................................
#   if delta?
#     if ( delta > 0 and win.zoomLevel <= 8.8 ) or ( delta < 0 and win.zoomLevel >= -7.5 )
#       win.zoomLevel += delta
#   #.........................................................................................................
#   else
#     win.zoomLevel = me[ 'base-zoom-level' ]
#   #.........................................................................................................
#   help "zoomed to #{ƒ win.zoomLevel} (#{ƒ ( @zoom_percent_from_level me ), 0}%)"
#   return win.zoomLevel

#-----------------------------------------------------------------------------------------------------------
@ZOOM._get_zoom_levels = =>
  R           = []
  matcher     = /[-.e0-9]+/g
  idx         = -1
  matrix_txt  = app[ 'zoomer' ].css 'transform'
  while ( match = matcher.exec matrix_txt )?
    idx += 1
    R.push parseFloat match[ 0 ] if idx in [ 0, 3, ]
  return R

#-----------------------------------------------------------------------------------------------------------
@ZOOM.to_delta = ( delta ) =>
  [ scale_x, scale_y, ] = @ZOOM._get_zoom_levels()
  scale_x              += delta
  scale_y              += delta
  app[ 'zoomer' ].css 'transform', "matrix(#{scale_x}, 0, 0, #{scale_y}, 0, 0)"
  help "zoomed to [ #{ƒ scale_x}, #{ƒ scale_y}, ]"

#-----------------------------------------------------------------------------------------------------------
@ZOOM.by = ( factor ) =>
  [ center_x, center_y, ] = app[ 'mouse-position' ]
  [ scale_x, scale_y, ]   = @ZOOM._get_zoom_levels()
  scale_x                *= factor
  scale_y                *= factor
  # app[ 'zoomer' ].css 'transform-origin', "#{center_x}px #{center_y}px"
  app[ 'zoomer' ].css 'transform',        "matrix(#{scale_x}, 0, 0, #{scale_y}, 0, 0)"
  help "zoomed to [ #{ƒ scale_x}, #{ƒ scale_y}, ]"

#-----------------------------------------------------------------------------------------------------------
@ZOOM.to = ( scale_x, scale_y = null ) =>
  scale_y ?= scale_x
  app[ 'zoomer' ].css 'transform', "matrix(#{scale_x}, 0, 0, #{scale_y}, 0, 0)"
  help "zoomed to [ #{ƒ scale_x}, #{ƒ scale_y}, ]"


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


