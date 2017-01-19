function URL() {}

URL.prototype = {

  /**
  * @name getUrl 
  * @desc URLを取得
  * @return string
  **/
  getUrl : function() {
    return location.href;
  },

  /**
  * @name getHost 
  * @desc ホストを取得
  * @return string
  **/
  getHost : function() {
    return location.host;
  },

  /**
  * @name getHash 
  * @desc ハッシュを取得
  * @return string
  **/
  getHash : function() {
    return location.hash;
  },

  /**
  * @name getPathname 
  * @desc パスを取得
  * @return string
  **/
  getPathname : function() {
    return location.pathname;
  },

  /**
  * @name getParam 
  * @desc パラメータを取得(arg.keyで値を取り出す)
  * @return object
  **/
  getParam : function() {
    var arg = {};
    var pair = location.search.substring(1).split('&');

    for(var i=0; pair[i]; i++){
      var kv = pair[i].split('=');
      arg[kv[0]] = kv[1];
    }
    return arg;
  }

};

module.exports = URL;
