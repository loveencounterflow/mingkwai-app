


############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/generate-html'
urge                      = CND.get_logger 'urge', badge
TEMPLATES                 = require './TEMPLATES'
methods_and_locators      = [
  'layout', njs_path.join __dirname, './index.html'
  'test',   njs_path.join __dirname, './test.html'
  ]
html_route                = html_locator.slice __dirname.length


#-----------------------------------------------------------------------------------------------------------
for [ method_name, locator, ] in methods_and_locators
  njs_fs.writeFileSync locator, TEMPLATES[ method_name ](), encoding: 'utf-8'
  urge 'wrote ' + html_locator



