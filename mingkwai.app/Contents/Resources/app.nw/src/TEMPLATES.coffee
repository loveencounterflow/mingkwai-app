


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
# ### https://github.com/bramstein/hypher ###
# hyphenate                   = null
# do ->
#   _Hypher                     = require 'hypher'
#   _hypher_english             = require 'hyphenation.en-us'
#   _HYPHER                     = new _Hypher _hypher_english
#   hyphenate                   = _HYPHER.hyphenateText.bind _HYPHER

# # debug '©y5vhC', hyphenate
# # # CND.dir h
# # # // returns ['hy', 'phen', 'ation']
# # debug '©T7WlC', hyphenate 'hyphenation is awesome'
# # # debug '©T7WlC', h.hyphenateText 'hyphenation is awesome'


# _XXX_paragraphs = [

#   """
#     This piece of rudeness was more than **愛麗絲** could bear: she got up in
#     great disgust, and walked off; the Dormouse fell asleep instantly, and
#     neither of the others took the least notice of her going, though she
#     looked back once or twice, half hoping that they would call after her:
#     the last time she saw them, they were trying to put the Dormouse into
#     the teapot.
#     This piece of rudeness was more than Alice could bear: she got up in
#     great disgust, and walked off; the Dormouse fell asleep instantly, and
#     neither of the others took the least notice of her going, though she
#     looked back once or twice, half hoping that they would call after her:
#     the last time she saw them, they were trying to put the Dormouse into
#     the teapot.
#     The Dormouse had closed its eyes by this time, and was going off into
#     a doze; but, on being pinched by the Hatter, it woke up again with
#     a little shriek, and went on: '—that begins with an M, such as
#     mouse-traps, and the moon, and memory, and muchness—you know you say
#     things are "much of a muchness"—did you ever see such a thing as a
#     drawing of a muchness?'"""

#   """'Really, now you ask me,' said Alice, very much confused, 'I don't
#         think—'"""

#   """'Then you shouldn't talk,' said the Hatter."""

#   """'Really, now you ask me,' said Alice, very much confused, 'I don't
#         think—'"""

#   """'Then you shouldn't talk,' said the Hatter."""

#   """This piece of rudeness was more than Alice could bear: she got up in
#         great disgust, and walked off; the Dormouse fell asleep instantly, and
#         neither of the others took the least notice of her going, though she
#         looked back once or twice, half hoping that they would call after her:
#         the last time she saw them, they were trying to put the Dormouse into
#         the teapot."""

#   """'Really, now you ask me,' said Alice, very much confused, 'I don't
#         think—'"""

#   """'Then you shouldn't talk,' said the Hatter."""

#   """This piece of rudeness was more than Alice could bear: she got up in
#         great disgust, and walked off; the Dormouse fell asleep instantly, and
#         neither of the others took the least notice of her going, though she
#         looked back once or twice, half hoping that they would call after her:
#         the last time she saw them, they were trying to put the Dormouse into
#         the teapot."""

#   """'Really, now you ask me,' said Alice, very much confused, 'I don't
#         think—'"""

#   """'Then you shouldn't talk,' said the Hatter."""

#   """This piece of rudeness was more than Alice could bear: she got up in
#         great disgust, and walked off; the Dormouse fell asleep instantly, and
#         neither of the others took the least notice of her going, though she
#         looked back once or twice, half hoping that they would call after her:
#         the last time she saw them, they were trying to put the Dormouse into
#         the teapot."""

#   """'At any rate I'll never go THERE again!' said Alice as she picked her
#         way through the wood. 'It's the stupidest tea-party I ever was at in all
#         my life!'"""

#   """Just as she said this, she noticed that one of the trees had a door
#         leading right into it. 'That's very curious!' she thought. 'But
#         everything's curious today. I think I may as well go in at once.' And in
#         she went."""

