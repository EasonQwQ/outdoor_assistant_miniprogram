export const http = (method, url, data, json = true) => {
  const app = getApp();
  const token = wx.getStorageSync('token') || '';
  return new Promise(((resolve, reject) => {
    wx.request({
      url: `${app.globalData.baseUrl}${url}`,
      method,
      data,
      header: {
        'content-type': json ? 'application/json' : 'application/x-www-form-urlencoded',
        Authorization: token.Authorization,
      },
      success(res) {
        if (res.statusCode !== 200) {
          res.code = 0;
          resolve(res);
          return;
        }
        resolve(res.data);
      },
      fail(res) {
        // fail调用接口失败
        reject(res);
      },
    });
  }));
};

export const functionName = () => {

};
