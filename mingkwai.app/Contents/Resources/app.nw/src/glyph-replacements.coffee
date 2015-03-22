

############################################################################################################
# njs_path                  = require 'path'
# njs_fs                    = require 'fs'
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/glyph-replacements'
debug                     = CND.get_logger 'debug',   badge
# log                       = CND.get_logger 'plain',   badge
# info                      = CND.get_logger 'info',    badge
# alert                     = CND.get_logger 'alert',   badge
# warn                      = CND.get_logger 'warn',    badge
# urge                      = CND.get_logger 'urge',    badge
# whisper                   = CND.get_logger 'whisper', badge
# help                      = CND.get_logger 'help',    badge
# echo                      = CND.echo.bind CND
#...........................................................................................................
# TEACUP                    = require 'coffeenode-teacup'
# new_tag                   = TEACUP.TAG.bind     TEACUP
# render                    = TEACUP.render.bind  TEACUP
# raw                       = TEACUP.RAW.bind     TEACUP


### TAINT this module should be separated from the app proper; make it a plugin? ###

### TAINT as it stands, the glyph replacements are not sensitive to context; for example, the glyph
`龺` will always receive a markup stating that font `BabelStone Han` should be used for display even when
the contextual style calls for, say, a Heiti-style font. ###


#...........................................................................................................
glyph_replacements =
  ### 'Late Additions' in upper part of CJK unified ideographs (Unicode v5.2); glyphs are missing
    from Sun-ExtA but are included in BabelstoneHan: ###
  '龺':            tag: 'mkts-babel' # >龺</mkts-babel>"
  '龻':            tag: 'mkts-babel' # >龻</mkts-babel>"
  '龼':            tag: 'mkts-babel' # >龼</mkts-babel>"
  '龽':            tag: 'mkts-babel' # >龽</mkts-babel>"
  '龾':            tag: 'mkts-babel' # >龾</mkts-babel>"
  '龿':            tag: 'mkts-babel' # >龿</mkts-babel>"
  '鿀':            tag: 'mkts-babel' # >鿀</mkts-babel>"
  '鿁':            tag: 'mkts-babel' # >鿁</mkts-babel>"
  '鿂':            tag: 'mkts-babel' # >鿂</mkts-babel>"
  '鿃':            tag: 'mkts-babel' # >鿃</mkts-babel>"
  '鿄':            tag: 'mkts-babel' # >鿄</mkts-babel>"
  '鿅':            tag: 'mkts-babel' # >鿅</mkts-babel>"
  '鿆':            tag: 'mkts-babel' # >鿆</mkts-babel>"
  '鿇':            tag: 'mkts-babel' # >鿇</mkts-babel>"
  '鿈':            tag: 'mkts-babel' # >鿈</mkts-babel>"
  '鿉':            tag: 'mkts-babel' # >鿉</mkts-babel>"
  '鿊':            tag: 'mkts-babel' # >鿊</mkts-babel>"
  '鿋':            tag: 'mkts-babel' # >鿋</mkts-babel>"
  '鿌':            tag: 'mkts-babel' # >鿌</mkts-babel>"
  #.........................................................................................................
  ### This glyph is damaged in Sun-ExtA; it happens to be included in HanaMinA: ###
  '䗍':            tag: 'mkts-hanaa' # "<mkts-hanaa>䗍</mkts-hanaa>"
  #.........................................................................................................
  '&#x3000;':      tag: 'mkts-jzr', glyph: ''
  '囗':            tag: 'mkts-jzr', glyph: ''
  #.........................................................................................................
  ### Shifted glyphs: ###
  '《':            push: 0.0,  raise: -0.2, tag: 'mkts-sunxa' # "\\prPushRaise{0}{-0.2}{<mkts-sunxa>《<mkts-sunxa>}"
  '》':            push: 0.0,  raise: -0.2, tag: 'mkts-sunxa' # "\\prPushRaise{0}{-0.2}{<mkts-sunxa>》<mkts-sunxa>}"
  '':            push: 0.5,  raise: -0.2, tag: 'mkts-jzr'   # "\\prPushRaise{0.5}{-0.2}{<mkts-jzr></mkts-jzr>}"
  '。':            push: 0.5,  raise: 0.25, tag: 'mkts-sunxa' # "\\prPushRaise{0.5}{0.25}{<mkts-sunxa>。</mkts-sunxa>}"
  # '':   "<mkts-jzr></mkts-jzr>"
  # '&jzr#xe352;':   "<mkts-jzr></mkts-jzr>"
  '亻':            push:   0.4,    tag: 'mkts-sunxa'
  '冫':            push:   0.5,    tag: 'mkts-sunxa'
  '牜':            push:   0.4,    tag: 'mkts-sunxa'
  '飠':            push:   0.4,    tag: 'mkts-sunxa'
  '扌':            push:   0.05,   tag: 'mkts-sunxa'
  '犭':            push:   0.3,    tag: 'mkts-sunxa'
  '忄':            push:   0.4,    tag: 'mkts-sunxa'
  '礻':            push:   0.2,    tag: 'mkts-sunxa'
  '衤':            push:   0.1,    tag: 'mkts-sunxa'
  '讠':            push:   0.4,    tag: 'mkts-sunxa'
  '𧾷':            push:   0.4,    tag: 'mkts-sunxb'
  '卩':            push:  -0.4,    tag: 'mkts-sunxa'
  '糹':            push:   0.4,    tag: 'mkts-sunxa'
  '纟':            push:   0.4,    tag: 'mkts-sunxa'
  '钅':            push:   0.3,    tag: 'mkts-sunxa'
  '阝':            push:   0.4,    tag: 'mkts-sunxa'
  '𩰊':            push:  -0.15,   tag: 'mkts-sunxb'
  '𩰋':            push:   0.15,   tag: 'mkts-sunxb'
  '彳':            push:   0.15,   tag: 'mkts-sunxa'
  '':            raise:  0.1,    tag: 'mkts-jzr'
  '灬':            raise:  0.45,   tag: 'mkts-sunxa'
  '爫':            raise: -0.125,  tag: 'mkts-sunxa'
  '覀':            raise: -0.125,  tag: 'mkts-sunxa'
  '癶':            raise: -0.2,    tag: 'mkts-babel'
  '乛':            raise: -0.2,    tag: 'mkts-sunxa'
  '𥫗':            raise: -0.2,    tag: 'mkts-sunxb'
  '罓':            raise: -0.2,    tag: 'mkts-sunxa'
  '龵':            raise: -0.1,    tag: 'mkts-babel'
  # '龹':            raise: -0.12,   tag: 'mkts-sunxa'
  '龸':            raise: -0.15,   tag: 'mkts-sunxa'
  # '䒑':            raise: -0.15,   tag: 'mkts-sunxa'
  '宀':            raise: -0.15,   tag: 'mkts-sunxa'
  '〇':            raise: -0.05,   tag: 'mkts-babel'
  #.........................................................................................................
  ### Glyphs represented by other codepoints: ###
  '覀':            tag: 'mkts-jzr', glyph: '' # "<mkts-jzr></mkts-jzr>"
  '⻗':            tag: 'mkts-jzr', glyph: '' # "<mkts-jzr></mkts-jzr>"
  '𡗗':            tag: 'mkts-jzr', glyph: '' # "<mkts-jzr></mkts-jzr>"
  '丿':            tag: 'mkts-jzr', glyph: '' # "<mkts-jzr></mkts-jzr>"
  '𠥓':            tag: 'mkts-jzr', glyph: '' # "<mkts-jzr></mkts-jzr>"
  '龷':            tag: 'mkts-jzr', glyph: '' # "<mkts-jzr></mkts-jzr>"
  '龶':            tag: 'mkts-jzr', glyph: '' # "<mkts-jzr></mkts-jzr>"
  #.........................................................................................................
  # '⺊':            "<mkts-hanaa>⺊</mkts-hanaa>"
  # '⺑':            "<mkts-hanaa>⺑</mkts-hanaa>"
  # '⺕':            "<mkts-hanaa>⺕</mkts-hanaa>"
  # '⺴':            "<mkts-hanaa>⺴</mkts-hanaa>"
  # '⺿':            "<mkts-hanaa>⺿</mkts-hanaa>"
  # '〆':            "<mkts-hanaa>〆</mkts-hanaa>"
  # '〻':            "<mkts-hanaa>〻</mkts-hanaa>"
  # '㇀':            "<mkts-hanaa>㇀</mkts-hanaa>"
  # '㇊':            "<mkts-hanaa>㇊</mkts-hanaa>"
  # '㇎':            "<mkts-hanaa>㇎</mkts-hanaa>"
  # '㇏':            "<mkts-hanaa>㇏</mkts-hanaa>"
  # '丷':            "<mkts-hanaa>丷</mkts-hanaa>"
  # '饣':            "<mkts-hanaa>饣</mkts-hanaa>"
  '⺆':           tag: 'mkts-babel' # "<mkts-babel>⺆</mkts-babel>"
  '⺝':           tag: 'mkts-babel' # "<mkts-babel>⺝</mkts-babel>"
  '⺶':           tag: 'mkts-babel' # "<mkts-babel>⺶</mkts-babel>"
  '⺼':           tag: 'mkts-babel' # "<mkts-babel>⺼</mkts-babel>"
  '〓':           tag: 'mkts-babel' # "<mkts-babel>〓</mkts-babel>"
  '〥':           tag: 'mkts-babel' # "<mkts-babel>〥</mkts-babel>"
  '〧':           tag: 'mkts-babel' # "<mkts-babel>〧</mkts-babel>"
  '〨':           tag: 'mkts-babel' # "<mkts-babel>〨</mkts-babel>"
  '㇁':           tag: 'mkts-babel' # "<mkts-babel>㇁</mkts-babel>"
  '㇃':           tag: 'mkts-babel' # "<mkts-babel>㇃</mkts-babel>"
  '㇄':           tag: 'mkts-babel' # "<mkts-babel>㇄</mkts-babel>"
  '㇅':           tag: 'mkts-babel' # "<mkts-babel>㇅</mkts-babel>"
  '㇈':           tag: 'mkts-babel' # "<mkts-babel>㇈</mkts-babel>"
  '㇋':           tag: 'mkts-babel' # "<mkts-babel>㇋</mkts-babel>"
  '㓁':           tag: 'mkts-babel' # "<mkts-babel>㓁</mkts-babel>"
  '齒':           tag: 'mkts-babel' # "<mkts-babel>齒</mkts-babel>"
  '龰':           tag: 'mkts-babel' # "<mkts-babel>龰</mkts-babel>"
  '𤴔':           tag: 'mkts-babel' # "<mkts-babel>𤴔</mkts-babel>"
  '㐃':           tag: 'mkts-babel' # "<mkts-babel>㐃</mkts-babel>"
  '⺀':           tag: 'mkts-hanaa' # "<mkts-hanaa>⺀</mkts-hanaa>"
  '⺄':           tag: 'mkts-hanaa' # "<mkts-hanaa>⺄</mkts-hanaa>"
  '⺌':           tag: 'mkts-hanaa' # "<mkts-hanaa>⺌</mkts-hanaa>"
  '⺍':           tag: 'mkts-hanaa' # "<mkts-hanaa>⺍</mkts-hanaa>"
  '⺗':           tag: 'mkts-hanaa' # "<mkts-hanaa>⺗</mkts-hanaa>"
  '⺝':           tag: 'mkts-hanaa' # "<mkts-hanaa>⺝</mkts-hanaa>"
  '⺥':           tag: 'mkts-hanaa' # "<mkts-hanaa>⺥</mkts-hanaa>"
  '⺳':           tag: 'mkts-hanaa' # "<mkts-hanaa>⺳</mkts-hanaa>"
  '⺻':           tag: 'mkts-hanaa' # "<mkts-hanaa>⺻</mkts-hanaa>"
  '㇂':           tag: 'mkts-hanaa' # "<mkts-hanaa>㇂</mkts-hanaa>"
  '㇉':           tag: 'mkts-hanaa' # "<mkts-hanaa>㇉</mkts-hanaa>"
  '㇌':           tag: 'mkts-hanaa' # "<mkts-hanaa>㇌</mkts-hanaa>"
  '㇢':           tag: 'mkts-hanaa' # "<mkts-hanaa>㇢</mkts-hanaa>"
  '冖':           tag: 'mkts-hanaa' # "<mkts-hanaa>冖</mkts-hanaa>"
  '刂':           tag: 'mkts-hanaa' # "<mkts-hanaa>刂</mkts-hanaa>"
  '氵':           tag: 'mkts-hanaa' # "<mkts-hanaa>氵</mkts-hanaa>"
  '罒':           tag: 'mkts-hanaa' # "<mkts-hanaa>罒</mkts-hanaa>"
  '龴':           tag: 'mkts-hanaa' # "<mkts-hanaa>龴</mkts-hanaa>"
  '𠂉':           tag: 'mkts-hanaa' # "<mkts-hanaa>𠂉</mkts-hanaa>"
  '帯':           tag: 'mkts-hanaa' # "<mkts-hanaa>帯</mkts-hanaa>"
  '𠚜':           tag: 'mkts-hanab' # "<mkts-hanab>𠚜</mkts-hanab>"
  '𠚡':           tag: 'mkts-hanab' # "<mkts-hanab>𠚡</mkts-hanab>"
  '𠥧':           tag: 'mkts-hanab' # "<mkts-hanab>𠥧</mkts-hanab>"
  '𠥩':           tag: 'mkts-hanab' # "<mkts-hanab>𠥩</mkts-hanab>"
  '𠥪':           tag: 'mkts-hanab' # "<mkts-hanab>𠥪</mkts-hanab>"
  '𠥫':           tag: 'mkts-hanab' # "<mkts-hanab>𠥫</mkts-hanab>"
  '𠥬':           tag: 'mkts-hanab' # "<mkts-hanab>𠥬</mkts-hanab>"
  '𧀍':           tag: 'mkts-hanab' # "<mkts-hanab>𧀍</mkts-hanab>"
  '〢':           tag: 'mkts-sunxa' # "<mkts-sunxa>〢</mkts-sunxa>"
  '〣':           tag: 'mkts-sunxa' # "<mkts-sunxa>〣</mkts-sunxa>"
  '〥':           tag: 'mkts-sunxa' # "<mkts-sunxa>〥</mkts-sunxa>"
  '〽':           tag: 'mkts-sunxa' # "<mkts-sunxa>〽</mkts-sunxa>"

