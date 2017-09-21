var app = getApp();
var common = require('./../common/config/common.js');
Page({
  data: {
    userInfo: { avatarUrl:'../common/productImg.jpg'}
  },
  navToMyTickets: function() {
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        wx.uploadFile({
          url: `${common.apiPrefix}/util/put-ali-oss`, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
            random: 'wenxue-valid'
          },
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function (res) {
            var data = JSON.parse(res.data);

            console.log(data);
            //do something
          }
        })
      }
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

  onLoad: function(){
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo);
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
  }
})