from selenium import webdriver
import json

# 打开储存文章数据的json文件，准备下载文章
path = "../../static/resource/json/all_article_info.json"
with open(path, "r", encoding="utf-8") as f:
    article_list = json.load(f)

article_list = list(article_list.keys())
n = len(article_list)
for i in range(n):
    driver = webdriver.Chrome()
    if article_list[i]=="7119411046896369694":
        continue
    else:
        driver.get("http://juejin.cn/post/"+article_list[i])
        res = driver.execute_script("return __NUXT__")
        markdown = res["state"]["view"]["column"]["entry"]["article_info"]["mark_content"]
        with open("../../static/articles_file/"+article_list[i]+".md", "w+", encoding="utf-8") as fd:
            fd.write(markdown)