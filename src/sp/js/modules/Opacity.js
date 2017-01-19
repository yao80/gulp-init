/**
 * 要素を透過
 * @param {object} $target ターゲット
 * @param {number} opacity 透過具合(0〜1) 
 * @param {number} speed スピード 
 * @param {string} easing イージング 
 */

function Opacity($target,opacity,speed,easing) {
  this.$target = $target;
  this.opacity = opacity || 0.6;
  this.speed = speed || 300;
  this.easing = easing || "swing";
  this.init();
}

Opacity.prototype = {

  init : function(){
    this.setEl();
    this.bindEvent();
  },

  setEl : function(){
    this.$trigger = this.$target;
  },

  bindEvent : function(){
    var _this = this;
    this.$trigger.on("mouseover",function(e){
      _this.onMouse(e);
    });
    this.$trigger.on("mouseout",function(e){
      _this.offMouse(e);
    });
  },

  onMouse : function(e) {
    var $target = $(e.currentTarget);
    $target.stop().fadeTo(this.speed,this.opacity,this.easing);
  },

  offMouse : function(e) {
    var $target = $(e.currentTarget);
    $target.stop().fadeTo(this.speed,1.0,this.easing);
  }

};

module.exports = Opacity;
