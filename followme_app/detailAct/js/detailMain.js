//mui初始化
mui.init();
//mui加载框架元素成功之后执行此函数
mui.plusReady(function() {

	var _self = plus.webview.currentWebview();
	var actID = _self.actID;

	/*第一个参数需要传入一个页面的id。需要注意的是，这个页面id 就是我们包含顶部选项卡的页面，也就是当前我们这段js所在的页面*/
	var group = new webviewGroup(_self.id, {
		/*items数组中传入的是子页对应选项卡该导入的子页面的id，有几个子页就添加几个子页，中间用逗号分隔*/
		/*items数组中传入的是子页对应选项卡该导入的子页面的id，有几个子页就添加几个子页，中间用逗号分隔*/
		items: [{
				id: "clubDetail.html", //这是子页1的路径
				url: "clubDetail.html",
				extras: {
					actID: actID
				}
			}, {
				id: "actVideo.html", //这是子页2的路径
				url: "actVideo.html",
				extras: {
					actID: actID
				}
			},
			{
				id: "actDetail.html", //这是子页3的路径
				url: "actDetail.html",
				extras: {
					actID: actID
				}
			}

		],

		onChange: function(obj) {
			var c = document.querySelector(".mui-control-item.mui-active");
			if(c) {
				c.classList.remove("mui-active");
			}
			var target = document.querySelector(".mui-scroll .mui-control-item:nth-child(" + (parseInt(obj.index) + 1) + ")");
			target.classList.add("mui-active");
			if(target.scrollIntoView) {
				target.scrollIntoView();
			}
		}
	});
	mui(".mui-scroll").on("tap", ".mui-control-item", function(e) {
		var wid = this.getAttribute("data-wid");
		group.switchTab(wid);
	});

});
mui.back = function() {
	var _self = plus.webview.currentWebview();
	_self.close("auto");
}
