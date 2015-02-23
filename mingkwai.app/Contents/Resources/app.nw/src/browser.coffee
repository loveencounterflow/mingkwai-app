


############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/browser'
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
NW                        = require 'nw.gui'
win                       = NW.Window.get()
#...........................................................................................................
suspend                   = require 'coffeenode-suspend'
step                      = suspend.step
immediately               = suspend.immediately
after                     = suspend.after
sleep                     = suspend.sleep
#...........................................................................................................
D                         = require 'pipedreams2'
D$                        = D.remit.bind D
CHR                       = require 'coffeenode-chr'
#...........................................................................................................
LINESETTER                = require './LINESETTER'

#-----------------------------------------------------------------------------------------------------------
MKTS = {}

#-----------------------------------------------------------------------------------------------------------
app =
  'zoom-level':   0
  'mm-per-px':    50 / 189
  'jQuery':       $

#-----------------------------------------------------------------------------------------------------------
on_file_menu_what_you_should_know_C = ->
  ( $ '#content' ).text "Some kind of interesting stuff."

#-----------------------------------------------------------------------------------------------------------
build_menu = ->
  #.........................................................................................................
  help_menu = new NW.Menu()
  help_menu.append new NW.MenuItem label: 'about 眀快排字机'
  help_menu.append new NW.MenuItem label: 'what you should know A'
  help_menu_entry = new NW.MenuItem label: 'Help', 'submenu': help_menu
  #.........................................................................................................
  file_menu = new NW.Menu()
  file_menu.append new NW.MenuItem label: 'New'
  file_menu.append new NW.MenuItem label: 'Open...', click: on_file_menu_what_you_should_know_C
  file_menu.append new NW.MenuItem label: 'Save',             key: 's', modifiers: 'cmd', click: -> urge "saving..."
  file_menu.append new NW.MenuItem label: 'Take Screenshot',  key: 's', modifiers: 'cmd-shift', click: -> MKTS.take_screenshot app
  file_menu_entry = new NW.MenuItem label: 'File', 'submenu': file_menu
  #.........................................................................................................
  win_menu  = new NW.Menu type: 'menubar'
  # win_menu.append new NW.MenuItem label: '眀快排字机', 'submenu': app_menu
  win_menu.createMacBuiltin '眀快排字机'
  win_menu.insert file_menu_entry, 1
  win_menu.append help_menu_entry
  win.menu  = win_menu
  # win_menu.items.push new NW.MenuItem label: 'Help', 'submenu': help_menu
  edit_menu_item = win.menu.items[ 2 ]
  # CND.dir edit_menu_item
  # CND.dir edit_menu_item.submenu
  edit_menu_item.submenu.insert ( new NW.MenuItem label: 'xxxxxxxxx' ), 1
  # debug '©RsQep', edit_menu_item.type
  #.........................................................................................................
  # edit_menu_item = win.menu.items[ 2 ]
  #.........................................................................................................
  return null


build_menu()

# help '©5t3', document.visibilityState
# CND.dir win
# help ( name for name of window).join ' '

win.show()
win.focus()
win.zoomLevel = 0 # 100%
win.setResizable yes
# win.resizeTo 1500, 1500
# win.setTransparent yes # ???
# win.showDevTools()
# win.setProgressBar 0.5 # visible on dock icon
# win.setBadgeLabel = 'helo from 眀快排字机' # ???

