// detail.js
var common = require('./../common/config/common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starGrey: '../common/collection.png',
    starYellow: '../common/collection_fill.png',
    star: 3,
    goodsDetail: {},
    goodsSpec: [
      { key: '长', value: '15cm' },
      { key: '宽', value: '10cm' },
      { key: '高', value: '0.7cm' },
      { key: '净重', value: '300克' },
      { key: '安卓版本', value: '4.3.2' },
    ]
  },
  onLoad: function (options) {
    const productId = options.productId;
    const that = this;
    app.getRequest(`${common.apiPrefix}/home/get-goods-info/${productId}`)
    .then(function(res) {
      console.log(res);
      that.setData({
        goodsDetail: res
      });
    })
  },
  navToPage: function(e) {
    const url = e.currentTarget.dataset.url;
    console.log(e.currentTarget.dataset.url);
    wx.switchTab({
      url: url
    });
  },
  addToCart: function(e) {
    const id = e.currentTarget.dataset.id;
    app.getRequest(`${common.apiPrefix}/shopping/add-shopping-car`,{
      method: 'POST',
      data: {
        goodsId: id,
        goodsCount: 1
      }
    })
      .then(function(res) {
        console.log(res);
        wx.showToast({
          title: JSON.stringify(res),
        });
        wx.showToast({
          title: '添加成功',
        })
      })
  }
})