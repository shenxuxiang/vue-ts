function getPattern(name: string) {
  return new RegExp(
    "(?:^|;\\s*)" +
      name.replace(/[\-\[\](){}^$?*+|\/\\]/g, "\\$&") +
      "=([^;]+)",
  );
}

/**
 * 获取指定的 cookie
 * @param name cookie 的名称
 */
export function getCookie(name: string) {
  const cookies = document.cookie;
  const matched = getPattern(name).exec(cookies);
  if (matched) {
    return matched[1];
  } else {
    return null;
  }
}

/**
 * 设置（添加）cookie
 * @param name   cookie 的名称
 * @param value  cookie 的值
 * @param maxAge cookie的有效期（以秒为单位）
 */
export function setCookie(name: string, value: string, maxAge?: number) {
  let cookie = name + "=" + value;
  if (maxAge) cookie = cookie + "; max-age=" + maxAge;
  document.cookie = cookie;
}
