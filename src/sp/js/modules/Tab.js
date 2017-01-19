/**
 * タブ切り替え機能
 * @param {object} $target タブボタンの親要素
 */

function Tab($target) {
  this.$target = $target;
  this.init();
}

Tab.prototype = {

  init : function(){
    this.setEl();
    this.bindEvent();
  },

  setEl : function(){
    this.$trigger = this.$target.find("li");
  },

  bindEvent : function(){
    var _this = this;
    this.$trigger.on("click",function(e){
      _this.onClick(e);
    });
  },

  onClick : function(e) {
    var $target = $(e.currentTarget);
    var index = $target.index();
    $target.parent().next().find("div").hide();
    $target.parent().next().find("div:eq(" + index +  ")").fadeIn();
    $target.siblings().removeClass("active");
    $target.addClass("active");
  }
};

module.exports = Tab;
