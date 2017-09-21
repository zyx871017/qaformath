

<<<<<<< HEAD
module.exports.requestToken = function() {
=======
function getToken() {
>>>>>>> 68cccf69f368fe49926859ae167e4e18265a8d60
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
          wx.setStorage({
            key: 'token',
            data: res.data.token,
            success: function(){
              wx.reLaunch({
                url: '../index/index',
              })
            }
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

<<<<<<< HEAD
module.exports.apiPrefix = 'https://www.qaformath.com/zbuniserver-api';

module.exports.getRandomStr = function(num){
  const str = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWXYZ'; 
  let res = '';
  for(let i = 1; i <= num; i ++){
    const index = Math.floor(Math.random() * 62);
    res += str[index];
  }
  return res;
}
=======
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
>>>>>>> 68cccf69f368fe49926859ae167e4e18265a8d60
