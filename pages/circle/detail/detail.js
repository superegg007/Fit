import Ajax from '../../../utils/request'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    com: null,
    userData:null,
    flag:1,
    deflag:1,
    showtextarea:false,
    isme:true,
    isflag:false
  },
  enterta:function(e){
    console.log(e)
    const data = e.currentTarget.dataset.dataset;
    getApp().globalData.homedata=data;
    wx.navigateTo({
      url: '../myhome/myhome',
    })
  },
  enterhost: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../myhome/myhome',
    })
  },
  docomment:function(e){
    console.log(e);
    const fromid = e.currentTarget.dataset.dataset.from;
    const id=wx.getStorageSync("openid");
    const comid = e.currentTarget.dataset.dataset.id;
    const token = wx.getStorageSync("token");
    if(id==fromid){
      wx.showModal({
        title: '是否要删除评论',
        success(res) {
          if (res.confirm) {
            Ajax({
              url: `moment/comment/${comid}`,
              method: 'DELETE',
              header: {
                token
              },
              
            }).then(res => {
              console.log(res)
              wx.showToast({
                title: '删除成功',
              })
              this.setData({

              })
              this.onPullDownRefresh();
              wx.stopPullDownRefresh();
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else {
      this.setData({
        toflag:true
      })
      Ajax({
        url: `moment/comment/`,
        method: 'POST',
        header: {
          token
        },
        data: {
          "comment": {
            "content": str,
            "to": id,
            "refer":fromid
          }
        }
      }).then(res => {
        console.log(res)
        const comments_num = this.data.userData.comments_num;
        this.setData({
          userData: {
            comments_num
          },
          toflag:false
        })
        
      })
    }
  },
  makecompost:function(e){
    console.log(e)
    const id = this.data.userData.id;
    const token = wx.getStorageSync("token");
    const str=e.detail.value;
    console.log(id,token,str)
    Ajax({
      url: `moment/comment/`,
      method: 'POST',
      header: {
        token
      },
      data: {
        "comment": {
          "content": str,
          "to": id
        }
      }
    }).then(res => {
      console.log(res)
      const comments_num=this.data.userData.comments_num;
      this.setData({
        userData:{
          comments_num
        }
      })
      this.onPullDownRefresh();
      this.stopPullDownRefresh();
    })
    this.stopPullDownRefresh();
  },
  makecom:function(e){
    
    this.setData({
      showtextarea:true
    })
    
  },
  makelike:function(){
    const token = wx.getStorageSync("token");
    const id = this.data.userData.id;

    Ajax({
      url: `moment/checkIfLiked/${id}`,
      method: 'GET',
      header: {
        token
      }
    }).then(res => {
      console.log(res)
      if(res.errcode){
        const likes_num = this.data.userData.likes_num - 1;
        Ajax({
          url: `moment/like/${id}`,
          method: 'DELETE',
          header: {
            token
          }
        }).then(res => {
          console.log(res)
          if (this.data.deflag) {
            this.setData({
              userData: {
                likes_num
              },
              deflag: 0
            })
          }
          wx.showToast({
            title: '已取消点赞',
          })
        })
      }else{
        const likes_num = this.data.userData.likes_num + 1;
      Ajax({
        url: `moment/like/${id}`,
        method: 'GET',
        header: {
          token
        }
      }).then(res => {
        console.log(res)
        if(this.data.flag){
        this.setData({
          userData: {
            likes_num
          },
          flag:0
        })}
        wx.showToast({
          title: '已点赞',
        })
      })

    }
    })
  },
  stopPullDownRefresh:function(){
    wx.stopPullDownRefresh();
  },
  onPullDownRefresh: function () {
    wx.startPullDownRefresh(wx.stopPullDownRefresh(), wx.stopPullDownRefresh());

    const token = wx.getStorageSync("token");
    const id = this.data.userData.id;
    Ajax({
      url: `moment/comment/${id}`,
      method: 'GET',
      header: {
        token
      }
    }).then(res => {
      console.log(res)
      this.setData({
        com: res
      })
      console.log("okok")
      this.stopPullDownRefresh();
    })
    this.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.circleData) 
    this.setData({
      userData:app.globalData.circleData
    })
    
    const token = wx.getStorageSync("token");
    const id = this.data.userData.id;
    Ajax({
      url: `moment/comment/${id}`,
      method: 'GET',
      header: {
        token
      }
    }).then(res => {
      console.log(res)
      this.setData({
        com:res
      })
      this.stopPullDownRefresh();
    })
    this.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

 

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})