

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
  jQuery              = app[ 'jQuery' ]
  MKTS                = app[ 'MKTS'   ]
  window              = app[ 'window' ]
  document            = window[ 'document' ]
  # BD                  = window[ 'BD'  ]
  gcolumn             = ( jQuery 'galley column' ).eq 0
  gcolumn_offset      = gcolumn.offset()
  gcolumn_left        = gcolumn_offset[ 'left' ]
  gcolumn_top         = gcolumn_offset[ 'top'  ]
  zoomer              = jQuery 'zoomer'
  # zoomer_offset       = zoomer.offset()
  # zoomer_left         = zoomer_offset[ 'left' ]
  # zoomer_top          = zoomer_offset[ 'top'  ]

  #---------------------------------------------------------------------------------------------------------
  mm_from_px          = ( px ) -> px * app[ 'mm-per-px' ]
  ƒ                   = ( x, precision = 0 ) -> x.toFixed precision

  #---------------------------------------------------------------------------------------------------------
  input               = D.create_throughstream()
  live                = yes
  live                = no
  t0                  = +new Date()
  t1_a                = null
  block_idx           = -1
  line_idx            = -1
  mark_chrs           = yes
  mark_chrs           = no
  t0                  = +new Date()
  #.........................................................................................................
  input
    #.......................................................................................................
    # .pipe D.TYPO.$quotes()
    # .pipe D.TYPO.$dashes()
    .pipe D.MD.$as_html()
    .pipe D.HTML.$parse disperse: yes, hyphenation: yes, whitespace: no, chrs: no
    # .pipe D.HTML.$parse disperse: yes, hyphenation: yes, whitespace: no, chrs: yes
    .pipe $ ( data, send ) -> debug '©x-1'; send data
    .pipe D.HTML.$slice_toplevel_tags()
    .pipe $ ( data, send ) -> debug '©x-2'; send data
    # .pipe D.$show()
    #.......................................................................................................
    .pipe do =>
      return $ ( block_hotml, send, end ) =>
        t1                  = +new Date()
        debug '©x-3', ƒ ( t1 - t0 ) # / 1000
        #...................................................................................................
        if block_hotml?
          block_idx          += +1
          block_chr_idx       = 0
          lines               = []
          line_start_idx      = 0
          # line_stop_idx       = 0
          block_html          = HOTMETAL.as_html block_hotml, no
          block               = jQuery block_html
          gcolumn.append block
          text_nodes          = block.text_nodes()
          last_left           = null
          last_top            = null
          #.................................................................................................
          for node_idx in [ 0 ... text_nodes.length ]
            node        = text_nodes.eq node_idx
            node_dom    = node.get 0
            range       = document.createRange()
            chr_idx     = 0
            text        = node.text()
            left_0      = null
            top_0       = null
            #...............................................................................................
            while chr_idx < text.length
              range.setStart node_dom, chr_idx
              chr_idx        += if ( text.codePointAt chr_idx ) > 0xffff then +2 else +1
              range.setEnd node_dom, chr_idx
              block_chr_idx  += +1
              { bottom, height, left, right, top, width } = range.getBoundingClientRect()
              # { left, top, width } = range.getBoundingClientRect()
              rectangles = range.getClientRects()
              # debug '©rriqu', ( rpr range.toString() ), ( ƒ left ), ( ƒ top ), ( ([ ( ƒ r.left ), ( ƒ r.top ) ].join ',' ) for r in rectangles ).join ' '
              #.............................................................................................
              ### Collapsing characters (combining diacritics, trailing whitespace) has a position and
              a size of zero in both dimensions; we always treat such characters as belonging to the
              current line: ###
              if left is top is width is 0
                continue
                # line_stop_idx = block_chr_idx
              #.............................................................................................
              ### If `left_0` isn't yet set, make the current dimension the reference point: ###
              unless left_0?
                line_idx += +1
                left_0    = left
                top_0     = top
              #.............................................................................................
              ### Naive guess: when `left` has decreased and `top` has increased, a new line has
              started. NB this definitely won't work with right-to-left and bottom-to-top directions. ###
              if last_left?
                if left < last_left and top > last_top
                  # line_stop_idx = block_chr_idx
                  lines.push [ line_start_idx, block_chr_idx - 1, ]
                  # debug '©HyM09', lines.length
                  line_start_idx = block_chr_idx - 1
              #.............................................................................................
              last_left = left
              last_top  = top
              #.............................................................................................
              if mark_chrs
                zleft = left - gcolumn_left
                ztop  = top  - gcolumn_top
                gcolumn.append jQuery """<div style='position:absolute;left:#{zleft}px;top:#{ztop}px;width:#{width}px;height:#{height}px;outline:1px solid rgba(255,0,0,0.25);'></div>"""
          #.................................................................................................
          if block_chr_idx > line_start_idx
            lines.push [ line_start_idx, block_chr_idx, ]
          #.................................................................................................
          for entry, line_idx in lines
            [ line_start_idx
              line_stop_idx   ] = entry
            # line_hotml          = HOTMETAL.slice block_hotml, line_start_idx, line_stop_idx
            # entry.push line_hotml
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
        #...................................................................................................
        if end?
          window.lines = lines
          # for line in lines
          #   window.console.log line#.extractContents()
  #.........................................................................................................
  input.write md
  input.end()



