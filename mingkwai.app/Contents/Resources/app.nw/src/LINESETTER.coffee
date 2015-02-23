

# ############################################################################################################
# njs_path                  = require 'path'
# njs_fs                    = require 'fs'
# #...........................................................................................................
# CND                       = require 'cnd'
# rpr                       = CND.rpr.bind CND
# badge                     = '眀快排字机/LINESETTER'
# log                       = CND.get_logger 'plain',   badge
# info                      = CND.get_logger 'info',    badge
# alert                     = CND.get_logger 'alert',   badge
# debug                     = CND.get_logger 'debug',   badge
# warn                      = CND.get_logger 'warn',    badge
# urge                      = CND.get_logger 'urge',    badge
# whisper                   = CND.get_logger 'whisper', badge
# help                      = CND.get_logger 'help',    badge
# echo                      = CND.echo.bind CND
# #...........................................................................................................
# suspend                   = require 'coffeenode-suspend'
# step                      = suspend.step
# after                     = suspend.after
# sleep                     = suspend.sleep
# #...........................................................................................................
# D                         = require 'pipedreams2'
# $                         = D.remit.bind D
# TEACUP                    = require 'coffeenode-teacup'
# LODASH                    = require 'lodash'
# #...........................................................................................................
# @HOTMETAL                 = require 'hotmetal'



# #===========================================================================================================
# # BALANCED COLUMNS
# #-----------------------------------------------------------------------------------------------------------
# @get_column_linecounts = ( strategy, line_count, column_count ) ->
#   ### thx to http://stackoverflow.com/a/1244369/256361 ###
#   R   = []
#   #.........................................................................................................
#   switch strategy
#     #.......................................................................................................
#     when 'even'
#       for col in [ 1 .. column_count ]
#         R.push ( line_count + column_count - col ) // column_count
#     #.......................................................................................................
#     else
#       throw new Error "unknown strategy #{rpr strategy}"
#   #.........................................................................................................
#   return R



# ############################################################################################################
# unless module.parent?
#   @_demo()



