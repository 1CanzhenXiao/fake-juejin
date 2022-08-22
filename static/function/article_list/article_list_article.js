let requestFlag = false;
let sum = 0;

// 文章列表的结构
let article_html = "<li class=\"article_item item\">\n" +
    "        <div class=\"entry\" style=\"margin-bottom: 0px;\" >\n" +
    "            <div class=\"meta-container\">\n" +
    "                <a href=\"#\" target=\"_blank\" rel=\"\" class=\"user-message\">\n" +
    "                    <div class=\"popover-box user-popover\"><!--作者名字-->\n" +
    "                    </div>\n" +
    "                </a>\n" +
    "                <div class=\"date\"></div>\n" +
    "                <div class=\"tag_list\">\n" +
    "                    <a href=\"/tag/%E5%89%8D%E7%AB%AF\" target=\"_blank\" rel=\"\" class=\"tag1\"></a>\n" +
    "                    <a href=\"/tag/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0\" target=\"_blank\" rel=\"\" class=\"tag\"></a>\n" +
    "                    <a href=\"/tag/%E7%BC%96%E8%AF%91%E5%99%A8\" target=\"_blank\" rel=\"\" class=\"tag\"></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"content-wrapper\" style=\"border-bottom: 1px solid rgba(228, 230, 235, 0.5);\">\n" +
    "                <div class=\"content-main\">\n" +
    "                    <div class=\"title-row\">\n" +
    "                        <!---->\n" +
    "                        <!---->\n" +
    "                        <!---->\n" +
    "                        <a href=\"\" target=\"_blank\" rel=\"\" title=\"\" class=\"article_title\">\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                    <div class=\"abstract\">\n" +
    "                        <a href=\"\" target=\"_blank\" rel=\"\">\n" +
    "                            <div>\n" +
    "                            </div>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                    <ul class=\"action-list jh-timeline-action-area\">\n" +
    "                        <li class=\"item view\">\n" +
    "                            <i></i>\n" +
    "                            <span></span>\n" +
    "                        </li>\n" +
    "                        <li class=\"item like\">\n" +
    "                            <i></i>\n" +
    "                            <span></span>\n" +
    "                        </li>\n" +
    "                        <li class=\"item comment\">\n" +
    "                            <i></i>\n" +
    "                            <span></span>\n" +
    "                        </li>\n" +
    "                        <!---->\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <!---->\n" +
    "            </div>\n" +
    "            <!---->\n" +
    "            <div class=\"dislike-button\">\n" +
    "                <svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"icon-close\">\n" +
    "                    <path d=\"M1.70538 11.7191C1.52399 11.899 1.22992 11.899 1.04853 11.7191L1.03125 11.7019C0.849866 11.522 0.84987 11.2302 1.03125 11.0502L10.2956 1.85884C10.477 1.67889 10.7711 1.67889 10.9525 1.85885L10.9697 1.876C11.1511 2.05596 11.1511 2.34773 10.9697 2.52769L1.70538 11.7191Z\"></path>\n" +
    "                    <path d=\"M1.0828 2.48943C0.903312 2.30758 0.904276 2.01369 1.08495 1.83302L1.10216 1.8158C1.28284 1.63513 1.5748 1.63609 1.75428 1.81794L10.9104 11.0949C11.0898 11.2767 11.0889 11.5706 10.9082 11.7513L10.891 11.7685C10.7103 11.9492 10.4183 11.9482 10.2389 11.7664L1.0828 2.48943Z\"></path>\n" +
    "                </svg>\n" +
    "                <!---->\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </li>"

//用户信息的结构
let user_html = "<div class=\"popover-content\" style=\"\">" +
    "<div class=\"info-row\">" +
    "   <a href=\"#\" target=\"_blank\" rel=\"\">" +
    "       <img src=\"\" alt=\"\" class=\"lazy avatar avatar\" loading=\"lazy\">" +
    "   </a> " +
    "<div class=\"user-info\">" +
    "   <a href=\"#\" target=\"_blank\" rel=\"\" class=\"username\">" +
    "       <span class=\"name\" style=\"max-width: 128px;\">\n" +
    "       </span> " +
    "       <span blank=\"true\" class=\"rank\">" +
    "           <img src=\"\" alt=\"\" title=\"创作等级\">" +
    "       </span> " +
    "       <img src=\"\" alt=\"掘友等级\" title=\"掘友等级\" class=\"jueyou-level\"> " +
    "       <div class=\"vip-level\">" +
    "           <span class=\"tooltip\">" +
    "               <div class=\"byte-tooltip byte-tooltip--dark\" style=\"display: none;\">\n" +
    "               </div>" +
    "               <span class=\"byte-tooltip__wrapper\">" +
    "                   <img src=\"\" alt=\"\">" +
    "               </span>" +
    "           </span>" +
    "       </div> " +
    "    </a> " +
    "<div class=\"position\"></div>" +
    "</div>" +
    "</div> " +
    "<button class=\"ui-btn follow-btn primary large default attention\"><!----> \n" +
    "    关注\n" +
    "</button> " +
    "<div class=\"meta-row\">" +
    "<ul class=\"meta-list\">" +
    "<li class=\"item\">" +
    "<div class=\"count\"></div> " +
    "<div class=\"title\">关注</div>" +
    "</li> " +
    "<li class=\"divider\"></li> " +
    "<li class=\"item\">" +
    "<div class=\"count\"></div> " +
    "<div class=\"title\">粉丝</div>" +
    "</li>" +
    "</ul>" +
    "</div> " +
    "<span class=\"container3 triangle-bottom\">" +
    "<em class=\"triangle\"></em></span></div>"

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
   $.getJSON("../../static/resource/json/article.json", function (data){
       let temp_book = data[i];
       var user_id = temp_book["user_id"];
       let cover_image = temp_book["cover_image"];
       let article_title = div1.querySelector('.article_title');
       article_title.innerHTML = temp_book["title"];
       article_title.title = temp_book["title"];
       div1.querySelector('.view span').innerHTML = temp_book["view_count"];
       div1.querySelector('.like span').innerHTML = temp_book["digg_count"];
       div1.querySelector('.comment span').innerHTML = temp_book["comment_count"];
       div1.querySelector('.abstract div').innerHTML = temp_book["brief_content"];
       div1.querySelector('.tag_list .tag1').innerHTML = temp_book["category_name"];
       if(cover_image!==''){
           let img_html = "<img alt=\"\" class=\"lazy thumb\" loading=\"lazy\">";
           let img = $(img_html)[0];
           img.alt = temp_book["title"];
           img.src = cover_image;
           div1.querySelector('.content-wrapper').appendChild(img);
       }
       // let div2 = $(user_html)[0];  //初始化用户信息结构
       //获取文章作者账号信息

       $.getJSON("../../static/resource/json/all_user_info.json", function (data){
            let temp_id = data[user_id];
            div1.querySelector('.popover-box.user-popover').appendChild(document.createTextNode(temp_id["name"]));
            // div2.querySelector('.name').innerHTML = temp_id["name"];
            // div2.querySelector('.avatar').src = temp_id["avatar_large"];
            // div2.querySelector('.position').innerHTML = temp_id["descrip"];
       })
       // div1.querySelector('.popover-box.user-popover').appendChild(div2);
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