import random

def play(rate):

    print("player1开始掷骰子...")
    print("player1骰子的结果为:")
    # player1存骰子数的数组
    dices1_player1 = []
    dices1_player1.append(random.randint(min, max))
    dices1_player1.append(random.randint(min, max))
    dices1_player1.append(random.randint(min, max))
    dices1_player1.append(random.randint(min, max))
    dices1_player1.append(random.randint(min, max))
    print("player1第一轮")
    for dice1_player1 in dices1_player1:
        print(dice1_player1)

    print("player2开始掷骰子...")
    print("player2第一轮")
    # player2存骰子数的数组
    dices1_player2 = []
    dices1_player2.append(random.randint(min, max))
    dices1_player2.append(random.randint(min, max))
    dices1_player2.append(random.randint(min, max))
    dices1_player2.append(random.randint(min, max))
    dices1_player2.append(random.randint(min, max))
    print("player2本轮的骰子为:")
    for dice1_player2 in dices1_player2:
        print(dice1_player2)
    # 从1 - 6中随机产生五个数
    print("player1输入要保留的骰子序号:(从0开始，不带空格哦，都不保留输入6)")
    players11 = []
    str11 = input()
    print("player2输入要保留的骰子序号:(从0开始，不带空格哦，都不保留输入6)")
    players12 = []
    str21 = input()
    print("player1输入本轮倍率")
    rate += int(input())
    print("player2输入本轮倍率")
    rate += int(input())
    for index in str11:
        players11.append(index)
    for index in str21:
        players12.append(index)
    cnt11 = 0
    # player1将选择保留的骰子数值输入到相应数组中
    if (int(players11[0]) < 6):
        for player11 in players11:
            dices_player1.append(dices1_player1[int(player11)])
            cnt11 += 1
    left11 = 5 - cnt11

    cnt12 = 0
    # player2将选择保留的骰子数值输入到相应数组中
    if (int(players12[0]) < 6):
        for player12 in players12:
            dices_player2.append(dices1_player2[int(player12)])
            cnt12 += 1
    left12 = 5 - cnt12

    dices2_player1 = []
    sum1 = 0
    print("player1第二轮")
    # player1除去已经保留的骰子数量，剩下的再次生成随机数
    while (sum1 < left11):
        s1 = random.randint(min, max)
        dices2_player1.append(s1)
        print(s1)
        sum1 += 1
    dices2_player2 = []
    sum2 = 0
    print("player2第二轮")
    # player2除去已经保留的骰子数量，剩下的再次生成随机数
    while (sum2 < left12):
        s2 = random.randint(min, max)
        dices2_player2.append(s2)
        print(s2)
        sum2 += 1
    print("player1输入要保留的骰子序号:(从0开始，不带空格哦，都不保留输入6)")
    players21 = []
    str12 = input()
    print("player2输入要保留的骰子序号:(从0开始，不带空格哦，都不保留输入6)")
    players22 = []
    str22 = input()
    print("player1输入本轮倍率")
    rate += int(input())
    print("player2输入本轮倍率")
    rate += int(input())
    for index in str12:
        players21.append(index)
    for index in str22:
        players22.append(index)
    cnt21 = 0
    # 再次分别将选择保留的骰子加入对应数组中
    if (int(players21[0]) < 6):
        for player21 in players21:
            dices_player1.append(dices2_player1[int(player21)])
            cnt21 += 1
    left21 = left11 - cnt21
    cnt22 = 0
    if (int(players22[0]) < 6):
        for player22 in players22:
            dices_player2.append(dices2_player2[int(player22)])
            cnt22 += 1
    left22 = left12 - cnt22
    sum21 = 0
    print("player1第三轮")
    while (sum21 < left21):
        s2 = random.randint(min, max)
        dices_player1.append(s2)
        print(s2)
        sum21 += 1
    sum22 = 0
    print("player2第三轮")
    while (sum22 < left22):
        s2 = random.randint(min, max)
        dices_player2.append(s2)
        print(s2)
        sum22 += 1
    # print("player1输入本轮倍率")
    # rate += int(input())
    # print("player2输入本轮倍率")
    # rate += int(input())
    print("player1最终骰子")
    for dice in dices_player1:
        print(dice)
    print("player2最终骰子")
    for dice in dices_player2:
        print(dice)
    print("最终倍率为:", rate)
    return dices_player1, dices_player2, rate

