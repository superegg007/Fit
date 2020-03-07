import Ajax from './../../utils/request'

const app = getApp();

Page({
  data: {
    phone: '',
    code: '',
    verifyText: '发送验证码',
    time: '',
    token: '1234536',
    user_info: {
      user_id: 30,
      age: "未填写",
      avatar_url: "http://cdn.lyzwhh.top/avatar.jpg",
      followers: 0,
      following: 0,
      height: "点击填写",
      liked: 0,
      nickname: "未填写",
      phone: "15603382650",
      signature: "点击填写",
      user_id: 30,
      weight: "点击填写"
    }
  },

  // 手机号输入监听
  bindPhoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 手机验证码验证函数
  sendcode: function() {
    if (this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (this.data.phone.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.setData({
      verifyText: '60s',
      disabled: true
    })
    let time = 60
    const set = setInterval(() => {
      time--
      this.setData({
        verifyText: time + 's'
      })
    }, 1000)
    setTimeout(() => {
      this.setData({
        verifyText: '获取验证码',
        disabled: false
      })
      clearInterval(set)
    }, 60000)

    Ajax({
      url: 'user/getVCode',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        phone: this.data.phone
      }
    }).then(res => {
      console.log(res, 'res')
    })
  },

  // 手机验证码输入监听
  bindCodeInput: function(e) {
    this.setData({
      code: e.detail.value
    })
  },

  // 登录监听函数
  Login: function() {
    let that = this;

    wx.request({
      url: 'https://ssl.lyzwhh.top/user/registerByVCode',
      method: 'POST',
      data: {
        phone: that.data.phone,
        VCode: that.data.code
      },
      header: {
        'Content-Type': 'application/json'
      },
      // success(res) {
      //   that.data.user_info = res.data.data.user_info
      //   console.log(that.data.user_info)
      //   wx.setStorageSync('userinfo', that.data.user_info)
      //   wx.switchTab({
      //     url: '/pages/mine/mine',
      //   })
      // },
      complete(res) {
        wx.setStorageSync('token', that.data.token)
        wx.setStorageSync('user_info', that.data.user_info)
        wx.switchTab({
          url: '/pages/mine/mine',
        })
      }
    })
  }
})