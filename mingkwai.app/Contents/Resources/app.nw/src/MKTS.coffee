




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
### https://github.com/TooTallNate/node-applescript ###
APPLESCRIPT               = require 'applescript'
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
  # window                  = app[ 'window' ]
  # q                       = app[ 'jQuery' ]
  # document                = window.document
  # width                   = ( q window ).width()
  # height                  = ( q window ).height()
  # left                    = ( q document ).scrollLeft()
  # top                     = ( q document ).scrollTop()
  # page_x                  = left + width  / 2
  # page_y                  =  top + height / 2
  # zmr                     = window.convertPointFromPageToNode ( app[ 'zoomer' ].get 0 ), page_x, page_y
  zoom_0                  = app[ 'zoom' ]
  zoom_1                  = zoom_0 * factor
  app[ 'zoom' ]           = zoom_1
  #.........................................................................................................
  # ( q '#tg' ).css 'left', zmr[ 'x' ] - 5
  # ( q '#tg' ).css 'top',  zmr[ 'y' ] - 5
  # matrix  = app[ 'zoomer' ].css 'transform'
  # app[ 'zoomer' ].css 'transform',        "matrix(1, 0, 0, 1, 0, 0)"
  # app[ 'zoomer' ].css 'transform-origin', "#{zmr[ 'x' ]}px #{zmr[ 'y' ]}px"
  # app[ 'zoomer' ].css 'transform', matrix
  app[ 'zoomer' ].css 'transform-origin', "top left"
  app[ 'zoomer' ].transition scale: zoom_1, 100, 'linear'
  #.........................................................................................................
  # echo 'factor:  ', ƒ factor
  # echo 'zoom_0:  ', ƒ zoom_0
  # echo 'zoom_1:  ', ƒ zoom_1
  # echo 'width:   ', ƒ width
  # echo 'height:  ', ƒ height
  # echo 'left:    ', ƒ left
  # echo 'top:     ', ƒ top
  # echo 'page_x:  ', ƒ page_x
  # echo 'page_y:  ', ƒ page_y
  echo "zoomed to [ #{ƒ zoom_1}, ]"

#-----------------------------------------------------------------------------------------------------------
@ZOOM.to = ( zoom_1 ) =>
  zoom_0                  = app[ 'zoom' ]
  app[ 'zoom' ]           = zoom_1
  app[ 'zoomer' ].transition scale: zoom_1, 100, 'linear'
  whisper 'zoom_0:  ', ƒ zoom_0
  whisper 'zoom_1:  ', ƒ zoom_1
  help "zoomed to [ #{ƒ zoom_1}, ]"

#===========================================================================================================
# GAUGE
#-----------------------------------------------------------------------------------------------------------
@GAUGE = {}

#-----------------------------------------------------------------------------------------------------------
@GAUGE.new = ( app ) =>
  R =
    'd.mm':                 1000
    'd.npx':                null
    'd.rpx':                null
    'rho':                  null
    'rpx-per-mm':           null
    'npx-per-mm':           null
  return R

#-----------------------------------------------------------------------------------------------------------
@GAUGE.set_ratios = ( app ) =>
  ### Since the gauge is 1m = 1000mm wide, a thousandth of its width in pixels equals pixels per
  millimeter: ###
  { jQuery
    window }  = app
  gauge_jq    = jQuery "<div id='meter-gauge' style='position:absolute;width:1000mm;'></div>"
  ( jQuery 'body' ).append gauge_jq
  #.........................................................................................................
  gauge                         = app[ 'gauge' ]
  d_mm                          = gauge[ 'd.mm' ]
  gauge[ 'd.npx'      ] = d_npx = parseInt ( gauge_jq.css 'width' ), 10
  gauge[ 'd.rpx'      ] = d_rpx = window.BD.get_rectangle gauge_jq, 'width'
  gauge[ 'rho'        ] =         d_npx / d_rpx
  gauge[ 'rpx-per-mm' ] =         d_rpx / d_mm
  gauge[ 'npx-per-mm' ] =         d_npx / d_mm
  #.........................................................................................................
  gauge_jq.detach()
  return null

#-----------------------------------------------------------------------------------------------------------
@GAUGE._get = ( app ) =>
  ( @GAUGE.set_ratios app ) unless ( ( R = app[ 'gauge' ] )[ 'rpx-per-mm' ] )?
  return R

