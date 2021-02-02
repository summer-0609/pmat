"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const getPaintTime = () => {
    utils_1.initObserver('paint', (entries) => {
        entries.forEach((entry) => {
            const time = entry.startTime;
            const { name } = entry;
            if (name === 'first-contentful-paint') {
                utils_1.logIndicator('FCP', {
                    time,
                    score: utils_1.getScore('fcp', time),
                });
            }
            else {
                utils_1.logIndicator('FP', {
                    time,
                });
            }
        });
    });
};
exports.default = getPaintTime;
