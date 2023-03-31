# 简单的前端项目

## 介绍
此项目为仿掘金网页版首页，是第四届字节跳动青训营的结营项目。依靠`python`的`flask`框架完成后端，以及主要用前端三件套`HTML， CSS， JavaScript`大致实现掘金前端的网页布局。


该项目为大致复现掘金网页版首页外观，主要功能及细节，如鼠标悬停时组件的效果，文章列表无限下滑加载，打开文章时内容实现代码效果高亮，文章目录随文章滚动而变化（未实现）等。

**tips：**``（项目比较原始（非主流/老古董）且项目构建有些不合理，后面会学习到vue和java的/python的Django时会进行整体重构）``

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


## 项目功能截图：
-   **header主导航栏的效果样式：**

![bandicam 2022-08-25 10-28-25-054 00_00_12-00_00_25~1.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3aa2551522b4d819110dbb827ff66ff~tplv-k3u1fbpfcp-watermark.image?)

-   **aside侧边栏的样式：**

![bandicam 2022-08-25 11-20-38-414 00_00_00-00_00_30.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ad819d4e62245c88f285b6faa00b593~tplv-k3u1fbpfcp-watermark.image?)

-   **一键回到顶部按钮**

![bandicam 2022-08-25 10-28-25-054 00_01_16-00_01_25.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c5eadc9c146402aa5e7d48e004570c4~tplv-k3u1fbpfcp-watermark.image?)

-   **文章列表的无限下滑**

![bandicam 2022-08-25 10-28-25-054 00_01_05-00_01_19~1.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f7e321f95464951ba799c99d0b948f8~tplv-k3u1fbpfcp-watermark.image?)
- **文章类别导航栏点击时文章列表的相应变化：**

![bandicam 2022-08-25 10-28-25-054 00_00_31-00_00_51.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ee1992490c54afa80ac8d9a57873875~tplv-k3u1fbpfcp-watermark.image?)

-   **文章详情页的访问：**

![bandicam 2022-08-26 13-22-39-651 00_00_06-00_00_19.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c636f6509cb24422879a3e267f95f298~tplv-k3u1fbpfcp-watermark.image?)

- **文章内容：**

![bandicam 2022-08-26 13-19-38-951 00_00_19-00_00_30.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4114689ac6674f7ea49c90c6981c794d~tplv-k3u1fbpfcp-watermark.image?)

-   **文章页面一键返回顶部按钮：**

![bandicam 2022-08-26 15-35-37-194 00_00_00-00_00_30.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1476dfb1504741179abbc0400e5dee5e~tplv-k3u1fbpfcp-watermark.image?)

-   **文章详情页下方的相关推荐：**

其实数据同首页文章列表的数据一样。   

![bandicam 2022-08-26 13-34-30-031 00_00_06-00_00_13.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0cf7700e3664cba9cbcf45e4a836a29~tplv-k3u1fbpfcp-watermark.image?)

-   **相关推荐文章列表的跳转：**

![bandicam 2022-08-26 13-34-51-299 00_00_03-00_00_20.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df5fa2cec58141899a890cc053a9a210~tplv-k3u1fbpfcp-watermark.image?)
</br>
## 项目实现：
这里只列举一部分：
### 前端界面之HTML和CSS：
因为本项目为仿掘金网页，尽量跟掘金网页版ui贴近，因为能力有限时间有限且不重复造轮子的原则，项目html结构与掘金网页相同，css静态样式也与掘金官网相同。但要实现一些动态的效果还得需要js的加入

### 前端界面之js
#### aside侧边栏的动态样式：
使用过掘金官网的都会发现，当滚动条滚动到侧边栏完全消失时，侧边栏中的广告栏会重新出现，并且如fixed定位一般固定于页面右上方。 但其实看过官网的html后，会发现并不是通过改变组件定位去实现该样式，而是通过设置**opacity**（不透明度）去实现该效果。

```js
$(window).scroll((e) => {
    // 计算滚动条距离顶部的距离
    let scrollTop = $(document).scrollTop();
    let temp = document.querySelector(".sidebar-block.sticky-block")
    if(scrollTop>1200){
        temp.style.opacity = "1";
        let img = temp.querySelectorAll(".sticky-banner .banner-image")
        img[0].height = "200";
        img[1].height = "200";
    }else{
        temp.style.opacity = "0";
        let img = temp.querySelectorAll(".sticky-banner .banner-image")
        img[0].height = "0";
        img[1].height = "0";
    }
})
```
当滚动到指定位置时（如滚动位置大于某长度时），设置某组件的opacity属性为1；其他情况重新设置opacity为0.

