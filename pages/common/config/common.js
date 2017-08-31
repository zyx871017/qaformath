

function getToken() {
  const promises = [];
  const getUserInfo = new Promise(function (resolve, reject) {
    wx.getUserInfo({
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
  promises.push(getUserInfo);
  const login = new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
  promises.push(login);
  Promise.all(promises)
    .then(function (res) {
      const code = res[1].code;
      const { avatarUrl, city, country, gender, language, nickName, province } = res[0].userInfo;
      console.log(code);
      wx.request({
        url: `https://www.qaformath.com/zbuniserver-api/user-token/token-info`,
        method: 'POST',
        data: {
          code,
          avatarUrl,
          city,
          country,
          gender,
          language,
          nickName,
          province
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          wx.setStorage({
            key: 'token',
            data: res.data.token,
          });
          wx.reLaunch({
            url: '../index/index',
          })
          return res.data.token;
        }
      });
    })
    .catch(function (res) {
      console.log(res);
    })
};

function checkLogin() {
  wx.checkSession({
    fail: function() {
      getToken();
    }
  })
}

module.exports.checkToken = function() {
  const token = wx.getStorageSync('token');
  if(token){
    checkLogin();
  }else{
    getToken();
  }
}

module.exports.getToken = getToken;

module.exports.apiPrefix = 'https://www.qaformath.com/zbuniserver-api';