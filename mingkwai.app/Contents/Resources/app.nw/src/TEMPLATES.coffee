


############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/TEMPLATES'
log                       = CND.get_logger 'plain',     badge
info                      = CND.get_logger 'info',      badge
whisper                   = CND.get_logger 'whisper',   badge
alert                     = CND.get_logger 'alert',     badge
debug                     = CND.get_logger 'debug',     badge
warn                      = CND.get_logger 'warn',      badge
help                      = CND.get_logger 'help',      badge
urge                      = CND.get_logger 'urge',      badge
#...........................................................................................................
# MKTS                      = require './main'
TEACUP                    = require 'coffeenode-teacup'
CHR                       = require 'coffeenode-chr'
#...........................................................................................................
# STYLUS                    = require 'stylus'
# as_css                    = STYLUS.render.bind STYLUS
# style_route               = njs_path.join __dirname, '../src/mingkwai-typesetter.styl'
# css                       = as_css njs_fs.readFileSync style_route, encoding: 'utf-8'
#...........................................................................................................

#===========================================================================================================
# TEACUP NAMESPACE ACQUISITION
#-----------------------------------------------------------------------------------------------------------
for name_ of TEACUP
  eval "var #{name_} = TEACUP[ #{rpr name_} ]"

# #-----------------------------------------------------------------------------------------------------------
# make_tag = ( name ) ->
#   method_name = name.toUpperCase()
#   tag_name    = name.toLowerCase()
#   # eval "var #{method_name} = new_tag( function() { return TAG.apply '#{method_name}', p...)}"
#   eval """
#     var #{method_name} = new_tag(function() {
#       var p;
#       p = 1 <= arguments.length ? slice.call(arguments, 0) : [];
#       return TAG.apply(null, ['#{method_name}'].concat(slice.call(p)));
#     });"""

#-----------------------------------------------------------------------------------------------------------
ARTBOARD            = new_tag ( p... ) -> TAG 'artboard',         p...
PAGE                = new_tag ( p... ) -> TAG 'page',             p...
PAPER               = new_tag ( p... ) -> TAG 'paper',            p...
WRAP                = new_tag ( p... ) -> TAG 'wrap',             p...
TOOL                = new_tag ( p... ) -> TAG 'tool',             p...
BOXER               = new_tag ( p... ) -> TAG 'boxer',            p...
PANEL               = new_tag ( p... ) -> TAG 'panel',            p...
GRIP                = new_tag ( p... ) -> TAG 'grip',             p...
OUTER               = new_tag ( p... ) -> TAG 'outer',            p...
LINE                = new_tag ( p... ) -> TAG 'line',             p...
OVERLAY             = new_tag ( p... ) -> TAG 'overlay',          p...
CORK                = new_tag ( p... ) -> TAG 'cork',             p...
#...........................................................................................................
### JCH GUI ###
BOX                 = new_tag ( p... ) -> TAG 'box',              p...
HBOX                = new_tag ( p... ) -> TAG 'hbox',             p...
VBOX                = new_tag ( p... ) -> TAG 'vbox',             p...
RIBBON              = new_tag ( p... ) -> TAG 'ribbon',           p...
HRIBBON             = new_tag ( p... ) -> TAG 'hribbon',          p...
VRIBBON             = new_tag ( p... ) -> TAG 'vribbon',          p...
ZOOMER              = new_tag ( p... ) -> TAG 'zoomer',           p...
COLUMN              = new_tag ( p... ) -> TAG 'column',           p...
VGAP                = new_tag ( p... ) -> TAG 'vgap',             p...
HGAP                = new_tag ( p... ) -> TAG 'hgap',             p...
XHGAP               = new_tag ( p... ) -> TAG 'xhgap',            p...
CHASE               = new_tag ( p... ) -> TAG 'chase',            p...
LEFTMARGIN          = new_tag ( p... ) -> TAG 'leftmargin',       p...
RIGHTMARGIN         = new_tag ( p... ) -> TAG 'rightmargin',      p...
TOPMARGIN           = new_tag ( p... ) -> TAG 'topmargin',        p...
BOTTOMMARGIN        = new_tag ( p... ) -> TAG 'bottommargin',     p...

#...........................................................................................................
### WORKSPACE (IMPOSITION) ###
GALLEY      = new_tag ( p... ) -> TAG 'galley',   p...

#...........................................................................................................
### TAINT should be implemented using Polymer / Shadow DOM ###
BUTTON = ->
  ### MaterializeCSS-compatible button ###
  A '.btn.waves-effect.waves-light', href: '#', =>
    TEXT "Demo"
    I '.mdi-action-search.right'
#...........................................................................................................
JS          = new_tag ( route ) -> SCRIPT type: 'text/javascript',  src: route
CSS         = new_tag ( route ) -> LINK   rel:  'stylesheet',      href: route

