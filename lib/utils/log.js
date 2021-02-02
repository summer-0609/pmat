"use strict";
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIndicator = exports.log = void 0;
const log = (message) => {
    console.log(`%cPer`, 'background: #606060; color: white; padding: 1px 10px; border-radius: 3px;', message);
};
exports.log = log;
const logIndicator = (type, data, measure = false) => {
    console.log(`%cPer%c${type}`, 'background: #606060; color: white; padding: 1px 10px; border-top-left-radius: 3px; border-bottom-left-radius: 3px;', 'background: #1475b2; color: white; padding: 1px 10px; border-top-right-radius: 3px;border-bottom-right-radius: 3px;', data);
};
exports.logIndicator = logIndicator;
