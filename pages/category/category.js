var app = getApp();
var common = require('./../common/config/common.js');
Page({
  onLoad: function () {
    var that = this;

    var getCategoriesList = app.getRequest(`${common.apiPrefix}/category/get-categories-list`)
    .then(function(res){
      console.log(res);
      let categorySelect = {};
      if(app.globalData.categorySelect != 0){
        for(let i = 0; i < res.length; i ++){
          if(res[i].id == app.globalData.categorySelect){
            categorySelect = res[i];
          }
        }
      }else{
        categorySelect = res[0];
      }
      app.getRequest(`${common.apiPrefix}/category/get-category-detail/${categorySelect.id}`)
      .then(function(resData){
        console.log(resData);
        that.setData({
          categoryList: res,
          categoryActive: categorySelect,
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
            categoryActive: categoryList[i]
          });
        }
      }
    }
  },
  data: {
    categoryList:[],
    categoryImg: '',
    categoryActive: 'iPhone',
    secCategoryList:[]
  },
  categoryTap: function(e) {
    var that = this;
    var cateId = e.currentTarget.dataset.category.id;
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