var app = getApp()
Page({
  data: {
    categoryList:['iPhone','安卓','vivo','oppo','锤子','小米','华为'],
    categoryImg: '../common/movib1.jpg',
    categoryActive: 'iPhone',
    secCategoryList:[
      {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone7'
      },{
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone6S'
      }, {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone5'
      }, {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone5S'
      }, {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone4'
      }, {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone4S'
      }, {
        secCategoryImg: '../common/productImg.jpg',
        secCategoryName: 'iPhone6 Plus'
      }
    ]
  },
  categoryTap: function(e) {
    console.log(e);
    this.setData({categoryActive: e.currentTarget.dataset.category});
  }
})