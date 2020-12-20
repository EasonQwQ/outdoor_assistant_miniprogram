// pages/test-popover/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  showPopover() {
    wx.lin.showPopover({
      itemList: [
        {
          name: '今日不再出现此类内容',
        },
        {
          name: '屏蔽',
        },
      ],

    });
  },

});
