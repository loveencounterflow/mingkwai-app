


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
D                         = require 'pipedreams'
D$                        = D.remit.bind D
CHR                       = require 'coffeenode-chr'
#...........................................................................................................
LINESETTER                = require './LINESETTER'
#...........................................................................................................
ƒ                         = ( x, precision = 2 ) -> x.toFixed precision

### see https://github.com/nwjs/nw.js/wiki/Window ###
splash_info = [ './splash.html',
  "position":         "center",
  "title":            "眀快排字机",
  "width":            800,
  "height":           500,
  "frame":            false,
  "toolbar":          false,
  "transparent":      true,
  "focus":            false,
  "resizable":        false,
  "show":             true,
  "show_in_taskbar":  true,
  ]

#-----------------------------------------------------------------------------------------------------------
splash_win = NW.Window.open splash_info...

#-----------------------------------------------------------------------------------------------------------
### Description of what is being typeset; the document. ###
### At some point in the future, maybe we'll be able to refer to the matter (document) and to locations
inside the matter by using a URL like:

    mkts://#{file_locator}#page:#{page_nr}/column:#{column_nr}/y:#{insertion_y_px}px

e.g.

    mkts://(file:///Users/dave/Documents/cv.mkts)/page:3/column:4/y:120.45px
###
matter =
  '~isa':                 'MKTS/matter'
  'batch-idx':            -1
  'pages':                []
  'caret':
    'page-nr':            1
    'column-nr':          1
    'y.px':               0

#-----------------------------------------------------------------------------------------------------------
### Description of the app, its settings and its current user interface state. ###
app =
  '~isa':                 'MKTS/app'
  '%memo':                {}
  ### TAINT populate with `MKTS.new_windows()` ###
  '%windows':
    'main':                 win
    'devtools':             null
    'splash':               splash_win
  # 'mm-per-px':            100 / 377.94791
  # 'mm-per-px':            55 / 203.704
  # 'mm-per-px':            160 / 593
  'gauge':                null
  'jQuery':               $
  'NW':                   NW
  'MKTS':                 null
  'artboard':             null
  'window':               window
  'view-mode':            'dev'
  'zoom-delta-factor':    1.25
  'zoom':                 1
  'tool-modes':           []
  'tool-modes-default':   'default'
  'view':                 'pages'
  'matter':               matter


#-----------------------------------------------------------------------------------------------------------
### Publish app so we have access to it in both the browser and the NodeJS contexts: ###
window[ 'app' ] = app

#-----------------------------------------------------------------------------------------------------------
MKTS = ( require './MKTS' ) app
### TAINT temporary fix: ###
app[ 'MKTS' ]   = MKTS
app[ 'gauge' ]  = MKTS.GAUGE.new app


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
  # file_menu.append new NW.MenuItem label: 'Print...',               key: 'p', modifiers: 'cmd-shift', click: -> MKTS.open_print_dialog app
  file_menu.append new NW.MenuItem label: 'Open Print Preview...',  key: 'p', modifiers: 'cmd',       click: -> MKTS.open_print_preview app
  file_menu_entry = new NW.MenuItem label: 'File', 'submenu': file_menu
  #.........................................................................................................
  view_menu = new NW.Menu()
  # view_menu.append new NW.MenuItem label: 'Toggle Dev / Print View',  key: 't', modifiers: 'cmd',     click: -> MKTS.toggle_view app
  view_menu.append new NW.MenuItem label: 'Toggle Galley',            key: 't', modifiers: 'cmd',     click: -> MKTS.VIEW.toggle_galley()
  view_menu.append new NW.MenuItem label: 'View Test Page',                                           click: -> MKTS.VIEW.test_page()
  view_menu.append new NW.MenuItem label: 'Zoom In',   key: '+', modifiers: 'cmd', click: -> debug '©yVRqU', "Zoom In";  MKTS.ZOOM.by 1 * app[ 'zoom-delta-factor' ]
  view_menu.append new NW.MenuItem label: 'Zoom 100%', key: '0', modifiers: 'cmd', click: -> debug '©AINX1', "Zoom 100"; MKTS.ZOOM.to 1
  view_menu.append new NW.MenuItem label: 'Zoom Out',  key: '-', modifiers: 'cmd', click: -> debug '©KO8qN', "Zoom Out"; MKTS.ZOOM.by 1 / app[ 'zoom-delta-factor' ]
  # 'meta+plus':
  # 'meta+0':
  # 'meta+minus':
  # view_menu.append new NW.MenuItem label: 'Toggle Galley',            key: 't', modifiers: 'cmd',     click: -> console.log 'XXXXXXXXXXXX'
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

