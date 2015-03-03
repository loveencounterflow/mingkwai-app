


############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/browser'
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
NW                        = require 'nw.gui'
win                       = NW.Window.get()
#...........................................................................................................
suspend                   = require 'coffeenode-suspend'
step                      = suspend.step
immediately               = suspend.immediately
after                     = suspend.after
sleep                     = suspend.sleep
#...........................................................................................................
D                         = require 'pipedreams2'
D$                        = D.remit.bind D
CHR                       = require 'coffeenode-chr'
#...........................................................................................................
LINESETTER                = require './LINESETTER'
#...........................................................................................................
### https://github.com/TooTallNate/node-applescript ###
APPLESCRIPT               = require 'applescript'
#...........................................................................................................
ƒ                         = ( x, precision = 2 ) -> x.toFixed precision


#-----------------------------------------------------------------------------------------------------------
app =
  '%memo':            {}
  'zoom-level':       0
  'base-zoom-level':  -0.15
  'mm-per-px':        100 / 377.94791
  'jQuery':           $
  'NW':               NW
  'MKTS':             null # MKTS
  'window':           window
  'view-mode':        'dev'

#-----------------------------------------------------------------------------------------------------------
### Publish app so we have access to it in both the browser and the NodeJS contexts: ###
window[ 'app' ] = app

#-----------------------------------------------------------------------------------------------------------
MKTS = ( require './MKTS' ) app
### TAINT this line only for transition time: ###
app[ 'MKTS' ] = MKTS


#-----------------------------------------------------------------------------------------------------------
on_file_menu_what_you_should_know_C = ->
  ( $ '#content' ).text "Some kind of interesting stuff."

#-----------------------------------------------------------------------------------------------------------
build_menu = ->
  #.........................................................................................................
  help_menu = new NW.Menu()
  help_menu.append new NW.MenuItem label: 'about mingkwai'
  # help_menu.append new NW.MenuItem label: 'about 眀快排字机'
  help_menu.append new NW.MenuItem label: 'what you should know A'
  help_menu_entry = new NW.MenuItem label: 'Help', 'submenu': help_menu
  #.........................................................................................................
  file_menu = new NW.Menu()
  file_menu.append new NW.MenuItem label: 'New'
  file_menu.append new NW.MenuItem label: 'Open...', click: on_file_menu_what_you_should_know_C
  file_menu.append new NW.MenuItem label: 'Save',                   key: 's', modifiers: 'cmd',       click: -> urge "saving..."
  file_menu.append new NW.MenuItem label: 'Take Screenshot',        key: 's', modifiers: 'cmd-shift', click: -> MKTS.take_screenshot app
  file_menu.append new NW.MenuItem label: 'Typeset Demo',           key: 'y', modifiers: 'cmd',       click: -> MKTS.demo app
  file_menu.append new NW.MenuItem label: 'Print...',               key: 'p', modifiers: 'cmd-shift', click: -> MKTS.open_print_dialog app
  file_menu.append new NW.MenuItem label: 'Open Print Preview...',  key: 'p', modifiers: 'cmd',       click: -> MKTS.open_print_preview app
  file_menu_entry = new NW.MenuItem label: 'File', 'submenu': file_menu
  #.........................................................................................................
  view_menu = new NW.Menu()
  view_menu.append new NW.MenuItem label: 'Toggle Dev / Print View', key: 't', modifiers: 'cmd',      click: -> MKTS.toggle_view app
  view_menu_entry = new NW.MenuItem label: 'View', 'submenu': view_menu
  #.........................................................................................................
  win_menu  = new NW.Menu type: 'menubar'
  # win_menu.append new NW.MenuItem label: '眀快排字机', 'submenu': app_menu
  win_menu.createMacBuiltin 'mingkwai'
  # win_menu.createMacBuiltin '眀快排字机'
  win_menu.insert file_menu_entry, 1
  win_menu.insert view_menu_entry, 3
  win_menu.append help_menu_entry
  win.menu  = win_menu
  # win_menu.items.push new NW.MenuItem label: 'Help', 'submenu': help_menu
  edit_menu_item = win.menu.items[ 2 ]
  # CND.dir edit_menu_item
  # CND.dir edit_menu_item.submenu
  edit_menu_item.submenu.insert ( new NW.MenuItem label: 'xxxxxxxxx' ), 1
  # debug '©RsQep', edit_menu_item.type
  #.........................................................................................................
  # edit_menu_item = win.menu.items[ 2 ]
  #.........................................................................................................
  return null

build_menu()
win.show()
win.focus()
# win.zoomLevel = 0 # 100%
# win.setResizable yes
# win.resizeTo 1500, 1500
# win.setTransparent yes # ???
# win.showDevTools()
# win.setProgressBar 0.5 # visible on dock icon
# win.setBadgeLabel = 'helo from 眀快排字机' # ???

