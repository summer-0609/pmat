"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initObserver = void 0;
__exportStar(require("./validate"), exports);
__exportStar(require("./utils"), exports);
__exportStar(require("./format"), exports);
const initObserver = (entryTypes, callback) => {
    const observer = new PerformanceObserver((list) => {
        // 当记录一个新的性能指标时执行
        if (typeof callback === 'function') {
            callback.call(null, list.getEntries());
        }
    });
    // 注册长任务观察者
    if (typeof entryTypes === 'string') {
        observer.observe({ type: entryTypes, buffered: true });
        return;
    }
    observer.observe({ entryTypes });
};
exports.initObserver = initObserver;
