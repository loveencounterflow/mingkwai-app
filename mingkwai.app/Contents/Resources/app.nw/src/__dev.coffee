
# ( require 'guy-trace' ).limit 10


############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
# #...........................................................................................................
# TEXT                      = require 'coffeenode-text'
# TYPES                     = require 'coffeenode-types'
# BNP                       = require 'coffeenode-bitsnpieces'
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/__dev'
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
D                         = PIPEDREAMS = require 'pipedreams2'
$                         = D.remit.bind D
HOTMETAL                  = D.HOTMETAL


#===========================================================================================================
#
#-----------------------------------------------------------------------------------------------------------
@demo = ->

  #---------------------------------------------------------------------------------------------------------
  # jQuery              = app[ 'jQuery' ]
  # MKTS                = app[ 'MKTS'   ]
  # window              = app[ 'window' ]
  # BD                  = window[ 'BD'  ]
  # page                = ( jQuery 'page' ).eq 0
  # container           = ( jQuery 'wrap' ).eq 0
  # # columns             = container.find 'column'
  # columns             = jQuery 'column'
  # # column_count        = columns.length
  # # seen_lines          = null
  # # # last_line_height    = null

  md = """

    # Behind the Looking-Glass

    Just as she said this, she noticed that one of the trees had a door
    leading right into it. 'That's very curious!' she thought. 'But
    everything's curious today. I think I may as well go in at once.' And in
    she went.

    # Behind the Looking-Glass

    Just as she said this, she noticed that one of the trees had a door
    leading right into it. 'That's very curious!' she thought. 'But
    everything's curious today. I think I may as well go in at once.' And in
    she went."""

  md = """'But everything's curious today.

  x y v"""

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
    # #.......................................................................................................
    # .pipe $ ( block_hotml, send ) =>
    #   for element, idx in block_hotml
    #     ### TAINT use library method ###
    #     element[ 0 ].push     [ 'span', { class: 'shred', }, ]
    #     element[ 2 ].unshift  [ 'span', ]
    #   #.....................................................................................................
    #   send block_hotml
    #.......................................................................................................
    .pipe $ ( block_hotml, send ) =>
      for idx in [ block_hotml.length - 1 .. 1 ] by -1
        this_element      = block_hotml[ idx     ]
        previous_element  = block_hotml[ idx - 1 ]
        #...................................................................................................
        if CND.isa_text this_text = this_element[ 1 ]
          if CND.isa_text previous_text = previous_element[ 1 ]
            if previous_text[ previous_text.length - 1 ] is '\u00ad'
              this_element[     1 ] = '\u00ad' + this_text
              previous_element[ 1 ] = previous_text[ ... previous_text.length - 1 ]
        #...................................................................................................
        block_hotml.splice idx, 0, [ [ [ 'cork', {}, ], ], '', [ [ 'cork', ], ], ]
      #.....................................................................................................
      send block_hotml
    #.......................................................................................................
    .pipe D.$show()
    #.......................................................................................................
    .pipe do =>
      return $ ( block_hotml, send ) =>
        send html = HOTMETAL.as_html block_hotml, no
    #     # debug '©gFRZM', html
    #.......................................................................................................
    .pipe D.$show()
    #.......................................................................................................
    # .pipe D.$throttle_items 10 / 1
    # .pipe $ ( block_html, send ) =>
    #     if block_html?
    #       ( columns.eq 0 ).append jQuery block_html
    #     if end?
    #       warn 'ended'
    #       t1    = +new Date()
    #       dt    = t1   - t0
    #       dt_a  = t1_a - t0
    #       help "demo took #{ƒ dt / 1000}s"
    #       handler null
    #       end()
  #.........................................................................................................
  input.write md
  input.end()


############################################################################################################
unless module.parent?
  @demo()









