$(function() {
	/* 添加账号-弹窗 */
	$('#add-account').on('click', function() {
		window.top.layer.open({
			type: 2,
			title: '添加账号',
			shadeClose: true,
			shade: 0.5,
			area: ['730px', '400px'],
			content: 'authority-manage/insert-account.html',
			success: function(layero, index) {
				window.top.layer.iframeAuto(index);
			}
		});
	});

	/* 添加岗位-弹窗 */
	$('#add-jobs').on('click', function() {
		window.top.layer.open({
			type: 2,
			title: '添加岗位',
			shadeClose: true,
			shade: 0.5,
			area: ['430px', '200px'],
			content: 'authority-manage/insert-jobs.html',
			success: function(layero, index) {
				window.top.layer.iframeAuto(index);
			}
		});
	});

	/* 修改权限-弹窗  */
	$('#update-authority').on('click', function() {
		window.top.layer.open({
			type: 2,
			title: '修改权限',
			shadeClose: true,
			shade: 0.5,
			area: ['730px', '550px'],
			content: 'authority-manage/alter-authority.html',
			success: function(layero, index) {
				window.top.layer.iframeAuto(index);
			}
		});
	});

	/* 删除岗位-弹窗  */
	$('#delete-jobs').on('click', function() {
		window.top.layer.confirm('您确定删除该岗位？', {
			btn: ['确定', '取消']
		}, function() {
			window.top.layer.msg('删除成功！', {
				icon: 1
			});
		});
	});

	var index = window.top.layer.getFrameIndex(window.name); //获取窗口索引
	var regChar = /^[a-zA-Z0-9]+$/; //英文、数字
	var regChar1 = /^[\u4e00-\u9fa5\sa-zA-Z0-9]+$/; //中文、英文、数字、空格
	var regPhone = /^1\d{10}$/; //手机
	var regAdmin = /^\w{4,20}$/; //账号
	/* 保存-添加账号 */
	$('#ok-account').on('click', function() {
		var department = $.trim($('#department').val());
		var userName = $.trim($('#user-name').val());
		var jobPost = $.trim($('#job-post').val());
		var jobNumber = $.trim($('#job-number').val());
		var contactWay = $.trim($('#contact-way').val());
		var accountName = $.trim($('#account-name').val());
		var accountPassword = $.trim($('#account-password').val());
		var yesNo = 1;
		if ($('#isN').prop('checked')) {
			yesNo = 0;
		}
		if (department === '') {
			errorTips('请填写部门！', '#department');
		} else if (department.length > 20) {
			errorTips('字数超出了20个字符！', '#department');
		} else if (userName === '') {
			errorTips('姓名不能空！', '#user-name');
		} else if (userName.length > 20) {
			errorTips('字数超出了20个字符！', '#user-name');
		} else if (jobPost === '') {
			errorTips('请选择岗位！', '#job-post');
		} else if (jobNumber !== '' && !regChar.test(jobNumber)) {
			errorTips('只允许输入英文、数字！', '#job-number');
		} else if (contactWay !== '' && !regPhone.test(contactWay)) {
			errorTips('请输入正确的联系方式！', '#contact-way');
		} else if (accountName === '') {
			errorTips('请输入帐号名称！', '#account-name');
		} else if (!regAdmin.test(accountName)) {
			errorTips('格式错误！4-20个字符！', '#account-name');
		} else if (accountPassword === '') {
			errorTips('请输入密码！', '#account-password');
		} else if (accountPassword.length < 6 || accountPassword.length > 18) {
			errorTips('长度在6-18个字符之间！', '#account-password');
		} else {
			refreshIframe();
			window.top.layer.close(index);
		}
	});

	/* 保存-添加岗位 */
	$('#ok-jobs').on('click', function() {
		var jobPost = $.trim($('#job-post').val());
		if (jobPost == '') {
			errorTips('岗位名称不能为空！', '#job-post');
		} else if (!regChar1.test(jobPost)) {
			errorTips('只允许输入中英文、数字及空格！', '#job-post');
		} else if (jobPost.length > 20) {
			errorTips('字数超出了20个字符！', '#job-post');
		} else {
			refreshIframe();
			window.top.layer.close(index);
		}
	});

	/* 保存-修改权限 */
	$('#ok-authority').on('click', function() {
		refreshIframe();
		window.top.layer.close(index);
	});

	/* 刷新-当前iframe页面  */
	function refreshIframe() {
		var currentIframe = top.$('.iframe-items.show > iframe');
		currentIframe[0].contentWindow.location.reload(true);
	}

	/* tips提示 - 错误  */
	function errorTips(content, strId) {
		layer.tips(content, strId, {
			tips: [1, '#e00']
		});
		$(strId).focus();
	}
});