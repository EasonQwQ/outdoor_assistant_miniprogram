import { http } from '../utils/http';

export const getAllActivities = async (params) => {
  const res = await http('get', '/activity/all');
  return res;
};

export const functionName = (params) => {

};
