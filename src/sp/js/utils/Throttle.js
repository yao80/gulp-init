/**
 * 間引き処理
 * @param {number} minInterval 間引き間隔 
 * @param {function} callback コールバック関数
 */
function Throttle(minInterval) {
  this.minInterval = minInterval || 100;
}

Throttle.prototype = {
  _timerId : null,
  _timeStamp : 0,

  /**
  * @name exec
  * @param callback(function)
  **/
  exec : function(func) {
    var _this = this,
        now =+ new Date(),
        delta = now - this._timeStamp;
    clearTimeout(this._timerId);
    if(delta >= this.minInterval){
      this._timeStamp = now;
      func();
    }else{
      this._timerId = setTimeout(function(){
      _this.exec(func);
      },this.minInterval - delta);
    }
  }

};

module.exports = Throttle;
