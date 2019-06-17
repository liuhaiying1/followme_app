//mui初始化
mui.init();

mui.plusReady(function() {

	pullupRefresh();

});

function pullupRefresh() {
	setTimeout(function() {
		mui.ajax({
			url: _base_url + '/followme/chat/getUserAllChatLog',
			type: 'post', //HTTP请求类型
			dataType: 'json', //服务器返回json格式数据
			timeout: 10000,

			success: function(data) {
				var items = {
					items: data.obj
				};
				var html = template(document.getElementById('tpl').innerHTML, items);
				document.getElementById('chatList').innerHTML = html;

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("请求失败!!！" + textStatus);
			}
		})
	}, 1000);
}