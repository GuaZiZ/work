// pages/main/main.js
Page({
  data: {
    hidden: true,
    hidden1: true,
    grade_player1:null,
    grade_player2:null,
  },
  // 隐藏
  yincang: function (e) {
    setTimeout(function () {
      this.setData({
        hidden: true
      })
    }.bind(this), )
  },
  // 显示
  xianshi: function (e) {
    setTimeout(function () {
      this.setData({
        hidden: false
      })
    }.bind(this), )
  },

  yincang1: function (e) {

    setTimeout(function () {
      this.setData({
        hidden1: true
      })
    }.bind(this), )
  },
  // 显示
  xianshi1: function (e) {
    // 接收数据的页面
    console.log(wx.getStorageSync('playScore'));
    this.setData({
      grade_player1:wx.getStorageSync('playScore').grade_player1,
      grade_player2:wx.getStorageSync('playScore').grade_player2
    })
    setTimeout(function () {
      this.setData({
        hidden1: false
      })
    }.bind(this), )
  },
  begin() {
    wx.navigateTo({
      url: '/pages/pattern/pattern' //url后面是跳转地址（备注不要复制进去）
    })
  },
  begin1() {
    wx.navigateTo({
      url: '/pages/ai/ai' //url后面是跳转地址（备注不要复制进去）
    })
  },

})