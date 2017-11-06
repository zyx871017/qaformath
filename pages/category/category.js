var app = getApp();
var common = require('./../common/config/common.js');
Page({
  onLoad: function () {
    var that = this;

    var getCategoriesList = app.getRequest(`${common.apiPrefix}/category/get-categories-list`)
    .then(function(res){
      let categorySelect = {};
      let activeIndex = 0;
      if(app.globalData.categorySelect != 0){
        for(let i = 0; i < res.length; i ++){
          if(res[i].id == app.globalData.categorySelect){
            categorySelect = res[i];
            activeIndex = i;
          }
        }
      }else{
        categorySelect = res[0];
        activeIndex = 0;
      }
      app.getRequest(`${common.apiPrefix}/category/get-category-detail/${categorySelect.id}`)
      .then(function(resData){
        that.setData({
          categoryList: res,
          categoryActive: categorySelect,
          activeIndex,
          secCategoryList: resData
        })
      })
    });
  },
  onShow: function() {
    const { categoryActive, categoryList } = this.data;
    if (categoryActive.id != app.globalData.categorySelect){
      for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].id == app.globalData.categorySelect) {
          this.setData({
            categoryActive: categoryList[i],
            activeIndex: i
          });
        }
      }
    }
  },
  data: {
    categoryList:[],
    categoryActive: { 
      category_image: '../common/ordersActive.png',
    },
    activeIndex: 0,
    secCategoryList:[]
  },
  categoryTap: function(e) {
    var that = this;
    var cateId = e.currentTarget.dataset.category.id;
    app.globalData.categorySelect = cateId;
    app.getRequest(`${common.apiPrefix}/category/get-category-detail/${cateId}`)
    .then(function(res){
      that.setData({ 
        categoryActive: e.currentTarget.dataset.category,
        secCategoryList: res
        });
    });
  },

  goodTap: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?productId=' + id
    });
  }
})