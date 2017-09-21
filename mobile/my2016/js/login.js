$(function() {
  /* API接口前缀 */
  var apiPrefix = 'http://agent.qfang.com';
  /* 提示 */
  function popupTip(info) {
    var _html;
    if(!$('.popup-tip').length) {
      _html = '<section class="box-align popup-tip" style="display:none;"><div class="content"><p>' + info + '</p></div></section>';
      $('body').append(_html);
    } else {
      $('.popup-tip').find('p').text(info);
    }
    $('.popup-tip').show();
    setTimeout(function() {
      $('.popup-tip').hide();
    }, 2000);
  };
  /* 请求登录 */
  function userLogin(jsonData) {
    $.ajax({
      type: 'post',
      url: apiPrefix + '/qfang-agent-api/api/mobile/common/login',
      dataType: 'json',
      data: jsonData
    }).then(function(json) {
      if(json && json.data && json.code === 1000) {
        popupTip('登录成功！');
        setTimeout(function() {
          window.sessionStorage.setItem('sessionid', json.data.sessionId);
          window.location.href = 'index.html';
        }, 2000);
      } else {
        popupTip('登录失败！');
        setTimeout(function() {
          window.location.href = 'login.html';
        }, 2000);
      }
    }, function() {
      popupTip('系统错误！');
      setTimeout(function() {
        window.location.href = 'login.html';
      }, 2000);
    });
  };
  /* 用户名 */
  $('#userName').on('blur', userNameBlur = function() {
    var reg = /^1\d{10}$/;
    if($('#userName').val() === '') {
      popupTip('请输入手机号码！');
      return false;
    } else if(!reg.test($('#userName').val())) {
      popupTip('手机号码格式有误！');
      return false;
    } else {
      return true;
    }
  });
  /* 密码 */
  $('#userPwd').on('blur', userPwdBlur = function() {
    if($('#userPwd').val() === '') {
      popupTip('请输入密码！');
      return false;
    } else {
      return true;
    }
  });
  /* 登录 */
  $('#submit').on('tap', function() {
    if(userNameBlur() && userPwdBlur()) {
      userLogin({
        userName: $.trim($('#userName').val()),
        password: $.trim($('#userPwd').val())
      });
    }
  });
});