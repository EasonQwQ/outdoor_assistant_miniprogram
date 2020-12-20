module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    wx: true,
    getApp: true,
    Page: true,
    App: true,
    Component: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-unused-expressions': 0,
    'linebreak-style': [0, 'error', 'windows'],
    'max-len': 'off',
    'no-param-reassign': 0,
    'no-bitwise': 0,
  },
};
