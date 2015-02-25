// Generated by CoffeeScript 1.9.0
(function() {
  var CND, TEACUP, alert, badge, debug, help, info, log, name_, njs_fs, njs_path, rpr, urge, warn, whisper;

  njs_path = require('path');

  njs_fs = require('fs');

  CND = require('cnd');

  rpr = CND.rpr.bind(CND);

  badge = '眀快排字机/TEMPLATES';

  log = CND.get_logger('plain', badge);

  info = CND.get_logger('info', badge);

  whisper = CND.get_logger('whisper', badge);

  alert = CND.get_logger('alert', badge);

  debug = CND.get_logger('debug', badge);

  warn = CND.get_logger('warn', badge);

  help = CND.get_logger('help', badge);

  urge = CND.get_logger('urge', badge);

  TEACUP = require('coffeenode-teacup');

  for (name_ in TEACUP) {
    eval(name_ + " = TEACUP[ " + (rpr(name_)) + " ]");
  }

  this.layout = function() {
    return render((function(_this) {
      return function() {
        DOCTYPE(5);
        return HTML(function() {
          HEAD(function() {
            META({
              charset: 'utf-8'
            });
            TITLE('眀快排字机');
            LINK({
              rel: 'shortcut icon',
              href: './favicon.icon?v6'
            });
            LINK({
              rel: 'stylesheet',
              href: './html5doctor-css-reset.css?v6'
            });
            LINK({
              rel: 'stylesheet',
              href: './mingkwai-fixes.css?v6'
            });
            LINK({
              rel: 'stylesheet',
              href: './mingkwai-colors.css?v6'
            });
            LINK({
              rel: 'stylesheet',
              href: './mingkwai-layout.css?v6'
            });
            LINK({
              rel: 'stylesheet',
              href: './mingkwai-fonts.css?v6'
            });
            LINK({
              rel: 'stylesheet',
              href: './mingkwai-main.css?v6'
            });
            LINK({
              rel: 'stylesheet',
              href: './mingkwai-dev.css?v6'
            });
            SCRIPT({
              type: 'text/javascript',
              src: './jquery-2.1.3.js'
            });
            SCRIPT({
              type: 'text/javascript',
              src: './outerHTML-2.1.0.js'
            });
            return SCRIPT({
              type: 'text/javascript',
              src: './blaidddrwg.js'
            });
          });
          return BODY(function() {
            DIV('#mkts-top');
            DIV('.paper', function() {
              DIV('.grid.baseline-grid', function() {
                var idx, y, _i, _results;
                _results = [];
                for (idx = _i = 1; _i <= 53; idx = ++_i) {

                  /* get offset from CSS */

                  /* TAINT should be 5 */
                  y = 14 + idx * 4.9;
                  _results.push(DIV('.gridline.horizontal', {
                    style: "top:" + y + "mm;"
                  }));
                }
                return _results;
              });
              DIV('.mingkwai-dev-page-marker', function() {});
              return DIV('.page', function() {
                return DIV('.flex-columns-wrap', function() {
                  DIV('#box-a.column.filled-with-id-content');
                  DIV('.column-gap');
                  DIV('#box-b.column.filled-with-id-content');
                  DIV('.column-gap');
                  return DIV('#box-c.column.filled-with-id-content');
                });
              });
            });
            SCRIPT({
              type: 'text/javascript',
              src: './browser.js'
            });
            return DIV('#mkts-bottom');
          });
        });
      };
    })(this));
  };

}).call(this);
