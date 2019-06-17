var actID = null;
var clubID = null;
//mui初始化
mui.init();
//mui加载框架元素成功之后执行此函数
mui.plusReady(function() {

	var _self = plus.webview.currentWebview();
	actID = _self.actID;

	pullupRefresh();

	document.getElementById("backImg").addEventListener("tap", function() {
		//点击退出按钮
		mui.back();
		//mui.close();
	});

});

function pullupRefresh() {
	//业务逻辑代码，比如通过ajax从服务器获取新数据； ...... 
	// 两个注意事项： 
	//1、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后

	setTimeout(function() {
		mui.ajax({
			url: _base_url + '/followme/query/queryClubInfoByActID',
			type: 'post', //HTTP请求类型
			/*		headers: {
						'Content-Type': 'application/json'
					},*/
			data: {
				actID: actID
			},
			dataType: 'json', //服务器返回json格式数据
			timeout: 10000,

			success: function(data) {
				console.log("首次ajax " + data.code);
				var content = ''
				if(data.code == 200) { //查询成功
					$("#clubName").text(data.obj.clubName);
					$("#description").text(data.obj.description);
					clubID = data.obj.id;
					mui.ajax({
						url: _base_url + '/followme/query/queryClubActByClubID',
						type: 'post', //HTTP请求类型
						/*		headers: {
									'Content-Type': 'application/json'
								},*/
						data: {
							clubID: clubID
						},
						dataType: 'json', //服务器返回json格式数据
						timeout: 10000,

						success: function(data) {
							console.log(data.code);
							var content = ''
							if(data.code == 200) { //查询成功
								$("#actNum").text("召集中的活动 (" + data.obj.length + ")");
								var activities = document.body.querySelector('#activities'); //返回匹配的第一个元素
								console.log("列表数据长度：", data.obj.length);
								for(var i = 0; i < data.obj.length; i++) {
									var item = data.obj[i];
									if(item) {
										var id = item.id; //活动ID
										var actTitle = item.actTitle; //俱乐部名称
										var actCost = item.actCost; //活动金额
										var pic = item.pictureList[0];
										console.log("enter" + i);
									}

									var activity = document.createElement('div');
									activity.className = 'activity';
									content += '<img class="activity_img" src="' + _base_url + pic.pictureUrl + '" style="height:50px;width:25%;overflow: hidden;float:left;" />';
									content += '<div class="activity_text" style="height:50px;width:70%;float:left;"><h4>' + actTitle + '</h4><label>' + actCost + '</label></div>';
									activity.innerHTML = content;
									activities.appendChild(activity);
								}
								//判断是否还有数据,若小于每次加载条数,结束
								//每次加载结束之后，如果还有数据则++,查询下一页数据
							}
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							console.log("请求失败!!！" + textStatus);
						}
					})

				}
				//判断是否还有数据,若小于每次加载条数,结束
				//每次加载结束之后，如果还有数据则++,查询下一页数据
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("请求失败!!！" + textStatus);
			}
		});

	}, 1000);
}