import { http } from '../utils/http';

export const exchangePointByOrderId = async (orderId) => {
  const res = await http('get', '/point/exchangePointByOrderId', { orderId });
  return res;
};
export const functionName = (params) => {

};
