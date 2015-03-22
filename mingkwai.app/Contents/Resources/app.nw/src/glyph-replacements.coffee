

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



### TAINT this module should be separated from the app proper; make it a plugin? ###

### TAINT as it stands, the glyph replacements are not sensitive to context; for example, the glyph
`龺` will always receive a markup stating that font `BabelStone Han` should be used for display even when
the contextual style calls for, say, a Heiti-style font. ###

### TAINT `glyph_replacements` should be a list ###

### TAINT consider to consolidate list into fewer rules ###

#...........................................................................................................
glyph_replacements =
  ### 'Late Additions' in upper part of CJK unified ideographs (Unicode v5.2); glyphs are missing
    from Sun-ExtA but are included in BabelstoneHan: ###
  '龺':            "<mkts-babel>龺</mkts-babel>"
  '龻':            "<mkts-babel>龻</mkts-babel>"
  '龼':            "<mkts-babel>龼</mkts-babel>"
  '龽':            "<mkts-babel>龽</mkts-babel>"
  '龾':            "<mkts-babel>龾</mkts-babel>"
  '龿':            "<mkts-babel>龿</mkts-babel>"
  '鿀':            "<mkts-babel>鿀</mkts-babel>"
  '鿁':            "<mkts-babel>鿁</mkts-babel>"
  '鿂':            "<mkts-babel>鿂</mkts-babel>"
  '鿃':            "<mkts-babel>鿃</mkts-babel>"
  '鿄':            "<mkts-babel>鿄</mkts-babel>"
  '鿅':            "<mkts-babel>鿅</mkts-babel>"
  '鿆':            "<mkts-babel>鿆</mkts-babel>"
  '鿇':            "<mkts-babel>鿇</mkts-babel>"
  '鿈':            "<mkts-babel>鿈</mkts-babel>"
  '鿉':            "<mkts-babel>鿉</mkts-babel>"
  '鿊':            "<mkts-babel>鿊</mkts-babel>"
  '鿋':            "<mkts-babel>鿋</mkts-babel>"
  '鿌':            "<mkts-babel>鿌</mkts-babel>"
  #.........................................................................................................
  ### This glyph is damaged in Sun-ExtA; it happens to be included in HanaMinA: ###
  '䗍':            "\\cnxHanaA{䗍}"
  #.........................................................................................................
  ### Shifted glyphs: ###
  '&#x3000;':      "\\cnjzr{}"
  '《':            "\\prPushRaise{0}{-0.2}{\\jzrFontSunXA{《}}"
  '》':            "\\prPushRaise{0}{-0.2}{\\jzrFontSunXA{》}}"
  # '':   "\\cnjzr{}"
  # '&jzr#xe352;':   "\\cnjzr{}"
  '囗':            "\\cnjzr{}"
  '。':            "\\prPushRaise{0.5}{0.25}{\\cn{。}}"
  '亻':            "\\prPush{0.4}{\\cn{亻}}"
  '冫':            "\\prPush{0.5}{\\cn{冫}}"
  '灬':            "\\prRaise{0.25}{\\cn{灬}}"
  '爫':            "\\prRaise{-0.125}{\\cn{爫}}"
  '牜':            "\\prPush{0.4}{\\cn{牜}}"
  '飠':            "\\prPush{0.4}{\\cn{飠}}"
  '扌':            "\\prPush{0.05}{\\cn{扌}}"
  '犭':            "\\prPush{0.3}{\\cn{犭}}"
  '忄':            "\\prPush{0.4}{\\cn{忄}}"
  '礻':            "\\prPush{0.2}{\\cn{礻}}"
  '衤':            "\\prPush{0.1}{\\cn{衤}}"
  '覀':            "\\prRaise{-0.125}{\\cn{覀}}"
  '讠':            "\\prPush{0.4}{\\cn{讠}}"
  '𧾷':            "\\prPush{0.4}{\\cnxb{𧾷}}"
  '卩':            "\\prPush{-0.4}{\\cn{卩}}"
  '癶':            "\\prRaise{-0.2}{\\cnxBabel{癶}}"
  '':            "\\prRaise{0.1}{\\cnxJzr{}}"
  '':            "\\prPushRaise{0.5}{-0.2}{\\cnxJzr{}}"
  '乛':            "\\prRaise{-0.2}{\\cn{乛}}"
  '糹':            "\\prPush{0.4}{\\cn{糹}}"
  '纟':            "\\prPush{0.4}{\\cn{纟}}"
  '𥫗':            "\\prRaise{-0.2}{\\cnxb{𥫗}}"
  '罓':            "\\prRaise{-0.2}{\\cn{罓}}"
  '钅':            "\\prPush{0.3}{\\cn{钅}}"
  '阝':            "\\prPush{0.4}{\\cn{阝}}"
  '龵':            "\\prRaise{-0.1}{\\cnxBabel{龵}}"
  '𩰊':            "\\prPush{-0.15}{\\cnxb{𩰊}}"
  '𩰋':            "\\prPush{0.15}{\\cnxb{𩰋}}"
  '彳':            "\\prPush{0.15}{\\cn{彳}}"
  '龹':            "\\prRaise{-0.12}{\\cn{龹}}"
  '龸':            "\\prRaise{-0.15}{\\cn{龸}}"
  '䒑':            "\\prRaise{-0.15}{\\cnxa{䒑}}"
  '宀':            "\\prRaise{-0.15}{\\cn{宀}}"
  '〇':            "\\prRaise{-0.05}{\\cnxBabel{〇}}"
  #.........................................................................................................
  ### Glyphs represented by other codepoints and/or with other than the standard fonts: ###
  # '⺊':            "\\cnxHanaA{⺊}"
  # '⺑':            "\\cnxHanaA{⺑}"
  # '⺕':            "\\cnxHanaA{⺕}"
  # '⺴':            "\\cnxHanaA{⺴}"
  # '⺿':            "\\cnxHanaA{⺿}"
  # '〆':            "\\cnxHanaA{〆}"
  # '〻':            "\\cnxHanaA{〻}"
  # '㇀':            "\\cnxHanaA{㇀}"
  # '㇊':            "\\cnxHanaA{㇊}"
  # '㇎':            "\\cnxHanaA{㇎}"
  # '㇏':            "\\cnxHanaA{㇏}"
  # '丷':            "\\cnxHanaA{丷}"
  # '饣':            "\\cnxHanaA{饣}"
  '⺀':            "\\cnxHanaA{⺀}"
  '⺀':            "\\cnxHanaA{⺀}"
  '⺄':            "\\cnxHanaA{⺄}"
  '⺆':            "\\cnxBabel{⺆}"
  '⺌':            "\\cnxHanaA{⺌}"
  '⺍':            "\\cnxHanaA{⺍}"
  '⺍':            "\\cnxHanaA{⺍}"
  '⺗':            "\\cnxHanaA{⺗}"
  '⺝':            "\\cnxBabel{⺝}"
  '⺝':            "\\cnxHanaA{⺝}"
  '⺥':            "\\cnxHanaA{⺥}"
  '⺳':            "\\cnxHanaA{⺳}"
  '⺶':            "\\cnxBabel{⺶}"
  '⺻':            "\\cnxHanaA{⺻}"
  '⺼':            "\\cnxBabel{⺼}"
  '覀':            "\\cnxJzr{}"
  '⻗':            "\\cnxJzr{}"
  '𡗗':            "\\cnxJzr{}"
  '〓':            "\\cnxBabel{〓}"
  '〓':            "\\cnxBabel{〓}"
  '〢':            "\\cnxSunXA{〢}"
  '〣':            "\\cnxSunXA{〣}"
  '〥':            "\\cnxBabel{〥}"
  '〥':            "\\cnxSunXA{〥}"
  '〧':            "\\cnxBabel{〧}"
  '〨':            "\\cnxBabel{〨}"
  '〽':            "\\cnxSunXA{〽}"
  '丿':            "\\cnxJzr{}"
  '㇁':            "\\cnxBabel{㇁}"
  '㇂':            "\\cnxHanaA{㇂}"
  '㇃':            "\\cnxBabel{㇃}"
  '㇄':            "\\cnxBabel{㇄}"
  '㇅':            "\\cnxBabel{㇅}"
  '㇈':            "\\cnxBabel{㇈}"
  '㇉':            "\\cnxHanaA{㇉}"
  '㇋':            "\\cnxBabel{㇋}"
  '㇌':            "\\cnxHanaA{㇌}"
  '㇢':            "\\cnxHanaA{㇢}"
  '㓁':            "\\cnxBabel{㓁}"
  '冖':            "\\cnxHanaA{冖}"
  '刂':            "\\cnxHanaA{刂}"
  '氵':            "\\cnxHanaA{氵}"
  '罒':            "\\cnxHanaA{罒}"
  '龴':            "\\cnxHanaA{龴}"
  '𠂉':            "\\cnxHanaA{𠂉}"
  '帯':            "\\cnxHanaA{帯}"
  '齒':            "\\cnxBabel{齒}"
  '龰':            "\\cnxBabel{龰}"
  '𤴔':            "\\cnxBabel{𤴔}"
  '㐃':            "\\cnxBabel{㐃}"
  '𠥓':            "\\cnxJzr{}"
  '𠚜':            "\\cnxHanaB{𠚜}"
  '𠚡':            "\\cnxHanaB{𠚡}"
  '𠥧':            "\\cnxHanaB{𠥧}"
  '𠥩':            "\\cnxHanaB{𠥩}"
  '𠥪':            "\\cnxHanaB{𠥪}"
  '𠥫':            "\\cnxHanaB{𠥫}"
  '𠥬':            "\\cnxHanaB{𠥬}"
  '𧀍':            "\\cnxHanaB{𧀍}"
  '龷':            "\\cnxJzr{}"
  '龶':            "\\cnxJzr{}"

############################################################################################################
module.exports = R = []
for matcher, replacement of glyph_replacements
  matcher = new RegExp matcher, 'g' if CND.isa_text matcher
  R.push [ matcher, replacement, ]

























