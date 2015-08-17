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
    var edit_menu_item, file_menu, file_menu_entry, help_menu, help_menu_entry, platform, view_menu, view_menu_entry, win_menu;
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
    switch (platform = process['platform']) {
      case 'darwin':
        win_menu.createMacBuiltin('mingkwai');
        win_menu.insert(file_menu_entry, 1);
        win_menu.insert(view_menu_entry, 3);
        win_menu.append(help_menu_entry);
        win.menu = win_menu;
        edit_menu_item = win.menu.items[2];
        edit_menu_item.submenu.insert(new NW.MenuItem({
          label: 'xxxxxxxxx'
        }), 1);
        break;
      default:
        warn("platform menus not supported for " + (rpr(platform)));
    }
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
    },
    'meta+x': function() {
      return LINESETTER._demo_pop_over_async();
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

//# sourceMappingURL=data:application/json;base64,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SCxHQUFHLENBQUMsU0FBSixHQUFnQjtNQUVoQixPQUFNLElBQUksQ0FBQyxJQUFMLENBQVUsQ0FBRSxDQUFBLENBQUUsUUFBRixDQUFGLENBQWMsQ0FBQyxLQUF6QixFQUFnQyxNQUFoQyxDQUFOO01BQ0EsSUFBQSxDQUFLLGdCQUFMO2FBRUEsQ0FBRSxDQUFBLENBQUUsUUFBRixDQUFGLENBQWMsQ0FBQyxPQUFmLENBQXVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBdkI7SUFSRyxDQUFMO0FBVUEsV0FBTztFQWpDYyxDQUF2Qjs7O0FBbUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF4a0JBIiwiZmlsZSI6ImJyb3dzZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbm5qc19wYXRoICAgICAgICAgICAgICAgICAgPSByZXF1aXJlICdwYXRoJ1xubmpzX2ZzICAgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUgJ2ZzJ1xuIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5DTkQgICAgICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAnY25kJ1xucnByICAgICAgICAgICAgICAgICAgICAgICA9IENORC5ycHIuYmluZCBDTkRcbmJhZGdlICAgICAgICAgICAgICAgICAgICAgPSAn55yA5b+r5o6S5a2X5py6L2Jyb3dzZXInXG5sb2cgICAgICAgICAgICAgICAgICAgICAgID0gQ05ELmdldF9sb2dnZXIgJ3BsYWluJywgICBiYWRnZVxuaW5mbyAgICAgICAgICAgICAgICAgICAgICA9IENORC5nZXRfbG9nZ2VyICdpbmZvJywgICAgYmFkZ2VcbmFsZXJ0ICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAnYWxlcnQnLCAgIGJhZGdlXG5kZWJ1ZyAgICAgICAgICAgICAgICAgICAgID0gQ05ELmdldF9sb2dnZXIgJ2RlYnVnJywgICBiYWRnZVxud2FybiAgICAgICAgICAgICAgICAgICAgICA9IENORC5nZXRfbG9nZ2VyICd3YXJuJywgICAgYmFkZ2VcbnVyZ2UgICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZ2V0X2xvZ2dlciAndXJnZScsICAgIGJhZGdlXG53aGlzcGVyICAgICAgICAgICAgICAgICAgID0gQ05ELmdldF9sb2dnZXIgJ3doaXNwZXInLCBiYWRnZVxuaGVscCAgICAgICAgICAgICAgICAgICAgICA9IENORC5nZXRfbG9nZ2VyICdoZWxwJywgICAgYmFkZ2VcbmVjaG8gICAgICAgICAgICAgICAgICAgICAgPSBDTkQuZWNoby5iaW5kIENORFxuIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5OVyAgICAgICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAnbncuZ3VpJ1xud2luICAgICAgICAgICAgICAgICAgICAgICA9IE5XLldpbmRvdy5nZXQoKVxuIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5zdXNwZW5kICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAnY29mZmVlbm9kZS1zdXNwZW5kJ1xuc3RlcCAgICAgICAgICAgICAgICAgICAgICA9IHN1c3BlbmQuc3RlcFxuaW1tZWRpYXRlbHkgICAgICAgICAgICAgICA9IHN1c3BlbmQuaW1tZWRpYXRlbHlcbmFmdGVyICAgICAgICAgICAgICAgICAgICAgPSBzdXNwZW5kLmFmdGVyXG5zbGVlcCAgICAgICAgICAgICAgICAgICAgID0gc3VzcGVuZC5zbGVlcFxuIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5EICAgICAgICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSAncGlwZWRyZWFtczInXG5EJCAgICAgICAgICAgICAgICAgICAgICAgID0gRC5yZW1pdC5iaW5kIERcbkNIUiAgICAgICAgICAgICAgICAgICAgICAgPSByZXF1aXJlICdjb2ZmZWVub2RlLWNocidcbiMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuTElORVNFVFRFUiAgICAgICAgICAgICAgICA9IHJlcXVpcmUgJy4vTElORVNFVFRFUidcbiMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuxpIgICAgICAgICAgICAgICAgICAgICAgICAgPSAoIHgsIHByZWNpc2lvbiA9IDIgKSAtPiB4LnRvRml4ZWQgcHJlY2lzaW9uXG5cbiMjIyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL253anMvbncuanMvd2lraS9XaW5kb3cgIyMjXG5zcGxhc2hfaW5mbyA9IFsgJy4vc3BsYXNoLmh0bWwnLFxuICBcInBvc2l0aW9uXCI6ICAgICAgICAgXCJjZW50ZXJcIixcbiAgXCJ0aXRsZVwiOiAgICAgICAgICAgIFwi55yA5b+r5o6S5a2X5py6XCIsXG4gIFwid2lkdGhcIjogICAgICAgICAgICA4MDAsXG4gIFwiaGVpZ2h0XCI6ICAgICAgICAgICA1MDAsXG4gIFwiZnJhbWVcIjogICAgICAgICAgICBmYWxzZSxcbiAgXCJ0b29sYmFyXCI6ICAgICAgICAgIGZhbHNlLFxuICBcInRyYW5zcGFyZW50XCI6ICAgICAgdHJ1ZSxcbiAgXCJmb2N1c1wiOiAgICAgICAgICAgIGZhbHNlLFxuICBcInJlc2l6YWJsZVwiOiAgICAgICAgZmFsc2UsXG4gIFwic2hvd1wiOiAgICAgICAgICAgICB0cnVlLFxuICBcInNob3dfaW5fdGFza2JhclwiOiAgdHJ1ZSxcbiAgXVxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnNwbGFzaF93aW4gPSBOVy5XaW5kb3cub3BlbiBzcGxhc2hfaW5mby4uLlxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMjIyBEZXNjcmlwdGlvbiBvZiB3aGF0IGlzIGJlaW5nIHR5cGVzZXQ7IHRoZSBkb2N1bWVudC4gIyMjXG4jIyMgQXQgc29tZSBwb2ludCBpbiB0aGUgZnV0dXJlLCBtYXliZSB3ZSdsbCBiZSBhYmxlIHRvIHJlZmVyIHRvIHRoZSBtYXR0ZXIgKGRvY3VtZW50KSBhbmQgdG8gbG9jYXRpb25zXG5pbnNpZGUgdGhlIG1hdHRlciBieSB1c2luZyBhIFVSTCBsaWtlOlxuXG4gICAgbWt0czovLyN7ZmlsZV9sb2NhdG9yfSNwYWdlOiN7cGFnZV9ucn0vY29sdW1uOiN7Y29sdW1uX25yfS95OiN7aW5zZXJ0aW9uX3lfcHh9cHhcblxuZS5nLlxuXG4gICAgbWt0czovLyhmaWxlOi8vL1VzZXJzL2RhdmUvRG9jdW1lbnRzL2N2Lm1rdHMpL3BhZ2U6My9jb2x1bW46NC95OjEyMC40NXB4XG4jIyNcbm1hdHRlciA9XG4gICd+aXNhJzogICAgICAgICAgICAgICAgICdNS1RTL21hdHRlcidcbiAgJ2JhdGNoLWlkeCc6ICAgICAgICAgICAgLTFcbiAgJ3BhZ2VzJzogICAgICAgICAgICAgICAgW11cbiAgJ2NhcmV0JzpcbiAgICAncGFnZS1ucic6ICAgICAgICAgICAgMVxuICAgICdjb2x1bW4tbnInOiAgICAgICAgICAxXG4gICAgJ3kucHgnOiAgICAgICAgICAgICAgIDBcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIyMgRGVzY3JpcHRpb24gb2YgdGhlIGFwcCwgaXRzIHNldHRpbmdzIGFuZCBpdHMgY3VycmVudCB1c2VyIGludGVyZmFjZSBzdGF0ZS4gIyMjXG5hcHAgPVxuICAnfmlzYSc6ICAgICAgICAgICAgICAgICAnTUtUUy9hcHAnXG4gICclbWVtbyc6ICAgICAgICAgICAgICAgIHt9XG4gICMjIyBUQUlOVCBwb3B1bGF0ZSB3aXRoIGBNS1RTLm5ld193aW5kb3dzKClgICMjI1xuICAnJXdpbmRvd3MnOlxuICAgICdtYWluJzogICAgICAgICAgICAgICAgIHdpblxuICAgICdkZXZ0b29scyc6ICAgICAgICAgICAgIG51bGxcbiAgICAnc3BsYXNoJzogICAgICAgICAgICAgICBzcGxhc2hfd2luXG4gICMgJ21tLXBlci1weCc6ICAgICAgICAgICAgMTAwIC8gMzc3Ljk0NzkxXG4gICMgJ21tLXBlci1weCc6ICAgICAgICAgICAgNTUgLyAyMDMuNzA0XG4gICMgJ21tLXBlci1weCc6ICAgICAgICAgICAgMTYwIC8gNTkzXG4gICdnYXVnZSc6ICAgICAgICAgICAgICAgIG51bGxcbiAgJ2pRdWVyeSc6ICAgICAgICAgICAgICAgJFxuICAnTlcnOiAgICAgICAgICAgICAgICAgICBOV1xuICAnTUtUUyc6ICAgICAgICAgICAgICAgICBudWxsXG4gICdhcnRib2FyZCc6ICAgICAgICAgICAgIG51bGxcbiAgJ3dpbmRvdyc6ICAgICAgICAgICAgICAgd2luZG93XG4gICd2aWV3LW1vZGUnOiAgICAgICAgICAgICdkZXYnXG4gICd6b29tLWRlbHRhLWZhY3Rvcic6ICAgIDEuMjVcbiAgJ3pvb20nOiAgICAgICAgICAgICAgICAgMVxuICAndG9vbC1tb2Rlcyc6ICAgICAgICAgICBbXVxuICAndG9vbC1tb2Rlcy1kZWZhdWx0JzogICAnZGVmYXVsdCdcbiAgJ3ZpZXcnOiAgICAgICAgICAgICAgICAgJ3BhZ2VzJ1xuICAnbWF0dGVyJzogICAgICAgICAgICAgICBtYXR0ZXJcblxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMjIyBQdWJsaXNoIGFwcCBzbyB3ZSBoYXZlIGFjY2VzcyB0byBpdCBpbiBib3RoIHRoZSBicm93c2VyIGFuZCB0aGUgTm9kZUpTIGNvbnRleHRzOiAjIyNcbndpbmRvd1sgJ2FwcCcgXSA9IGFwcFxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbk1LVFMgPSAoIHJlcXVpcmUgJy4vTUtUUycgKSBhcHBcbiMjIyBUQUlOVCB0ZW1wb3JhcnkgZml4OiAjIyNcbmFwcFsgJ01LVFMnIF0gICA9IE1LVFNcbmFwcFsgJ2dhdWdlJyBdICA9IE1LVFMuR0FVR0UubmV3IGFwcFxuXG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxub25fZmlsZV9tZW51X3doYXRfeW91X3Nob3VsZF9rbm93X0MgPSAtPlxuICAoICQgJyNjb250ZW50JyApLnRleHQgXCJTb21lIGtpbmQgb2YgaW50ZXJlc3Rpbmcgc3R1ZmYuXCJcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5idWlsZF9tZW51ID0gLT5cbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICBoZWxwX21lbnUgPSBuZXcgTlcuTWVudSgpXG4gIGhlbHBfbWVudS5hcHBlbmQgbmV3IE5XLk1lbnVJdGVtIGxhYmVsOiAnYWJvdXQgbWluZ2t3YWknXG4gICMgaGVscF9tZW51LmFwcGVuZCBuZXcgTlcuTWVudUl0ZW0gbGFiZWw6ICdhYm91dCDnnIDlv6vmjpLlrZfmnLonXG4gIGhlbHBfbWVudS5hcHBlbmQgbmV3IE5XLk1lbnVJdGVtIGxhYmVsOiAnd2hhdCB5b3Ugc2hvdWxkIGtub3cgQSdcbiAgaGVscF9tZW51X2VudHJ5ID0gbmV3IE5XLk1lbnVJdGVtIGxhYmVsOiAnSGVscCcsICdzdWJtZW51JzogaGVscF9tZW51XG4gICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgZmlsZV9tZW51ID0gbmV3IE5XLk1lbnUoKVxuICBmaWxlX21lbnUuYXBwZW5kIG5ldyBOVy5NZW51SXRlbSBsYWJlbDogJ05ldydcbiAgZmlsZV9tZW51LmFwcGVuZCBuZXcgTlcuTWVudUl0ZW0gbGFiZWw6ICdPcGVuLi4uJywgY2xpY2s6IG9uX2ZpbGVfbWVudV93aGF0X3lvdV9zaG91bGRfa25vd19DXG4gIGZpbGVfbWVudS5hcHBlbmQgbmV3IE5XLk1lbnVJdGVtIGxhYmVsOiAnU2F2ZScsICAgICAgICAgICAgICAgICAgIGtleTogJ3MnLCBtb2RpZmllcnM6ICdjbWQnLCAgICAgICBjbGljazogLT4gdXJnZSBcInNhdmluZy4uLlwiXG4gIGZpbGVfbWVudS5hcHBlbmQgbmV3IE5XLk1lbnVJdGVtIGxhYmVsOiAnVGFrZSBTY3JlZW5zaG90JywgICAgICAgIGtleTogJ3MnLCBtb2RpZmllcnM6ICdjbWQtc2hpZnQnLCBjbGljazogLT4gTUtUUy50YWtlX3NjcmVlbnNob3QgYXBwXG4gIGZpbGVfbWVudS5hcHBlbmQgbmV3IE5XLk1lbnVJdGVtIGxhYmVsOiAnVHlwZXNldCBEZW1vJywgICAgICAgICAgIGtleTogJ3knLCBtb2RpZmllcnM6ICdjbWQnLCAgICAgICBjbGljazogLT4gTUtUUy5kZW1vIGFwcFxuICAjIGZpbGVfbWVudS5hcHBlbmQgbmV3IE5XLk1lbnVJdGVtIGxhYmVsOiAnUHJpbnQuLi4nLCAgICAgICAgICAgICAgIGtleTogJ3AnLCBtb2RpZmllcnM6ICdjbWQtc2hpZnQnLCBjbGljazogLT4gTUtUUy5vcGVuX3ByaW50X2RpYWxvZyBhcHBcbiAgZmlsZV9tZW51LmFwcGVuZCBuZXcgTlcuTWVudUl0ZW0gbGFiZWw6ICdPcGVuIFByaW50IFByZXZpZXcuLi4nLCAga2V5OiAncCcsIG1vZGlmaWVyczogJ2NtZCcsICAgICAgIGNsaWNrOiAtPiBNS1RTLm9wZW5fcHJpbnRfcHJldmlldyBhcHBcbiAgZmlsZV9tZW51X2VudHJ5ID0gbmV3IE5XLk1lbnVJdGVtIGxhYmVsOiAnRmlsZScsICdzdWJtZW51JzogZmlsZV9tZW51XG4gICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgdmlld19tZW51ID0gbmV3IE5XLk1lbnUoKVxuICAjIHZpZXdfbWVudS5hcHBlbmQgbmV3IE5XLk1lbnVJdGVtIGxhYmVsOiAnVG9nZ2xlIERldiAvIFByaW50IFZpZXcnLCAga2V5OiAndCcsIG1vZGlmaWVyczogJ2NtZCcsICAgICBjbGljazogLT4gTUtUUy50b2dnbGVfdmlldyBhcHBcbiAgdmlld19tZW51LmFwcGVuZCBuZXcgTlcuTWVudUl0ZW0gbGFiZWw6ICdUb2dnbGUgR2FsbGV5JywgICAgICAgICAgICBrZXk6ICd0JywgbW9kaWZpZXJzOiAnY21kJywgICAgIGNsaWNrOiAtPiBNS1RTLlZJRVcudG9nZ2xlX2dhbGxleSgpXG4gIHZpZXdfbWVudS5hcHBlbmQgbmV3IE5XLk1lbnVJdGVtIGxhYmVsOiAnVmlldyBUZXN0IFBhZ2UnLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogLT4gTUtUUy5WSUVXLnRlc3RfcGFnZSgpXG4gIHZpZXdfbWVudS5hcHBlbmQgbmV3IE5XLk1lbnVJdGVtIGxhYmVsOiAnWm9vbSBJbicsICAga2V5OiAnKycsIG1vZGlmaWVyczogJ2NtZCcsIGNsaWNrOiAtPiBkZWJ1ZyAnwql5VlJxVScsIFwiWm9vbSBJblwiOyAgTUtUUy5aT09NLmJ5IDEgKiBhcHBbICd6b29tLWRlbHRhLWZhY3RvcicgXVxuICB2aWV3X21lbnUuYXBwZW5kIG5ldyBOVy5NZW51SXRlbSBsYWJlbDogJ1pvb20gMTAwJScsIGtleTogJzAnLCBtb2RpZmllcnM6ICdjbWQnLCBjbGljazogLT4gZGVidWcgJ8KpQUlOWDEnLCBcIlpvb20gMTAwXCI7IE1LVFMuWk9PTS50byAxXG4gIHZpZXdfbWVudS5hcHBlbmQgbmV3IE5XLk1lbnVJdGVtIGxhYmVsOiAnWm9vbSBPdXQnLCAga2V5OiAnLScsIG1vZGlmaWVyczogJ2NtZCcsIGNsaWNrOiAtPiBkZWJ1ZyAnwqlLTzhxTicsIFwiWm9vbSBPdXRcIjsgTUtUUy5aT09NLmJ5IDEgLyBhcHBbICd6b29tLWRlbHRhLWZhY3RvcicgXVxuICAjICdtZXRhK3BsdXMnOlxuICAjICdtZXRhKzAnOlxuICAjICdtZXRhK21pbnVzJzpcbiAgIyB2aWV3X21lbnUuYXBwZW5kIG5ldyBOVy5NZW51SXRlbSBsYWJlbDogJ1RvZ2dsZSBHYWxsZXknLCAgICAgICAgICAgIGtleTogJ3QnLCBtb2RpZmllcnM6ICdjbWQnLCAgICAgY2xpY2s6IC0+IGNvbnNvbGUubG9nICdYWFhYWFhYWFhYWFgnXG4gIHZpZXdfbWVudV9lbnRyeSA9IG5ldyBOVy5NZW51SXRlbSBsYWJlbDogJ1ZpZXcnLCAnc3VibWVudSc6IHZpZXdfbWVudVxuICAjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG4gIHdpbl9tZW51ICA9IG5ldyBOVy5NZW51IHR5cGU6ICdtZW51YmFyJ1xuICBzd2l0Y2ggcGxhdGZvcm0gPSBwcm9jZXNzWyAncGxhdGZvcm0nIF1cbiAgICB3aGVuICdkYXJ3aW4nXG4gICAgICB3aW5fbWVudS5jcmVhdGVNYWNCdWlsdGluICdtaW5na3dhaSdcbiAgICAgICMgd2luX21lbnUuY3JlYXRlTWFjQnVpbHRpbiAn55yA5b+r5o6S5a2X5py6J1xuICAgICAgd2luX21lbnUuaW5zZXJ0IGZpbGVfbWVudV9lbnRyeSwgMVxuICAgICAgd2luX21lbnUuaW5zZXJ0IHZpZXdfbWVudV9lbnRyeSwgM1xuICAgICAgd2luX21lbnUuYXBwZW5kIGhlbHBfbWVudV9lbnRyeVxuICAgICAgd2luLm1lbnUgID0gd2luX21lbnVcbiAgICAgICMgd2luX21lbnUuaXRlbXMucHVzaCBuZXcgTlcuTWVudUl0ZW0gbGFiZWw6ICdIZWxwJywgJ3N1Ym1lbnUnOiBoZWxwX21lbnVcbiAgICAgIGVkaXRfbWVudV9pdGVtID0gd2luLm1lbnUuaXRlbXNbIDIgXVxuICAgICAgIyBDTkQuZGlyIGVkaXRfbWVudV9pdGVtXG4gICAgICAjIENORC5kaXIgZWRpdF9tZW51X2l0ZW0uc3VibWVudVxuICAgICAgZWRpdF9tZW51X2l0ZW0uc3VibWVudS5pbnNlcnQgKCBuZXcgTlcuTWVudUl0ZW0gbGFiZWw6ICd4eHh4eHh4eHgnICksIDFcbiAgICAgICMgZGVidWcgJ8KpUnNRZXAnLCBlZGl0X21lbnVfaXRlbS50eXBlXG4gICAgZWxzZVxuICAgICAgd2FybiBcInBsYXRmb3JtIG1lbnVzIG5vdCBzdXBwb3J0ZWQgZm9yICN7cnByIHBsYXRmb3JtfVwiXG4gICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgIyBlZGl0X21lbnVfaXRlbSA9IHdpbi5tZW51Lml0ZW1zWyAyIF1cbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICByZXR1cm4gbnVsbFxuXG5idWlsZF9tZW51KClcbiMgd2luLnpvb21MZXZlbCA9IDAgIyAxMDAlXG4jIHdpbi5zZXRSZXNpemFibGUgeWVzXG4jIHdpbi5yZXNpemVUbyAxNTAwLCAxNTAwXG4jIHdpbi5zZXRUcmFuc3BhcmVudCB5ZXMgIyA/Pz9cbiMgd2luLnNob3dEZXZUb29scygpXG4jIHdpbi5zZXRQcm9ncmVzc0JhciAwLjUgIyB2aXNpYmxlIG9uIGRvY2sgaWNvblxuIyB3aW4uc2V0QmFkZ2VMYWJlbCA9ICdoZWxvIGZyb20g55yA5b+r5o6S5a2X5py6JyAjID8/P1xuXG4jIGhlbHAgJ8KpNXQzJywgZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlXG4jIENORC5kaXIgd2luXG4jIGhlbHAgKCBuYW1lIGZvciBuYW1lIG9mIHdpbmRvdykuam9pbiAnICdcblxuXG4jIHdpbi5vbiAnYmx1cicsICAgICAgICAgICAgICAtPiBpbmZvICdibHVyJ1xuIyB3aW4ub24gJ2NhcHR1cmVwYWdlZG9uZScsICAgLT4gaW5mbyAnY2FwdHVyZXBhZ2Vkb25lJ1xud2luLm9uICdjbG9zZScsICAgICAgICAgICAgIC0+IGluZm8gJ2Nsb3NlJzsgQGNsb3NlIHRydWVcbiMgd2luLm9uICdjbG9zZWQnLCAgICAgICAgICAgIC0+IGluZm8gJ2Nsb3NlZCdcbiMgd2luLm9uICdkZXZ0b29scy1jbG9zZWQnLCAgIC0+IGluZm8gJ2RldnRvb2xzLWNsb3NlZCdcbiMgd2luLm9uICdkZXZ0b29scy1vcGVuZWQnLCAgIC0+IGluZm8gJ2RldnRvb2xzLW9wZW5lZCdcbiMgd2luLm9uICdkb2N1bWVudC1lbmQnLCAgICAgIC0+IGluZm8gJ2RvY3VtZW50LWVuZCdcbiMgd2luLm9uICdkb2N1bWVudC1zdGFydCcsICAgIC0+IGluZm8gJ2RvY3VtZW50LXN0YXJ0J1xuIyB3aW4ub24gJ2VudGVyLWZ1bGxzY3JlZW4nLCAgLT4gaW5mbyAnZW50ZXItZnVsbHNjcmVlbidcbiMgd2luLm9uICdmb2N1cycsICAgICAgICAgICAgIC0+IGluZm8gJ2ZvY3VzJ1xuIyB3aW4ub24gJ2xlYXZlLWZ1bGxzY3JlZW4nLCAgLT4gaW5mbyAnbGVhdmUtZnVsbHNjcmVlbidcbiMgd2luLm9uICdsb2FkZWQnLCAgICAgICAgICAgIC0+IGluZm8gJ2xvYWRlZCdcbiMgd2luLm9uICdsb2FkaW5nJywgICAgICAgICAgIC0+IGluZm8gJ2xvYWRpbmcnXG4jIHdpbi5vbiAnbWF4aW1pemUnLCAgICAgICAgICAtPiBpbmZvICdtYXhpbWl6ZSdcbiMgd2luLm9uICdtaW5pbWl6ZScsICAgICAgICAgIC0+IGluZm8gJ21pbmltaXplJ1xuIyB3aW4ub24gJ21vdmUnLCAgICAgICAgICAgICAgLT4gaW5mbyAnbW92ZSdcbiMgd2luLm9uICduZXctd2luLXBvbGljeScsICAgIC0+IGluZm8gJ25ldy13aW4tcG9saWN5J1xuIyB3aW4ub24gJ3Jlc2l6ZScsICAgICAgICAgICAgLT4gaW5mbyAncmVzaXplJ1xuIyB3aW4ub24gJ3Jlc3RvcmUnLCAgICAgICAgICAgLT4gaW5mbyAncmVzdG9yZSdcbiMgd2luLm9uICd1bm1heGltaXplJywgICAgICAgIC0+IGluZm8gJ3VubWF4aW1pemUnXG4jIHdpbi5vbiAnem9vbScsICAgICAgICAgICAgICAtPiBpbmZvICd6b29tJ1xuIyBkZWJ1ZyAnwqlBZkFzYycsICd3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyAgJywgd2luZG93LmRldmljZVBpeGVsUmF0aW9cbiMgZGVidWcgJ8KpQWZBc2MnLCAnd2luZG93LmRldmljZVBpeGVsUmF0aW8gICcsIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvXG4jIGRlYnVnICfCqWlnWUZxJywgJ3dpbmRvdy5zY3JlZW4uYXZhaWxUb3AgICAnLCB3aW5kb3cuc2NyZWVuLmF2YWlsVG9wXG4jIGRlYnVnICfCqVZVVGlCJywgJ3dpbmRvdy5zY3JlZW4uYXZhaWxMZWZ0ICAnLCB3aW5kb3cuc2NyZWVuLmF2YWlsTGVmdFxuIyBkZWJ1ZyAnwqlvOHY4VCcsICd3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0Jywgd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodFxuIyBkZWJ1ZyAnwqlVYmtydCcsICd3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGggJywgd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoXG4jIGRlYnVnICfCqXp2cThVJywgJ3dpbmRvdy5zY3JlZW4uY29sb3JEZXB0aCAnLCB3aW5kb3cuc2NyZWVuLmNvbG9yRGVwdGhcbiMgZGVidWcgJ8Kpbkg5YTYnLCAnd2luZG93LnNjcmVlbi5oZWlnaHQgICAgICcsIHdpbmRvdy5zY3JlZW4uaGVpZ2h0XG4jIGRlYnVnICfCqVlEYkczJywgJ3dpbmRvdy5zY3JlZW4ubGVmdCAgICAgICAnLCB3aW5kb3cuc2NyZWVuLmxlZnRcbiMgZGVidWcgJ8KpajBRWEsnLCAnd2luZG93LnNjcmVlbi5vcmllbnRhdGlvbicsIHdpbmRvdy5zY3JlZW4ub3JpZW50YXRpb25cbiMgZGVidWcgJ8Kpd0VVcUInLCAnd2luZG93LnNjcmVlbi5waXhlbERlcHRoICcsIHdpbmRvdy5zY3JlZW4ucGl4ZWxEZXB0aFxuIyBkZWJ1ZyAnwqlHNVFWMycsICd3aW5kb3cuc2NyZWVuLnRvcCAgICAgICAgJywgd2luZG93LnNjcmVlbi50b3BcbiMgZGVidWcgJ8KpN0txZnYnLCAnd2luZG93LnNjcmVlbi53aWR0aCAgICAgICcsIHdpbmRvdy5zY3JlZW4ud2lkdGhcblxuIyAjLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgd2luLm9uICdyZXNpemUnLCAtPlxuIyAgIGluZm8gXCJyZXNpemVkIHRvICN7d2luLndpZHRofSB4ICN7d2luLmhlaWdodH1cIlxuXG4jICMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyB3aW4ub24gJ21vdmUnLCAtPlxuIyAgIGluZm8gXCJtb3ZlZCB0byAje3dpbi54fSwgI3t3aW4ueX1cIlxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbk1LVFMuZ2V0X2RvY3VtZW50X3NpemUgPSAoIG1lICkgLT4gWyAoICQgJ2h0bWwnICkub3V0ZXJXaWR0aCgpLCAoICQgJ2h0bWwnICkub3V0ZXJIZWlnaHQoKSwgXVxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbk1LVFMubWF4aW1pemUgPSAoIGFwcCApIC0+XG4gIHdpbi5tb3ZlVG8gICB3aW5kb3cuc2NyZWVuLmF2YWlsTGVmdCwgIHdpbmRvdy5zY3JlZW4uYXZhaWxUb3BcbiAgd2luLnJlc2l6ZVRvIHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCwgd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodFxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbk1LVFMud2FpdCA9ICggaGFuZGxlciApIC0+XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgLT4gaGFuZGxlcigpXG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuTUtUUy50YWtlX3NjcmVlbnNob3QgPSAtPlxuICBzdGVwICggcmVzdW1lICkgPT5cbiAgICAjIyMgdHJ5aW5nIHRvIHdhaXQgZm9yIERPTSByZWZsb3c6ICMjI1xuICAgICMgeWllbGQgc3RlcC53cmFwIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIHJlc3VtZVxuICAgIHlpZWxkIE1LVFMud2FpdCByZXN1bWVcbiAgICAjIGhlbHAgJ2FuaW1hdGlvbiBmcmFtZSdcbiAgICBpbWcgICAgICAgPSB5aWVsZCBNS1RTLl9jYXB0dXJlIHdpbiwgcmVzdW1lXG4gICAgaW1nX3JvdXRlID0gJy90bXAvbncucG5nJ1xuICAgIHlpZWxkIG5qc19mcy53cml0ZUZpbGUgaW1nX3JvdXRlLCBpbWcsIHJlc3VtZVxuICAgIGhlbHAgXCJpbWFnZSB3cml0dGVuIHRvICN7aW1nX3JvdXRlfVwiXG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuTUtUUy5zY3JvbGxfdG8gPSAoIGxhYmVsICkgLT5cbiAgIyBsb2cgJ8KpUmFmYmMnLCAoICQgJyNib3R0b20nICkub2Zmc2V0XG4gICggJCAnaHRtbCwgYm9keScgKS5zdG9wKCkuYW5pbWF0ZSB7IHNjcm9sbFRvcDogKCAkIGxhYmVsICkub2Zmc2V0KCkudG9wIH0sIDUwMFxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbk1LVFMuc2Nyb2xsX3RvX3RvcCAgICA9IC0+IEBzY3JvbGxfdG8gJyNta3RzLXRvcCdcbk1LVFMuc2Nyb2xsX3RvX2JvdHRvbSA9IC0+IEBzY3JvbGxfdG8gJyNta3RzLWJvdHRvbSdcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5NS1RTLl9jYXB0dXJlID0gKCB3aW4sIGhhbmRsZXIgKSAtPlxuICB3aW4uY2FwdHVyZVBhZ2UgKCAoIGltZyApID0+IGhhbmRsZXIgbnVsbCwgaW1nICksIGZvcm1hdDogJ3BuZycsIGRhdGF0eXBlOiAnYnVmZmVyJ1xuXG5kZW1vX2NvdW50ID0gMFxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5NS1RTLmRlbW8gPSAoIG1lICkgLT5cbiAgZGVidWcgJ8KpaU5sMkYnLCAnZGVtbydcbiAgIyBzb3VyY2UgPSBcIlwiXCI8ZW0+QWI8eHNtYWxsPmM8L3hzbWFsbD5kPHhiaWc+ZTwveGJpZz5mZmlWQTwvZW0+XCJcIlwiXG4gICMgc291cmNlID0gXCJcIlwiWHh4eHh4eHh4eHh4eHh4eCwgc2hlIG5vdGljZWQgeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4XCJcIlwiXG4gICMgc291cmNlID0gXCJcIlwiXG5cblxuICAjICAgIyBCZWhpbmQgdGhlIExvb2tpbmctR2xhc3NcbiAgIyAgICdCdXQgZXZlcnl0aGluZydzIGN1cmlvdXMgdG9kYXkuIEkgdGhpbmsgSSBtYXkgYXMgd2VsbCBnbyBpbiBhdCBvbmNlLicgQW5kIGluXG4gICMgICBzaGUgd2VudC5cblxuICAjICAgIyBCZWhpbmQgdGhlIExvb2tpbmctR2xhc3NcblxuICAjICAgSnVzdCBhcyBzaGUgc2FpZCB0aGlzLCBzaGUgbm90aWNlZCB0aGF0IG9uZSBvZiB0aGUgdHJlZXMgaGFkIGEgZG9vclxuICAjICAgbGVhZGluZyByaWdodCBpbnRvIGl0LiAnVGhhdCdzIHZlcnkgY3VyaW91cyEnIHNoZSB0aG91Z2h0LiAnQnV0XG4gICMgICBldmVyeXRoaW5nJ3MgPHhiaWc+Y3VyaW91czwveGJpZz4gdG9kYXkuIEkgdGhpbmsgSSBtYXkgYXMgd2VsbCBnbyBpbiBhdCBvbmNlLicgQW5kIGluXG4gICMgICBzaGUgd2VudC5cblxuICAjICAg5LiK5Y+k5pmC5pyf55qE6LaK5Y2X6Kqe5b6I5Y+v6IO95YW35pyJ5Y2X5Lqe6Kqe57O75YW25LuW6Kqe6KiA54++5Zyo5YW35pyJ55qE5LiA5Lqb5YWx5ZCM54m55b6177yM5L6L5aaC5Zyo5bGI5oqY5pa56Z2i6LyD55m86YGU77yM5YW35pyJ6LGQ5a+M55qE6KSH6LyU6Z+z562J44CC6YCZ5Lqb54m55b615bey5LiN5YaN5a2Y5pa854++5Luj55qE6LaK5Y2X6Kqe5Lit77yM5pOa6KqN54K65piv55Sx5pa86LaK5Y2X6Kqe5Zyw6JmV5p2x5Y2X5Lqe55qE4oCc6Kqe6KiA6IGv55uf4oCd5Lit77yM5Y+X5Yiw5ZGo6YKK5pyJ6IGy6Kq/55qE5a2k56uL6Kqe55qE5b2x6Z+/77yM5Lmf6K6K5oiQ5LqG5LiA56iu5pyJ6IGy6Kq/55qE5a2k56uL6Kqe44CC5b2i5oWL5LiK55qE5a2k56uL5ZKM6IGy6Kq/55qE5a2Y5Zyo5Y+v6IO95Lim6Z2e5L6G5rqQ6Ieq5Y6f5aeL5Y2X5Lqe6Kqe77yM5ZGo6YKK55qE54Sh6Kaq5bGs6Zec5L+C55qE6Kqe6KiA77yM5L6L5aaC5aOv5L6X6Kqe57O755qE5rOw6Kqe5ZKM5Y2X5bO26Kqe57O755qE5Zue6Lyd6Kmx77yM5Lmf6YO95YW35pyJ6IGy6Kq/44CCXG5cbiAgIyAgIEp1c3QgYXMgc2hlzIEgc2FpZCB0aGlzLCBzaGUgZmx1ZmZpICpub3RpY2VkKiB0aGF0XG4gICMgICBvbmUgb2YgdGhlIHRyZWVzIGhhZCBhIGRvb3JcbiAgIyAgIGxlYWRpbmcgcmlnaHQgaW50byBpdC4gJ1RoYXQncyB2ZXJ5IGN1cmlvdXMhJyBzaGUgdGhvdWdodC5cblxuICAjICAgSnVzdCBhcyBzaGXMgSBzYWlkIHRoaXMsIHNoZSBmbHVmZmkgKm5vdGljZWQqIHRoYXRcbiAgIyAgIG9uZSBvZiB0aGUgdHJlZXMgaGFkIGEgZG9vclxuICAjICAgbGVhZGluZyByaWdodCBpbnRvIGl0LiAnVGhhdCdzIHZlcnkgY3VyaW91cyEnIHNoZSB0aG91Z2h0LlxuXG4gICMgICBKdXN0IGFzIHNoZcyBIHNhaWQgdGhpcywgc2hlIGZsdWZmaSAqbm90aWNlZCogdGhhdFxuICAjICAgb25lIG9mIHRoZSB0cmVlcyBoYWQgYSBkb29yXG4gICMgICBsZWFkaW5nIHJpZ2h0IGludG8gaXQuICdUaGF0J3MgdmVyeSBjdXJpb3VzIScgc2hlIHRob3VnaHQuXG5cbiAgIyAgIEp1c3QgYXMgc2hlzIEgc2FpZCB0aGlzLCBzaGUgZmx1ZmZpICpub3RpY2VkKiB0aGF0XG4gICMgICBvbmUgb2YgdGhlIHRyZWVzIGhhZCBhIGRvb3JcbiAgIyAgIGxlYWRpbmcgcmlnaHQgaW50byBpdC4gJ1RoYXQncyB2ZXJ5IGN1cmlvdXMhJyBzaGUgdGhvdWdodC5cbiAgIyAgIFwiXCJcIlxuICAjIHNvdXJjZSA9IFwib25lIDx4YmlnPmxpbmU8L3hiaWc+XFxuXFxuXCIgKyAgc291cmNlWyAuLiA1MDAgXSArICggJ2RkZCcgZm9yIGkgaW4gWyAwIC4uIDE1MCBdICkuam9pbiAnICdcbiAgIyBkZW1vX2NvdW50ICs9ICsxXG4gICMgaWYgZGVtb19jb3VudCBpcyAxXG4gICMgICBzb3VyY2UgPSBcIlwiXCJcbiAgIyAgICAgIyBUZXN0XG5cbiAgIyAgICAganVzdCBhICoqdGVzdCoqLiAqZmZpKi4gYWJjZGVmZ2hpamtsbSBRIFF1IFF1ZWVuIHRoZSBtb3N0IHVuYmVsaWV2YWJsZSBzdG9yeS5cIlwiXCJcbiAgIyBkZWJ1ZyAnwql1dkw1dCcsIHNvdXJjZS5sZW5ndGhcbiAgIyBzb3VyY2UgPSBcIkp1c3QgYXMgc2hlzIEgc2FpZCB0aGlzLCBzaGUgZmx1ZmZpICpub3RpY2VkKiB0aGF0IGFiYyBkZWYgZ2hpIGprbCBtbm8gcHFyIHN0dSB2d3ggeHlcIlxuICBzb3VyY2UgPSBcIlwiXCJcblxuXG4gICAgJ0J1dCBldmVyeXRoaW5nJ3MgY3VyaW91cyB0b2RheS4gSSB0aGluayBJIG1heSBhcyB3ZWxsIGdvIGluIGF0IG9uY2UuJyBBbmQgaW5cbiAgICBzaGUgd2VudC54eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHggYW5kIHNvIG9uLlxuXG4gICAgYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJcblxuICAgIFNob3J0IHBhcmFncmFwaC5cblxuICBcIlwiXCJcblxuICAgICMgc3VwZXJjYWxpZnJhZ2lsaXN0aWNleHBpYWxpZ29yaWNhbHN1cGVyY2FsaWZyYWdpbGlzdGljZXhwaWFsaWdvcmljYWxcblxuICAgICMgU2VkdXRwZXJzcGljaWF0aXN1bmRlb21uaXNpc3RlbmF0dXNlcnJvcnNpdHZvbHVwdGF0ZW1hY2N1c2FudGl1bWRvbG9yZW1xdWVsYXVkYW50aXVtLHRvdGFtcmVtYXBlcmlhbSxlYXF1ZWlwc2FxdWFlYWJpbGxvaW52ZW50b3JldmVyaXRhdGlzZXRxdWFzaWFyY2hpdGVjdG9iZWF0YWV2aXRhZWRpY3RhIHN1bnQgZXhwbGljYWJvLlxuXG4gICAgIyAjIEJlaGluZCB0aGUgTG9va2luZy1HbGFzc1xuXG5cbiAgICAjIFRoZSBLaW5nIGFuZCBRdWVlbiBvZiBIZWFydHMgd2VyZSA8eGJpZz5zZWF0ZWQ8L3hiaWc+IG9uIHRoZWlyIHRocm9uZSB3aGVuIHRoZXlcbiAgICAjIGFycml2ZWQsIHdpdGggYSBncmVhdCBjcm93ZCBhc3NlbWJsZWQgYWJvdXQgdGhlbS0tYWxsIHNvcnRzIG9mIGxpdHRsZVxuICAgICMgYmlyZHMgYW5kIGJlYXN0cy5cblxuICAgICMgVGhlcmUgd2FzIG5vdGhpbmcgc28gVkVSWSByZW1hcmthYmxlIGluIHRoYXQ7IG5vciBkaWQgQWxpY2UgdGhpbmsgaXQgc29cbiAgICAjIFZFUlkgbXVjaCBvdXQgb2YgdGhlIHdheSB0byBoZWFyIHRoZSBSYWJiaXQgc2F5IHRvIGl0c2VsZiwgJ09oIGRlYXIhXG4gICAgIyBPaCBkZWFyISBJIHNoYWxsIGJlIGxhdGUhJyAod2hlbiBzaGUgdGhvdWdodCBpdCBvdmVyIGFmdGVyd2FyZHMsIGl0XG4gICAgIyBvY2N1cnJlZCB0byBoZXIgdGhhdCBzaGUgb3VnaHQgdG8gaGF2ZSB3b25kZXJlZCBhdCB0aGlzLCBidXQgYXQgdGhlIHRpbWVcbiAgICAjIGl0IGFsbCBzZWVtZWQgcXVpdGUgbmF0dXJhbCk7IGJ1dCB3aGVuIHRoZSBSYWJiaXQgYWN0dWFsbHkgVE9PSyBBIFdBVENIXG4gICAgIyBPVVQgT0YgSVRTIFdBSVNUQ09BVC1QT0NLRVQsIGFuZCBsb29rZWQgYXQgaXQsIGFuZCB0aGVuIGh1cnJpZWQgb24sXG4gICAgIyBBbGljZSBzdGFydGVkIHRvIGhlciBmZWV0LCBmb3IgaXQgZmxhc2hlZCBhY3Jvc3MgaGVyIG1pbmQgdGhhdCBzaGUgaGFkXG4gICAgIyBuZXZlciBiZWZvcmUgc2VlbiBhIHJhYmJpdCB3aXRoIGVpdGhlciBhIHdhaXN0Y29hdC1wb2NrZXQsIG9yIGEgd2F0Y2hcbiAgICAjIHRvIHRha2Ugb3V0IG9mIGl0LCBhbmQgYnVybmluZyB3aXRoIGN1cmlvc2l0eSwgc2hlIHJhbiBhY3Jvc3MgdGhlIGZpZWxkXG4gICAgIyBhZnRlciBpdCwgYW5kIGZvcnR1bmF0ZWx5IHdhcyBqdXN0IGluIHRpbWUgdG8gc2VlIGl0IHBvcCBkb3duIGEgbGFyZ2VcbiAgICAjIHJhYmJpdC1ob2xlIHVuZGVyIHRoZSBoZWRnZS5cblxuXG4gICAgIyAnQ29tZSwgdGhlcmUncyBubyB1c2UgaW4gY3J5aW5nIGxpa2UgdGhhdCEnIHNhaWQgQWxpY2UgdG8gaGVyc2VsZixcbiAgICAjIHJhdGhlciBzaGFycGx5OyAnSSBhZHZpc2UgeW91IHRvIGxlYXZlIG9mZiB0aGlzIG1pbnV0ZSEnIFNoZSBnZW5lcmFsbHlcbiAgICAjIGdhdmUgaGVyc2VsZiB2ZXJ5IGdvb2QgYWR2aWNlLCAodGhvdWdoIHNoZSB2ZXJ5IHNlbGRvbSBmb2xsb3dlZCBpdCksXG4gICAgIyBhbmQgc29tZXRpbWVzIHNoZSBzY29sZGVkIGhlcnNlbGYgc28gc2V2ZXJlbHkgYXMgdG8gYnJpbmcgdGVhcnMgaW50b1xuICAgICMgaGVyIGV5ZXM7IGFuZCBvbmNlIHNoZSByZW1lbWJlcmVkIHRyeWluZyB0byBib3ggaGVyIG93biBlYXJzIGZvciBoYXZpbmdcbiAgICAjIGNoZWF0ZWQgaGVyc2VsZiBpbiBhIGdhbWUgb2YgY3JvcXVldCBzaGUgd2FzIHBsYXlpbmcgYWdhaW5zdCBoZXJzZWxmLFxuICAgICMgZm9yIHRoaXMgY3VyaW91cyBjaGlsZCB3YXMgdmVyeSBmb25kIG9mIHByZXRlbmRpbmcgdG8gYmUgdHdvIHBlb3BsZS5cbiAgICAjICdCdXQgaXQncyBubyB1c2Ugbm93LCcgdGhvdWdodCBwb29yIEFsaWNlLCAndG8gcHJldGVuZCB0byBiZSB0d28gcGVvcGxlIVxuICAgICMgV2h5LCB0aGVyZSdzIGhhcmRseSBlbm91Z2ggb2YgbWUgbGVmdCB0byBtYWtlIE9ORSByZXNwZWN0YWJsZSBwZXJzb24hJ1xuXG5cblxuXG4gICMgc291cmNlID0gXCJcIlwiXG4gICMgICA8a3dpYy1saW5ldXA+MSDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjIg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD4zIOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+NCDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjUg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD42IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+NyDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjgg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD45IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+MTAg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD4xMSDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjEyIOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+MTMg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD4xNCDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjE1IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+MTYg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD4xNyDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjE4IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+MTkg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD4yMCDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjIxIOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+MjIg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD4yMyDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjI0IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+MjUg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD4yNiDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjI3IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+Mjgg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD4yOSDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjMwIOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+MzEg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD4zMiDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjMzIOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+MzQg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD4zNSDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjM2IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+Mzcg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD4zOCDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjM5IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+NDAg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD40MSDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjQyIOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+NDMg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD40NCDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjQ1IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+NDYg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD40NyDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjQ4IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+NDkg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD41MCDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjUxIOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+NTIg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD41MyDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjU0IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+NTUg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD41NiDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjU3IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+NTgg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD41OSDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjYwIOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+NjEg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD42MiDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjYzIOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+NjQg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD42NSDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgPGt3aWMtbGluZXVwPjY2IOS4reWci+eah+W4nTwva3dpYy1saW5ldXA+XG4gICMgICA8a3dpYy1saW5ldXA+Njcg5Lit5ZyL55qH5bidPC9rd2ljLWxpbmV1cD5cbiAgIyAgIDxrd2ljLWxpbmV1cD42OCDkuK3lnIvnmofluJ08L2t3aWMtbGluZXVwPlxuICAjICAgXCJcIlwiXG4gICMgc291cmNlID0gcmVxdWlyZSAnLi9kZW1vLXRleHQnXG4gICMgc291cmNlID0gbmpzX2ZzLnJlYWRGaWxlU3luYyAnL3RtcC9rd2ljLmh0bWwnLCBlbmNvZGluZzogJ3V0Zi04J1xuICAjIHNvdXJjZSA9ICggKCBpZiBsaW5lLmxlbmd0aCBpcyAwIG9yIGxpbmUgaXMgJ2BgYCcgdGhlbiBsaW5lIGVsc2UgXCIje2xpbmV9PCEtLSMje2lkeH0tLT5cIiApIGZvciBsaW5lLCBpZHggaW4gc291cmNlLnNwbGl0ICdcXG4nICkuam9pbiAnXFxuJ1xuICBoZWxwIFwic291cmNlOiBhcHByb3guICN7c291cmNlLmxlbmd0aH0gY2hhcmFjdGVyc1wiXG4gIHNldHRpbmdzID1cbiAgICAjICdmb3JtYXQnOiAgICdodG1sJ1xuICAgICdmb3JtYXQnOiAgICdtZCdcbiAgc3RlcCAoIHJlc3VtZSApID0+XG4gICAgIyB5aWVsZCBNS1RTLlZJRVcuc2hvd19nYWxsZXkgcmVzdW1lXG4gICAgeWllbGQgTElORVNFVFRFUi5kZW1vIG1lLCBzb3VyY2UsIHNldHRpbmdzLCByZXN1bWVcbiAgICAjIE1LVFMucmV2ZXJ0X3pvb20gbWVcbiAgICBoZWxwIFwiTUtUUy5kZW1vIG9rXCJcbiAgcmV0dXJuIG51bGxcblxuXG5cblxuIyMjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAgIyMjXG4jIyMgICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjIyNcbiMjIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgICMjI1xuIyMjICAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyMjXG4jIyMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICAjIyNcbiMjIyAgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMjI1xuIyMjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAgIyMjXG4jIyMgICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjICMgIyAjIyNcblxuIyMjIFRBSU5UIHNob3VsZCBsaXZlIGluIGl0cyBvd24gbW9kdWxlICMjI1xuIyMjIFRBSU5UIGNvbnNpZGVyIHVzaW5nIGUuZy4gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvY29tYm9rZXlzICMjI1xuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5rZXljb2RlcyA9IHJlcXVpcmUgJy4vQkxBSURERFJXRy1rZXljb2RlcydcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5iaW5kaW5ncyA9XG4gICMgJ21ldGErcGx1cyc6ICAgICAgICAgICAgLT4gTUtUUy5aT09NLmJ5IDEgKiBhcHBbICd6b29tLWRlbHRhLWZhY3RvcicgXVxuICAjICdtZXRhK21pbnVzJzogICAgICAgICAgIC0+IE1LVFMuWk9PTS5ieSAxIC8gYXBwWyAnem9vbS1kZWx0YS1mYWN0b3InIF1cbiAgIyAnbWV0YSswJzogICAgICAgICAgICAgICAtPiBNS1RTLlpPT00udG8gMVxuICAnaCc6ICAgICAgICAgICAgICAgICAgICAtPiBNS1RTLnRvZ2dsZV90b29sX21vZGUgJ2hhbmQnXG4gICMgJ2cnOiAgICAgICAgICAgICAgICAgICAgLT4gTUtUUy5WSUVXLnRvZ2dsZV9nYWxsZXkoKVxuICAjICdtZXRhK3NoaWZ0K2FzdGVyaXNrJzogIC0+IE1LVFMuem9vbSBhcHAsICswLjFcbiAgIyAnbWV0YStzaGlmdCttaW51cyc6ICAgICAtPiBNS1RTLnpvb20gYXBwLCAtMC4xXG4gICdtZXRhK2xlZnQnOiAgICAgICAgICAgIC0+IE1LVFMuc2Nyb2xsX3RvX3RvcCgpXG4gICdtZXRhK3JpZ2h0JzogICAgICAgICAgIC0+IE1LVFMuc2Nyb2xsX3RvX2JvdHRvbSgpXG4gICMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgIyAnbWV0YStwJzogICAgICAgICAgICAgICAtPiBNS1RTLnByaW50KClcbiAgIyAnbWV0YStzaGlmdCtwJzogICAgICAgICAtPiBNS1RTLm9wZW5fcHJpbnRfZGlhbG9nKClcbiAgIyAnbWV0YStyJzogICAgICAgICAgICAgICAtPiBNS1RTLnJlbG9hZCgpXG4gICMgJ21ldGErcSc6ICAgICAgICAgICAgICAgLT4gTUtUUy50YWtlX3NjcmVlbnNob3QoKVxuICAjICdtZXRhK3knOiAgICAgICAgICAgICAgIC0+IE1LVFMuZGVtbygpXG4gICMgJ21ldGEreCc6ICAgICAgICAgICAgICAgLT4gTElORVNFVFRFUi5fZGVtb19wb3Bfb3ZlcigpXG4gICdtZXRhK3gnOiAgICAgICAgICAgICAgIC0+IExJTkVTRVRURVIuX2RlbW9fcG9wX292ZXJfYXN5bmMoKVxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbk1LVFMub25fa2V5ZG93biA9ICggZXZlbnQgKSAtPlxuICBjb2RlICAgICAgPSBldmVudC5rZXlDb2RlID8gZXZlbnQud2hpY2hcbiAga2V5X25hbWUgID0gW11cbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICBrZXlfbmFtZS5wdXNoICdhbHQnICAgaWYgZXZlbnQuYWx0S2V5XG4gIGtleV9uYW1lLnB1c2ggJ2N0cmwnICBpZiBldmVudC5jdHJsS2V5XG4gIGtleV9uYW1lLnB1c2ggJ21ldGEnICBpZiBldmVudC5tZXRhS2V5XG4gIGtleV9uYW1lLnB1c2ggJ3NoaWZ0JyBpZiBldmVudC5zaGlmdEtleVxuICBrZXlfbmFtZS5wdXNoICgga2V5Y29kZXMuZ2V0IGNvZGUgKSA/IGNvZGVcbiAga2V5X25hbWUgID0ga2V5X25hbWUuam9pbiAnKydcbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICBlY2hvICggcnByIGtleV9uYW1lICksIGNvZGVcbiAgaWYgKCBiaW5kaW5nID0gYmluZGluZ3NbIGtleV9uYW1lIF0gKT9cbiAgICBiaW5kaW5nKClcbiAgICByZXR1cm4gZmFsc2VcbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICBlbHNlXG4gICAgcmV0dXJuIHRydWVcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5NS1RTLnRvZ2dsZV90b29sX21vZGUgPSAoIG1vZGUgKSAtPlxuICByZXR1cm4gQHBvcF90b29sX21vZGUoKSBpZiAoIENORC5sYXN0X29mIGFwcFsgJ3Rvb2wtbW9kZXMnIF0gKSBpcyBtb2RlXG4gIHJldHVybiBAcHVzaF90b29sX21vZGUgbW9kZVxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbk1LVFMucHVzaF90b29sX21vZGUgPSAoIG1vZGUgKSAtPlxuICBkZWJ1ZyAnwqkycnlxOScsIGFwcFsgJ3Rvb2wtbW9kZXMnIF1cbiAgYXBwWyAndG9vbC1tb2RlcycgXS5wdXNoIG1vZGUgdW5sZXNzICggQ05ELmxhc3Rfb2YgYXBwWyAndG9vbC1tb2RlcycgXSApIGlzIG1vZGVcbiAgYXBwWyAndG9vbC1tb2RlcycgXS5zaGlmdCgpIGlmIGFwcFsgJ3Rvb2wtbW9kZXMnIF0ubGVuZ3RoID4gMTBcbiAgIyAoICQgJ2JvZHknICkuY3NzICdjdXJzb3InLCAndXJsKC4vaWNvbnMvbWt0cy10b29sLWhhbmQucG5nKSdcbiAgIyAoICQgJ2JvZHknICkuYXR0ciAnc3R5bGUnLCAnY3Vyc29yOnVybCguL2ljb25zL21rdHMtdG9vbC1oYW5kLWN1cnNvci5wbmcpLCBhdXRvOydcbiAgIyMjIFRBSU5UIG11c3Qgc3dhcCBjbGFzc2VzICMjI1xuICAjIyMgVEFJTlQgaG93IHRvIG1ha2UgY3Vyc29yIHZpc2libGUgYWZ0ZXIgY2hhbmdlPyAjIyNcbiAgKCAkICdib2R5JyApLmFkZENsYXNzICdjdXJzb3ItaGFuZCdcbiAgIyAoICQgYXBwWyAnZG9jdW1lbnQnIF0gKS50cmlnZ2VyICdtb3VzZW1vdmUnXG4gIHJldHVybiBtb2RlXG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuTUtUUy5wb3BfdG9vbF9tb2RlID0gLT5cbiAgZGVidWcgJ8KpMnJ5cTknLCBhcHBbICd0b29sLW1vZGVzJyBdXG4gIGlmIGFwcFsgJ3Rvb2wtbW9kZXMnIF0ubGVuZ3RoIDwgMVxuICAgIFIgPSBhcHBbICd0b29sLW1vZGVzLWRlZmF1bHQnIF1cbiAgZWxzZVxuICAgIFIgPSBhcHBbICd0b29sLW1vZGVzJyBdLnBvcCgpXG4gICMjIyBUQUlOVCBtdXN0IHN3YXAgY2xhc3NlcyAjIyNcbiAgKCAkICdib2R5JyApLnJlbW92ZUNsYXNzICdjdXJzb3ItaGFuZCdcbiAgcmV0dXJuIFJcblxuIy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5NS1RTLmVuYWJsZV9jb25zb2xlID0gKCBzZWxlY3RvciA9ICcjY29uc29sZScgKSAtPlxuICBjb25zb2xlID0gJCAnI2NvbnNvbGUnXG4gIHJldHVybiB1bmxlc3MgY29uc29sZS5sZW5ndGggPiAwXG4gIF93cml0ZSAgPSBwcm9jZXNzLnN0ZGVyci53cml0ZS5iaW5kIHByb2Nlc3Muc3RkZXJyXG4gIHByb2Nlc3Muc3RkZXJyLndyaXRlID0gKCBQLi4uICkgLT5cbiAgICAgICMgcHJvY2Vzcy5zdGRvdXQud3JpdGUgJyoqKicgKyBQWyAwIF1cbiAgICAgIFsgdGV4dCwgLi4uIF0gPSBQXG4gICAgICBsaW5lcyA9ICggdGV4dC5yZXBsYWNlIC9cXG4kLywgJycgKS5zcGxpdCAnXFxuJ1xuICAgICAgZm9yIGxpbmUgaW4gbGluZXNcbiAgICAgICAgY29uc29sZS5hcHBlbmQgJCBcIjxkaXY+I3tDTkQuQU5TSS5hc19odG1sIHRleHR9PC9kaXY+XCJcbiAgICAgICAgY29uc29sZS5zdG9wKCkuYW5pbWF0ZSB7IHNjcm9sbFRvcDogKCAkICcjY29uc29sZS1ib3R0b20nICkub2Zmc2V0KClbICd0b3AnIF0gfSwgNTAwXG4gICAgICAgICMgY29uc29sZS5zY3JvbGxUb3AgKCAkICcjY29uc29sZS1ib3R0b20nICkub2Zmc2V0KClbICd0b3AnIF1cbiAgICAgIF93cml0ZSBQLi4uXG4gIHJldHVybiBudWxsXG5cbiMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxud2luLm9uICd6b29tJywgLT5cbiAgTUtUUy5HQVVHRS5zZXRfcmF0aW9zIGFwcFxuXG4jLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbndpbi5vbiAnZG9jdW1lbnQtZW5kJywgLT5cbiAgIyBkZXZfd2luID0gd2luLnNob3dEZXZUb29scygpXG4gICMgZGV2X3dpbi5tb3ZlVG8gMTIwMCwgODQ4XG4gICMgZGV2X3dpbi5tYXhpbWl6ZSgpXG4gICMgZGV2X3dpbi5ibHVyKClcbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICBzaG93X3NwbGFzaCA9IG5vXG4gIGlmIHNob3dfc3BsYXNoXG4gICAgYWZ0ZXIgMiwgLT5cbiAgICAgIHdpbi5zaG93KClcbiAgICAgIHNwbGFzaF93aW4uZm9jdXMoKVxuICAgIGFmdGVyIDMsIC0+XG4gICAgICB3aW4uZm9jdXMoKVxuICAgIGFmdGVyIDQsIC0+XG4gICAgICBzcGxhc2hfd2luLmhpZGUoKVxuICBlbHNlXG4gICAgICBzcGxhc2hfd2luLmhpZGUoKVxuICAgICAgd2luLnNob3coKVxuICAgICAgd2luLmZvY3VzKClcbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICBhcHBbICdhcnRib2FyZCcgXSA9ICQgJ2FydGJvYXJkJ1xuICBhcHBbICd6b29tZXInICAgXSA9ICQgJ3pvb21lcidcbiAgTUtUUy5lbmFibGVfY29uc29sZSgpXG4gIHN0ZXAgKCByZXN1bWUgKSAtPlxuICAgICMgTUtUUy5tYXhpbWl6ZSBhcHBcbiAgICAjIE1LVFMuWk9PTS50byBhcHAsIDEuODVcbiAgICB3aW4uem9vbUxldmVsID0gMVxuICAgICMgTUtUUy5aT09NLnRvIGFwcFsgJ3pvb20nIF1cbiAgICB5aWVsZCBzdGVwLndyYXAgKCAkIGRvY3VtZW50ICkucmVhZHksIHJlc3VtZVxuICAgIGhlbHAgXCJkb2N1bWVudCByZWFkeVwiXG4gICAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cbiAgICAoICQgZG9jdW1lbnQgKS5rZXlkb3duIE1LVFMub25fa2V5ZG93bi5iaW5kIE1LVFNcbiAgIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuICByZXR1cm4gbnVsbFxuXG4jIyNcblxue1xuICBcIm5hbWVcIjogXCJtaW5na3dhaVwiLFxuICBcIm1haW5cIjogXCJsaWIvaW5kZXguaHRtbFwiLFxuICBcInZlcnNpb25cIjogXCIwLjEuMFwiLFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcIm5vZGUtd2Via2l0XCIsXG4gICAgXCJ0eXBlc2V0dGluZ1wiLFxuICAgIFwiQ2hpbmVzZVwiLFxuICAgIFwiSmFwYW5lc2VcIixcbiAgICBcIkNKS1wiLFxuICAgIFwidHlwb2dyYXBoeVwiXG4gIF0sXG4gIFwiY2hyb21pdW0tYXJnc1wiOiBcIi0tZW5hYmxlLXJlbW90ZS1mb250cyAtLWVuYWJsZS1yZWdpb24tYmFzZWQtY29sdW1ucyAtLWVuYWJsZS13ZWJraXQtdGV4dC1zdWJwaXhlbC1wb3NpdGlvbmluZyAtLWVuYWJsZS1kZXZ0b29scy1leHBlcmltZW50cyAtLWVuYWJsZS1leHBlcmltZW50YWwtd2ViLXBsYXRmb3JtLWZlYXR1cmVzIC0tZW5hYmxlLXNtb290aC1zY3JvbGxpbmcgLS1kaXNhYmxlLWFjY2VsZXJhdGVkLXZpZGVvIC0tZW5hYmxlLXdlYmdsIC0tZW5hYmxlLXdlYmF1ZGlvIC0taWdub3JlLWdwdS1ibGFja2xpc3QgLS1mb3JjZS1jb21wb3NpdGluZy1tb2RlIC0tcmVtb3RlLWRlYnVnZ2luZy1wb3J0PTEwMTM4IC0taGFybW9ueVwiLFxuICBcInNpbmdsZS1pbnN0YW5jZVwiOiB0cnVlLFxuICBcIm5vLWVkaXQtbWVudVwiOiBmYWxzZSxcbiAgXCJ3aW5kb3dcIjoge1xuICAgIFwieFwiOiAwLFxuICAgIFwieVwiOiAyMCxcbiAgICBcIndpZHRoXCI6IDEyMDAsXG4gICAgXCJoZWlnaHRcIjogODAwLFxuICAgIFwic2hvd1wiOiBmYWxzZSxcbiAgICBcInNob3dfaW5fdGFza2JhclwiOiB0cnVlLFxuICAgIFwiZm9jdXNcIjogZmFsc2UsXG4gICAgXCJ0b29sYmFyXCI6IHRydWUsXG4gICAgXCJmcmFtZVwiOiB0cnVlLFxuICAgIFwiaWNvblwiOiBcIi4vZmF2aWNvbi5pY29cIixcbiAgICBcInBvc2l0aW9uXCI6IFwiY2VudGVyXCIsXG4gICAgXCJ0aXRsZVwiOiBcIuecgOW/q+aOkuWtl+aculwiLFxuICAgIFwicmVzaXphYmxlXCI6IHRydWVcbiAgfSxcbiAgXCJqcy1mbGFnc1wiOiBcIi0taGFybW9ueVwiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJhcHBsZXNjcmlwdFwiOiBcIl4xLjAuMFwiLFxuICAgIFwiY25kXCI6IFwiXjAuMS41XCIsXG4gICAgXCJjb2ZmZWVub2RlLWNoclwiOiBcIl4wLjEuNFwiLFxuICAgIFwiY29mZmVlbm9kZS1zdXNwZW5kXCI6IFwiXjAuMS40XCIsXG4gICAgXCJjb2ZmZWVub2RlLXRlYWN1cFwiOiBcIl4wLjEuMlwiLFxuICAgIFwibGluZWFyLWludGVycG9sYXRvclwiOiBcIl4xLjAuMlwiLFxuICAgIFwicGlwZWRyZWFtczJcIjogXCJeMC4yLjhcIixcbiAgICBcInN0eWx1c1wiOiBcIl4wLjQ5LjNcIlxuICB9XG59XG5cbiMjI1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIl19