// addrEdit.js
var common = require('./../common/config/common.js');
var app = getApp();
Page({
  data: {
    name:'',
    number: '',
    region: ['省', '市', '区'],
    detail: '',
    add: false
  },

  onLoad: function (options) {
    const addrId = options.id;
    const that = this;
    if(addrId){
      wx.setNavigationBarTitle({
        title: '修改收货地址'
      });
      app.getRequest(`${common.apiPrefix}/user-address/info/${addrId}`)
        .then(function(res){
          const { province, city, district } = res;
          const region = [province, city, district];
          that.setData({
            name: res.receiver,
            number: res.phone,
            region,
            detail: res.detail,
            addrId,
            isDefault: res.default
          })
        })
    }else{
      wx.setNavigationBarTitle({
        title: '新增收货地址'
      });
      this.setData({
        add: true
      });
    }
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  inputChange: function(e) {
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;
    const obj = {};
    obj[key] = value;
    this.setData(obj);
  },

  saveAddress: function(e) {
    const { name, number, detail, region, addrId, isDefault } = this.data;
    if(!number){
      wx.showToast({
        title: '请输入电话',
        icon: 'success',
        duration: 1000,
        complete: function () {
        }
      })
      return;
    }
    if(this.data.add){
      app.getRequest(`${common.apiPrefix}/user-address/add`,{
        method: 'POST',
        data: {
          userAddress: {
            user_id: 2,
            receiver: name,
            phone: number,
            detail,
            province: region[0],
            city: region[1],
            district: region[2],
            default: 0
          }
        }
      }).then(function(res) {
        if(res.retCode == 0){
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1000,
            complete: function() {
              wx.navigateBack({
                delta: 1
              });
            }
          })
        }
      })
    }else{
      app.getRequest(`${common.apiPrefix}/user-address/edit`, {
        method: 'POST',
        data: {
          userAddress:{
            id: addrId,
            user_id: 2,
            receiver: name,
            phone: number,
            detail,
            province: region[0],
            city: region[1],
            district: region[2],
            default: isDefault
          }
        }
      }).then(function (res) {
        wx.showToast({
          title: JSON.stringify(res),
        });
        if (res.retCode == 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000,
            complete: function () {
              wx.navigateBack({
                delta: 1
              });
            }
          })
        }
      })
    }
  }
})