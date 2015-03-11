

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

#===========================================================================================================
#
#-----------------------------------------------------------------------------------------------------------
@experimental_line_metrics = ->
  #---------------------------------------------------------------------------------------------------------
  save_line = ( hotml, is_first, is_last ) =>
    ### Inserts text line into document ###
    #.......................................................................................................
    for chunk, chunk_idx in hotml
      [ open_tags, text, close_tags, ] = chunk
      continue if text[ 0 ] is '<'
      is_last_chunk = chunk_idx >= hotml.length - 1
      text          = text.replace /^(\s+)/, """<span class='mkts-lws'>$1</span>""" unless chunk_idx is 0
      text          = text.replace /(\s+)$/, """<span class='mkts-lws'>$1</span>""" unless is_last_chunk
      ### TAINT not a good implementation ###
      if ( text.indexOf """<span class='mkts-lws'>""" ) is -1
        text = """<span class='mkts-material'>#{text}</span>"""
      chunk[ 1 ]    = text
    #.......................................................................................................
    line            = get_line hotml, is_first, is_last
    container.append  line
    #.......................................................................................................
    ###
    http://stackoverflow.com/a/16072668/256361:
    ( ( lws.get idx ).getBoundingClientRect().width for idx in [ 0 .. lws.length - 1 ] )
    http://stackoverflow.com/a/16072449/256361:
    window.getComputedStyle(element).width
    ###
    #.......................................................................................................
    line_width_px     = line.width()
    lws               = line.find '.mkts-lws'
    debug()
    debug '©RwY5D', line.text()
    if lws.length > 0
      lws_width_px      = 0
      lws_width_px     += ( lws.eq idx ).width() for idx in [ 0 .. lws.length - 1 ]
      lws_width_px_avg  = lws_width_px / lws.length
      avg_lws_ratio_pc  = a = lws_width_px_avg / line_width_px * 100
      color             = if a < 10 then 'green' else ( if a < 20 then 'orange' else 'red' )
      # lws_width_mm      = lws_width_px  * app[ 'mm-per-px' ]
      # line_width_mm     = line.width()  * app[ 'mm-per-px' ]
      # debug '©sHu8j', ( ( lws.eq idx ).width() for idx in [ 0 .. lws.length - 1 ] )
      # debug '©VTLl9', ( ( line_width_mm ).toFixed 1 ), ( ( lws_width_mm ).toFixed 1 )
      # debug 'Ratio of all     inter-word spaces to column width:', ( ( lws_width_px     / line_width_px * 100 ).toFixed 1 ) + '% '
      debug 'Ratio of average inter word spaces to column width:', ( avg_lws_ratio_pc.toFixed 1 ) + '% ', CND[ color ] '█'
    else
      material          = line.find '.mkts-material'
      if material.length is 0
        warn "no LWS, no material found for line #{rpr line.outerHTML()}"
      else
        material_width_px = material.width()
        # debug '©zOqsw', material_width_px
        material_ratio_pc = material_width_px / line_width_px * 100 - 100
        a                 = Math.abs material_ratio_pc
        color             = if a < 10 then 'green' else ( if a < 20 then 'orange' else 'red' )
        debug 'Ratio of material                  to column width:', ( material_ratio_pc.toFixed 1 ) + '% ', CND[ color ] '█'
    #.......................................................................................................
    return null


