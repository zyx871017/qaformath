var app = getApp();
var common = require('./../common/config/common.js');
Page({
  onLoad: function () {
    var that = this;

    var getCategoriesList = app.getRequest(`${common.apiPrefix}/category/get-categories-list`)
      .then(function (res) {
        let categorySelect = {};
        let activeIndex = 0;
        if (app.globalData.categorySelect != 0) {
          for (let i = 0; i < res.length; i++) {
            if (res[i].id == app.globalData.categorySelect) {
              categorySelect = res[i];
              activeIndex = i;
            }
          }
        } else {
          categorySelect = res[0];
          activeIndex = 0;
        }
        app.getRequest(`${common.apiPrefix}/category/get-category-detail/${categorySelect.id}`)
          .then(function (resData) {
            that.setData({
              categoryList: res,
              categoryActive: categorySelect,
              activeIndex,
              secCategoryList: resData,
              orderedList: resData,
              sortBy: 'ori',
              sortUp: true
            })
          })
      });
  },
  onShow: function () {
    const { categoryActive, categoryList } = this.data;
    if (categoryActive.id != app.globalData.categorySelect) {
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
    categoryList: [],
    categoryActive: {
      category_image: '',
    },
    activeIndex: 0,
    secCategoryList: [],
    orderedList: [],
    sortUp: true
  },
  sortBy: function (e) {
    var sortBy = e.currentTarget.dataset.sortby;
    var oriList = [].concat(this.data.secCategoryList);
    var oriSortBy = this.data.sortBy;
    var sortUp = this.data.sortUp;
    switch (sortBy) {
      case 'ori':
        this.setData({
          orderedList: oriList,
          sortBy: 'ori'
        });
        break;
      case 'pri': {
        if (oriSortBy === 'pri') {
          this.setData({
            orderedList: oriList.sort(function (a, b) {
              return (sortUp ? 1 : -1) * (b.goods_price - a.goods_price)
            }),
            sortUp:!sortUp
          })
        }else{
          this.setData({
            orderedList: oriList.sort(function (a, b) {
              return b.goods_price - a.goods_price
            }),
            sortUp: false,
            sortBy: 'pri'
          })
        }
      }
      break;
      case 'sale':{
        if (oriSortBy === 'sale') {
          this.setData({
            orderedList: oriList.sort(function (a, b) {
              return (sortUp ? 1 : -1) * (b.goods_salenum - a.goods_salenum)
            }),
            sortUp: !sortUp
          })
        } else {
          this.setData({
            orderedList: oriList.sort(function (a, b) {
              return b.goods_salenum - a.goods_salenum
            }),
            sortUp: false,
            sortBy: 'sale'
          })
        }
      }
      break;
      case 'ori':{
        this.setData({
          orderedList: oriList,
          sortBy: 'ori',
          sortUp: false
        })
      }
      break;
      default:
      break;
    }
  },
  categoryTap: function (e) {
    var that = this;
    var cateId = e.currentTarget.dataset.category.id;
    app.globalData.categorySelect = cateId;
    app.getRequest(`${common.apiPrefix}/category/get-category-detail/${cateId}`)
      .then(function (res) {
        that.setData({
          categoryActive: e.currentTarget.dataset.category,
          secCategoryList: res,
          sortBy: 'ori',
          sortUp: false,
          orderedList: res
        });
      });
  },

  addToShoppingCart:function(e){
    const id = e.currentTarget.dataset.id;
    app.getRequest(`${common.apiPrefix}/shopping/add-shopping-car`, {
      method: 'POST',
      data: {
        goodsId: id,
        goodsCount: 1
      }
    })
      .then(function (res) {
        wx.showModal({
          title: '添加成功',
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
      })
  },

  goodTap: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?productId=' + id
    });
  }
})