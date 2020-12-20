import { commonGetById, createActivityRecord } from '../../api/index';
import { linToast, navigatorToUrl } from '../../utils/util';

const { imageBaseUrl } = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityData: {},
    imageBaseUrl,
    recordData: {},
    status: 0,
    disabled: false,
    btnText: '立即报名',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const activityData = JSON.parse(options.data);
    console.log('activityData: ', activityData);
    this.fetchData(activityData.id);
    this.setData({ activityData });
  },
  async participate() {
    const res = await createActivityRecord(this.data.activityData.id);
    if (res.code === 1) {
      linToast('报名成功', 'success');
    } else {
      linToast(res.msg, 'error');
    }
    console.log('res: ', res);
  },

  async fetchData(id) {
    const res = await commonGetById('activityRecord', { activityId: id });
    if (res.code === 1 && res.data && res.data.status === 1) {
      console.log(123);
      this.setData({ disabled: true, btnText: '已经报名' });
    }
    return res.data;
  },

  navigator(e) {
    let { url } = e.currentTarget.dataset;
    url = `${url}?id=${this.data.activityData.id}`;
    console.log('url: ', url);
    navigatorToUrl(url);
  },
});
