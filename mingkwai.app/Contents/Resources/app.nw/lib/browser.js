// Generated by CoffeeScript 1.9.1
(function() {
  var CHR, CND, D, D$, LINESETTER, MKTS, NW, after, alert, app, badge, bindings, build_menu, debug, demo_count, echo, help, immediately, info, keycodes, log, matter, njs_fs, njs_path, on_file_menu_what_you_should_know_C, ref, rpr, sleep, splash_info, splash_win, step, suspend, urge, warn, whisper, win, ƒ,
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

  D = require('pipedreams2');

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

  on_file_menu_what_you_should_know_C = function() {
    return ($('#content')).text("Some kind of interesting stuff.");
  };

  build_menu = function() {
    var edit_menu_item, file_menu, file_menu_entry, help_menu, help_menu_entry, view_menu, view_menu_entry, win_menu;
    help_menu = new NW.Menu();
    help_menu.append(new NW.MenuItem({
      label: 'about mingkwai'
    }));
    help_menu.append(new NW.MenuItem({
      label: 'what you should know A'
    }));
    help_menu_entry = new NW.MenuItem({
      label: 'Help',
      'submenu': help_menu
    });
    file_menu = new NW.Menu();
    file_menu.append(new NW.MenuItem({
      label: 'New'
    }));
    file_menu.append(new NW.MenuItem({
      label: 'Open...',
      click: on_file_menu_what_you_should_know_C
    }));
    file_menu.append(new NW.MenuItem({
      label: 'Save',
      key: 's',
      modifiers: 'cmd',
      click: function() {
        return urge("saving...");
      }
    }));
    file_menu.append(new NW.MenuItem({
      label: 'Take Screenshot',
      key: 's',
      modifiers: 'cmd-shift',
      click: function() {
        return MKTS.take_screenshot(app);
      }
    }));
    file_menu.append(new NW.MenuItem({
      label: 'Typeset Demo',
      key: 'y',
      modifiers: 'cmd',
      click: function() {
        return MKTS.demo(app);
      }
    }));
    file_menu.append(new NW.MenuItem({
      label: 'Open Print Preview...',
      key: 'p',
      modifiers: 'cmd',
      click: function() {
        return MKTS.open_print_preview(app);
      }
    }));
    file_menu_entry = new NW.MenuItem({
      label: 'File',
      'submenu': file_menu
    });
    view_menu = new NW.Menu();
    view_menu.append(new NW.MenuItem({
      label: 'Toggle Galley',
      key: 't',
      modifiers: 'cmd',
      click: function() {
        return MKTS.VIEW.toggle_galley();
      }
    }));
    view_menu.append(new NW.MenuItem({
      label: 'View Test Page',
      click: function() {
        return MKTS.VIEW.test_page();
      }
    }));
    view_menu.append(new NW.MenuItem({
      label: 'Zoom In',
      key: '+',
      modifiers: 'cmd',
      click: function() {
        debug('©yVRqU', "Zoom In");
        return MKTS.ZOOM.by(1 * app['zoom-delta-factor']);
      }
    }));
    view_menu.append(new NW.MenuItem({
      label: 'Zoom 100%',
      key: '0',
      modifiers: 'cmd',
      click: function() {
        debug('©AINX1', "Zoom 100");
        return MKTS.ZOOM.to(1);
      }
    }));
    view_menu.append(new NW.MenuItem({
      label: 'Zoom Out',
      key: '-',
      modifiers: 'cmd',
      click: function() {
        debug('©KO8qN', "Zoom Out");
        return MKTS.ZOOM.by(1 / app['zoom-delta-factor']);
      }
    }));
    view_menu_entry = new NW.MenuItem({
      label: 'View',
      'submenu': view_menu
    });
    win_menu = new NW.Menu({
      type: 'menubar'
    });
    win_menu.createMacBuiltin('mingkwai');
    win_menu.insert(file_menu_entry, 1);
    win_menu.insert(view_menu_entry, 3);
    win_menu.append(help_menu_entry);
    win.menu = win_menu;
    edit_menu_item = win.menu.items[2];
    edit_menu_item.submenu.insert(new NW.MenuItem({
      label: 'xxxxxxxxx'
    }), 1);
    return null;
  };

  build_menu();

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
    source = "\n\n\n'But everything's curious today. I think I may as well go in at once.' And in\nshe went.\n\n";
    help("source: approx. " + source.length + " characters");
    settings = {
      'format': 'md'
    };
    step((function(_this) {
      return function*(resume) {
        (yield MKTS.VIEW.show_galley(resume));
        return LINESETTER.demo(me, source, settings, function(error) {
          return help("MKTS.demo ok");
        });
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


  /* TAINT should live in its own module */


  /* TAINT consider using e.g. https://www.npmjs.com/package/combokeys */

  keycodes = require('./BLAIDDDRWG-keycodes');

  bindings = {
    'h': function() {
      return MKTS.toggle_tool_mode('hand');
    },
    'meta+left': function() {
      return MKTS.scroll_to_top();
    },
    'meta+right': function() {
      return MKTS.scroll_to_bottom();
    }
  };

  MKTS.on_keydown = function(event) {
    var binding, code, key_name, ref1, ref2;
    code = (ref1 = event.keyCode) != null ? ref1 : event.which;
    key_name = [];
    if (event.altKey) {
      key_name.push('alt');
    }
    if (event.ctrlKey) {
      key_name.push('ctrl');
    }
    if (event.metaKey) {
      key_name.push('meta');
    }
    if (event.shiftKey) {
      key_name.push('shift');
    }
    key_name.push((ref2 = keycodes.get(code)) != null ? ref2 : code);
    key_name = key_name.join('+');
    echo(rpr(key_name), code);
    if ((binding = bindings[key_name]) != null) {
      binding();
      return false;
    } else {
      return true;
    }
  };

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
      return ($(document)).keydown(MKTS.on_keydown.bind(MKTS));
    });
    return null;
  });


  /*
  
  {
    "name": "mingkwai",
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
      "pipedreams2": "^0.2.8",
      "stylus": "^0.49.3"
    }
  }
   */

}).call(this);
