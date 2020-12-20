const authList = {
  userInfo: {
    apiName: ['getUserInfo'],
    authTitle: '需要使用你的用户信息',
    authContent: '需要使用你的用户信息，请确认授权',
  },
  userLocation: {
    apiName: ['getLocation', 'chooseLocation'],
    authTitle: '请求授权当前位置',
    authContent: '需要获取您的地理位置用于案场为您提供更好的服务，请确认授权',
  },
  address: {
    apiName: ['chooseAddress'],
    authTitle: '需要使用你的通讯地址',
    authContent: '需要使用你的通讯地址，请确认授权',
  },
  invoiceTitle: {
    apiName: ['chooseInvoiceTitle'],
    authTitle: '需要使用你的发票抬头',
    authContent: '需要使用你的发票抬头，请确认授权',
  },
  invoice: {
    apiName: ['chooseInvoice'],
    authTitle: '需要获取你的发票',
    authContent: '需要获取你的发票，请确认授权',
  },
  werun: {
    apiName: ['getWeRunData'],
    authTitle: '需要获取你的微信运动数据',
    authContent: '需要获取你的微信运动数据，请确认授权',
  },
  writePhotosAlbum: {
    apiName: ['saveImageToPhotosAlbum', 'saveVideoToPhotosAlbum'],
    authTitle: '请求授权相册',
    authContent: '需要使用你的相册，请确认授权',
  },
};
/**
 * @description: 引导去授权设置页面
 * @param {String} 权限名称
 * @return {Boolean} 是有拥有权限
 */
const showModal = (key) => new Promise((resolve) => {
  wx.showModal({
    title: authList[key].authTitle,
    content: authList[key].authContent,
    success(res) {
      if (res.confirm) {
        wx.openSetting({
          success: async (dataAu) => {
            // 异步，进入授权页面授权后返回判断
            if (dataAu.authSetting[`scope.${key}`] === true) {
              wx.showToast({
                title: '授权成功',
                icon: 'success',
                duration: 1000,
              });
              resolve(true);
            } else {
              resolve(false);
              wx.showToast({
                title: '授权失败',
                icon: 'none',
                duration: 1000,
              });
            }
          },
        });
        // 用户点击取消
      } else if (res.cancel) {
        resolve(false);
        wx.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 1000,
        });
      }
    },
  });
});

/**
 * @description: 返回值中只会出现小程序已经向用户请求过的权限
 * @param {String} 权限名称
 * @return {Boolean} 是有拥有权限
 */
const getWxSetting = (key) => {
  if (key === undefined) throw new Error('need auth name');
  if (typeof key === 'string' && !authList[key]) return false;
  return new Promise((resolve) => {
    wx.getSetting({
      success: async (res) => {
        const result = res.authSetting;
        if (result[`scope.${key}`] === undefined) {
          resolve(true);
        }
        // 用户拒绝过
        if (result[`scope.${key}`] === false) {
          // 引导去授权页
          const result1 = await showModal(key);
          resolve(result1);
        } else {
          //  已授权，或者还未授权
          resolve(true);
        }
      },
      fail() {
        resolve(false);
      },
    });
  });
};
// 判断是否是授权地理位置 所以undefined是false
const checkWxSetting = (key) => {
  if (key === undefined) throw new Error('need auth name');
  if (typeof key === 'string' && !authList[key]) return false;
  return new Promise((resolve) => {
    wx.getSetting({
      success: async (res) => {
        const result = res.authSetting;
        if (result[`scope.${key}`] === undefined) {
          if (key === 'userLocation') {
            wx.removeStorageSync('authLocation');
          }
          resolve(false);
        }
        // 用户拒绝过
        if (result[`scope.${key}`] === false) {
          // 引导去授权页
          const result1 = await showModal(key);
          if (result1 && key === 'userLocation') {
            wx.setStorageSync('authLocation', true);
            resolve(true);
          } else if (key === 'userLocation' && !result1) {
            wx.removeStorageSync('authLocation');
          }
          resolve(result1);
        } else {
          //  已授权，或者还未授权
          wx.setStorageSync('authLocation', true);
          resolve(true);
        }
      },
      fail() {
        if (key === 'userLocation') {
          wx.removeStorageSync('authLocation');
        }
        resolve(false);
      },
    });
  });
};

module.exports = {
  getWxSetting,
  checkWxSetting,
};
