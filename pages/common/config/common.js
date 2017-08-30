function getToken() {
  const app = getApp();
  const promises = [];
  let token = wx.getStorageSync('token');

  function requestToken () {
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
        const {avatarUrl, city, country, gender, language, nickName, province} = res[0].userInfo;
        console.log(code);
        app.getRequest(`https://www.qaformath.com/zbuniserver-api/user-token/token-info`, {
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
          }
        }).then(function (res) {
          console.log(res);
        })
      })
      .catch(function (res) {
        console.log(res);
      })
  };

  wx.checkSession({
    success: function (res) {
      return token || requestToken();
    },
    fail: function (res) {
      requestToken();
    }
  });
}


module.exports.common = {
  apiPrefix: 'https://www.qaformath.com/zbuniserver-api',
  token: getToken()

}