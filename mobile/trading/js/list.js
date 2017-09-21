$(function() {
  $.ajax({
    url: 'http://192.168.0.242:7879/qfang-tradeapi/trade/searchList',
    type: 'post',
    data: {
      pageSize: 10,
      currentPage: -1
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader('u', $.cookie('u'));
      xhr.setRequestHeader('token', $.cookie('token'));
    },
    success: function(jsonData) {
      if (jsonData.code === 'C0000') {
        $.each(jsonData.data.items, function(i, v) {
          console.log(v)
          $('.article-body').append(returnHtml(v));
        });
      } else {
        $('.article-body').append(jsonData.msg)
      }
    },
    error: function(err) {
      console.log(err);
    }
  });

  function returnHtml(data) {
    var _html = '<div class="list-items">';
    _html += '<a href="javascript:void(' + data.id + ');">';
    _html += '<h3 class="box-middel ellips">' + data.tenement + '</h3>';
    _html += '<p class="box-middel">';
    _html += '<label>成交价/面积：</label>';
    _html += '<span class="flex">' + data.totalPrice + '元/' + data.buildArea + '平米</span>';
    _html += '<span class="' + (data.status === '已完成' ? 'complete' : 'dealt') + '">' + data.status + '</span>';
    _html += '</p>';
    _html += '<p class="box-middel">';
    _html += '<label>客户：</label>';
    _html += '<span class="flex">' + data.custname + '</span>';
    _html += '<span class="orange">' + data.transferState + '</span>';
    _html += '</p>';
    _html += '<p class="box-middel">';
    _html += '<label>业主：</label>';
    _html += '<span class="flex">' + data.owername + '</span>';
    _html += '</p>';
    _html += '<p class="box-middel">';
    _html += '<label>过户步骤：</label>';
    _html += data.status === '已完成' ? '<span class="flex">已完成</span>' : '<span class="red flex">' + data.step + '(' + data.handle + '天)</span>';
    _html += '</p>';
    _html += '</a>';
    _html += '</div>';
    return _html;
  }
});