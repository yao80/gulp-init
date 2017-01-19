function BoxHeightAlign($wrapper){
  this.$wrapper = $wrapper;
  this.init();
}

BoxHeightAlign.prototype = {
  init : function(){
    this.setEl();
    this.bindEvent();
  },
  setEl : function(){
    this.$el = this.$wrapper.find('.boxHeightEl');
    this.elNum = this.$el.length;
  },
  bindEvent : function(){
    for(var i = 0 ; i < Math.ceil(this.elNum / this.num) ; i++) {
      var maxHeight = 0;
      for(var j = 0; j < this.num; j++){
        if (this.$el.eq(i * this.num + j).height() > maxHeight) { 
          maxHeight = this.$el.eq(i * this.num + j).height(); 
        }
      }
      for(var k = 0; k < this.num; k++){
        this.$el.eq(i * this.num + k).height(maxHeight); 
      }
    }
  }
};

module.exports = BoxHeightAlign;
