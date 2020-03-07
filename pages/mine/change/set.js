Page({

  /**
   * 页面的初始数据
   */

  data: {
    userinfo: {
      nickname: ' ',
      phone: ' ',
      sex: ' ',
      age: '',
      height: ' ',
      weight: ' ',
      avatar_url:'',
    },
    changeinfo:{
      nickname: ' ',
      phone: ' ',
      sex: ' ',
      age: '',
      height: ' ',
      weight: ' ',
      avatar_url: '',
    }
  },
  //获取各个对话框的值
  getnickname: function (nickchange) {
    console.log(nickchange.detail.value);
    this.data.changeinfo.nickname = nickchange.detail.value;
    console.log(this.data.changeinfo.nickname)
  },
  getsex: function (sexchange) {
    console.log(sexchange.detail.value);
    this.data.changeinfo.sex = sexchange.detail.value;
    console.log(this.data.changeinfo.sex)
  },
  getage: function (agechange) {
    console.log(agechange.detail.value);
    this.data.changeinfo.age = agechange.detail.value;
    console.log(this.data.changeinfo.age)
  },
  getheight: function (heightchange) {
    console.log(heightchange.detail.value);
    this.data.changeinfo.height = heightchange.detail.value;
    console.log(this.data.changeinfo.height)
  },
  getweight: function (weightchange) {
    console.log(weightchange.detail.value)
    this.data.changeinfo.weight = weightchange.detail.value;
    console.log(this.data.changeinfo.weight)
  },
  getsignature: function (signaturechange) {
    console.log(signaturechange.detail.value)
    this.data.changeinfo.signature = signaturechange.detail.value;
    console.log(this.data.changeinfo.signature)
  },
  //上传信息
  uploadinformation:function(){
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'https://ssl.lyzwhh.top/user/userInfo',
      method:'POST',
      header:{
        'Content-Type': "application/x-www-form-urlencoded",
        token
      },
      data:{
        nickname:this.data.changeinfo.nickname,
        sex: this.data.changeinfo.sex,
        age: this.data.changeinfo.age,
        height: this.data.changeinfo.height,
        weight: this.data.changeinfo.weight,
        signature: this.data.changeinfo.signature,
      },
      success(res){
        wx.showToast({
          title: '提交成功',
          icon: 'succcess',
        })
        console.log(res);
        wx.navigateBack({
          url:'pages/mine/mine'
        })
      },
    })
    
  },
  uploadPhoto(e) { // 拍摄或从相册选取上传
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        let tempFilePaths = res.tempFilePaths; // 返回选定照片的本地路径列表
        that.data.changeinfo.avatar = res.tempFilePaths; 
        console.log(that.data.changeinfo.avatar)
      }
    })
  },
  /*upload(page, path) { // 上传图片
    wx.showToast({
      icon: "loading",
      title: "正在上传……"
    });
    var token = wx.getStorageSync('token');
    console.log(token)
    console.log(path);
    wx.uploadFile({
      url: 'http://be.cishiapp.com/users/avatarUpload', //后端接口
      filePath: path[0],
      name: 'avatar',
      header: {
        token
      },
      success(res) {
        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '图片上传失败',
            showCancel: false
          });
          return;
        } else {
          console.log('图片上传成功！');
          console.log(res.data);
          var url = JSON.parse(res.data).data;
          console.log(url);
          wx.request({
            url: 'http://be.cishiapp.com/users/alterField',
            method: 'POST',
            header: {
              token
            },
            data: {
              field: 'avatar_url',
              value: url
            },
            success(res) {
              console.log(res);
              if (res.data.code == 0) {
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.setStorageSync('avatar', url);
                wx.redirectTo({
                  url: '/pages/info-setting/set',
                })
              } else {
                wx.showToast({
                  title: '上传出错',
                  icon: 'none',
                  duration: 2000
                })
              }
            }

          })

        }
      },
      fail(e) {
        wx.showModal({
          title: '提示',
          content: '图片上传失败',
          showCancel: false
        });
      },
      complete(res) {
        wx.hideToast(); //隐藏Toast
        //console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var token = wx.getStorageSync('token');
    var that = this;
    wx.request({
      url: 'https://ssl.lyzwhh.top/user/userInfo',
      method:'GET',
      header: {
        token
      },
      success(res){
        console.log(res);
        console.log('!!');
        var userinfo = res.data.data;
        that.setData({
          userinfo
        })
        console.log(that.data.userinfo)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})