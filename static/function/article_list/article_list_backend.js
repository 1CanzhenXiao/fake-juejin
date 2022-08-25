let requestFlag = false;
let sum = 0;

// 文章列表的结构
let article_html = "<li class=\"article_item item\">\n" +
    "        <div class=\"entry\" style=\"margin-bottom: 0px;\" >\n" +
    "            <div class=\"meta-container\">\n" +
    "                <a href=\"\" rel=\"\" class=\"user-message\">\n" +
    "                    <div class=\"popover-box user-popover\"><!--作者名字-->\n" +
    "                    </div>\n" +
    "                </a>\n" +
    "                <div class=\"date\"></div>\n" +
    "                <div class=\"tag_list\">\n" +
    "                    <a href=\"\"  rel=\"\" class=\"tag1\"></a>\n" +
    "                    <a href=\"\"  rel=\"\" class=\"tag\"></a>\n" +
    "                    <a href=\"\"  rel=\"\" class=\"tag\"></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"content-wrapper\" style=\"border-bottom: 1px solid rgba(228, 230, 235, 0.5);\">\n" +
    "                <div class=\"content-main\">\n" +
    "                    <div class=\"title-row\">\n" +
    "                        <!---->\n" +
    "                        <!---->\n" +
    "                        <!---->\n" +
    "                        <a href=\"\" rel=\"\" title=\"\" class=\"article_title\">\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                    <div class=\"abstract\">\n" +
    "                        <a href=\"\" rel=\"\" title=\"\">\n" +
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
   $.getJSON("../../static/resource/json/backend.json", function (data){
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
           let img_html = "<img alt=\"\" class=\"lazy thumb\" loading=\"lazy\">";
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

function getDistanceDay(time) {
	let stime = new Date().getTime();
	let usedTime = stime - time; //两个时间戳相差的毫秒数

	let one_minute = 60 * 1000;
	let one_hour = 60 * 60 * 1000;
	let one_day = 24 * 60 * 60 * 1000;
	let timeTxt = '';
	if (usedTime >= one_day) {
		//相差几天
		let disparityDay = parseInt(usedTime / one_day);

		timeTxt = disparityDay + '天前';
		if (disparityDay > getMonthDay()) timeTxt = getDisparityMonth(disparityDay) + '个月前';

		if (disparityDay > getYearDay()) timeTxt = parseInt(disparityDay / getYearDay()) + '年前';

	} else {
		if (usedTime >= one_hour) {
			timeTxt = parseInt(usedTime / one_hour) + '小时前';
		} else if (usedTime >= one_minute) {
			timeTxt = parseInt(usedTime / one_minute) + '分钟前';
		} else {
			timeTxt = '刚刚';
		}
	}
	return timeTxt;
}

// 获取相差几个月 传天数
function getDisparityMonth(disparityDay) {
	let disparityMonth = 0;
	let countFc = () => {
		if (disparityDay > getMonthDay(disparityMonth)) {
			disparityDay -= getMonthDay(disparityMonth)
			disparityMonth += 1;
			countFc(disparityMonth)
		} else {
			return disparityMonth;
		}
	}
	countFc(disparityMonth)
	return disparityMonth;
}

// 获取当前月
function getNowMonth() {
	return new Date().getMonth() + 1;
}

// 获取当前月有多少天 可以计算前面几个月有多少天 upNum 是前面几个月
function getMonthDay(upNum) {
	let day = 0;
	let month = getNowMonth();
	if (upNum) {
		let date = new Date();
		date.setMonth(date.getMonth() - upNum);
		month = date.getMonth() + 1;
	}
	if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
		day = 31
	} else if (month === 2) {
		if (getYearDay() === 366) day = 29
		if (getYearDay() === 365) day = 28
	} else {
		day = 30
	}
	return day;
}

// 获取当前年有多少天
function getYearDay() {
	let day = 365
	let year = new Date().getFullYear();
	if (year % 4 === 0) day = 366;
	return day;
}