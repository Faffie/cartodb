var InfoboxView = require('./infobox-item-view');

module.exports = {
  // Infobox with no buttons, only message
  createInfo: function (opts) {
    return new InfoboxView({
      type: opts.type || 'default',
      title: opts.title,
      body: opts.body
    });
  },

  // Infobox with one button
  createConfirm: function (opts) {
    return new InfoboxView({
      type: opts.type || 'default',
      title: opts.title,
      body: opts.body,
      mainAction: {
        label: opts.confirmLabel,
        type: opts.confirmType || 'link'
      }
    });
  },

  createLoading: function (opts) {
    return new InfoboxView({
      type: opts.type || 'default',
      title: opts.title,
      body: opts.body,
      loading: true
    });
  },

  createQuota: function (opts) {
    return new InfoboxView({
      type: opts.type || 'default',
      title: opts.title,
      body: opts.body,
      mainAction: {
        label: opts.cancelLabel,
        type: opts.cancelType || 'link',
        disabled: opts.cancelDisabled
      },
      secondAction: {
        label: opts.confirmLabel,
        type: opts.confirmType || 'link',
        disabled: opts.confirmDisabled
      },
      quota: opts.quota
    });
  },

  createConfirmAndCancel: function (opts) {
    return new InfoboxView({
      type: opts.type || 'default',
      title: opts.title,
      body: opts.body,
      mainAction: {
        label: opts.cancelLabel,
        type: opts.cancelType || 'link'
      },
      secondAction: {
        label: opts.confirmLabel,
        type: opts.confirmType || 'link'
      }
    });
  }
};
