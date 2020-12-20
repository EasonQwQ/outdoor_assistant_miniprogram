Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object,
      value: {},
    },
    isSignIn: {
      type: Boolean,
      value: false,
    },
    isEmployeeFlag: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    isTestUser: true,
  },
  pageLifetimes: {

  },

  methods: {
    navigatorPage(e) {
      const { url } = e.currentTarget.dataset;
      console.log('navigatorPage -> url', url);
      wx.navigateTo({
        url,
      });
    },

  },
});
