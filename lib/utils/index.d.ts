export declare function getType(data: any): string;
export declare function isObject(data: any): data is object;
export declare function isArray(data: any): data is Array<any>;
export declare function isMap(data: any): data is Map<any, any>;
export declare function isWeakMap(data: any): data is WeakMap<any, any>;
export declare function isSet(data: any): data is Set<any>;
export declare function isEmpty(data: any): data is null | undefined;
export declare function getToken(): string | null;
export declare function setToken(token: string): void;
/**
 * 数字格式化，toFixed(990000000, 10000, 2) => 99000.00(单位：万)
 * @param value   需要计算的数值
 * @param divisor 格式化的单位（万：10000，百万：1000000）
 * @param float   保留的小数
 * @returns
 */
export declare function toFixed(value: string | number, divisor?: number, float?: number): string;
/**
 * 将区域编码格式化，[省，市，区，镇，村]
 * @param regionCode 区域编码
 */
export declare function formatRegionCode(regionCode: string): string[];
/**
 * 下载文件
 * @param fileName 指定文件下载后的文件名
 * @param data     文件资源（blob）
 * @param extName  文件后缀
 */
export declare function downloadFile(fileName: string, data: any, extName?: string): void;
export declare function objectIs(v1: any, v2: any): boolean;
export declare function shallowEqual(obj1: any, obj2: any): boolean;
/**
 * 防抖
 * @param func        防抖的方法
 * @param delay       防抖的时间间隔
 * @param immediately 是否立即执行 func
 * @returns
 */
export declare function debounce(func: Function, delay: number, immediately?: boolean): (...args: any[]) => void;
/**
 * 节流
 * @param func        节流的方法
 * @param delay       节流的时间间隔
 * @param immediately 是否立即执行 func
 * @returns
 */
export declare function throttle(func: Function, delay: number, immediately?: boolean): (...args: any[]) => void;
export declare function getViewportSize(): {
    width: number;
    height: number;
};
/**
 * 延迟
 * @param time 延迟的时间
 * @param value 需要返回的内容
*/
export declare function delay(time: number, value?: any): Promise<unknown>;
