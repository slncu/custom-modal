'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/**
 * @param {Object} options 　モーダル生成時のオプションを指定する
 * モーダルを使用する箇所でrenderする
 */
var CustomModal = function () {
  function CustomModal(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, CustomModal);

    this.selector = selector;
    this.options = options;
    this.init();
  }

  createClass(CustomModal, [{
    key: 'init',
    value: function init() {
      this.getTitle();
      this.getHeight();
      this.getWidth();
      this.getInnerHtml();
      this.getBtnAgree();
      this.getBtnDisagree();
      this.getBtnAgreeCallback();
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {
      if (!this.options.title) {
        return this.options.title = '';
      }
      return this.options.title;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      var DEFAULT_WIDTH = 520;
      if (!this.options.width) {
        return this.options.width = DEFAULT_WIDTH;
      }
      return this.options.width;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      var DEFAULT_HEIGHT = 520;
      if (!this.options.height) {
        return this.options.height = DEFAULT_HEIGHT;
      }
      return this.options.height;
    }
  }, {
    key: 'getInnerHtml',
    value: function getInnerHtml() {
      return this.options.message = $(this.selector).html();
    }
  }, {
    key: 'getBtnAgree',
    value: function getBtnAgree() {
      if (!this.options.btnAgree) {
        return this.options.btnAgree = 'OK';
      }
      return this.options.btnAgree;
    }
  }, {
    key: 'getBtnDisagree',
    value: function getBtnDisagree() {
      if (this.options.btnDisagree) {
        return null;
      }
      return this.options.btnDisagree;
    }
  }, {
    key: 'getBtnAgreeCallback',
    value: function getBtnAgreeCallback() {
      if (!this.options.callback) {
        return null;
      }
      return this.options.callback;
    }
  }, {
    key: 'handleScrollOn',
    value: function handleScrollOn() {
      /** TODO:たぶんiOSでスクロールするのでなんとかする */
      $('html').css('overflow', '');
      $('body').css('top', '0px');
    }
  }, {
    key: 'handleScrollOff',
    value: function handleScrollOff() {
      var scrollPosition = $(window).scrollTop();

      $('html').css('overflow', 'hidden');
      $('body').css('top', '-' + scrollPosition + 'px');
    }
  }, {
    key: 'handleBtnAgreeOn',
    value: function handleBtnAgreeOn() {
      var _this = this;

      if (!this.options.callback) {
        return $('.modal .ok').on('click', function () {
          _this.closeModal();
        });
      }
      $('.modal .ok').on('click', function () {
        _this.options.callback();
      });
    }
  }, {
    key: 'setModal',
    value: function setModal() {
      var btnDisagree = !this.options.btnDisagree ? '' : '<li><button class="ng button close">' + this.options.btnDisagree + '</button></li>';
      var modalTemplate = '\n    <div class="curtain">\n      <div class="modal" style="max-width: ' + this.options.width + 'px; max-height: ' + this.options.height + 'px;">\n        <div class="title">' + this.options.title + '\n          <span class="close"></span>\n          <span class="clip"></span>\n        </div>\n        <div class="message">' + this.options.message + '</div>\n        <ul class="buttons">\n          <li><button class="ok button--primary">' + this.options.btnAgree + '</button></li>\n        </ul>\n      </div>\n      </div>\n    </div>';
      $('body').prepend(modalTemplate);
      $('.modal .buttons').append(btnDisagree);
      $('.curtain').fadeIn(0);
      this.handleScrollOff();
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      $('.curtain').fadeOut(150).remove();      this.handleScrollOn();
    }
  }, {
    key: 'registerEvent',
    value: function registerEvent() {
      var _this2 = this;

      $('.modal .close').on('click', function () {
        _this2.closeModal();
      });
      $('body').find('.curtain').on('click', function (e) {
        if (!$(e.target).closest('.modal').length) {
          _this2.closeModal();
        }
      });
      this.handleBtnAgreeOn();
    }
  }, {
    key: 'render',
    value: function render() {
      this.setModal();
      this.registerEvent();
    }
  }]);
  return CustomModal;
}();

var modal = new CustomModal();
