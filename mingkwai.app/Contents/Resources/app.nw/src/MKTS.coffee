




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

# #-----------------------------------------------------------------------------------------------------------
# @ZOOM._get_zoom_levels = =>
#   ### TAINT more efficient to cache value as `app[ 'zoom' ]` or `app[ 'scale' ]` ###
#   R           = []
#   matcher     = /[-.e0-9]+/g
#   idx         = -1
#   matrix_txt  = app[ 'zoomer' ].css 'transform'
#   while ( match = matcher.exec matrix_txt )?
#     idx += 1
#     R.push parseFloat match[ 0 ] if idx in [ 0, 3, ]
#   return R

# #-----------------------------------------------------------------------------------------------------------
# @ZOOM.to_delta = ( delta ) =>
#   [ scale_x, scale_y, ] = @ZOOM._get_zoom_levels()
#   scale_x              += delta
#   scale_y              += delta
#   app[ 'zoomer' ].css 'transform', "matrix(#{scale_x}, 0, 0, #{scale_y}, 0, 0)"
#   help "zoomed to [ #{ƒ scale_x}, #{ƒ scale_y}, ]"

#-----------------------------------------------------------------------------------------------------------
@ZOOM.by = ( factor ) =>
  window                  = app[ 'window' ]
  q                       = app[ 'jQuery' ]
  document                = window.document
  width                   = ( q window ).width()
  height                  = ( q window ).height()
  left                    = ( q document ).scrollLeft()
  top                     = ( q document ).scrollTop()
  page_x                  = left + width  / 2
  page_y                  =  top + height / 2
  zmr                     = window.convertPointFromPageToNode ( app[ 'zoomer' ].get 0 ), page_x, page_y
  zoom_0                  = app[ 'zoom' ]
  zoom_1                  = zoom_0 * factor
  app[ 'zoom' ]           = zoom_1
  #.........................................................................................................
  ( q '#tg' ).css 'left', zmr[ 'x' ] - 5
  ( q '#tg' ).css 'top',  zmr[ 'y' ] - 5
  matrix  = app[ 'zoomer' ].css 'transform'
  # app[ 'zoomer' ].css 'transform',        "matrix(1, 0, 0, 1, 0, 0)"
  app[ 'zoomer' ].css 'transform-origin', "#{zmr[ 'x' ]}px #{zmr[ 'y' ]}px"
  # app[ 'zoomer' ].css 'transform', matrix
  app[ 'zoomer' ].transition scale: zoom_1, 100, 'linear'
  #.........................................................................................................
  whisper 'factor:  ', ƒ factor
  whisper 'zoom_0:  ', ƒ zoom_0
  whisper 'zoom_1:  ', ƒ zoom_1
  whisper 'width:   ', ƒ width
  whisper 'height:  ', ƒ height
  whisper 'left:    ', ƒ left
  whisper 'top:     ', ƒ top
  whisper 'page_x:  ', ƒ page_x
  whisper 'page_y:  ', ƒ page_y
  help "zoomed to [ #{ƒ zoom_1}, ]"

#-----------------------------------------------------------------------------------------------------------
@ZOOM.to = ( zoom_1 ) =>
  zoom_0                  = app[ 'zoom' ]
  app[ 'zoom' ]           = zoom_1
  app[ 'zoomer' ].transition scale: zoom_1, 100, 'linear'
  whisper 'zoom_0:  ', ƒ zoom_0
  whisper 'zoom_1:  ', ƒ zoom_1
  help "zoomed to [ #{ƒ zoom_1}, ]"



#===========================================================================================================
# VIEW
#-----------------------------------------------------------------------------------------------------------
@VIEW = {}

#-----------------------------------------------------------------------------------------------------------
@VIEW.toggle_galley = =>
  debug '©0fZv5', app[ 'view' ]
  if app[ 'view' ] is 'pages' then @VIEW.show_galley() else @VIEW.show_pages()
  return true

#-----------------------------------------------------------------------------------------------------------
@VIEW.show_galley = =>
  window                              = app[ 'window' ]
  q                                   = app[ 'jQuery' ]
  app[ 'view' ]                       = 'galley'
  app[ 'pages-last-scroll-xy' ][ 0 ]  = ( q window ).scrollLeft()
  app[ 'pages-last-scroll-xy' ][ 1 ]  = ( q window ).scrollTop()
  ( q 'artboard.pages' ).animate opacity: 0, =>
    ( q 'artboard.pages' ).css 'display', 'none'

#-----------------------------------------------------------------------------------------------------------
@VIEW.show_pages = =>
  window                  = app[ 'window' ]
  q                       = app[ 'jQuery' ]
  app[ 'view' ]           = 'pages'
  ( q 'artboard.pages' ).css 'display', 'block'
  ( q window ).scrollLeft app[ 'pages-last-scroll-xy' ][ 0 ]
  ( q window ).scrollTop  app[ 'pages-last-scroll-xy' ][ 1 ]
  ( q 'artboard.pages' ).animate opacity: 1


# #-----------------------------------------------------------------------------------------------------------
# MKTS.switch_to_print_view = ( me ) ->
#   help "MKTS.switch_to_print_view"
#   return if me[ 'view-mode' ] is 'print'
#   @_detach_artboard me
#   me[ 'view-mode' ] = 'print'
#   return null

# #-----------------------------------------------------------------------------------------------------------
# MKTS.switch_to_dev_view = ( me ) ->
#   help "MKTS.switch_to_dev_view"
#   return if me[ 'view-mode' ] is 'dev'
#   @_reattach_artboard me
#   me[ 'view-mode' ] = 'dev'
#   return null

# #-----------------------------------------------------------------------------------------------------------
# MKTS.toggle_view = ( me ) ->
#   switch view_mode = me[ 'view-mode' ]
#     when 'print'  then @switch_to_dev_view    me
#     when 'dev'    then @switch_to_print_view  me
#     else throw new Error "unknown view mode #{rpr view_mode}"


#===========================================================================================================
# ACTIONS
#-----------------------------------------------------------------------------------------------------------
@ACTIONS = {}

@ACTIONS[ 'demo' ]
@ACTIONS[ 'demo-1' ]
@ACTIONS[ 'print' ]
@ACTIONS[ 'print-preview' ]
@ACTIONS[ 'open' ]
@ACTIONS[ 'save' ]
@ACTIONS[ 'save-as' ]

#-----------------------------------------------------------------------------------------------------------
@ACTIONS[ 'view-test' ] = =>
  window.location.href = './test.html'

#-----------------------------------------------------------------------------------------------------------
@ACTIONS[ 'tool-mode-hand' ] = =>
  @push_tool_mode 'hand'


