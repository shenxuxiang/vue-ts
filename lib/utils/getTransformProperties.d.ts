/**
 * 获取元素的 transform 相关属性值。
 * @return scaleX
 * @return scaleY
 * @return rotate
 * @return translateX
 * @return translateY
 * @return translateZ
 */
export default function getTransformProperties(element: HTMLElement): {
    scaleX: number;
    scaleY: number;
    rotate: number;
    translateX: number;
    translateY: number;
    translateZ: number;
};