#===========================================================================================================
#
#-----------------------------------------------------------------------------------------------------------
@font_test = ( app, md, settings, handler ) ->
  n           = 10
  triplets    = [
    [  0x0061,  0x007a,    'u-latn',        ]
    [  0x4e00,  0x9fff,    'u-cjk',         ]
    [  0x3400,  0x4dbf,    'u-cjk-xa',      ]
    [ 0x2a700, 0x2b73f,    'u-cjk-xc',      ]
    [ 0x2b740, 0x2b81f,    'u-cjk-xd',      ]
    [  0x2f00,  0x2fdf,    'u-cjk-rad1',    ]
    [  0x2e80,  0x2eff,    'u-cjk-rad2',    ]
    [  0x3000,  0x303f,    'u-cjk-sym',     ]
    [  0x31c0,  0x31ef,    'u-cjk-strk',    ]
    [  0x3200,  0x32ff,    'u-cjk-enclett', ]
    [  0x3300,  0x33ff,    'u-cjk-cmp',     ]
    [  0xf900,  0xfaff,    'u-cjk-cmpi1',   ]
    [  0xfe30,  0xfe4f,    'u-cjk-cmpf',    ]
    [ 0x2f800, 0x2fa1f,    'u-cjk-cmpi2',   ]
    [ 0x20000, 0x2b81f,    'u-cjk-xb',      ]
    [  0xe000,  0xf8ff,    'jzr',           ] ]
  #.........................................................................................................
  return render =>
    DOCTYPE 5
    HTML =>
      HEAD =>
        META charset: 'utf-8'
        # META name: 'viewport', content: 'width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;'
        TITLE 'mingkwai'
        # TITLE '眀快排字机'
        LINK rel: 'shortcut icon', href: './favicon.icon'
        CSS './html5doctor-css-reset.css'
        # CSS './fonts/webfontkit-20150311-073132/stylesheet.css'
        JS  './jquery-2.1.3.js'
        CSS './jquery-ui-1.11.3.custom/jquery-ui.css'
        JS  './jquery-ui-1.11.3.custom/jquery-ui.js'
        JS  './jquery.event.drag-2.2/jquery.event.drag-2.2.js'
        JS  './outerHTML-2.1.0.js'
        JS  './blaidddrwg.js'
        # JS  './convertPointFromPageToNode.js'
        JS  './jquery-transit.js'
        JS  './browser.js'
        JS  './process-xcss-rules.js'
        CSS './materialize/css/materialize.css'
        JS  './materialize/js/materialize.min.js'
        CSS './mkts-main.css'
      #=====================================================================================================
      BODY style: "transform:scale(3);transform-origin:top left;", =>
        for [ cid, _, rsg, ] in triplets
          P =>
            # SPAN style: "font-family:'cjk','lastresort';", =>
            SPAN =>
              for i in [ 0 ... n ]
                SPAN => CHR.as_uchr cid + i
            SPAN =>
              TEXT "(#{rsg})"
        P style: "font-family:'spincycle-eot','lastresort';", =>
          SPAN => "一丁"
          SPAN => "abcdef (spincycle-eot)"
        P style: "font-family:'spincycle-embedded-opentype','lastresort';", =>
          SPAN => "一丁"
          SPAN => "abcdef (spincycle-embedded-opentype)"
        P style: "font-family:'spincycle-woff2','lastresort';", =>
          SPAN => "一丁"
          SPAN => "abcdef (spincycle-woff2)"
        P style: "font-family:'spincycle-woff','lastresort';", =>
          SPAN => "一丁"
          SPAN => "abcdef (spincycle-woff)"
        P style: "font-family:'spincycle-truetype','lastresort';", =>
          SPAN => "一丁"
          SPAN => "abcdef (spincycle-truetype)"
        P style: "font-family:'spincycle-svg','lastresort';", =>
          SPAN => "一丁"
          SPAN => "abcdef (spincycle-svg)"
        P style: "font-family:'lastresort';", =>
          SPAN => "一丁"
          SPAN => "abcdef (lastresort)"




