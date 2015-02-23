
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
# TEACUP                    = require 'coffeenode-teacup'
# LODASH                    = require 'lodash'
# LINESETTER                = require './LINESETTER'
# LineBreaker               = require 'linebreak'
HOTMETAL                  = require 'hotmetal'


#===========================================================================================================
# HTML
#-----------------------------------------------------------------------------------------------------------
@HTML = {}

#-----------------------------------------------------------------------------------------------------------
@HTML._new_parser = ( settings, stream ) ->
  ### NB.: Will not send empty text nodes; will not join ('normalize') adjacent text nodes. ###
  lone_tags = """area base br col command embed hr img input keygen link meta param
    source track wbr""".split /\s+/
  #.........................................................................................................
  handlers =
    #.......................................................................................................
    onopentag:  ( name, attributes )  ->
      if name in lone_tags
        if name is 'wbr'
          throw new Error "illegal <wbr> tag with attributes" if ( Object.keys attributes ).length > 0
          ### as per https://developer.mozilla.org/en/docs/Web/HTML/Element/wbr ###
          stream.write [ 'text', '\u200b' ]
        else
          stream.write [ 'lone-tag', name, attributes, ]
      else
        stream.write [ 'open-tag', name, attributes, ]
    #.......................................................................................................
    onclosetag: ( name ) ->
      unless name in lone_tags
        stream.write [ 'close-tag', name, ]
    #.......................................................................................................
    ontext: ( text ) ->
      stream.write [ 'text', CND.escape_html text, ]
    #.......................................................................................................
    onend: ->
      stream.write [ 'end', ]
      stream.end()
    #.......................................................................................................
    onerror: ( error ) ->
      throw error
  #.........................................................................................................
  Htmlparser = ( require '/Volumes/Storage/io/pipedreams2/node_modules/htmlparser2' ).Parser
  return new Htmlparser handlers, settings

#-----------------------------------------------------------------------------------------------------------
@HTML.$parse = ->
  settings    = decodeEntities: yes
  stream      = PIPEDREAMS.create_throughstream()
  html_parser = @_new_parser settings, stream
  _send       = null
  #.........................................................................................................
  stream.on 'data', ( data ) -> _send data
  stream.on 'end',           -> _send.end()
  #.........................................................................................................
  return $ ( source, send, end ) =>
    _send = send
    if source?
      html_parser.write source
    if end?
      html_parser.end()

#-----------------------------------------------------------------------------------------------------------
@demo = ->
  html = """<div>Helo world. It's <img src=y.png'> <i class='foo' id='bar'>possible</i>!</div>"""
  input = D.create_throughstream()
  #.........................................................................................................
  input
    .pipe @HTML.$parse()
    #.......................................................................................................
    .pipe $ ( data, send, end ) =>
      if data?
        urge data
        send data
      if end?
        warn 'ended'
        end()
  #.........................................................................................................
  input.write html

############################################################################################################
unless module.parent?
  @demo()









