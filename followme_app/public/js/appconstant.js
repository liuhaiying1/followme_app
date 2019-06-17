/*app的常量配置文件*/


/*URL配置*/
var _base_ip = "192.168.1.108";

var _base_port = "8080";
var _base_url = "http://" + _base_ip + ":" + _base_port;			//http:192.168.1.111:8080

//账号登录
var _accountLogin_url = _base_url + "/followme/account/login/accountLogin";		
//手机登录
var _phoneLogin_url = _base_url + "/followme/account/login/phoneLogin";
//获取手机验证码
var _getPhoneMessage_url = _base_url + "/followme/account/login/registerPhone/sendMessage";
//手机账号注册
var _phoneRegister_url = _base_url + "/followme/account/login/accountRegister";

/*顶部title栏*/
var _titles = ['首页', '消息', '个人中心']

/*底部按钮对应的界面:首页，消息，我*/
var subpages = ['home/home.html', 'message/chatList.html', 'account/profile.html'];

