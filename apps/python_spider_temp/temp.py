#-*- coding = utf-8 -*-

import urllib.request
import requests

header = {"user-agent" : "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)"
                         " Chrome/92.0.4515.131 Safari/537.36 SLBrowser/8.0.0.7062 SLBChan/25"}

baseurl = 'https://juejin.cn'
response1 = urllib.request.urlopen(baseurl)
response2 = requests.get(baseurl)
#print(response.read().decode('utf-8'))
