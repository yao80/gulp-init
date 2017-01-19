/**
 * ページ内アンカー移動
 * @param {number} speed 移動スピード 
 * @param {string} easing イージング 
 */

function SmoothScroll(speed,easing) {
  this.$target = $("a[href^='#']");
  this.speed = speed || 750;
  this.easing = easing || "easeOutQuart";
  this.init();
}

SmoothScroll.prototype = {

  init : function(){
    this.setEl();
    this.bindEvent();
  },

  setEl : function(){
    this.$trigger = this.$target;
  },

  bindEvent : function(){
    var _this = this;
    this.$trigger.on("click",function(e){
      _this.onClick(e);
    });
  },

  onClick : function(e){
    e.preventDefault();
    var href = $(e.currentTarget).attr("href");
    var target = $(href === "#" || href === "" ? "html" : href);
    var position = target.offset().top;
    $("body,html").animate({ scrollTop: position }, this.speed, this.easing);
    return false;
  }
};

module.exports = SmoothScroll;
