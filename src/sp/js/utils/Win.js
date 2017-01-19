function Win() {
  this.$win = $(window);
  this.$htmlbody = $("html,body");
}

Win.prototype = {

    /**
  * @desc ウィンドウのサイズ・オフセット値を取得
  * @return number
  **/
  w : function() { return this.$win.width(); },
  h : function() { return this.$win.height(); },
  t : function() { return this.$win.scrollTop(); },
  r : function() { return this.$win.scrollLeft() + this.$win.width(); },
  b : function() { return this.$win.scrollTop() + this.$win.height(); },
  l : function() { return this.$win.scrollLeft(); },

};

module.exports = Win;
