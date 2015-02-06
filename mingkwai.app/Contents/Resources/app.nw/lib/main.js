// Generated by CoffeeScript 1.9.0
(function() {
  var TEMPLATES, TRM, alert, badge, debug, echo, help, html_route, info, log, njs_fs, njs_path, rpr, urge, warn, whisper;

  njs_path = require('path');

  njs_fs = require('fs');

  TRM = require('coffeenode-trm');

  rpr = TRM.rpr.bind(TRM);

  badge = '眀快排字机';

  log = TRM.get_logger('plain', badge);

  info = TRM.get_logger('info', badge);

  alert = TRM.get_logger('alert', badge);

  debug = TRM.get_logger('debug', badge);

  warn = TRM.get_logger('warn', badge);

  urge = TRM.get_logger('urge', badge);

  whisper = TRM.get_logger('whisper', badge);

  help = TRM.get_logger('help', badge);

  echo = TRM.echo.bind(TRM);

  TEMPLATES = require('./TEMPLATES');

  html_route = njs_path.join(__dirname, '../lib/index.html');

  njs_fs.writeFileSync(html_route, TEMPLATES.layout(), {
    encoding: 'utf-8'
  });

  urge("wrote " + html_route);

}).call(this);
