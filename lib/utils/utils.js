"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.mapValues = void 0;
/**
 * Maps the values of an object using the provided function, generating a new object with the same keys.
 * @param obj
 * @param fn
 * @returns
 */
const mapValues = (obj, fn) => Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
}, {});
exports.mapValues = mapValues;
/**
 * Checks if the a value is an empty object/collection
 * @param val
 * @returns
 */
const isEmpty = (val) => val == null || !(Object.keys(val) || val).length;
exports.isEmpty = isEmpty;
