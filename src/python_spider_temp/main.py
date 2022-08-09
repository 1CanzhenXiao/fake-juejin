# -*- coding utf-8 -*-

import os
import lxml
import sys
import getopt
import requests
import random
import re
import html2text
from bs4 import BeautifulSoup

useragents = [
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
]


def safe_file_name(file_name):
    return re.sub(r'[\|/|:|*|?|"|<|>|\|]', "", file_name)


def jinashu(url):
    ## 浏览器头部
    headers = {
        'Host': 'www.jianshu.com',
        'Referer': 'https://www.jianshu.com/',
        'User-Agent': random.choice(useragents)     ##随机抽取访问角色
    }
    ## 获取网页主体
    html = requests.get(url, headers=headers).text

    ## bs4
    soup = BeautifulSoup(html, "lxml")
    title = soup.find_all("title")[0].get_text()
    article = str(soup.find_all("div", class_="show-content")[0])

    ## 替图片的src加上https://方便访问
    article = re.sub('(src=")|(data-original-src=")', 'src="https:', article)

    ## 写入文件
    pwd = os.getcwd()  # 获取当前的文件路径
    dirpath = pwd + '/jianshu/'
    write2md(dirpath, title, article)


def csdn(url):
    headers = {
        'Host': 'blog.csdn.net',
        'Referer': 'http://blog.csdn.net/',
        'User-Agent': random.choice(useragents)
    }
    ## 获取网页主体
    html = requests.get(url, headers=headers).text

    ## bs4
    soup = BeautifulSoup(html, 'lxml')
    title = soup.find_all('title')[0].get_text()
    article = str(soup.find_all('article')[0])

    ## 写入文件
    pwd = os.getcwd()  # 获取当前的文件路径
    dirpath = pwd + '/CSDN/'

    article = csdnEq2Tex(article)
    print(article)

    write2md(dirpath, title, article)


def csdnEq2Tex(content):
    esc = 0
    while esc != -1:
        if content.find('<span class="MathJax_Preview"') != -1:
            start = content.find('<span class="MathJax_Preview"')
            end = content.index('<script id="MathJax-Element', start)
            content = content.replace(content[start:end], '')

            start = content.index('<script id="MathJax-Element', start)
            mid = content.index('>', start)
            end = content.find('</script>')

            print(ord(content[start - 1]), ord(content[end + 10]))

            if content[start:end + 9].find("mode=display") != -1:
                content = content.replace(content[start:end + 9], '<p>$$</p>' + content[mid + 1:end] + '<p>$$</p>')
            else:
                content = content.replace(content[start:end + 9], ' $' + content[mid + 1:end] + '$ ')

        else:
            esc = -1

    content = content.replace("\n", '')
    content = content.replace('<br/>', '<p></p>')
    return content


def zhihuEq2Tex(content):
    content = content.replace('\\\\', '\\')
    content = content.replace('\\(', '(')
    content = content.replace('\\)', ')')
    content = content.replace('\\[', '[')
    content = content.replace('\\]', ']')
    # print(content)

    pos = 0
    while pos < content.rfind('!['):
        start = content.index('![', pos)
        mid = content.index('](', pos)
        end = content.index(')', mid)

        string = content[start + 2:mid]
        string = string.replace('\n', ' ')

        if len(string) != 0:
            # print(len(string))
            if string[-1] == '\\':
                string = '$$\n' + string[:-1] + '\n$$'
            else:
                string = '$\n' + string + '\n$'

            content = content[:start] + string + content[end + 1:]

            pos = start + len(string)
        else:

            pos = end

            # print(string)

    return content


def zhihu(url):
    headers = {
        'Host': 'zhuanlan.zhihu.com',
        'Referer': 'https://www.zhihu.com/',
        'User-Agent': random.choice(useragents)
    }
    html = requests.get(url, headers=headers).text

    ## bs4
    soup = BeautifulSoup(html, 'lxml')
    title = soup.find_all('title')[0].get_text()
    article = str(soup.find_all('div', class_='Post-RichText')[0])

    ## 写入文件
    pwd = os.getcwd()  # 获取当前的文件路径
    dirpath = pwd + '/ZhiHu/'
    write2md(dirpath, title, article)


