var app = getApp();
var common = require('./../common/config/common.js').common;
Page({
  onLoad: function () {
    var that = this;

    var getCategoriesList = app.getRequest(`${common.apiPrefix}/category/get-categories-list`)
    .then(function(res){
      app.getRequest(`${common.apiPrefix}/category/get-category-detail/${res[0].id}`)
      .then(function(resData){
        that.setData({
          categoryList: res,
          categoryActive: res[0],
          secCategoryList: resData
        })
      })
    });
  },
  data: {
    categoryList:[],
    categoryImg: '../common/movib1.jpg',
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
  }
})