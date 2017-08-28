// shoppingCart.js
var app = getApp();
var common = require('./../common/config/common.js').common;
Page({
  data: {
    location: '',
    allSelect: false,
    goodsList:[{
      goodsSummary: '产品简介',
      goodsCount: 2,
      select: true,
      discount: 1.2,
      price: 9.9
    }, {
      goodsSummary: '产品简介',
      goodsCount: 2,
      select: false,
      discount: 1.2,
      price: 9.9
    }, {
        goodsSummary: '产品简介',
        goodsCount: 2,
        select: true,
        discount: 1.2,
        price: 9.9
    }, {
      goodsSummary: '产品简介',
      goodsCount: 2,
      select: true,
      discount: 1.2,
      price: 9.9
    }],
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
    app.getRequest(`${common.apiPrefix}/shopping/shopping-car-list?userId=2`)
    .then(function(res){
      console.log(res);
      that.setData({
        goodsList: res.dataArr
      })
    })
  },
})