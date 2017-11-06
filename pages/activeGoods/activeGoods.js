var app = getApp();
var common = require('./../common/config/common.js');
Page({
  data: {
    image_url: '',
    goodsList: [],
    title: '',
    isBegin: false,
    isOver: false
  },
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var activeId = options.activeId;
    var getCategoriesList = app.getRequest(`${common.apiPrefix}/active/info/${activeId}`)
      .then(function (res) {
        setInterval(function(){
          var start_time = new Date(res.start_time).getTime();
          var end_time = new Date(res.end_time).getTime();
          var now_time = new Date().getTime();
          var isBegin = false;
          var isOver = false;
          var hour, minute, second;
          if (now_time > end_time) {
            isBegin = false;
            isOver = true;
          } else if (now_time > start_time) {
            isBegin = true;
            isOver = false;
            var time_des = end_time - now_time;
            hour = Math.floor(time_des / 3600 / 1000);
            minute = Math.floor((time_des - hour * 3600 * 1000) / 60 / 1000);
            second = Math.floor(time_des / 1000) % 60;
          } else {
            isBegin = false;
            isOver = false;
            var time_des = start_time - now_time;
            hour = Math.floor(time_des / 3600 / 1000);
            minute = Math.floor((time_des - hour * 3600 * 1000) / 60 / 1000);
            second = Math.floor(time_des / 1000) % 60;
          }
          that.setData({
            start_time,
            end_time,
            isBegin,
            isOver,
            hour,
            minute,
            second
          })
        },100);
        

        that.setData({
          image_url: res.image_url,
          goodsList: res.goods_list,
          title: res.title
        })
      });
  },
  onShow: function () {

  },
  productTap: function (e) {
    var param = e.currentTarget.dataset.product.id;
    wx.navigateTo({
      url: '../detail/detail?productId=' + param
    })
  }
})