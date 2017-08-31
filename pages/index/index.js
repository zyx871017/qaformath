//index.js
//获取应用实例
var common = require('./../common/config/common.js');
var app = getApp();
Page({
  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    var promises = [];
    var hotBanners = app.getRequest(`${common.apiPrefix}/home/hot-banners`);
    var saleList = app.getRequest(`${common.apiPrefix}/home/sales-list`);
    var goodsCategory = app.getRequest(`${common.apiPrefix}/home/goods-category`);
    promises.push(hotBanners);
    promises.push(saleList);
    promises.push(goodsCategory);
    Promise.all(promises).then(function(res){
      console.log(res);
      that.setData({
        swiperUrl: res[0],
        products: res[2],
        hotProducts: res[1].dataArr
      })
    }).catch(function(res){
      console.log(res);
    });
  },
  data: {
    swiperUrl: ['../common/movib1.jpg', '../common/movib2.jpg', '../common/movib3.jpg'],
    motto: 'Hello World',
    userInfo: {},
    products: [],
    hotProducts: [
      {
        name: '热卖产品一',
        price: '20元',
        url: '../common/movib1.jpg'
      }, {
        name: '热卖产品二',
        price: '20元',
        url: '../common/movib1.jpg'
      }, {
        name: '热卖产品三',
        price: '20元',
        url: '../common/movib1.jpg'
      }, {
        name: '热卖产品四',
        price: '20元',
        url: '../common/movib1.jpg'
      }, {
        name: '热卖产品五',
        price: '20元',
        url: '../common/movib1.jpg'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  productTap: function(e) {
    var param = e.currentTarget.dataset.product.id;
    wx.navigateTo({
      url: '../detail/detail?productId=' + param
    })
  },
  cateTap: function(e) {
    var param = e.currentTarget.dataset.product.category_id;
    console.log(param);
    app.globalData.categorySelect = param;
    wx.switchTab({
      url: '../category/category'
    })
  }
})
