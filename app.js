//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);

        // wx.request({
        //     url: 'https://www.qaformath.com/zbuniserver-api/category/get-categories-list',
        //     header: {
        //         'content-type': 'application/json'
        //     },
        //     success: function (res) {
        //         console.log(res.data)
        //     }
        // });

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
        var that = this
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
    getRequest: function(url, cb) {
      return new Promise(function(resolve,reject){
        wx.request({
          url: url,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if(res.data.retCode == 0){
              resolve(res.data.data);
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
        userInfo: null
    }
})
