import requests
from bs4 import BeautifulSoup

# 掘金文章为渲染方式显示，无法爬取到
header = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
                  ' Chrome/63.0.3239.132 Safari/537.36'
}

url = 'https://juejin.cn/post/7129688110081769479'
response = requests.get(url, headers=header)
bs = BeautifulSoup(response.text, 'html.parser')

print(bs.find('div', class_ = 'article-content'))