# win.on 'blur',              -> info 'blur'
# win.on 'capturepagedone',   -> info 'capturepagedone'
win.on 'close',             -> info 'close'; @close true
# win.on 'closed',            -> info 'closed'
# win.on 'devtools-closed',   -> info 'devtools-closed'
# win.on 'devtools-opened',   -> info 'devtools-opened'
# win.on 'document-end',      -> info 'document-end'
# win.on 'document-start',    -> info 'document-start'
# win.on 'enter-fullscreen',  -> info 'enter-fullscreen'
# win.on 'focus',             -> info 'focus'
# win.on 'leave-fullscreen',  -> info 'leave-fullscreen'
# win.on 'loaded',            -> info 'loaded'
# win.on 'loading',           -> info 'loading'
# win.on 'maximize',          -> info 'maximize'
# win.on 'minimize',          -> info 'minimize'
# win.on 'move',              -> info 'move'
# win.on 'new-win-policy',    -> info 'new-win-policy'
# win.on 'resize',            -> info 'resize'
# win.on 'restore',           -> info 'restore'
# win.on 'unmaximize',        -> info 'unmaximize'
# win.on 'zoom',              -> info 'zoom'
# debug '©AfAsc', 'window.devicePixelRatio  ', window.devicePixelRatio
# debug '©AfAsc', 'window.devicePixelRatio  ', window.devicePixelRatio
# debug '©igYFq', 'window.screen.availTop   ', window.screen.availTop
# debug '©VUTiB', 'window.screen.availLeft  ', window.screen.availLeft
# debug '©o8v8T', 'window.screen.availHeight', window.screen.availHeight
# debug '©Ubkrt', 'window.screen.availWidth ', window.screen.availWidth
# debug '©zvq8U', 'window.screen.colorDepth ', window.screen.colorDepth
# debug '©nH9a6', 'window.screen.height     ', window.screen.height
# debug '©YDbG3', 'window.screen.left       ', window.screen.left
# debug '©j0QXK', 'window.screen.orientation', window.screen.orientation
# debug '©wEUqB', 'window.screen.pixelDepth ', window.screen.pixelDepth
# debug '©G5QV3', 'window.screen.top        ', window.screen.top
# debug '©7Kqfv', 'window.screen.width      ', window.screen.width

# #-----------------------------------------------------------------------------------------------------------
# win.on 'resize', ->
#   info "resized to #{win.width} x #{win.height}"

# #-----------------------------------------------------------------------------------------------------------
# win.on 'move', ->
#   info "moved to #{win.x}, #{win.y}"

#-----------------------------------------------------------------------------------------------------------
MKTS.get_document_size = ( me ) -> [ ( $ 'html' ).outerWidth(), ( $ 'html' ).outerHeight(), ]

#-----------------------------------------------------------------------------------------------------------
MKTS.maximize = ( app ) ->
  win.moveTo   window.screen.availLeft,  window.screen.availTop
  win.resizeTo window.screen.availWidth, window.screen.availHeight


#-----------------------------------------------------------------------------------------------------------
MKTS.zoom_to = ( me, level ) ->
  ### TAINT code duplication ###
  base_zoom_level = -0.15
  win.zoomLevel   = level ? base_zoom_level
  zoom_percent    = ( win.zoomLevel - base_zoom_level ) * 1.2 * 100
  echo "zoomed to level #{win.zoomLevel} (#{zoom_percent.toFixed 0}%)"
  return win.zoomLevel


#-----------------------------------------------------------------------------------------------------------
MKTS.zoom = ( me, delta ) ->
  base_zoom_level = -0.15
  if delta?
    if ( delta > 0 and win.zoomLevel <= 8.8 ) or ( delta < 0 and win.zoomLevel >= -7.5 )
      win.zoomLevel += delta
  else
    win.zoomLevel = base_zoom_level
  zoom_percent = ( win.zoomLevel - base_zoom_level ) * 1.2 * 100
  echo "zoomed to level #{win.zoomLevel} (#{zoom_percent.toFixed 0}%)"
  debug '©zVBdI', ( $ '.flex-columns-wrap' ).height()
  debug '©zVBdI', ( $ '.flex-columns-wrap' ).height() * me[ 'mm-per-px' ], 'mm'
  return win.zoomLevel

#-----------------------------------------------------------------------------------------------------------
MKTS.print = ->
  print()

#-----------------------------------------------------------------------------------------------------------
MKTS.wait = ( handler ) ->
  window.requestAnimationFrame -> handler()

