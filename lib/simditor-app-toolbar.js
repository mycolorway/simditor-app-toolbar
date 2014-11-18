(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('simditor-app-toolbar', ["jquery",
      "simditor"], function ($, Simditor) {
      return (root.returnExportsGlobal = factory($, Simditor));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),
      require("Simditor"));
  } else {
    root['SimditorAppToolbar'] = factory(jQuery,
      Simditor);
  }
}(this, function ($, Simditor) {

var AppToolbar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AppToolbar = (function(_super) {
  __extends(AppToolbar, _super);

  function AppToolbar() {
    return AppToolbar.__super__.constructor.apply(this, arguments);
  }

  AppToolbar.pluginName = 'AppToolbar';

  AppToolbar.prototype.opts = {
    bridge: null
  };

  AppToolbar.prototype.buttons = {
    '|': {
      name: '|',
      type: 'separator'
    },
    bold: {
      name: 'bold',
      type: 'toggle',
      code: '\uF032'
    },
    italic: {
      name: 'italic',
      type: 'toggle',
      code: '\uF033'
    },
    underline: {
      name: 'underline',
      type: 'toggle',
      code: '\uF0cd'
    },
    strikethrough: {
      name: 'strikethrough',
      type: 'toggle',
      code: '\uF0cc'
    },
    ol: {
      name: 'ol',
      type: 'toggle',
      code: '\uF0cb'
    },
    ul: {
      name: 'ul',
      type: 'toggle',
      code: '\uF0ca'
    },
    blockquote: {
      name: 'blockquote',
      type: 'toggle',
      code: '\uF10d'
    },
    hr: {
      name: 'hr',
      type: 'toggle',
      code: '\uF068'
    }
  };

  AppToolbar.prototype._init = function() {
    this.editor = this._module;
    this.bridge = this.editor.opts.bridge;
    if (!(this.editor.opts.toolbar && this.bridge)) {
      return;
    }
    this.config = [];
    $.each(this.editor.opts.toolbar, (function(_this) {
      return function(i, name) {
        if (_this.buttons[name]) {
          return _this.config.push(_this.buttons[name]);
        }
      };
    })(this));
    this.editor.on('focus', (function(_this) {
      return function(e) {
        return _this.bridge.callHandler('showSimditorToolbar', {
          id: _this.editor.id,
          buttons: _this.config
        });
      };
    })(this));
    this.editor.on('blur', (function(_this) {
      return function(e) {
        return _this.bridge.callHandler('dismissSimditorToolbar');
      };
    })(this));
    this.editor.toolbar.on('buttonstatus', (function(_this) {
      return function(e, button) {
        return _this.bridge.callHandler('updateSimditorButton', {
          name: button.name,
          enable: !button.disabled,
          selected: button.active
        });
      };
    })(this));
    return this.bridge.registerHandler('doSimditorCommand', (function(_this) {
      return function(name) {
        var button;
        button = _this.editor.toolbar.findButton(name);
        return button.command();
      };
    })(this));
  };

  return AppToolbar;

})(SimpleModule);

Simditor.connect(AppToolbar);


return AppToolbar;


}));
