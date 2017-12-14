// shoppingCart.js
var app = getApp();
var common = require('./../common/config/common.js');
var MD5 = require('./../common/config/md5.js');
Page({
  data: {
    location: '',
    allSelect: false,
    goodsList: [],
    totalPrice: '0.00',
    totalDiscount: '0.00',
    totalCount: 0,
    addressId: 0
  },

  totalPrice: function (goodsList) {
    let totalPrice = 0;
    if (goodsList.length == 0) {
      return 0;
    }
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].select) {
        totalPrice += goodsList[i].goods_count * goodsList[i].goods_price;
      }
    }
    return totalPrice.toFixed(2);
  },

  totalDiscount: function (goodsList) {
    let totalDiscount = 0;
    if (goodsList.length == 0) {
      return 0;
    }
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].select) {
        totalDiscount += goodsList[i].goods_count * goodsList[i].discount_price;
      }
    }
    return totalDiscount.toFixed(2);
  },

  totalCount: function (goodsList) {
    let totalCount = 0;
    if (goodsList.length == 0) {
      return 0;
    }
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].select) {
        totalCount++;
      }
    }
    return totalCount;
  },

  showDeleteModal: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '操作',
      content: '请选择您的操作',
      confirmText: '删除',
      success: function (res) {
        if (res.confirm) {
          app.getRequest(`${common.apiPrefix}/shopping/delete/${id}`, { method: 'POST' })
        } else if (res.cancel) {
        }
      }
    })
  },

  allSelectTap: function () {
    const goodsList = this.data.goodsList;
    const newSelect = !this.data.allSelect;
    for (let i = 0; i < goodsList.length; i++) {
      goodsList[i].select = newSelect;
    }
    const totalPrice = this.totalPrice(goodsList);
    const totalDiscount = this.totalDiscount(goodsList);
    const totalCount = this.totalCount(goodsList);
    this.setData({
      allSelect: newSelect,
      goodsList,
      totalPrice,
      totalDiscount,
      totalCount
    });
  },

  singleSelectTap: function (e) {
    const goodsList = this.data.goodsList;
    goodsList[e.currentTarget.dataset.index].select = !e.currentTarget.dataset.item.select;
    const totalPrice = this.totalPrice(goodsList);
    const totalDiscount = this.totalDiscount(goodsList);
    const totalCount = this.totalCount(goodsList);
    this.setData({
      goodsList,
      allSelect: false,
      totalPrice,
      totalDiscount,
      totalCount
    })
  },

  countMinus: function (e) {
    const goods_count = e.currentTarget.dataset.item.goods_count;
    if (goods_count == 1) {
      return;
    }
    const listIndex = e.currentTarget.dataset.index;
    const goodsList = this.data.goodsList;
    goodsList[listIndex].goods_count = goods_count - 1;
    const totalPrice = this.totalPrice(goodsList);
    const totalDiscount = this.totalDiscount(goodsList);
    this.setData({
      goodsList,
      totalPrice,
      totalDiscount
    });
  },

  countPlus: function (e) {
    const goods_count = e.currentTarget.dataset.item.goods_count;
    const listIndex = e.currentTarget.dataset.index;
    const goodsList = this.data.goodsList;
    goodsList[listIndex].goods_count = goods_count + 1;
    const totalPrice = this.totalPrice(goodsList);
    const totalDiscount = this.totalDiscount(goodsList);
    this.setData({
      goodsList,
      totalPrice,
      totalDiscount
    });
  },

  confirmPay: function () {
    wx.showLoading({
      title: '正在准备支付...',
      mask: true
    })
    const goodsArray = [];
    const goodsList = this.data.goodsList;
    if (goodsList.length == 0) {
      wx.hideLoading();
      return;
    }
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].select) {
        goodsArray.push({
          goodsId: goodsList[i].goods_id,
          goodsCount: goodsList[i].goods_count
        })
      }
    }
    if(goodsArray.length == 0){
      wx.hideLoading();
      return;
    }
    const addressId = this.data.addressId;
    if (!addressId) {
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
    const preOrder = app.getRequest(`${common.apiPrefix}/order/submit-order`, {
      method: 'POST',
      data: {
        userAddressId: addressId,
        goodsArray,
      }
    })
      .then(function (res) {
        if(res.retCode === -6 || res.retCode === -7){
          wx.hideLoading();
          wx.showModal({
            title: '暂时没有库存了！'
          });
          return;
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
                wx.navigateTo({
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
                wx.navigateTo({
                  url: '../orders/orders',
                })
              }
            })
          },
          complete: function (res) {
          }
        })
      });
  },

  onShow: function (options) {
    const that = this;
    const promises = [];
    const addrList = app.getRequest(`${common.apiPrefix}/user-address`);
    const cartList = app.getRequest(`${common.apiPrefix}/shopping/shopping-car-list`);
    promises.push(addrList);
    promises.push(cartList);
    Promise.all(promises)
      .then(function (res) {
        const addList = res[0];
        let address = '';
        let addressId;
        for (let i = 0; i < addList.length; i++) {
          if (addList[i].default) {
            address += addList[i].province;
            address += addList[i].province == addList[i].city ? '' : addList[i].city;
            address += addList[i].district;
            address += addList[i].detail;
            addressId = addList[i].id;
          }
        }
        const goodsList = res[1].dataArr;
        that.setData({
          goodsList: res[1].dataArr,
          location: address,
          addressId,
          totalPrice: that.totalPrice(goodsList),
          totalDiscount: that.totalDiscount(goodsList),
          totalCount: that.totalCount(goodsList)
        })
      })
  },
})