#-----------------------------------------------------------------------------------------------------------
@GAUGE.mm_from_rpx = ( app, d_rpx ) => d_rpx / ( @GAUGE._get app )[ 'rpx-per-mm' ]
@GAUGE.mm_from_npx = ( app, d_npx ) => d_npx / ( @GAUGE._get app )[ 'npx-per-mm' ]
@GAUGE.rpx_from_mm = ( app, d_mm  ) => d_mm  * ( @GAUGE._get app )[ 'rpx-per-mm' ]
@GAUGE.npx_from_mm = ( app, d_mm  ) => d_mm  * ( @GAUGE._get app )[ 'npx-per-mm' ]


#===========================================================================================================
# CARET
#-----------------------------------------------------------------------------------------------------------
@CARET = {}

#-----------------------------------------------------------------------------------------------------------
@CARET.as_url = ( app, matter ) =>
  file_locator    = 'matter'
  { caret }       = matter
  page_nr         = caret[ 'page-nr'   ]
  column_nr       = caret[ 'column-nr' ]
  y_px            = caret[ 'y.px'      ]
  return "mkts://#{file_locator}#page:#{page_nr}/column:#{column_nr}/y:#{y_px}px"


#===========================================================================================================
# VIEW
#-----------------------------------------------------------------------------------------------------------
@VIEW = {}

#-----------------------------------------------------------------------------------------------------------
@VIEW.toggle_galley = ( handler = null ) =>
  debug '©0fZv5', app[ 'view' ]
  if app[ 'view' ] is 'pages' then @VIEW.show_galley handler else @VIEW.show_pages handler

#-----------------------------------------------------------------------------------------------------------
@VIEW.show_galley = ( handler = null ) =>
  window          = app[ 'window' ]
  jQuery          = app[ 'jQuery' ]
  ( jQuery 'artboard.galley'  ).css 'z-index', +1
  ( jQuery 'artboard.pages'   ).css 'z-index', -1
  app[ 'view' ]   = 'galley'
  handler null if handler?

#-----------------------------------------------------------------------------------------------------------
@VIEW.show_pages = ( handler = null ) =>
  window          = app[ 'window' ]
  jQuery          = app[ 'jQuery' ]
  ( jQuery 'artboard.pages'   ).css 'z-index', +1
  ( jQuery 'artboard.galley'  ).css 'z-index', -1
  app[ 'view' ]   = 'pages'
  handler null if handler?

#-----------------------------------------------------------------------------------------------------------
@VIEW.test_page = =>
  app[ 'window' ].location.href = app[ 'window' ].location.href.replace /index\.html$/, 'test.html'
  return null


# #-----------------------------------------------------------------------------------------------------------
# MKTS._detach_artboard = ( me ) ->
#   ### TAINT `#mkts-top`, `#mkts-bottom` not honored; are they needed? ###
#   return if me[ 'view-mode' ] is 'print'
#   body      = $ 'body'
#   artboard  = $ 'artboard'
#   contents  = artboard.contents()
#   artboard.detach()
#   body.append contents
#   me[ '%memo' ][ 'view-mode' ] = { contents, artboard, body, }
#   return null

# #-----------------------------------------------------------------------------------------------------------
# MKTS._reattach_artboard = ( me ) ->
#   return if me[ 'view-mode' ] is 'dev'
#   { contents, artboard, body, } = me[ '%memo' ][ 'view-mode' ]
#   delete me[ '%memo' ][ 'view-mode' ]
#   contents.detach()
#   artboard.append contents
#   body.append artboard
#   return null

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

#-----------------------------------------------------------------------------------------------------------
MKTS.open_print_dialog = ( me ) ->
  # @switch_to_print_view me
  window.print()
  # @switch_to_dev_view me

#-----------------------------------------------------------------------------------------------------------
MKTS.open_save_dialog = ( me ) -> throw new Error "not implemented"
MKTS.save = ( me ) -> throw new Error "not implemented"
  # route   = '/tmp/mkts/index.html'
  # njs_fs.writeFileSync route, ( $ 'html' ).outerHTML()

