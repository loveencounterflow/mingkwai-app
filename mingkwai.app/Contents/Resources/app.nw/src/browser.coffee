


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
after                     = suspend.after
sleep                     = suspend.sleep
#...........................................................................................................
D2                        = require 'pipedreams2'
CHR                       = require 'coffeenode-chr'
#...........................................................................................................
# ### must be loaded by HTML page; see
# https://github.com/nwjs/nw.js/wiki/Differences-of-JavaScript-contexts ###
LINESETTER                = require './LINESETTER'
# ### https://github.com/loveencounterflow/guy-trace ###
# ( require 'guy-trace' ).limit Infinity
# require( 'clarify' );
# require( 'trace' );
# Error.stackTraceLimit = Infinity;

# MKTS._TRY_balanced_columns = ->
#   # range.surroundContents ( $ "<span class='hilite'></span>" ).get 0
#   # range = window.getSelection().getRangeAt 0
#   # range     = window.getSelection().getRangeAt 0
#   # { bottom
#   #   height
#   #   left
#   #   right
#   #   top
#   #   width } = range.getBoundingClientRect()
#   last_left         = null
#   focus_idx         = -1
#   text_node         = ( $ '#box-a p' ).contents().get 0
#   debug '©09SY6', 'content element count:', ( $ '#box-a p' ).contents().length
#   columns           = $ '.flex-columns-wrap .column'
#   column_count      = columns.length
#   debug '©AT6uj', "#{column_count} columns"
#   line_offsets      = []
#   #.......................................................................................................
#   ### TAINT must recompute on zoom ###
#   hilite = ( focus, rectangle ) ->
#     focus.offset rectangle
#     focus.width  rectangle[ 'width'  ]
#     focus.height rectangle[ 'height' ]
#   #.......................................................................................................
#   new_range = ( start ) ->
#     throw new Error "text_node not defined" unless text_node?
#     R         = document.createRange()
#     R.setStart  text_node, start
#     R.setEnd    text_node, start
#     return R
#   #.......................................................................................................
#   new_focus = ->
#     focus_idx  += +1
#     R           = $ "<div class='focus' id='focus-#{focus_idx}'></div>"
#     ( $ 'html' ).append R
#     return R
#   #.......................................................................................................
#   new_line_offset = ->
#     line_offsets.push R = [ null, null, ]
#     return R
#   #.......................................................................................................
#   is_demo           = yes
#   range             = new_range 0
#   focus             = new_focus()
#   line_offset       = new_line_offset()
#   line_offset[ 0 ]  = 0
#   #.......................................................................................................
#   step ( resume ) =>
#     #.....................................................................................................
#     for end_idx in [ 1 .. text_node.length ]
#       range.setEnd text_node, end_idx
#       line_offset[ 1 ]  = end_idx
#       rectangle         = range.getBoundingClientRect()
#       { left }          = rectangle
#       #...................................................................................................
#       if last_left is 0
#         last_left = left
#       #...................................................................................................
#       else if last_left? and left > last_left
#         corrected_end_idx = end_idx - 1
#         range.setEnd text_node, corrected_end_idx
#         line_offset[ 1 ]  = corrected_end_idx
#         hilite focus, range.getBoundingClientRect()
#         debug '©pwdqt', end_idx, line_offset, rpr range.toString()
#         range             = new_range corrected_end_idx
#         line_offset       = new_line_offset()
#         line_offset[ 0 ]  = corrected_end_idx
#         line_offset[ 1 ]  = corrected_end_idx
#         focus             = new_focus()
#         rectangle         = range.getBoundingClientRect()
#         if is_demo then yield after 0.05, resume
#       #...................................................................................................
#       last_left = rectangle[ 'left' ]
#       hilite focus, rectangle
#     #.....................................................................................................
#     debug '©OE1Vx', end_idx, line_offset, rpr range.toString()
#     line_count        = line_offsets.length
#     column_linecounts = MKTS.get_column_linecounts 'even', line_count, column_count
#     text              = ( $ text_node ).text()
#     ### TAINT use jQuery? ###
#     line_offset_idx   = 0
#     for column_idx in [ 0 ... column_count ]
#       column_linecount      = column_linecounts[ column_idx ]
#       continue if column_linecount < 1
#       # _text_node            = ( $ '.flex-columns-wrap .column' )
#       #   .eq column_idx
#       #   .find 'p'
#       #   .contents().get 0
#       _text_node            = ( ( ( $ '.flex-columns-wrap .column' ).eq column_idx ).find 'p' ).contents().get 0
#       first_idx             = line_offsets[ line_offset_idx                         ][ 0 ]
#       last_idx              = line_offsets[ line_offset_idx + column_linecount - 1  ][ 1 ]
#       line_offset_idx      += column_linecount
#       column_text           = text[ first_idx ... last_idx ]
#       ### TAINT should mark as 'originally a soft hyphen' in case of later text re-flow? ###
#       column_text           = column_text.replace /\u00ad$/, '-'
#       _text_node.nodeValue  = column_text
#       if is_demo then yield after 0.5, resume



