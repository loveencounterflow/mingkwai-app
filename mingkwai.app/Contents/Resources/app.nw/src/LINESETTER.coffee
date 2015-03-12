

############################################################################################################
# njs_path                  = require 'path'
# njs_fs                    = require 'fs'
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/LINESETTER'
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
suspend                   = require 'coffeenode-suspend'
step                      = suspend.step
after                     = suspend.after
immediately               = suspend.immediately
sleep                     = suspend.sleep
#...........................................................................................................
D                         = require 'pipedreams2'
$                         = D.remit.bind D
# LODASH                    = D.LODASH
HOTMETAL                  = D.HOTMETAL
XCSS                      = require './XCSS'

  # #---------------------------------------------------------------------------------------------------------
  # has_hanging_margin = ( hotml ) ->
  #   # debug '©mnhYJ',  ( CND.last_of ( CND.last_of hotml )[ 1 ] ), ( CND.last_of ( CND.last_of hotml )[ 1 ] ) in [ '\u00ad', '-', ',', '.', '!', '—', '–', ':', ]
  #   last_chr = CND.last_of ( CND.last_of hotml )[ 1 ].replace /\s+$/, ''
  #   return last_chr in [ '\u00ad', '-', ',', '.', '!', '—', '–', ':', ';', '(', ')', '‘', '’', '“', '”', ]

  # #---------------------------------------------------------------------------------------------------------
  # get_class = ( is_first, is_last ) ->
  #   if is_first
  #     return 'is-lone' if is_last
  #     return 'is-first'
  #   return 'is-last' if is_last
  #   return 'is-middle'



