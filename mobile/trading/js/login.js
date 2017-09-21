$(function() {
  $('#uname').on('blur', function() {
    verifyUserName($.trim($(this).val()))
  });
  $('#pwd').on('blur', function() {
    verifyPwd($.trim($(this).val()))
  });
  $('#submit').tap(function() {
    if (verifyUserName($.trim($('#uname').val())) && verifyPwd($.trim($('#pwd').val()))) {
      /*$.ajax({
        url: 'http://192.168.0.241:7879/qfang-tradeapi/login/toLogin',
        type: 'post',
        data: {
          'userName': $.trim($('#uname').val()),
          'password': $.md5($.trim($('#pwd').val())),
          'city': 'SHENZHEN'
        },
        dataType: 'json'
      }).then(function(jsonData) {
        if (jsonData.code === 'C0000') {
          $.cookie('u', $.trim($('#uname').val()));
          $.cookie('token', jsonData.data.token);
          window.location.href = 'list.html';
        } else {
          errorInfoHint(jsonData.msg);
        }
      });*/
      window.location.href = 'list.html';
    }
  });

  function verifyUserName(userName) {
    var reg = /^\d{11}$/;
    if (userName == '') {
      errorInfoHint('用户名不能为空！')
      return false;
    } else if (!reg.test(userName)) {
      errorInfoHint('用户名格式不正确！')
      return false;
    } else {
      return true;
    }
  }

  function verifyPwd(pwd) {
    var reg = /^\w{6,}$/;
    if (pwd == '') {
      errorInfoHint('密码不能为空！')
      return false;
    } else if (!reg.test(pwd)) {
      errorInfoHint('密码长度不少于6位！')
      return false;
    } else {
      return true;
    }
  }

  function errorInfoHint(str) {
    $('body').append('<section class="error-info-hint box-align"><p>' + str + '</p></section>');
    setTimeout(function() {
      $('.error-info-hint').remove();
    }, 1000);
  }
});