let sum = 0;
requestFlag = false;

let a_list_html = "<li class=\"item_little\">\n" +
    "    <div class=\"entry\" style=\"margin-bottom: 0px;\">\n" +
    "        <div class=\"meta-container\">\n" +
    "            <a href=\"\" rel=\"\" class=\"user-message\">\n" +
    "                <div  data-v-692f5a44=\"\" class=\"popover-box user-popover\"><!--作者--></div>\n" +
    "            </a>\n" +
    "            <div class=\"date\"><!--时间--></div>\n" +
    "            <div class=\"tag_list\">\n" +
    "                <a href=\"/\" rel=\"\" class=\"tag1\"><!--标签--></a>\n" +
    "                <a href=\"/\" rel=\"\" class=\"tag\"></a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"content-wrapper\" style=\"border-bottom: 1px solid rgba(228, 230, 235, 0.5);\">\n" +
    "            <div class=\"content-main\">\n" +
    "                <div class=\"title-row\"> <!----> <!----> <!---->\n" +
    "                    <a href=\"\" rel=\"\" title=\"\" class=\"title\"><!--文章标题--></a>\n" +
    "                </div> \n" +
    "                <ul class=\"action-list jh-timeline-action-area\">\n" +
    "                    <li class=\"item view\">\n" +
    "                        <i></i> \n" +
    "                        <span><!--观看人数--></span>\n" +
    "                    </li> \n" +
    "                    <li class=\"item like\">\n" +
    "                        <i></i> \n" +
    "                        <span><!--点赞数--></span>\n" +
    "                    </li> \n" +
    "                    <li class=\"item comment\">\n" +
    "                        <i></i> \n" +
    "                        <span><!--评论数--></span>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div> <!---->\n" +
    "        </div> <!----> <!---->\n" +
    "    </div>\n" +
    "</li>"

$(function(){
    rendering(10);
})

//加载文章列表
function rendering(size){
    for (let i = sum; i < sum+size; i++) {
        let article_div = $(a_list_html)[0];
        read(i, article_div);
        $('.recommended-entry-list')[0].appendChild(article_div);
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
	   let time_count = temp_book["collect_count"];
	   let time = (new Date().getTime()) - (1000 * 60 * 60 * 24 * Number(time_count));
       let article_title = div1.querySelector('.title');
       article_title.innerHTML = temp_book["title"];
       article_title.title = temp_book["title"];
	   div1.querySelector('.date').innerHTML = getDistanceDay(time);
       div1.querySelector('.view span').innerHTML = temp_book["view_count"];
       div1.querySelector('.like span').innerHTML = temp_book["digg_count"];
       div1.querySelector('.comment span').innerHTML = temp_book["comment_count"];
       div1.querySelector('.tag_list .tag1').innerHTML = temp_book["category_name"];
	   div1.addEventListener('click', function (){window.open('/'+article_id, '_blank')});
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
    let scrollHeight = $(".entry-list").outerHeight()+$(".article-content").outerHeight()+$(".hot-list").outerHeight()+120;
    let windowHeight = $(window).height();
    let scrollTop = $(document).scrollTop();
    let scrollBottom = scrollHeight - scrollTop - windowHeight;
    if(scrollBottom < 20 && !requestFlag){
      request();
    }
})

//请求函数
function request(){
    requestFlag = true;
    setTimeout(() => {
      requestFlag = false;
      rendering(5);
    }, 500);
}



// 计算时间
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