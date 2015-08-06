

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
BD                        = require './BLAIDDDRWG'
glyph_replacements        = require './glyph-replacements'
#...........................................................................................................
### https://github.com/meryn/performance-now ###
now                       = require 'performance-now'
#...........................................................................................................
### The module-globals become available when `demo` is called with `app` argument ###
jQuery                    = null
MKTS                      = null
window                    = null
document                  = null
app                       = null
#-----------------------------------------------------------------------------------------------------------
mm_from_rpx = ( d ) -> MKTS.GAUGE.mm_from_rpx app, d
mm_from_npx = ( d ) -> MKTS.GAUGE.mm_from_npx app, d
rpx_from_mm = ( d ) -> MKTS.GAUGE.rpx_from_mm app, d
npx_from_mm = ( d ) -> MKTS.GAUGE.npx_from_mm app, d
ƒ           = ( x, precision = 2 ) -> x.toFixed precision


#-----------------------------------------------------------------------------------------------------------
@_get_slugs_container = ( gcolumn ) ->
  R = jQuery 'container'
  if R.length is 0
    R = jQuery "<container style='display:block;width:100%;height:30mm;outline:1px solid red'></container>"
    gcolumn.append R
  return R


#===========================================================================================================
# BALANCED COLUMNS
#-----------------------------------------------------------------------------------------------------------
@get_column_linecounts = ( strategy, line_count, column_count ) ->
  ### thx to http://stackoverflow.com/a/1244369/256361 ###
  R   = []
  #.........................................................................................................
  switch strategy
    #.......................................................................................................
    when 'even'
      for col in [ 1 .. column_count ]
        R.push ( line_count + column_count - col ) // column_count
    #.......................................................................................................
    else
      throw new Error "unknown strategy #{rpr strategy}"
  #.........................................................................................................
  return R

#-----------------------------------------------------------------------------------------------------------
COLUMN = {}

#-----------------------------------------------------------------------------------------------------------
COLUMN.new_column = ( substrate, selector ) ->
  R =
    '~isa':         'LINESETTER/column'
    '%self':        substrate
    'lines':        lines = []
    'length':       0
  #.........................................................................................................
  if selector?
    elements = substrate.find selector
    lines.push ( elements.eq idx ) for idx in [ 0 ... elements.length ]
    R[ 'length' ] = elements.length
  #.........................................................................................................
  return R

#-----------------------------------------------------------------------------------------------------------
COLUMN.push = ( me, line ) ->
  line = jQuery line if CND.isa_text line
  me[ 'lines' ].push line
  me[ '%self' ].append line
  me[ 'length' ] = me[ 'lines' ].length
  return me

#-----------------------------------------------------------------------------------------------------------
COLUMN.pop = ( me ) ->
  throw new Error "unable to pop from empty list" if me[ 'length' ] < 1
  R = me[ 'lines' ].pop()
  R.detach()
  me[ 'length' ] = me[ 'lines' ].length
  return R

#-----------------------------------------------------------------------------------------------------------
COLUMN.insert = ( me, line, idx ) ->
  line = jQuery line if CND.isa_text line
  if idx?
    me[ 'lines' ].splice idx, 0, line
    me[ '%self' ][ idx ].before line
  else
    me[ 'lines' ].unshift line
    me[ '%self' ].prepend line
  me[ 'length' ] = me[ 'lines' ].length
  return me

#-----------------------------------------------------------------------------------------------------------
COLUMN.pull = ( me ) ->
  R = me[ '%lines' ].shift()
  R.detach()
  me[ 'length' ] = me[ 'lines' ].length
  return R

#-----------------------------------------------------------------------------------------------------------
COLUMN.pop_over = ( me, other, count = 1 ) ->
  if ( length = me[ 'length' ] ) < me[ 'length' ]
    throw new Error "unable to divide with count #{count} and length #{length}"
  other = @new_column substrate unless CND.isa other, 'LINESETTER/column'
  # for line, idx in me[ 'lines' ].splice length - count, count
  for _ in [ 1 .. count ]
    @insert other, @pop me
  return [ me, other, ]

#===========================================================================================================
#
#-----------------------------------------------------------------------------------------------------------
@try_slug = ( container, block_hotml, line_nr, start_idx, stop_idx ) =>
  slug_hotml                  = HOTMETAL.slice block_hotml, start_idx, stop_idx + 1
  block_tag                   = slug_hotml[ 0 ][ 0 ][ 0 ]
  HOTMETAL.TAG.set block_tag, 'line-nr', line_nr
  HOTMETAL.TAG.add_class block_tag, 'slug'
  if line_nr is 1
    # HOTMETAL.TAG.remove_class  block_tag, 'middle'
    HOTMETAL.TAG.add_class     block_tag, 'first'
  else
    # HOTMETAL.TAG.remove_class  block_tag, 'first'
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

