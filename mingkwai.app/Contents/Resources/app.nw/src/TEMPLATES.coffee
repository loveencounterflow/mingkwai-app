


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
ARTBOARD    = new_tag ( p... ) -> TAG 'artboard', p...
PAGE        = new_tag ( p... ) -> TAG 'page',     p...
PAPER       = new_tag ( p... ) -> TAG 'paper',    p...
GALLEY      = new_tag ( p... ) -> TAG 'galley',   p...
BOX         = new_tag ( p... ) -> TAG 'box',      p...
COLUMN      = new_tag ( p... ) -> TAG 'column',   p...
WRAP        = new_tag ( p... ) -> TAG 'wrap',     p...
VGAP        = new_tag ( p... ) -> TAG 'vgap',     p...
HGAP        = new_tag ( p... ) -> TAG 'hgap',     p...
XHGAP       = new_tag ( p... ) -> TAG 'xhgap',    p...
RIBBON      = new_tag ( p... ) -> TAG 'ribbon',   p...
TOOL        = new_tag ( p... ) -> TAG 'tool',     p...
BOXER       = new_tag ( p... ) -> TAG 'boxer',    p...
PANEL       = new_tag ( p... ) -> TAG 'panel',    p...
GRIP        = new_tag ( p... ) -> TAG 'grip',     p...
OUTER       = new_tag ( p... ) -> TAG 'outer',    p...
LINE        = new_tag ( p... ) -> TAG 'line',     p...
OVERLAY     = new_tag ( p... ) -> TAG 'overlay',  p...
CORK        = new_tag ( p... ) -> TAG 'cork',     p...
TABLETOP    = new_tag ( p... ) -> TAG 'tabletop', p...
#...........................................................................................................
BOX         = new_tag ( p... ) -> TAG 'box',      p...
HBOX        = new_tag ( p... ) -> TAG 'hbox',     p...
VBOX        = new_tag ( p... ) -> TAG 'vbox',     p...
PANEL       = new_tag ( p... ) -> TAG 'panel',    p...
HPANEL      = new_tag ( p... ) -> TAG 'hpanel',   p...
VPANEL      = new_tag ( p... ) -> TAG 'vpanel',   p...
#...........................................................................................................
BUTTON = ->
  A '.btn.waves-effect.waves-light', href: '#', =>
    TEXT "Demo"
    I '.mdi-action-search.right'
#...........................................................................................................
JS          = new_tag ( route ) -> SCRIPT type: 'text/javascript',  src: route
CSS         = new_tag ( route ) -> LINK   rel:  'stylesheet',      href: route

#-----------------------------------------------------------------------------------------------------------
@test_page = ->
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
        CSS './mingkwai-main.css'
        JS  './jquery-2.1.3.js'
        CSS './jquery-ui-1.11.3.custom/jquery-ui.css'
        JS  './jquery-ui-1.11.3.custom/jquery-ui.js'
        JS  './jquery.mobile-1.4.5.js'
        JS  './outerHTML-2.1.0.js'
        JS  './process-xcss-rules.js'
        JS  './blaidddrwg.js'
        JS  './browser.js'
      STYLE '', """
          body {
            height:             auto;
          }
          .panel {
            margin:             100mm;
            width:              100mm;
            height:             100mm;
            overflow:           auto;
            outline:            1px solid red;
          }
          .tabletop {
            background-image:   url( ./background_linen.png );
            width:              200mm;
            height:             200mm;
            outline:            1px solid green;
          }
          .artboard {
            background-image:   url( ./background_linen_lime.png );
            position:           relative;
            top:                60mm;
            left:               60mm;
            width:              80mm;
            height:             80mm;
            outline:            1px solid orange;
          }
        """
      #=====================================================================================================
      COFFEESCRIPT ->
        ( $ 'document' ).ready ->
          log = console.log.bind console
          panel     = $ '.panel'
          tabletop  = $ '.tabletop'
          artboard  = $ '.artboard'
          state     = 'inactive'

          ( $ 'document' ).on 'touchstart',  -> log 'touchstart'; return true
          ( $ 'document' ).on 'touchmove',   -> log 'touchmove'; return true
          ( $ 'document' ).on 'touchend',    -> log 'touchend'; return true
          ( $ 'document' ).on 'touchcancel', -> log 'touchcancel'; return true
          ( $ 'document' ).on 'scrollstart', -> log 'scrollstart'; return true
          ( $ 'document' ).on 'scrollstop',  -> log 'scrollstop'; return true
          ( $ 'document' ).on 'swipe',       -> log 'swipe'; return true
          ( $ 'document' ).on 'swipeleft',   -> log 'swipeleft'; return true
          ( $ 'document' ).on 'swiperight',  -> log 'swiperight'; return true
          ( $ 'document' ).on 'tap',         -> log 'tap'; return true
          ( $ 'document' ).on 'taphold',     -> log 'taphold'; return true
          ( $ 'document' ).on 'mousedown',     -> log 'mousedown'; return true

          # offset_0  = panel.offset()
          # top_0     = offset_0[ 'top'  ]
          # left_0    = offset_0[ 'left' ]
          #.................................................................................................
          scroll_to_top = ->
            state = 'top'
            # panel.stop().animate { scrollTop: 150 }, 1500, ->
            # panel.animate { scrollTop: 150 }, 1500, ->
            #   log "top ok"
            #   state = 'inactive'
            panel.scrollTop 150
            state = 'inactive'
          #.................................................................................................
          panel.on 'scroll', ( event ) ->
            if state is 'top'
              log "already top"
              return false
            top = panel.scrollTop()
            scroll_to_top() if top < 150
            return false
          #.................................................................................................
          scroll_to_top()
      #=====================================================================================================
      BODY =>
        DIV '.panel', =>
          DIV '.tabletop', =>
            DIV '.artboard', =>
              "helo"

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
        JS  './jquery-2.1.3.js'
        CSS './jquery-ui-1.11.3.custom/jquery-ui.css'
        JS  './jquery-ui-1.11.3.custom/jquery-ui.js'
        JS  './outerHTML-2.1.0.js'
        JS  './blaidddrwg.js'
        JS  './browser.js'
        JS  './process-xcss-rules.js'
        CSS './materialize/css/materialize.min.css'
        JS  './materialize/js/materialize.min.js'
        CSS './mkts-main.css'
      #=====================================================================================================
      # COFFEESCRIPT =>
      #=====================================================================================================
      BODY =>
        #...............................................................................................
        HPANEL => '1'
        HBOX =>
          VPANEL =>
            HPANEL => 'x1'
            HPANEL =>
              HPANEL => 'x2x1'
              HPANEL => 'x2x2'
              HPANEL => 'x2x3'
            HPANEL =>
              VPANEL => 'x3x1'
              VPANEL => 'x3x2'
              VPANEL => 'x3x3'
            HPANEL => 'x4'
          VPANEL => 'B'
          VBOX =>
            HPANEL =>
              BUTTON =>
              BUTTON =>
              BUTTON =>
            VPANEL =>
              BUTTON =>
              BUTTON =>
              BUTTON =>
            HPANEL => 'C2'
          VPANEL => 'D'
        HPANEL => '3'

