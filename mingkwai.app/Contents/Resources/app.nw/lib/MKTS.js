// Generated by CoffeeScript 1.9.0
(function() {
  var CND, MKTS, alert, app, badge, debug, echo, help, info, log, rpr, urge, warn, whisper, ƒ;

  CND = require('cnd');

  rpr = CND.rpr.bind(CND);

  badge = '眀快排字机/MKTS';

  log = CND.get_logger('plain', badge);

  info = CND.get_logger('info', badge);

  alert = CND.get_logger('alert', badge);

  debug = CND.get_logger('debug', badge);

  warn = CND.get_logger('warn', badge);

  urge = CND.get_logger('urge', badge);

  whisper = CND.get_logger('whisper', badge);

  help = CND.get_logger('help', badge);

  echo = CND.echo.bind(CND);

  app = null;

  MKTS = this;

  ƒ = function(x, precision) {
    if (precision == null) {
      precision = 2;
    }
    return x.toFixed(precision);
  };

  module.exports = function(_app) {
    app = _app;
    return MKTS;
  };

  this.ZOOM = {};

  this.ZOOM.by = (function(_this) {
    return function(factor) {
      var document, height, left, matrix, page_x, page_y, q, top, width, window, zmr, zoom_0, zoom_1;
      window = app['window'];
      q = app['jQuery'];
      document = window.document;
      width = (q(window)).width();
      height = (q(window)).height();
      left = (q(document)).scrollLeft();
      top = (q(document)).scrollTop();
      page_x = left + width / 2;
      page_y = top + height / 2;
      zmr = window.convertPointFromPageToNode(app['zoomer'].get(0), page_x, page_y);
      zoom_0 = app['zoom'];
      zoom_1 = zoom_0 * factor;
      app['zoom'] = zoom_1;
      (q('#tg')).css('left', zmr['x'] - 5);
      (q('#tg')).css('top', zmr['y'] - 5);
      matrix = app['zoomer'].css('transform');
      app['zoomer'].css('transform-origin', zmr['x'] + "px " + zmr['y'] + "px");
      app['zoomer'].transition({
        scale: zoom_1
      }, 100, 'linear');
      whisper('factor:  ', ƒ(factor));
      whisper('zoom_0:  ', ƒ(zoom_0));
      whisper('zoom_1:  ', ƒ(zoom_1));
      whisper('width:   ', ƒ(width));
      whisper('height:  ', ƒ(height));
      whisper('left:    ', ƒ(left));
      whisper('top:     ', ƒ(top));
      whisper('page_x:  ', ƒ(page_x));
      whisper('page_y:  ', ƒ(page_y));
      return help("zoomed to [ " + (ƒ(zoom_1)) + ", ]");
    };
  })(this);

  this.ZOOM.to = (function(_this) {
    return function(zoom_1) {
      var zoom_0;
      zoom_0 = app['zoom'];
      app['zoom'] = zoom_1;
      app['zoomer'].transition({
        scale: zoom_1
      }, 100, 'linear');
      whisper('zoom_0:  ', ƒ(zoom_0));
      whisper('zoom_1:  ', ƒ(zoom_1));
      return help("zoomed to [ " + (ƒ(zoom_1)) + ", ]");
    };
  })(this);

  this.VIEW = {};

  this.VIEW.toggle_galley = (function(_this) {
    return function() {
      debug('©0fZv5', app['view']);
      if (app['view'] === 'pages') {
        _this.VIEW.show_galley();
      } else {
        _this.VIEW.show_pages();
      }
      return true;
    };
  })(this);

  this.VIEW.show_galley = (function(_this) {
    return function() {
      var q, window;
      window = app['window'];
      q = app['jQuery'];
      app['view'] = 'galley';
      app['pages-last-scroll-xy'][0] = (q(window)).scrollLeft();
      app['pages-last-scroll-xy'][1] = (q(window)).scrollTop();
      return (q('artboard.pages')).animate({
        opacity: 0
      }, function() {
        return (q('artboard.pages')).css('display', 'none');
      });
    };
  })(this);

  this.VIEW.show_pages = (function(_this) {
    return function() {
      var q, window;
      window = app['window'];
      q = app['jQuery'];
      app['view'] = 'pages';
      (q('artboard.pages')).css('display', 'block');
      (q(window)).scrollLeft(app['pages-last-scroll-xy'][0]);
      (q(window)).scrollTop(app['pages-last-scroll-xy'][1]);
      return (q('artboard.pages')).animate({
        opacity: 1
      });
    };
  })(this);

  this.ACTIONS = {};

  this.ACTIONS['demo'];

  this.ACTIONS['demo-1'];

  this.ACTIONS['print'];

  this.ACTIONS['print-preview'];

  this.ACTIONS['open'];

  this.ACTIONS['save'];

  this.ACTIONS['save-as'];

  this.ACTIONS['view-test'] = (function(_this) {
    return function() {
      return window.location.href = './test.html';
    };
  })(this);

  this.ACTIONS['tool-mode-hand'] = (function(_this) {
    return function() {
      return _this.push_tool_mode('hand');
    };
  })(this);

}).call(this);