# PRINTER                   = require 'printer'
# CND.dir PRINTER
# help printer[ 'name' ] for printer in PRINTER.getPrinters()
# help PRINTER.getSupportedPrintFormats()

# # log     = console.log.bind console
# help 'loaded'
# window.addEventListener 'DOMContentLoaded', ( event ) ->
#   help window.$?
#   help "DOM fully loaded and parsed"
# window.addEventListener 'load', ( event ) ->
#   help window.$?
#   help "everything loaded"
# document.addEventListener 'visibilityChange', ->
#   switch document.visibilityState
#     when 'prerender'
#       help 'prerender'
#     when 'visible'
#       help 'visible'

#-----------------------------------------------------------------------------------------------------------
MKTS = {}

#-----------------------------------------------------------------------------------------------------------
app =
  'zoom-level':   0

#-----------------------------------------------------------------------------------------------------------
on_file_menu_what_you_should_know_C = ->
  ( $ '#content' ).text "Some kind of interesting stuff."

#-----------------------------------------------------------------------------------------------------------
build_menu = ->
  #.........................................................................................................
  help_menu = new NW.Menu()
  help_menu.append new NW.MenuItem label: 'about 眀快排字机'
  help_menu.append new NW.MenuItem label: 'what you should know A'
  help_menu_entry = new NW.MenuItem label: 'Help', 'submenu': help_menu
  #.........................................................................................................
  file_menu = new NW.Menu()
  file_menu.append new NW.MenuItem label: 'New'
  file_menu.append new NW.MenuItem label: 'Open...', click: on_file_menu_what_you_should_know_C
  file_menu.append new NW.MenuItem label: 'Save',             key: 's', modifiers: 'cmd', click: -> urge "saving..."
  file_menu.append new NW.MenuItem label: 'Take Screenshot',  key: 's', modifiers: 'cmd-shift', click: -> MKTS.take_screenshot app
  file_menu_entry = new NW.MenuItem label: 'File', 'submenu': file_menu
  #.........................................................................................................
  win_menu  = new NW.Menu type: 'menubar'
  # win_menu.append new NW.MenuItem label: '眀快排字机', 'submenu': app_menu
  win_menu.createMacBuiltin '眀快排字机'
  win_menu.insert file_menu_entry, 1
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

# help '©5t3', document.visibilityState
# CND.dir win
# help ( name for name of window).join ' '

