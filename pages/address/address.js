// address.js
var common = require('./../common/config/common.js').common;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[{
      detail: '北京市朝阳区中山公园',
      default: true
    },{
      addr: '北京市朝阳区中山公园',
      default: false
    }, {
      addr: '北京市朝阳区中山公园',
      default: false
    }, {
      addr: '北京市朝阳区中山公园',
      default: false
    }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    app.getRequest(`${common.apiPrefix}/user-address/2`)
      .then(function(res) {
        console.log(res);
        that.setData({
          addressList: res
        })
      });
  },

  selectTap: function(e) {
    const index = e.currentTarget.dataset.index;
    const addressList = this.data.addressList;
    console.log(e.currentTarget.dataset.index);
    app.getRequest(`${common.apiPrefix}/user-address/set-default`,
    {method: 'PATCH', data: {
      userId: 2,
      userAddressId: addressList[index].id
    }})
    .then(function(res){
      console.log(res);
    });
    for(let i = 0; i < addressList.length; i ++) {
      if(i != index){
        addressList[i].default = false;
      }else{
        addressList[i].default = true;
      }
    }
    this.setData({
      addressList
    })
  }

})