demo_count = 0
#-----------------------------------------------------------------------------------------------------------
MKTS.demo = ( me ) ->
  debug '©iNl2F', 'demo'
  # source = """<em>Ab<xsmall>c</xsmall>d<xbig>e</xbig>ffiVA</em>"""
  # source = """Xxxxxxxxxxxxxxxx, she noticed xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"""
  # source = """


  #   # Behind the Looking-Glass
  #   'But everything's curious today. I think I may as well go in at once.' And in
  #   she went.

  #   # Behind the Looking-Glass

  #   Just as she said this, she noticed that one of the trees had a door
  #   leading right into it. 'That's very curious!' she thought. 'But
  #   everything's <xbig>curious</xbig> today. I think I may as well go in at once.' And in
  #   she went.

  #   上古時期的越南語很可能具有南亞語系其他語言現在具有的一些共同特徵，例如在屈折方面較發達，具有豐富的複輔音等。這些特徵已不再存於現代的越南語中，據認為是由於越南語地處東南亞的“語言聯盟”中，受到周邊有聲調的孤立語的影響，也變成了一種有聲調的孤立語。形態上的孤立和聲調的存在可能並非來源自原始南亞語，周邊的無親屬關係的語言，例如壯侗語系的泰語和南島語系的回輝話，也都具有聲調。

  #   Just as shé said this, she fluffi *noticed* that
  #   one of the trees had a door
  #   leading right into it. 'That's very curious!' she thought.

  #   Just as shé said this, she fluffi *noticed* that
  #   one of the trees had a door
  #   leading right into it. 'That's very curious!' she thought.

  #   Just as shé said this, she fluffi *noticed* that
  #   one of the trees had a door
  #   leading right into it. 'That's very curious!' she thought.

  #   Just as shé said this, she fluffi *noticed* that
  #   one of the trees had a door
  #   leading right into it. 'That's very curious!' she thought.
  #   """
  # source = "one <xbig>line</xbig>\n\n" +  source[ .. 500 ] + ( 'ddd' for i in [ 0 .. 150 ] ).join ' '
  # demo_count += +1
  # if demo_count is 1
  #   source = """
  #     # Test

  #     just a **test**. *ffi*. abcdefghijklm Q Qu Queen the most unbelievable story."""
  # debug '©uvL5t', source.length
  # source = "Just as shé said this, she fluffi *noticed* that abc def ghi jkl mno pqr stu vwx xy"
  source = """


    'But everything's curious today. I think I may as well go in at once.' And in
    she went.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx and so on.

    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb

    Short paragraph.

  """

    # supercalifragilisticexpialigoricalsupercalifragilisticexpialigorical

    # Sedutperspiciatisundeomnisistenatuserrorsitvoluptatemaccusantiumdoloremquelaudantium,totamremaperiam,eaqueipsaquaeabilloinventoreveritatisetquasiarchitectobeataevitaedicta sunt explicabo.

    # # Behind the Looking-Glass


    # The King and Queen of Hearts were <xbig>seated</xbig> on their throne when they
    # arrived, with a great crowd assembled about them--all sorts of little
    # birds and beasts.

    # There was nothing so VERY remarkable in that; nor did Alice think it so
    # VERY much out of the way to hear the Rabbit say to itself, 'Oh dear!
    # Oh dear! I shall be late!' (when she thought it over afterwards, it
    # occurred to her that she ought to have wondered at this, but at the time
    # it all seemed quite natural); but when the Rabbit actually TOOK A WATCH
    # OUT OF ITS WAISTCOAT-POCKET, and looked at it, and then hurried on,
    # Alice started to her feet, for it flashed across her mind that she had
    # never before seen a rabbit with either a waistcoat-pocket, or a watch
    # to take out of it, and burning with curiosity, she ran across the field
    # after it, and fortunately was just in time to see it pop down a large
    # rabbit-hole under the hedge.


    # 'Come, there's no use in crying like that!' said Alice to herself,
    # rather sharply; 'I advise you to leave off this minute!' She generally
    # gave herself very good advice, (though she very seldom followed it),
    # and sometimes she scolded herself so severely as to bring tears into
    # her eyes; and once she remembered trying to box her own ears for having
    # cheated herself in a game of croquet she was playing against herself,
    # for this curious child was very fond of pretending to be two people.
    # 'But it's no use now,' thought poor Alice, 'to pretend to be two people!
    # Why, there's hardly enough of me left to make ONE respectable person!'




  # source = """
  #   <kwic-lineup>1 中國皇帝</kwic-lineup>
  #   <kwic-lineup>2 中國皇帝</kwic-lineup>
  #   <kwic-lineup>3 中國皇帝</kwic-lineup>
  #   <kwic-lineup>4 中國皇帝</kwic-lineup>
  #   <kwic-lineup>5 中國皇帝</kwic-lineup>
  #   <kwic-lineup>6 中國皇帝</kwic-lineup>
  #   <kwic-lineup>7 中國皇帝</kwic-lineup>
  #   <kwic-lineup>8 中國皇帝</kwic-lineup>
  #   <kwic-lineup>9 中國皇帝</kwic-lineup>
  #   <kwic-lineup>10 中國皇帝</kwic-lineup>
  #   <kwic-lineup>11 中國皇帝</kwic-lineup>
  #   <kwic-lineup>12 中國皇帝</kwic-lineup>
  #   <kwic-lineup>13 中國皇帝</kwic-lineup>
  #   <kwic-lineup>14 中國皇帝</kwic-lineup>
  #   <kwic-lineup>15 中國皇帝</kwic-lineup>
  #   <kwic-lineup>16 中國皇帝</kwic-lineup>
  #   <kwic-lineup>17 中國皇帝</kwic-lineup>
  #   <kwic-lineup>18 中國皇帝</kwic-lineup>
  #   <kwic-lineup>19 中國皇帝</kwic-lineup>
  #   <kwic-lineup>20 中國皇帝</kwic-lineup>
  #   <kwic-lineup>21 中國皇帝</kwic-lineup>
  #   <kwic-lineup>22 中國皇帝</kwic-lineup>
  #   <kwic-lineup>23 中國皇帝</kwic-lineup>
  #   <kwic-lineup>24 中國皇帝</kwic-lineup>
  #   <kwic-lineup>25 中國皇帝</kwic-lineup>
  #   <kwic-lineup>26 中國皇帝</kwic-lineup>
  #   <kwic-lineup>27 中國皇帝</kwic-lineup>
  #   <kwic-lineup>28 中國皇帝</kwic-lineup>
  #   <kwic-lineup>29 中國皇帝</kwic-lineup>
  #   <kwic-lineup>30 中國皇帝</kwic-lineup>
  #   <kwic-lineup>31 中國皇帝</kwic-lineup>
  #   <kwic-lineup>32 中國皇帝</kwic-lineup>
  #   <kwic-lineup>33 中國皇帝</kwic-lineup>
  #   <kwic-lineup>34 中國皇帝</kwic-lineup>
  #   <kwic-lineup>35 中國皇帝</kwic-lineup>
  #   <kwic-lineup>36 中國皇帝</kwic-lineup>
  #   <kwic-lineup>37 中國皇帝</kwic-lineup>
  #   <kwic-lineup>38 中國皇帝</kwic-lineup>
  #   <kwic-lineup>39 中國皇帝</kwic-lineup>
  #   <kwic-lineup>40 中國皇帝</kwic-lineup>
  #   <kwic-lineup>41 中國皇帝</kwic-lineup>
  #   <kwic-lineup>42 中國皇帝</kwic-lineup>
  #   <kwic-lineup>43 中國皇帝</kwic-lineup>
  #   <kwic-lineup>44 中國皇帝</kwic-lineup>
  #   <kwic-lineup>45 中國皇帝</kwic-lineup>
  #   <kwic-lineup>46 中國皇帝</kwic-lineup>
  #   <kwic-lineup>47 中國皇帝</kwic-lineup>
  #   <kwic-lineup>48 中國皇帝</kwic-lineup>
  #   <kwic-lineup>49 中國皇帝</kwic-lineup>
  #   <kwic-lineup>50 中國皇帝</kwic-lineup>
  #   <kwic-lineup>51 中國皇帝</kwic-lineup>
  #   <kwic-lineup>52 中國皇帝</kwic-lineup>
  #   <kwic-lineup>53 中國皇帝</kwic-lineup>
  #   <kwic-lineup>54 中國皇帝</kwic-lineup>
  #   <kwic-lineup>55 中國皇帝</kwic-lineup>
  #   <kwic-lineup>56 中國皇帝</kwic-lineup>
  #   <kwic-lineup>57 中國皇帝</kwic-lineup>
  #   <kwic-lineup>58 中國皇帝</kwic-lineup>
  #   <kwic-lineup>59 中國皇帝</kwic-lineup>
  #   <kwic-lineup>60 中國皇帝</kwic-lineup>
  #   <kwic-lineup>61 中國皇帝</kwic-lineup>
  #   <kwic-lineup>62 中國皇帝</kwic-lineup>
  #   <kwic-lineup>63 中國皇帝</kwic-lineup>
  #   <kwic-lineup>64 中國皇帝</kwic-lineup>
  #   <kwic-lineup>65 中國皇帝</kwic-lineup>
  #   <kwic-lineup>66 中國皇帝</kwic-lineup>
  #   <kwic-lineup>67 中國皇帝</kwic-lineup>
  #   <kwic-lineup>68 中國皇帝</kwic-lineup>
  #   """
  # source = require './demo-text'
  # source = njs_fs.readFileSync '/tmp/kwic.html', encoding: 'utf-8'
  # source = ( ( if line.length is 0 or line is '```' then line else "#{line}<!--##{idx}-->" ) for line, idx in source.split '\n' ).join '\n'
  help "source: approx. #{source.length} characters"
  settings =
    # 'format':   'html'
    'format':   'md'
  step ( resume ) =>
    # yield MKTS.VIEW.show_galley resume
    yield LINESETTER.demo me, source, settings, resume
    # MKTS.revert_zoom me
    help "MKTS.demo ok"
  return null




### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###

### TAINT should live in its own module ###
### TAINT consider using e.g. https://www.npmjs.com/package/combokeys ###
#-----------------------------------------------------------------------------------------------------------
keycodes = require './BLAIDDDRWG-keycodes'

#-----------------------------------------------------------------------------------------------------------
bindings =
  # 'meta+plus':            -> MKTS.ZOOM.by 1 * app[ 'zoom-delta-factor' ]
  # 'meta+minus':           -> MKTS.ZOOM.by 1 / app[ 'zoom-delta-factor' ]
  # 'meta+0':               -> MKTS.ZOOM.to 1
  'h':                    -> MKTS.toggle_tool_mode 'hand'
  # 'g':                    -> MKTS.VIEW.toggle_galley()
  # 'meta+shift+asterisk':  -> MKTS.zoom app, +0.1
  # 'meta+shift+minus':     -> MKTS.zoom app, -0.1
  'meta+left':            -> MKTS.scroll_to_top()
  'meta+right':           -> MKTS.scroll_to_bottom()
  #.........................................................................................................
  # 'meta+p':               -> MKTS.print()
  # 'meta+shift+p':         -> MKTS.open_print_dialog()
  # 'meta+r':               -> MKTS.reload()
  # 'meta+q':               -> MKTS.take_screenshot()
  # 'meta+y':               -> MKTS.demo()
  # 'meta+x':               -> LINESETTER._demo_pop_over()
  'meta+x':               -> LINESETTER._demo_pop_over_async()