# help '©5t3', document.visibilityState
# CND.dir win
# help ( name for name of window).join ' '


# win.on 'blur',              -> info 'blur'
# win.on 'capturepagedone',   -> info 'capturepagedone'
win.on 'close',             -> info 'close'; @close true
# win.on 'closed',            -> info 'closed'
# win.on 'devtools-closed',   -> info 'devtools-closed'
# win.on 'devtools-opened',   -> info 'devtools-opened'
# win.on 'document-end',      -> info 'document-end'
# win.on 'document-start',    -> info 'document-start'
# win.on 'enter-fullscreen',  -> info 'enter-fullscreen'
# win.on 'focus',             -> info 'focus'
# win.on 'leave-fullscreen',  -> info 'leave-fullscreen'
# win.on 'loaded',            -> info 'loaded'
# win.on 'loading',           -> info 'loading'
# win.on 'maximize',          -> info 'maximize'
# win.on 'minimize',          -> info 'minimize'
# win.on 'move',              -> info 'move'
# win.on 'new-win-policy',    -> info 'new-win-policy'
# win.on 'resize',            -> info 'resize'
# win.on 'restore',           -> info 'restore'
# win.on 'unmaximize',        -> info 'unmaximize'
# win.on 'zoom',              -> info 'zoom'
# debug '©AfAsc', 'window.devicePixelRatio  ', window.devicePixelRatio
# debug '©AfAsc', 'window.devicePixelRatio  ', window.devicePixelRatio
# debug '©igYFq', 'window.screen.availTop   ', window.screen.availTop
# debug '©VUTiB', 'window.screen.availLeft  ', window.screen.availLeft
# debug '©o8v8T', 'window.screen.availHeight', window.screen.availHeight
# debug '©Ubkrt', 'window.screen.availWidth ', window.screen.availWidth
# debug '©zvq8U', 'window.screen.colorDepth ', window.screen.colorDepth
# debug '©nH9a6', 'window.screen.height     ', window.screen.height
# debug '©YDbG3', 'window.screen.left       ', window.screen.left
# debug '©j0QXK', 'window.screen.orientation', window.screen.orientation
# debug '©wEUqB', 'window.screen.pixelDepth ', window.screen.pixelDepth
# debug '©G5QV3', 'window.screen.top        ', window.screen.top
# debug '©7Kqfv', 'window.screen.width      ', window.screen.width

# #-----------------------------------------------------------------------------------------------------------
# win.on 'resize', ->
#   info "resized to #{win.width} x #{win.height}"

# #-----------------------------------------------------------------------------------------------------------
# win.on 'move', ->
#   info "moved to #{win.x}, #{win.y}"

#-----------------------------------------------------------------------------------------------------------
MKTS.get_document_size = ( me ) -> [ ( $ 'html' ).outerWidth(), ( $ 'html' ).outerHeight(), ]

#-----------------------------------------------------------------------------------------------------------
MKTS.maximize = ( app ) ->
  win.moveTo   window.screen.availLeft,  window.screen.availTop
  win.resizeTo window.screen.availWidth, window.screen.availHeight


#-----------------------------------------------------------------------------------------------------------
MKTS.revert_zoom = ( me ) ->
  ### TAINT code duplication ###
  return unless ( last_zoom_level = me[ '%memo' ][ 'last-zoom-level' ] )?
  return @zoom_to me, last_zoom_level

#-----------------------------------------------------------------------------------------------------------
MKTS.zoom_percent_from_level = ( me, level = null ) ->
  level ?= win.zoomLevel
  return ( level - me[ 'base-zoom-level' ] ) * 1.2 * 100

#-----------------------------------------------------------------------------------------------------------
MKTS.zoom_to = ( me, level = null ) ->
  ### TAINT code duplication ###
  me[ '%memo' ][ 'last-zoom-level' ]  = win.zoomLevel
  win.zoomLevel                       = level ? me[ 'base-zoom-level' ]
  #.........................................................................................................
  help "zoomed to #{ƒ win.zoomLevel} (#{ƒ ( @zoom_percent_from_level me ), 0}%)"
  return win.zoomLevel

#-----------------------------------------------------------------------------------------------------------
MKTS.zoom = ( me, delta ) ->
  me[ '%memo' ][ 'last-zoom-level' ]  = win.zoomLevel
  #.........................................................................................................
  if delta?
    if ( delta > 0 and win.zoomLevel <= 8.8 ) or ( delta < 0 and win.zoomLevel >= -7.5 )
      win.zoomLevel += delta
  #.........................................................................................................
  else
    win.zoomLevel = me[ 'base-zoom-level' ]
  #.........................................................................................................
  help "zoomed to #{ƒ win.zoomLevel} (#{ƒ ( @zoom_percent_from_level me ), 0}%)"
  return win.zoomLevel

