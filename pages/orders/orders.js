Page({
  data: {
    ordersTab: ['全部', '代付款', '待收货', '已完成', '已取消'],
    activeTab: '全部',
    order: [],
    orders: [
      {
        imgUrl: '../common/productImg.jpg',
        name: 'iPhone7',
        price: 134.20
      }, {
        imgUrl: '../common/productImg.jpg',
        name: 'iPhone7',
        price: 134.20
      }, {
        imgUrl: '../common/productImg.jpg',
        name: 'iPhone7',
        price: 134.20
      }, {
        imgUrl: '../common/productImg.jpg',
        name: 'iPhone7',
        price: 134.20
      }, {
        imgUrl: '../common/productImg.jpg',
        name: 'iPhone7',
        price: 134.20
      }, {
        imgUrl: '../common/productImg.jpg',
        name: 'iPhone7',
        price: 134.20
      }, {
        imgUrl: '../common/productImg.jpg',
        name: 'iPhone7',
        price: 134.20
      }
    ]
  },
  ordersTap: function(e){
    this.setData({ 
      activeTab: e.currentTarget.dataset.tab,
      order: e.currentTarget.dataset.tab == '全部' ? this.data.orders : [] 
    });
  }
})