#-----------------------------------------------------------------------------------------------------------
translate = ( source_glyph, settings ) ->
  { tag
    glyph
    push
    raise }     = settings
  #.........................................................................................................
  target_glyph  = glyph ? source_glyph
  R             = if tag? then "<#{tag}>#{target_glyph}</#{tag}>" else target_glyph
  #.........................................................................................................
  if push? or raise?
    style   = ''
    style  +=  "left:#{push}ex;" if  push?
    style  += "top:#{-raise}em;" if raise?
    R       = "<shift style='#{style}'>#{R}</shift>"
  #.........................................................................................................
  return R


############################################################################################################
module.exports = {}
do ->
  for source_glyph, settings of glyph_replacements
    throw new Error "duplicate key: #{rpr source_glyph}" if module.exports[ source_glyph ]?
    module.exports[ source_glyph ] = translate source_glyph, settings


###

'〽': tag: 'mkts-sunxa' => """<mkts-sunxa>〽</mkts-sunxa>"""
'彳': push:   0.15, tag: 'mkts-sunxa' => """<shift style='left:-0.15em;'><mkts-sunxa>彳</mkts-sunxa></shift>"""
'': raise:  0.1,  tag: 'mkts-jzr'   => """<shift style='top:-0.1em'><mkts-jzr></mkts-jzr></shift>"""
'。': push:   0.5,  raise: 0.25, tag: 'mkts-sunxa' => """<shift style='left:-0.5em;top:-0.25em'><mkts-sunxa>。</mkts-sunxa></shift>"""

###



