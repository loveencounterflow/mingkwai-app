


############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
# #...........................................................................................................
# TEXT                      = require 'coffeenode-text'
# TYPES                     = require 'coffeenode-types'
# BNP                       = require 'coffeenode-bitsnpieces'
#...........................................................................................................
TRM                       = require 'coffeenode-trm'
rpr                       = TRM.rpr.bind TRM
badge                     = '眀快排字机'
log                       = TRM.get_logger 'plain',   badge
info                      = TRM.get_logger 'info',    badge
alert                     = TRM.get_logger 'alert',   badge
debug                     = TRM.get_logger 'debug',   badge
warn                      = TRM.get_logger 'warn',    badge
urge                      = TRM.get_logger 'urge',    badge
whisper                   = TRM.get_logger 'whisper', badge
help                      = TRM.get_logger 'help',    badge
echo                      = TRM.echo.bind TRM
# #...........................................................................................................
# ### Module to control application life ###
# app                       = require 'app'
# ### Report crashes to our server ###
# ( require 'crash-reporter' ).start()
# ### Module to create native browser window ###
# # remote                    = require 'remote'
# BrowserWindow             = require 'browser-window'
# # BrowserWindow             = remote.require 'browser-window'
# #...........................................................................................................
# shell                     = require 'shell'
TEMPLATES                 = require './TEMPLATES'
html_route                = njs_path.join __dirname, '../lib/index.html'
#...........................................................................................................
njs_fs.writeFileSync html_route, TEMPLATES.layout(), encoding: 'utf-8'
urge "wrote #{html_route}"
# throw new Error "#{__filename} not in use"
# #-----------------------------------------------------------------------------------------------------------
# ### Keep a global reference of the window object, if you don't, the window will
# be closed automatically when the javascript object is GCed. ###
# main_window = null

# #-----------------------------------------------------------------------------------------------------------
# ### Quit when all windows are closed ###
# app.on 'window-all-closed', ->
#   app.quit() unless process.platform is 'darwin'


# #-----------------------------------------------------------------------------------------------------------
# ### This method will be called when atom-shell has done everything
# initialization and ready for creating browser windows. ###
# # app.commandLine.appendSwitch 'js-flags', '--harmony'
# app.on 'ready', ->
#   # Create the browser window.
#   settings =
#     'width':                        1500
#     'height':                       1000
#     'frame':                        yes
#     # 'always-on-top':                yes
#     'accept-first-mouse':           yes
#     'title':                        '眀快排字機'
#     'show':                         yes
#     'zoom-factor':                  2
#     'enable-larger-than-screen':    yes
#     'web-settings':
#       'web-security':                   no
#       'images':                         yes
#       'experimental-features':          yes
#       'experimental-canvas-features':   yes
#   main_window = new BrowserWindow settings
#   main_window.isAlwaysOnTop yes
#   main_window.loadUrl "file://#{__dirname}/index.html"
#   main_window.openDevTools()
#   main_window.focusOnWebView()
#   main_window.focus()
#   # TRM.dir main_window
#   help 'started'
#   rectangle =
#     'x':        0
#     'y':        0
#     'width':    1000
#     'height':   3000
#   TRM.dir main_window.webContents
#   page = main_window.webContents
#   page.on 'did-finish-load', ->
#     help 'loaded'
#     # debug '©fiJ2e', main_window.print
#     # main_window.capturePage rectangle, ( img ) ->
#     main_window.capturePage ( img ) ->
#       # shell.beep()
#       help img.length
#       img_route = '/tmp/my-first-page.png'
#       debug '©3QQgN', img_route
#       njs_fs.writeFileSync img_route, img

#   #---------------------------------------------------------------------------------------------------------
#   page.on 'crashed',                  -> urge 'page.crashed'
#   page.on 'destroyed',                -> urge 'page.destroyed'
#   page.on 'did-fail-load',            -> urge 'page.did-fail-load'
#   page.on 'did-finish-load',          -> urge 'page.did-finish-load'
#   page.on 'did-frame-finish-load',    -> urge 'page.did-frame-finish-load'
#   page.on 'did-get-redirect-request', -> urge 'page.did-get-redirect-request'
#   page.on 'did-start-loading',        -> urge 'page.did-start-loading'
#   page.on 'did-stop-loading',         -> urge 'page.did-stop-loading'
#   page.on 'new-window',               -> urge 'page.new-window'
#   page.on 'will-navigate',            -> urge 'page.will-navigate'

#   #---------------------------------------------------------------------------------------------------------
#   main_window.on 'closed', ->
#     # Dereference the window object. Usually you would store windows
#     # in an array if your app supports multi windows.
#     main_window = null

