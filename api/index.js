import { http } from '../utils/http';

export const getConfig = async () => {
  const res = await http('get', '/api/config');
  if (res.code === 1) { wx.setStorageSync('systemConfig', res.data); }
  return res;
};

export const createActivityRecord = async (activityId) => {
  const res = await http('post', '/activityRecord/create', { activityId });
  console.log('res: ', res);
  return res;
};

export const commonGetById = async (controllerName, data) => {
  const res = await http('get', `/${controllerName}/`, data);
  return res;
};

/**
 * 选择出行路上自驾的人的各个地点
 * @param {} activityId
 */
export const getDrive = async (activityId) => {
  const res = await http('get', '/drive/activity', { activityId });
  return res.data;
};

export const getMyDrive = async () => {
  const res = await http('get', '/drive/');
  return res.data;
};