def segmentfault(url):
    headers = {
        # 'Host': 'https://segmentfault.com',
        'Referer': 'https://segmentfault.com/',
        'User-Agent': random.choice(useragents)
    }
    html = requests.get(url, headers=headers).text

    ## bs4
    soup = BeautifulSoup(html, 'lxml')
    title = soup.find('title').text  # 获取标题
    article = str(soup.find(class_='article__content'))

    ## 写入文件
    pwd = os.getcwd()  # 获取当前的文件路径
    dirpath = pwd + '/segmentfault/'
    write2md(dirpath, title, article)


def juejin(url):
    ## 首先获取文章的id
    postId = url.split('/')[-1]
    ## 目标url
    tar_url = "https://post-storage-api-ms.juejin.im/v1/getDetailData"
    ## 用来获取标题
    data1 = {
        "src": "web",
        "type": "entry",
        "postId": postId
    }
    ## 用来获取文章主体
    data2 = {
        "src": "web",
        "type": "entryView",
        "postId": postId
    }
    res = requests.get(url=tar_url, params=data1)
    res.encoding = "utf-8"
    res = res.json()
    title = res["d"]["title"]
    res = requests.get(url=tar_url, params=data2)
    res.encoding = "utf-8"
    res = res.json()
    article = res["d"]["transcodeContent"]
    ## 写入文件
    pwd = os.getcwd()  # 获取当前的文件路径
    dirpath = pwd + '/juejin/'
    write2md(dirpath, title, article)


def doelse(url):
    headers = {
        'User-Agent': random.choice(useragents)
    }
    res = requests.get(url=url, headers=headers)  # 获取整个html页面

    h = html2text.HTML2Text()
    h.ignore_links = False
    soup = BeautifulSoup(res.text, 'lxml')
    title = soup.title.text  # 获取标题
    html = str(soup.body)
    article = h.handle(html)

    pwd = os.getcwd()  # 获取当前文件的路径
    dirpath = pwd + '/Else/'
    if not os.path.exists(dirpath):  # 判断目录是否存在，不存在则创建新的目录
        os.makedirs(dirpath)
    ## 写入文件
    pwd = os.getcwd()  # 获取当前的文件路径
    dirpath = pwd + '/ELSE/'
    write2md(dirpath, title, article)


"""
传入文件路径，title，article
"""


def write2md(dirpath, title, article):
    ## 创建转换器
    h2md = html2text.HTML2Text()
    h2md.ignore_links = False
    ## 转换文档
    article = h2md.handle(article)
    article = zhihuEq2Tex(article)
    title = safe_file_name(title)
    ## 写入文件
    if not os.path.exists(dirpath):  # 判断目录是否存在，不存在则创建新的目录
        os.makedirs(dirpath)
    # 创建md文件
    with open(dirpath + title + '.md', 'w', encoding="utf8") as f:
        lines = article.splitlines()
        for line in lines:
            if line.endswith('-'):
                f.write(line)
            else:
                f.write(line + "\n")
    print(title + "下载完成....")


def main(argv):
    try:
        opts, args = getopt.getopt(argv, "hu:", ["url"])
    except getopt.GetoptError:
        print("python html2md.py -u <url>")
    for opt, arg in opts:
        if opt == "-h":
            print("python html2md.py -u <url>")
            sys.exit(2)
        elif opt in ("-u", "-url"):
            print()
            checkSite(arg)
        else:
            print("python html2md.py -u <url>")


## 检查网站，使用哪个下载器
def checkSite(url):
    #find函数查找字符串中是否含有某字串，有就返回第一次出现的下标，没有就返回-1
    if url.find('csdn') != -1:
        csdn(url)
    elif url.find('jianshu') != -1:
        jinashu(url)
    elif url.find('zhihu') != -1:
        zhihu(url)
    elif url.find('segmentfault') != -1:
        segmentfault(url)
    elif url.find('juejin') != -1:
        juejin(url)
    else:
        doelse(url)


if __name__ == "__main__":
    # main(sys.argv[1:])
    checkSite('https://blog.csdn.net/variablex/article/details/109820684')
