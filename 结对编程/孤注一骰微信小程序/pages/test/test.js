Page({
  data:{
    hidden:true,
},
onTapRoll() {
  // 计算滚动动画需要的参数
  const scrollHeight = 300; // 滚动区域高度
  const duration = 2000; // 动画时长
  const targetPosition = Math.floor(Math.random() * 6) * scrollHeight / 6; // 目标位置

  // 创建位移动画
  const animation = wx.createAnimation({
    duration,
    timingFunction: 'ease',
  });
  animation.translateY(-targetPosition).step();

  // 创建透明度动画
  const opacityAnimation = wx.createAnimation({
    duration,
    timingFunction: 'ease',
  });
  opacityAnimation.opacity(0).step();

  // 更新数据并播放动画
  this.setData({
    scrollAnimation: animation.export(),
    opacityAnimation: opacityAnimation.export(),
    isRolling: true, // 标记正在滚动中
  });

  // 监听动画完成事件
  setTimeout(() => {
    this.setData({
      isRolling: false, // 标记滚动完成
    });
  }, duration);
}

 
})