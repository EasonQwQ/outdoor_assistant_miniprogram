// pages/exchange_point/exchange_point.js
import { toast } from '../../utils/util';
import { exchangePointByOrderId } from '../../api/point';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: 'd0f1051892e81d9440d6491ae5971094',
    exchangeLock: false,
    showLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  inputOrder(e) {
    const { value } = e.detail;
    this.setData({ inputValue: value });
  },

  // 兑换积分
  async exchangePoint() {
    console.log(123);
    const { inputValue } = this.data;
    console.log('inputValue: ', !inputValue);
    if (!inputValue) {
      toast('请输入订单编号');
      return;
    }
    if (this.data.exchangeLock) return;
    this.data.exchangeLock = true;
    this.setData({ showLoading: true });
    try {
      const res = await exchangePointByOrderId(this.data.inputValue);
      console.log('res: ', res);
      if (res.code === 1) {
        this.setData({ showLoading: false });
        this.toast(1, '兑换成功');
        this.data.exchangeLock = false;
      } else {
        this.setData({ showLoading: false });

        this.toast(0, res.msg);
        this.data.exchangeLock = false;
      }
    } catch (error) {
      this.setData({ showLoading: false });
      this.toast(0, '兑换失败，请联系17895097040');
      this.data.exchangeLock = false;
    }
  },

  toast(state, str) {
    wx.lin.showToast({
      title: str,
      icon: state === 1 ? 'success' : 'error',
    });
  },
});
