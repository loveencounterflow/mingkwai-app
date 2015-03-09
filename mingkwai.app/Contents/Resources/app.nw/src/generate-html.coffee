


############################################################################################################
njs_path                  = require 'path'
njs_fs                    = require 'fs'
CND                       = require 'cnd'
rpr                       = CND.rpr.bind CND
badge                     = '眀快排字机/generate-html'
help                      = CND.get_logger 'help', badge
urge                      = CND.get_logger 'urge', badge
debug                     = CND.get_logger 'debug', badge
TEMPLATES                 = require './TEMPLATES'
### TAINT consider to define filenames in TEMPLATES ###
methods_and_locators      = [
  [ 'layout',         njs_path.join __dirname, './index.html',    ]
  [ 'test_page',      njs_path.join __dirname, './test.html',     ]
  [ 'splash_window',  njs_path.join __dirname, './splash.html',   ]
  ]
# html_route                = locator.slice __dirname.length


#-----------------------------------------------------------------------------------------------------------
for [ method_name, locator, ] in methods_and_locators
  filename = njs_path.basename locator
  help "compiling #{filename} from TEMPLATES/#{method_name}"
  unless ( method = TEMPLATES[ method_name ] )?
    throw new Error "unknown TEMPLATES method name #{rpr method_name}"
  njs_fs.writeFileSync locator, TEMPLATES[ method_name ](), encoding: 'utf-8'
  urge 'wrote ' + locator