#===========================================================================================================
#
#-----------------------------------------------------------------------------------------------------------
@demo = ( app, md, settings, handler ) ->
  switch arity = arguments.length
    when 3
      handler   = settings
      settings  = {}
    when 4
      null
    else
      throw new Error " expected 3 or 4 arguments, got #{arity}"

  #---------------------------------------------------------------------------------------------------------
  matter              = app[ 'matter' ]
  jQuery              = app[ 'jQuery' ]
  MKTS                = app[ 'MKTS'   ]
  window              = app[ 'window' ]
  document            = window[ 'document' ]
  BD                  = window[ 'BD'  ]
  gcolumn             = ( jQuery 'galley column' ).eq 0
  gcolumn_offset      = gcolumn.offset()
  gcolumn_left        = gcolumn_offset[ 'left' ]
  gcolumn_top         = gcolumn_offset[ 'top'  ]
  zoomer              = jQuery 'zoomer'
  # zoomer_offset       = zoomer.offset()
  # zoomer_left         = zoomer_offset[ 'left' ]
  # zoomer_top          = zoomer_offset[ 'top'  ]
  window.gcolumn      = gcolumn # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  input               = D.create_throughstream()

  #---------------------------------------------------------------------------------------------------------
  mm_from_px          = ( px ) -> px * app[ 'mm-per-px' ]
  ƒ                   = ( x, precision = 2 ) -> x.toFixed precision

  #---------------------------------------------------------------------------------------------------------
  live                = yes
  live                = no
  mark_chrs           = no
  mark_chrs           = yes
  mark_lines          = yes
  t0                  = +new Date()
  #.........................................................................................................
  input
    #.......................................................................................................
    # .pipe D.TYPO.$quotes()
    # .pipe D.TYPO.$dashes()
    .pipe D.MD.$as_html()
    # .pipe D.HTML.$parse disperse: no, hyphenation: yes, whitespace: no, chrs: no
    #.......................................................................................................
    .pipe do =>
      return $ ( html, send ) =>
        ### Build galley HTML structure ###
        ### We're receiving the HTML of a text batch that is divided into block elements;
        typically those are headers, paragraphs, code blocks and so on. We wrap all of those into a
        common `<div>` with a unique ID so jQuery can build an HTML fragment with a single root element
        and we can easily refer back to this particular batch. Furthermore, we wrap all the contents of
        top level blocks into `<span>`s with class `.line-counter` that we can then use to find the
        enclosing rectangles of each line in each block. ###
        matter[ 'batch-idx' ]  += +1
        batch_id                = "mkts-galley-batch-#{matter[ 'batch-idx' ]}"
        batch                   = jQuery "<div id='#{batch_id}' class='mkts-galley-batch'>" + html + "</div>"
        blocks                  = batch.children()
        blocks.wrapInner "<span class='line-counter'></span>"
        batch_info              =
          '~isa':           'MKTS/LINESETTER/batch-info'
          '%batch':         batch
          '%blocks':        blocks
          'batch-id':       batch_id
        send batch_info
    #.......................................................................................................
    .pipe do =>
      return $ ( batch_info, send ) =>
        batch           = batch_info[ '%batch'    ]
        blocks          = batch_info[ '%blocks'   ]
        batch_id        = batch_info[ 'batch-id'  ]
        block_infos     = []
        line_counters   = blocks.find '.line-counter'
        gcolumn.append batch
        #...................................................................................................
        for block_idx in [ 0 ... blocks.length ]
          block             =        blocks.eq block_idx
          line_counter      = line_counters.eq block_idx
          client_rectangles = ( line_counter.get 0 ).getClientRects()
          line_count        = client_rectangles.length
          ### TAINT use BLAIDDDRWG ###
          height_px         = ( block.get 0 ).getBoundingClientRect()[ 'height' ]
          block_info        =
            '~isa':           'MKTS/LINESETTER/block-info'
            '%block':         block
            'line-count':     line_count
            'height.px':      height_px
          block_infos.push block_info
          #.................................................................................................
          # whisper line_counter.outerHTML()
          # help "#{line_count} lines"
          if mark_lines
            for client_rectangle in client_rectangles
              { left, top, width, height, } = client_rectangle
              zleft                         = left - gcolumn_left
              ztop                          = top  - gcolumn_top
              batch.append jQuery """<div style='position:absolute;left:#{zleft}px;top:#{ztop}px;width:#{width}px;height:#{height}px;outline:1px solid rgba(255,0,0,0.25);'></div>"""
        #...................................................................................................
        # debug '©e6CfD', block_infos.length
        send block_infos
    #.......................................................................................................
    .pipe do =>
      return $ ( block_infos, send ) =>
        #...................................................................................................
        MKTS.VIEW.show_pages()
        { here }          = matter
        pages             = jQuery 'artboard.pages page'
        page              = pages.eq here[ 'page-nr' ] - 1
        columns           = page.find 'column'
        column_count      = columns.length
        column            = columns.eq here[ 'column-nr' ] - 1
        ### TAINT use BLAIDDDRWG ###
        target_height_px  = ( column.get 0 ).getBoundingClientRect()[ 'height' ]
        #...................................................................................................
        ### Move to target ###
        # yield MKTS.VIEW.show_galley resume
        for block_info in block_infos
          block           = block_info[ '%block' ]
          block_height_px = block_info[ 'height.px' ]
          column.append block
          here[ 'y.px' ] += block_height_px
          debug '©08Nsv', MKTS.HERE.url_from_here here
          #.................................................................................................
          continue if here[ 'y.px' ] < target_height_px
          here[ 'column-nr' ] += +1
          #.................................................................................................
          if here[ 'column-nr' ] > column_count
            debug '©l4U89', MKTS.HERE.url_from_here here
            here[ 'column-nr' ]   = 1
            here[ 'page-nr'   ]  += +1
            here[ 'y.px'      ]   = 0
            ### TAINT code duplication ###
            page                  = pages.eq here[ 'page-nr' ] - 1
            columns               = page.find 'column'
            column_count          = columns.length
          #.................................................................................................
          column            = columns.eq here[ 'column-nr' ] - 1
          ### TAINT use BLAIDDDRWG ###
          target_height_px  = ( column.get 0 ).getBoundingClientRect()[ 'height' ]


        # gcolumn.append blocks
        # send block_html
        # #.................................................................................................
        # blks = gcolumn.children()
        # window.test = blks.get 3
        # debug '©T3v7V', (blks.get 3).getBoundingClientRect()
        # for idx in [ 0 ... blks.length ]
        #   blk             = blks.eq idx
        #   blk_dom         = blk.get 0
        #   height_px       = blk_dom.getBoundingClientRect()[ 'height' ]
        #   line_height_px  = BD.css blk, 'line-height'
        #   line_count      = height_px / line_height_px
        #   height_mm       = mm_from_px height_px
        #   line_height_mm  = mm_from_px line_height_px
        #   debug '©Xz8oT', blk.outerHTML()
        #   # debug '©tPA6J', rpr ( window.getComputedStyle blk_dom )[ 'line-height' ]
        #   help "box height (bbox)   : #{ƒ height_px, 3}px"
        #   help "box height (jQuery) : #{ƒ blk.height(), 3}px"
        #   # help "box height (bbox) : #{ƒ height_mm, 3}mm"
        #   help "line-height (CS)    : #{ƒ line_height_px, 3}px / line (???)"
        #   # help "line-height (CS)  : #{ƒ line_height_mm, 3}mm / line (???)"
        #   help "#{ƒ line_count, 3} lines"


        # debug '©qbZpO', block.outerHTML(), "#{ƒ mm_from_px block.height()}mm"
        # block.detach()
        # gcolumn.append block
        # block.hide().show 0
        # jQuery(window).trigger('resize')
        # window.alert 'xxx'
        # debug '©7ymOx', gcolumn.height()
        # debug '©7ymOx', gcolumn.offset()
        # item = document.createElement "li"
        # # item.appendChild(document.createTextNode("Option " + i);
        # ( gcolumn.get 0 ).appendChild item

        # text_nodes          = block.text_nodes()
        # last_left           = null
        # last_top            = null
        # #.................................................................................................
        # for node_idx in [ 0 ... text_nodes.length ]
        #   node        = text_nodes.eq node_idx
        #   node_dom    = node.get 0
        #   range       = document.createRange()
        #   chr_idx     = 0
        #   text        = node.text()
        #   left_0      = null
        #   top_0       = null
        #   #...............................................................................................
        #   while chr_idx < text.length
        #     range.setStart node_dom, chr_idx
        #     chr_idx        += if ( text.codePointAt chr_idx ) > 0xffff then +2 else +1
        #     range.setEnd node_dom, chr_idx
        #     block_chr_idx  += +1
        #     { bottom, height, left, right, top, width } = range.getBoundingClientRect()
        #     # { left, top, width } = range.getBoundingClientRect()
        #     rectangles = range.getClientRects()
        #     # debug '©rriqu', ( rpr range.toString() ), ( ƒ left ), ( ƒ top ), ( ([ ( ƒ r.left ), ( ƒ r.top ) ].join ',' ) for r in rectangles ).join ' '
        #     #.............................................................................................
        #     ### Collapsing characters (combining diacritics, trailing whitespace) has a position and
        #     a size of zero in both dimensions; we always treat such characters as belonging to the
        #     current line: ###
        #     if left is top is width is 0
        #       continue
        #       # line_stop_idx = block_chr_idx
        #     #.............................................................................................
        #     ### If `left_0` isn't yet set, make the current dimension the reference point: ###
        #     unless left_0?
        #       line_idx += +1
        #       left_0    = left
        #       top_0     = top
        #     #.............................................................................................
        #     ### Naive guess: when `left` has decreased and `top` has increased, a new line has
        #     started. NB this definitely won't work with right-to-left and bottom-to-top directions. ###
        #     if last_left?
        #       if left < last_left and top > last_top
        #         # line_stop_idx = block_chr_idx
        #         lines.push [ line_start_idx, block_chr_idx - 1, ]
        #         # debug '©HyM09', lines.length
        #         line_start_idx = block_chr_idx - 1
        #     #.............................................................................................
        #     last_left = left
        #     last_top  = top
        #     #.............................................................................................
        #     if mark_chrs
        #       zleft = left - gcolumn_left
        #       ztop  = top  - gcolumn_top
        #       gcolumn.append jQuery """<div style='position:absolute;left:#{zleft}px;top:#{ztop}px;width:#{width}px;height:#{height}px;outline:1px solid rgba(255,0,0,0.25);'></div>"""
        # #.................................................................................................
        # if block_chr_idx > line_start_idx
        #   lines.push [ line_start_idx, block_chr_idx, ]
        # #.................................................................................................
        # for entry, line_idx in lines
        #   [ line_start_idx
        #     line_stop_idx   ] = entry
        #   line_hotml          = HOTMETAL.slice block_hotml, line_start_idx, line_stop_idx
        #   entry.push line_hotml
        # #.................................................................................................
        # ### TAINT code duplication; use library method ###
        # if lines.length > 0
        #   attributes  = lines[ 0 ][ 2 ][ 0 ][ 0 ][ 0 ][ 1 ]
        #   clasz       = if ( clasz = attributes[ 'class' ] )? then clasz.split /\s/ else []
        #   clasz.push 'mkts-first-line'
        #   attributes[ 'class' ] = clasz.join ' '
        #   attributes  = lines[ lines.length - 1 ][ 2 ][ 0 ][ 0 ][ 0 ][ 1 ]
        #   clasz       = if ( clasz = attributes[ 'class' ] )? then clasz.split /\s/ else []
        #   clasz.push 'mkts-last-line'
        #   attributes[ 'class' ] = clasz.join ' '
        # #.................................................................................................
        # for [ line_start_idx, line_stop_idx, line_hotml, ] in lines
        #   debug '©LOqNJ', line_start_idx, line_stop_idx, HOTMETAL.as_html line_hotml
        # #...................................................................................................
        # if end?
        #   window.lines = lines
        #   end()
  #.........................................................................................................
  input.write md
  input.end()



