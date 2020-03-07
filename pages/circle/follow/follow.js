const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null,
    next: null,
    height: 0,
    loading: true,
    hardheight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.followData)
    this.setData({
      data: app.globalData.followData.data,
      next: app.globalData.followData.next
    })
    
  },
  onchange: function (e) {

    //console.log(e)
    this.setData({
      height: e.detail.scrollHeight
    })
  },
  cardClick: function (e) {
    console.log(e);
    getApp().globalData.circleData = e.currentTarget.dataset.dataset;

    wx.navigateTo({
      url: '../detail/detail',
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
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