#-----------------------------------------------------------------------------------------------------------
MKTS.wait = ( handler ) ->
  window.requestAnimationFrame -> handler()

#-----------------------------------------------------------------------------------------------------------
MKTS.take_screenshot = ->
  step ( resume ) =>
    ### trying to wait for DOM reflow: ###
    # yield step.wrap window.requestAnimationFrame, resume
    yield MKTS.wait resume
    # help 'animation frame'
    img       = yield MKTS._capture win, resume
    img_route = '/tmp/nw.png'
    yield njs_fs.writeFile img_route, img, resume
    help "image written to #{img_route}"

#-----------------------------------------------------------------------------------------------------------
MKTS.scroll_to = ( label ) ->
  # log '©Rafbc', ( $ '#bottom' ).offset
  ( $ 'html, body' ).stop().animate { scrollTop: ( $ label ).offset().top }, 500

#-----------------------------------------------------------------------------------------------------------
MKTS.scroll_to_top    = -> @scroll_to '#mkts-top'
MKTS.scroll_to_bottom = -> @scroll_to '#mkts-bottom'

#-----------------------------------------------------------------------------------------------------------
MKTS._capture = ( win, handler ) ->
  win.capturePage ( ( img ) => handler null, img ), format: 'png', datatype: 'buffer'

#-----------------------------------------------------------------------------------------------------------
MKTS.demo_1 = ( me ) ->
  # md = require './demo-text'
  md = """

    # Behind the Looking-Glass

    Just as she said this, she noticed that one of the trees had a door
    leading right into it. 'That's very curious!' she thought. 'But
    everything's curious today. I think I may as well go in at once.' And in
    she went.
  """
  MKTS.zoom me, 2
  LINESETTER.demo_1 me, md, ( error ) =>
    MKTS.revert_zoom me
    help "MKTS.demo ok"
  return null

#-----------------------------------------------------------------------------------------------------------
MKTS.demo = ( me ) ->
  # md = require './demo-text'
  ### every&#8203;<cork></cork>­&shy;thing ###
  ### every<cork></cork>­&shy;thing ###
  md = """And in she went. every&#x200b;&#x4e00;&shy;thing"""
  md = """

    # Behind the Looking-Glass

    Just as she said this, she noticed that one of the trees had a door
    leading right into it. 'That's very curious!' she thought. 'But
    <span>every</span>&shy;<span>thing's </span>curious today. I think I may as well go in at once.' And in
    she went.

    # Behind the Looking-Glass

    Just as she said this, she noticed that one of the trees had a door
    leading right into it. 'That's very curious!' she thought. 'But
    everything's curious today. I think I may as well go in at once.' And in
    she went."""
  # MKTS.zoom me, 2
  LINESETTER.demo me, md, ( error ) =>
    MKTS.revert_zoom me
    help "MKTS.demo ok"
  return null

#-----------------------------------------------------------------------------------------------------------
MKTS._detach_artboard = ( me ) ->
  ### TAINT `#mkts-top`, `#mkts-bottom` not honored; are they needed? ###
  return if me[ 'view-mode' ] is 'print'
  body      = $ 'body'
  artboard  = $ 'artboard'
  contents  = artboard.contents()
  artboard.detach()
  body.append contents
  me[ '%memo' ][ 'view-mode' ] = { contents, artboard, body, }
  return null

#-----------------------------------------------------------------------------------------------------------
MKTS._reattach_artboard = ( me ) ->
  return if me[ 'view-mode' ] is 'dev'
  { contents, artboard, body, } = me[ '%memo' ][ 'view-mode' ]
  delete me[ '%memo' ][ 'view-mode' ]
  contents.detach()
  artboard.append contents
  body.append artboard
  return null

#-----------------------------------------------------------------------------------------------------------
MKTS.switch_to_print_view = ( me ) ->
  help "MKTS.switch_to_print_view"
  return if me[ 'view-mode' ] is 'print'
  @_detach_artboard me
  me[ 'view-mode' ] = 'print'
  return null

#-----------------------------------------------------------------------------------------------------------
MKTS.switch_to_dev_view = ( me ) ->
  help "MKTS.switch_to_dev_view"
  return if me[ 'view-mode' ] is 'dev'
  @_reattach_artboard me
  me[ 'view-mode' ] = 'dev'
  return null

#-----------------------------------------------------------------------------------------------------------
MKTS.toggle_view = ( me ) ->
  switch view_mode = me[ 'view-mode' ]
    when 'print'  then @switch_to_dev_view    me
    when 'dev'    then @switch_to_print_view  me
    else throw new Error "unknown view mode #{rpr view_mode}"