右下方一键返回顶部的组件按钮的隐藏和显示也是同样道理。

#### 一键返回顶部的按钮：
点击右下角**返回顶部按钮**会返回页面顶部，其实代码很简单：

```
document.querySelector(".btn1.to-top-btn").addEventListener('click', (e)=>{
    document.documentElement.scrollTop = 0;
})
```

documentElement 属性以一个元素对象返回一个文档的文档元素。HTML 文档返回对象为HTML元素。这里直接设置整个文档对象的scrollTop为0，就会直接返回网页顶部。

#### 文章无限下滑：

**tips：** 代码中出现的article_html是文章块组件的html代码字符串，这里省略：

```js
let requestFlag = false;
let sum = 0;

$(function(){
    rendering(17);
})

//加载文章列表
function rendering(size){
    for (let i = sum; i < sum+size; i++) {
        let article_div = $(article_html)[0];
        read(i, article_div);
        $('.entry-list')[0].appendChild(article_div);
    }
    sum+=size;
}

//读取并写入json数据信息
function read(i, div1){
   $.getJSON("../../static/resource/json/all_article_info.json", function (data){
        let temp = Object.values(data);
        let lens = temp.length;
        let temp_book = temp[i%lens];
        let article_id = temp_book["article_id"];
        let user_id = temp_book["user_id"];
        let cover_image = temp_book["cover_image"];
        let time_count = temp_book["collect_count"];
        let time = (new Date().getTime()) - (1000 * 60 * 60 * 24 * Number(time_count));
        let article_title = div1.querySelector('.article_title');
        let article_abs = div1.querySelector('.abstract div');
        article_title.innerHTML = temp_book["title"];
        article_title.title = temp_book["title"];
        article_abs.innerHTML = temp_book["brief_content"];
        article_abs.title = temp_book["brief_content"];
        div1.querySelector('.date').innerHTML = getDistanceDay(time);
        div1.querySelector('.view span').innerHTML = temp_book["view_count"];
        div1.querySelector('.like span').innerHTML = temp_book["digg_count"];
        div1.querySelector('.comment span').innerHTML = temp_book["comment_count"];
        div1.querySelector('.tag_list .tag1').innerHTML = temp_book["category_name"];
        div1.addEventListener('click', function (){window.open('/'+article_id, '_blank')});
        if(cover_image!==''){
           let img_html = "<img alt="" class="lazy thumb" loading="lazy">";
           let img = $(img_html)[0];
           img.alt = temp_book["title"];
           img.src = cover_image;
           div1.querySelector('.content-wrapper').appendChild(img);
        }

       //获取文章作者账号信息
       $.getJSON("../../static/resource/json/all_user_info.json", function (data){
            let temp_id = data[user_id];
            div1.querySelector('.popover-box.user-popover').appendChild(document.createTextNode(temp_id["name"]));
       })
   });
}

//添加滚动条监听事件监听事件
$(window).scroll((e) => {
    // 计算滚动条距离底部的距离
    let navHeight = 178;
    let scrollHeight = $(".entry-list").outerHeight();
    let windowHeight = $(window).height();
    let scrollTop = $(document).scrollTop();
    let scrollBottom = scrollHeight - scrollTop - windowHeight + navHeight;
    // console.log(scrollBottom);
    if(scrollBottom < 100 && !requestFlag){
      request();
    }
})

//请求函数
function request(){
    requestFlag = true;
    setTimeout(() => {
      requestFlag = false;
      rendering(7);
    }, 500);
}
```


代码代码主要包括三个功能函数：request，read， rendering

-   request函数主要是在固定时间内重复调用渲染文章块组件的函数rendering。

-   read函数主要是打开json文件，按照需求将json信息插入html代码之中，需要插入的是第几条json数据则要看rendering参数是多少。

-   rending函数中的参数代表需要渲染多少个文件组件，其将html字符串初始化后(`$(article_html)[0]`)，再调用read函数，将所需要渲染的组件下标及初始化的文章块dom对象传给read函数，然后在read函数之中打开json文件，将第i条json数据插入dom对象。

