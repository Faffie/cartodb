var _ = require('underscore');
var Backbone = require('backbone');
var CoreView = require('backbone/core-view');
require('bootstrap-colorpicker');
var template = require('./template.tpl');
var Utils = require('../../../../../helpers/utils');

module.exports = CoreView.extend({

  initialize: function (opts) {
    var opacity = opts.opacity !== undefined && opts.opacity !== null ? opts.opacity : 1;

    this.model = new Backbone.Model({
      hex: opts.value,
      opacity: opacity
    });

    this._initBinds();
  },

  render: function () {
    var rgb = Utils.hexToRGB(this.model.get('hex'));

    var color = _.extend(rgb, {
      hex: this.model.get('hex'),
      opacity: this.model.get('opacity'),
      opacityDisabled: this.options.disableOpacity
    });

    this.$el.append(template(color));

    var rgbaTemplate = _.template('rgba(<%- r %>, <%- g %>, <%- b %>, <%- opacity %>)');

    this.$('.js-colorPicker').colorpicker({
      color: rgbaTemplate(color),
      format: 'rgba',
      container: true,
      horizontal: true,
      inline: true,
      customClass: 'ColorPicker',
      template: '<div class="colorpicker dropdown-menu">' +
        '<div class="colorpicker-saturation"><i><b></b></i></div>' +
          '<div class="colorpicker-hue"><i class="ColorPicker-ball"></i></div>' +
            '<div class="colorpicker-alpha js-alpha"><i class="ColorPicker-ball"></i></div>' +
              '<div class="ColorPicker-colorWrapper"><div class="ColorPicker-color colorpicker-color js-color"></div></div>' +
                  '</div>',
      slidersHorz: {
        saturation: {
          maxLeft: 206,
          maxTop: 95,
          callLeft: 'setSaturation',
          callTop: 'setBrightness'
        },
        hue: {
          maxLeft: 180,
          maxTop: 0,
          callLeft: 'setHue',
          callTop: false
        },
        alpha: {
          maxLeft: 180,
          maxTop: 0,
          callLeft: 'setAlpha',
          callTop: false
        }
      }
    });

    if (this.options.disableOpacity) {
      this.$('.js-colorPicker .js-alpha').addClass('is-hidden');
    }

    var self = this;

    this.$('.js-colorPicker').colorpicker().on('changeColor', function (e) {
      var rgb = e.color.toRGB();
      var hex = e.color.toHex();
      self.model.set({ hex: hex, r: rgb.r, g: rgb.g, b: rgb.b, opacity: rgb.a });
      self.$('.js-color').css('opacity', rgb.a);
    });

    return this;
  },

  _initBinds: function () {
    this.model.bind('change:hex', this._onChangeColor, this);
    this.model.bind('change:r', this._onChangeColor, this);
    this.model.bind('change:g', this._onChangeColor, this);
    this.model.bind('change:b', this._onChangeColor, this);
    this.model.bind('change:opacity', this._onChangeColor, this);
  },

  _onChangeColor: function () {
    this.trigger('change', { opacity: this.model.get('opacity'), hex: this.model.get('hex') }, this);
    this.$('.js-hex').val(this.model.get('hex').substr(1));
    this.$('.js-r').val(this.model.get('r'));
    this.$('.js-g').val(this.model.get('g'));
    this.$('.js-b').val(this.model.get('b'));
    this.$('.js-a').val(this.model.get('opacity'));
  },

  setColor: function (color) {
    this.$('.js-colorPicker').colorpicker('setValue', color);
  }
});
