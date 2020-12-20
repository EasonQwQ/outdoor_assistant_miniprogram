// components/card/card.js

const { formatMMDD } = require('../../utils/dayjs');

const { imageBaseUrl } = getApp().globalData;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageBaseUrl,
    formatStartDate: '',
    formatEndDate: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onProduct() {
      wx.navigateTo({
        url: `/pages/activity_detail/activity_detail?data=${JSON.stringify(this.data.data)}`,
      });
    },
  },

  observers: {
    'data.startDate': function (e) {
      const formatStartDate = formatMMDD(e);
      this.setData({ formatStartDate });
    },
    'data.endDate': function (e) {
      const formatEndDate = formatMMDD(e);
      this.setData({ formatEndDate });
    },

  },
});