#===========================================================================================================
#
#-----------------------------------------------------------------------------------------------------------
@test_page = ->
  #.........................................................................................................
  return render =>
    DOCTYPE 5
    HTML =>
      HEAD =>
        META charset: 'utf-8'
        JS  './jquery-2.1.3.js'
        JS  './outerHTML-2.1.0.js'
        # JS  './blaidddrwg.js'
        JS  './browser.js'
        STYLE '', """
            html, body {
              margin:                 0;
              padding:                0;
            }
            .gauge {
              position:               absolute;
              outline:                1px solid red;
            }
          """
        #===================================================================================================
        COFFEESCRIPT ->
          ( $ 'document' ).ready ->
            log                   = console.log.bind console
            # #...............................................................................................
            # gauges                = $ '.gauge'
            # for gauge_idx in [ 0 ... gauges.length ]
            #   gauge               = gauges.eq gauge_idx
            #   height_npx          = parseInt ( gauge.css 'height' ), 10
            #   height_rpx_a        = gauge.height()
            #   height_rpx_b        = gauge[ 0 ].getBoundingClientRect()[ 'height' ]
            #   log gauge_idx + 1, height_npx, height_rpx_a, height_rpx_b
            #...............................................................................................
            gauge         = $ "<div id='meter-gauge' style='position:absolute;'></div>"
            ( $ 'body' ).append gauge
            for d_npx in [ 1 .. 1000 ]
              gauge.css 'height', "#{d_npx}px"
              d_rpx = gauge[ 0 ].getBoundingClientRect()[ 'height' ]
              log d_npx, d_rpx

      #=====================================================================================================
      BODY =>

#-----------------------------------------------------------------------------------------------------------
@splash_window = ->
  #.........................................................................................................
  return render =>
    DOCTYPE 5
    HTML =>
      STYLE '', """
        body, html {
          width:                    100%;
          height:                   100%;
          overflow:                 hidden;
        }
        body {
          width:                    100%;
          height:                   100%;
          background-color:         rgba( 255, 255, 255, 0.0 );
          background-image:         url(./mingkwai-logo-circled.png);
          background-size:          contain;
          background-repeat:        no-repeat;
          background-position:      50%;
        }
        """
          # position:                 fixed;
          # top:                      10mm;
          # left:                     10mm;
      BODY =>