#-----------------------------------------------------------------------------------------------------------
MKTS.open_print_dialog = ( me ) ->
  @switch_to_print_view me
  window.print()
  @switch_to_dev_view me

#-----------------------------------------------------------------------------------------------------------
MKTS.open_save_dialog = ( me ) -> throw new Error "not implemented"
MKTS.save = ( me ) -> throw new Error "not implemented"
  # route   = '/tmp/mkts/index.html'
  # njs_fs.writeFileSync route, ( $ 'html' ).outerHTML()

#-----------------------------------------------------------------------------------------------------------
MKTS.open_print_preview = ( me ) ->
  @switch_to_print_view me
  # MKTS.open_print_dialog()
  #.........................................................................................................
  ### thx to http://apple.stackexchange.com/a/36947/59895, http://www.jaimerios.com/?p=171 ###
  script = """
    tell application "System Events"
      tell process "mingkwai"
        keystroke "p" using {shift down, command down}
        repeat until exists window "Print"
        end repeat
        click menu button "PDF" of window "Print"
        repeat until exists menu item "Open PDF in Preview" of menu 1 of menu button "PDF" of window "Print"
        end repeat
        click menu item "Open PDF in Preview" of menu 1 of menu button "PDF" of window "Print"
      end tell
    end tell
    """
  #.........................................................................................................
  APPLESCRIPT.execString script, ( error ) =>
    throw error if error?
    @switch_to_dev_view me
    help "MKTS.open_print_preview: ok"





### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###

### TAINT should live in its own module ###
### TAINT cosider using e.g. https://www.npmjs.com/package/combokeys ###
#-----------------------------------------------------------------------------------------------------------
keyboard = new Map()
keyboard.set 187, 'plus'
keyboard.set 189, 'minus'
keyboard.set 221, 'asterisk'
keyboard.set 48,  '0'
keyboard.set 80,  'p'
keyboard.set 81,  'q'
keyboard.set 82,  'r'
keyboard.set 83,  's'
keyboard.set 89,  'y'
keyboard.set 37,  'left'
keyboard.set 39,  'right'

#-----------------------------------------------------------------------------------------------------------
bindings =
  'meta+plus':            -> MKTS.zoom app, +1
  'meta+shift+asterisk':  -> MKTS.zoom app, +0.1
  'meta+0':               -> MKTS.zoom app, null
  'meta+minus':           -> MKTS.zoom app, -1
  'meta+shift+minus':     -> MKTS.zoom app, -0.1
  'meta+left':            -> MKTS.scroll_to_top()
  'meta+right':           -> MKTS.scroll_to_bottom()
  #.........................................................................................................
  # 'meta+p':               -> MKTS.print()
  # 'meta+shift+p':         -> MKTS.open_print_dialog()
  # 'meta+r':               -> MKTS.reload()
  # 'meta+q':               -> MKTS.take_screenshot()
  # 'meta+y':               -> MKTS.demo()
  # 'meta+s':               -> MKTS.save()

#-----------------------------------------------------------------------------------------------------------
MKTS.on_keydown = ( event ) ->
  code      = event.keyCode ? event.which
  key_name  = []
  #.........................................................................................................
  key_name.push 'alt'   if event.altKey
  key_name.push 'ctrl'  if event.ctrlKey
  key_name.push 'meta'  if event.metaKey
  key_name.push 'shift' if event.shiftKey
  key_name.push ( keyboard.get code ) ? code
  key_name  = key_name.join '+'
  #.........................................................................................................
  echo ( rpr key_name ), code
  if ( binding = bindings[ key_name ] )?
    binding()
    return false
  #.........................................................................................................
  else
    return true

#-----------------------------------------------------------------------------------------------------------
MKTS.enable_console = ( selector = '#console' ) ->
  console = $ '#console'
  return unless console.length > 0
  _write  = process.stderr.write.bind process.stderr
  process.stderr.write = ( P... ) ->
      # process.stdout.write '***' + P[ 0 ]
      [ text, ... ] = P
      lines = ( text.replace /\n$/, '' ).split '\n'
      for line in lines
        console.append $ "<div>#{CND.ANSI.as_html text}</div>"
        console.stop().animate { scrollTop: ( $ '#console-bottom' ).offset()[ 'top' ] }, 500
        # console.scrollTop ( $ '#console-bottom' ).offset()[ 'top' ]
      _write P...
  return null

#-----------------------------------------------------------------------------------------------------------
win.on 'document-end', ->
  MKTS.enable_console()
  step ( resume ) ->
    # win.showDevTools()
    MKTS.maximize app
    # MKTS.zoom_to app, 1.85
    yield step.wrap ( $ 'document' ).ready, resume
    help "document ready"
    #.......................................................................................................
    ( $ document ).keydown MKTS.on_keydown.bind MKTS
  #.........................................................................................................
  return null























