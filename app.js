// app.js
App({
  onLaunch() {
    //开启分享功能
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  globalData: {
  },
})