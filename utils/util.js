/**
  * 生成指定位數的隨機數
  * @param {int} x 
  */
 export function randomStr(x) {
  let s = '';
  while (s.length < x && x > 0) {
    const v = Math.random() < 0.5 ? 32 : 0;
    s += String.fromCharCode(Math.round(Math.random() * ((122 - v) - (97 - v)) + (97 - v)));
  }
  return s;
}

/**
 * 對像轉成url查詢字符串
 * @param {object} obj 
 */
export function param(obj, prefix) {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + "[" + p + "]" : p,
            v = obj[p];
      if(typeof v === "object") {
        const rv = param(v, k);
        if (rv) str.push(rv);
      } else {
        str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
  }
  return str.join("&");
}

/**
 * 查詢字符串轉為對象
 * @return {object} {key1: value1, key2: value2}
 */
export function getQueryObject() {
  return (function(a) {
    if (a == '') return {};
    const b = {};
    for (let i = 0; i < a.length; ++i) {
      const p = a[i].split('=');
      if (p.length != 2) continue;
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
    }
    return b;
  })(window.location.search.slice(1).split('&'));
}

/** 
 * 取查詢字符串中某一個name的value
 * @param {string} name 
 * @param {string} url
 * @return {string}
 */
export function getQueryValue(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * 是否為array
 * @param {any} val 
 */
export function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

/**
 * 是否為function
 * @param {any} val 
 */
export function isFunction(val) {
  return val && {}.toString.call(val) === '[object Function]'
}

/**
 * 是否為Object
 * @param {any} val 
 */
export function isObject(val) {
  return val && {}.toString.call(val) === '[object Object]'
}

export function asyncFunc(func) {
  return () => new Promise((resolve, reject) => resolve(isFunction(func) ? resolve(func(arguments)) : reject(new TypeError(func + 'is not function'))));
}

/**
 * 延時任意毫秒
 * @param {number} time 毫秒
 * 例：
 *   delay(500).then(() => console.log('after 500ms'))
 */
export function delay(time = 0) {
  return new Promise((res) => setTimeout(res, time));
}

/**
 * 創建並返回一個像節流閥一樣的函數，當重複調用函數的時候，最多每隔 wait毫秒調用一次該函數
 * @param func 執行函數
 * @param wait 時間間隔
 * @param options 如果你想禁用第一次首先執行的話，傳遞{leading: false}，
 *                如果你想禁用最後一次執行的話，傳遞{trailing: false}
 * @returns {Function}
 */
export function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

/**
 * 防反跳。 func函數在最後一次調用時刻的wait毫秒之後執行！
 * @param func 執行函數
 * @param wait 時間間隔
 * @param immediate 為true，debounce會在wai 時間間隔的開始調用這個函數
 * @returns {Function}
 */
export function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    var last = new Date().getTime() - timestamp; // timestamp會實時更新

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    var callNow = immediate && !timeout;

    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}