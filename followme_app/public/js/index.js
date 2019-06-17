//mui初始化
mui.init();
var _index = 0;
//var subpages = ['home/home.html', 'message/message.html', 'account/me.html'];

//除了主页面其余页面的样式
function navigationBarStyle(index) {

	var subpage_style = {
		top: '0px',
		bottom: '51px'
	};

	//var _titles = ['首页', '消息', '个人中心']
	if(1) { 			//index != 
		subpage_style['titleNView'] = {
			titleText: _titles[index],
			titleColor: "#FFFFFF", // 字体颜色,颜色值格式为"#RRGGBB",默认值为"#000000"
			titleSize: "17px", // 字体大小,默认17px
			backgroundColor: '#ff4500', //#089DDD 控件背景颜色,颜色值格式为"#RRGGBB",默认值为"#F7F7F7"
			splitLine: { // 标题栏控件的底部分割线，类似borderBottom
				color: "#CCCCCC", // 分割线颜色,默认值为"#CCCCCC"  
				height: "0px"
			},
		}
	}
	return subpage_style;
}

var aniShow = {};

//mui加载框架元素成功之后执行此函数
//创建子页面，首个选项卡页面显示，其它均隐藏；
mui.plusReady(function() {
	var h = plus.nativeUI.showWaiting();

	//仅支持竖屏显示
	plus.screen.lockOrientation("portrait-primary");
	//有值，说明已经显示过了，无需显示；
	//关闭splash页面；
	plus.navigator.closeSplashscreen();
	plus.navigator.setFullscreen(false);

	//获取当前窗口对象
	var self = plus.webview.currentWebview();
	for(var i = 0; i < 3; i++) {
		var temp = {};
		var _style = navigationBarStyle(i);
		var sub = plus.webview.create(subpages[i], subpages[i], _style);
		if(i > 0) {
			//除去首页，其余页面全都隐藏
			sub.hide();
		} else {
			// 						temp[subpages[i]] = "true";
			// 						mui.extend(aniShow,temp);
			// 						setTitle('首页')
		}
		//把子页面添加到当前窗口对象里
		self.append(sub);
	}

	setTimeout(function() {
		h.close();
	}, 1500)

});

//当前激活选项
//获取当前第一个页面
var activeTab = subpages[0];
var title = document.getElementById("title");

//给底部table 选项卡添加单机监听事件,	选项卡点击事件
mui('.mui-bar-tab').on('tap', 'a', function(e) {
	//获取目标路径
	var targetTab = this.getAttribute('href');
	//如果当前地址是index.html目标地址也是index.html
	if(targetTab == activeTab) {
		return;
	}

	//更换标题
	//title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;

	//显示目标选项卡
	//若为iOS平台或非首次显示，则直接显示
	if(mui.os.ios || aniShow[targetTab]) {
		plus.webview.show(targetTab);
	} else {
		//否则，使用fade-in动画，且保存变量
		var temp = {};
		temp[targetTab] = "true";
		mui.extend(aniShow, temp);
		plus.webview.show(targetTab, "fade-in", 300);
	}
	//隐藏当前;
	plus.webview.hide(activeTab);
	//更改当前活跃的选项卡
	activeTab = targetTab;
});

//自定义事件，模拟点击“首页选项卡”
document.addEventListener('gohome', function() {
	var defaultTab = document.getElementById("homeTab");
	//模拟首页点击
	mui.trigger(defaultTab, 'tap');
	//切换选项卡高亮
	var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
	if(defaultTab !== current) {
		current.classList.remove('mui-active');
		defaultTab.classList.add('mui-active');
	}
});
