export function isJson(str) {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      console.log("转换成功：" + obj);
      return true;
    } catch (e) {
      console.log("error：" + str + "!!!" + e);
      return false;
    }
  }
  return false;
}

export function isObj(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
