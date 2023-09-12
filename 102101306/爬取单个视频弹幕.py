import requests
#导入正则
import re

url='https://api.bilibili.com/x/v1/dm/list.so?oid=1257678080'

headers = {
    #用户代理 表示浏览器基本身份标识
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
    }

#发送请求
response=requests.get(url=url,headers=headers)
#解决网页数据代码
response.encoding='utf-8'
#获取数据
print(response.text)
# 解析数据
list=re.findall('<d p=".*?">(.*?)</d>',response.text)
print(list)
#遍历输出内容
for content in list:
    with open('弹幕.xlxs',mode='a',encoding='utf-8') as f:
        f.write(content)
        f.write('\n')
    print(content)