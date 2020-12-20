// import * as CommonApi from '../../api/commonApi';

const app = getApp();
const { domainImgUrl } = app.globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    order: [],
    infoMsg: '',
    height: '',
    pageIndex: 1,
    pageSize: 15,
    memberScore: 0,
    userImg: '', // 用户图片
    totalCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  async onShow() {
    wx.showLoading({ title: '加载中', mask: true });
    this.getUserInfo();
    this.getPointList();
  },

  // 获取积分流水
  async getPointList() {
    const data = await getPointList(this.data.pageIndex);
    console.log('getPointList -> data', data);
    if (data) {
      wx.hideLoading();
      this.setData({
        order: this.data.order.concat(data.list),
        infoMsg: data.list && data.list.length > 0 ? null : '暂无信息',
        totalCount: data.totalCount,
      });
    }
  },

  // 获取用户信息
  getUserInfo() {
    const data = wx.getStorageSync('userInfo');
    console.log('getUserInfo -> data', data);
    this.setData({ userInfo: wx.getStorageSync('userInfo') });
  },

  // 加载更多
  async loadMore() {
    let { pageIndex } = this.data;
    pageIndex += 1;

    this.setData({
      pageIndex,
    });
    const data = await CommonApi.getPointList(this.data.pageIndex);
    console.log('loadMore -> data', data);
    if (data) {
      if (data.list && data.list.length > 0) {
        let { order } = this.data;
        order = order.concat(data.list);
        this.setData({
          order,
        });
      } else {
        wx.showToast({
          title: '已全部加载',
          duration: 1000,
          icon: 'none',
        });
      }
    }
  },

  onReachBottom() {
    const { totalCount, pageIndex, pageSize } = this.data;
    if (totalCount > pageIndex * pageSize) {
      this.setData({ pageIndex: pageIndex + 1 });
      this.getPointList();
    }
  },
});
