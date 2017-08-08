//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    swiperUrl: ['../common/movib1.jpg', '../common/movib2.jpg', '../common/movib3.jpg'],
    motto: 'Hello World',
    userInfo: {},
    products: [1,2,3,4],
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
    var param = e.currentTarget.dataset.product;
    wx.navigateTo({
      url: '../detail/detail?productId=' + param
    })
  }
})
