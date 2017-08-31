module.exports.getToken = function() {

  let token = wx.getStorageSync('token');
  if(token){
    return token;
  }

  wx.checkSession({
    success: function (res) {
      return token || requestToken();
    },
    fail: function (res) {
      return requestToken();
    }
  });
}

function requestToken() {
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
          return res.data.token;
        }
      });
    })
    .catch(function (res) {
      console.log(res);
    })
};

module.exports.apiPrefix = 'https://www.qaformath.com/zbuniserver-api';