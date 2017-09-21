var app = getApp();
var common = require('./../common/config/common.js');
Page({
  data: {
    ordersTab: ['全部', '待付款', '待收货', '已完成', '已取消'],
    activeTab: '全部',
    statusList: ['待付款', '待收货', '已取消', '退款中', '已退款', '退款失败', '已取消'],
    order: [],
    all: [],
    st1: [],
    st2: [],
    st3: [],
    st4: [],
  },
  getOrders:function(){
    const that = this;
    app.getRequest(`${common.apiPrefix}/order/order-list`)
      .then(that.parseOrder)
  },
  onShow: function () {
    this.getOrders();
  },
  received: function(e) {
    const id = e.currentTarget.dataset.id;
    const that = this;
    app.getRequest(`${common.apiPrefix}/order/complete/${id}`, {method: 'POST'})
      .then(function(res){
        if(res.retCode == 0){
          wx.showModal({
            title: '确认收货',
            success: function (res) {
              that.getOrders();
            }
          })
        }
      })
  },
  parseOrder: function(res){
    const all = res.dataArr;
    const [st1,st2,st3,st4] = [[],[],[],[]];
    if(!all){
      return;
    }
    for (let i = 0; i < all.length; i ++ ){
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
  ordersTap: function (e) {
    let actOrder = {};
    switch(e.currentTarget.dataset.tab){
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