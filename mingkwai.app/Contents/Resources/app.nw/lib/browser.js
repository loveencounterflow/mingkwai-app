// Generated by CoffeeScript 1.9.0
(function() {
  var CHR, CND, D2, LINESETTER, MKTS, NW, after, alert, app, badge, bindings, build_menu, debug, echo, help, info, keyboard, log, njs_fs, njs_path, on_file_menu_what_you_should_know_C, rpr, sleep, step, suspend, urge, warn, whisper, win, _demo;

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

  after = suspend.after;

  sleep = suspend.sleep;

  D2 = require('pipedreams2');

  CHR = require('coffeenode-chr');

  LINESETTER = require('./LINESETTER');

  MKTS = {};

  app = {
    'zoom-level': 0
  };

  on_file_menu_what_you_should_know_C = function() {
    return ($('#content')).text("Some kind of interesting stuff.");
  };

  build_menu = function() {
    var edit_menu_item, file_menu, file_menu_entry, help_menu, help_menu_entry, win_menu;
    help_menu = new NW.Menu();
    help_menu.append(new NW.MenuItem({
      label: 'about 眀快排字机'
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
    file_menu_entry = new NW.MenuItem({
      label: 'File',
      'submenu': file_menu
    });
    win_menu = new NW.Menu({
      type: 'menubar'
    });
    win_menu.createMacBuiltin('眀快排字机');
    win_menu.insert(file_menu_entry, 1);
    win_menu.append(help_menu_entry);
    win.menu = win_menu;
    edit_menu_item = win.menu.items[2];
    edit_menu_item.submenu.insert(new NW.MenuItem({
      label: 'xxxxxxxxx'
    }), 1);
    debug('©RsQep', edit_menu_item.type);
    return null;
  };

  build_menu();

  win.show();

  win.focus();

  win.zoomLevel = 0;

  win.setResizable(true);

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

  MKTS.zoom_to = function(me, level) {

    /* TAINT code duplication */
    var base_zoom_level, zoom_percent;
    base_zoom_level = -0.15;
    win.zoomLevel = level != null ? level : base_zoom_level;
    zoom_percent = (win.zoomLevel - base_zoom_level) * 1.2 * 100;
    echo("zoomed to level " + win.zoomLevel + " (" + (zoom_percent.toFixed(0)) + "%)");
    return win.zoomLevel;
  };

  MKTS.zoom = function(me, delta) {
    var base_zoom_level, zoom_percent;
    base_zoom_level = -0.15;
    if (delta != null) {
      if ((delta > 0 && win.zoomLevel <= 8.8) || (delta < 0 && win.zoomLevel >= -7.5)) {
        win.zoomLevel += delta;
      }
    } else {
      win.zoomLevel = base_zoom_level;
    }
    zoom_percent = (win.zoomLevel - base_zoom_level) * 1.2 * 100;
    echo("zoomed to level " + win.zoomLevel + " (" + (zoom_percent.toFixed(0)) + "%)");
    return win.zoomLevel;
  };

  MKTS.print = function() {
    return print();
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

  MKTS.foo = function(event) {
    return debug('©9HvgT', 'xxxx');
  };

  keyboard = new Map();

  keyboard.set(187, 'plus');

  keyboard.set(189, 'minus');

  keyboard.set(221, 'asterisk');

  keyboard.set(48, '0');

  keyboard.set(80, 'p');

  keyboard.set(81, 'q');

  keyboard.set(82, 'r');

  keyboard.set(83, 's');

  keyboard.set(89, 'y');

  keyboard.set(37, 'left');

  keyboard.set(39, 'right');

  bindings = {
    'meta+plus': function() {
      return MKTS.zoom(app, +1);
    },
    'meta+shift+asterisk': function() {
      return MKTS.zoom(app, +0.1);
    },
    'meta+0': function() {
      return MKTS.zoom(app, null);
    },
    'meta+minus': function() {
      return MKTS.zoom(app, -1);
    },
    'meta+shift+minus': function() {
      return MKTS.zoom(app, -0.1);
    },
    'meta+p': function() {
      return MKTS.print();
    },
    'meta+left': function() {
      return MKTS.scroll_to_top();
    },
    'meta+right': function() {
      return MKTS.scroll_to_bottom();
    },
    'meta+y': function() {}
  };


  /*
  
  foo <b><i>is it</i> really</b> baz
  
  'foo'
  'foo', ' '
  'foo', ' ', <b><i>, 'is', ⬇, ⬇
  'foo', ' ', <b><i>, 'is', ' ', ⬇, ⬇
  'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ⬇
  'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', ⬇
  'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', 'really', ⬇
  'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', 'really', ⬇, ' '
  'foo', ' ', <b><i>, 'is', ' ', 'it', ⬇, ' ', 'really', ⬇, ' ', 'baz'
  
  'foo'
  'foo '
  'foo <b><i>is</i></b>'
  'foo <b><i>is </i></b>'
  'foo <b><i>is it</i></b>'
  'foo <b><i>is it</i> </b>'
  'foo <b><i>is it</i> really</b>'
  'foo <b><i>is it</i> really</b> '
  'foo <b><i>is it</i> really</b> baz'
   */

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
    key_name.push((_ref1 = keyboard.get(code)) != null ? _ref1 : code);
    key_name = key_name.join('+');
    echo(rpr(key_name), code);
    if ((binding = bindings[key_name]) != null) {
      binding();
      return false;
    } else {
      return true;
    }
  };


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*   * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*   * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*   * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*  * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */


  /*   * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # */

  win.on('document-end', function() {
    return step(function*(resume) {
      MKTS.zoom_to(app, 1.85);
      (yield step.wrap(($('document')).ready, resume));
      help("document ready");
      ($(document)).keydown(MKTS.on_keydown.bind(MKTS));
      return _demo('#box-b');
    });
  });

  _demo = function(container_selector) {
    var new_line_fitter;
    new_line_fitter = function() {
      var is_first, last_height;
      is_first = true;
      last_height = 0;
      whisper('©y94gs', 'new_line_fitter');
      return function(node) {
        var dy;
        dy = node.height() - last_height;
        debug('©u8H0l', 'last_height:', last_height, 'node.height():', node.height(), dy, rpr(node.html()));
        last_height = node.height();
        if (is_first) {
          is_first = false;
          return true;
        }
        return dy <= 0;
      };
    };
    return step((function(_this) {
      return function*(resume) {
        var accept_line, container, fits_onto_line, last_line, test_line, text, text_idx, texts;
        text_idx = -1;
        texts = ["Just as she <b><i>said</i></b> this, she noticed that <i>one of the trees had a door\nleading right into it.</i> 'That's very curious!' she thought. 'But\neverything's curious.", "Just as she <b><i>said</i></b> this, she noticed that <i>one of the trees had a door\nleading right into it.</i> 'That's very curious!' she thought. 'But\neverything's curious today. I think I may as well go in at once.' And in\nshe &#x4e00; went.", "Just as she <b><i>said</i></b> <span class='xbig'>this</span>, she noticed that <i>one of the trees had a door\nleading right into it</i>.", "Just as she <b><i>said</i></b> <span class='xbig'>this</span>, she noticed that", "So.", "So. Here we go!", "x <span class='x'></span> y", "<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, exasperated, and certainly", "<i>It's <b>very</b> supercalifragilistic</i>, http://<wbr>x.com <span class='x'></span>she said, period."];
        text = texts[0];
        container = $(container_selector);
        fits_onto_line = null;
        last_line = null;
        test_line = function(html) {

          /* Must return whether HTML fits into one line. */
          var clasz, fits, focus, line;
          clasz = 'is-first';
          clasz = 'is-last';
          clasz = 'is-middle';
          focus = $("<span id='focus'></span>");
          line = $("<p class='" + clasz + "'></p>");
          line.append(focus);
          focus.html(html);
          container.append(line);
          if (fits_onto_line == null) {
            fits_onto_line = new_line_fitter();
          }
          fits = fits_onto_line(focus);
          if (fits) {
            last_line = line;
          }
          if (fits) {
            whisper('ok', html);
          } else {
            warn('X', html);
          }
          if (!fits) {
            fits_onto_line = null;
          }
          debug('©bmWvg', fits, html);
          line.detach();
          return fits;
        };
        accept_line = function(html, is_last) {

          /* Inserts text line into document */
          help(html, is_last ? '*' : '');
          (last_line.find('#focus')).remove();
          last_line.html(html);
          if (is_last) {

            /* TAINT not entirely correct */
            last_line.addClass('is-last');
            last_line.removeClass('is-middle is-lone is-first');
          }
          container.append(last_line);
          return null;
        };
        (yield LINESETTER.set_lines(text, test_line, accept_line, resume));
        return null;
      };
    })(this));
  };

}).call(this);
