import random
import re
import time
import requests


headers = {
    #用户代理 表示浏览器基本身份标识
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
    }

content=input("请输入你要检索的内容")
keyword=content.encode('utf-8')
keyword=str(keyword)[2:-1].replace('\\x','%').upper()#b站搜索引擎中的关键字解析成可跳转码
# print(keyword)
cookies=requests.get('https://bilibili.com/',headers=headers).cookies.get_dict()

bvids=[]#b站同一搜索关键字下的视频url只有bvid不相同
count=0
for page in range(0,15):
    url=f'https://api.bilibili.com/x/web-interface/wbi/search/type?keyword={keyword}&search_type=video&page={page+1}'#搜索同意关键字下的url格式
    bvids.extend(re.findall(r'\"bvid\":\"(\w+)',requests.get(url,headers=headers,cookies=cookies).text))#正则表达式
    print(f'正在获取页面bvid，现在已经进行到{count+1}/15')#方便查看获取进程
    time.sleep(round(random.uniform(0,2),3))
    count+=1

cids=[]
count=0
for index,bvid in enumerate(bvids):
    cid_url=f'https://api.bilibili.com/x/player/pagelist?bvid={bvid}&jsonp=jsonp'#通过bvid获取
    cids.append(re.search(r'\"cid\":(\d+)',requests.get(cid_url,headers=headers).text).group(1))
    print(f'正在获取页面cid，现在已经进行到{count+1}/300')#方便查看获取进程
    time.sleep(round(random.uniform(0, 2), 3))
    count += 1

dms=[]
for index,cid in enumerate(cids):
    # 发送请求
    response=requests.get(f'https://api.bilibili.com/x/v1/dm/list.so?oid={cid}',headers=headers)
    response.encoding = 'utf-8'
    # 获取数据
    print(response.text)
    # 解析数据
    list = re.findall('<d p=".*?">(.*?)</d>', response.text)
    print(list)
    # 遍历输出内容
    for content in list:
        with open('弹幕.xlsx', mode='a', encoding='utf-8') as f:#生成excel表格
            f.write(content)
            f.write('\n')
        print(content)