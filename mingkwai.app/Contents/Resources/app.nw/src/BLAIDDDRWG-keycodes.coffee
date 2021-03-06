
keycode_by_keynames =
  'backspace':              8
  'tab':                    9
  'enter':                  13
  'shift':                  16
  'ctrl':                   17
  'alt':                    18
  'pause':                  19
  'capslock':               20
  'escape':                 27
  'page-up':                33
  'page-down':              34
  'end':                    35
  'home':                   36
  'left':                   37
  'up':                     38
  'right':                  39
  'down':                   40
  'insert':                 45
  'delete':                 46
  '0':                      48
  '1':                      49
  '2':                      50
  '3':                      51
  '4':                      52
  '5':                      53
  '6':                      54
  '7':                      55
  '8':                      56
  '9':                      57
  'a':                      65
  'b':                      66
  'c':                      67
  'd':                      68
  'e':                      69
  'f':                      70
  'g':                      71
  'h':                      72
  'i':                      73
  'j':                      74
  'k':                      75
  'l':                      76
  'm':                      77
  'n':                      78
  'o':                      79
  'p':                      80
  'q':                      81
  'r':                      82
  's':                      83
  't':                      84
  'u':                      85
  'v':                      86
  'w':                      87
  'x':                      88
  'y':                      89
  'z':                      90
  'meta':                   91 # left  ?????
  'meta':                   92 # right ?????
  'select':                 93 # ??????
  'numpad-0':               96
  'numpad-1':               97
  'numpad-2':               98
  'numpad-3':               99
  'numpad-4':               100
  'numpad-5':               101
  'numpad-6':               102
  'numpad-7':               103
  'numpad-8':               104
  'numpad-9':               105
  'multiply':               106
  'add':                    107
  'subtract':               109
  'decimal-point':          110
  'divide':                 111
  'f1':                     112
  'f2':                     113
  'f3':                     114
  'f4':                     115
  'f5':                     116
  'f6':                     117
  'f7':                     118
  'f8':                     119
  'f9':                     120
  'f10':                    121
  'f11':                    122
  'f12':                    123
  'num-lock':               144
  'scrolllock':             145
  'semicolon':              186
  'comma':                  188
  'minus':                  189
  'period':                 190
  'slash':                  191
  'grave':                  192
  'open-bracket':           219
  'backslash':              220
  'close-braket':           221
  'single-quote':           222
  #.........................................................................................................
  ### TAINT must localize keyboard ###
  # 'equals':                 187
  'plus':                   187
  #.........................................................................................................

# map.set 187, 'plus'
# map.set 189, 'minus'
# map.set 221, 'asterisk'
# map.set 48,  '0'
# map.set 80,  'p'
# map.set 81,  'q'
# map.set 82,  'r'
# map.set 83,  's'
# map.set 89,  'y'
# map.set 37,  'left'
# map.set 39,  'right'


module.exports = map = new Map()
do ->
  for name, code of keycode_by_keynames
    if ( value = map.get name )
      warn "key name #{rpr name} already set to key code #{rpr value}"
    else if ( value = map.get code )
      warn "key code #{rpr code} already set to key name #{rpr value}"
    else
      map.set name, code
      map.set code, name
      # console.log '©VcC8t', name, code

map[ 'os-translations' ] =
  'keys':
    'plus':         '+'
    'minus':        '-'
  'modifiers':
    'meta':         'cmd'