-  检查是否该渲染下一批文章块的方法是，给窗口添加监听器，当滚动条离窗口在一定距离时，调用request函数加载下一批文章块组件。滚动条离窗口底部的距离计算公式为：`scrollHeight - scrollTop - windowHeight + navHeight` ，意为文章列表组件的总长度-滚动条离窗口顶部的距离 - 窗口的大小（滚动条的长度）+ 文章导航栏的高度。 这里加上文章导航栏的高度是因为文章块组件并非从窗口的最顶部开始，若不加则会出现偏差，提前加载文章块组件。

- 代码中的文章块组件的数据插入代码如：

```js
div1.querySelector('.view span').innerHTML = temp_book["view_count"];
```
这里的`temp_book`是json文件解析后形成的字典，`temp_book["view_count"]`是通过key`view_count`得到文章的浏览数。这里的json文件数据来自掘金官网首页（爬取），并且是经过整理的数据。

- 关于本代码中出现的**getDistanceDay()** 函数：

```js
let time_count = temp_book["collect_count"];
let time = (new Date().getTime()) - (1000 * 60 * 60 * 24 * Number(time_count));
div1.querySelector('.date').innerHTML = getDistanceDay(time);
```
在上面的代码片段中，没有写出**getDistanceDay()**，该函数是将文章发布的日期转换成如 *几天前， 几月前， 几年前* 这样的样式。


#### markdown文件转为html：
本项目将markdown文件转html使用的是**marked**插件，实现代码高亮使用的是**highlight**插件。

但其实掘金官网使用的是markdown解析器[**marked**](https://github.com/bytedance/bytemd.git)以及[**掘金文章风格渲染接口**](https://github.com/bytedance/bytemd/tree/main/packages/plugin-frontmatter)。由于接触前端的时间太短（八月份才开始），根本就不会用vue组件，但这两个插件的初始化使用的都是vue，所以本次项目没有实现掘金的文章页样式。

启动marked插件的方式很简单：

```js
var rendererMD = new marked.Renderer();
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});
marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});

function loadMD() {
    var response;
    response = new XMLHttpRequest();
    response.open("GET", "{{ url_for('static', filename='articles_file/'+article_inf['article_id']+'.md') }}", true);
    response.send();
    response.onreadystatechange=function() {
        if (response.readyState===4 && response.status===200) {
            $('.markdown-body').append(marked(response.responseText));
        }
    };
}
loadMD();
// $('code').each((e)=>{
//    let code = $(this).text();
//    let highCode = hljs.highlightAuto(code).value;
//    $(this).html(highCode);
// });
```
在初始化marked后，第一个setOptions中的参数解释如下：
- **gfm** 它是一个布尔值，默认为`true`。 允许 Git Hub标准的`markdown`.

- **tables** 它是一个布尔值，默认为`true`。 允许支持表格语法。该选项要求 `gfm` 为`true`。

- **breaks** 它是一个布尔值，默认为`false`。 允许回车换行。该选项要求 `gfm` 为`true`。

- **pedantic** 它是一个布尔值，默认为`false`。 尽可能地兼容 `markdown.pl`的晦涩部分。不纠正原始模型任何的不良行为和错误。

- **sanitize** 它是一个布尔值，默认为`false`。 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签） smartLists 它是一个布尔值，默认为`false`。 使用比原生`markdown`更时髦的列表。 旧的列表将可能被作为`pedantic`的处理内容过滤掉.

- **smartypants** 它是一个布尔值，默认为`false`。 使用更为时髦的标点，比如在引用语法中加入破折号。

第二个setOptions的作用是设置代码高亮，需要下载**highlight**插件，可以直接搜索highlight去官网下载。

**loadMD**函数的作用是请求md文件，使用的是ajax。

### 注意！！！
本项目中文章和用户数据并非批量爬取，而是手动复制，原因是：
- 在爬取的过程中，突然发现爬取的数据都是那20条，无论**cursor**参数（在爬虫程序中的请求体中）设置多大都一样。因此到最后只能自己手动复制数据。

本蒟蒻技术有限，并不能找到解决方案，等到学习到相关知识再进行解决和补充。

## 使用说明
- 本项目使用的是pycharm环境。
- 使用python编译器运行，在本地python中下载flask包。
- 如果使用的是pycharm，请选择flask项目，其中会自动布置项目环境，同本项目的文件布局，且会自动下载好所需要的依赖。
- 如果使用其他环境则可自行上网搜索flask项目运行方法，这里不予列出。
- 项目运行入口为app.py文件。


