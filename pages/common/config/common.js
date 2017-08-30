function getToken() {
  const app = getApp();
  const promises = [];
  const getUserInfo = new Promise(function(resolve, reject) {
    wx.getUserInfo({
      success:function(res) {
        resolve(res);
      },
      fail: function(res) {
        reject(res);
      }
    });
  });
  promises.push(getUserInfo);
  const checkSession = new Promise(function(resolve, reject) {
    wx.checkSession({
      success: function(res) {
        resolve(res);
      },
      fail: function(res) {
        reject(res);
      }
    });
  });
  promises.push(checkSession);
  Promise.all(promises).then(function(res){
    console.log(res);
  }).catch(function(res) {
    console.log(res);
  })
}


module.exports.common = {
  apiPrefix: 'https://www.qaformath.com/zbuniserver-api',
  appSecret: '4f13ffae3aecc109e75c94d34af71ea9'

}