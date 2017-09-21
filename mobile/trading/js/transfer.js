$(function() {
  $.ajax({
    url: 'http://192.168.0.242:7879/qfang-tradeapi/trade/transferInfo',
    type: 'post',
    data: {
      'Id': 1
    },
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('u', $.cookie('u'));
      xhr.setRequestHeader('token', $.cookie('token'));
    },
    success: function(jsonData) {
      console.log(jsonData.data);
    }
  }).then(function(jsonData) {

  });
});