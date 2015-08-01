

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
later                     = setImmediate
sleep                     = suspend.sleep
#...........................................................................................................
D                         = require 'pipedreams2'
$                         = D.remit.bind D
$async                    = D.remit_async.bind D
# LODASH                    = D.LODASH
HOTMETAL                  = D.HOTMETAL
XCSS                      = require './XCSS'
glyph_replacements        = require './glyph-replacements'
#...........................................................................................................
### https://github.com/meryn/performance-now ###
now                       = require 'performance-now'


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
  debug '©E054j', 'demo'
  switch arity = arguments.length
    when 3
      handler   = settings
      settings  = {}
    when 4
      null
    else
      throw new Error " expected 3 or 4 arguments, got #{arity}"

  #---------------------------------------------------------------------------------------------------------
  switch format = settings[ 'format' ] ? 'md'
    when 'md'
      as_html = D.MD.$as_html()
    when 'html'
      as_html = D.$pass_through()
    else
      return handler new Error "unknown format #{rpr format}"
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
  target_column       = ( jQuery 'galley column' ).eq 1
  zoomer              = jQuery 'zoomer'
  # window.gcolumn      = gcolumn # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  input               = D.create_throughstream()

  #---------------------------------------------------------------------------------------------------------
  mm_from_rpx = ( d ) -> MKTS.GAUGE.mm_from_rpx app, d
  mm_from_npx = ( d ) -> MKTS.GAUGE.mm_from_npx app, d
  rpx_from_mm = ( d ) -> MKTS.GAUGE.rpx_from_mm app, d
  npx_from_mm = ( d ) -> MKTS.GAUGE.npx_from_mm app, d
  ƒ           = ( x, precision = 2 ) -> x.toFixed precision

  #---------------------------------------------------------------------------------------------------------
  try_slug = ( container, block_hotml, line_nr, start_idx, stop_idx ) =>
    slug_hotml                  = HOTMETAL.slice block_hotml, start_idx, stop_idx + 1
    block_tag                   = slug_hotml[ 0 ][ 0 ][ 0 ]
    HOTMETAL.TAG.set block_tag, 'line-nr', line_nr
    if line_nr is 1
      HOTMETAL.TAG.remove_class  block_tag, 'middle'
      HOTMETAL.TAG.add_class     block_tag, 'first'
    else
      HOTMETAL.TAG.remove_class  block_tag, 'first'
      HOTMETAL.TAG.add_class     block_tag, 'middle'
    slug_html                   = HOTMETAL.as_html slug_hotml
    slug_jq                     = jQuery slug_html
    line_counter                = slug_jq.children()[ 0 ]
    container.append slug_jq
    client_rectangles           = line_counter.getClientRects()
    container_width             = container.width()
    client_rectangle            = client_rectangles[ 0 ]
    client_width                = client_rectangle[ 'right' ] - container.offset()[ 'left' ]
    excess                      = Math.max 0, Math.floor client_width - container_width
    ### TAINT arbitrary precision limit ###
    excess                      = 0 if excess < 3
    if excess > 0
      warn slug_html
      warn "exceeding container by #{excess.toFixed 1}px"
    line_count                  = client_rectangles.length
    return [ slug_hotml, slug_html, line_count, excess, ]

  #---------------------------------------------------------------------------------------------------------
  mark_chrs           = yes
  mark_lines          = no
  XXX_t0              = +new Date()
  XXX_times           = []
  #.........................................................................................................
  input
    #.......................................................................................................
    # .pipe D.TYPO.$quotes()
    # .pipe D.TYPO.$dashes()
    .pipe as_html
    .pipe $ ( html, send ) =>
      XXX_times.push [ "html from markdown", new Date() - XXX_t0, ]
      send HOTMETAL.HTML.parse html
      XXX_times.push [ "html parsed into hotml", new Date() - XXX_t0, ]
    # .pipe make character replacements
    #.......................................................................................................
    .pipe $ ( hotml, send ) =>
      ### split document into blocks ###
      send block_hotml for block_hotml in HOTMETAL.slice_toplevel_tags hotml
    # #.......................................................................................................
    # .pipe $async ( data, done ) =>
    #   later =>
    #     done data
    #.......................................................................................................
    .pipe $ ( block_hotml, send ) =>
      ### Wrap block contents in `line-counter`; method analoguous to `jQuery.wrapInner` ###
      block_hotml[ 0                      ][ 0 ].push     [ 'line-counter', {}, ]
      block_hotml[ block_hotml.length - 1 ][ 2 ].unshift  [ 'line-counter', ]
      send block_hotml
    #.......................................................................................................
    .pipe $ ( block_hotml, send ) =>
      start_idx       = 0
      stop_idx        = 0
      trial_count     = 0
      last_start_idx  = block_hotml.length - 1
      html_lines      = []
      slices          = []
      excesses        = []
      slug_html       = null
      good_slug_html  = null
      is_finished     = no
      line_nr         = 0
      container       = jQuery 'container'
      container       = jQuery "<container style='display:block'></container>" if container.length is 0
      gcolumn.append container
      #.....................................................................................................
      until is_finished
        trial_count    += +1
        good_slug_html  = slug_html
        line_nr         = html_lines.length + 1
        [ slice_hotml
          slug_html
          line_count
          excess      ] = try_slug container, block_hotml, line_nr, start_idx, stop_idx
        #...................................................................................................
        if stop_idx >= last_start_idx
          warn '2', "stop_idx > last_start_idx"
          excesses.push   excess
          slices.push     slice_hotml
          html_lines.push slug_html
          is_finished = yes
          continue
        #...................................................................................................
        if line_count > 1
          if trial_count is 1
            throw new Error "not yet implemented"
          excesses.push   excess
          slices.push     slice_hotml
          html_lines.push good_slug_html
          start_idx = stop_idx
          stop_idx  = start_idx - 1
        #...................................................................................................
        stop_idx     += +1
        #...................................................................................................
        if start_idx >= last_start_idx
          throw new Error "not yet implemented"
      #.....................................................................................................
      excess              = excesses[ excesses.length - 1 ]
      new_class           = if slices.length is 1 then 'single' else 'last'
      last_line_hotml     = slices[ slices.length - 1 ]
      last_line_block_tag = last_line_hotml[ 0 ][ 0 ][ 0 ]
      HOTMETAL.TAG.remove_class  last_line_block_tag, 'middle'
      HOTMETAL.TAG.remove_class  last_line_block_tag, 'first'
      HOTMETAL.TAG.add_class     last_line_block_tag, new_class
      HOTMETAL.TAG.add_class     last_line_block_tag, 'excess' if excess > 0
      last_line_html                      = HOTMETAL.as_html last_line_hotml
      html_lines[ html_lines.length - 1 ] = last_line_html
      #.....................................................................................................
      container.empty()
      send html_lines
    .pipe D.$show()
    #.......................................................................................................
    .pipe $ ( html_lines, send ) =>
      # ### According to http://stackoverflow.com/a/8840703/256361, the below *should* trigger a repaint /
      # reflow: ###
      # ( jQuery 'body' ).hide().show 0
      whisper html_line for html_line in html_lines
      target_column.append html_line for html_line in html_lines
      send html_lines
  #.........................................................................................................
    .pipe D.$on_end ->
      for [ description, dt, ] in XXX_times
        debug '©1enOB', description, ( dt / 1000 ).toFixed 3
      handler()
  #.........................................................................................................
  input.write md
  input.end()