#===========================================================================================================
#
#-----------------------------------------------------------------------------------------------------------
@demo_1 = ( app, md, handler ) ->
  #.........................................................................................................
  jQuery              = app[ 'jQuery' ]
  MKTS                = app[ 'MKTS'   ]
  window              = app[ 'window' ]
  BD                  = window[ 'BD'  ]
  page                = ( jQuery 'page' ).eq 0
  container           = ( jQuery 'wrap' ).eq 0
  # columns             = container.find 'column'
  columns             = jQuery 'column'
  column_count        = columns.length
  seen_lines          = null
  # last_line_height    = null

  #---------------------------------------------------------------------------------------------------------
  mm_from_px  = ( px ) -> px * app[ 'mm-per-px' ]
  ƒ           = ( x, precision = 2 ) -> x.toFixed precision

  line_count                = 0
  available_height          = BD.height_of  container
  available_width           = BD.width_of   ( container.find 'column' ).eq 0
  available_width_mm        = mm_from_px available_width
  column_idx                = 0
  has_warned                = no
  column_linecount          = 0

  #---------------------------------------------------------------------------------------------------------
  new_line_entry = ( line, height ) ->
    R =
      '%self':    line
      'height':   height
    return R

  #---------------------------------------------------------------------------------------------------------
  has_hanging_margin = ( hotml ) ->
    # debug '©mnhYJ',  ( CND.last_of ( CND.last_of hotml )[ 1 ] ), ( CND.last_of ( CND.last_of hotml )[ 1 ] ) in [ '\u00ad', '-', ',', '.', '!', '—', '–', ':', ]
    last_chr = CND.last_of ( CND.last_of hotml )[ 1 ].replace /\s+$/, ''
    return last_chr in [ '\u00ad', '-', ',', '.', '!', '—', '–', ':', ';', '(', ')', '‘', '’', '“', '”', ]

  #---------------------------------------------------------------------------------------------------------
  get_class = ( is_first, is_last ) ->
    if is_first
      return 'is-lone' if is_last
      return 'is-first'
    return 'is-last' if is_last
    return 'is-middle'

  # #---------------------------------------------------------------------------------------------------------
  # get_line = ( hotml, is_first, is_last ) ->
  #   wrapping_tag = hotml[ 0 ][ 0 ][ 0 ]
  #   if wrapping_tag?
  #     HOTMETAL.TAG.add_class wrapping_tag, get_class is_first, is_last
  #     HOTMETAL.TAG.add_class wrapping_tag, 'hangs-right-05ex' if has_hanging_margin hotml
  #   R = jQuery HOTMETAL.as_html hotml
  #   return R

  cache_hits = 0
  cache_misses = 0
  #---------------------------------------------------------------------------------------------------------
  get_line = ( hotml, is_first, is_last ) ->
    ### TAINT corks not always needed ###
    if ( seen_lines.get hotml )?
      cache_hits += 1
    else cache_misses += 1
    return ( R = seen_lines.get hotml ) if R?
    line              = jQuery HOTMETAL.as_html hotml
    line.addClass get_class is_first, is_last
    width_mm          = available_width_mm
    ### TAINT shouldn't use absolute length here; depends on font size, hanging character ###
    width_mm         += +1 if has_hanging_margin hotml
    line.css 'width', "#{width_mm}mm"
    line.wrapInner jQuery "<span class='text-wrapper'></span>"
    left_cork         = jQuery "<span class='cork'></span>"
    right_cork        = jQuery "<span class='cork'></span>"
    R                 = [ left_cork, line, right_cork, ]
    line.prepend  left_cork
    line.append  right_cork
    seen_lines.set hotml, R
    return R

  #---------------------------------------------------------------------------------------------------------
  test_line = ( action, hotml, is_first, is_last ) ->
    ### Must return whether HTML fits into one line. ###
    ### TAINT consider using `scrollHeight`, but must keep state ###
    # return save_line hotml, is_first, is_last, line_idx if action is 'set'
    switch action
      #.....................................................................................................
      when 'set'
        if column_idx <= column_count - 1
          [ _, line, _, ]   = get_line hotml, is_first, is_last
          line.removeClass 'test' if ( ( line.attr 'class' ).indexOf 'test' ) > 0
          top_css           = "#{column_linecount * 5}mm"
          line.css 'top',     top_css
          column_linecount += +1
          # ( line.find '.cork' ).detach()
          ( columns.eq column_idx ).append line
          bottom = BD.relative_bottom_of ( line.find '.text-wrapper' ), 'wrap', 0
          # bottom = BD.relative_bottom_of ( line.find '.text-wrapper' ), 'wrap'
          #.................................................................................................
          if available_height - bottom < 0
            line.detach()
            column_idx += +1
            #...............................................................................................
            if column_idx > column_count - 1
              warn "next page" unless has_warned
              has_warned = true
            #...............................................................................................
            else
              column_linecount  = 0
              top               = "#{column_linecount * 5}mm"
              line.css 'top', top
              ( columns.eq column_idx ).append line
              column_linecount += +1
        line_count += +1                             # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      #.....................................................................................................
      when 'test'
        process.stdout.write '.'
        [ left_cork
          line
          right_cork ]    = get_line hotml, is_first, is_last
        line.addClass 'test'
        ( columns.eq 0 ).append line
        debug '©jqFbR', ( line.outerHTML() ), XCSS.rules_from_node app, line
        R                 = ( BD.top_of left_cork, 0 ) == ( BD.top_of right_cork, 0 )
        line.detach()
        return R
      #.....................................................................................................
      else
        throw new Error "unknown action #{rpr action}"

  #---------------------------------------------------------------------------------------------------------
  distribute_lines = ->
    page_height         = BD.height_of page
    column_line_height  = 0
    total_line_height   = 0
    column_idx          = 0
    column_linecounts   = [ 0, 0, 0, ]
    #.......................................................................................................
    R =
      '~isa':               'LINESETTER/line-distribution'
      'column-linecounts':  column_linecounts
      'page-count':         1
      'distributions':      []
    #.......................................................................................................
    for line_entry, line_idx in saved_lines
      line        = line_entry[ '%self' ]
      line_height = line_entry[ 'height' ]
      if column_idx is 0
        debug '©LDasJ', line_idx + 1, ( line_height ), ( column_line_height + line_height ), ( page_height - column_line_height - line_height ), line.text()
        # debug '©LDasJ', line_idx + 1, ( mm_from_px line_height ), ( mm_from_px column_line_height + line_height ), ( mm_from_px page_height - column_line_height - line_height )
      if column_line_height + line_height > page_height
        column_line_height = 0
        if column_idx < column_count - 1
          column_idx         += 1
          column_line_height  = 0
        else
          R[ 'page-count' ]  += +1
      else
        column_linecounts[ column_idx ]  += +1
        total_line_height                += line_height
        column_line_height               += line_height
    #.......................................................................................................
    return R

  # #---------------------------------------------------------------------------------------------------------
  # set_lines = ( live = no, handler ) ->
  #   return handler null
  #   step ( resume ) =>
  #     ### TAINT assuming we have an entire blank page ###
  #     # help distribute_lines()
  #     #.....................................................................................................
  #     line_count        = saved_lines.length
  #     column_linecounts = HOTMETAL.get_column_linecounts 'even', line_count, 3
  #     help "line count: #{line_count}"
  #     help "column line counts: #{column_linecounts}"
  #     #.....................................................................................................
  #     ### TAINT simplify ###
  #     count = 0
  #     for column_linecount, column_idx in column_linecounts
  #       column = columns.eq column_idx
  #       for line_entry in saved_lines[ count ... count + column_linecount ]
  #         line = line_entry[ '%self' ]
  #         if live
  #           yield MKTS.wait resume
  #         column.append line
  #       count += column_linecount
  #     handler null
  #   #.......................................................................................................
  #   return null

  #---------------------------------------------------------------------------------------------------------
  input   = D.create_throughstream()
  live    = yes
  live    = no
  t0      = +new Date()
  t1_a    = null
  #.........................................................................................................
  input
    #.......................................................................................................
    # .pipe D.TYPO.$quotes()
    # .pipe D.TYPO.$dashes()
    .pipe D.MD.$as_html()
    .pipe D.HTML.$parse yes, yes
    .pipe D.HTML.$slice_toplevel_tags()
    #.......................................................................................................
    .pipe $ ( data, send ) =>
        t1_a ?= +new Date()
        send data if data?
    # #.......................................................................................................
    # .pipe do =>
    #   shreds      = {}
    #   shred_count = 0
    #   return $ ( block_hotml, send, end ) =>
    #     if block_hotml?
    #       for [ _, shred, _, ] in block_hotml
    #         shred_count      += +1
    #         target            = shreds[ shred ]?= {}
    #         target[ 'count' ] = ( target[ 'count' ] ? 0 ) + 1
    #       send block_hotml
    #     if end?
    #       urge shreds
    #       urge shred_count
    #       urge ( Object.keys shreds ).length
    #       end()
    #.......................................................................................................
    .pipe do =>
      return $ ( block_hotml, send ) =>
        if block_hotml?
          help HOTMETAL.as_html block_hotml
          send block_hotml
    #.......................................................................................................
    .pipe do =>
      line_count = 0
      return $ ( block_hotml, send, end ) =>
        # step ( resume ) =>
        if block_hotml?
          seen_lines = new WeakMap()
          ### TAINT `break_lines` is a misnomer; the method is a 'director' method to find good lines
          in typesetting. ###
          HOTMETAL.break_lines block_hotml, test_line
          send block_hotml
        if end?
          # yield set_lines live, resume
          warn 'ended'
          t1    = +new Date()
          dt    = t1   - t0
          dt_a  = t1_a - t0
          help "demo took #{ƒ dt / 1000}s"
          help "(#{ƒ dt_a / 1000}s before point 'a')"
          debug '©hsgjo', "cache_hits", cache_hits
          debug '©hsgjo', "cache_misses", cache_misses
          handler null
          end()
  #.........................................................................................................
  input.write md
  input.end()