#-----------------------------------------------------------------------------------------------------------
@layout = ->
  #.........................................................................................................
  return render =>
    DOCTYPE 5
    HTML =>
      HEAD =>
        META charset: 'utf-8'
        # META name: 'viewport', content: 'width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;'
        TITLE 'mingkwai'
        # TITLE '眀快排字机'
        LINK rel: 'shortcut icon', href: './favicon.icon'
        CSS './html5doctor-css-reset.css'
        # CSS './fonts/webfontkit-20150311-073132/stylesheet.css'
        JS  './jquery-2.1.3.js'
        CSS './jquery-ui-1.11.3.custom/jquery-ui.css'
        JS  './jquery-ui-1.11.3.custom/jquery-ui.js'
        JS  './jquery.event.drag-2.2/jquery.event.drag-2.2.js'
        JS  './outerHTML-2.1.0.js'
        JS  './blaidddrwg.js'
        # JS  './convertPointFromPageToNode.js'
        JS  './jquery-transit.js'
        JS  './browser.js'
        JS  './process-xcss-rules.js'
        CSS './materialize/css/materialize.css'
        JS  './materialize/js/materialize.min.js'
        CSS './mkts-main.css'
      #=====================================================================================================
      COFFEESCRIPT =>
        ( $ document ).ready ->
          # #.................................................................................................
          # start_node  = ( $ 'page column p' ).contents().eq 0
          # start_dom   = start_node.get 0
          # # endNode = $('span.second').contents().get(0);
          # range = document.createRange()
          # idx   = 0
          # text  = start_node.text()
          # while idx < text.length
          #   range.setStart start_dom, idx
          #   idx += if ( text.codePointAt idx ) > 0xffff then +2 else +1
          #   range.setEnd start_dom, idx
          #   { bottom, height, left, right, top, width } = range.getBoundingClientRect()
          #   t = range.toString()
          #   console.log ( if t is '\u00ad' then '~' else t ), left, top
          # # range.setEnd   start_node, 0
          # # console.log range.toString()
          # # console.log range.getBoundingClientRect()
          # window.myrange = range
          #.................................................................................................
          # getBoundingClientRect
          window.zoomer = $ 'zoomer'
          # zoomer.draggable()
          scroll_x  = null
          scroll_y  = null
          page_x    = null
          page_y    = null
          dragging  = no
          shifted   = no
          ( $ document ).on 'keyup keydown', ( event ) -> shifted = event.shiftKey; return true
          ### DRAGGING / HAND TOOL SUPPORT ###
          # ( $ document ).on 'dragstart', ( event, data ) ->
          #   console.log 'dragstart', event
          #   scroll_x  = ( $ window ).scrollLeft()
          #   scroll_y  = ( $ window ).scrollTop()
          #   page_x    = event.pageX
          #   page_y    = event.pageY
          #   dragging  = yes
          #   ( $ 'body' ).addClass 'grabbing'
          # # ( $ document ).on 'drag', ( event, data ) ->
          # #   console.log 'drag', [ data.deltaX, data.deltaY, ]
          # #   ( $ window ).scrollLeft scroll_x - data.deltaX
          # #   ( $ window ).scrollTop  scroll_y - data.deltaY
          # ( $ document ).on 'mousemove', ( event ) ->
          #   return unless dragging
          #   factor = 1 # if shifted then 2 else 1
          #   ( $ window ).scrollLeft ( $ window ).scrollLeft() + ( page_x - event.pageX ) * factor
          #   ( $ window ).scrollTop  ( $ window ).scrollTop()  + ( page_y - event.pageY ) * factor
          # # ( $ document ).on 'draginit', ( event ) ->
          # #   console.log 'draginit', event
          # ( $ document ).on 'dragend', ( event ) ->
          #   # console.log 'dragend', event
          #   dragging  = no
          #   ( $ 'body' ).removeClass 'grabbing'

          # ( $ document ).on 'drag',        -> console.log 'drag'; return true
          # ( $ document ).on 'touchstart',  -> console.log 'touchstart'; return true
          # ( $ document ).on 'touchmove',   -> console.log 'touchmove'; return true
          # ( $ document ).on 'touchend',    -> console.log 'touchend'; return true
          # ( $ document ).on 'touchcancel', -> console.log 'touchcancel'; return true
          # ( $ document ).on 'scrollstart', -> console.log 'scrollstart'; return true
          # ( $ document ).on 'scrollstop',  -> console.log 'scrollstop'; return true
          # ( $ document ).on 'swipe',       -> console.log 'swipe'; return true
          # ( $ document ).on 'swipeleft',   -> console.log 'swipeleft'; return true
          # ( $ document ).on 'swiperight',  -> console.log 'swiperight'; return true
          # ( $ document ).on 'tap',         -> console.log 'tap'; return true
          # ( $ document ).on 'taphold',     -> console.log 'taphold'; return true
          # ( $ document ).on 'mousedown',   -> console.log 'mousedown'; return true
          # ( $ document ).on 'mouseup',     -> console.log 'mouseup'; return true
          # ( $ document ).on 'mousemove',   -> console.log 'mousemove'; return true
        # ( $ document ).on 'mousemove', ( event ) ->
        #   app                 = window[ 'app' ]
        #   [ page_x, page_y, ] = [ event.pageX, event.pageY, ]
        #   zmr                 = window.convertPointFromPageToNode ( app[ 'zoomer' ].get 0 ), page_x, page_y
        #   console.log '©YC6EG', [ page_x, page_y, ], zmr
        #   window[ 'app' ][ 'mouse-position' ] = [ page_x, page_y, ]
        #   ( $ '#tg' ).css 'left', "#{zmr[ 'x' ]}px"
        #   ( $ '#tg' ).css 'top',  "#{zmr[ 'y' ]}px"
        # ( $ document ).on 'mousemove', ( event ) ->
        #   # console.log '©YC6EG', [ event.pageX, event.pageY, ]
        #   window[ 'app' ][ 'mouse-position' ] = [ event.pageX, event.pageY, ]
      #=====================================================================================================
      BODY =>
        #...............................................................................................
        ARTBOARD '.galley', =>
          ZOOMER =>
            GALLEY =>
              OVERLAY "Galley"
              CHASE =>
                TOPMARGIN =>
                HBOX =>
                  LEFTMARGIN =>
                  COLUMN =>
                  VGAP =>
                  COLUMN =>
                  VGAP =>
                  COLUMN =>
                  RIGHTMARGIN =>
                BOTTOMMARGIN =>
        ARTBOARD '.pages', =>
          ZOOMER =>
            for page_nr in [ 1 .. 5 ]
              PAGE =>
                OVERLAY page_nr
                CHASE =>
                  TOPMARGIN =>
                  HBOX =>
                    LEFTMARGIN =>
                    COLUMN =>
                    VGAP =>
                    COLUMN =>
                    VGAP =>
                    COLUMN =>
                    RIGHTMARGIN =>
                  BOTTOMMARGIN =>

        HRIBBON '.draggable', style: 'height:20mm;', =>
          I '.small.mkts-tool-hand',            action: 'tool-mode-hand'
          I '.small.mdi-editor-insert-chart',   action: 'editor-insert-chart'
          I '.small.mdi-action-3d-rotation',    action: 'action-3d-rotation'
          I '.small.mdi-action-assignment',     action: 'action-assignment'
          I '.small.mdi-image-blur-on',         action: 'image-blur-on'
          I '.small.mdi-action-print',          action: 'action-print'
          I '.small.mdi-action-cached',         action: 'action-cached'
          I '.small.mdi-content-content-cut',   action: 'content-content-cut'
          I '.small.mdi-content-content-copy',  action: 'content-content-copy'

