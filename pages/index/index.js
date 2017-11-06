//index.js
//获取应用实例
var common = require('./../common/config/common.js');
var app = getApp();
Page({
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    var promises = [];
    var hotBanners = app.getRequest(`${common.apiPrefix}/home/hot-banners`);
    var saleList = app.getRequest(`${common.apiPrefix}/home/sales-list`);
    var goodsCategory = app.getRequest(`${common.apiPrefix}/home/goods-category`);
    promises.push(hotBanners);
    promises.push(saleList);
    promises.push(goodsCategory);
    Promise.all(promises).then(function (res) {
      that.setData({
        swiperUrl: res[0],
        products: res[2],
        hotProducts: res[1].dataArr
      })
    }).catch(function (res) {
    });
  },
  data: {
    swiperUrl: [],
    motto: 'Hello World',
    userInfo: {},
    products: [],
    hotProducts: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  productTap: function (e) {
    var param = e.currentTarget.dataset.product.id;
    wx.navigateTo({
      url: '../detail/detail?productId=' + param
    })
  },
  cateTap: function (e) {
    var param = e.currentTarget.dataset.product.category_id;
    app.globalData.categorySelect = param;
    wx.switchTab({
      url: '../category/category'
    })
  },
  activeTap: function (e) {
    var param = e.currentTarget.dataset.product.id;
    app.globalData.activeId = param;
    wx.navigateTo({
      url: '../activeGoods/activeGoods?activeId=' + param
    })
  }
})
