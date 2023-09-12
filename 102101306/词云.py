#导入jieba分词模块
import imageio
import jieba
#导入词云模块
import wordcloud
import imageio.v2 as imageio

#读取弹幕数据
f=open('统计后前20弹幕.txt',encoding='utf-8')
txt = f.read()
print(txt)
#jieba分割成列表合并字符串
string = ' '.join(jieba.lcut(txt))
print(string)
#生成词云基础样式
pic=imageio.imread('中国.jpg')
wc=wordcloud.WordCloud(
    width=700,
    height=700,
    background_color='white',
    font_path='simkai.ttf',#设置字体为楷体
    scale=15,#规模大小
    mask=pic,
)
wc.generate(string)
wc.to_file('弹幕词云.JPG')