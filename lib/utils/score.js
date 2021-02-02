"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScore = exports.scores = exports.scoreLevel = void 0;
exports.scoreLevel = ['fast', 'moderate', 'slow'];
exports.scores = {
    fcp: [2000, 4000],
    lcp: [2500, 4500],
    fid: [100, 300],
    tbt: [300, 600],
    cls: [0.1, 0.25],
};
const getScore = (type, data) => {
    const score = exports.scores[type];
    for (let i = 0; i < score.length; i += 1) {
        if (data <= score[i])
            return exports.scoreLevel[i];
    }
    return exports.scoreLevel[2];
};
exports.getScore = getScore;
