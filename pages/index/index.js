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
      var activeId = 0;
      console.log(res[0]);
      if (res[0][0]) {
        activeId = res[0][0].id;
      }
      that.setData({
        swiperUrl: res[0],
        products: [
          {
            url: `../hotGoods/hotGoods`,
            name: '热卖商品',
            icon: './../common/active.png',
            back: '#2564c1'
          },
          {
            url: '../collectList/collectList',
            name: '我的收藏',
            icon: './../common/collect.png',
            back: '#f052af'
          },
          {
            url: '../orders/orders',
            name: '我的订单',
            icon: './../common/order.png',
            back: '#3abeff'
          },
          {
            url: '../address/address',
            name: '地址管理',
            icon: './../common/address.png',
            back: '#4cd7c0'
          }
        ],
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
    var param = e.currentTarget.dataset.product.url;
    wx.navigateTo({
      url: param
    })
  },
  activeTap: function (e) {
    var param = e.currentTarget.dataset.product.id;
    app.globalData.activeId = param;
    wx.navigateTo({
      url: '../activeGoods/activeGoods?activeId=' + param
    })
  },
  openSearch: function () {
    wx.navigateTo({
      url: '../searchPage/searchPage'
    })
  }
})
