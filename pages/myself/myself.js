var app = getApp();
var common = require('./../common/config/common.js');
Page({
  data: {
    userInfo: { avatarUrl:'../common/productImg.jpg'}
  },
  navToMyTickets: function() {
    wx.showModal({
      title: '暂未开发',
      content: '暂未发现开发',
    })
  },

  navToOrders: function() {
    wx.navigateTo({
      url: '../orders/orders'
    })
  },

  navToAddress: function() {
    wx.navigateTo({
      url: '../address/address',
    })
  },

  navToCollect: function() {
    wx.navigateTo({
      url: '../collectList/collectList'
    })
  },

  onLoad: function(){
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
  }
})