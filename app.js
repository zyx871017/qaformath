//app.js
const common = require('./pages/common/config/common.js');
App({
    onLaunch: function () {
      common.requestToken();
    },
    getCategoriesList: function (cb) {
      wx.request({
        url: 'https://www.qaformath.com/zbuniserver-api/category/get-categories-list',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if(res.data.retCode == 0){
           typeof cb == 'function' && cb(res.data.data);
          }
        }
      })
    },

    getUserInfo: function (cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },
    getRequest: function(url, option) {
      let method;
      let data;
      if(option){
        method = option.method || 'GET';
        data = option.data || '';
      }
      return new Promise(function(resolve,reject){
        wx.request({
          url: `${url}?token=${common.getToken()}`,
          method,
          data,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if(res.data.retCode == 0){
              resolve(res.data.data || res.data);
            }else if(res.data.retCode === -11 || res.data.retCode === -9){
              common.requestToken(function(){
                wx.reLaunch({
                  url: '../index/index'
                })
              });
            }else{
              reject(res.data);
            }
          }
        })
      })
    },
    getActivety: function (cb) {
      wx.request({
        url: 'https://www.qaformath.com/zbuniserver-api/home/hot-banners',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if(res.data.retCode == 0) {
            typeof cb == 'function' && cb(res.data.data);
          }
        }
      })
    },
    globalData: {
        userInfo: null,
        categorySelect: 0
    }
})
