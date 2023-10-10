// pages/local/local.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 设置随机数最大最小值
    min: 1,
    max: 6,
    //想要进行的局数
    roll: null,
    //第几局
    count: 1,
    grade_player1: 0,
    grade_player2: 0,
    numberArray: [],
    numberArray2: [],
    //游戏结束
    overTitle: '',
    before: "<img src='touzi_",
    after: ".png' width='40px' height='40px'/>",
    //显示得分情况
    end_round: false,
    //玩家1本局得分
    play1_score_round: null,
    //玩家2本局得分
    play2_score_round: null,
    //本局玩家2/1从玩家1/2手上赢得分数
    play_win_score_round: null,
    //目前玩家1总分
    play1_score: null,
    //目前玩家2总分
    play2_score: null,
    //目前玩家1积分
    play1_integral: null,
    //目前玩家2积分
    play2_integral: null,
    hidden:false,
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  
  //开始游戏
  begin(e) {
    // yincang: function (e) {
      setTimeout(function () {
        this.setData({
          hidden: true
        })
      }.bind(this), )
    // },
    this.setData({

      overTitle: "",
    })
    wx.showModal({
      title: '游戏局数',
      editable: true, //显示输入框
      placeholderText: '请输入您想要进行的游戏局数', //显示输入框提示信息
      success: res => {
        if (res.confirm) { //点击了确认
          this.battle(res.content)
        } else {
          console.log('用户点击了取消')
        }
      }
    })
  },
  //第一轮选择保留骰子数及倍率弹窗
  alertdices: function (dices1_player1, dices1_player2, rate) {
    console.log("第" + this.data.count + "局,第1轮")
    wx.showToast({
      title: "第" + this.data.count + "局,第1轮",
      icon: 'none',
      duration: 2000
    })
    setTimeout(() => {
      wx.showModal({
        title: '玩家1请输入您要保留的骰子序号，本轮骰子点数为：' + this.data.numberArray,
        editable: true, //显示输入框
        placeholderText: '请输入0-4，都不保留请输入6', //显示输入框提示信息
        success: res => {
          if (res.confirm) { //点击了确认
            console.log(res.content);

            if (res.content != 6) {
              let dices_player1 = [];
              for (let player11 of res.content.split("").map(Number)) {
                dices_player1.push(dices1_player1[player11]);

              };
              this.setData({
                numberArray: dices_player1
              })
            }
            wx.showModal({
              title: '玩家1输入您本轮的倍率',
              editable: true, //显示输入框
              placeholderText: '请输入倍率', //显示输入框提示信息
              success: res => {
                if (res.confirm) { //点击了确认
                  console.log("player1输入本轮倍率");
                  rate += parseInt(res.content);
                  console.log("倍率" + res.content)
                  //玩家2输入
                  wx.showModal({
                    title: '玩家2请输入您要保留的骰子序号，本轮骰子点数为：' + this.data.numberArray2,
                    editable: true, //显示输入框
                    placeholderText: '请输入0-5，都不保留请输入6', //显示输入框提示信息
                    success: res => {
                      if (res.confirm) { //点击了确认
                        if (res.content != 6) {
                          let dices_player2 = [];
                          for (let player12 of res.content.split("").map(Number)) {
                            dices_player2.push(dices1_player2[player12]);

                          };
                          this.setData({
                            numberArray2: dices_player2
                          })
                        }
                        console.log(res.content)
                        wx.showModal({
                          title: '玩家2输入您本轮的倍率',
                          editable: true, //显示输入框
                          placeholderText: '请输入倍率', //显示输入框提示信息
                          success: res => {
                            if (res.confirm) { //点击了确认
                              rate += parseInt(res.content);
                              console.log("总倍率" + rate);
                              let left11 = 5 - this.data.numberArray.length; // 记录剩余两轮玩家一还需要的骰子数量
                              let left12 = 5 - this.data.numberArray2.length; // 记录剩余两轮玩家二还需要的骰子数量
                              //第二轮游戏
                              this.secondPlay(left11, left12, rate);
                            } else {
                              // console.log('用户点击了取消')
                            }
                          }
                        })
                      } else {
                        // console.log('用户点击了取消')
                      }
                    }
                  })
                } else {
                  // console.log('用户点击了取消')
                }
              }
            })
          } else {
            // this.alertdices(dices1_player1,dices1_player2,rate);
            // console.log('用户点击了取消')
          }
        }
      })
    }, 2000);
  },
  //第二轮选择保留骰子数及倍率弹窗
  alertdicesTwo: function (dices1_player1, dices1_player2, rate) {
    setTimeout(() => {
      wx.showModal({
        title: '玩家1请输入您要保留的骰子序号，本轮骰子点数为：' + dices1_player1,
        editable: true, //显示输入框
        placeholderText: '从0开始，都不保留请输入6', //显示输入框提示信息
        success: res => {
          if (res.confirm) { //点击了确认
            console.log(res.content);
            if (res.content != 6) {
              for (let player11 of res.content.split("").map(Number)) {
                this.data.numberArray.push(dices1_player1[player11]);
              };
              console.log(this.data.numberArray);
              this.setData({
                numberArray: this.data.numberArray
              })
            }
            wx.showModal({
              title: '玩家1输入您本轮的倍率',
              editable: true, //显示输入框
              placeholderText: '请输入倍率', //显示输入框提示信息
              success: res => {
                if (res.confirm) { //点击了确认
                  console.log("player1输入本轮倍率");
                  rate += parseInt(res.content);
                  console.log("倍率" + res.content)
                  //玩家2输入
                  wx.showModal({
                    title: '玩家2请输入您要保留的骰子序号，本轮骰子点数为：' + dices1_player2,
                    editable: true, //显示输入框
                    placeholderText: '从0开始，都不保留请输入6', //显示输入框提示信息
                    success: res => {
                      if (res.confirm) { //点击了确认
                        if (res.content != 6) {
                          for (let player12 of res.content.split("").map(Number)) {
                            this.data.numberArray2.push(dices1_player2[player12]);

                          };
                          this.setData({
                            numberArray2: this.data.numberArray2
                          })
                        }
                        console.log(res.content)
                        wx.showModal({
                          title: '玩家2输入您本轮的倍率',
                          editable: true, //显示输入框
                          placeholderText: '请输入倍率', //显示输入框提示信息
                          success: res => {
                            if (res.confirm) { //点击了确认
                              rate += parseInt(res.content);
                              console.log("总倍率" + rate);
                              let left11 = 5 - this.data.numberArray.length; // 记录剩余两轮玩家一还需要的骰子数量
                              let left12 = 5 - this.data.numberArray2.length; // 记录剩余两轮玩家二还需要的骰子数量
                              //第三轮游戏
                              this.thirdPlay(left11, left12, rate);
                            } else {
                              // console.log('用户点击了取消')
                            }
                          }
                        })
                      } else {
                        // console.log('用户点击了取消')
                      }
                    }
                  })
                } else {
                  // console.log('用户点击了取消')
                }
              }
            })
          } else {
            // this.alertdices(dices1_player1,dices1_player2,rate);
            // console.log('用户点击了取消')
          }
        }
      })
    }, 2000);
  },
  //第二轮游戏
  secondPlay: function (left11, left12, rate) {
    console.log("第" + this.data.count + "局,第2轮")
    wx.showToast({
      title: "第" + this.data.count + "局,第2轮",
      icon: 'none',
      duration: 2000
    })
    let dices2_player1 = []; // 记录第二轮玩家一骰子
    let sum1 = 0;
    console.log("player1第二轮");
    // 第二轮玩家一掷随机骰子
    while (sum1 < left11) {
      let s1 = Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min;
      dices2_player1.push(s1);
      console.log(s1);
      sum1++;
    }
    console.log("player1第二轮玩家1:" + dices2_player1);
    let dices2_player2 = []; // 记录第二轮玩家二骰子
    let sum2 = 0;
    console.log("player2第二轮");
    // 第二轮玩家二掷随机骰子
    while (sum2 < left12) {
      let s2 = Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min;
      dices2_player2.push(s2);
      console.log(s2);
      sum2++;
    }
    console.log("player1第二轮玩家2:" + dices2_player2);
    this.alertdicesTwo(dices2_player1, dices2_player2, rate)
  },
  //第三轮游戏
  thirdPlay: function (left21, left22, rate) {
    console.log("第" + this.data.count + "局,第3轮")
    // wx.showToast({
    //   title: "第"+this.data.count+"局,第3轮",
    //   icon: 'none',
    //   duration: 2000
    // })
    let sum21 = 0;
    console.log("player1第三轮");
    // 玩家一第三轮掷骰子
    while (sum21 < left21) {
      let s2 = Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min;
      this.data.numberArray.push(s2); // 将第三轮骰子的值加入最终骰子dices_player1中
      console.log(s2);
      sum21++;
    }

    let sum22 = 0;
    console.log("player2第三轮");
    // 玩家二第三轮掷骰子
    while (sum22 < left22) {
      let s2 = Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min;
      this.data.numberArray2.push(s2); // 将第三轮骰子的值加入最终骰子dices_player2中
      console.log(s2);
      sum22++;
    }
    // 输出玩家一最终骰子
    console.log("player1最终骰子:" + this.data.numberArray);
    this.setData({
      numberArray: this.data.numberArray
    })
    // 输出玩家二最终骰子
    console.log("player2最终骰子:" + this.data.numberArray2);
    this.setData({
      numberArray2: this.data.numberArray2
    })
    console.log("最终倍率为:", rate); // 输出最终倍率
    //分数计算
    this.scoreCalculation(rate)
  },
  //分数计算
  scoreCalculation: function (rate) {
    //大小顺子
    let flag_player1 = 1;
    let flag_player2 = 1;
    // 两个玩家初始筹码1000
    let player1 = 1000;
    let player2 = 1000;
    // 记录玩家一各个数骰子数量
    let num_player1 = [0, 0, 0, 0, 0, 0];
    for (let dice of this.data.numberArray) {
      if (dice === 1) num_player1[0]++;
      if (dice === 2) num_player1[1]++;
      if (dice === 3) num_player1[2]++;
      if (dice === 4) num_player1[3]++;
      if (dice === 5) num_player1[4]++;
      if (dice === 6) num_player1[5]++;
    }
    // 记录玩家二各个数骰子数量
    let num_player2 = [0, 0, 0, 0, 0, 0];
    for (let dice of this.data.numberArray2) {
      if (dice === 1) num_player2[0]++;
      if (dice === 2) num_player2[1]++;
      if (dice === 3) num_player2[2]++;
      if (dice === 4) num_player2[3]++;
      if (dice === 5) num_player2[4]++;
      if (dice === 6) num_player2[5]++;
    }
    // 记录玩家一骰子数量的数量
    let numnum_player1 = [0, 0, 0, 0, 0, 0];
    for (let num of num_player1) {
      numnum_player1[num]++;
    }
    // 记录玩家二骰子数量的数量
    let numnum_player2 = [0, 0, 0, 0, 0, 0];
    for (let num of num_player2) {
      numnum_player2[num]++;
    }
    flag_player1 = 1, flag_player2 = 1;
    if (num_player1[1] === 0 || num_player1[2] === 0 || num_player1[3] === 0 || num_player1[4] === 0) {
      flag_player1 = 0; // 若2345有一个数值没有骰子，则不可能是大顺子，flag置0
    }
    if (num_player2[1] === 0 || num_player2[2] === 0 || num_player2[3] === 0 || num_player2[4] === 0) {
      flag_player2 = 0; // 若2345有一个数值没有骰子，则不可能是大顺子，flag置0
    }
    // score记录两个玩家初始分值——所有骰子数之和
    let score_player1 = 0,
      score_player2 = 0;
    for (let dice of this.data.numberArray) {
      score_player1 += dice;
    }
    for (let dice of this.data.numberArray2) {
      score_player2 += dice;
    }
    // 计算player1骰子奖励分
    if (numnum_player1[1] === 1 && numnum_player1[2] === 2) {
      score_player1 += 10; // 双对
    } else if (numnum_player1[3] === 1 && numnum_player1[1] === 2) {
      score_player1 += 10; // 三连
    } else if (numnum_player1[3] === 1 && numnum_player1[2] === 1) {
      score_player1 += 20; // 葫芦
    } else if (numnum_player1[4] === 1 && numnum_player1[1] === 1) {
      score_player1 += 40; // 四连
    } else if (numnum_player1[5] === 1) {
      score_player1 += 100; // 五连
    } else if (numnum_player1[1] === 5 && flag_player1 === 1) {
      score_player1 += 60; // 大顺子
    } else if (num_player1[0] !== 0 && num_player1[1] !== 0 && num_player1[2] !== 0 && num_player1[3] !== 0) {
      score_player1 += 30; // 小顺子
    } else if (num_player1[1] !== 0 && num_player1[2] !== 0 && num_player1[3] !== 0 && num_player1[4] !== 0) {
      score_player1 += 30; // 小顺子
    } else if (num_player1[2] !== 0 && num_player1[3] !== 0 && num_player1[4] !== 0 && num_player1[5] !== 0) {
      score_player1 += 30; // 小顺子
    }

    if (numnum_player2[1] === 1 && numnum_player2[2] === 2) {
      score_player2 += 10;
    } else if (numnum_player2[3] === 1 && numnum_player2[1] === 2) {
      score_player2 += 10;
    } else if (numnum_player2[3] === 1 && numnum_player2[2] === 1) {
      score_player2 += 20;
    } else if (numnum_player2[4] === 1 && numnum_player2[1] === 1) {
      score_player2 += 40;
    } else if (numnum_player2[5] === 1) {
      score_player2 += 100;
    } else if (numnum_player2[1] === 5 && flag_player2 === 1) {
      score_player2 += 60;
    } else if (num_player2[0] !== 0 && num_player2[1] !== 0 && num_player2[2] !== 0 && num_player2[3] !== 0) {
      score_player2 += 30;
    } else if (num_player2[1] !== 0 && num_player2[2] !== 0 && num_player2[3] !== 0 && num_player2[4] !== 0) {
      score_player2 += 30;
    } else if (num_player2[2] !== 0 && num_player2[3] !== 0 && num_player2[4] !== 0 && num_player2[5] !== 0) {
      score_player2 += 30;
    }
    // 输出最后得分
    console.log("player1本轮得分为:", score_player1);
    console.log("player2本轮得分为:", score_player2);

    let score;
    if (score_player1 > score_player2) {
      score = rate * (score_player1 - score_player2); // 计算赢的筹码
      console.log("本轮player1从player2手上赢得的分数为:", score);
      this.setData({
        play_win_score_round: "本轮玩家1从玩家2手上赢得的分数为: " + score,
      })
      player1 += score;
      player2 -= score;
      this.data.grade_player1 += 10; // 获胜积分+10
    } else if (score_player1 === score_player2) {
      console.log("本轮双方打平");
      this.setData({
        play_win_score_round: "本轮双方打平 ",
      })
      this.data.grade_player1 += 5;
      this.data.grade_player2 += 5; // 打平均+5
    } else {
      score = rate * (score_player2 - score_player1);
      console.log("本轮player2从player1手上赢得的分数为:", score);
      this.setData({
        //本局玩家从ai手上赢得分数
        play_win_score_round: "本轮玩家2从玩家1手上赢得的分数为: " + score,
      })
      player2 += score;
      player1 -= score;
      this.data.grade_player2 += 10;
    }

    console.log("目前player1的分数为:", player1);
    console.log("目前player2的分数为:", player2);
    console.log("目前player1的积分为:", this.data.grade_player1);
    console.log("目前player2的积分为:", this.data.grade_player2);
    setTimeout(() => {
      this.setData({
        end_round: true,
        numberArray: '',
        numberArray2: '',
        //玩家1本局得分
        play1_score_round: score_player1,
        //玩家2本局得分
        play2_score_round: score_player2,
        //目前玩家1总分
        play1_score: player1,
        //目前玩家2总分
        play2_score: player2,
        //目前玩家1积分
        play1_integral: this.data.grade_player1,
        //目前玩家2积分
        play2_integral: this.data.grade_player2,
      })
    }, 3000);

    // 考虑没有筹码 被击飞的情况
    if (player1 < 0) {
      console.log("player1已被击飞,游戏结束!");
      setTimeout(() => {
        this.setData({
          end_round: false,
          numberArray: '',
          numberArray2: '',
          overTitle: "player1已被击飞,游戏结束!",
          grade_player1: this.data.grade_player1,
          grade_player2: this.data.grade_player2
        })
      }, 6000);
      // 传递数据
      wx.setStorageSync('playScore', {
        grade_player1: this.data.grade_player1,
        grade_player2: this.data.grade_player2
      })



      return;
    }
    if (player2 < 0) {
      console.log("player2已被击飞,游戏结束!");
      setTimeout(() => {
        this.setData({
          end_round: false,
          numberArray: '',
          numberArray2: '',
          overTitle: "player2已被击飞,游戏结束!",
          grade_player1: this.data.grade_player1,
          grade_player2: this.data.grade_player2
        })
      }, 6000);
      // 传递数据
      wx.setStorageSync('playScore', {
        grade_player1: this.data.grade_player1,
        grade_player2: this.data.grade_player2
      })
      return;
    }
    this.data.count++;
    if (this.data.count > this.data.roll) {
      console.log("游戏结束");
      setTimeout(() => {
        this.setData({
          end_round: false,
          numberArray: '',
          numberArray2: '',
          overTitle: "游戏结束!",
          grade_player1: this.data.grade_player1,
          grade_player2: this.data.grade_player2
        })
      }, 6000);
      // 传递数据
      wx.setStorageSync('playScore', {
        grade_player1: this.data.grade_player1,
        grade_player2: this.data.grade_player2
      })
      return;
    } else {
      setTimeout(() => {
        this.setData({
          end_round: false,
        })
        this.beginGame();
      }, 6000);
    }

  },
  //开始游戏
  beginGame: function () {
    console.log("一共要进行" + this.data.roll + "局");
    console.log("ROUND", this.data.count);
    // rate表示初始筹码，flag用来表示大顺子还是小顺子（后续if语句中可见）
    let rate = 1;
    console.log("player1开始掷骰子...");
    // 获取玩家一第一轮随机骰子数
    let dices1_player1 = [
      Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min,
      Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min,
      Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min,
      Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min,
      Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min
    ];
    // 输出玩家一第一轮骰子值
    console.log("player1第一轮" + dices1_player1);
    // for (let dice1_player1 of dices1_player1) {
    //   console.log("player1第一轮骰子值为"+dice1_player1);
    // }
    this.setData({
        numberArray: dices1_player1
      }),
      console.log("player2开始掷骰子...");
    console.log("player2第一轮");
    // 获取玩家二第一轮骰子值
    let dices1_player2 = [
      Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min,
      Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min,
      Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min,
      Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min,
      Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min
    ];
    console.log("player2本轮的骰子为:" + dices1_player2);
    // 输出玩家二第一轮骰子值
    this.setData({
        numberArray2: dices1_player2
      }),
      // 第一轮游戏弹窗
      this.alertdices(dices1_player1, dices1_player2, rate);
  },
  //对战游戏
  battle: function (e) {
    // roll表示想要进行的局数、count表示当前第几局
    this.data.roll = parseInt(e);
    this.beginGame();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }

})