#-----------------------------------------------------------------------------------------------------------
MKTS.take_screenshot = ->
  step ( resume ) =>
    ### trying to wait for DOM reflow: ###
    # yield step.wrap window.requestAnimationFrame, resume
    yield MKTS.wait resume
    # help 'animation frame'
    img       = yield MKTS._capture win, resume
    img_route = '/tmp/nw.png'
    yield njs_fs.writeFile img_route, img, resume
    help "image written to #{img_route}"

#-----------------------------------------------------------------------------------------------------------
MKTS.scroll_to = ( label ) ->
  # log '©Rafbc', ( $ '#bottom' ).offset
  ( $ 'html, body' ).stop().animate { scrollTop: ( $ label ).offset().top }, 500

#-----------------------------------------------------------------------------------------------------------
MKTS.scroll_to_top    = -> @scroll_to '#mkts-top'
MKTS.scroll_to_bottom = -> @scroll_to '#mkts-bottom'


#-----------------------------------------------------------------------------------------------------------
MKTS._capture = ( win, handler ) ->
  win.capturePage ( ( img ) => handler null, img ), format: 'png', datatype: 'buffer'

#-----------------------------------------------------------------------------------------------------------
MKTS.foo = ( event ) ->
  debug '©9HvgT', 'xxxx'

### TAINT should live in its own module ###
### TAINT cosider using e.g. https://www.npmjs.com/package/combokeys ###
#-----------------------------------------------------------------------------------------------------------
keyboard = new Map()
keyboard.set 187, 'plus'
keyboard.set 189, 'minus'
keyboard.set 221, 'asterisk'
keyboard.set 48,  '0'
keyboard.set 80,  'p'
keyboard.set 81,  'q'
keyboard.set 82,  'r'
keyboard.set 83,  's'
keyboard.set 89,  'y'
keyboard.set 37,  'left'
keyboard.set 39,  'right'

#-----------------------------------------------------------------------------------------------------------
bindings =
  'meta+plus':            -> MKTS.zoom app, +1
  'meta+shift+asterisk':  -> MKTS.zoom app, +0.1
  'meta+0':               -> MKTS.zoom app, null
  'meta+minus':           -> MKTS.zoom app, -1
  'meta+shift+minus':     -> MKTS.zoom app, -0.1
  'meta+p':               -> MKTS.print()
  # 'meta+r':               -> MKTS.reload()
  # 'meta+q':               -> MKTS.take_screenshot()
  'meta+left':            -> MKTS.scroll_to_top()
  'meta+right':           -> MKTS.scroll_to_bottom()
  #.........................................................................................................
  'meta+y': ->

###

foo <b><i>is it</i> really</b> baz

'foo'
'foo', ' '
'foo', ' ', <b><i>, 'is', ⬇, ⬇
'foo', ' ', <b><i>, 'is', ' ', ⬇, ⬇
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ⬇
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', ⬇
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', 'really', ⬇
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', 'really', ⬇, ' '
'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', 'really', ⬇, ' ', 'baz'

'foo'
'foo '
'foo <b><i>is</i></b>'
'foo <b><i>is </i></b>'
'foo <b><i>is it</i></b>'
'foo <b><i>is it</i> </b>'
'foo <b><i>is it</i> really</b>'
'foo <b><i>is it</i> really</b> '
'foo <b><i>is it</i> really</b> baz'


###



#-----------------------------------------------------------------------------------------------------------
MKTS.on_keydown = ( event ) ->
  code      = event.keyCode ? event.which
  key_name  = []
  #.........................................................................................................
  key_name.push 'alt'   if event.altKey
  key_name.push 'ctrl'  if event.ctrlKey
  key_name.push 'meta'  if event.metaKey
  key_name.push 'shift' if event.shiftKey
  key_name.push ( keyboard.get code ) ? code
  key_name  = key_name.join '+'
  #.........................................................................................................
  echo ( rpr key_name ), code
  if ( binding = bindings[ key_name ] )?
    binding()
    return false
  #.........................................................................................................
  else
    return true

