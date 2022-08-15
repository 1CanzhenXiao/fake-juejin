# 字节前端项目

## 介绍
此项目为仿掘金网页版首页，是第四届字节跳动青训营的项目作业。依靠`python`的`flask`框架完成后端实现某些功能以及主要用`vscode`大致实现掘金前端的网页布局。

该项目为大致复现掘金网页版首页外观，主要功能及细节，如鼠标悬停时组件的效果，文章列表无限下滑加载，打开文章时内容实现代码效果高亮，文章目录随文章滚动而变化等。

## 软件架构

以下目录树省略了一些python项目构建的库及配置文件，只留下主要架构：

```
juejin:.
│  app.py
│  README.md
│  掘金文章路径.md
│  需求分析及分工.md
│  
├─apps
│  │  courses.py
│  │  events.py
│  │  home_ai.py
│  │  home_android.py
│  │  home_article.py
│  │  home_backend.py
│  │  home_career.py
│  │  home_following.py
│  │  home_freebie.py
│  │  home_frontend.py
│  │  home_ios.py
│  │  home_recommended.py
│  │  lives.py
│  │  pins.py
│  │  
│  └─python_spider_temp
│          main.py
│          temp.py
│
├─static
│  ├─aside
│  │      aside.css
│  │
│  ├─header
│  │      header.css
│  │
│  ├─infinite_scroll_temp
│  │      temp.html
│  │
│  ├─jQuery
│  │      jquery.min.js
│  │
│  ├─main_article_temp
│  │      文章列表加载时的格式.html
│  │
│  ├─main_navigate
│  │      main_navigate.css
│  │
│  ├─main_style
│  │      main.css
│  │
│  ├─need_image
│  │      cloud__off.png
│  │      cloud__on.png
│  │      comm.png
│  │      dia.png
│  │      eye.png
│  │      fire.png
│  │      inform-logo-off.png
│  │      inform-logo-on.png
│  │      input-1.png
│  │      input.png
│  │      juejin-logo.png
│  │      juejinVip.png
│  │      jy.png
│  │      lv-2.png
│  │      panelFa.png
│  │      paneljing.png
│  │      panelLiu.png
│  │      panelQuan.png
│  │      panelStar.png
│  │      panelZan.png
│  │      pencil.png
│  │      ping.png
│  │      userEye.png
│  │      userZan.png
│  │      zan__off.png
│  │      zan__on.png
│  │
│  └─resource
│      │  editor.md-master.zip
│      │  temp.txt
│      │  
│      └─演示图片
│              Snipaste_2022-08-05_15-49-53.png
│              Snipaste_2022-08-05_16-03-59.png
│              Snipaste_2022-08-05_16-12-27.png
│              Snipaste_2022-08-05_17-11-30.png
│              Snipaste_2022-08-05_19-23-37.png
│              Snipaste_2022-08-05_19-24-01.png
│
└─templates
        courses.html
        events.html
        home.html
        lives.html
        pins.html
```



## 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

## 参与贡献


