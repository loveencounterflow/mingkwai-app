


############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
# #...........................................................................................................
# TEXT                      = require 'coffeenode-text'
# TYPES                     = require 'coffeenode-types'
# BNP                       = require 'coffeenode-bitsnpieces'
#...........................................................................................................
TRM                       = require 'coffeenode-trm'
rpr                       = TRM.rpr.bind TRM
badge                     = '眀快排字机/runfirst'
log                       = TRM.get_logger 'plain',   badge
info                      = TRM.get_logger 'info',    badge
alert                     = TRM.get_logger 'alert',   badge
debug                     = TRM.get_logger 'debug',   badge
warn                      = TRM.get_logger 'warn',    badge
urge                      = TRM.get_logger 'urge',    badge
whisper                   = TRM.get_logger 'whisper', badge
help                      = TRM.get_logger 'help',    badge
echo                      = TRM.echo.bind TRM
# #...........................................................................................................
# ### Module to control application life ###
# app                       = require 'app'
# ### Report crashes to our server ###
# ( require 'crash-reporter' ).start()
# ### Module to create native browser window ###
# # remote                    = require 'remote'
# BrowserWindow             = require 'browser-window'
# # BrowserWindow             = remote.require 'browser-window'
# #...........................................................................................................
# shell                     = require 'shell'
# TEMPLATES                 = require './TEMPLATES'
# html_route                = njs_path.join __dirname, '../lib/index.html'
# #...........................................................................................................
# njs_fs.writeFileSync html_route, TEMPLATES.layout(), encoding: 'utf-8'

help "runfirst: #{__filename}"
