// pages/hotGoods/hotGoods.js
var common = require('./../common/config/common.js');
var app = getApp();
Page({
  data: {
    goodsList: [],
    offset: 0
  },
  onShow: function () {
    var that = this
    app.getRequest(`${common.apiPrefix}/home/sales-list?offset=0&limit=10`)
      .then(function (res) {
        that.setData({
          goodsList: res.dataArr
        })
      })
  },
  loadMore: function () {
    if (!this.loading) {
      const that = this;
      this.loading = true;
      let offset = this.data.offset;
      offset += 10;
      app.getRequest(`${common.apiPrefix}/home/sales-list?offset=${offset}&limit=10`)
        .then(function (res) {
          const newArr = [].concat(that.data.goodsList).concat(res.dataArr);
          that.setData({
            goodsList: newArr,
            offset
          });
          if (res.dataArr.length >= 10) {
            that.loading = false;
          }
        })
    }
  },
  productTap: function (e) {
    var param = e.currentTarget.dataset.product.id;
    wx.navigateTo({
      url: '../detail/detail?productId=' + param
    })
  }
})