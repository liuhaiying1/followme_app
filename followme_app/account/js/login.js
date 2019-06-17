mui.init({});

function registerAndFindPwdAction(type) {
	openNewPage('register.html', type ? '找回密码' : '注册账号', true, {
		'type': type
	});
}

mui.plusReady(function() {
	var _width = plus.screen.resolutionWidth;
	var _avatar_w = (_width - 100) / 2.0;
	var useravatar = document.getElementById("logo-icon-id");
	useravatar.style.marginLeft = _avatar_w + 'px';
})

var loginV = new Vue({
	el: '#login-form-id',
	methods: {
		login: function() {
			var userName = document.getElementById('login-name-id').value;
			var pwd = document.getElementById("login-pwd-id").value;

			//陈敏添加注释
			/*				if(phone.length != 11){
								plus.nativeUI.toast('请输入正确的手机号' );//, {verticalAlign:'center'}
								return;
							}*/

			if(pwd.length < 6) {
				plus.nativeUI.toast('请输入正确的密码,密码不少于6位');
				return;
			}
			// /^1[0-9]{10}$/
			// /^1(3|4|5|7|8)\d{9}$/

			//陈敏添加注释
			/*				if(!(/^1[0-9]{10}$/.test(phone))){ 
								mui.alert("请输入正确的手机号");  
								return false; 
							} */
			var data = {
				userName: userName,
				password: pwd
			};

			hud_show('正在登录');
			api_post(_accountLogin_url, data, function(res) {
				console.log(JSON.stringify(res));
				localStorage.setItem('loginuserinfo', JSON.stringify(res));

				setTimeout(function() {
					var wv = plus.webview.getWebviewById('profile.html');
					mui.fire(wv, 'update-profile-success', {});

					hud_close('登录成功');
					mui.back();
				}, 500)

			}, function(error) {
				hud_close(error);
			})
		}
	}
})