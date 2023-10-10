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
    count: null,
    grade_ai: 0,
    grade_player2: 0,
    numberArray: [],
    numberArray2: [],
    //游戏结束
    overTitle: '',
    round1: 0, // 第一轮保留骰子类型
    before: "<img src='touzi_",
    after: ".png' width='40px' height='40px'/>",
    //显示得分情况
    end_round: false,
    //ai本局得分
    ai_score_round: null,
    //玩家本局得分
    play2_score_round: null,
    //本局玩家从ai手上赢得分数
    ai_win_score_round: null,
    //目前ai总分
    ai_score: null,
    //目前玩家总分
    play2_score: null,
    //目前ai积分
    ai_integral: null,
    //目前玩家积分
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
    setTimeout(function () {
      this.setData({
        hidden: true
      })
    }.bind(this), )
    
    this.setData({
      overTitle: "",
      count: 1,
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
  alertdices: function (dices1_player1, dices1_player2, rate1, rate) {
    console.log("第" + this.data.count + "局,第1轮")
    wx.showToast({
      title: "第" + this.data.count + "局,第1轮",
      icon: 'none',
      duration: 2000
    })
    setTimeout(() => {
      wx.showToast({
        title: "ai本轮选择要保留的骰子为：" + dices1_player1 + "，ai选择增加的倍率为：" + rate1,
        icon: 'none',
        duration: 4000
      })
      this.setData({
        numberArray: dices1_player1
      })
    }, 2000);

    setTimeout(() => {
      wx.showModal({
        title: '请输入您要保留的骰子序号，本轮骰子点数为：' + dices1_player2,
        editable: true, //显示输入框
        placeholderText: '请输入0-4，都不保留请输入6', //显示输入框提示信息
        success: res => {
          if (res.confirm) { //点击了确认
            console.log(res.content);

            if (res.content != 6) {
              let dices_player2 = [];
              for (let player11 of res.content.split("").map(Number)) {
                dices_player2.push(dices1_player2[player11]);

              };
              this.setData({
                numberArray2: dices_player2
              })
            }
            wx.showModal({
              title: '请输入您本轮添加的倍率',
              editable: true, //显示输入框
              placeholderText: '请输入倍率', //显示输入框提示信息
              success: res => {
                if (res.confirm) { //点击了确认
                  console.log("玩家输入本轮倍率");
                  console.log("倍率" + res.content)
                  rate += parseInt(res.content);
                  console.log("总倍率" + rate);
                  let left11 = this.data.numberArray.length; // 记录ai骰子数量
                  let left12 = 5 - this.data.numberArray2.length; // 记录剩余两轮玩家二还需要的骰子数量
                  //第二轮游戏
                  this.secondPlay(left11, left12, rate);
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
    }, 6000);
  },
  //第二轮选择保留骰子数及倍率弹窗
  alertdicesTwo: function (dices_ai2, dices1_player2, rate2, rate) {
    setTimeout(() => {
      wx.showToast({
        title: "ai本轮选择要保留的骰子为：" + dices_ai2 + "，ai选择增加的倍率为：" + rate2,
        icon: 'none',
        duration: 4000
      })
    }, 2000);

    console.log("ai本轮选择要保留的骰子为：" + dices_ai2 + "，ai选择增加的倍率为：" + rate2);
    if (dices_ai2.length > 0) {
      for (let index = 0; index < dices_ai2.length; index++) {
        this.data.numberArray.push(dices_ai2[index]);
      }
    }
    this.setData({
      numberArray: this.data.numberArray
    })
    setTimeout(() => {
      wx.showModal({
        title: '请输入您要保留的骰子序号，本轮骰子点数为：' + dices1_player2,
        editable: true, //显示输入框
        placeholderText: '从0开始，都不保留请输入6', //显示输入框提示信息
        success: res => {
          if (res.confirm) { //点击了确认
            console.log(res.content);
            if (res.content != 6) {
              for (let player11 of res.content.split("").map(Number)) {
                this.data.numberArray2.push(dices1_player2[player11]);
              };
              console.log(this.data.numberArray2);
              this.setData({
                numberArray2: this.data.numberArray2
              })
            }
            wx.showModal({
              title: '输入您本轮的倍率',
              editable: true, //显示输入框
              placeholderText: '请输入倍率', //显示输入框提示信息
              success: res => {
                if (res.confirm) { //点击了确认
                  console.log("玩家输入本轮倍率");
                  console.log("倍率" + res.content)
                  console.log("总倍率" + rate)
                  let left11 = this.data.numberArray.length; // 记录ai骰子数量
                  let left12 = 5 - this.data.numberArray2.length; // 记录剩余两轮玩家二还需要的骰子数量
                  this.thirdPlay(left11, left12, rate);
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
    }, 6000);
  },
  //第二轮游戏
  secondPlay: function (cnt1, left12, rate) {
    class player {
      constructor() {
        this.flag = 0;
        this.dice = 0;
        this.lock = 0;
      }
    }
    console.log("第" + this.data.count + "局,第2轮")
    wx.showToast({
      title: "第" + this.data.count + "局,第2轮",
      icon: 'none',
      duration: 2000
    })
    let player11 = [];
    for (let i = 0; i < 10; i++) {
      player11.push(new player()); // 相当于开一个大小为10的结构体数组，存放第一轮已保留和第二轮将投掷的值
    }
    let count1 = 0; // 将第一轮已保留的骰子放入player11中
    while (count1 < cnt1) {
      player11[count1].dice = this.data.numberArray[count1];
      player11[count1].flag = 1;
      player11[count1].lock = 1; // 表示第一轮已保留 后续必须保留
      count1++;
    }
    let count2 = cnt1;
    console.log("ai第二轮");
    console.log("ai本轮的骰子为:");
    let ai2 = [];
    while (count2 < 5) { // ai投掷第二轮骰子
      player11[count2].dice = Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min;
      ai2.push(player11[count2].dice)
      player11[count2].flag = 0;
      count2++;
    }
    console.log("ai本轮的骰子为:" + ai2);
    // 对骰子的点数从大到小进行排序
    player11.sort((a, b) => b.dice - a.dice);
    // this.setData({
    //   numberArray: this.data.numberArray.push(ai2)
    // });
    //
    let dices2_player2 = [];
    let sum2 = 0;
    console.log("player2第二轮");
    // player2除去已经保留的骰子数量，剩下的再次生成随机数
    while (sum2 < left12) {
      let s2 = Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min;
      dices2_player2.push(s2);
      sum2++;
    }
    console.log("玩家第二轮骰子为:" + dices2_player2);
    // 存放ai的骰子中1-6点出现的数量
    let num2_ai = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 5; i++) {
      if (player11[i].dice === 1) {
        num2_ai[0]++;
      } else if (player11[i].dice === 2) {
        num2_ai[1]++;
      } else if (player11[i].dice === 3) {
        num2_ai[2]++;
      } else if (player11[i].dice === 4) {
        num2_ai[3]++;
      } else if (player11[i].dice === 5) {
        num2_ai[4]++;
      } else if (player11[i].dice === 6) {
        num2_ai[5]++;
      }
    }

    // 存放ai骰子数量的数量
    let numnum2_ai = [0, 0, 0, 0, 0, 0];
    num2_ai.forEach(num => {
      numnum2_ai[num]++;
    });

    let rate2 = 0; // 第二轮ai倍率
    if (this.data.round1 === 0) {
      if (numnum2_ai[2] === 2) { // 若第一轮保留两个相同骰子 则第二轮可能保留另外两个相同骰子
        for (let i = 0; i < 4; i++) {
          if (player11[i].dice === player11[i + 1].dice && player11[i].lock === 0 && player11[i + 1].lock === 0) {
            player11[i].flag = 1;
            player11[i + 1].flag = 1;
            rate2 = 1;
          }
        }
      }
      if (numnum2_ai[3] === 1) { // 若第一轮保留两个相同骰子 则第二轮可能保留再一个与之相同的骰子
        for (let i = 0; i < 3; i++) {
          if (player11[i].dice === player11[i + 1].dice && player11[i + 1].dice === player11[i + 2].dice) {
            player11[i].flag = 1;
            player11[i + 1].flag = 1;
            player11[i + 2].flag = 1;
            rate2 = 2;
          }
        }
      }
    } else if (this.data.round1 === 1) {
      for (let i = 0; i < 2; i++) { // 若第一轮保留三个逐一递减骰子 则第二轮可能保留再一个满足逐一递减的骰子
        if (player11[i].dice === player11[i + 1].dice + 1 && player11[i + 1].dice === player11[i + 2].dice + 1 && player11[i + 2].dice === player11[i + 3].dice + 1) {
          player11[i].flag = 1;
          player11[i + 1].flag = 1;
          player11[i + 2].flag = 1;
          player11[i + 3].flag = 1;
          rate2 = 2;
        }
      }
    } else if (this.data.round1 === 2) {
      for (let i = 0; i < 3; i++) { // 若第一轮保留三个相同骰子 则第二轮可能保留再一个与之相同骰子
        if (player11[i].dice === player11[i + 1].dice && player11[i + 1].dice === player11[i + 2].dice && player11[i + 2].dice === player11[i + 3].dice) {
          player11[i].flag = 1;
          player11[i + 1].flag = 1;
          player11[i + 2].flag = 1;
          player11[i + 3].flag = 1;
          rate2 = 3;
        }
      }
    } else if (this.data.round1 === 3) { // 若第一轮保留四个相同骰子 则第二轮可能保留再一个与之相同骰子
      if (player11[0].dice === player11[1].dice && player11[1].dice === player11[2].dice && player11[2].dice === player11[3].dice && player11[3].dice === player11[4].dice) {
        player11[0].flag = 1;
        player11[1].flag = 1;
        player11[2].flag = 1;
        player11[3].flag = 1;
        player11[4].flag = 1;
        rate2 = 3;
      }
    } else if (this.data.round1 === 5) { // 若第一轮保留四个逐一递减骰子 则第二轮可能保留再一个满足逐一递减的骰子
      if (player11[0].dice === player11[1].dice + 1 && player11[1].dice === player11[2].dice + 1 && player11[2].dice === player11[3].dice + 1 && player11[3].dice === player11[4].dice + 1) {
        player11[0].flag = 1;
        player11[1].flag = 1;
        player11[2].flag = 1;
        player11[3].flag = 1;
        player11[4].flag = 1;
        rate2 = 2;
      }
    } else { // 其他两种情况已保留全部骰子
      rate2 = 3;
    }

    let dices_ai2 = [];
    for (let i = 0; i < 5; i++) { // 输出ai第二轮保留的骰子 并加入最终骰子的数组中
      if (player11[i].flag === 1 && player11[i].lock === 0) {
        dices_ai2.push(player11[i].dice);
      }
    }
    console.log("ai第2轮选择保留的骰子为:" + dices_ai2);
    console.log("ai本轮选择增加的倍率为:", rate2);
    rate += rate2;
    this.alertdicesTwo(dices_ai2, dices2_player2, rate2, rate)
  },
  //第三轮游戏
  thirdPlay: function (left21, left22, rate) {
    console.log("第" + this.data.count + "局,第3轮")
    // wx.showToast({
    //   title: "第" + this.data.count + "局,第3轮",
    //   icon: 'none',
    //   duration: 2000
    // })
    let count3 = left21;
    console.log("ai第三轮");
    console.log("ai本轮骰子为:");
    while (count3 < 5) { // ai第三轮骰子
      this.data.numberArray.push(Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min);
      count3++;
    }
    let sum22 = 0;
    console.log("player2第三轮");
    console.log("player2本轮骰子为:");
    while (sum22 < left22) { // 玩家第三轮骰子
      let s2 = Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min;
      this.data.numberArray2.push(s2);
      console.log(s2);
      sum22++;
    }
    console.log("ai最终骰子为:" + this.data.numberArray); // ai最终骰子

    console.log("player2最终骰子"); // 玩家最终骰子
    // 输出玩家一最终骰子
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
    // 两个玩家初始筹码1000
    let ai = 1000;
    let player2 = 1000;
    let num_ai = [0, 0, 0, 0, 0, 0]; // ai各个骰子数的数量
    for (let dice of this.data.numberArray) {
      if (dice === 1) {
        num_ai[0]++;
      } else if (dice === 2) {
        num_ai[1]++;
      } else if (dice === 3) {
        num_ai[2]++;
      } else if (dice === 4) {
        num_ai[3]++;
      } else if (dice === 5) {
        num_ai[4]++;
      } else if (dice === 6) {
        num_ai[5]++;
      }
    }

    // 存放player2的骰子中1-6点出现的数量
    let num_player2 = [0, 0, 0, 0, 0, 0];
    for (let dice of this.data.numberArray2) {
      if (dice === 1) {
        num_player2[0]++;
      } else if (dice === 2) {
        num_player2[1]++;
      } else if (dice === 3) {
        num_player2[2]++;
      } else if (dice === 4) {
        num_player2[3]++;
      } else if (dice === 5) {
        num_player2[4]++;
      } else if (dice === 6) {
        num_player2[5]++;
      }
    }
    // ai骰子数量的数量
    let numnum_ai = [0, 0, 0, 0, 0, 0];
    for (let num of num_ai) {
      numnum_ai[num]++;
    }
    // 玩家骰子数量的数量
    let numnum_player2 = [0, 0, 0, 0, 0, 0];
    for (let num of num_player2) {
      numnum_player2[num]++;
    }

    let flag_ai = 1;
    let flag_player2 = 1;
    // 若2345点数有一个没出现 则不可能是大顺子 flag=0
    if (num_ai[1] === 0 || num_ai[2] === 0 || num_ai[3] === 0 || num_ai[4] === 0) {
      flag_ai = 0;
    }
    if (num_player2[1] === 0 || num_player2[2] === 0 || num_player2[3] === 0 || num_player2[4] === 0) {
      flag_player2 = 0;
    }
    // 表示ai和玩家最终得分
    let score_ai = 0;
    let score_player2 = 0;
    // 初始得分 骰子数之和
    for (let dice of this.data.numberArray) {
      score_ai += dice;
    }
    for (let dice of this.data.numberArray2) {
      score_player2 += dice;
    }
    // 双对--出现2组2个相同骰子，1组单独骰子
    if (numnum_ai[1] === 1 && numnum_ai[2] === 2) {
      score_ai += 10;
    }
    // 三连--出现1组3个相同骰子，2组单独骰子
    else if (numnum_ai[3] === 1 && numnum_ai[1] === 2) {
      score_ai += 10;
    }
    // 葫芦--出现1组3个相同骰子，1组2个相同骰子
    else if (numnum_ai[3] === 1 && numnum_ai[2] === 1) {
      score_ai += 20;
    }
    // 四连--出现1组4个相同骰子，1组单独骰子
    else if (numnum_ai[4] === 1 && numnum_ai[1] === 1) {
      score_ai += 40;
    }
    // 五连--出现1组5个相同骰子
    else if (numnum_ai[5] === 1) {
      score_ai += 100;
    }
    // 大顺子--五个连续骰子
    else if (numnum_ai[1] === 5 && flag_ai === 1) {
      score_ai += 60;
    }
    // 小顺子--四个连续骰子，另一个不连续
    else if (num_ai[0] !== 0 && num_ai[1] !== 0 && num_ai[2] !== 0 && num_ai[3] !== 0) {
      score_ai += 30;
    } else if (num_ai[1] !== 0 && num_ai[2] !== 0 && num_ai[3] !== 0 && num_ai[4] !== 0) {
      score_ai += 30;
    } else if (num_ai[2] !== 0 && num_ai[3] !== 0 && num_ai[4] !== 0 && num_ai[5] !== 0) {
      score_ai += 30;
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

    console.log("ai本轮得分为:", score_ai);
    console.log("player2本轮得分为:", score_player2);
    if (score_ai > score_player2) {
      let score = rate * (score_ai - score_player2); // 计算赢的筹码
      console.log("本轮ai从player2手上赢得的分数为:", score);
      this.setData({
        //本局玩家从ai手上赢得分数
        ai_win_score_round: "本轮ai从玩家手上赢得的分数为: " + score,
      })
      ai += score;
      player2 -= score;
      this.data.grade_ai += 10; // 获胜积分+10
    } else if (score_ai === score_player2) {
      console.log("本轮双方打平");
      this.setData({
        ai_win_score_round: "本轮双方打平 ",
      })
      this.data.grade_ai += 5;
      this.data.grade_player2 += 5; // 打平各加5分
    } else {
      let score = rate * (score_player2 - score_ai);
      this.setData({
        //本局玩家从ai手上赢得分数
        ai_win_score_round: "本轮玩家从ai手上赢得的分数为: " + score,
      })

      console.log("本轮player2从ai手上赢得的分数为:", score);
      ai -= score;
      player2 += score;
      this.data.grade_player2 += 10;
    }

    console.log("目前ai的分数为:", ai);
    console.log("目前player2的分数为:", player2);
    console.log("目前ai的积分为:", this.data.grade_ai);
    console.log("目前player2的积分为:", this.data.grade_player2);
    setTimeout(() => {
      this.setData({
        end_round: true,
        numberArray: '',
        numberArray2: '',
        //ai本局得分
        ai_score_round: score_ai,
        //玩家本局得分
        play2_score_round: score_player2,
        //目前ai总分
        ai_score: ai,
        //目前玩家总分
        play2_score: player2,
        //目前ai积分
        ai_integral: this.data.grade_ai,
        //目前玩家积分
        play2_integral: this.data.grade_player2,
      })
    }, 3000);

    // 考虑被击飞的情况
    if (ai < 0) {
      console.log("ai已被击飞，游戏结束!");
      setTimeout(() => {
        this.setData({
          end_round: false,
          numberArray: '',
          numberArray2: '',
          overTitle: "ai已被击飞,游戏结束!",
          grade_ai: this.data.grade_ai,
          grade_player2: this.data.grade_player2
        })
      }, 6000);

      return;
    }
    if (player2 < 0) {
      console.log("player2已被击飞，游戏结束!");
      setTimeout(() => {
        this.setData({
          end_round: false,
          numberArray: '',
          numberArray2: '',
          overTitle: "玩家已被击飞,游戏结束!",
          grade_ai: this.data.grade_ai,
          grade_player2: this.data.grade_player2
        })
      }, 6000);

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
          grade_ai: this.data.grade_ai,
          grade_player2: this.data.grade_player2
        })
      }, 6000);

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
    class Player {
      constructor() {
        this.flag = 0;
        this.dice = 0;
        this.lock = 0;
      }
    };
    console.log("一共要进行" + this.data.roll + "局");
    console.log("ROUND", this.data.count);
    // rate表示初始倍率
    let rate = 1;
    // player1是结构体数组
    let player1 = Array.from({
      length: 10
    }, () => new Player());
    console.log("ai开始掷骰子...");
    // ai第一轮掷骰子
    let ainumberArr = [];
    for (let i = 0; i < 5; i++) {
      player1[i].dice = Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min;
      ainumberArr.push(player1[i].dice);
    }
    console.log("ai本轮的骰子为:" + ainumberArr);
    //输出ai第一轮骰子值
    this.setData({
      numberArray: ainumberArr
    });
    let dices1_player2 = [];
    console.log("player2开始掷骰子...");
    console.log("player2第一轮");
    // 玩家第一轮掷骰子
    for (let i = 0; i < 5; i++) {
      dices1_player2.push(Math.floor(Math.random() * (this.data.max - this.data.min + 1)) + this.data.min);
    }
    console.log("player2本轮的骰子为:" + dices1_player2);
    // 输出玩家二第一轮骰子值
    this.setData({
      numberArray2: dices1_player2
    })
    // 按照骰子值对结构体数组排序
    player1.sort((a, b) => b.dice - a.dice);
    let cnt1 = 0; // 第一轮保留骰子数
    // let round1 = 0; // 第一轮保留骰子类型
    let rate1 = 0; // 第一轮ai倍率
    for (let i = 0; i < 4; i++) { // 两个相同骰子
      if (player1[i].dice === player1[i + 1].dice) {
        player1[i].flag = 1;
        player1[i + 1].flag = 1;
        cnt1 = 2;
        this.data.round1 = 0;
        rate1 = 1;
        break;
      }
    }
    let resetFlags = () => {
      for (let i = 0; i < 5; i++) {
        player1[i].flag = 0;
      }
    };

    let conditions = [
      [player1[0].dice, player1[1].dice, player1[2].dice],
      [player1[1].dice, player1[2].dice, player1[3].dice],
      [player1[2].dice, player1[3].dice, player1[4].dice],
      [player1[0].dice, player1[2].dice, player1[3].dice],
      [player1[1].dice, player1[2].dice, player1[4].dice],
      [player1[1].dice, player1[3].dice, player1[4].dice]
      // ... add more conditions as needed
    ];

    for (let condition of conditions) { // 三个骰子逐一递减（顺子）
      if (condition[0] === condition[1] + 1 && condition[1] === condition[2] + 1) {
        resetFlags();
        player1[conditions.indexOf(condition)].flag = 1;
        player1[conditions.indexOf(condition) + 1].flag = 1;
        player1[conditions.indexOf(condition) + 2].flag = 1;
        cnt1 = 3;
        this.data.round1 = 1;
        rate1 = 2;
      }
    }

    function resetAllFlags() {
      for (let i = 0; i < 5; i++) {
        player1[i].flag = 0;
      }
    }
    // 四个骰子逐一递减
    if (player1[0].dice === player1[1].dice + 1 && player1[1].dice === player1[2].dice + 1 && player1[2].dice === player1[3].dice + 1) {
      resetAllFlags();
      player1[0].flag = player1[1].flag = player1[2].flag = player1[3].flag = 1;
      cnt1 = 4;
      this.data.round1 = 5;
      rate1 = 2;
    }
    if (player1[1].dice === player1[2].dice + 1 && player1[2].dice === player1[3].dice + 1 && player1[3].dice === player1[4].dice + 1) {
      resetAllFlags();
      player1[0].flag = player1[1].flag = player1[2].flag = player1[3].flag = 1;
      cnt1 = 4;
      this.data.round1 = 5;
      rate1 = 2;
    }
    if (player1[0].dice === player1[1].dice + 1 && player1[1].dice === player1[3].dice + 1 && player1[3].dice === player1[4].dice + 1) {
      resetAllFlags();
      player1[0].flag = player1[1].flag = player1[2].flag = player1[3].flag = 1;
      cnt1 = 4;
      this.data.round1 = 5;
      rate1 = 2;
    }
    // 五个骰子逐一递减
    if (player1[0].dice === player1[1].dice + 1 && player1[1].dice === player1[2].dice + 1 && player1[2].dice === player1[3].dice + 1 && player1[3].dice === player1[4].dice + 1) {
      for (let i = 0; i < 5; i++) {
        player1[i].flag = 0;
      }
      player1[0].flag = player1[1].flag = player1[2].flag = player1[3].flag = player1[4].flag = 1;
      cnt1 = 5;
      this.data.round1 = 4;
      rate1 = 3;
    }
    // 三个骰子相等
    if (player1[0].dice === player1[1].dice && player1[1].dice === player1[2].dice) {
      resetAllFlags();
      player1[0].flag = player1[1].flag = player1[2].flag = 1;
      cnt1 = 3;
      this.data.round1 = 2;
      rate1 = 2;
    }
    if (player1[1].dice === player1[2].dice && player1[2].dice === player1[3].dice) {
      resetAllFlags();
      player1[1].flag = player1[2].flag = player1[3].flag = 1;
      cnt1 = 3;
      this.data.round1 = 2;
      rate1 = 2;
    }
    if (player1[2].dice === player1[3].dice && player1[3].dice === player1[4].dice) {
      resetAllFlags();
      player1[2].flag = player1[3].flag = player1[4].flag = 1;
      cnt1 = 3;
      this.data.round1 = 2;
      rate1 = 2;
    }
    // 四个相同骰子
    if (player1[0].dice === player1[1].dice && player1[1].dice === player1[2].dice && player1[2].dice === player1[3].dice) {
      for (let i = 0; i < 5; i++) {
        player1[i].flag = 0;
      }
      player1[0].flag = player1[1].flag = player1[2].flag = player1[3].flag = 1;
      cnt1 = 4;
      this.data.round1 = 3;
      rate1 = 2;
    }

    if (player1[1].dice === player1[2].dice && player1[2].dice === player1[3].dice && player1[3].dice === player1[4].dice) {
      for (let i = 0; i < 5; i++) {
        player1[i].flag = 0;
      }
      player1[1].flag = player1[2].flag = player1[3].flag = player1[4].flag = 1;
      cnt1 = 4;
      this.data.round1 = 3;
      rate1 = 2;
    }
    // 五个相同骰子
    if (player1[0].dice === player1[1].dice && player1[1].dice === player1[2].dice && player1[2].dice === player1[3].dice && player1[3].dice === player1[4].dice) {
      for (let i = 0; i < 5; i++) {
        player1[i].flag = 0;
      }
      player1[0].flag = player1[1].flag = player1[2].flag = player1[3].flag = player1[4].flag = 1;
      cnt1 = 5;
      this.data.round1 = 4;
      rate1 = 3;
    }


    let dices_ai = []; // 存放ai保留的骰子
    for (let i = 0; i < 5; i++) {
      if (player1[i].flag === 1) { // 将保留的骰子放入dices_ai中
        console.log(player1[i].dice);
        dices_ai.push(player1[i].dice);
      }
    }
    console.log("ai本轮选择保留的骰子为:" + dices_ai);
    console.log("ai本轮选择增加的倍率为:", rate1);
    rate += rate1; // ai加倍
    // 第一轮游戏弹窗
    this.alertdices(dices_ai, dices1_player2, rate1, rate);
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