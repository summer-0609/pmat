/* eslint-disable no-console */

export const log = (message?: string): void => {
  console.log(
    `%cPer`,
    'background: #606060; color: white; padding: 1px 10px; border-radius: 3px;',
    message,
  );
};

export const logIndicator = (type: string, data: any, measure = false) => {
  console.log(
    `%cPer%c${type}`,
    'background: #606060; color: white; padding: 1px 10px; border-top-left-radius: 3px; border-bottom-left-radius: 3px;',
    'background: #1475b2; color: white; padding: 1px 10px; border-top-right-radius: 3px;border-bottom-right-radius: 3px;',
    data
  )
}