#   #---------------------------------------------------------------------------------------------------------
#   main_window.on 'page-title-updated',  -> help 'window.page-title-updated'
#   main_window.on 'blur',                -> help 'window.blur'
#   main_window.on 'closed',              -> help 'window.closed'
#   main_window.on 'devtools-closed',     -> help 'window.devtools-closed'
#   main_window.on 'devtools-opened',     -> help 'window.devtools-opened'
#   main_window.on 'enter-full-screen',   -> help 'window.enter-full-screen'
#   main_window.on 'focus',               -> help 'window.focus'
#   main_window.on 'leave-full-screen',   -> help 'window.leave-full-screen'
#   main_window.on 'maximize',            -> help 'window.maximize'
#   main_window.on 'minimize',            -> help 'window.minimize'
#   main_window.on 'responsive',          -> help 'window.responsive'
#   main_window.on 'restore',             -> help 'window.restore'
#   main_window.on 'unmaximize',          -> help 'window.unmaximize'
#   main_window.on 'unresponsive',        -> help 'window.unresponsive'


# # window.onbeforeunload = function(e) {
# #   console.log('I do not want to be closed');

# #   // Unlike usual browsers, in which a string should be returned and the user is
# #   // prompted to confirm the page unload. atom-shell gives the power completely
# #   // to the developers, return empty string or false would prevent the unloading
# #   // now. You can also use the dialog API to let user confirm it.
# #   return false;
# # };





# ###
# settings =
#   'x':                         0 # Integer - Window's left offset to screen
#   'y':                         0 # Integer - Window's top offset to screen
#   'width':                     0 # Integer - Window's width
#   'height':                    0 # Integer - Window's height
#   'use-content-size':          0 # Boolean - The width and height would be used as web page's size, which means the actual window's size will include window frame's size and be slightly larger.
#   'center':                    0 # Boolean - Show window in the center of the screen
#   'min-width':                 0 # Integer - Minimum width
#   'min-height':                0 # Integer - Minimum height
#   'max-width':                 0 # Integer - Maximum width
#   'max-height':                0 # Integer - Maximum height
#   'resizable':                 0 # Boolean - Whether window is resizable
#   'always-on-top':             0 # Boolean - Whether the window should always stay on top of other windows
#   'fullscreen':                0 # Boolean - Whether the window should show in fullscreen, when set to false the fullscreen button would also be hidden on OS X
#   'skip-taskbar':              0 # Boolean - Do not show window in taskbar
#   'zoom-factor':               0 # Number - The default zoom factor of the page, zoom factor is zoom percent / 100, so 3.0 represents 300%
#   'kiosk':                     0 # Boolean - The kiosk mode
#   'title':                     0 # String - Default window title
#   'icon':                      0 # Image - The window icon
#   'show':                      0 # Boolean - Whether window should be shown when created
#   'frame':                     0 # Boolean - Specify false to create a Frameless Window
#   'node-integration':          0 # Boolean - Whether node integration is enabled, default is true
#   'accept-first-mouse':        0 # Boolean - Whether the web view accepts a single mouse-down event that simultaneously activates the window
#   'auto-hide-menu-bar':        0 # Boolean - Auto hide the menu bar unless the Alt key is pressed.
#   'enable-larger-than-screen': 0 # Boolean - Enable the window to be resized larger than screen.
#   'dark-theme':                0 # Boolean - Forces using dark theme for the window, only works on some GTK+3 desktop environments
#   'preload':                   0 # String - Specifies a script that will be loaded before other scripts run in the window.
#                                  # This script will always have access to node APIs no matter whether node integration is
#                                  # turned on for the window, and the path of preload script has to be absolute path.

#     'web-preferences': # Object - Settings of web page's features
#         'javascript':                   yes # Boolean
#         'web-security':                 yes # Boolean
#         'images':                       yes # Boolean
#         'java':                         yes # Boolean
#         'text-areas-are-resizable':     yes # Boolean
#         'webgl':                        yes # Boolean
#         'webaudio':                     yes # Boolean
#         'plugins':                      yes # Boolean - Whether plugins should be enabled, currently only NPAPI plugins are supported.
#         'extra-plugin-dirs':            yes # Array - Array of paths that would be searched for plugins. Note that if you want to add a directory under your app, you should use __dirname or process.resourcesPath to join the paths to make them absolute, using relative paths would make atom-shell search under current working directory.
#         'experimental-features':        yes # Boolean
#         'experimental-canvas-features': yes # Boolean
#         'subpixel-font-scaling':        yes # Boolean
#         'overlay-scrollbars':           yes # Boolean
#         'overlay-fullscreen-video':     yes # Boolean
#         'shared-worker':                yes # Boolean
#         'direct-write':                 yes # Boolean - Whether the DirectWrite font rendering system on Windows is enabled

# ###









