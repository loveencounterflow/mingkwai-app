// Generated by CoffeeScript 1.9.1
(function() {
  var CHR, CND, D, D$, LINESETTER, MKTS, NW, after, alert, app, badge, debug, demo_count, echo, help, immediately, info, log, matter, njs_fs, njs_path, ref, rpr, sleep, splash_info, splash_win, step, suspend, urge, warn, whisper, win, ƒ,
    slice = [].slice;

  njs_path = require('path');

  njs_fs = require('fs');

  CND = require('cnd');

  rpr = CND.rpr.bind(CND);

  badge = '眀快排字机/browser';

  log = CND.get_logger('plain', badge);

  info = CND.get_logger('info', badge);

  alert = CND.get_logger('alert', badge);

  debug = CND.get_logger('debug', badge);

  warn = CND.get_logger('warn', badge);

  urge = CND.get_logger('urge', badge);

  whisper = CND.get_logger('whisper', badge);

  help = CND.get_logger('help', badge);

  echo = CND.echo.bind(CND);

  NW = require('nw.gui');

  win = NW.Window.get();

  suspend = require('coffeenode-suspend');

  step = suspend.step;

  immediately = suspend.immediately;

  after = suspend.after;

  sleep = suspend.sleep;

  D = require('pipedreams');

  D$ = D.remit.bind(D);

  CHR = require('coffeenode-chr');

  LINESETTER = require('./LINESETTER');

  ƒ = function(x, precision) {
    if (precision == null) {
      precision = 2;
    }
    return x.toFixed(precision);
  };


  /* see https://github.com/nwjs/nw.js/wiki/Window */

  splash_info = [
    './splash.html', {
      "position": "center",
      "title": "眀快排字机",
      "width": 800,
      "height": 500,
      "frame": false,
      "toolbar": false,
      "transparent": true,
      "focus": false,
      "resizable": false,
      "show": true,
      "show_in_taskbar": true
    }
  ];

  splash_win = (ref = NW.Window).open.apply(ref, splash_info);


  /* Description of what is being typeset; the document. */


  /* At some point in the future, maybe we'll be able to refer to the matter (document) and to locations
  inside the matter by using a URL like:
  
      mkts://#{file_locator}#page:#{page_nr}/column:#{column_nr}/y:#{insertion_y_px}px
  
  e.g.
  
      mkts://(file:///Users/dave/Documents/cv.mkts)/page:3/column:4/y:120.45px
   */

  matter = {
    '~isa': 'MKTS/matter',
    'batch-idx': -1,
    'pages': [],
    'caret': {
      'page-nr': 1,
      'column-nr': 1,
      'y.px': 0
    }
  };


  /* Description of the app, its settings and its current user interface state. */

  app = {
    '~isa': 'MKTS/app',
    '%memo': {},

    /* TAINT populate with `MKTS.new_windows()` */
    '%windows': {
      'main': win,
      'devtools': null,
      'splash': splash_win
    },
    'gauge': null,
    'jQuery': $,
    'NW': NW,
    'MKTS': null,
    'artboard': null,
    'window': window,
    'view-mode': 'dev',
    'zoom-delta-factor': 1.25,
    'zoom': 1,
    'tool-modes': [],
    'tool-modes-default': 'default',
    'view': 'pages',
    'matter': matter
  };


  /* Publish app so we have access to it in both the browser and the NodeJS contexts: */

  window['app'] = app;

  MKTS = (require('./MKTS'))(app);


  /* TAINT temporary fix: */

  app['MKTS'] = MKTS;

  app['gauge'] = MKTS.GAUGE["new"](app);

  win.on('close', function() {
    info('close');
    return this.close(true);
  });

  MKTS.get_document_size = function(me) {
    return [($('html')).outerWidth(), ($('html')).outerHeight()];
  };

  MKTS.maximize = function(app) {
    win.moveTo(window.screen.availLeft, window.screen.availTop);
    return win.resizeTo(window.screen.availWidth, window.screen.availHeight);
  };

  MKTS.wait = function(handler) {
    return window.requestAnimationFrame(function() {
      return handler();
    });
  };

  MKTS.take_screenshot = function() {
    return step((function(_this) {
      return function*(resume) {

        /* trying to wait for DOM reflow: */
        var img, img_route;
        (yield MKTS.wait(resume));
        img = (yield MKTS._capture(win, resume));
        img_route = '/tmp/nw.png';
        (yield njs_fs.writeFile(img_route, img, resume));
        return help("image written to " + img_route);
      };
    })(this));
  };

  MKTS.scroll_to = function(label) {
    return ($('html, body')).stop().animate({
      scrollTop: ($(label)).offset().top
    }, 500);
  };

  MKTS.scroll_to_top = function() {
    return this.scroll_to('#mkts-top');
  };

  MKTS.scroll_to_bottom = function() {
    return this.scroll_to('#mkts-bottom');
  };

  MKTS._capture = function(win, handler) {
    return win.capturePage(((function(_this) {
      return function(img) {
        return handler(null, img);
      };
    })(this)), {
      format: 'png',
      datatype: 'buffer'
    });
  };

  demo_count = 0;

  MKTS.demo = function(me) {
    var settings, source;
    debug('©iNl2F', 'demo');
    source = "\n\n'But everything's curious today. I think I may as well go in at once.' And in\nshe went.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx and so on.\n\nbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\n\nShort paragraph.\n";
    help("source: approx. " + source.length + " characters");
    settings = {
      'format': 'md'
    };
    step((function(_this) {
      return function*(resume) {
        (yield LINESETTER.demo(me, source, settings, resume));
        return help("MKTS.demo ok");
      };
    })(this));
    return null;
  };


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*   * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*   * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*   * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*   * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */

  MKTS.toggle_tool_mode = function(mode) {
    if ((CND.last_of(app['tool-modes'])) === mode) {
      return this.pop_tool_mode();
    }
    return this.push_tool_mode(mode);
  };

  MKTS.push_tool_mode = function(mode) {
    debug('©2ryq9', app['tool-modes']);
    if ((CND.last_of(app['tool-modes'])) !== mode) {
      app['tool-modes'].push(mode);
    }
    if (app['tool-modes'].length > 10) {
      app['tool-modes'].shift();
    }

    /* TAINT must swap classes */

    /* TAINT how to make cursor visible after change? */
    ($('body')).addClass('cursor-hand');
    return mode;
  };

  MKTS.pop_tool_mode = function() {
    var R;
    debug('©2ryq9', app['tool-modes']);
    if (app['tool-modes'].length < 1) {
      R = app['tool-modes-default'];
    } else {
      R = app['tool-modes'].pop();
    }

    /* TAINT must swap classes */
    ($('body')).removeClass('cursor-hand');
    return R;
  };

  MKTS.enable_console = function(selector) {
    var _write, console;
    if (selector == null) {
      selector = '#console';
    }
    console = $('#console');
    if (!(console.length > 0)) {
      return;
    }
    _write = process.stderr.write.bind(process.stderr);
    process.stderr.write = function() {
      var P, i, len, line, lines, text;
      P = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      text = P[0];
      lines = (text.replace(/\n$/, '')).split('\n');
      for (i = 0, len = lines.length; i < len; i++) {
        line = lines[i];
        console.append($("<div>" + (CND.ANSI.as_html(text)) + "</div>"));
        console.stop().animate({
          scrollTop: ($('#console-bottom')).offset()['top']
        }, 500);
      }
      return _write.apply(null, P);
    };
    return null;
  };

  win.on('zoom', function() {
    return MKTS.GAUGE.set_ratios(app);
  });

  win.on('document-end', function() {
    var show_splash;
    show_splash = false;
    if (show_splash) {
      after(2, function() {
        win.show();
        return splash_win.focus();
      });
      after(3, function() {
        return win.focus();
      });
      after(4, function() {
        return splash_win.hide();
      });
    } else {
      splash_win.hide();
      win.show();
      win.focus();
    }
    app['artboard'] = $('artboard');
    app['zoomer'] = $('zoomer');
    MKTS.enable_console();
    step(function*(resume) {
      win.zoomLevel = 1;
      (yield step.wrap(($(document)).ready, resume));
      help("document ready");

      /* TAINT should be implicitly performed by MKTS.KEYS */
      ($(document)).keydown(MKTS.KEYS.on_key.bind(MKTS));
      return MKTS.INTERFACE.build();
    });
    return null;
  });


  /*
  
  {
    "name": "mingkwai"
  
    "main": "lib/index.html",
    "version": "0.1.0",
    "keywords": [
      "node-webkit",
      "typesetting",
      "Chinese",
      "Japanese",
      "CJK",
      "typography"
    ],
    "chromium-args": "--enable-remote-fonts --enable-region-based-columns --enable-webkit-text-subpixel-positioning --enable-devtools-experiments --enable-experimental-web-platform-features --enable-smooth-scrolling --disable-accelerated-video --enable-webgl --enable-webaudio --ignore-gpu-blacklist --force-compositing-mode --remote-debugging-port=10138 --harmony",
    "single-instance": true,
    "no-edit-menu": false,
    "window": {
      "x": 0,
      "y": 20,
      "width": 1200,
      "height": 800,
      "show": false,
      "show_in_taskbar": true,
      "focus": false,
      "toolbar": true,
      "frame": true,
      "icon": "./favicon.ico",
      "position": "center",
      "title": "眀快排字机",
      "resizable": true
    },
    "js-flags": "--harmony",
    "dependencies": {
      "applescript": "^1.0.0",
      "cnd": "^0.1.5",
      "coffeenode-chr": "^0.1.4",
      "coffeenode-suspend": "^0.1.4",
      "coffeenode-teacup": "^0.1.2",
      "linear-interpolator": "^1.0.2",
      "pipedreams": "^0.2.8",
      "stylus": "^0.49.3"
    }
  }
   */

}).call(this);
