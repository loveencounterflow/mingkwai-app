// Generated by CoffeeScript 1.9.0
(function() {
  var APPLESCRIPT, CHR, CND, D, D$, LINESETTER, MKTS, NW, after, alert, app, badge, bindings, build_menu, debug, echo, help, immediately, info, keycodes, log, njs_fs, njs_path, on_file_menu_what_you_should_know_C, rpr, sleep, splash_win, step, suspend, urge, warn, whisper, win, ƒ,
    __slice = [].slice;

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


  /* https://github.com/TooTallNate/node-applescript */

  APPLESCRIPT = require('applescript');

  ƒ = function(x, precision) {
    if (precision == null) {
      precision = 2;
    }
    return x.toFixed(precision);
  };


  /* see https://github.com/nwjs/nw.js/wiki/Window */

  splash_win = NW.Window.open('./splash.html', {
    "position": "center",
    "title": "眀快排字机",
    "width": 800,
    "height": 500,
    "frame": false,
    "toolbar": false,
    "transparent": true,
    "focus": true,
    "resizable": false,
    "show": true,
    "show_in_taskbar": true,
    "icon": "./favicon.ico"
  });

  app = {
    '%memo': {},
    'mm-per-px': 100 / 377.94791,
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
    'pages-last-scroll-xy': [0, 0]
  };


  /* Publish app so we have access to it in both the browser and the NodeJS contexts: */

  window['app'] = app;

  MKTS = (require('./MKTS'))(app);


  /* TAINT this line only for transition time: */

  app['MKTS'] = MKTS;

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
      label: 'Print...',
      key: 'p',
      modifiers: 'cmd-shift',
      click: function() {
        return MKTS.open_print_dialog(app);
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

  MKTS.demo_1 = function(me) {
    var md;
    md = "\n# Behind the Looking-Glass\n\nJust as she said this, she noticed that one of the trees had a door\nleading right into it. 'That's very curious!' she thought. 'But\neverything's curious today. I think I may as well go in at once.' And in\nshe went.";
    MKTS.zoom(me, 2);
    LINESETTER.demo_1(me, md, (function(_this) {
      return function(error) {
        MKTS.revert_zoom(me);
        return help("MKTS.demo ok");
      };
    })(this));
    return null;
  };

  MKTS.demo = function(me) {

    /* every&#8203;<cork></cork>­&shy;thing */

    /* every<cork></cork>­&shy;thing */
    var md;
    md = "Xxxxxxxxxxxxxxxx, she noticed xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    md = "\n# Behind the Looking-Glass\n\nJust as she said this, she noticedxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx that one of the trees had a door\nleading right into it. 'That's very curious!' she thought. 'But\n<span>every</span>&shy;<span>thing's </span>curious today. I think I may as well go in at once.' And in\nshe went.\n\n# Behind the Looking-Glass\n\nJust as she said this, she noticed that one of the trees had a door\nleading right into it. 'That's very curious!' she thought. 'But\neverything's <xbig>curious</xbig> today. I think I may as well go in at once.' And in\nshe went.\n\n上古時期的越南語很可能具有南亞語系其他語言現在具有的一些共同特徵，例如在屈折方面較發達，具有豐富的複輔音等。這些特徵已不再存於現代的越南語中，據認為是由於越南語地處東南亞的“語言聯盟”中，受到周邊有聲調的孤立語的影響，也變成了一種有聲調的孤立語。形態上的孤立和聲調的存在可能並非來源自原始南亞語，周邊的無親屬關係的語言，例如壯侗語系的泰語和南島語系的回輝話，也都具有聲調。\n";
    md = require('./demo-text');
    MKTS.VIEW.show_galley();
    LINESETTER.demo(me, md, (function(_this) {
      return function(error) {
        return help("MKTS.demo ok");
      };
    })(this));
    return null;
  };

  MKTS._detach_artboard = function(me) {

    /* TAINT `#mkts-top`, `#mkts-bottom` not honored; are they needed? */
    var artboard, body, contents;
    if (me['view-mode'] === 'print') {
      return;
    }
    body = $('body');
    artboard = $('artboard');
    contents = artboard.contents();
    artboard.detach();
    body.append(contents);
    me['%memo']['view-mode'] = {
      contents: contents,
      artboard: artboard,
      body: body
    };
    return null;
  };

  MKTS._reattach_artboard = function(me) {
    var artboard, body, contents, _ref;
    if (me['view-mode'] === 'dev') {
      return;
    }
    _ref = me['%memo']['view-mode'], contents = _ref.contents, artboard = _ref.artboard, body = _ref.body;
    delete me['%memo']['view-mode'];
    contents.detach();
    artboard.append(contents);
    body.append(artboard);
    return null;
  };

  MKTS.open_print_dialog = function(me) {
    this.switch_to_print_view(me);
    window.print();
    return this.switch_to_dev_view(me);
  };

  MKTS.open_save_dialog = function(me) {
    throw new Error("not implemented");
  };

  MKTS.save = function(me) {
    throw new Error("not implemented");
  };

  MKTS.open_print_preview = function(me) {
    var script;
    this.switch_to_print_view(me);

    /* thx to http://apple.stackexchange.com/a/36947/59895, http://www.jaimerios.com/?p=171 */
    script = "tell application \"System Events\"\n  tell process \"mingkwai\"\n    keystroke \"p\" using {shift down, command down}\n    repeat until exists window \"Print\"\n    end repeat\n    click menu button \"PDF\" of window \"Print\"\n    repeat until exists menu item \"Open PDF in Preview\" of menu 1 of menu button \"PDF\" of window \"Print\"\n    end repeat\n    click menu item \"Open PDF in Preview\" of menu 1 of menu button \"PDF\" of window \"Print\"\n  end tell\nend tell";
    return APPLESCRIPT.execString(script, (function(_this) {
      return function(error) {
        if (error != null) {
          throw error;
        }
        _this.switch_to_dev_view(me);
        return help("MKTS.open_print_preview: ok");
      };
    })(this));
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
    'meta+plus': function() {
      return MKTS.ZOOM.by(1 * app['zoom-delta-factor']);
    },
    'meta+minus': function() {
      return MKTS.ZOOM.by(1 / app['zoom-delta-factor']);
    },
    'meta+0': function() {
      return MKTS.ZOOM.to(1);
    },
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
    var binding, code, key_name, _ref, _ref1;
    code = (_ref = event.keyCode) != null ? _ref : event.which;
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
    key_name.push((_ref1 = keycodes.get(code)) != null ? _ref1 : code);
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
    var console, _write;
    if (selector == null) {
      selector = '#console';
    }
    console = $('#console');
    if (!(console.length > 0)) {
      return;
    }
    _write = process.stderr.write.bind(process.stderr);
    process.stderr.write = function() {
      var P, line, lines, text, _i, _len;
      P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      text = P[0];
      lines = (text.replace(/\n$/, '')).split('\n');
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        console.append($("<div>" + (CND.ANSI.as_html(text)) + "</div>"));
        console.stop().animate({
          scrollTop: ($('#console-bottom')).offset()['top']
        }, 500);
      }
      return _write.apply(null, P);
    };
    return null;
  };

  win.on('document-end', function() {
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
    app['artboard'] = $('artboard');
    app['zoomer'] = $('zoomer');
    MKTS.enable_console();
    step(function*(resume) {
      MKTS.maximize(app);
      win.zoomLevel = 3;
      MKTS.ZOOM.to(app['zoom']);
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
    "chromium-args": "--enable-region-based-columns --enable-webkit-text-subpixel-positioning --enable-devtools-experiments --enable-experimental-web-platform-features --enable-smooth-scrolling --disable-accelerated-video --enable-webgl --enable-webaudio --ignore-gpu-blacklist --force-compositing-mode --remote-debugging-port=10138 --harmony",
    "single-instance": true,
    "no-edit-menu": false,
    "window": {
      "x": 0,
      "y": 20,
      "width": 1200,
      "height": 800,
      "show": true,
      "show_in_taskbar": true,
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
      "pipedreams2": "^0.2.8",
      "stylus": "^0.49.3"
    }
  }
   */

}).call(this);
