// 获取键盘输入值
const readline = require('readline-sync');
// 设置随机数最大最小值
let min = 1;
let max = 6;

// roll表示想要进行的局数、count表示当前第几局
console.log("请输入你要参与的局数:");
let roll = parseInt(readline.question());
let count = 1;
// 两个玩家初始积分
let grade_player1 = 0;
let grade_player2 = 0;

while (count <= roll) {
    console.log("ROUND", count);
	// rate表示初始筹码，flag用来表示大顺子还是小顺子（后续if语句中可见）
    let rate = 1;
    let flag_player1 = 1;
    let flag_player2 = 1;
	// 两个玩家初始筹码1000
    let player1 = 1000;
    let player2 = 1000;

    console.log("player1开始掷骰子...");
    console.log("player1骰子的结果为:");
	// 获取玩家一第一轮随机骰子数
    let dices1_player1 = [
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min
    ];
	// 输出玩家一第一轮骰子值
    console.log("player1第一轮");
    for (let dice1_player1 of dices1_player1) {
        console.log(dice1_player1);
    }

    console.log("player2开始掷骰子...");
    console.log("player2第一轮");
	// 获取玩家二第一轮骰子值
    let dices1_player2 = [
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min
    ];
    console.log("player2本轮的骰子为:");
	// 输出玩家二第一轮骰子值
    for (let dice1_player2 of dices1_player2) {
        console.log(dice1_player2);
    }
	// players11、players12表示两个玩家想要保留的骰子序号
    console.log("player1输入要保留的骰子序号:(从0开始，不带空格哦，都不保留输入6)");
    let players11 = readline.question().split("").map(Number);
    console.log("player2输入要保留的骰子序号:(从0开始，不带空格哦，都不保留输入6)");
    let players12 = readline.question().split("").map(Number);

	// 两个玩家加倍
    console.log("player1输入本轮倍率");
    rate += parseInt(readline.question());
    console.log("player2输入本轮倍率");
    rate += parseInt(readline.question());
	
    let dices_player1 = []; // 将players11中序号的骰子数加入dices_player1中，dices_player1存放最终骰子
    let cnt11 = 0; // 记录第一轮玩家一保留骰子数量
    if (players11[0] < 6) {
        for (let player11 of players11) {
            dices_player1.push(dices1_player1[player11]);
            cnt11++;
        }
    }
    let left11 = 5 - cnt11; // 记录剩余两轮玩家一还需要的骰子数量

    let dices_player2 = []; // 将players12中序号的骰子数加入dices_player2中，dices_player2存放最终骰子
    let cnt12 = 0;// 记录第一轮玩家二保留骰子数量
    if (players12[0] < 6) {
        for (let player12 of players12) {
            dices_player2.push(dices1_player2[player12]);
            cnt12++;
        }
    }
    let left12 = 5 - cnt12; // 记录剩余两轮玩家二还需要的骰子数量

    let dices2_player1 = [];// 记录第二轮玩家一骰子
    let sum1 = 0;
    console.log("player1第二轮");
	// 第二轮玩家一掷随机骰子
    while (sum1 < left11) {
        let s1 = Math.floor(Math.random() * (max - min + 1)) + min;
        dices2_player1.push(s1);
        console.log(s1);
        sum1++;
    }

    let dices2_player2 = [];// 记录第二轮玩家二骰子
    let sum2 = 0;
    console.log("player2第二轮");
	// 第二轮玩家二掷随机骰子
    while (sum2 < left12) {
        let s2 = Math.floor(Math.random() * (max - min + 1)) + min;
        dices2_player2.push(s2);
        console.log(s2);
        sum2++;
    }
	// players21、players22表示两个玩家第二轮想要保留的骰子序号
    console.log("player1输入要保留的骰子序号:(从0开始，不带空格哦，都不保留输入6)");
    let players21 = readline.question().split("").map(Number);
    console.log("player2输入要保留的骰子序号:(从0开始，不带空格哦，都不保留输入6)");
    let players22 = readline.question().split("").map(Number);
	// 玩家加倍
    console.log("player1输入本轮倍率");
    rate += parseInt(readline.question());
    console.log("player2输入本轮倍率");
    rate += parseInt(readline.question());


    let cnt21 = 0; // 记录第二轮玩家一保留骰子数量
    if (players21[0] < 6) {
        for (let player21 of players21) {
            dices_player1.push(dices2_player1[player21]); // 将players21中序号的骰子数加入dices_player1中
            cnt21++;
        }
    }
    let left21 = left11 - cnt21; // 记录玩家一剩余骰子数量

    let cnt22 = 0; // 记录第二轮玩家二保留骰子数量
    if (players22[0] < 6) {
        for (let player22 of players22) {
            dices_player2.push(dices2_player2[player22]); // 将players22中序号的骰子数加入dices_player2中
            cnt22++;
        }
    }
    let left22 = left12 - cnt22; // 记录玩家二剩余骰子数量

    let sum21 = 0;
    console.log("player1第三轮");
	// 玩家一第三轮掷骰子
    while (sum21 < left21) {
        let s2 = Math.floor(Math.random() * (max - min + 1)) + min;
        dices_player1.push(s2); // 将第三轮骰子的值加入最终骰子dices_player1中
        console.log(s2);
        sum21++;
    }

    let sum22 = 0;
    console.log("player2第三轮");
	// 玩家二第三轮掷骰子
    while (sum22 < left22) {
        let s2 = Math.floor(Math.random() * (max - min + 1)) + min;
        dices_player2.push(s2); // 将第三轮骰子的值加入最终骰子dices_player2中
        console.log(s2);
        sum22++;
    }
	// 输出玩家一最终骰子
    console.log("player1最终骰子");
    for (let dice of dices_player1) {
        console.log(dice);
    }
	// 输出玩家二最终骰子
    console.log("player2最终骰子");
    for (let dice of dices_player2) {
        console.log(dice);
    }

    console.log("最终倍率为:", rate); // 输出最终倍率
	// 记录玩家一各个数骰子数量
    let num_player1 = [0, 0, 0, 0, 0, 0];
    for (let dice of dices_player1) {
        if (dice === 1) num_player1[0]++;
        if (dice === 2) num_player1[1]++;
        if (dice === 3) num_player1[2]++;
        if (dice === 4) num_player1[3]++;
        if (dice === 5) num_player1[4]++;
        if (dice === 6) num_player1[5]++;
    }
	// 记录玩家二各个数骰子数量
    let num_player2 = [0, 0, 0, 0, 0, 0];
    for (let dice of dices_player2) {
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
    let score_player1 = 0, score_player2 = 0;
    for (let dice of dices_player1) {
        score_player1 += dice;
    }
    for (let dice of dices_player2) {
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
        player1 += score;
        player2 -= score;
        grade_player1 += 10; // 获胜积分+10
    } else if (score_player1 === score_player2) {
        console.log("本轮双方打平");
        grade_player1 += 5;
        grade_player2 += 5; // 打平均+5
    } else {
        score = rate * (score_player2 - score_player1);
        console.log("本轮player2从player1手上赢得的分数为:", score);
        player2 += score;
        player1 -= score;
        grade_player2 += 10;
    }

    console.log("目前player1的分数为:", player1);
    console.log("目前player2的分数为:", player2);
    console.log("目前player1的积分为:", grade_player1);
    console.log("目前player2的积分为:", grade_player2);
	// 考虑没有筹码 被击飞的情况
    if (player1 < 0) {
        console.log("player1已被击飞,游戏结束!");
        count = roll;
    }
    if (player2 < 0) {
        console.log("player2已被击飞,游戏结束!");
        count = roll;
    }

    count++;
}

// 所有局数结束后的积分
console.log("最终player1的积分为:", grade_player1);
console.log("最终player2的积分为:", grade_player2);
console.log("已经退出掷骰子模式");
