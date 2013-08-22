(function($) {
  $.localStorage = function(label, data) {
    if (typeof data === 'undefined') {
      return loadJSON(label);
    } else {
      return saveJSON(label, data);
    }
  }

  var getBrowser = function() {
    if ($.browser.chrome) return 'CHROME';
    if ($.browser.safari) return 'SAFARI';
    if ($.browser.mozilla) return 'FIREFOX';
    if ($.browser.opera) return 'OPERA';
    if ($.browser.msie) return 'IE';

    return 'UNKNOWN';
  }

  var createCookie = function(name, value, days) {
    if (typeof days !== 'undefined') {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    } else {
      var expires = "";
    }

    document.cookie = name + "=" + value + expires + "; path=/";
  }

  var readCookie =  function(name){
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }

    return null;
  }

  var eraseCookie = function(name){
    createCookie(name, "", -1);
  }

  var saveJSON = function(label, data) {
    var cookie = { value: data }
    var text = JSON.stringify(cookie);
    
    try {
      var browser = getBrowser();

      if (browser == "SAFARI" || browser == "CHROME") {   
        window.localStorage.setItem(label, text);
      } else {
        createCookie(label, text, 100);
      }

      return true;
    }
    catch (err) {
      return false;
    }

    return true;
  }

  var loadJSON = function(label) {
    var data;

    try {
      var browser = getBrowser();

      if (browser == "SAFARI" || browser == "CHROME") {   
        data = window.localStorage.getItem(label);
      } else {
        data = readCookie(label); 
      }
    } catch(err) {
      return null;
    }

    if (data == null) return null;     
    
    var object = JSON.parse(data);

    return object['value'];   
  }

  var JSON = JSON || {};

  JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
      if (t == "string") obj = '"' + obj + '"';
      return String(obj);
    } else {
      var n, v, json = [], arr = (obj && obj.constructor == Array);

      for (n in obj) {
        v = obj[n]; t = typeof(v);

        if (t == "string") v = '"'+v+'"';
        else if (t == "object" && v !== null) v = JSON.stringify(v);

        json.push((arr ? "" : '"' + n + '":') + String(v));
      }

      return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
  };

  JSON.parse = JSON.parse || function (str) {
    if (str === "") str = '""';
    eval("var p=" + str + ";");
    return p;
  };
})(jQuery);