def cal(dices_player1, dices_player2, rate, player1, player2, grade_player1, grade_player2):
    # 存放player1的骰子中1-6点出现的数量
    num_player1 = [0, 0, 0, 0, 0, 0]
    for dice in dices_player1:
        if dice == 1:
            num_player1[0] += 1
        if dice == 2:
            num_player1[1] += 1
        if dice == 3:
            num_player1[2] += 1
        if dice == 4:
            num_player1[3] += 1
        if dice == 5:
            num_player1[4] += 1
        if dice == 6:
            num_player1[5] += 1
    # 存放player2的骰子中1-6点出现的数量
    num_player2 = [0, 0, 0, 0, 0, 0]
    for dice in dices_player2:
        if dice == 1:
            num_player2[0] += 1
        if dice == 2:
            num_player2[1] += 1
        if dice == 3:
            num_player2[2] += 1
        if dice == 4:
            num_player2[3] += 1
        if dice == 5:
            num_player2[4] += 1
        if dice == 6:
            num_player2[5] += 1

    # print("-----------")
    # for num in num_player1:
    #     print(num)
    # print("-----------")
    # for num in num_player2:
    #     print(num)
    # print("-----------")
    # 存放player1中各个点出现次数的次数
    numnum_player1 = [0, 0, 0, 0, 0, 0]
    for num in num_player1:
        numnum_player1[num] += 1
    # for num in numnum_player1:
    #     print(num)
    # print("-----------")
    # 存放player2中各个点出现次数的次数
    numnum_player2 = [0, 0, 0, 0, 0, 0]
    for num in num_player2:
        numnum_player2[num] += 1
    # for num in numnum_player2:
    #     print(num)

    if num_player1[1] == 0 or num_player1[2] == 0 or num_player1[3] == 0 or num_player1[4] == 0:
        flag_player1 = 0
    if num_player2[1] == 0 or num_player2[2] == 0 or num_player2[3] == 0 or num_player2[4] == 0:
        flag_player2 = 0

    score_player1 = 0
    score_player2 = 0

    for dice in dices_player1:
        score_player1 += dice
    for dice in dices_player2:
        score_player2 += dice

    # 双对--出现2组2个相同骰子，1组单独骰子
    if numnum_player1[1] == 1 and numnum_player1[2] == 2:
        score_player1 += 10
    # 三连--出现1组3个相同骰子，2组单独骰子
    elif numnum_player1[3] == 1 and numnum_player1[1] == 2:
        score_player1 += 10
    # 葫芦--出现1组3个相同骰子，1组2个相同骰子
    elif numnum_player1[3] == 1 and numnum_player1[2] == 1:
        score_player1 += 20
    # 四连--出现1组4个相同骰子，1组单独骰子
    elif numnum_player1[4] == 1 and numnum_player1[1] == 1:
        score_player1 += 40
    # 五连--出现1组5个相同骰子
    elif numnum_player1[5] == 1:
        score_player1 += 100
    # 大顺子--五个连续骰子
    elif numnum_player1[1] == 5 and flag_player1 == 1:
        score_player1 += 60
    # 小顺子--四个连续骰子，另一个不连续
    elif num_player1[0] != 0 and num_player1[1] != 0 and num_player1[2] != 0 and num_player1[3] != 0:
        score_player1 += 30
    elif num_player1[1] != 0 and num_player1[2] != 0 and num_player1[3] != 0 and num_player1[4] != 0:
        score_player1 += 30
    elif num_player1[2] != 0 and num_player1[3] != 0 and num_player1[4] != 0 and num_player1[5] != 0:
        score_player1 += 30

    if numnum_player2[1] == 1 and numnum_player2[2] == 2:
        score_player2 += 10
    elif numnum_player2[3] == 1 and numnum_player2[1] == 2:
        score_player2 += 10
    elif numnum_player2[3] == 1 and numnum_player2[2] == 1:
        score_player2 += 20
    elif numnum_player2[4] == 1 and numnum_player2[1] == 1:
        score_player2 += 40
    elif numnum_player2[5] == 1:
        score_player2 += 100
    elif numnum_player2[1] == 5 and flag_player2 == 1:
        score_player2 += 60
    elif num_player2[0] != 0 and num_player2[1] != 0 and num_player2[2] != 0 and num_player2[3] != 0:
        score_player2 += 30
    elif num_player2[1] != 0 and num_player2[2] != 0 and num_player2[3] != 0 and num_player2[4] != 0:
        score_player2 += 30
    elif num_player2[2] != 0 and num_player2[3] != 0 and num_player2[4] != 0 and num_player2[5] != 0:
        score_player2 += 30

    print("player1本轮得分为:", score_player1)
    print("player2本轮得分为:", score_player2)
    # 计算双方当局得分，并求赢取的筹码
    if score_player1 > score_player2:
        score = rate * (score_player1 - score_player2)
        print("本轮player1从player2手上赢得的分数为:", score)
        player1 += score
        player2 -= score
        grade_player1 += 10
    elif score_player1 == score_player2:
        print("本轮双方打平")
        grade_player1 += 5
        grade_player2 += 5
    else:
        score = rate * (score_player2 - score_player1)
        print("本轮player2从player1手上赢得的分数为:", score)
        player2 += score
        player1 -= score
        grade_player2 += 10
    print("目前player1的分数为:", player1)
    print("目前player2的分数为:", player2)
    print("目前player1的积分为:", grade_player1)
    print("目前player2的积分为:", grade_player2)
    # 若一方已无筹码，则已被击飞，游戏结束
    if player1 < 0:
        print("player1已被击飞,游戏结束!")
        count = roll
    if player2 < 0:
        print("player2已被击飞,游戏结束!")
        count = roll
    return score, grade_player1, grade_player2, player1, player2

if __name__ == '__main__':
    # 设置最大值和最小值约束随机数的范围
    min = 1
    max = 6

    # 设置变量存储是否继续掷骰子并赋初值为yes
    print("请输入你要参与的局数:")
    roll = input()
    # 玩家输入想要进行的局数
    roll = int(roll)
    # count表示当前进行到的局数
    count = 1
    player1 = 1000
    player2 = 1000
    # player1和player2的分数初始化
    grade_player1 = 0
    grade_player2 = 0
    # 循环执行掷骰子
    while count <= roll:
        print("ROUND", count)
        rate = 1
        # rate表示赌注，初始值为1
        flag_player1 = 1
        flag_player2 = 1
        dices_player1 = []
        dices_player2 = []
        dices_player1, dices_player2, rate = play(rate)
        score, grade_player1, grade_player2, player1, player2 = cal(dices_player1, dices_player2, rate, player1, player2, grade_player1, grade_player2)

        count += 1

    print("最终player1的积分为:", grade_player1)
    print("最终player2的积分为:", grade_player2)
    print("已经退出掷骰子模式")