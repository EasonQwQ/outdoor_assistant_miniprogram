import { loginByCode } from '../../api/user';

Page({
  data: {
    showLoading: true,
  },

  onLoad() {
    this.upData();
  },

  // 登录
  login() {
    const that = this;
    wx.login({
      async success(res) {
        try {
          const result = await loginByCode(res.code);
          if (result.code === 1) {
            wx.hideLoading();
            const token = `Bearer ${result.data}`;
            wx.setStorageSync('token', { Authorization: token });
            that.goHomePage();
          } else {
            that.setData({ showLoading: false });
          }
        } catch (error) {
          that.setData({ showLoading: false });
        }
      },
    });
  },

  upData() {
    const updateManager = wx.getUpdateManager();
    const that = this;
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate === false) {
        that.login();
      }
    });
    updateManager.onUpdateReady(() => {
      wx.showModal({
        showCancel: false,
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
  },

  goHomePage() {
    wx.switchTab({ url: './../page_home/page_home' });
  },

  call(e) {
    const { number } = e.currentTarget.dataset;
    wx.makePhoneCall({
      phoneNumber: number,
    });
  },
});
