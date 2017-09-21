// address.js
var common = require('./../common/config/common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    const that = this;
    app.getRequest(`${common.apiPrefix}/user-address/2`)
      .then(function(res) {
        console.log(res);
        that.setData({
          addressList: res
        })
      });
  },

  deleteAddress: function(e) {
    const id = e.currentTarget.dataset.id;
    app.getRequest(`${common.apiPrefix}/user-address/delete`,{
      method: 'DELETE',
      data: {
        id,
        user_id:2
      }
    })
      .then(function(res){
        console.log(res);
      })
  },

  navToEdit: function(e) {
    const id = e.currentTarget.dataset.id;
    if(id == 0 || id){
      wx.navigateTo({
        url: `../addrEdit/addrEdit?id=${id}`,
      })
    }else{
      wx.navigateTo({
        url: '../addrEdit/addrEdit',
      })
    }
  },

  selectTap: function(e) {
    const index = e.currentTarget.dataset.index;
    const addressList = this.data.addressList;
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