// shoppingCart.js
Page({

  /**
   * 页面的初始数据
   */
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
        totalPrice += goodsList[i].goodsCount * goodsList[i].price;
      }
    }
    return totalPrice.toFixed(2);
  },

  totalDiscount: function(goodsList) {
    let totalDiscount = 0;
    if (goodsList.length == 0) {
      return 0;
    }
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].select) {
        totalDiscount += goodsList[i].goodsCount * goodsList[i].discount;
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
    const goodsCount = e.currentTarget.dataset.item.goodsCount;
    if(goodsCount == 0) {
      return;
    }
    const listIndex = e.currentTarget.dataset.index;
    const goodsList = this.data.goodsList;
    goodsList[listIndex].goodsCount = goodsCount - 1;
    const totalPrice = this.totalPrice(goodsList);
    const totalDiscount = this.totalDiscount(goodsList);
    this.setData({
      goodsList,
      totalPrice,
      totalDiscount
    });
  },

  countPlus: function (e) {
    const goodsCount = e.currentTarget.dataset.item.goodsCount;
    const listIndex = e.currentTarget.dataset.index;
    const goodsList = this.data.goodsList;
    goodsList[listIndex].goodsCount = goodsCount + 1;
    const totalPrice = this.totalPrice(goodsList);
    const totalDiscount = this.totalDiscount(goodsList);
    this.setData({
      goodsList,
      totalPrice,
      totalDiscount
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})