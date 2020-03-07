import Ajax from './../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showit:false,
    current: 'tab1',
    current_scroll: 'tab1',
    currentp: 1,
    tab1:true,
    tab2: false,
    tab3: false,
    tab4: false,
    tab5: false,
    tab6: false,
    tab7: false,
    cloth:null,
    total:1,
    sy:[],
    ku:[],
    qun:[],
    sock:[],
    ps:[],
    bag:[],
    suit:[],
    myclick:[],
    imageUrl: [{ n: "https://img-blog.csdnimg.cn/20191002185135158.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzc1MTE5,size_1,color_FFFFFF,t_70" }, { n: "https://img-blog.csdnimg.cn/20191002185135158.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzc1MTE5,size_1,color_FFFFFF,t_70" }, { n: "https://img-blog.csdnimg.cn/20191002185135158.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzc1MTE5,size_1,color_FFFFFF,t_70" }, { n: "https://img-blog.csdnimg.cn/20191002185135158.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzc1MTE5,size_1,color_FFFFFF,t_70" }, { n: "https://img-blog.csdnimg.cn/20191002185135158.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNzc1MTE5,size_1,color_FFFFFF,t_70" }]
  },
startit:function(e){
  console.log(e.currentTarget.dataset.dataset.n);
  let b=this.data.myclick;
  b.push(e);
  this.setData({
    myclick:b
  })
  console.log(b);
},
deleteit:function(e){
  console.log(e);
  let b = this.data.myclick;
  b.pop(e);
  this.setData({
    myclick: b
  })
  console.log(b);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync("token");
    Ajax({
      url: 'clothes/clothes',
      method: 'GET',
      header: {
        token
      }
    }).then(res => {
      console.log(res)
      this.setData({
        cloth:res.data,
        currentp:res.current_page,
        total:res.total
      })
      console.log(res.data)
      var cloth = this.data.cloth;
      var tag=['上衣','裤子','裙装','鞋袜','配饰','包包'];
      var classes = ['sy', 'ku', 'qun', 'sock', 'ps', 'bag'];
      for (let i = 0; i < cloth.length; i++) 
        for(let j=0;j<6;j++){
           let flag = cloth[i].category.includes(tag[j]);
           if(flag){
             
             var myclass = classes[j];
             var myclassed = this.data.cloth[i];
             var old = this.data[myclass];
             old = old.push(myclassed);
             this.setData({
               myclass: old
             })
             console.log(myclass)
             console.log(this.data[myclass])

             j=6;
           }
        }
    })
    Ajax({
      url: 'clothes/suit',
      method: 'GET',
      header: {
        token
      }
    }).then(res => {
      console.log(res)
      this.setData({
        suit:res.data
      })
      
    })
  },
  onChange: function (e) {
    console.log(e.detail)
  },
  onScale: function (e) {
    console.log(e.detail)
  },
  toggleLeft1() {
    this.setData({
      showLeft1: !this.data.showLeft1
    });
  },
  changeOpened:function(){
    var showit = !this.data.showit;
    this.setData({
      showit
    })
    //console.log(showit)
  },
  
 setsuit:function(){
    this.changeOpened();
   wx.createOffscreenCanvas();
  },
  handleChangeScroll({ detail }) {
    var index = detail.key
    console.log(index)
    this.setData({
      current_scroll: detail.key,
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: false,
      tab6: false,
      tab7: false
    });
    console.log("before",this.data)
    
      if(index==1){
        this.setData({
          tab1:true
        })
      } else if (index == 2) {
        this.setData({
          tab2: true
        })
      } else if (index == 3) {
        this.setData({
          tab3: true
        })
      } else if (index == 4) {
        this.setData({
          tab4: true
        })
      } else if (index == 5) {
        this.setData({
          tab5: true
        })
      } else if (index == 6) {
        this.setData({
          tab6: true
        })
      } else if (index == 7) {
        this.setData({
          tab7: true
        })
      }
    
    console.log("after", this.data)
  },
  

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data)
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