win.show()
win.focus()
win.zoomLevel = 0 # 100%
win.setResizable yes
# win.resizeTo 1500, 1500
# win.setTransparent yes # ???
# win.showDevTools()
# win.setProgressBar 0.5 # visible on dock icon
# win.setBadgeLabel = 'helo from 眀快排字机' # ???

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
MKTS.zoom_to = ( me, level ) ->
  ### TAINT code duplication ###
  base_zoom_level = -0.15
  win.zoomLevel   = level ? base_zoom_level
  zoom_percent    = ( win.zoomLevel - base_zoom_level ) * 1.2 * 100
  echo "zoomed to level #{win.zoomLevel} (#{zoom_percent.toFixed 0}%)"
  return win.zoomLevel


#-----------------------------------------------------------------------------------------------------------
MKTS.zoom = ( me, delta ) ->
  base_zoom_level = -0.15
  if delta?
    if ( delta > 0 and win.zoomLevel <= 8.8 ) or ( delta < 0 and win.zoomLevel >= -7.5 )
      win.zoomLevel += delta
  else
    win.zoomLevel = base_zoom_level
  zoom_percent = ( win.zoomLevel - base_zoom_level ) * 1.2 * 100
  echo "zoomed to level #{win.zoomLevel} (#{zoom_percent.toFixed 0}%)"
  debug '©zVBdI', ( $ '.flex-columns-wrap' ).height()
  mms_per_pixel = 50 / 189
  debug '©zVBdI', ( $ '.flex-columns-wrap' ).height() * mms_per_pixel, 'mm'
  return win.zoomLevel

#-----------------------------------------------------------------------------------------------------------
MKTS.print = ->
  print()

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
MKTS.foo = ( event ) ->
  debug '©9HvgT', 'xxxx'

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
  'meta+p':               -> MKTS.print()
  # 'meta+r':               -> MKTS.reload()
  # 'meta+q':               -> MKTS.take_screenshot()
  'meta+left':            -> MKTS.scroll_to_top()
  'meta+right':           -> MKTS.scroll_to_bottom()
  #.........................................................................................................
  'meta+y': ->

###

foo <b><i>is it</i> really</b> baz

'foo'
'foo', ' '
'foo', ' ', <b><i>, 'is', ⬇, ⬇
'foo', ' ', <b><i>, 'is', ' ', ⬇, ⬇
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ⬇
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', ⬇
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', 'really', ⬇
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', 'really', ⬇, ' '
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', 'really', ⬇, ' ', 'baz'

'foo'
'foo '
'foo <b><i>is</i></b>'
'foo <b><i>is </i></b>'
'foo <b><i>is it</i></b>'
'foo <b><i>is it</i> </b>'
'foo <b><i>is it</i> really</b>'
'foo <b><i>is it</i> really</b> '
'foo <b><i>is it</i> really</b> baz'


###



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

# # keyboard.on 'A', ( event, keys, combo ) -> help '>>>', 'A', event, keys, combo
# keyboard.on 'super + a', ( event, keys, combo ) ->
#   help event.keyCode, event.which
#   help event.shiftKey, event.ctrlKey, event.altKey, event.metaKey
#   help '>>>', 'A', keys, combo
#   return false

# #-----------------------------------------------------------------------------------------------------------
# keyboard.on  'super + equal', -> MKTS.zoom app, 1.25
# keyboard.on 'rsuper + equal', -> MKTS.zoom app, 1.25
# keyboard.on  'super + dash',  -> MKTS.zoom app, 0.75
# keyboard.on 'rsuper + dash',  -> MKTS.zoom app, 0.75


### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###


#-----------------------------------------------------------------------------------------------------------
win.on 'document-end', ->
  step ( resume ) ->
    # MKTS.maximize app
    # MKTS.zoom app
    MKTS.zoom_to app, 1.85
    yield step.wrap ( $ 'document' ).ready, resume
    # yield MKTS.wait resume
    help "document ready"
    # debug '©wVnkq', 'paper ', ( $ '.paper' ).offset(), "#{( $ '.paper' ).outerWidth()} x #{( $ '.paper' ).outerHeight()}"
    # debug '©wVnkq', 'page  ', ( $ '.page' ).offset(), "#{( $ '.page' ).outerWidth()} x #{( $ '.page' ).outerHeight()}"
    #.......................................................................................................
    ( $ document ).keydown MKTS.on_keydown.bind MKTS
    #.......................................................................................................
    _demo '#box-b'