#===========================================================================================================
#
#-----------------------------------------------------------------------------------------------------------
@demo = ( app, md, handler ) ->

  #---------------------------------------------------------------------------------------------------------
  jQuery              = app[ 'jQuery' ]
  MKTS                = app[ 'MKTS'   ]
  window              = app[ 'window' ]
  BD                  = window[ 'BD'  ]
  page                = ( jQuery 'page' ).eq 0
  container           = ( jQuery 'wrap' ).eq 0
  # columns             = container.find 'column'
  columns             = jQuery 'galley column'
  # column_count        = columns.length
  # seen_lines          = null
  # # last_line_height    = null

  #---------------------------------------------------------------------------------------------------------
  mm_from_px  = ( px ) -> px * app[ 'mm-per-px' ]
  ƒ           = ( x, precision = 2 ) -> x.toFixed precision

  # line_count                = 0
  # available_height          = BD.height_of  container
  # available_width           = BD.width_of   ( container.find 'column' ).eq 0
  # available_width_mm        = mm_from_px available_width
  # column_idx                = 0
  # has_warned                = no
  # column_linecount          = 0

  #---------------------------------------------------------------------------------------------------------
  input         = D.create_throughstream()
  live          = yes
  live          = no
  t0            = +new Date()
  t1_a          = null
  disperse      = yes
  hyphenation   = yes
  whitespace    = no
  #.........................................................................................................
  input
    #.......................................................................................................
    # .pipe D.TYPO.$quotes()
    # .pipe D.TYPO.$dashes()
    .pipe D.MD.$as_html()
    .pipe D.HTML.$parse disperse, hyphenation, whitespace
    .pipe D.HTML.$slice_toplevel_tags()
    # #.......................................................................................................
    # .pipe $ ( block_hotml, send ) =>
    #   for element, idx in block_hotml
    #     ### TAINT use library method ###
    #     element[ 0 ].push     [ 'span', { class: 'shred', }, ]
    #     element[ 2 ].unshift  [ 'span', ]
    #   #.....................................................................................................
    #   send block_hotml
    # #.......................................................................................................
    # .pipe $ ( block_hotml, send ) =>
    #   ### insert corks ###
    #   for idx in [ block_hotml.length - 1 .. 1 ] by -1
    #     this_element      = block_hotml[ idx     ]
    #     previous_element  = block_hotml[ idx - 1 ]
    #     #...................................................................................................
    #     if CND.isa_text this_text = this_element[ 1 ]
    #       if CND.isa_text previous_text = previous_element[ 1 ]
    #         if previous_text[ previous_text.length - 1 ] is '\u00ad'
    #           previous_element[ 1 ] = previous_text[ ... previous_text.length - 1 ]
    #           # if /[\ud800-\udbff]/.test this_text[ 0 ]
    #           if ( this_text.codePointAt 0 ) > 0xffff
    #             min_length = 2
    #           else
    #             min_length = 1
    #           ### TAINT tags around hyphenated text will not work correctly (?) ###
    #           if this_text.length > min_length
    #             text_0 = '\u00ad' + this_text[ ... min_length ]
    #             text_1 = this_text[ min_length .. ]
    #             block_hotml.splice idx + 1, 0, [ [], text_1, [], ]
    #             block_hotml.splice idx + 1, 0, [ [ [ 'cork', { class: 'hyphen', }, ], ], '', [ 'cork', ], ]
    #             # block_hotml.splice idx + 1, 0, [ [], text_0, [], ]
    #             this_element[ 1 ] = text_0
    #           else
    #             this_element[ 1 ] = '\u00ad' + this_text
    #     #...................................................................................................
    #     block_hotml.splice idx, 0, [ [ [ 'cork', {}, ], ], '', [ 'cork', ], ]
    #   #.....................................................................................................
    #   if block_hotml.length > 0
    #     block_hotml.splice 1, 0, [ [], block_hotml[ 0 ][ 1 ], block_hotml[ 0 ][ 2 ], ]
    #     block_hotml[ 0 ][ 0 ].push [ 'cork', {}, ]
    #     block_hotml[ 0 ][ 1 ] = ''
    #     block_hotml[ 0 ][ 2 ] = [ 'cork', ]
    #     idx = block_hotml.length - 1
    #     block_hotml[ idx ][ 2 ].unshift 'cork'
    #     block_hotml.push [ [ [ 'cork', {}, ], ], '', block_hotml[ idx ][ 2 ], ]
    #     block_hotml[ idx ][ 2 ] = []
    #   #.....................................................................................................
    #   send block_hotml
    #.......................................................................................................
    .pipe do =>
      ### insert shreds ###
      block_idx = -1
      return $ ( block_hotml, send ) =>
        block_idx += +1
        #...................................................................................................
        for shred, shred_idx in block_hotml
          [ open_tags, content, close_tags, ] = shred
          if ( CND.isa_text content ) and ( ( /^\s*$/ ).test content )
            attributes  = { 'class': 'ws', 'block-idx': block_idx, 'shred-idx': shred_idx, }
          else
            attributes = { 'block-idx': block_idx, 'shred-idx': shred_idx, }
          open_tags.push [ 'shred', attributes, ]
          close_tags.unshift 'shred'
        #.....................................................................................................
        send block_hotml
    #.......................................................................................................
    .pipe D.$show()
    .pipe do =>
      return $ ( block_hotml, send ) =>
        block_html = HOTMETAL.as_html block_hotml, no
        send [ block_hotml, block_html,]
        # debug '©gFRZM', html
    #.......................................................................................................
    # .pipe D.$throttle_items 5 / 1
    .pipe do =>
      cork_infos  = []
      block_idx   = -1
      return $ ( block, send, end ) =>
        # step ( resume ) =>
        #   yield MKTS.wait resume
          # yield sleep 0.5, resume
        if block?
          block_idx                    += +1
          [ block_hotml, block_html, ]  = block
          ( columns.eq 0 ).append jQuery block_html
          for [ opening_tags, ... ], element_idx in block_hotml
            continue if opening_tags.length is 0
            continue unless ( CND.last_of opening_tags )[ 0 ] is 'cork'
            cork_infos.push { block_idx, element_idx, }
        if end?
          # debug '©5eBb1', cork_infos
          corks       = ( columns.eq 0 ).find 'cork'
          last_left   = -Infinity
          last_top    = -Infinity
          line_nr     = 0
          for cork_idx in [ 0 ... corks.length ]
            cork_entry      = cork_infos[ cork_idx ]
            cork            = corks.eq cork_idx
            { left, top, }  = cork.position()
            # debug '©P620n', ƒ left
            ### TAINT this could be a small fractional number; also negative with hanging punctuation ###
            if left is 0
              cork.addClass 'first'
            if top > last_top
              line_nr += +1
            cork_entry[ 'left' ]      = left
            cork_entry[ 'top'  ]      = top
            cork_entry[ 'line_nr'  ]  = line_nr
            last_left                 = left
            last_top                  = top
          help "found #{line_nr} lines"
          # debug '©HA6TN', cork_infos
          warn 'ended'
          t1    = +new Date()
          dt    = t1   - t0
          dt_a  = t1_a - t0
          help "demo took #{ƒ dt / 1000}s"
          handler null
          end()
  #.........................................................................................................
  input.write md
  input.end()



