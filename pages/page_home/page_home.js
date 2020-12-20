import { getUserInfo } from '../../api/user';
import { getConfig } from '../../api/index';
import { getAllActivities } from '../../api/activity';
import { formatYYMMDD } from '../../utils/dayjs';

const { imageBaseUrl } = getApp().globalData;
Page({

  data: {
    imageBaseUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getUserInfo();
    this.getConfig();
    this.getAllActivities();
    // wx.lin.renderWaterFlow(this.data.demo, false, () => {
    //   console.log('渲染成功');
    // });
  },

  async getAllActivities() {
    const res = await getAllActivities();

    if (res.code === 1) {
      wx.lin.renderWaterFlow(res.data[0], false, () => {
      });
    }
  },

  async getConfig() {
    await getConfig();
  },
  // 获取用户信息
  async  getUserInfo() {
    const userInfo = await getUserInfo();
    this.setData({ userInfo });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
});
