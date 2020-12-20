import { http } from '../utils/http';

export const loginByCode = async (code) => {
  const res = await http('post', '/login/weapp', { code });
  return res;
};

export const getUserInfo = async () => {
  const res = await http('get', '/user/');
  wx.setStorageSync('userInfo', res.data);
  return res.data;
};

export const updateUserInfo = async (data) => {
  const res = await http('put', '/user', { userDetail: data });
  return res;
};

export const functionName = (params) => {

};
