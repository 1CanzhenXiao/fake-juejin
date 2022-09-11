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
	//获取的月份会减1
	return new Date().getMonth() + 1;
}

// 获取当前月有多少天 可以计算前面几个月有多少天 ， upNum 是前面几个月
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