#-----------------------------------------------------------------------------------------------------------
MKTS.on_keydown = ( event ) ->
  code      = event.keyCode ? event.which
  key_name  = []
  #.........................................................................................................
  key_name.push 'alt'   if event.altKey
  key_name.push 'ctrl'  if event.ctrlKey
  key_name.push 'meta'  if event.metaKey
  key_name.push 'shift' if event.shiftKey
  key_name.push ( keycodes.get code ) ? code
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
MKTS.toggle_tool_mode = ( mode ) ->
  return @pop_tool_mode() if ( CND.last_of app[ 'tool-modes' ] ) is mode
  return @push_tool_mode mode

#-----------------------------------------------------------------------------------------------------------
MKTS.push_tool_mode = ( mode ) ->
  debug '©2ryq9', app[ 'tool-modes' ]
  app[ 'tool-modes' ].push mode unless ( CND.last_of app[ 'tool-modes' ] ) is mode
  app[ 'tool-modes' ].shift() if app[ 'tool-modes' ].length > 10
  # ( $ 'body' ).css 'cursor', 'url(./icons/mkts-tool-hand.png)'
  # ( $ 'body' ).attr 'style', 'cursor:url(./icons/mkts-tool-hand-cursor.png), auto;'
  ### TAINT must swap classes ###
  ### TAINT how to make cursor visible after change? ###
  ( $ 'body' ).addClass 'cursor-hand'
  # ( $ app[ 'document' ] ).trigger 'mousemove'
  return mode

