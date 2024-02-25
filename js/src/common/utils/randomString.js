export function randomString(len) {
  len = len || 8;
  let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let maxPos = $chars.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    //0~32的整数
    str += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)));
  }
  return str;
}
