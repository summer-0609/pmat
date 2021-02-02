/**
 * Maps the values of an object using the provided function, generating a new object with the same keys.
 * @param obj
 * @param fn
 * @returns
 */
export const mapValues = <T>(obj: T, fn: Function): Partial<T> =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});

/**
 * Checks if the a value is an empty object/collection
 * @param val
 * @returns
 */
export const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;