# # keyboard.on 'A', ( event, keys, combo ) -> help '>>>', 'A', event, keys, combo
# keyboard.on 'super + a', ( event, keys, combo ) ->
#   help event.keyCode, event.which
#   help event.shiftKey, event.ctrlKey, event.altKey, event.metaKey
#   help '>>>', 'A', keys, combo
#   return false

# #-----------------------------------------------------------------------------------------------------------
# keyboard.on  'super + equal', -> MKTS.zoom app, 1.25
# keyboard.on 'rsuper + equal', -> MKTS.zoom app, 1.25
# keyboard.on  'super + dash',  -> MKTS.zoom app, 0.75
# keyboard.on 'rsuper + dash',  -> MKTS.zoom app, 0.75


### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###
### # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  ###
###  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ###


#-----------------------------------------------------------------------------------------------------------
win.on 'document-end', ->
  step ( resume ) ->
    # MKTS.zoom_to app, -2
    # yield MKTS.wait resume
    # debug '©wVnkq', 'paper ', ( $ '.paper' ).offset(), "#{( $ '.paper' ).outerWidth()} x #{( $ '.paper' ).outerHeight()}"
    # debug '©wVnkq', 'page  ', ( $ '.page' ).offset(), "#{( $ '.page' ).outerWidth()} x #{( $ '.page' ).outerHeight()}"
    # MKTS.zoom app
    # MKTS.maximize app
    MKTS.zoom_to app, 1.85
    yield step.wrap ( $ 'document' ).ready, resume
    help "document ready"
    #.......................................................................................................
    ( $ document ).keydown MKTS.on_keydown.bind MKTS
    #.......................................................................................................
    _demo()

