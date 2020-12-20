const dayjs = require('../miniprogram_npm/dayjs/index');

export const formatYYMMDD = (date) => {
  if (dayjs(date).isValid()) {
    return dayjs(date).format('YYYY-MM-DD');
  }
  return '';
};

export const formatMMDD = (date) => {
  if (dayjs(date).isValid()) {
    return dayjs(date).format('MM月DD日');
  }
  return '';
};

export const functionName = (params) => {};
