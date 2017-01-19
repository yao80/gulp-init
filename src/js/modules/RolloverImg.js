/**
 * 画像切り替え
 * @param {object} $target ターゲット
 * @param {string} off 切り替わる前のファイル名に含まれる文字列 
 * @param {string} on 切り替わり後のファイル名に含まれる文字列
 */

function RolloverImg($target,off,on) {
  this.$target = $target;
  this.off = off || "_off";
  this.on = on || "_on";
  this.init();
}

RolloverImg.prototype= {

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
    $target.attr('src', $target.attr('src').replace(this.off, this.on));
  },

  offMouse : function(e) {
    var $target = $(e.currentTarget);
    $target.attr('src', $target.attr('src').replace(this.on, this.off));
  }

};

module.exports = RolloverImg;
