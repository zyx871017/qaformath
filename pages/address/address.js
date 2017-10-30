// address.js
var common = require('./../common/config/common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const that = this;
    app.getRequest(`${common.apiPrefix}/user-address`)
      .then(function (res) {
        that.setData({
          addressList: res
        })
      });
  },

  getAddList: function () {
    const that = this;
    app.getRequest(`${common.apiPrefix}/user-address`)
      .then(function (res) {
        that.setData({
          addressList: res
        })
      });
  },

  deleteAddress: function (e) {
    const id = e.currentTarget.dataset.id;
    const that = this;
    wx.showModal({
      title: '删除',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          app.getRequest(`${common.apiPrefix}/user-address/delete/${id}`, {
            method: 'DELETE'
          })
            .then(function (res) {
              if (res.retCode === 0) {
                wx.showModal({
                  title: '删除',
                  content: '删除成功',
                  success: that.getAddList
                })
              }
            })
        }
      }
    })

  },

  navToEdit: function (e) {
    const id = e.currentTarget.dataset.id;
    if (id == 0 || id) {
      wx.navigateTo({
        url: `../addrEdit/addrEdit?id=${id}`,
      })
    } else {
      wx.navigateTo({
        url: '../addrEdit/addrEdit',
      })
    }
  },

  selectTap: function (e) {
    const index = e.currentTarget.dataset.index;
    const addressList = this.data.addressList;
    app.getRequest(`${common.apiPrefix}/user-address/set-default`,
      {
        method: 'POST', data: {
          userAddressId: addressList[index].id
        }
      })
      .then(function (res) {
      });
    for (let i = 0; i < addressList.length; i++) {
      if (i != index) {
        addressList[i].default = false;
      } else {
        addressList[i].default = true;
      }
    }
    this.setData({
      addressList
    })
  }

})