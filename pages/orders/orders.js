var app = getApp();
var common = require('./../common/config/common.js');
var MD5 = require('./../common/config/md5.js');
Page({
  data: {
    ordersTab: ['全部', '待付款', '待收货', '已完成', '已取消'],
    activeTab: '全部',
    statusList: ['待付款', '待收货', '已取消', '退款中', '已退款', '退款失败', '已完成'],
    order: [],
    all: [],
    st1: [],
    st2: [],
    st3: [],
    st4: [],
  },
  getOrders: function () {
    const that = this;
    app.getRequest(`${common.apiPrefix}/order/order-list`)
      .then(that.parseOrder)
  },
  onShow: function () {
    this.getOrders();
  },
  received: function (e) {
    const id = e.currentTarget.dataset.id;
    const that = this;
    app.getRequest(`${common.apiPrefix}/order/complete/${id}`, { method: 'POST' })
      .then(function (res) {
        if (res.retCode == 0) {
          wx.showModal({
            title: '确认收货',
            success: function (res) {
              that.getOrders();
            }
          })
        }
      })
  },
  cancelOrder: function (e) {
    const id = e.currentTarget.dataset.id;
    const that = this;
    app.getRequest(`${common.apiPrefix}/order/cancel/${id}`, { method: 'POST' })
      .then(function (res) {
        if(res.retCode == 0) {
          wx.showModal({
            title: '订单取消',
            success: function(res) {
              that.getOrders();
            }
          })
        }
      })
  },
  sendBack: function(e) {
    const id = e.currentTarget.dataset.id;
    const that = this;
    app.getRequest(`${common.apiPrefix}/order/refunding/${id}`, { method: 'POST' })
      .then(function (res) {
        if (res.retCode == 0) {
          wx.showModal({
            title: '已经申请退货',
            success: function (res) {
              that.getOrders();
            }
          })
        }
      })
  },
  deleteOrder: function(e) {
    const id = e.currentTarget.dataset.id;
    const that = this;
    app.getRequest(`${common.apiPrefix}/order/delete/${id}`, { method: 'POST' })
      .then(function (res) {
        if (res.retCode == 0) {
          wx.showModal({
            title: '订单删除',
            success: function (res) {
              that.getOrders();
            }
          })
        }
      })
  },
  submitPay: function (e) {
    const id = e.currentTarget.dataset.id;
    const that = this;
    app.getRequest(`${common.apiPrefix}/order/pay/${id}`, { method: 'POST' })
      .then(function (res) {
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
      })
  },
  parseOrder: function (res) {
    const all = res.dataArr;
    const [st1, st2, st3, st4] = [[], [], [], []];
    if (!all) {
      return;
    }
    for (let i = 0; i < all.length; i++) {
      switch (all[i].status) {
        case 1:
          st1.push(all[i]);
          break;
        case 2:
          st2.push(all[i]);
          break;
        case 3:
        case 4:
        case 5:
        case 6:
          st4.push(all[i]);
          break;
        case 7:
          st3.push(all[i]);
          break;
        default:
          break;
      }
    }
    this.setData({
      order: all,
      all,
      st1,
      st2,
      st3,
      st4,
    })
  },
  navitageToDetail: function(e){
    var param = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?productId=' + param
    })
  },
  ordersTap: function (e) {
    let actOrder = {};
    switch (e.currentTarget.dataset.tab) {
      case '全部':
        actOrder = this.data.all;
        break;
      case '待付款':
        actOrder = this.data.st1;
        break;
      case '待收货':
        actOrder = this.data.st2;
        break;
      case '已完成':
        actOrder = this.data.st3;
        break;
      case '已取消':
        actOrder = this.data.st4;
        break;
      default:
        break;
    }
    this.setData({
      activeTab: e.currentTarget.dataset.tab,
      order: actOrder
    });
  }
})