#-----------------------------------------------------------------------------------------------------------
@$get_slugs = ( gcolumn ) ->
  container = @_get_slugs_container gcolumn
  #.........................................................................................................
  return $ ( block_hotml, send ) =>
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
    #.......................................................................................................
    until is_finished
      trial_count    += +1
      good_slug_html  = slug_html
      line_nr         = html_lines.length + 1
      [ slice_hotml
        slug_html
        line_count
        excess      ] = @try_slug container, block_hotml, line_nr, start_idx, stop_idx
      #.....................................................................................................
      if stop_idx >= last_start_idx
        # warn '2', "stop_idx > last_start_idx"
        excesses.push   excess
        slices.push     slice_hotml
        html_lines.push slug_html
        is_finished = yes
        continue
      #.....................................................................................................
      if line_count > 1
        if trial_count is 1
          throw new Error "not yet implemented"
        excesses.push   excess
        slices.push     slice_hotml
        html_lines.push good_slug_html
        start_idx = stop_idx
        stop_idx  = start_idx - 1
      #.....................................................................................................
      stop_idx     += +1
      #.....................................................................................................
      if start_idx >= last_start_idx
        throw new Error "not yet implemented"
    #.......................................................................................................
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
    #.......................................................................................................
    container.empty()
    send html_lines
    help "#{( trial_count / html_lines.length ).toFixed 2} trials per line"

#-----------------------------------------------------------------------------------------------------------
@$xxx = ->
  target_columns      = jQuery 'page column'
  target_column_idx   = 0
  target_column       = target_columns.eq target_column_idx
  ### TAINT arbitrary constant ###
  columns_per_page    = 3
  line_count          = 0
  lines               = []
  #.........................................................................................................
  return $ ( html_lines, send, end ) =>
    #.......................................................................................................
    if html_lines?
      ### TAINT no need to recompute on each paragraph ###
      column_rectangle  = BD.get_rectangle target_column
      delta_y_px        = column_rectangle[ 'top' ]
      column_height_mm  = mm_from_npx column_rectangle[ 'height' ]
      ### TAINT arbitrary precision ###
      epsilon_mm        = 0.5
      #.....................................................................................................
      for html_line, line_idx in html_lines
        line_count   += +1
        line          = jQuery html_line
        lines.push line
        target_column.append line
        rectangle     = BD.get_rectangle line
        width_px      = rectangle[ 'width'  ]
        height_px     = rectangle[ 'height' ]
        top_px        = rectangle[ 'top'    ] - delta_y_px
        bottom_px     = rectangle[ 'bottom' ] - delta_y_px
        width_mm      = mm_from_npx width_px
        height_mm     = mm_from_npx height_px
        top_mm        = mm_from_npx top_px
        bottom_mm     = mm_from_npx bottom_px
        overshoot_mm  = bottom_mm - column_height_mm
        is_off        = overshoot_mm >= epsilon_mm
        if is_off
          ### TAINT must detect when page full ###
          target_column_idx  += +1
          target_column       = target_columns.eq target_column_idx
          line.detach()
          target_column.append line
        debug '©bPew4', line_idx, ( ƒ bottom_mm, 1 ), ( ƒ column_height_mm, 1 ), ( ƒ overshoot_mm, 1 ), is_off, line.text()[ .. 20 ]
      send html_lines
    #.......................................................................................................
    if end?
      debug '©nGQHo', line_count
      debug '©bgs63', @get_column_linecounts 'even', line_count, columns_per_page
      end()


#===========================================================================================================
#
#-----------------------------------------------------------------------------------------------------------
@demo = ( app_, md, settings, handler ) ->
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
  app                 = app_
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
  # window.gcolumn      = gcolumn # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  input               = D.create_throughstream()

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
    #.......................................................................................................
    .pipe $async ( data, done ) => later => done data
    #.......................................................................................................
    .pipe $ ( block_hotml, send ) =>
      ### Wrap block contents in `line-counter`; method analoguous to `jQuery.wrapInner` ###
      block_hotml[ 0                      ][ 0 ].push     [ 'line-counter', {}, ]
      block_hotml[ block_hotml.length - 1 ][ 2 ].unshift  [ 'line-counter', ]
      send block_hotml
    #.......................................................................................................
    .pipe @$get_slugs gcolumn
    # .pipe $get_slugs_v2 gcolumn
    #.......................................................................................................
    .pipe @$xxx()
    #.......................................................................................................
      .pipe D.$on_end ->
          ### !!! ###
          XXX_times.push [ "finished", new Date() - XXX_t0, ]
          for [ description, dt, ] in XXX_times
            debug '©1enOB', description, ( dt / 1000 ).toFixed 3
          handler()
  #.........................................................................................................
  input.write md
  input.end()

#-----------------------------------------------------------------------------------------------------------
@_demo_pop_over = ->
  target_columns      = jQuery 'page column'
  columns             = []
  for idx in [ 0 .. 2 ]
    columns.push COLUMN.new_column ( target_columns.eq idx ), 'p.slug'
  debug '©1rmzT', columns[ 0 ].length, columns[ 1 ].length, columns[ 2 ].length
  COLUMN.pop_over columns[ 0 ], columns[ 1 ], 1
  debug '©1rmzT', columns[ 0 ].length, columns[ 1 ].length












