/**
 * ページトップボタン
 * @param {object} $target ターゲット
 * @param {number} distance ボタンが表示されるまでのスクロール量 
 * @param {number} speed ページトップまで戻る秒数 
 * @param {string} easing イージング 
 */
function PageTop($target,distance,speed,easing) {
  this.$target = $target;
  this.distance = distance || 300;
  this.speed = speed || 750;
  this.easing = easing || "easeOutQuart";
  this.init();
}

PageTop.prototype = {

  init : function(){
    this.setEl();
    this.bindEvent();
  },

  setEl : function(){
    this.$trigger = this.$target.find("a");
    var hidden = true;
    if (this.$target.size() > 0) {
      this.$target.hide();
      $(window).scroll(function () {
        if ($(this).scrollTop() > this.distance) {
          if (hidden) {
            this.$target.stop().fadeIn();
            hidden = false;
          }
        }
        else {
          if (!hidden) {
            this.$target.stop().fadeOut();
            hidden = true;
          }
        }
      });
    }
  },

  bindEvent : function(){
    var _this = this;
    this.$trigger.on("click",function(e){
      _this.onClick(e);
    });
  },

  onClick : function(e){
    e.preventDefault();
    $("body,html").animate({ scrollTop: 0 }, this.speed, this.easing);
    return false;
  }
};

module.exports = PageTop;
