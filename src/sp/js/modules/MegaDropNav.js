function MegaDropNav() {

}

MegaDropNav.prototype = {

  init : function(){
    this.hoverFlg = false;
    this.$el = $(".op");
    this.$el.on("mouseover",this.onMouse);
    this.$el.on("mouseout",this.offMouse);
  },

  open : function($target){
    $target.find(".lowerNav").stop(true,true).show();
  },

  close : function($target){
    if(this.hoverFlg) return;
    $target.find(".lowerNav").stop(true,true).fadeOut(150);
  },

  onMouse : function(e) {
    var $target = $(e.currentTarget);
    // var targetIndex = $target.index();
    this.hoverFlg = true;

    this.open($target);
    $target.find(".gNav_link").addClass("gNav_link-isActive");
  },

  offMouse : function(e) {
    var $target = $(e.currentTarget);
    // var targetIndex = $target.index();
    this.hoverFlg = false;

    setTimeout(this.close($target),50);
    $target.find(".gNav_link").removeClass("gNav_link-isActive");
  }

};

module.exports = MegaDropNav;
