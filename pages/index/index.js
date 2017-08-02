//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    swiperUrl: ['../common/movib1.jpg', '../common/movib2.jpg', '../common/movib3.jpg'],
    motto: 'Hello World',
    userInfo: {},
    products: [1,2,3,4]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  productTap: function(e) {
    console.log(e);
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
