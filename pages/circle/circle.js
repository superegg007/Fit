import Ajax from './../../utils/request'
const app = getApp();

Page({
  
  onPullDownRefresh:function(){
    wx.startPullDownRefresh(null,wx.stopPullDownRefresh());
    const token = wx.getStorageSync("token");
    Ajax({
      url: 'moment/moment',
      method: 'GET',
      header: {
        token
      }
    }).then(res => {
      console.log(res)
      const data = res.data;
      const next = res.next_page_url;
      this.setData({
        data: data,
        next
      })
      console.log("ok")
      wx.stopPullDownRefresh();
      
    })
    wx.stopPullDownRefresh();
  },
  openfollow(){
    const token = wx.getStorageSync("token");
    Ajax({
      url: 'moment/allFollowingMoment',
      method: 'GET',
      header: {
        token
      }
    }).then(res => {
      console.log(res)
      const data = res.data;
      const next = res.next_page_url;
      console.log(data,next);
      getApp().globalData.followData={
        data,
        next
      }
      wx.navigateTo({
        url: 'follow/follow',
      })
    })
  },
  onchange:function(e){
   
    //console.log(e)
    this.setData({
      height:e.detail.scrollHeight
    })
  },
  cardClick:function(e){
    console.log(e);
    getApp().globalData.circleData=e.currentTarget.dataset.dataset;
    
    wx.navigateTo({
      url: 'detail/detail',
    })
  },
  handlePage:function(){
    this.setData({
      loading:true
    })
    var mythis = this;
    const token = wx.getStorageSync("token");
    console.log(this.data.next)
    var url = this.data.next;
    wx.request({
       url, 
      header: {
        'content-type': 'application/json', // 默认值
        token
      },
      success(res) {
        var a = mythis.data.data;
        var b = res.data.data.data;
        var newdata = a.concat(b);
        var next = res.data.next_page_url == null ? '' : res.data.next_page_url;
        console.log(newdata,next)
        mythis.setData({
          data:newdata,
          next ,
          
        })
        console.log(mythis.data)
        
      }
    })
    
  },
  onLoad:function(){
    this.data.hasUserInfo === app.globalData.hasUserInfo ?
      null
      :
      this.setData({
        hasUserInfo: app.globalData.hasUserInfo
      })
    if (app.globalData.hasUserInfo) {
      const token = wx.getStorageSync("token");
      Ajax({
        url: 'moment/moment',
        method: 'GET',
        header: {
          token
        }
      }).then(res => {
        console.log(res)
        const data = res.data;
        const next = res.next_page_url;
        this.setData({
          data: data,
          next
        })

        console.log(next, this.data.next)
        console.log(this.data)
      })
    }
  },
  onShow: function () {
   
    
  },
  data: {
    hasUserInfo: false,
    data: null,
    next:null,
    height:0,
    loading:true,
    hardheight:0
  }
})