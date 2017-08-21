var app = getApp();
var common = require('./../common/config/common.js').common;
Page({
  data: {
    userInfo: {},
    categoryList: ['iPhone', '安卓', 'vivo', 'oppo', '锤子', '小米', '华为'],
    categoryImg: '../common/movib1.jpg',
    secCategoryList: [
      {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone7'
      }, {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone6S'
      }, {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone5'
      }, {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone5S'
      }, {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone4'
      }, {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone4S'
      }, {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone6 Plus'
      }
    ]
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

          uploads: tempFilePaths[0],
          name: 'file',
          formData:{
            random: 'wenxue-valid'
          },
          success: function (res) {
            var data = res.data
            console.log(data);
            //do something
          }
        })
      }
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