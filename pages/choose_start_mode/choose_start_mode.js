import { getDrive, getMyDrive } from '../../api/index';

const wxApi = require('../../utils/auth');
/**
 * 先查询这个用户有没有参加得路线
 */
Page({

  data: {
    latitude: '31.99226',
    longitude: '118.7787',
    showDriveDetail: false,
    showHasCarTip: false,
  },

  onLoad(options) {
    const { id = 1 } = options;
    this.getMyDrive();
    this.fetchDataById(id);
    this.getLocation();
  },
  async getMyDrive() {
    const res = await getMyDrive();
    this.setData({
      showDriveDetail: !!res,
    });

    console.log('res: ', res);
  },

  async fetchDataById(id) {
    const res = await getDrive(id);
    // this.set({});
    console.log('res: ', res);
  },

  async getLocation() {
    const that = this;
    const res = await wxApi.getWxSetting('userLocation');
    if (res) {
      wx.getLocation({
        type: 'gcj02 ',
        altitude: false,
        success: (result) => {
          console.log('result: ', result);
          const { latitude, longitude } = result;
          this.setData({ latitude, longitude });
          console.log(that.data.latitude);
        },
        fail: () => {},
        complete: () => {},
      });
    }
  },
  changeShowHasCarTip() {
    this.setData({ showHasCarTip: !this.data.showHasCarTip });
  },
});