#-----------------------------------------------------------------------------------------------------------
MKTS.pop_tool_mode = ->
  debug '©2ryq9', app[ 'tool-modes' ]
  if app[ 'tool-modes' ].length < 1
    R = app[ 'tool-modes-default' ]
  else
    R = app[ 'tool-modes' ].pop()
  ### TAINT must swap classes ###
  ( $ 'body' ).removeClass 'cursor-hand'
  return R

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
win.on 'zoom', ->
  MKTS.GAUGE.set_ratios app

#-----------------------------------------------------------------------------------------------------------
win.on 'document-end', ->
  # dev_win = win.showDevTools()
  # dev_win.moveTo 1200, 848
  # dev_win.maximize()
  # dev_win.blur()
  #.........................................................................................................
  show_splash = no
  if show_splash
    after 2, ->
      win.show()
      splash_win.focus()
    after 3, ->
      win.focus()
    after 4, ->
      splash_win.hide()
  else
      splash_win.hide()
      win.show()
      win.focus()
  #.........................................................................................................
  app[ 'artboard' ] = $ 'artboard'
  app[ 'zoomer'   ] = $ 'zoomer'
  MKTS.enable_console()
  step ( resume ) ->
    # MKTS.maximize app
    # MKTS.ZOOM.to app, 1.85
    win.zoomLevel = 1
    # MKTS.ZOOM.to app[ 'zoom' ]
    yield step.wrap ( $ document ).ready, resume
    help "document ready"
    #.......................................................................................................
    ( $ document ).keydown MKTS.on_keydown.bind MKTS
  #.........................................................................................................
  return null

###

{
  "name": "mingkwai",
  "main": "lib/index.html",
  "version": "0.1.0",
  "keywords": [
    "node-webkit",
    "typesetting",
    "Chinese",
    "Japanese",
    "CJK",
    "typography"
  ],
  "chromium-args": "--enable-remote-fonts --enable-region-based-columns --enable-webkit-text-subpixel-positioning --enable-devtools-experiments --enable-experimental-web-platform-features --enable-smooth-scrolling --disable-accelerated-video --enable-webgl --enable-webaudio --ignore-gpu-blacklist --force-compositing-mode --remote-debugging-port=10138 --harmony",
  "single-instance": true,
  "no-edit-menu": false,
  "window": {
    "x": 0,
    "y": 20,
    "width": 1200,
    "height": 800,
    "show": false,
    "show_in_taskbar": true,
    "focus": false,
    "toolbar": true,
    "frame": true,
    "icon": "./favicon.ico",
    "position": "center",
    "title": "眀快排字机",
    "resizable": true
  },
  "js-flags": "--harmony",
  "dependencies": {
    "applescript": "^1.0.0",
    "cnd": "^0.1.5",
    "coffeenode-chr": "^0.1.4",
    "coffeenode-suspend": "^0.1.4",
    "coffeenode-teacup": "^0.1.2",
    "linear-interpolator": "^1.0.2",
    "pipedreams": "^0.2.8",
    "stylus": "^0.49.3"
  }
}

###





















