


############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
#...........................................................................................................
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/generate-html'
urge                      = CND.get_logger 'urge',    badge
#...........................................................................................................
TEMPLATES                 = require './TEMPLATES'
html_locator              = njs_path.join __dirname, './index.html'
html_route                = html_locator[ __dirname.length .. ]
#...........................................................................................................
njs_fs.writeFileSync html_locator, TEMPLATES.layout(), encoding: 'utf-8'
urge "wrote #{html_locator}"

