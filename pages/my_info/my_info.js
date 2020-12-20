const { getUserInfo, updateUserInfo } = require('../../api/user');

// pages/my_info/my_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getUserInfo();
  },

  onShareAppMessage() {

  },

  // 获取用户信息
  async getUserInfo() {
    const userInfo = await getUserInfo();
    this.setData({ userInfo });
    console.log('userInfo: ', userInfo);
  },

  async getSystemUserInfo(e) {
    if (e.detail.userInfo) {
      const res = await updateUserInfo(e.detail.userInfo);
      console.log('res: ', res);
    }
  },

});
