


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
  eval "#{name_} = TEACUP[ #{rpr name_} ]"
ARTBOARD    = new_tag ( P... ) -> TAG 'artboard', P...
PAGE        = new_tag ( P... ) -> TAG 'page',     P...
PAPER       = new_tag ( P... ) -> TAG 'paper',    P...
GALLEY      = new_tag ( P... ) -> TAG 'galley',   P...
BOX         = new_tag ( P... ) -> TAG 'box',      P...
COLUMN      = new_tag ( P... ) -> TAG 'column',   P...
WRAP        = new_tag ( P... ) -> TAG 'wrap',     P...
GAP         = new_tag ( P... ) -> TAG 'gap',      P...

#-----------------------------------------------------------------------------------------------------------
@layout = ->
  #.........................................................................................................
  return render =>
    DOCTYPE 5
    HTML =>
      HEAD =>
        META charset: 'utf-8'
        TITLE 'mingkwai'
        # TITLE '眀快排字机'
        LINK rel: 'shortcut icon', href: './favicon.icon'
        LINK rel: 'stylesheet', href: './html5doctor-css-reset.css'
        LINK rel: 'stylesheet', href: './mingkwai-fixes.css'
        LINK rel: 'stylesheet', href: './mingkwai-custom-elements.css'
        LINK rel: 'stylesheet', href: './mingkwai-colors.css'
        LINK rel: 'stylesheet', href: './mingkwai-layout.css'
        LINK rel: 'stylesheet', href: './mingkwai-fonts.css'
        LINK rel: 'stylesheet', href: './mingkwai-main.css'
        LINK rel: 'stylesheet', href: './mingkwai-dev.css'
        SCRIPT type: 'text/javascript', src: './jquery-2.1.3.js'
        SCRIPT type: 'text/javascript', src: './outerHTML-2.1.0.js'
        # ### https://github.com/FremyCompany/css-regions-polyfill/ ###
        # SCRIPT type: 'text/javascript', src: './css-regions-polyfill.min.js'
        SCRIPT type: 'text/javascript', src: './blaidddrwg.js'
        SCRIPT type: 'text/javascript', src: './browser.js'
        # SCRIPT type: 'text/javascript', src: './LINESETTER.js'
        # SCRIPT src: '/socket.io/socket.io.js'
      #=====================================================================================================
      BODY =>
        if yes
          DIV '#mkts-top'
          ARTBOARD =>
            for page_nr in [ 1 .. 32 ]
              PAPER =>
                PAGE =>
                  GALLEY =>
                    WRAP =>
                      COLUMN =>
                      GAP =>
                      COLUMN =>
                      GAP =>
                      COLUMN =>
          DIV '#mkts-bottom'
        if no
          DIV '#mkts-top'
          # DIV '#focus'
          DIV '.paper', =>
            #.................................................................................................
            # #### pixel grid ###
            # DIV '.grid.pixel-grid', =>
            #   for idx in [ 1 .. 100 ]
            #     y = idx * 10
            #     DIV '.gridline.horizontal', { style: "top:#{y}px;", }
            #.................................................................................................
            #### baseline grid ###
            DIV '.grid.baseline-grid', =>
              for idx in [ 1 .. 53 ]
                ### get offset from CSS ###
                ### TAINT should be 5 ###
                y = 14 + idx * 4.9
                DIV '.gridline.horizontal', { style: "top:#{y}mm;", }
            # DIV '#x', { style: "height:100mm;width:100mm;outline:1px solid red;", }
            #.................................................................................................
            DIV '.mingkwai-dev-page-marker', =>
            DIV '.page', =>
              # H1 "眀快排字机"
              # DIV =>
              #   SPAN => '〇'
              #   SPAN '.jzr-babel', '〇'
              # DIV """"""
              # DIV """"""
              # DIV """"""
              # DIV """"""
              # DIV """"""
              # DIV """"""
              # DIV """𠀀 𠀁 𠀂 𠀃 𠀄 𠀅 𠀆 𠀇 𠀈 𠀉 𠀊 𠀋 𠀌 𠀍 𠀎 𠀏 𠀐 𠀑 𠀒 𠀓 𠀔 𠀕 𠀖 𠀗 𠀘 𠀙 𠀚 𠀛 𠀜 𠀝 𠀞 𠀟 𠀠 𠀡 𠀢 𠀣 𠀤 𠀥 𠀦 𠀧 𠀨 𠀩 𠀪 𠀫 𠀬 𠀭 𠀮 𠀯 𠀰"""
              #.............................................................................................
              # DIV '#column-test', contenteditable: 'true', =>
              #   RAW "dor-mouse much-ness me-mo-ry <span class='balken'></span>".replace /-/g, '\u00ad'
              #.............................................................................................
              DIV '.flex-columns-wrap', =>
                DIV '#box-a.column.filled-with-id-content'
                DIV '.column-gap'
                DIV '#box-b.column.filled-with-id-content'
                DIV '.column-gap'
                DIV '#box-c.column.filled-with-id-content'
                  # P '.is-first', contenteditable: 'true'
                  # P '.is-last', contenteditable: 'true'
                #   P '.is-middle', contenteditable: 'true'
          # #---------------------------------------------------------------------------------------------------
          # DIV '#content', => ( ( P => RAW paragraph ) for paragraph in _XXX_paragraphs )
          #---------------------------------------------------------------------------------------------------
          SCRIPT type: 'text/javascript', src: './browser.js'
          DIV '#mkts-bottom'




























