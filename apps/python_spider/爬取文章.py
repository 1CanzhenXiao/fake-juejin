from selenium import webdriver

driver = webdriver.Chrome()
driver.get("http://juejin.cn/post/7133048019368280072")
res = driver.execute_script("return __NUXT__")
markdown = res["state"]["view"]["column"]["entry"]["article_info"]["mark_content"]
with open("../../static/articles/mk1.md", "w+") as fd:
    fd.write(markdown)