#-----------------------------------------------------------------------------------------------------------
MKTS.open_print_preview = ( me ) ->
  ### NB the solution adopted here to get a quick shortcut to open a print preview of the current document
  using AppleScript sending keys etc. is deeply flawed. Not only must tabbing be enabled in the
  Accessibility Settings of the target machine, it would also appear that the outcome of such actions as
  `click menu button "PDF" of window "Print"` are dependent on the OS language settings, and maybe even
  OS version. Last but not least, it can experimentally be made plausible that it is the `repeat` loops
  of the *previous* (not the *current*) script execution that really trigger the actions, which is
  deeply unsatisfying and feels plain wrong. Furthermore, haphazard user actions such as hitting a key
  or clicking during script execution may probably meddle with the intended flow of events. In short, the
  solution as implemented is nothing more than a crude stop-gap. ###
  help "MKTS.open_print_preview"
  # @switch_to_print_view me
  MKTS.open_print_dialog()
  #.........................................................................................................
  # script = """
  #   tell application "System Events"
  #     tell process "mingkwai"
  #       keystroke "p" using {shift down, command down}
  #       repeat until exists window "Print"
  #       end repeat
  #       click menu button "PDF" of window "Print"
  #       repeat until exists menu item "Open PDF in Preview" of menu 1 of menu button "PDF" of window "Print"
  #       end repeat
  #       click menu item "Open PDF in Preview" of menu 1 of menu button "PDF" of window "Print"
  #     end tell
  #   end tell
  #   """
  # script = """
  #   local hasWindowPrint
  #   local hasOpenInPreview
  #   set hasWindowPrint    to false
  #   set hasOpenInPreview  to false
  #   tell application "System Events"
  #     tell process "mingkwai"
  #       keystroke "p" using {shift down, command down}
  #       repeat 3 times
  #         say "trying to find print window" using "Pipe Organ"
  #         if exists window "Print" then
  #           set hasWindowPrint to true
  #           exit repeat
  #         end if
  #         delay 0.5
  #       end repeat
  #       if hasWindowPrint then
  #         click menu button "PDF" of window "Print"
  #         repeat 3 times
  #           say "trying to open in preview" using "Pipe Organ"
  #           if exists menu item "Open PDF in Preview" of menu 1 of menu button "PDF" of window "Print" then
  #             set hasOpenInPreview to true
  #             exit repeat
  #           end if
  #           delay 0.5
  #         end repeat
  #         if hasOpenInPreview then
  #           click menu item "Open PDF in Preview" of menu 1 of menu button "PDF" of window "Print"
  #         end if
  #       end if
  #     end tell
  #   end tell
  #   if hasWindowPrint and hasOpenInPreview then
  #     say "enjoy" using "Good News"
  #   else
  #     say "i'm sorry" using "Good News"
  #   end if
  #   """
  # script = """
  #   tell application "System Events"
  #     tell process "mingkwai"
  #       keystroke "p" using {shift down, command down}
  #     end tell
  #   end tell
  #   delay 0.5
  #   tell application "System Events"
  #     -- tell process "mingkwai"
  #       click menu button "PDF" of window "Print"
  #     -- end tell
  #   end tell
  #   delay 0.5
  #   tell application "System Events"
  #     -- tell process "mingkwai"
  #       click menu item "Open PDF in Preview" of menu 1 of menu button "PDF" of window "Print"
  #     -- end tell
  #   end tell
  #   """
  # script = """
  #   tell application "System Events"
  #     tell process "mingkwai"
  #       keystroke "p" using {shift down, command down}
  #       click menu button "PDF" of window "Print"
  #       click menu item "Open PDF in Preview" of menu 1 of menu button "PDF" of window "Print"
  #     end tell
  #   end tell
  #   """
      # tell process "Preview"
      #   repeat until exists window "Preview"
      #   end repeat
      #   key code 48 using {shift down}
      #   key code 48 using {shift down}
      # end tell
      # tell process "Preview"
      #   keystroke "p" using {shift down, command down}
      # end tell
  ### thx to http://apple.stackexchange.com/a/36947/59895, http://www.jaimerios.com/?p=171 ###
  ### TAINT Note the delay clauses. Since it is the previous execution of the script that takes the intended
  actions, each script invocation will run indefinitely, even after the app process itself has been
  terminated. Programming a Tight Loop in AppleScript will cause a noticeable CPU load which is reduced
  to the permille level by the timeout. As stated above, this is nothing more than a stop-gap solution. ###
  script = """
    tell application "System Events"
      tell process "mingkwai"
        keystroke "p" using {shift down, command down}
        repeat until exists window "Print"
          delay 0.1
        end repeat
        click menu button "PDF" of window "Print"
        repeat until exists menu item "Open PDF in Preview" of menu 1 of menu button "PDF" of window "Print"
          delay 0.1
        end repeat
        click menu item "Open PDF in Preview" of menu 1 of menu button "PDF" of window "Print"
      end tell
    end tell
    """
  #.........................................................................................................
  APPLESCRIPT.execString script, ( error ) =>
    throw error if error?
    # @switch_to_dev_view me
    help "MKTS.open_print_preview: ok"


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


