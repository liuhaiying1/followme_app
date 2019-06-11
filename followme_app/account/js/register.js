var seconds = 180; //剩余时间
var isBeginCnt = false;
var _timer;

mui.init()
mui.plusReady(function() {
	var wv = plus.webview.currentWebview();
	_isRegisterV.item = wv.type;
})

var _isRegisterV = new Vue({
	el: '#register',
	data: {
		item: {}
	}

})

function getCheckCode() {
	///判断号码合法
	var phone = document.getElementById('phonenumber-id').value;
	if(!(/^1[0-9]{10}$/.test(phone))) {
		mui.alert("请输入正确的手机号");
		return false;
	}

	if(seconds != 180) {
		return;
	}

	isBeginCnt = true;
	//请求验证码
	hud_show('正在请求验证码');
	api_post(_getPhoneMessage_url, {
		'phone': phone
	}, function(res) {
		console.log((res));
		hud_close('验证码已发送到手机');
	}, function(error) {
		console.log(error);
		hud_close(error);
	});

	if(_timer) {
		return
	}
	_timer = setInterval(function() {
		if(!isBeginCnt) {
			return
		}
		if(seconds == 0) {
			var checkcode = mui('#checkou-code-id')[0];
			checkcode.innerText = '获取验证码';
			isBeginCnt = false;
			seconds = 180;
			return;
		}

		seconds--;
		var checkcode = mui('#checkou-code-id')[0];
		checkcode.innerText = seconds + 's后重新获取';
	}, 1000);

}

function userAgreement(type) {
	openNewPage('me/webpage.html', '用户协议', true, {
		'url': BASE_URL + user_agreement_url
	});
}

document.getElementById('register-btn-id').addEventListener('tap', function() {
	var isRegister = _isRegisterV.item;
	var userName = document.getElementById('userName-id').value;
	var phone = document.getElementById('phonenumber-id').value;
	var pwd = document.getElementById("pwd-input1").value;
	var pwd2 = document.getElementById("pwd-input2").value;
	var checkcode = document.getElementById("checkou-code-input").value;
	var type = "phone"; //默认为手机类型注册

	if(phone.length != 11) {
		plus.nativeUI.toast('请输入正确的手机号');
		return;
	}
	if(checkcode.length != 6) {
		plus.nativeUI.toast('请输入正确的验证码');
		return;
	}
	if(pwd.length < 6) {
		plus.nativeUI.toast('请输入6位以上密码');
		return;
	}
	if(pwd != pwd2) {
		plus.nativeUI.toast('两次密码输入不一致!');
		return;
	}

	// /^1[0-9]{10}$/
	// /^1(3|4|5|7|8)\d{9}$/
	if(!(/^1[0-9]{10}$/.test(phone))) {
		mui.alert("请输入正确的手机号");
		return false;
	}

	var d = {
		'userName': userName,
		'password': pwd,
		'phone': phone,
		'type': type
	};
	if(isRegister == 1) {
		d['isModify'] = 1;
	}

	hud_show('提交中');
	api_post(_phoneRegister_url, d, function(res) {
		if(isRegister == 0) {
			hud_close('注册成功');
			mui.alert('注册成功,请前往登录', '', '', function() {
				mui.back();
			});
		} else {
			hud_close('修改成功');
			mui.alert('修改成功,请前往登录', '', '', function() {
				mui.back();
			});
		}

	}, function(error) {
		hud_close(error);
		mui.alert(error);
	})

})