#   """Once more she found herself in the long hall, and close to the little
#         glass table. 'Now, I'll manage better this time,' she said to herself,
#         and began by taking the little golden key, and unlocking the door that
#         led into the garden. Then she went to work nibbling at the mushroom (she
#         had kept a piece of it in her pocket) till she was about a foot high:
#         then she walked down the little passage: and THEN—she found herself at
#         last in the beautiful garden, among the bright flower-beds and the cool
#         fountains."""


#   """Alice opened the door and found that it led into a small passage, not
#   much larger than a rat-hole: she knelt down and looked along the passage
#   into the loveliest garden you ever saw. How she longed to get out of
#   that dark hall, and wander about among those beds of bright flowers and
#   those cool fountains, but she could not even get her head through the
#   doorway; 'and even if my head would go through,' thought poor Alice, 'it
#   would be of very little use without my shoulders. **愛麗絲** Oh, how I wish I could
#   shut up like a telescope! I think I could, if I only knew how to begin.'
#   For, you see, so many out-of-the-way things had happened lately,
#   that Alice had begun to think that very few things indeed were really
#   impossible."""

#   """There seemed to be no use in waiting by the little door, so she went
#   back to the table, half hoping she might find another key on it, or at
#   any rate a book of rules for shutting people up like telescopes: this
#   time she found a little bottle on it, ('which certainly was not here
#   before,' said Alice,) and round the neck of the bottle was a paper
#   label, with the words 'DRINK ME' beautifully printed on it in large
#   letters."""

#   """It was all very well to say 'Drink me,' but the wise little Alice was
#   not going to do THAT in a hurry. 'No, I'll look first,' she said, 'and
#   see whether it's marked "poison" or not'; for she had read several nice
#   little histories about children who had got burnt, and eaten up by wild
#   beasts and other unpleasant things, all because they WOULD not remember
#   the simple rules their friends had taught them: such as, that a red-hot
#   poker will burn you if you hold it too long; and that if you cut your
#   finger VERY deeply with a knife, it usually bleeds; and she had never
#   forgotten that, if you drink much from a bottle marked 'poison,' it is
#   almost certain to disagree with you, sooner or later."""
#   ]

# ### TAINT use markdown / remarkably ###
# _XXX_paragraphs = ( hyphenate paragraph for paragraph in _XXX_paragraphs )
# _XXX_paragraphs = ( paragraph.replace /\*\*([^*]+)\*\*/g, '<xbig>$1</xbig>' for paragraph in _XXX_paragraphs )

#===========================================================================================================
# TEACUP NAMESPACE ACQUISITION
#-----------------------------------------------------------------------------------------------------------
for name_ of TEACUP
  eval "#{name_} = TEACUP[ #{rpr name_} ]"

#-----------------------------------------------------------------------------------------------------------
@layout = ->
  #.........................................................................................................
  return render =>
    DOCTYPE 5
    HTML =>
      HEAD =>
        META charset: 'utf-8'
        TITLE '眀快排字机'
        LINK rel: 'shortcut icon', href: './favicon.icon?v6'
        LINK rel: 'stylesheet', href: './html5doctor-css-reset.css?v6'
        LINK rel: 'stylesheet', href: './mingkwai-fixes.css?v6'
        LINK rel: 'stylesheet', href: './mingkwai-colors.css?v6'
        LINK rel: 'stylesheet', href: './mingkwai-layout.css?v6'
        LINK rel: 'stylesheet', href: './mingkwai-fonts.css?v6'
        LINK rel: 'stylesheet', href: './mingkwai-main.css?v6'
        LINK rel: 'stylesheet', href: './mingkwai-dev.css?v6'
        SCRIPT type: 'text/javascript', src: './jquery-2.1.3.js'
        SCRIPT type: 'text/javascript', src: './outerHTML-2.1.0.js'
        # ### https://github.com/FremyCompany/css-regions-polyfill/ ###
        # SCRIPT type: 'text/javascript', src: './css-regions-polyfill.min.js'
        SCRIPT type: 'text/javascript', src: './blaidddrwg.js'
        # SCRIPT type: 'text/javascript', src: './LINESETTER.js'
        # SCRIPT src: '/socket.io/socket.io.js'
      #=====================================================================================================
      BODY =>
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




























