/**
 * アコーディオン機能
 * @param {object} $target ターゲット
 * @param {number} speed スピード 
 * @param {string} easing イージング 
 * @param {function} callback コールバック関数
 */

function Accordion($target,speed,easing,callback) {
  this.$target = $target;
  this.speed = speed || 500;
  this.easing = easing || 'easeOutQuart';
  this.callback = callback || null;
  this.init();
}

Accordion.prototype = {
  init : function(){
    this.setEl();
    this.bindEvent();
  },

  setEl : function(){
    this.$trigger = this.$target.find("dt");
  },

  bindEvent : function(){
    var _this = this;
    this.$trigger.on("click",function(e){
      _this.onClick(e);
    });
  },

  onClick : function(e){
    var $target = $(e.currentTarget);
    if(this.callback !== null){
      $target.next().stop().slideToggle(this.speed,this.easing,this.callback);
    }else{
      $target.next().stop().slideToggle(this.speed,this.easing);
    }
  }
};

module.exports = Accordion;