#===========================================================================================================
#
#-----------------------------------------------------------------------------------------------------------
@demo_v1 = ( app, md, settings, handler ) ->
  debug '©E054j', 'demo'
  switch arity = arguments.length
    when 3
      handler   = settings
      settings  = {}
    when 4
      null
    else
      throw new Error " expected 3 or 4 arguments, got #{arity}"

  #---------------------------------------------------------------------------------------------------------
  switch format = settings[ 'format' ] ? 'md'
    when 'md'
      as_html = D.MD.$as_html()
    when 'html'
      as_html = D.$pass_through()
    else
      return handler new Error "unknown format #{rpr format}"
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

  # #---------------------------------------------------------------------------------------------------------
  # interpolator  = require 'linear-interpolator'
  # mm_by_rpx     = []
  # gauge         = jQuery "<div id='meter-gauge' style='position:absolute;'></div>"
  # ( jQuery 'body' ).append gauge
  # for d_mm in [ 1 .. 1000 ]
  #   gauge.css 'height', "#{d_mm}mm"
  #   d_rpx = gauge[ 0 ].getBoundingClientRect()[ 'height' ]
  #   # d_rpx = BD.get_rectangle gauge, 'height'
  #   # d_rpx = gauge.height()
  #   mm_by_rpx.push [ d_rpx, d_mm, ]
  # debug '©bQ2EU', "collected #{mm_by_rpx.length} points for length interpolation"
  # interpolate = interpolator mm_by_rpx
  # mm_from_rpx = ( d ) -> ( Math.round 10 * interpolate d ) / 10
  # for d_npx in [ 1 .. 100 ]
  #   gauge.css 'height', "#{d_npx}px"
  #   d_rpx = gauge[ 0 ].getBoundingClientRect()[ 'height' ]
  #   # d_rpx = BD.get_rectangle gauge, 'height'
  #   urge d_npx, d_rpx
  # # gauge.detach()
  # return # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  # rpx_from_mm
  # urge "how many nominal pixels per real pixels (rho) at different box sizes"
  # for d_npx in [ 1 .. 20 ] by 1
  #   gauge.css 'height', "#{d_npx}px"
  #   d_rpx = BD.get_rectangle gauge, 'height'
  #   urge "#{d_npx}\t#{d_npx / d_rpx}"

  #---------------------------------------------------------------------------------------------------------
  mm_from_rpx = ( d ) -> MKTS.GAUGE.mm_from_rpx app, d
  mm_from_npx = ( d ) -> MKTS.GAUGE.mm_from_npx app, d
  rpx_from_mm = ( d ) -> MKTS.GAUGE.rpx_from_mm app, d
  npx_from_mm = ( d ) -> MKTS.GAUGE.npx_from_mm app, d
  ƒ           = ( x, precision = 2 ) -> x.toFixed precision

  #---------------------------------------------------------------------------------------------------------
  live                = yes
  live                = no
  # mark_chrs           = no
  mark_chrs           = yes
  mark_lines          = no
  t0                  = +new Date()
  #.........................................................................................................
  input
    #.......................................................................................................
    # .pipe D.TYPO.$quotes()
    # .pipe D.TYPO.$dashes()
    .pipe as_html
    # #.......................................................................................................
    # .pipe $ ( html, send ) =>
    #   ### TAINT adhoc method to avoid wrapping `<kwic-lineup>` tags inside a `<p>` ###
    #   send html.replace /^\s*<p>(.*)<\/p>\s*$/, '$1'
    #.......................................................................................................
    .pipe do =>
      ### TAINT temporary fix for CJK Ext. B-related bug; see
      https://productforums.google.com/forum/#!category-topic/chrome/report-a-problem-and-get-troubleshooting-help/mac/Stable/_bLJl0pNS4Y
      Regex matches CJK Ext. B codepoints; constructed using http://apps.timwhitlock.info/js/regex.
      Also see https://github.com/mathiasbynens/regenerate.
      ###
      matcher = /([\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\udede]+)/g
      return $ ( html, send ) =>
        send html.replace matcher, '<cjkxbfix>$1</cjkxbfix>'
    #.......................................................................................................
    .pipe D.HTML.$split disperse: yes, hyphenation: yes, whitespace: no, chrs: yes
    #.......................................................................................................
    .pipe do =>
      ### character replacements ###
      return $ ( tags_and_chrs, send ) =>
        for element_idx in [ 1 ... tags_and_chrs.length ] by +2
          text_element = tags_and_chrs[ element_idx ]
          for chr, chr_idx in text_element
            text_element[ chr_idx ] = glyph_replacements[ chr ] ? chr
        send tags_and_chrs
    #.......................................................................................................
    .pipe $ ( tags_and_chrs, send ) =>
      send ( ( if idx % 2 then ( e.join '' ) else e ) for e, idx in tags_and_chrs ).join ''
    .pipe D.$show()
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
        ( blocks.find '.line-counter' ).attr 'id', ( idx ) -> "mkts-lc-#{idx}"
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
        debug '©4QfDG', "typesetting #{blocks.length} blocks into galley..."
        #...................................................................................................
        for block_idx in [ 0 ... blocks.length ]
          block             =        blocks.eq block_idx
          line_counter      = line_counters.eq block_idx
          client_rectangles = ( line_counter.get 0 ).getClientRects()
          line_count        = client_rectangles.length
          height_px         = BD.get_rectangle block, 'height'
          # height_px         = block.height()
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
        debug '©4QfDG', "...done"
        send block_infos
    #.......................................................................................................
    .pipe do =>
      return $ ( block_infos, send, end ) =>
        #...................................................................................................
        if block_infos?
          MKTS.VIEW.show_pages()
          { caret }           = matter
          pages               = jQuery 'artboard.pages page'
          page                = null
          columns             = null
          column_count        = null
          column              = null
          target_height_px    = null
          current_line_count  = null
          #...................................................................................................
          ### Move to target ###
          # yield MKTS.VIEW.show_galley resume
          for block_info, block_idx in block_infos
            page               ?= pages.eq caret[ 'page-nr' ] - 1
            columns            ?= page.find 'column'
            column_count       ?= columns.length
            if column_count < 1
              warn "skipped #{block_infos.length - block_idx} blocks because of missing columns"
              break
            column             ?= columns.eq caret[ 'column-nr' ] - 1
            current_line_count ?= 0
            target_height_px ?= BD.get_rectangle column, 'height'
            height_nmm        = current_line_count * 5
            height_rmm        = mm_from_rpx caret[ 'y.px' ]
            #.................................................................................................
            current_line_count += block_info[ 'line-count' ]
            block               = block_info[ '%block' ]
            block_height_px     = block_info[ 'height.px' ]
            #.................................................................................................
            column.append block
            #.................................................................................................
            caret[ 'y.px' ]    += block_height_px
            #.................................................................................................
            continue if caret[ 'y.px' ] < target_height_px
            #.................................................................................................
            caret[ 'column-nr' ] += +1
            caret[ 'y.px'      ]  = 0
            column                = null
            current_line_count    = null
            urge '©08Nsv', MKTS.CARET.as_url app, matter
            #.................................................................................................
            if caret[ 'column-nr' ] > column_count
              page                  = null
              columns               = null
              column_count          = null
              target_height_px      = null
              caret[ 'column-nr' ]  = 1
              caret[ 'page-nr'   ] += +1
              caret[ 'y.px'      ]  = 0
              help '©l4U89', MKTS.CARET.as_url app, matter
        #...................................................................................................
        if end?
          # help "spent #{dt}ms doing `column.append block` etc"
          end()
          handler null

          # t_A_0 = now()            # +++++++++++++++++++++++++++++++++++++++
          # dt_A = 0                 # +++++++++++++++++++++++++++++++++++++++
          # dt_B = 0                 # +++++++++++++++++++++++++++++++++++++++
          # t_A_1 = now()            # +++++++++++++++++++++++++++++++++++++++
          # dt_A += t_A_1 - t_A_0    # +++++++++++++++++++++++++++++++++++++++
          # t_B_0 = now()            # +++++++++++++++++++++++++++++++++++++++
          # t_B_1 = now()            # +++++++++++++++++++++++++++++++++++++++
          # dt_B += t_B_1 - t_B_0    # +++++++++++++++++++++++++++++++++++++++
          # help "dt_A: #{ƒ dt_A}ms" # +++++++++++++++++++++++++++++++++++++++
          # help "dt_B: #{ƒ dt_B}ms" # +++++++++++++++++++++++++++++++++++++++

    # #.......................................................................................................
    # .pipe do =>
    #   return $ ( block_infos, send ) =>
    #     #...................................................................................................
    #     MKTS.VIEW.show_pages()
    #     { caret }          = matter
    #     pages             = jQuery 'artboard.pages page'
    #     page              = pages.eq caret[ 'page-nr' ] - 1
    #     columns           = page.find 'column'
    #     column_count      = columns.length
    #     column            = columns.eq caret[ 'column-nr' ] - 1
    #     ### TAINT use BLAIDDDRWG ###
    #     target_height_px  = ( column.get 0 ).getBoundingClientRect()[ 'height' ]
    #     #...................................................................................................
    #     ### Move to target ###
    #     # yield MKTS.VIEW.show_galley resume
    #     for block_info in block_infos
    #       block           = block_info[ '%block' ]
    #       block_height_px = block_info[ 'height.px' ]
    #       column.append block
    #       caret[ 'y.px' ] += block_height_px
    #       debug '©08Nsv', MKTS.CARET.as_url app, matter
    #       #.................................................................................................
    #       continue if caret[ 'y.px' ] < target_height_px
    #       caret[ 'column-nr' ] += +1
    #       #.................................................................................................
    #       if caret[ 'column-nr' ] > column_count
    #         debug '©l4U89', MKTS.CARET.as_url app, matter
    #         caret[ 'column-nr' ]   = 1
    #         caret[ 'page-nr'   ]  += +1
    #         caret[ 'y.px'      ]   = 0
    #         ### TAINT code duplication ###
    #         page                  = pages.eq caret[ 'page-nr' ] - 1
    #         columns               = page.find 'column'
    #         column_count          = columns.length
    #       #.................................................................................................
    #       column            = columns.eq caret[ 'column-nr' ] - 1
    #       ### TAINT use BLAIDDDRWG ###
    #       target_height_px  = ( column.get 0 ).getBoundingClientRect()[ 'height' ]



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



