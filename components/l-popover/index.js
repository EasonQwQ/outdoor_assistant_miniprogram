// components/l-popover/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    locked: Boolean,
    showCancel: Boolean,
    show: Boolean,
    itemList: Array,
    cancelText: { type: String, value: '取消' },
    title: String,
    zIndex: { type: Number, value: 777 },
    openApi: { type: Boolean, value: !0 },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached() {
    this.data.percent > 100 && this.setData({ percent: 100 });
    this.data.openApi && this.initPopover();
    wx.createSelectorQuery()
      .in(this)
      .select('.popover')
      .boundingClientRect((t) => {
        console.log('t: ', t);
        // let e = this.data._useSlot;
        // t.width && (e = !0),
        // this.setData({
        //   _useSlot: e,
        //   _slotWidth: px2rpx(t.width),
        //   _slotHeight: px2rpx(t.height),
        // });
      })
      .exec();
    wx.createSelectorQuery()
      .in(this)
      .select('.hide-slot')
      .boundingClientRect((t) => {
        console.log('t: ', t);
        // let e = this.data._useSlot;
        // t.width && (e = !0),
        // this.setData({
        //   _useSlot: e,
        //   _slotWidth: px2rpx(t.width),
        //   _slotHeight: px2rpx(t.height),
        // });
      })
      .exec();
  },

  methods: {
    initPopover() {
      (wx.lin = wx.lin || {}),
      (wx.lin.showPopover = (e = {}) => {
        const {
          itemList: t = [],
          success: s = null,
          fail: i = null,
          title: a = '',
          locked: l = !1,
          cancelText: n = '取消',
          showCancel: c = !1,
        } = e;
        return (
          this.setData({
            itemList: t.slice(0, 10),
            success: s,
            fail: i,
            title: a,
            locked: l,
            cancelText: n,
            showCancel: c,
            show: !0,
          }),
          this
        );
      });
    },
  },
});
