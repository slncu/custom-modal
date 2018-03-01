/**
 * @param {Object} options 　モーダル生成時のオプションを指定する
 * モーダルを使用する箇所でrenderする
 */
export default class CustomModal {
  constructor(selector, options = {}){
    this.selector = selector;
    this.options = options;
    this.init();
  }

  init() {
    this.getTitle();
    this.getHeight();
    this.getWidth();
    this.getInnerHtml();
    this.getBtnAgree();
    this.getBtnDisagree();
    this.getBtnAgreeCallback();
  }

  getTitle() {
    if (!this.options.title) { return this.options.title = ''; }
    return this.options.title;
  }

  getWidth() {
    const DEFAULT_WIDTH = 520;
    if (!this.options.width) { return this.options.width = DEFAULT_WIDTH; }
    return this.options.width;
  }

  getHeight() {
    const DEFAULT_HEIGHT = 520;
    if (!this.options.height) { return this.options.height = DEFAULT_HEIGHT; }
    return this.options.height;
  }

  getInnerHtml() {
    return this.options.message = $(this.selector).html();
  }

  getBtnAgree() {
    if (!this.options.btnAgree) { return this.options.btnAgree = 'OK'; }
    return this.options.btnAgree;
  }

  getBtnDisagree() {
    if (this.options.btnDisagree) { return null; }
    return this.options.btnDisagree;
  }

  getBtnAgreeCallback() {
    if (!this.options.callback) { return null; }
    return this.options.callback;
  }

  handleScrollOn() {
    /** TODO:たぶんiOSでスクロールするのでなんとかする */
    $('html').css('overflow','');
    $('body').css('top','0px');
  }

  handleScrollOff() {
    const scrollPosition = $(window).scrollTop();

    $('html').css('overflow','hidden');
    $('body').css('top','-' + scrollPosition + 'px');
  }

  handleBtnAgreeOn() {
    if (!this.options.callback) {
      return ( 
        $('.modal .ok').on('click', () => { this.closeModal(); })
      );
    }
    $('.modal .ok').on('click', () => { this.options.callback(); });
  }

  setModal() {
    const btnDisagree = !this.options.btnDisagree ? '' : `<li><button class="ng button close">${this.options.btnDisagree}</button></li>`;
    const modalTemplate = `
    <div class="curtain">
      <div class="modal" style="max-width: ${this.options.width}px; max-height: ${this.options.height}px;">
        <div class="title">${this.options.title}
          <span class="close"></span>
          <span class="clip"></span>
        </div>
        <div class="message">${this.options.message}</div>
        <ul class="buttons">
          <li><button class="ok button--primary">${this.options.btnAgree}</button></li>
        </ul>
      </div>
      </div>
    </div>`;
    $('body').prepend(modalTemplate);
    $('.modal .buttons').append(btnDisagree);
    $('.curtain').fadeIn(0);
    this.handleScrollOff();
  }

  closeModal() {
    $('.curtain').fadeOut(150).remove();;
    this.handleScrollOn();
  }

  registerEvent() {
    $('.modal .close').on('click', () => { this.closeModal(); });
    $('body').find('.curtain').on('click', e => {
      if(!$(e.target).closest('.modal').length) {
        this.closeModal();
      }
    });
    this.handleBtnAgreeOn();
  }

  render() {
    this.setModal();
    this.registerEvent();
  }
}