#-----------------------------------------------------------------------------------------------------------
_demo = ( container_selector ) ->
  #.........................................................................................................
  new_line_fitter = ->
    is_first    = yes
    last_height = 0
    # whisper '©y94gs', 'new_line_fitter'
    return ( node ) ->
      dy          = node.height() - last_height
      # debug '©u8H0l', 'last_height:', last_height, 'node.height():', node.height(), dy, rpr node.html()
      last_height = node.height()
      if is_first
        is_first = no
        return true
      return dy <= 0
  #.......................................................................................................
  step ( resume ) =>
    text_idx = -1
    texts = [
      """had happened lately,
            that Alice had begun to think that very few things indeed were really
            impossible.
            """
      """Just as she <b><i>said</i></b> this, she noticed that <i>one of the trees had a door
            leading right into it.</i> 'That's very curious!' she thought. 'But
            everything's curious today. I think I may as well go in at once.' And in
            she &#x4e00; went.
            Alice opened the door and found that it led into a small passage, not
            much larger than a rat-hole: she knelt down and looked along the passage
            into the loveliest garden you ever saw. How she longed to get out of
            that dark hall, and wander about among those beds of bright flowers and
            those cool fountains, but she could not even get her head through the
            doorway; 'and even if my head would go through,' thought poor Alice, 'it
            would be of very little use without my shoulders. <span class='xbig'>愛麗絲</span> Oh, how I wish I could
            shut up like a telescope! I think I could, if I only knew how to begin.'
            For, you see, so many out-of-the-way things had happened lately,
            that Alice had begun to think that very few things indeed were really
            impossible.
            """
            # yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda
      """Just as she <b><i>said</i></b> this, she noticed that <i>one of the trees had a door
            leading right into it.</i> 'That's very curious!' she thought. 'But
            everything's curious."""
      """Just as she <b><i>said</i></b> <span class='xbig'>this</span>, she noticed that <i>one of the trees had a door
            leading right into it</i>."""
      """Just as she <b><i>said</i></b> <span class='xbig'>this</span>, she noticed that"""
      """So."""
      """So. Here we go!"""
      """x <span class='x'></span> y"""
      """<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, exasperated, and certainly"""
      """<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, period."""
      ]
    text            = texts[ 0 ]
    container       = $ container_selector
    fits_onto_line  = null
    last_line       = null
    #.........................................................................................................
    test_line = ( html ) =>
      ### Must return whether HTML fits into one line. ###
      clasz           = 'is-first'
      clasz           = 'is-last'
      clasz           = 'is-middle'
      focus           = $ "<span id='focus'></span>"
      line            = $ "<p class='#{clasz}'></p>"
      line.append focus
      focus.html html
      container.append line
      fits_onto_line ?= new_line_fitter()
      fits            = fits_onto_line focus
      last_line       = line if fits
      # if fits then whisper 'ok', html else warn 'X', html
      fits_onto_line  = null unless fits
      # debug '©bmWvg', fits, html
      line.detach()
      return fits
    #.........................................................................................................
    accept_line = ( html, is_last ) =>
      ### Inserts text line into document ###
      help html, if is_last then '*' else ''
      ( last_line.find '#focus' ).remove()
      last_line.html html
      if is_last
        ### TAINT not entirely correct ###
        last_line.addClass 'is-last'
        last_line.removeClass 'is-middle is-lone is-first'
      container.append last_line
      return null
    # #---------------------------------------------------------------------------------------------------------
    # step ( resume ) =>
    #   for text in texts
    #     yield LINESETTER.set_lines text, test_line, accept_line, resume
    #.........................................................................................................
    yield LINESETTER.set_lines text, test_line, accept_line, resume
    #.........................................................................................................
    return null






























