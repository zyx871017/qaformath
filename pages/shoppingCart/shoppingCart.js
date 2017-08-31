// shoppingCart.js
var app = getApp();
var common = require('./../common/config/common.js');
Page({
  data: {
    location: '',
    allSelect: false,
    goodsList:[],
    totalPrice: 0,
    totalDiscount: 0,
    totalCount: 0
  },

  totalPrice: function(goodsList){
    let totalPrice = 0;
    if(goodsList.length == 0){
      return 0;
    }
    for(let i = 0; i < goodsList.length; i ++) {
      if(goodsList[i].select){
        totalPrice += goodsList[i].goods_count * goodsList[i].goods_price;
      }
    }
    console.log(totalPrice);
    return totalPrice.toFixed(2);
  },

  totalDiscount: function(goodsList) {
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

  totalCount: function(goodsList){
    let totalCount = 0;
    if(goodsList.length == 0){
      return 0;
    }
    for(let i = 0; i < goodsList.length; i++) {
      if(goodsList[i].select) {
        totalCount ++;
      }
    }
    return totalCount;
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

  singleSelectTap:function(e){
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

  countMinus: function(e){
    const goods_count = e.currentTarget.dataset.item.goods_count;
    if (goods_count == 0) {
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

  onLoad: function (options) {
    const that = this;
    const promises = [];
    const addrList = app.getRequest(`${common.apiPrefix}/user-address/2`);
    const cartList = app.getRequest(`${common.apiPrefix}/shopping/shopping-car-list`);
    promises.push(addrList);
    promises.push(cartList);
    Promise.all(promises)
    .then(function(res){
      console.log(res);
      const addList = res[0];
      let address = '';
      for(let i = 0; i < addList.length; i ++) {
        if(addList[i].default){
          address += addList[i].province;
          address += addList[i].province == addList[i].city ? '' : addList[i].city;
          address += addList[i].district;
          address += addList[i].detail;
        }
      }
      that.setData({
        goodsList: res[1].dataArr,
        location: address
      })
    })
  },
})