#-----------------------------------------------------------------------------------------------------------
@layout_old = ->
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
        CSS './mingkwai-main.css'
        JS  './jquery-2.1.3.js'
        CSS './jquery-ui-1.11.3.custom/jquery-ui.css'
        JS  './jquery-ui-1.11.3.custom/jquery-ui.js'
        JS  './outerHTML-2.1.0.js'
        JS  './blaidddrwg.js'
        JS  './browser.js'
        JS  './process-xcss-rules.js'
      #=====================================================================================================
      # COFFEESCRIPT =>
      #=====================================================================================================
      BODY =>
        #...............................................................................................
        BOXER =>
          RIBBON '.draggable.vertical.left', =>
            TOOL '.save', "save"
            TOOL '.open', "open"
            TOOL '.print', "print"
        OUTER =>
          PANEL '.top', =>
            RIBBON '.bar.horizontal.top', =>
              TOOL '.save.square.button.ui-icon.comment',         action: 'save'
              TOOL '.open.square.button.ui-icon.comment',         action: 'open'
              TOOL '.print.square.button.ui-icon.ui-icon-print',  action: 'print'
              TOOL '.view-test.square.button.ui-icon.comment',    action: 'view-test'
          #...................................................................................................
          GRIP '.horizontal', =>
          #...................................................................................................
          PANEL '.center', '.main', =>
            DIV '#mkts-top'
            #...................................................................................................
            TABLETOP =>
              ARTBOARD =>
                #...............................................................................................
                PAPER '.a4.portrait.endless', =>
                  OVERLAY "Galley"
                  PAGE =>
                    GALLEY =>
                      WRAP =>
                        COLUMN => RAW '1'
                        VGAP =>
                        COLUMN =>
                          RAW """
                            <h1 id='dYPFk'>helo</h1>
                            <p>Just as she said this, she no­ticed that one of the trees had a door lead­ing right into it.
                            ‘That’s very cu­ri­ous!’ she thought. ‘But every­thing’s cu­ri­ous to­day. I think I may as
                            well go in at once.’ And in she went.</p>"""
                        VGAP =>
                        COLUMN => RAW '3'
                #...............................................................................................
                for page_nr in [ 1 .. 4 ]
                  PAPER '.a4.portrait', =>
                    OVERLAY page_nr
                    PAGE =>
                      GALLEY =>
                        WRAP =>
                          COLUMN => RAW '1'
                          VGAP =>
                          COLUMN =>
                            RAW """
                              <h1 id='dYPFk'>helo</h1>
                              <p>Just as she said this, she no­ticed that one of the trees had a door lead­ing right into it.
                              ‘That’s very cu­ri­ous!’ she thought. ‘But every­thing’s cu­ri­ous to­day. I think I may as
                              well go in at once.’ And in she went.</p>"""
                          VGAP =>
                          COLUMN => RAW '3'
                #...............................................................................................
                PAPER '.a4.portrait', =>
                  OVERLAY "n"
                  PAGE =>
                    GALLEY =>
                      WRAP =>
                        COLUMN => RAW """<p>1 debug '©bMb79', debug '©9WcnO', debug '©UkKnj', 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 </p>"""
                        VGAP =>
                        COLUMN => RAW """<p>2 debug '©H8oZl', debug '©rhPuG', debug '©lEad4', </p>"""
                        VGAP =>
                        COLUMN => RAW """<p>3 debug '©fL3qd', debug '©BCjqd', debug '©Hbfrn', </p>"""
                      HGAP =>
                      WRAP style: 'height:10mm;', =>
                        COLUMN => RAW """<h1>Another Headline</h1>"""
                      # HGAP =>
                      WRAP style: 'height:30mm;', =>
                        COLUMN => RAW """<p>5 debug '©yJMKj', debug '©FCRML', debug '©JW54V', </p>"""
                        VGAP =>
                        COLUMN => RAW """<p>6 debug '©2wxUf', debug '©DjXRj', debug '©oUQGv', </p>"""
                        VGAP =>
                        COLUMN => RAW """<p>7 debug '©PbmPW', debug '©85SdO', debug '©XzTS6', </p>"""
                      HGAP =>
                      WRAP style: 'height:10mm;', =>
                        COLUMN => RAW """<h1>Another Headline</h1>"""
                      WRAP =>
                        COLUMN => RAW """<p>5 debug '©yJMKj', debug '©FCRML', debug '©JW54V', </p>"""
                        VGAP =>
                        COLUMN => RAW """<p>6 debug '©2wxUf', debug '©DjXRj', debug '©oUQGv', </p>"""
                        VGAP =>
                        COLUMN => RAW """<p>7 debug '©PbmPW', debug '©85SdO', debug '©XzTS6', </p>"""
                      XHGAP =>
                      WRAP style: 'height:50mm;', =>
                        IMG style: 'height:50mm;width:50mm;', src: './132419489_41n.jpg'
              #...................................................................................................
              DIV '#mkts-bottom'
          #...................................................................................................
          GRIP '.horizontal'
          #...................................................................................................
          PANEL '.bottom', =>
            TOOL '#console.console'
            DIV '#console-bottom'


        #   DIV '#mkts-top'
        #   # DIV '#focus'
        #   DIV '.paper', =>
        #     #.................................................................................................
        #     # #### pixel grid ###
        #     # DIV '.grid.pixel-grid', =>
        #     #   for idx in [ 1 .. 100 ]
        #     #     y = idx * 10
        #     #     DIV '.gridline.horizontal', { style: "top:#{y}px;", }
        #     #.................................................................................................
        #     #### baseline grid ###
        #     DIV '.grid.baseline-grid', =>
        #       for idx in [ 1 .. 53 ]
        #         ### get offset from CSS ###
        #         ### TAINT should be 5 ###
        #         y = 14 + idx * 4.9
        #         DIV '.gridline.horizontal', { style: "top:#{y}mm;", }
        #     # DIV '#x', { style: "height:100mm;width:100mm;outline:1px solid red;", }
        #     #.................................................................................................
        #     DIV '.mingkwai-dev-page-marker', =>
        #     DIV '.page', =>
        #       # H1 "眀快排字机"
        #       # DIV =>
        #       #   SPAN => '〇'
        #       #   SPAN '.jzr-babel', '〇'
        #       # DIV """"""
        #       # DIV """"""
        #       # DIV """"""
        #       # DIV """"""
        #       # DIV """"""
        #       # DIV """"""
        #       # DIV """𠀀 𠀁 𠀂 𠀃 𠀄 𠀅 𠀆 𠀇 𠀈 𠀉 𠀊 𠀋 𠀌 𠀍 𠀎 𠀏 𠀐 𠀑 𠀒 𠀓 𠀔 𠀕 𠀖 𠀗 𠀘 𠀙 𠀚 𠀛 𠀜 𠀝 𠀞 𠀟 𠀠 𠀡 𠀢 𠀣 𠀤 𠀥 𠀦 𠀧 𠀨 𠀩 𠀪 𠀫 𠀬 𠀭 𠀮 𠀯 𠀰"""
        #       #.............................................................................................
        #       # DIV '#column-test', contenteditable: 'true', =>
        #       #   RAW "dor-mouse much-ness me-mo-ry <span class='balken'></span>".replace /-/g, '\u00ad'
        #       #.............................................................................................
        #       DIV '.flex-columns-wrap', =>
        #         DIV '#box-a.column.filled-with-id-content'
        #         DIV '.column-gap'
        #         DIV '#box-b.column.filled-with-id-content'
        #         DIV '.column-gap'
        #         DIV '#box-c.column.filled-with-id-content'
        #           # P '.is-first', contenteditable: 'true'
        #           # P '.is-last', contenteditable: 'true'
        #         #   P '.is-middle', contenteditable: 'true'
        #   # #---------------------------------------------------------------------------------------------------
        #   # DIV '#content', => ( ( P => RAW paragraph ) for paragraph in _XXX_paragraphs )
        #   #---------------------------------------------------------------------------------------------------
        #   SCRIPT type: 'text/javascript', src: './browser.js'
        #   DIV '#mkts-bottom'




























