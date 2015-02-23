

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
# #...........................................................................................................
# suspend                   = require 'coffeenode-suspend'
# step                      = suspend.step
# after                     = suspend.after
# sleep                     = suspend.sleep
#...........................................................................................................
D                         = require 'pipedreams2'
D$                        = D.remit.bind D
# LODASH                    = D.LODASH
HOTMETAL                  = D.HOTMETAL



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
@demo = ( app, md ) ->
  #.........................................................................................................
  jQuery              = app[ 'jQuery' ]
  container           = jQuery '.flex-columns-wrap'
  columns             = container.find '.column'
  # for idx in [0,1,2]
  #   debug '©9DN9H', ( columns.eq idx ).outerHTML()
  column_count        = columns.length
  saved_lines         = []

  #---------------------------------------------------------------------------------------------------------
  has_hanging_margin = ( hotml ) ->
    # debug '©mnhYJ',  ( CND.last_of ( CND.last_of hotml )[ 1 ] ), ( CND.last_of ( CND.last_of hotml )[ 1 ] ) in [ '\u00ad', '-', ',', '.', '!', '—', '–', ':', ]
    last_chr = CND.last_of ( CND.last_of hotml )[ 1 ].replace /\s+$/, ''
    return last_chr in [ '\u00ad', '-', ',', '.', '!', '—', '–', ':', ]

  #---------------------------------------------------------------------------------------------------------
  get_class = ( is_first, is_last ) ->
    if is_first
      return 'is-lone' if is_last
      return 'is-first'
    return 'is-last' if is_last
    return 'is-middle'

  #---------------------------------------------------------------------------------------------------------
  get_line = ( hotml, is_first, is_last ) ->
    R = jQuery HOTMETAL.as_html hotml
    R.addClass get_class is_first, is_last
    R.addClass ' hangs-right-05ex' if has_hanging_margin hotml
    return R

  #---------------------------------------------------------------------------------------------------------
  test_line = ( hotml, is_first, is_last ) ->
    ### Must return whether HTML fits into one line. ###
    line            = get_line hotml, is_first, is_last
    left_cork       = jQuery "<span class='cork'></span>"
    right_cork      = jQuery "<span class='cork'></span>"
    line.prepend     left_cork
    line.append      right_cork
    ( columns.eq 0 ).append line
    R               = left_cork.offset()[ 'top' ] == right_cork.offset()[ 'top' ]
    line.detach()
    return R

  #---------------------------------------------------------------------------------------------------------
  save_line = ( hotml, is_first, is_last ) ->
    saved_lines.push get_line hotml, is_first, is_last
    return null

  #---------------------------------------------------------------------------------------------------------
  set_lines = ->
    line_count        = saved_lines.length
    column_linecounts = HOTMETAL.get_column_linecounts 'even', line_count, 3
    help "line count: #{line_count}"
    help "column line counts: #{column_linecounts}"
    #.......................................................................................................
    ### TAINT simplify ###
    count = 0
    for column_linecount, column_idx in column_linecounts
      column = columns.eq column_idx
      for line in saved_lines[ count ... count + column_linecount ]
        column.append line
      count += column_linecount
    #.......................................................................................................
    return null

  #---------------------------------------------------------------------------------------------------------
  input = D.create_throughstream()
  #.........................................................................................................
  input
    .pipe D.MD.$as_html()
    .pipe D.TYPO.$quotes()
    .pipe D.TYPO.$dashes()
    .pipe D.HTML.$parse()
    .pipe D.HTML.$slice_toplevel_tags()
    # #.......................................................................................................
    # .pipe D$ ( data, send, end ) =>
    #   if data?
    #     urge data
    #     send data
    #   if end?
    #     warn 'ended'
    #     end()
    #.......................................................................................................
    .pipe D$ ( block_hotml, send ) =>
      # urge HOTMETAL.as_html block_hotml
      send block_hotml
    #.......................................................................................................
    .pipe do =>
      line_count = 0
      # step ( resume ) =>
      # yield MKTS.wait resume
      return D$ ( block_hotml, send, end ) =>
        if block_hotml?
          HOTMETAL.break_lines block_hotml, test_line, save_line
          send block_hotml
        if end?
          set_lines()
          warn 'ended'
  #.........................................................................................................
  input.write md
  input.end()

