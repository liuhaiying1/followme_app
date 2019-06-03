/**
 * 获取页面URL路径中的信息
 * @param name 要获取的值的key
 * @returns 要获取的值
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


/**
 * 获取当前时间
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour
    }
    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute
    }
    if (second >= 0 && second <= 9) {
        second = "0" + second
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1
        + strDate + " " + hour + seperator2 + minute + seperator2 + second;
    return currentdate;
}


/**
 * 比较两个日期的大小
 */
function checkEndTime(start, end) {
    var startTime = new Date(start.toString().replace("-", "/").replace("-", "/"));
    var endTime = new Date(end.toString().replace("-", "/").replace("-", "/"));
    if (startTime < endTime) {
        return true;
    }
    return false;
}

/**
 * 数字转成大写中文
 * @param n 阿拉伯数字
 * @returns {*} 中文大写/数据错误信息
 * @constructor
 */
function numberToChinese(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
        return "数据错误，请重新输入！";
    var unit = "京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
    n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p + 1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(兆|万|亿|元)/g, "$1").replace(/(兆|亿)万/g, "$1").replace(/(京|兆)亿/g, "$1").replace(/(京)兆/g, "$1").replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, "$1$2零$3仟").replace(/^元零?|零分/g, "").replace(/(元|角)$/g, "$1整");
}

/*
 * width 弹出页面宽度
 * height 弹出页面高度
 * url 弹出页面url
 */
function openWin(width, height, url) {

    var popUrl = url;

    var iWidth = width;                         //弹出窗口的宽度;
    var iHeight = height;                        //弹出窗口的高度;

    var iTop = (window.screen.height - 30 - iHeight) / 2;       //获得窗口的垂直位置;
    var iLeft = (window.screen.width - 10 - iWidth) / 2;        //获得窗口的水平位置

    window.open(popUrl, '', 'height=' + iHeight + ', width=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ' toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')

}

function openWin(url) {
    var popUrl = url;
    var iWidth = window.screen.width * 2 / 3;                  //弹出窗口的宽度;
    var iHeight = window.screen.height * 2 / 3;                //弹出窗口的高度;
    var iTop = (window.screen.height - 30 - iHeight) / 2;       //获得窗口的垂直位置;
    var iLeft = (window.screen.width - 10 - iWidth) / 2;        //获得窗口的水平位置
    window.open(popUrl, '', 'height=' + iHeight + ', width=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ' toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
}





/**
 * 详情页关闭窗口
 */
function closeDetail() {
    if (confirm("您确定要关闭本页吗？")) {
        window.opener = null;
        window.open('', '_self');
        window.close();
    }
}


/**
 * 判断数据是否为int类型
 */
Number.prototype.isInteger = function (global) {
    var floor = Math.floor, isFinite = global.isFinite;
    Object.defineProperty(Number, 'isInteger', {
        value: function isInteger(value) {
            return typeof value === 'number' && isFinite(value)
                && floor(value) === value;
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
};



/**
 * 判断文件大小
 */
function checkFile(vue, file) {
    if (file.size < g_fileSize) {
        return true;
    } else {
        vue.$Message.warning({
            content: "默认文件大小小于50M",
            top: 50,
            duration: 3
        });
        return false;
    }
}
