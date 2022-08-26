# 字节前端项目

## 介绍
此项目为仿掘金网页版首页，是第四届字节跳动青训营的项目作业。依靠`python`的`flask`框架完成后端，以及主要用前端三件套`HTML， CSS， JavaScript`大致实现掘金前端的网页布局。


该项目为大致复现掘金网页版首页外观，主要功能及细节，如鼠标悬停时组件的效果，文章列表无限下滑加载，打开文章时内容实现代码效果高亮，文章目录随文章滚动而变化（未实现）等。

**tips：**``（项目比较原始（非主流）且项目构建有些不合理，后面会进行重构）``

## 软件架构

以下目录树省略了一些python项目构建的库，图片文件，资源文件及配置文件，只留下主要架构：

```
juejin:.
│  app.py
│  README.md
│  tree.txt
│  掘金文章路径.md
│  需求分析及分工.md
│  
├─apps
│  ├─data_reduction
│  │      整理文章和用户信息.py
│  │      
│  ├─page_jump
│  │      article.py
│  │      home_ai.py
│  │      home_android.py
│  │      home_article.py
│  │      home_backend.py
│  │      home_career.py
│  │      home_following.py
│  │      home_freebie.py
│  │      home_frontend.py
│  │      home_ios.py
│  │      home_recommended.py
│  │      
│  └─python_spider
│          article_get_TEMP.py
│          爬取文章.py
│          爬取文章和用户信息_fail.py
│          
├─static
│  ├─articles_file
│  ├─function
│  │  ├─article_list
│  │  │      article_list.js
│  │  │      article_list_ai.js
│  │  │      article_list_android.js
│  │  │      article_list_article.js
│  │  │      article_list_backend.js
│  │  │      article_list_career.js
│  │  │      article_list_following.js
│  │  │      article_list_freebie.js
│  │  │      article_list_frontend.js
│  │  │      article_list_ios.js
│  │  │      article_list_little.js
│  │  │      
│  │  ├─article_toc
│  │  │      article_toc.js
│  │  │      
│  │  ├─aside
│  │  │      aside.js
│  │  │      
│  │  ├─getTime
│  │  │      time.js
│  │  │      
│  │  ├─global_box
│  │  │      global_box.js
│  │  │      
│  │  └─header
│  │          header.js
│  │          header_article.js
│  │          
│  ├─js_package
│  │      highlight.min.js
│  │      jquery-1.8.3.min.js
│  │      jquery-ui-1.9.1.custom.min.js
│  │      jquery.min.js
│  │      jquery.tocify.min.js
│  │      marked.min.js
│  │      
│  ├─need_image
│  ├─resource
│  │  │  temp.txt
│  │  │  
│  │  ├─json
│  │  ├─响应返回的json数据
│  │  └─演示图片
│  └─style
│      ├─article
│      │      article.css
│      │      juejin_style.css
│      │      
│      ├─article_list
│      │      article_list.css
│      │      article_list_little.css
│      │      
│      ├─article_list_temp
│      │      文章列表加载时的格式.html
│      │      
│      ├─article_navigate
│      │      article_navigate.css
│      │      
│      ├─aside
│      │      aside.css
│      │      
│      ├─global_box
│      │      global_box.css
│      │      
│      ├─header
│      │      header.css
│      │      
│      ├─highlight
│      │     
│      │      
│      ├─infinite_scroll_temp
│      │      temp.css
│      │      temp.html
│      │      temp.js
│      │      
│      ├─main_style
│      │      main.css
│      │      
│      └─tocify
│              bootstrap.min.css
│              jquery.tocify.css
│              
└─templates
        article.html
        base.html
        home.html
        home_ai.html
        home_android.html
        home_article.html
        home_backend.html
        home_career.html
        home_following.html
        home_freebie.html
        home_frontend.html
        home_ios.html
        
```
- **在项目的最外层**：`app.py`为本项目的入口文件，若已配置好flask包则直接运行可看到项目成果。其他的为markdown文件 。
- **templates文件夹**：`templates`文件夹存放的是模板文件，即HTML，在flask中，可直接调用`render_template()`将模板文件响应给客户端。 flask中的模板依赖于jinja2模板系统，flask程序默认在`templates`文件夹中搜索模板文件，也可自定义搜索的文件夹。
	- 本项目中，模板文件存放一个基础模板`base.html`，`home.html`和`article.html`模板通过flask的模板继承语法继续添加网页结构。`home.html`是网站首页模板，`article.html`是文章详情页模板。同时其他`home_article.html`等文件继承`home.html`模板，分别定义根据文章类别返回相应文章列表的功能（结合不同的js文件）。
- **static文件夹**：该文件夹里存放的是: 爬取或收集到的文章markdown文件（`article_file文件夹`），项目所需要的图标文件(`need_image文件夹`)，js包文件(`js_package文件夹`)，实现相应功能的js文件（`function文件夹`）, 包括文章信息和用户信息的json文件和其他资源文件(`resource文件夹`)，模板样式文件(`style文件夹`)。
  - `style文件夹`：  其中存放的是css文件和一些插件提供的css文件。
    - `article文件夹`里 存放的是文章页面的样式和markdown的样式（掘金官网）。
    - `article_list文件夹`里是文章列表的样式，一个是主页的文章列表，一个是文章页下方的相关推荐的文章列表。
    - `article_navigate文件夹`里是文章分类导航栏的样式文件。
    - `aside文件夹`里是主页侧边栏组件的样式表文件。
    - `global——box文件夹`里是页面右下方按钮的样式文件。
    - `main_style文件夹`存放的是所有界面的初始化样式文件。
    - `header文件夹`里是页面最顶部导航栏的样式文件。
    - `highlight文件夹`里是代码高亮插件提供的可供选择的样式文件。
  - `function文件夹`命名规则同style文件夹，文件夹名字与功能相同。
- `apps文件夹`： 存放的是flask路由跳转文件和整理数据，爬取数据的py文件，这里不介绍python的一些配制文件，直接进入主题：
  - `data_reduction文件夹`: 存放的是整理返回或者收集到的json数据的py文件，主要功能是将未整理的json文件整理完后再写出为另一个一个新的json文件。
  - `page_jump文件夹`: 存放的是flask路由跳转的py文件
  - `python_spider文件夹`： 爬虫文件。



## 使用说明
- 本项目使用的是pycharm环境。
- 使用python编译器运行，在本地python中引入flask包。
- 如果使用的是pycharm，请选择flask项目，其中会自动布置项目环境，同本项目的文件布局，且会自动下载好所需要的依赖。
- 如果使用其他环境则可自行上网搜索flask项目运行方法，这里不予列出。
- 项目运行入口为app.py文件。


