const formatDateNum = (num) => (num < 10 ? `0${num}` : num);
export const formatNumber = (n) => {
  // eslint-disable-next-line no-param-reassign
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

export const toast = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none',
  });
};

export const initImg = (name) => `${name}?time=${new Date().toISOString()}`;

/**
 * 返回 '2019-09-29' 格式的日期
 */
export const initDate = () => {
  const nowDate = new Date();
  const year = new Date(nowDate).getFullYear();
  const month = formatDateNum(new Date(nowDate).getMonth() + 1);
  const date = formatDateNum(new Date(nowDate).getDate());
  return `${year}-${month}-${date}`;
};
export const initDateTime = () => {
  const nowDate = new Date();
  const year = new Date(nowDate).getFullYear();
  const month = formatDateNum(new Date(nowDate).getMonth() + 1);
  const date = formatDateNum(new Date(nowDate).getDate());
  const hour = formatDateNum(new Date(nowDate).getHours());
  const minutes = formatDateNum(new Date(nowDate).getMinutes());
  const seconds = formatDateNum(new Date(nowDate).getSeconds());
  return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`;
};
export const previewImage = (imgUrl) => {
  wx.previewImage({
    urls: [imgUrl],
  });
};

/**
 * @param 不传日期就是当前日期 initDate
 * @returns 'yyyy-mm-dd'
 */
export const toLocalDateString = (localDate = (new Date().toDateString())) => {
  const year = new Date(localDate).getFullYear();
  const month = formatDateNum(new Date(localDate).getMonth() + 1);
  const date = formatDateNum(new Date(localDate).getDate());
  return `${year}-${month}-${date}`;
};

/**
 * 获取屏幕可使用高度
 */
export const getWindowHeight = () => {
  const res = wx.getSystemInfoSync();
  return res.windowHeight * res.devicePixelRatio;
};

export const backAfter1s = (timeout = 1500, text = '') => {
  if (text !== '') {
    toast(text);
  }
  setTimeout(() => {
    wx.navigateBack({
      delta: 1,
    });
  }, timeout);
};

export const objectToPairs = (obj) => Object.keys(obj).map((k) => [k, obj[k]]);

/**
 * 预览图片，传一个图片数组，和当前index,也可以只传当前地址
 * @param {} params
 */
export const previewImg = (imgs, index = 0) => {
  let temImgArr = imgs;
  if (typeof imgs === 'string') {
    temImgArr = [imgs];
  }
  wx.previewImage({
    current: temImgArr[index],
    urls: temImgArr,
    fail(res) {
      console.log('fail -> res', res);
    },
  });
};

// 获取数据类型，返回结果为 Number、String、Object、Array等
export const getRawType = (params) => Object.prototype.toString.call(params).slice(8, -1);

// isEmpty：检查 value 是否为空
function isLength(value) {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;
}
function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
}
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

// 如果是null，直接返回true；如果是类数组，判断数据长度；如果是Object对象，判断是否具有属性；如果是其他数据，直接返回false(也可改为返回true)
export const isEmpty = (value) => {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value)) {
    return !value.length;
  } if (isPlainObject(value)) {
    return !value.some((key) => hasOwnProperty.call(value, key));
  }
  return false;
};

export const getShareName = () => {
  const app = getApp();
  const { shareName = '' } = app.globalData;
  return shareName;
};

export const showLoadIng = (msg, flag = true) => {
  wx.showLoading({
    title: msg,
    mask: flag,
  });
};

export const linToast = (msg = '', status = '') => {
  wx.lin.showToast({
    title: msg,
    icon: status,
  });
};

export const navigatorToUrl = (url) => {
  wx.navigateTo({
    url,
    fail: (err) => {
      console.log('err: ', err);
      wx.switchTab({
        url,
      });
    },
    complete: () => {},
  });
};
