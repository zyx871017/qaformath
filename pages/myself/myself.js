var app = getApp();
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