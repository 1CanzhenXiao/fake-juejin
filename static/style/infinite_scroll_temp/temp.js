let requestFlag = false;
//$("").text可向元素添加内容
let article_html = "<li class=\"item\">\n" +
    "        <div class=\"entry\" style=\"margin-bottom: 0px;\">\n" +
    "            <div class=\"meta-container\">\n" +
    "                <a href=\"/user/4301729759245678\" target=\"_blank\" rel=\"\" class=\"user-message\">\n" +
    "                    <div class=\"popover-box user-popover\"><!---->\n" +
    "                    </div>\n" +
    "                </a>\n" +
    "                <div class=\"date\"></div>\n" +
    "                <div class=\"tag_list\">\n" +
    "                    <a href=\"/tag/%E5%89%8D%E7%AB%AF\" target=\"_blank\" rel=\"\" class=\"tag\"></a>\n" +
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
    "                        <a href=\"\" target=\"_blank\" rel=\"\" title=\"\" class=\"title\">\n" +
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
    "                            <i><img src=\"{{ url_for('static',filename='need_image/eye.png') }}\"></i>\n" +
    "                            <span></span>\n" +
    "                        </li>\n" +
    "                        <li class=\"item like\">\n" +
    "                            <i><img src=\"{{ url_for('static',filename='need_image/Zan_off.png') }}\"></i>\n" +
    "                            <span></span>\n" +
    "                        </li>\n" +
    "                        <li class=\"item comment\">\n" +
    "                            <i><img src=\"{{ url_for('static',filename='need_image/cloud_off.png') }}\"></i>\n" +
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

$(function(){
    rendering(17);
})

function rendering(size){
    for (let i = 0; i < size; i++) {
        let div = $(article_html)[0];
        div.classList.add('inner');
        outer.appendChild(div);
    }
}

$(window).scroll((e) => {
    // 计算滚动条距离底部的距离
    let scrollHeight = $(".outer").outerHeight();
    console.log(scrollHeight);
    let windowHeight = $(window).height();
    console.log(windowHeight);
    //浏览器兼容问题
    let scrollTop = $(document).scrollTop();
    console.log(scrollTop);

    let scrollBottom = scrollHeight - scrollTop - windowHeight;
    if(scrollBottom < 20 && !requestFlag){
      request();
    }
})

function request(){
    requestFlag = true;
    setTimeout(() => {// simulate request
      requestFlag = false;
      rendering(7);
    }, 500);// delay 1s to simulate request
}