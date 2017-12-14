// pages/searchPage/searchPage.js
var common = require('./../common/config/common.js');
var app = getApp();
Page({
  data: {
    goodsList: [],
    key: '',
    offset: 0
  },
  beginSearch: function (e) {
    const key = e.detail.value;
    const that = this;
    app.getRequest(`${common.apiPrefix}/goods/search?query=${key}&offset=0`)
      .then(function (res) {
        that.setData({
          goodsList: res,
          offset: 0,
          key
        });
        that.loading = false;
      })
  },
  productTap: function (e) {
    var param = e.currentTarget.dataset.product.id;
    wx.navigateTo({
      url: '../detail/detail?productId=' + param
    })
  },
  loadMore: function () {
    if (!this.loading) {
      this.loading = true;
      const { key, goodsList, offset } = this.data;
      const that = this;
      app.getRequest(`${common.apiPrefix}/goods/search?query=${key}&offset=${offset}`)
        .then(function (res) {
          const newGoods = [].concat(goodsList).concat(res);
          that.setData({
            goodsList: newGoods,
            offset: offset + 10
          });
          if (res.length == 10) {
            that.loading = false;
          }
        })
    }
  }
})