// Generated by CoffeeScript 1.9.1
(function() {
  var CND, TEMPLATES, badge, debug, filename, help, i, len, locator, method, method_name, methods_and_locators, njs_fs, njs_path, ref, rpr, urge;

  njs_path = require('path');

  njs_fs = require('fs');

  CND = require('cnd');

  rpr = CND.rpr.bind(CND);

  badge = '眀快排字机/generate-html';

  help = CND.get_logger('help', badge);

  urge = CND.get_logger('urge', badge);

  debug = CND.get_logger('debug', badge);

  TEMPLATES = require('./TEMPLATES');


  /* TAINT consider to define filenames in TEMPLATES */

  methods_and_locators = [['layout', njs_path.join(__dirname, './index.html')], ['test_page', njs_path.join(__dirname, './test.html')], ['splash_window', njs_path.join(__dirname, './splash.html')], ['font_test', njs_path.join(__dirname, './font-test.html')]];

  for (i = 0, len = methods_and_locators.length; i < len; i++) {
    ref = methods_and_locators[i], method_name = ref[0], locator = ref[1];
    filename = njs_path.basename(locator);
    help("compiling " + filename + " from TEMPLATES/" + method_name);
    if ((method = TEMPLATES[method_name]) == null) {
      throw new Error("unknown TEMPLATES method name " + (rpr(method_name)));
    }
    njs_fs.writeFileSync(locator, TEMPLATES[method_name](), {
      encoding: 'utf-8'
    });
    urge('wrote ' + locator);
  }

}).call(this);
