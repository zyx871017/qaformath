// pages/collectList/collectList.js
var app = getApp();
var common = require('./../common/config/common.js');
Page({
  data: {
    products: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    app.getRequest(`${common.apiPrefix}/goods/goods-collect-list`)
    .then(function(res){
      that.setData({
        products: res
      })
    })
  },

  productTap: function(e) {
    var param = e.currentTarget.dataset.product.id;
    wx.navigateTo({
      url: '../detail/detail?productId=' + param
    })
  }
})