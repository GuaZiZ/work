// 获取键盘输入值
const readline = require('readline-sync');
// 设置随机数最大最小值
let min = 1;
let max = 6;
// ai和玩家筹码

let ai = 1000;
let player2 = 1000;
// roll表示想要进行的局数、count表示当前第几局
console.log("请输入你要参与的局数：");
let roll = parseInt(readline.question());
let rollNum = parseInt(roll); // 转成int型
let count = 1;
// 两个玩家初始积分
let grade_ai = 0;
let grade_player2 = 0;

// 定义类 存放flag标记是否被选中保留 lock表示第一轮是否被保留 dice存放骰子数值
class Player {
    constructor() {
        this.flag = 0;
        this.dice = 0;
        this.lock = 0;
    }
}


class player {
    constructor() {
        this.flag = 0;
        this.dice = 0;
        this.lock = 0;
    }
}

while (count <= rollNum) {
	console.log("ROUND", count);
	// 初始倍率
	let rate = 1;
	// player1是结构体数组
	let player1 = Array.from({length: 10}, () => new Player());
	console.log("ai开始掷骰子...");
	console.log("ai第一轮");
	console.log("ai本轮的骰子为:");
	// ai第一轮掷骰子
	for (let i = 0; i < 5; i++) {
		player1[i].dice = Math.floor(Math.random() * (max - min + 1)) + min;
		console.log(player1[i].dice);
	}

	let dices1_player2 = [];
	console.log("player2开始掷骰子...");
	console.log("player2第一轮");
	console.log("player2本轮的骰子为:");
	// 玩家第一轮掷骰子
	for (let i = 0; i < 5; i++) {
		dices1_player2.push(Math.floor(Math.random() * (max - min + 1)) + min);
		console.log(dices1_player2[i]);
	}
	// 按照骰子值对结构体数组排序
	player1.sort((a, b) => b.dice - a.dice);
	let cnt1 = 0; // 第一轮保留骰子数
	let round1 = 0; // 第一轮保留骰子类型
	let rate1 = 0; // 第一轮ai倍率
	for (let i = 0; i < 4; i++) { // 两个相同骰子
		if (player1[i].dice === player1[i + 1].dice) {
			player1[i].flag = 1;
			player1[i + 1].flag = 1;
			cnt1 = 2;
			round1 = 0;
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
			round1 = 1;
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
		round1 = 5;
		rate1 = 2;
	}
	if (player1[1].dice === player1[2].dice + 1 && player1[2].dice === player1[3].dice + 1 && player1[3].dice === player1[4].dice + 1) {
		resetAllFlags();
		player1[0].flag = player1[1].flag = player1[2].flag = player1[3].flag = 1;
		cnt1 = 4;
		round1 = 5;
		rate1 = 2;
	}
	if (player1[0].dice === player1[1].dice + 1 && player1[1].dice === player1[3].dice + 1 && player1[3].dice === player1[4].dice + 1) {
		resetAllFlags();
		player1[0].flag = player1[1].flag = player1[2].flag = player1[3].flag = 1;
		cnt1 = 4;
		round1 = 5;
		rate1 = 2;
	}
	// 五个骰子逐一递减
	if (player1[0].dice === player1[1].dice + 1 && player1[1].dice === player1[2].dice + 1 && player1[2].dice === player1[3].dice + 1 && player1[3].dice === player1[4].dice + 1) {
		for (let i = 0; i < 5; i++) {
			player1[i].flag = 0;
		}
		player1[0].flag = player1[1].flag = player1[2].flag = player1[3].flag = player1[4].flag = 1;
		cnt1 = 5;
		round1 = 4;
		rate1 = 3;
	}
	// 三个骰子相等
	if (player1[0].dice === player1[1].dice && player1[1].dice === player1[2].dice) {
		resetAllFlags();
		player1[0].flag = player1[1].flag = player1[2].flag = 1;
		cnt1 = 3;
		round1 = 2;
		rate1 = 2;
	}
	if (player1[1].dice === player1[2].dice && player1[2].dice === player1[3].dice) {
		resetAllFlags();
		player1[1].flag = player1[2].flag = player1[3].flag = 1;
		cnt1 = 3;
		round1 = 2;
		rate1 = 2;
	}
	if (player1[2].dice === player1[3].dice && player1[3].dice === player1[4].dice) {
		resetAllFlags();
		player1[2].flag = player1[3].flag = player1[4].flag = 1;
		cnt1 = 3;
		round1 = 2;
		rate1 = 2;
	}
	// 四个相同骰子
	if (player1[0].dice === player1[1].dice && player1[1].dice === player1[2].dice && player1[2].dice === player1[3].dice) {
		for (let i = 0; i < 5; i++) {
			player1[i].flag = 0;
		}
		player1[0].flag = player1[1].flag = player1[2].flag = player1[3].flag = 1;
		cnt1 = 4;
		round1 = 3;
		rate1 = 2;
	}

	if (player1[1].dice === player1[2].dice && player1[2].dice === player1[3].dice && player1[3].dice === player1[4].dice) {
		for (let i = 0; i < 5; i++) {
			player1[i].flag = 0;
		}
		player1[1].flag = player1[2].flag = player1[3].flag = player1[4].flag = 1;
		cnt1 = 4;
		round1 = 3;
		rate1 = 2;
	}
	// 五个相同骰子
	if (player1[0].dice === player1[1].dice && player1[1].dice === player1[2].dice && player1[2].dice === player1[3].dice && player1[3].dice === player1[4].dice) {
		for (let i = 0; i < 5; i++) {
			player1[i].flag = 0;
		}
		player1[0].flag = player1[1].flag = player1[2].flag = player1[3].flag = player1[4].flag = 1;
		cnt1 = 5;
		round1 = 4;
		rate1 = 3;
	}

	console.log("ai本轮选择保留的骰子为:");
	let dices_ai = []; // 存放ai保留的骰子
	for (let i = 0; i < 5; i++) {
		if (player1[i].flag === 1) { // 将保留的骰子放入dices_ai中
			console.log(player1[i].dice);
			dices_ai.push(player1[i].dice);
		}
	}
	console.log("ai本轮选择增加的倍率为:", rate1);
	rate += rate1; // ai加倍

	console.log("player2输入要保留的骰子序号:（从0开始，不带空格哦，都不保留输入6）");
	let players12 = []; // 存放玩家要保留的骰子序号
	let str21 = readline.question().split("").map(Number);
	console.log("player2输入本轮倍率");
	rate += parseInt(readline.question()); // 玩家加的倍率
	for (let index of str21) {
		players12.push(index);
	}
	let dices_player2 = []; // 存放玩家保留的骰子
	let cnt12 = 0; // 存放玩家第一轮保留骰子个数
	// player2将选择保留的骰子数值输入到相应数组中
	if (parseInt(players12[0]) < 6) {
		for (let player12 of players12) {
			dices_player2.push(dices1_player2[parseInt(player12)]);
			cnt12++;
		}
	}
	let left12 = 5 - cnt12; // 存放玩家剩余可投掷骰子个数

	let player11 = [];
	for (let i = 0; i < 10; i++) {
		player11.push(new player()); // 相当于开一个大小为10的结构体数组，存放第一轮已保留和第二轮将投掷的值
	}
	let count1 = 0; // 将第一轮已保留的骰子放入player11中
	while (count1 < cnt1) {
		player11[count1].dice = dices_ai[count1];
		player11[count1].flag = 1;
		player11[count1].lock = 1; // 表示第一轮已保留 后续必须保留
		// console.log(player11[count1].dice);
		count1++;
	}

	let count2 = cnt1;
	console.log("ai第二轮");
	console.log("ai本轮的骰子为:");
	while (count2 < 5) { // ai投掷第二轮骰子
		player11[count2].dice = Math.floor(Math.random() * (max - min + 1)) + min;
		console.log(player11[count2].dice);
		player11[count2].flag = 0;
		count2++;
	}


	// 对骰子的点数从大到小进行排序
	player1.sort((a, b) => b.dice - a.dice);
	let dices2_player2 = [];
	let sum2 = 0;
	console.log("player2第二轮");
	console.log("player2本轮的骰子为:");
	// player2除去已经保留的骰子数量，剩下的再次生成随机数
	while (sum2 < left12) {
		let s2 = Math.floor(Math.random() * (max - min + 1)) + min;
		dices2_player2.push(s2);
		console.log(s2);
		sum2++;
	}

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


	let cnt2 = 0; // 第二轮ai保留骰子数
	let rate2 = 0; // 第二轮ai倍率
	if (round1 === 0) { 
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
	} else if (round1 === 1) {
		for (let i = 0; i < 2; i++) { // 若第一轮保留三个逐一递减骰子 则第二轮可能保留再一个满足逐一递减的骰子
			if (player11[i].dice === player11[i + 1].dice + 1 && player11[i + 1].dice === player11[i + 2].dice + 1 && player11[i + 2].dice === player11[i + 3].dice + 1) {
				player11[i].flag = 1;
				player11[i + 1].flag = 1;
				player11[i + 2].flag = 1;
				player11[i + 3].flag = 1;
				rate2 = 2;
			}
		}
	} else if (round1 === 2) {
		for (let i = 0; i < 3; i++) { // 若第一轮保留三个相同骰子 则第二轮可能保留再一个与之相同骰子
			if (player11[i].dice === player11[i + 1].dice && player11[i + 1].dice === player11[i + 2].dice && player11[i + 2].dice === player11[i + 3].dice) {
				player11[i].flag = 1;
				player11[i + 1].flag = 1;
				player11[i + 2].flag = 1;
				player11[i + 3].flag = 1;
				rate2 = 3;
			}
		}
	} else if (round1 === 3) { // 若第一轮保留四个相同骰子 则第二轮可能保留再一个与之相同骰子
		if (player11[0].dice === player11[1].dice && player11[1].dice === player11[2].dice && player11[2].dice === player11[3].dice && player11[3].dice === player11[4].dice) {
			player11[0].flag = 1;
			player11[1].flag = 1;
			player11[2].flag = 1;
			player11[3].flag = 1;
			player11[4].flag = 1;
			rate2 = 3;
		}
	} else if (round1 === 5) { // 若第一轮保留四个逐一递减骰子 则第二轮可能保留再一个满足逐一递减的骰子
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

	console.log("ai本轮选择保留的骰子为:");
	for (let i = 0; i < 5; i++) { // 输出ai第二轮保留的骰子 并加入最终骰子的数组中
		if (player11[i].flag === 1 && player11[i].lock === 0) {
			console.log(player11[i].dice);
			dices_ai.push(player11[i].dice);
			cnt2++;
		}
	}
	console.log("player2输入要保留的骰子序号：（从0开始，不带空格哦，都不保留输入6）");
	let players22 = []; // 存放玩家要保留的骰子序号
	let str22 = readline.question().split("").map(Number);
	console.log("player2输入本轮倍率"); // 存放玩家倍率
	rate += parseInt(readline.question());
	for (let index of str22) {
		players22.push(index);
	}
	let cnt22 = 0; // 玩家第二轮保留骰子数
	if (parseInt(players22[0]) < 6) {
		for (let player22 of players22) { // 将玩家第二轮所要保留的骰子放入dices_player2中
			dices_player2.push(dices2_player2[parseInt(player22)]);
			cnt22++;
		}
	}
	let left22 = left12 - cnt22; // 玩家剩余骰子数

	console.log("ai本轮选择增加的倍率为:", rate2);
	rate += rate2;

	let count3 = cnt1 + cnt2;
	console.log("ai第三轮");
	console.log("ai本轮骰子为:");
	while (count3 < 5) { // ai第三轮骰子
		dices_ai.push(Math.floor(Math.random() * (max - min + 1)) + min);
		console.log(dices_ai[count3]);
		count3++;
	}
	let sum22 = 0;
	console.log("player2第三轮");
	console.log("player2本轮骰子为:");
	while (sum22 < left22) { // 玩家第三轮骰子
		let s2 = Math.floor(Math.random() * (max - min + 1)) + min;
		dices_player2.push(s2);
		console.log(s2);
		sum22++;
	}
	console.log("ai最终骰子为:"); // ai最终骰子
	dices_ai.forEach(dice => console.log(dice));
	console.log("player2最终骰子"); // 玩家最终骰子
	dices_player2.forEach(dice => console.log(dice));
	let num_ai = [0, 0, 0, 0, 0, 0]; // ai各个骰子数的数量
	for (let dice of dices_ai) {
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
	for (let dice of dices_player2) {
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
	for (let dice of dices_ai) {
		score_ai += dice;
	}
	for (let dice of dices_player2) {
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
	}
	else if (num_ai[1] !== 0 && num_ai[2] !== 0 && num_ai[3] !== 0 && num_ai[4] !== 0) {
		score_ai += 30;
	}
	else if (num_ai[2] !== 0 && num_ai[3] !== 0 && num_ai[4] !== 0 && num_ai[5] !== 0) {
		score_ai += 30;
	}

	if (numnum_player2[1] === 1 && numnum_player2[2] === 2) {
		score_player2 += 10;
	}
	else if (numnum_player2[3] === 1 && numnum_player2[1] === 2) {
		score_player2 += 10;
	}
	else if (numnum_player2[3] === 1 && numnum_player2[2] === 1) {
		score_player2 += 20;
	}
	else if (numnum_player2[4] === 1 && numnum_player2[1] === 1) {
		score_player2 += 40;
	}
	else if (numnum_player2[5] === 1) {
		score_player2 += 100;
	}
	else if (numnum_player2[1] === 5 && flag_player2 === 1) {
		score_player2 += 60;
	}
	else if (num_player2[0] !== 0 && num_player2[1] !== 0 && num_player2[2] !== 0 && num_player2[3] !== 0) {
		score_player2 += 30;
	}
	else if (num_player2[1] !== 0 && num_player2[2] !== 0 && num_player2[3] !== 0 && num_player2[4] !== 0) {
		score_player2 += 30;
	}
	else if (num_player2[2] !== 0 && num_player2[3] !== 0 && num_player2[4] !== 0 && num_player2[5] !== 0) {
		score_player2 += 30;
	}

	console.log("ai本轮得分为:", score_ai);
	console.log("player2本轮得分为:", score_player2);
	if (score_ai > score_player2) {
		let score = rate * (score_ai - score_player2); // 计算赢的筹码
		console.log("本轮ai从player2手上赢得的分数为:", score);
		ai += score;
		player2 -= score;
		grade_ai += 10; // 获胜积分+10
	} else if (score_ai === score_player2) {
		console.log("本轮双方打平");
		grade_ai += 5;
		grade_player2 += 5; // 打平各加5分
	} else {
		let score = rate * (score_player2 - score_ai);
		console.log("本轮player2从ai手上赢得的分数为:", score);
		ai -= score;
		player2 += score;
		grade_player2 += 10;
	}

	console.log("当前总倍率为:", rate);
	console.log("目前ai的分数为:", ai);
	console.log("目前player2的分数为:", player2);
	console.log("目前ai的积分为:", grade_ai);
	console.log("目前player2的积分为:", grade_player2);
	// 考虑被击飞的情况
	if (ai < 0) {
		console.log("ai已被击飞，游戏结束!");
		count = roll;
	}
	if (player2 < 0) {
		console.log("player2已被击飞，游戏结束!");
		count = roll;
	}
	count += 1;

}
// 输出ai和玩家最终积分
console.log("最终ai的积分为:", grade_ai);
console.log("最终player2的积分为:", grade_player2);
console.log("已经退出掷骰子模式");

