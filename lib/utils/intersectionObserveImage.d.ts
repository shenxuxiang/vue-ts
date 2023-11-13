declare class IntersectionObserveImage {
    nodeMap: Map<Element, string>;
    instance: IntersectionObserver;
    constructor();
    intersectionCallback(entries: IntersectionObserverEntry[]): void;
    addElement(node: Element, src: string): void;
    removeElement(node: Element): void;
    disconnect(): void;
}
declare const _default: IntersectionObserveImage;
export default _default;
