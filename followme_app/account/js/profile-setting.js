mui.init()

var _v = new Vue({
	el: "#me-setter-listid",
	data: {
		islogin: userHasLogined()
	}
})

mui.plusReady(function() {
	plus.cache.calculate(function(size) {
		var _cache = mui('#cache-size-id')[0];
		_cache.innerText = parseFloat(size / (1024 * 1024)).toFixed(2) + "M";
	})
})

function tableDidSelected(row) {
	if(row == 0 || row == 1 || row == 3) {
		if(!userHasLogined()) {
			hud_toast('请先登录');
			return;
		}
	}

	switch(row) {
		//case 0:openNewPage('me-baseinfo.html' , '关于我们' , true);break;	
		case 1:
			openNewPage('me-black-list.html', '黑名单', true);
			break;
		case 2:
			mui.confirm("确定清除缓存?", ["确认", "取消"], function(e) {
				var userinfo = localStorage.getItem('loginuserinfo');
				if(e.index == 0) {
					hud_show('清除缓存');
					plus.cache.clear(function() {
						var _cache = mui('#cache-size-id')[0];
						_cache.innerText = '0.00M';

						hud_close('清除完成');

						if(userinfo) {
							localStorage.setItem('loginuserinfo', userinfo);
						}
					});
				}
			});
			break;
		case 3: //意见反馈
			openNewPage('../publish/pub-feedback.html', '意见反馈', true);
			break;
		case 4:
			//openNewPage('me-setter-aboutus.html', '关于我们', true);
			break;
		default:
			break;
	}
}

if(userHasLogined()) {
	document.getElementById('logout-btn-id').addEventListener('tap', function() {
		plus.nativeUI.actionSheet({
			cancel: '取消',
			buttons: [{
				title: '退出账号'
			}]
		}, function(e) {
			if(e.index == 1) {
				console.log("点击退出登录按钮");
				var wv = plus.webview.getWebviewById('profile.html');

				localStorage.setItem('loginuserinfo', '{}');

				mui.fire(wv, 'logout-event', {});
				mui.back();
			}
			console.log(e.index);
		})
	})
}