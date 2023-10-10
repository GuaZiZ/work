import random
# 设置最大值和最小值约束随机数的范围
min = 1
max = 6

ai = 1000
player2 = 1000
# 设置变量存储是否继续掷骰子并赋初值为yes
print("请输入你要参与的局数：")
roll = input()
# 玩家输入想要进行的局数
roll = int(roll)
# count表示当前进行到的局数
count = 1
# ai和player2的分数初始化
grade_ai = 0
grade_player2 = 0

class player:
    flag = 0
    dice = 0
    lock = 0

while count <= roll:
    print("ROUND", count)
    # 设置初始倍率为1
    rate = 1
    player1 = [player() for i in range(0, 10)]
    print("ai开始掷骰子...")
    print("ai第一轮")
    print("ai本轮的骰子为:")
    for i in range(0, 5):
        player1[i].dice = random.randint(min, max)
        print(player1[i].dice)
    # print("------------------------")
    dices1_player2 = []
    print("player2开始掷骰子...")
    print("player2第一轮")
    print("player2本轮的骰子为:")
    for i in range(0, 5):
        dices1_player2.append(random.randint(min, max))
        print(dices1_player2[i])

    def rule(t):
        return t.dice
    # 对骰子的点数从大到小进行排序
    player1.sort(reverse=True, key=rule)
    cnt1 = 0
    round1 = 0
    rate1 = 0
    # 记录第一轮选定的骰子个数、选定类型、倍率
    for i in range(0, 4):
        if player1[i].dice == player1[i + 1].dice:
            player1[i].flag = 1
            player1[i + 1].flag = 1
            cnt1 = 2
            round1 = 0
            rate1 = 1
            break
    # print("----------------------")

    if player1[0].dice == player1[1].dice + 1 and player1[1].dice == player1[2].dice + 1:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[0].flag = 1
        player1[1].flag = 1
        player1[2].flag = 1
        cnt1 = 3
        round1 = 1
        rate1 = 2
    if player1[1].dice == player1[2].dice + 1 and player1[2].dice == player1[3].dice + 1:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[1].flag = 1
        player1[2].flag = 1
        player1[3].flag = 1
        cnt1 = 3
        round1 = 1
        rate1 = 2
    if player1[2].dice == player1[3].dice + 1 and player1[3].dice == player1[4].dice + 1:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[2].flag = 1
        player1[3].flag = 1
        player1[4].flag = 1
        cnt1 = 3
        round1 = 1
        rate1 = 2
    if player1[0].dice == player1[2].dice + 1 and player1[2].dice == player1[3].dice + 1:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[0].flag = 1
        player1[2].flag = 1
        player1[3].flag = 1
        cnt1 = 3
        round1 = 1
        rate1 = 2
    if player1[1].dice == player1[2].dice + 1 and player1[2].dice == player1[4].dice + 1:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[1].flag = 1
        player1[2].flag = 1
        player1[4].flag = 1
        cnt1 = 3
        round1 = 1
        rate1 = 2
    if player1[1].dice == player1[3].dice + 1 and player1[3].dice == player1[4].dice + 1:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[1].flag = 1
        player1[3].flag = 1
        player1[4].flag = 1
        cnt1 = 3
        round1 = 1
        rate1 = 2
    if player1[0].dice == player1[1].dice + 1 and player1[1].dice == player1[2].dice + 1 and player1[2].dice == player1[3].dice + 1:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[0].flag = 1
        player1[1].flag = 1
        player1[2].flag = 1
        player1[3].flag = 1
        cnt1 = 4
        round1 = 5
        rate1 = 2
    if player1[1].dice == player1[2].dice + 1 and player1[2].dice == player1[3].dice + 1 and player1[3].dice == player1[4].dice + 1:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[1].flag = 1
        player1[2].flag = 1
        player1[3].flag = 1
        player1[4].flag = 1
        cnt1 = 4
        round1 = 5
        rate1 = 2
    if player1[0].dice == player1[1].dice + 1 and player1[1].dice == player1[3].dice + 1 and player1[3].dice == player1[4].dice + 1:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[0].flag = 1
        player1[1].flag = 1
        player1[3].flag = 1
        player1[4].flag = 1
        cnt1 = 4
        round1 = 5
        rate1 = 2
    if player1[0].dice == player1[1].dice + 1 and player1[1].dice == player1[2].dice + 1 and player1[2].dice == player1[3].dice + 1 and player1[3].dice == player1[4].dice + 1:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[0].flag = 1
        player1[1].flag = 1
        player1[2].flag = 1
        player1[3].flag = 1
        player1[4].flag = 1
        cnt1 = 5
        round1 = 4
        rate1 = 3


    if player1[0].dice == player1[1].dice and player1[1].dice == player1[2].dice:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[0].flag = 1
        player1[1].flag = 1
        player1[2].flag = 1
        cnt1 = 3
        round1 = 2
        rate1 = 2
    if player1[1].dice == player1[2].dice and player1[2].dice == player1[3].dice:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[1].flag = 1
        player1[2].flag = 1
        player1[3].flag = 1
        cnt1 = 3
        round1 = 2
        rate1 = 2
    if player1[2].dice == player1[3].dice and player1[3].dice == player1[4].dice:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[2].flag = 1
        player1[3].flag = 1
        player1[4].flag = 1
        cnt1 = 3
        round1 = 2
        rate1 = 2
    if player1[0].dice == player1[1].dice and player1[1].dice == player1[2].dice and player1[2].dice == player1[3].dice:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[0].flag = 1
        player1[1].flag = 1
        player1[2].flag = 1
        player1[3].flag = 1
        cnt1 = 4
        round1 = 3
        rate1 = 2
    if player1[1].dice == player1[2].dice and player1[2].dice == player1[3].dice and player1[3].dice == player1[4].dice:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[1].flag = 1
        player1[2].flag = 1
        player1[3].flag = 1
        player1[4].flag = 1
        cnt1 = 4
        round1 = 3
        rate1 = 2
    if player1[0].dice == player1[1].dice and player1[1].dice == player1[2].dice and player1[2].dice == player1[3].dice and player1[3].dice == player1[4].dice:
        for i in range(0, 5):
            player1[i].flag = 0
        player1[0].flag = 1
        player1[1].flag = 1
        player1[2].flag = 1
        player1[3].flag = 1
        player1[4].flag = 1
        cnt1 = 5
        round1 = 4
        rate1 = 3

    # for i in range(0, 5):
    #     print(player1[i].dice, player1[i].flag)

    print("ai本轮选择保留的骰子为:")
    dices_ai = []
    for i in range(0, 5):
        if player1[i].flag == 1:
            print(player1[i].dice)
            dices_ai.append(player1[i].dice)
    print("ai本轮选择增加的倍率为:", rate1)
    rate += rate1

    print("player2输入要保留的骰子序号:（从0开始，不带空格哦，都不保留输入6）")
    players12 = []
    str21 = input()
    print("player2输入本轮倍率")
    rate += int(input())
    for index in str21:
        players12.append(index)
    dices_player2 = []
    cnt12 = 0
    # player2将选择保留的骰子数值输入到相应数组中
    if (int(players12[0]) < 6):
        for player12 in players12:
            dices_player2.append(dices1_player2[int(player12)])
            cnt12 += 1
    left12 = 5 - cnt12

    # print("----------------------")
    player11 = [player() for i in range(0, 10)]
    count1 = 0
    while count1 < cnt1:
        player11[count1].dice = dices_ai[count1]
        player11[count1].flag = 1
        player11[count1].lock = 1
        # print(player11[count1].dice)
        count1 += 1

    count2 = cnt1
    print("ai第二轮")
    print("ai本轮的骰子为:")
    while count2 < 5:
        player11[count2].dice = random.randint(min, max)
        print(player11[count2].dice)
        player11[count2].flag = 0
        count2 += 1

    player11.sort(reverse=True, key=rule)

    dices2_player2 = []
    sum2 = 0
    print("player2第二轮")
    print("player2本轮的骰子为:")
    # player2除去已经保留的骰子数量，剩下的再次生成随机数
    while(sum2 < left12):
        s2 = random.randint(min, max)
        dices2_player2.append(s2)
        print(s2)
        sum2 += 1

    # 存放player1的骰子中1-6点出现的数量
    num2_ai = [0, 0, 0, 0, 0, 0]
    for i in range(0, 5):
        if player11[i].dice == 1:
            num2_ai[0] += 1
        if player11[i].dice == 2:
            num2_ai[1] += 1
        if player11[i].dice == 3:
            num2_ai[2] += 1
        if player11[i].dice == 4:
            num2_ai[3] += 1
        if player11[i].dice == 5:
            num2_ai[4] += 1
        if player11[i].dice == 6:
            num2_ai[5] += 1
    # print("-------------------------")
    # for num in num2_ai:
    #     print(num)
    numnum2_ai = [0, 0, 0, 0, 0, 0]
    for num in num2_ai:
        numnum2_ai[num] += 1
    # print("-------------------------")
    # for num in numnum2_ai:
    #     print(num)
    cnt2 = 0
    rate2 = 0
    # 记录第二轮选定的骰子个数、倍率
    if round1 == 0:
        if numnum2_ai[2] == 2:
            for i in range(0, 4):
                # 再找两个一样的点数，但与第一轮锁定的不一样
                if player11[i].dice == player11[i + 1].dice and player11[i].lock == 0 and player11[i + 1].lock == 0:
                    player11[i].flag = 1
                    player11[i + 1].flag = 1
                    rate2 = 1
        if numnum2_ai[3] == 1:
            for i in range(0, 3):
                if player11[i].dice == player11[i + 1].dice and player11[i + 1].dice == player11[i + 2].dice:
                    player11[i].flag = 1
                    player11[i + 1].flag = 1
                    player11[i + 2].flag = 1
                    rate2 = 2

    elif round1 == 1:
        for i in range(0, 2):
            if player11[i].dice == player11[i + 1].dice + 1 and player11[i + 1].dice == player11[i + 2].dice + 1 and player11[i + 2].dice == player11[i + 3].dice + 1:
                # for i in range(0, 5):
                #     player1[i].flag = 0
                player11[i].flag = 1
                player11[i + 1].flag = 1
                player11[i + 2].flag = 1
                player11[i + 3].flag = 1
                rate2 = 2
    elif round1 == 2:
        for i in range(0, 3):
            if player11[i].dice == player11[i + 1].dice and player11[i + 1].dice == player11[i + 2].dice and player11[i + 2].dice == player11[i + 3].dice:
                player11[i].flag = 1
                player11[i + 1].flag = 1
                player11[i + 2].flag = 1
                player11[i + 3].flag = 1
                rate2 = 3
    elif round1 == 3:
        if player11[0].dice == player11[1].dice and player11[1].dice == player11[2].dice and player11[2].dice == player11[3].dice and player11[3].dice == player11[4].dice:
            player11[0].flag = 1
            player11[1].flag = 1
            player11[2].flag = 1
            player11[3].flag = 1
            player11[4].flag = 1
            rate2 = 3
    elif round1 == 5:
        if player11[0].dice == player11[1].dice + 1 and player11[1].dice == player11[2].dice + 1 and player11[2].dice == player11[3].dice + 1 and player11[3].dice == player11[4].dice + 1:
            player11[0].flag = 1
            player11[1].flag = 1
            player11[2].flag = 1
            player11[3].flag = 1
            player11[4].flag = 1
            rate2 = 2
    else:
        rate2 = 3

    # print("----------------------")
    # for i in range(0, 5):
    #     print(player11[i].dice, player11[i].flag)

    print("ai本轮选择保留的骰子为:")
    for i in range(0, 5):
        if player11[i].flag == 1 and player11[i].lock == 0:
            print(player11[i].dice)
            dices_ai.append(player11[i].dice)
            cnt2 += 1
    print("player2输入要保留的骰子序号：（从0开始，不带空格哦，都不保留输入6）")
    players22 = []
    str22 = input()
    print("player2输入本轮倍率")
    rate += int(input())
    for index in str22:
        players22.append(index)
    cnt22 = 0
    if (int(players22[0]) < 6):
        for player22 in players22:
            dices_player2.append(dices2_player2[int(player22)])
            cnt22 += 1
    left22 = left12 - cnt22

    print("ai本轮选择增加的倍率为:", rate2)
    rate += rate2

    count3 = cnt1 + cnt2
    print("ai第三轮")
    print("ai本轮骰子为:")
    while count3 < 5:
        dices_ai.append(random.randint(min, max))
        print(dices_ai[count3])
        count3 += 1
    sum22 = 0
    print("player2第三轮")
    print("player2本轮骰子为:")
    while (sum22 < left22):
        s2 = random.randint(min, max)
        dices_player2.append(s2)
        print(s2)
        sum22 += 1
    print("ai最终骰子为:")
    for dice in dices_ai:
        print(dice)
    print("player2最终骰子")
    for dice in dices_player2:
        print(dice)

    num_ai = [0, 0, 0, 0, 0, 0]
    for dice in dices_ai:
        if dice == 1:
            num_ai[0] += 1
        if dice == 2:
            num_ai[1] += 1
        if dice == 3:
            num_ai[2] += 1
        if dice == 4:
            num_ai[3] += 1
        if dice == 5:
            num_ai[4] += 1
        if dice == 6:
            num_ai[5] += 1
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
    # for num in num_ai:
    #     print(num)
    # print("-----------")
    # for num in num_player2:
    #     print(num)
    # print("-----------")
    # 存放player1中各个点出现次数的次数
    numnum_ai = [0, 0, 0, 0, 0, 0]
    for num in num_ai:
        numnum_ai[num] += 1
    # for num in numnum_player1:
    #     print(num)
    # print("-----------")
    # 存放player2中各个点出现次数的次数
    numnum_player2 = [0, 0, 0, 0, 0, 0]
    for num in num_player2:
        numnum_player2[num] += 1
    # for num in numnum_player2:
    #     print(num)

    flag_ai = 1
    flag_player2 = 1

    if num_ai[1] == 0 or num_ai[2] == 0 or num_ai[3] == 0 or num_ai[4] == 0:
        flag_ai = 0
    if num_player2[1] == 0 or num_player2[2] == 0 or num_player2[3] == 0 or num_player2[4] == 0:
        flag_player2 = 0

    score_ai = 0
    score_player2 = 0

    for dice in dices_ai:
        score_ai += dice
    for dice in dices_player2:
        score_player2 += dice

    # 双对--出现2组2个相同骰子，1组单独骰子
    if numnum_ai[1] == 1 and numnum_ai[2] == 2:
        score_ai += 10
    # 三连--出现1组3个相同骰子，2组单独骰子
    elif numnum_ai[3] == 1 and numnum_ai[1] == 2:
        score_ai += 10
    # 葫芦--出现1组3个相同骰子，1组2个相同骰子
    elif numnum_ai[3] == 1 and numnum_ai[2] == 1:
        score_ai += 20
    # 四连--出现1组4个相同骰子，1组单独骰子
    elif numnum_ai[4] == 1 and numnum_ai[1] == 1:
        score_ai += 40
    # 五连--出现1组5个相同骰子
    elif numnum_ai[5] == 1:
        score_ai += 100
    # 大顺子--五个连续骰子
    elif numnum_ai[1] == 5 and flag_ai == 1:
        score_ai += 60
    # 小顺子--四个连续骰子，另一个不连续
    elif num_ai[0] != 0 and num_ai[1] != 0 and num_ai[2] != 0 and num_ai[3] != 0:
        score_ai += 30
    elif num_ai[1] != 0 and num_ai[2] != 0 and num_ai[3] != 0 and num_ai[4] != 0:
        score_ai += 30
    elif num_ai[2] != 0 and num_ai[3] != 0 and num_ai[4] != 0 and num_ai[5] != 0:
        score_ai += 30

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

    print("ai本轮得分为:", score_ai)
    print("player2本轮得分为:", score_player2)
    if score_ai > score_player2:
        score = rate * (score_ai - score_player2)
        print("本轮ai从player2手上赢得的分数为:", score)
        ai += score
        player2 -= score
        grade_ai += 10

    elif score_ai == score_player2:
        print("本轮双方打平")
        grade_ai += 5
        grade_player2 += 5

    else:
        score = rate * (score_player2 - score_ai)
        print("本轮player2从ai手上赢得的分数为:", score)
        ai -= score
        player2 += score
        grade_player2 += 10

    print("当前总倍率为:", rate)
    print("目前ai的分数为:", ai)
    print("目前player2的分数为:", player2)
    print("目前ai的积分为:", grade_ai)
    print("目前player2的积分为:", grade_player2)
    if ai < 0:
        print("ai已被击飞，游戏结束!")
        count = roll
    if player2 < 0:
        print("player2已被击飞，游戏结束!")
        count = roll
    count += 1

print("最终ai的积分为:", grade_ai)
print("最终player2的积分为:", grade_player2)
print("已经退出掷骰子模式")