#-----------------------------------------------------------------------------------------------------------
_demo = ->
  #.......................................................................................................
  md = """
    # Through the Looking-Glass

    'Really, now you ask me,' said Alice, very much confused, 'I don't
    think—'

    'Then you shouldn't talk,' said the Hatter.

    This piece of rudeness was more than Alice could bear: she got up in
    great disgust, and walked off; the Dormouse fell asleep instantly, and
    neither of the others took the least notice of her going, though she
    looked back once or twice, half hoping that they would call after her:
    the last time she saw them, they were trying to put the Dormouse into
    the teapot.

    'At any rate I'll never go THERE again!' said Alice as she picked her
    way through the wood. 'It's the stupidest tea-party I ever was at in all
    my life!'

    Just as she said this, she noticed that one of the trees had a door
    leading right into it. 'That's very curious!' she thought. 'But
    everything's curious today. I think I may as well go in at once.' And in
    she went.

    Once more she found herself in the long hall, and close to the little
    glass table. 'Now, I'll manage better this time,' she said to herself,
    and began by taking the little golden key, and unlocking the door that
    led into the garden. Then she went to work nibbling at the mushroom (she
    had kept a piece of it in her pocket) till she was about a foot high:
    then she walked down the little passage: and THEN—she found herself at
    last in the beautiful garden, among the bright flower-beds and the cool
    fountains.


    Alice opened the door and found that it led into a small passage, not
    much larger than a rat-hole: she knelt down and looked along the passage
    into the loveliest garden you ever saw. How she longed to get out of
    that dark hall, and wander about among those beds of bright flowers and
    those cool fountains, but she could not even get her head through the
    doorway; 'and even if my head would go through,' thought poor Alice, 'it
    would be of very little use without my shoulders. Oh, how I wish I could
    shut up like a telescope! I think I could, if I only knew how to begin.'
    For, you see, so many out-of-the-way things had happened lately,
    that Alice had begun to think that very few things indeed were really
    impossible.

    'Only mustard isn't a bird,' Alice remarked.

    'Right, as usual,' said the Duchess: 'what a clear way you have of
    putting things!'

    'It's a mineral, I THINK,' said Alice.

    'Of course it is,' said the Duchess, who seemed ready to agree to
    everything that Alice said; 'there's a large mustard-mine near here. And
    the moral of that is--"The more there is of mine, the less there is of
    yours."'

    'Oh, I know!' exclaimed Alice, who had not attended to this last remark,
    'it's a vegetable. It doesn't look like one, but it is.'

    'I quite agree with you,' said the Duchess; 'and the moral of that
    is--"Be what you would seem to be"--or if you'd like it put more
    simply--"Never imagine yourself not to be otherwise than what it might
    appear to others that what you were or might have been was not otherwise
    than what you had been would have appeared to them to be otherwise."'

    'I think I should understand that better,' Alice said very politely, 'if
    I had it written down: but I can't quite follow it as you say it.'

    'That's nothing to what I could say if I chose,' the Duchess replied, in
    a pleased tone.

    'Pray don't trouble yourself to say it any longer than that,' said
    Alice.

    'Oh, don't talk about trouble!' said the Duchess. 'I make you a present
    of everything I've said as yet.'

    'A cheap sort of present!' thought Alice. 'I'm glad they don't give
    birthday presents like that!' But she did not venture to say it out
    loud.

    'Thinking again?' the Duchess asked, with another dig of her sharp
    little chin.

    'I've a right to think,' said Alice sharply, for she was beginning to
    feel a little worried.

    'Just about as much right,' said the Duchess, 'as pigs have to fly; and
    the m--'

    But here, to Alice's great surprise, the Duchess's voice died away, even
    in the middle of her favourite word 'moral,' and the arm that was linked
    into hers began to tremble. Alice looked up, and there stood the Queen
    in front of them, with her arms folded, frowning like a thunderstorm.

    'A fine day, your Majesty!' the Duchess began in a low, weak voice.

    'Now, I give you fair warning,' shouted the Queen, stamping on the
    ground as she spoke; 'either you or your head must be off, and that in
    about half no time! Take your choice!'

    The Duchess took her choice, and was gone in a moment.

    'Let's go on with the game,' the Queen said to Alice; and Alice was
    too much frightened to say a word, but slowly followed her back to the
    croquet-ground.

    The other guests had taken advantage of the Queen's absence, and were
    resting in the shade: however, the moment they saw her, they hurried
    back to the game, the Queen merely remarking that a moment's delay would
    cost them their lives.

    All the time they were playing the Queen never left off quarrelling with
    the other players, and shouting 'Off with his head!' or 'Off with her
    head!' Those whom she sentenced were taken into custody by the soldiers,
    who of course had to leave off being arches to do this, so that by
    the end of half an hour or so there were no arches left, and all the
    players, except the King, the Queen, and Alice, were in custody and
    under sentence of execution.

    Then the Queen left off, quite out of breath, and said to Alice, 'Have
    you seen the Mock Turtle yet?'

    'No,' said Alice. 'I don't even know what a Mock Turtle is.'

    'It's the thing Mock Turtle Soup is made from,' said the Queen.

    'I never saw one, or heard of one,' said Alice.

    'Come on, then,' said the Queen, 'and he shall tell you his history,'

    As they walked off together, Alice heard the King say in a low voice,
    to the company generally, 'You are all pardoned.' 'Come, THAT'S a good
    thing!' she said to herself, for she had felt quite unhappy at the
    number of executions the Queen had ordered.

    They very soon came upon a Gryphon, lying fast asleep in the sun.
    (IF you don't know what a Gryphon is, look at the picture.) 'Up, lazy
    thing!' said the Queen, 'and take this young lady to see the Mock
    Turtle, and to hear his history. I must go back and see after some
    executions I have ordered'; and she walked off, leaving Alice alone with
    the Gryphon. Alice did not quite like the look of the creature, but on
    the whole she thought it would be quite as safe to stay with it as to go
    after that savage Queen: so she waited.

    The Gryphon sat up and rubbed its eyes: then it watched the Queen till
    she was out of sight: then it chuckled. 'What fun!' said the Gryphon,
    half to itself, half to Alice.

    'What IS the fun?' said Alice.

    'Why, SHE,' said the Gryphon. 'It's all her fancy, that: they never
    executes nobody, you know. Come on!'

    'Everybody says "come on!" here,' thought Alice, as she went slowly
    after it: 'I never was so ordered about in all my life, never!'

    They had not gone far before they saw the Mock Turtle in the distance,
    sitting sad and lonely on a little ledge of rock, and, as they came
    nearer, Alice could hear him sighing as if his heart would break. She
    pitied him deeply. 'What is his sorrow?' she asked the Gryphon, and the
    Gryphon answered, very nearly in the same words as before, 'It's all his
    fancy, that: he hasn't got no sorrow, you know. Come on!'

    So they went up to the Mock Turtle, who looked at them with large eyes
    full of tears, but said nothing.

    'This here young lady,' said the Gryphon, 'she wants for to know your
    history, she do.'

    'I'll tell it her,' said the Mock Turtle in a deep, hollow tone: 'sit
    down, both of you, and don't speak a word till I've finished.'

    So they sat down, and nobody spoke for some minutes. Alice thought to
    herself, 'I don't see how he can EVEN finish, if he doesn't begin.' But
    she waited patiently.

    'Once,' said the Mock Turtle at last, with a deep sigh, 'I was a real
    Turtle.'

    These words were followed by a very long silence, broken only by an
    occasional exclamation of 'Hjckrrh!' from the Gryphon, and the constant
    heavy sobbing of the Mock Turtle. Alice was very nearly getting up and
    saying, 'Thank you, sir, for your interesting story,' but she could
    not help thinking there MUST be more to come, so she sat still and said
    nothing.

    'When we were little,' the Mock Turtle went on at last, more calmly,
    though still sobbing a little now and then, 'we went to school in the
    sea. The master was an old Turtle--we used to call him Tortoise--'

    'Why did you call him Tortoise, if he wasn't one?' Alice asked.

    'We called him Tortoise because he taught us,' said the Mock Turtle
    angrily: 'really you are very dull!'

    'You ought to be ashamed of yourself for asking such a simple question,'
    added the Gryphon; and then they both sat silent and looked at poor
    Alice, who felt ready to sink into the earth. At last the Gryphon said
    to the Mock Turtle, 'Drive on, old fellow! Don't be all day about it!'
    and he went on in these words:

    'Yes, we went to school in the sea, though you mayn't believe it--'

    'I never said I didn't!' interrupted Alice.

    'You did,' said the Mock Turtle.

    'Hold your tongue!' added the Gryphon, before Alice could speak again.
    The Mock Turtle went on.

    'We had the best of educations--in fact, we went to school every day--'

    'I'VE been to a day-school, too,' said Alice; 'you needn't be so proud
    as all that.'

    'With extras?' asked the Mock Turtle a little anxiously.

    'Yes,' said Alice, 'we learned French and music.'

    'And washing?' said the Mock Turtle.

    'Certainly not!' said Alice indignantly.

    'Ah! then yours wasn't a really good school,' said the Mock Turtle in
    a tone of great relief. 'Now at OURS they had at the end of the bill,
    "French, music, AND WASHING--extra."'

    """
  # #.........................................................................................................
  # md = """
  #   # Through the Looking-Glass

  #   That's very *good* she said, not knowing that she would still have to climb the mountain.
  #   xxxxxxxxxx yyyyyyyyyyyy zzzzzzzzzz ppppppppppppppppppppppppppppppppppppppp qqqqqqqqqqqqqqqqqqqqqqqq.

  #   It's a pleasure."""
  #.........................................................................................................
  LINESETTER.demo app, md
  return null






























