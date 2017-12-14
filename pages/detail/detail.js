// detail.js
var common = require('./../common/config/common.js');
var MD5 = require('./../common/config/md5.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starGrey: '../common/collection.png',
    starYellow: '../common/collection_fill.png',
    star: 3,
    goodsDetail: {},
    goodsSpec: [
      { key: '长', value: '15cm' },
      { key: '宽', value: '10cm' },
      { key: '高', value: '0.7cm' },
      { key: '净重', value: '300克' },
      { key: '安卓版本', value: '4.3.2' },
    ]
  },
  onLoad: function (options) {
    const productId = options.productId;
    const that = this;
    app.getRequest(`${common.apiPrefix}/home/get-goods-info/${productId}`)
    .then(function(res) {
      that.setData({
        goodsDetail: res
      });
    })
  },
  navToPage: function(e) {
    const url = e.currentTarget.dataset.url;
    wx.switchTab({
      url: url
    });
  },
  payForIt:function(){
    wx.showLoading({
      title: '正在准备支付...',
      mask: true
    })
    const id = this.data.goodsDetail.id;
    const goodsArray = [{ goodsId: id, goodsCount:1}];
    app.getRequest(`${common.apiPrefix}/user-address`)
    .then(function(res){
      const addList = res;
      if(addList.length == 0){
        wx.hideLoading();
        wx.showModal({
          title: '地址',
          content: '请编辑您的收货地址',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../address/address',
              })
            } else {
              return;
            }
          }
        })
      }
      let addressId;
      for (let i = 0; i < addList.length; i++) {
        if (addList[i].default) {
          addressId = addList[i].id;
        }
      }
      const preOrder = app.getRequest(`${common.apiPrefix}/order/submit-order`, {
        method: 'POST',
        data: {
          userAddressId: addressId,
          goodsArray,
        }
      })
        .then(function (res) {
          if(res.retCode !== 0){
            wx.hideLoading();
          }
          const timeStamp = Math.floor(new Date().getTime() / 1000).toString();
          const packageStr = `prepay_id=${res.prepayId}`;
          const nonceStr = res.nonceStr;
          const paySign = `appId=${res.appId}&nonceStr=${nonceStr}&package=${packageStr}&signType=MD5&timeStamp=${timeStamp}&key=${res.key}`;
          wx.requestPayment({
            appId: res.appId,
            timeStamp: Math.floor(new Date().getTime() / 1000).toString(),
            nonceStr,
            package: packageStr,
            signType: 'MD5',
            paySign: MD5.hexMD5(paySign).toUpperCase(),
            success: function (res) {
              wx.hideLoading();
              wx.showModal({
                title: '支付成功',
                success: function (res) {
                  wx.redirectTo({
                    url: '../orders/orders',
                  })
                }
              })
            },
            fail: function (res) {
              wx.hideLoading();
              wx.showModal({
                title: '支付失败',
                success: function (res) {
                  wx.redirectTo({
                    url: '../orders/orders',
                  })
                }
              })
            },
            complete: function (res) {
            }
          })
        });
    })
  },
  addToCollect: function(e){
    const id = e.currentTarget.dataset.id;
    const that = this;
    app.getRequest(`${common.apiPrefix}/goods/set-goods-collect`, {
      method: 'POST',
      data: {
        goodsId: id
      }
    })
      .then(function (res) {
        const title = that.data.goodsDetail.goods_collect?'已取消收藏':'已添加收藏';
        wx.showModal({
          title,
          success: function (res) {
            if (res.confirm) {
              that.setData({
                goodsDetail: Object.assign(
                  {}, 
                  that.data.goodsDetail,
                  {goods_collect: !that.data.goodsDetail.goods_collect}
                  )
              })
            }
          }
        })
      })
  },
  addToCart: function(e) {
    const id = e.currentTarget.dataset.id;
    app.getRequest(`${common.apiPrefix}/shopping/add-shopping-car`,{
      method: 'POST',
      data: {
        goodsId: id,
        goodsCount: 1
      }
    })
      .then(function(res) {
        wx.showModal({
          title: '添加成功',
          success: function(res){
            if(res.confirm){
            }
          }
        })
      })
  }
})