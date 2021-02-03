"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDev = exports.isSupportPerformance = void 0;
const isSupportPerformance = () => {
    const { performance } = window;
    return performance && !!performance.getEntriesByType && !!performance.now && !!performance.mark;
};
exports.isSupportPerformance = isSupportPerformance;
const isDev = () => {
    return process.env.NODE_ENV === 'development';
};
exports.isDev = isDev;
