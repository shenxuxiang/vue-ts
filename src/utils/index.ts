export { default as axios } from "./axios";
export { default as matchPath } from "./matchPath";
export { getCookie, setCookie } from "./cookies";
export { default as encrypto } from "./encrypto";
export { default as getTransformProperties } from "./getTransformProperties";

export function getType(data: any) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

export function isObject(data: any): data is object {
  return getType(data) === "Object";
}

export function isArray(data: any): data is Array<any> {
  return getType(data) === "Array";
}

export function isMap(data: any): data is Map<any, any> {
  return getType(data) === "Map";
}

export function isWeakMap(data: any): data is WeakMap<any, any> {
  return getType(data) === "Map";
}

export function isSet(data: any): data is Set<any> {
  return getType(data) === "Set";
}

export function isEmpty(data: any): data is null | undefined {
  if (!data) return true;

  const type = getType(data);

  switch (type) {
    case "Map":
    case "Set":
      return data.size <= 0;
    case "Array":
      return data.length <= 0;
    case "Object":
      return (
        Object.keys(data).concat(Object.getOwnPropertySymbols(data) as any)
          .length <= 0
      );
    default:
      return false;
  }
}

export function getToken() {
  const token = localStorage.getItem("_TOKEN");
  return token ? "Bearer " + token : null;
}

export function setToken(token: string) {
  localStorage.setItem("_TOKEN", token);
}

/**
 * 数字格式化，toFixed(990000000, 10000, 2) => 99000.00(单位：万)
 * @param value   需要计算的数值
 * @param divisor 格式化的单位（万：10000，百万：1000000）
 * @param float   保留的小数
 * @returns
 */
export function toFixed(value: string | number, divisor = 10000, float = 2) {
  if (!value) return "0.00";
  return ((value as number) / divisor).toFixed(float);
}

/**
 * 将区域编码格式化，[省，市，区，镇，村]
 * @param regionCode 区域编码
 */
export function formatRegionCode(regionCode: string) {
  if (!regionCode) return [];

  let length = 0;

  switch (regionCode.length) {
    case 2:
      length = 1;
      break;
    case 4:
      length = 2;
      break;
    case 6:
      length = 3;
      break;
    case 9:
      length = 4;
      break;
    default:
      length = 5;
  }

  const province = regionCode.slice(0, 2);
  const city = regionCode.slice(0, 4);
  const district = regionCode.slice(0, 6);
  const town = regionCode.slice(0, 9);
  return [province, city, district, town, regionCode].slice(0, length);
}

/**
 * 下载文件
 * @param fileName 指定文件下载后的文件名
 * @param data     文件资源（blob）
 * @param extName  文件后缀
 */
export function downloadFile(fileName: string, data: any, extName = ".xlsx") {
  const blob = data instanceof Blob ? data : new Blob([data]);
  const eLink = document.createElement("a");
  // <a/> 上的 download 属性用于重命名一个需要下载的文件
  eLink.download = /\.([a-zA-Z]+)$/i.test(fileName)
    ? fileName
    : fileName + extName;
  eLink.style.display = "none";
  eLink.href = URL.createObjectURL(blob);
  document.body.appendChild(eLink);
  eLink.click();
  // 释放 URL 对象
  URL.revokeObjectURL(eLink.href);
  document.body.removeChild(eLink);
}

// 判断两个值是否完全相等，可以比较 +0 !== -0，NaN === NaN
export function objectIs(v1: any, v2: any): boolean {
  if (v1 === 0 && v2 === 0) {
    return 1 / v1 === 1 / v2;
  } else if (v1 !== v1) {
    return v2 !== v2;
  } else {
    return v1 === v2;
  }
}

export function shallowEqual(obj1: any, obj2: any): boolean {
  if (objectIs(obj1, obj2)) return true;

  // 如果 obj1、obj2 有一个不是 object 类型，则返回 false
  // 注意：typeof null === 'object'
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  )
    return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];
    if (
      !Object.prototype.hasOwnProperty.call(obj2, key) ||
      !objectIs(obj1[key], obj2[key])
    )
      return false;
  }

  return true;
}

/**
 * 防抖
 * @param func        防抖的方法
 * @param delay       防抖的时间间隔
 * @param immediately 是否立即执行 func
 * @returns
 */
export function debounce(func: Function, delay: number, immediately = false) {
  let interval: any = null;
  return function (...args: any[]) {
    if (immediately) {
      if (!interval) func(...args);

      interval && clearTimeout(interval);
      interval = setTimeout(() => (interval = null), delay);
    } else {
      clearTimeout(interval);
      interval = setTimeout(() => func(...args), delay);
    }
  };
}

/**
 * 节流
 * @param func        节流的方法
 * @param delay       节流的时间间隔
 * @param immediately 是否立即执行 func
 * @returns
 */
export function throttle(func: Function, delay: number, immediately = false) {
  let interval: any = null;
  return function (...args: any[]) {
    if (immediately) {
      if (interval) return;
      func(...args);
      interval = setTimeout(() => (interval = null), delay);
    } else {
      if (interval) return;
      interval = setTimeout(() => {
        func(...args);
        interval = null;
      }, delay);
    }
  };
}

// 获取视口尺寸
export function getViewportSize() {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  return { width, height };
}
/**
 * 延迟
 * @param time 延迟的时间
 * @param value 需要返回的内容
*/
export function delay(time: number, value?: any) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), time);
  });
}
