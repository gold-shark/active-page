$(function() {
  var d1 = $.Deferred();
  var d2 = $.Deferred();
  /* 进度 */
  var prog = 0;
  var imgs = [
    'open-page.png',
    'laevo.png',
    'clock.png',
    'bg.jpg',
    'book.png',
    'page.png',
    'music1.png',
    'cover.png',
    'music2.png',
    'pattern1.png',
    'head.png',
    'head1.png',
    'key.png',
    'head2.png',
    'shoe1.png',
    'shoe2.png',
    'seal.png',
    'handshake.png',
    'horn1.png',
    'horn2.png',
    'picture1.png',
    'picture2.png',
    'see-details.png',
    'winebottle.png',
    'cry1.png',
    'cry2.png',
    'cry3.png',
    'cry4.png',
    'cry5.png',
    'sun1.png',
    'sun2.png',
    'rice.png',
    'poached-egg.png',
    'basketball-court.png',
    'car.png',
    'person.png',
    'cloud1.png',
    'cloud.png',
    'logo.png',
    'text.png',
    'see-diary.png',
    'back-book.png',
    'see-down.png',
    'bg1.jpg',
    'music3.png',
    'flaunt.png',
    'keep-diary.png',
    'sign.png',
    'sign-in.png',
    'arrows.png',
    'finger.png',
    'share.png',
    'share.jpg',
    'close.png',
    'next-close.png'
  ];
  /* API接口前缀 */
  var apiPrefix = 'http://agent.qfang.com';
  /* eChart对象 */
  var myChart;
  var chartData = [60, 60, 60, 60, 60, 60];
  /* 获取配置项 */
  function getOptions(chartData) {
    return {
      radar: {
        indicator: [{
          name: '成交能力',
          max: 100
        }, {
          name: '接盘能力',
          max: 100
        }, {
          name: '维护能力',
          max: 100
        }, {
          name: '钥匙能力',
          max: 100
        }, {
          name: '实勘能力',
          max: 100
        }],
        center: ['50%', '50%'],
        splitNumber: 4,
        nameGap: 5,
        name: {
          textStyle: {
            color: '#3e2619',
            fontFamily: 'DFwawa-dospy'
          }
        },
        splitLine: {
          lineStyle: {
            color: [
              'rgba(62,38,25,0.2)',
              'rgba(62,38,25,0.4)',
              'rgba(62,38,25,0.6)',
              'rgba(62,38,25,0.8)',
              'rgba(62,38,25,1)'
            ].reverse()
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(62,38,25,0.2)'
          }
        },
        splitArea: {
          show: false
        }
      },
      series: [{
        type: 'radar',
        symbol: 'none',
        itemStyle: {
          normal: {
            color: '#f37a77'
          }
        },
        areaStyle: {
          normal: {
            opacity: 0.5
          }
        },
        data: [{
          value: chartData,
        }]
      }]
    }
  };
  /* 获取参数对象  */
  function getSearchData() {
    var jsonData;
    try {
      jsonData = JSON.parse(window.location.search.replace(/\?/g, '{"').replace(/\=/g, '":"').replace(/\&/g, '","') + '"}');
    } catch(e) {
      return {};
    }
    return jsonData;
  };
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
  /* 把数据渲染到页面上  */
  function showText(jsonData) {
    /* page one */
    $('#entryDate').text(jsonData.entryDateStr); //入职时间
    $('#firstCustomerDate').text(jsonData.firstCustomerDateStr); //第一个客户日期
    $('#newCustomerCount').text(jsonData.newCustomerCount); //客户总数
    /* page two */
    $('#leadCount').text(jsonData.leadCount); //带看次数
    $('#cusDealCount').text(jsonData.cusDealCount); //客户成交次数
    /* page three */
    $('#cooCount').text(jsonData.cooCount); //合作次数
    $('#cooDealCount').text(jsonData.cooDealCount); //合作成交次数
    /* page four */
    $('#firstHouseDate').text(jsonData.firstHouseDateStr); //第一个接盘日期
    /* page five */
    $('#moreThanPer').text(jsonData.moreThanPer + '%'); //已超越全国xx%的经纪人
    /* 成交能力 */
    $('#cusDealPointDesc').text(jsonData.cusDealPointDesc); //成交能力称号
    $('#cusDealPoint').text(jsonData.cusDealPoint); //成交能力分
    $('#cusDealCount1').text(jsonData.cusDealCount); //成交单数
    $('#avgCusDealDay').text(jsonData.avgCusDealDay); //客户平均成交时间
    if(jsonData.avgCusDealDay == 0) {
      $('#avgCusDealDay').closest('.items').hide();
    }
    /* 接盘能力 */
    $('#houseRecPointDesc').text(jsonData.houseRecPointDesc); //接盘能力称号
    $('#houseRecPoint').text(jsonData.houseRecPoint); //接盘能力分
    $('#receiveHouseCount').text(jsonData.receiveHouseCount); //接盘总数
    $('#avgDealDay').text(jsonData.avgDealDay); //平均成交时间
    $('#dealHouseCount').text(jsonData.dealHouseCount); //接盘成交单数
    /* 实勘能力 */
    $('#surveryPointDesc').text(jsonData.surveryPointDesc); //实勘能力称号
    $('#surveryPoint').text(jsonData.surveryPoint); //实勘能力分
    $('#surveryCount').text(jsonData.surveryCount); //实勘数量
    $('#surveryDealCount').text(jsonData.surveryDealCount); //实勘成交数量
    $('#surveryImageCount').text(jsonData.surveryImageCount); //实勘图片数量
    $('#surveryImageRatio').text(jsonData.surveryImageRatio); //实勘图片占总图片比例
    /* 维护能力 */
    $('#mainTainPoint').text(jsonData.mainTainPoint); //维护能力分
    $('#mainTainCount').text(jsonData.mainTainCount); //维护数
    $('#avgMainTainDay').text(jsonData.avgMainTainDay); //平均维护时间
    $('#mainTainDealCount').text(jsonData.mainTainDealCount); //维护成交次数
    $('#mainTainCancelCount').text(jsonData.mainTainCancelCount); //维护被动跳出数
    $('#mainTainGiveUpCount').text(jsonData.mainTainGiveUpCount); //维护主动动跳出数
    /* 钥匙能力 */
    $('#keyPointDesc').text(jsonData.keyPointDesc); //钥匙能力称号
    $('#keyPoint').text(jsonData.keyPoint); //钥匙能力分
    $('#keyCount').text(jsonData.keyCount); //钥匙数
    $('#keyDealCount').text(jsonData.keyDealCount); //钥匙成交次数
    /* page six */
    $('#houseInvalidCount').text(jsonData.houseInvalidCount); //盘源传无效次数
    $('#customerPublicCount').text(jsonData.customerPublicCount); //客户转公次数
    $('#customerPublicDealCount').text(jsonData.customerPublicDealCount); //客户转公后成交次数
    //$('#mainTainMissDealCount').text(jsonData.mainTainMissDealCount); //维护跳出成交次数
    $('#mainTainMissCount').text(jsonData.mainTainMissCount); //【维护跳出数（主动+被动）】个
    /* page seven */
    $('#firstDealDate').text(jsonData.firstDealDateStr); //第一次成交日期
    $('#bigDealGardenName').text(jsonData.bigDealGarden.name); //最大成交小区
    $('#bigDealDate').text(jsonData.bigDealDateStr); //最大成交时间
    /* page eight */
    $('#dealAreaSum').text(jsonData.dealAreaSum); //成交面积总数
    $('#dealValueSum').text(jsonData.dealValueSum); //成交价值数
    $('#dealAreaBas').text(jsonData.dealAreaBas); //成交面积总数换算篮球场
    $('#dealValueFer').text(jsonData.dealValueFer); //成交价值数换算法拉利
    $('#dialCount').text(jsonData.dialCount); //拨号次数
    $('#followCount').text(jsonData.followCount); //跟进次数
    //$('#loginCount').text(jsonData.loginCount); //登录次数
    /* page back-book */
    $('#personId').val(jsonData.person.id); //经纪人ID
    $('#personName').text(jsonData.person.name); //经纪人名字
    /* chart数据 */
    chartData = [
      jsonData.cusDealPoint,
      jsonData.houseRecPoint,
      jsonData.mainTainPoint,
      jsonData.keyPoint,
      jsonData.surveryPoint
    ];
  };
  /* 登录后获取数据 */
  function getMyDiaryData(sessionid) {
    $.ajax({
      type: 'post',
      url: apiPrefix + '/qfang-agent-api/api/mobile/diary/getMyDiary',
      dataType: 'json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('sessionId', sessionid);
      }
    }).then(function(json) {
      if(json && json.data && json.code === 1000) {
        showText(json.data);
        d2.resolve(true);
      } else if(json && json.code == 3002) {
        popupTip('仅限2017年01月01日以前入职的Q房网在职经纪人参与！');
        setTimeout(function() {
          window.location.href = 'login.html';
        }, 2000);
      } else {
        window.location.href = 'login.html';
      }
    }, function() {
      popupTip('系统错误！');
    });
  };
  /* 分享后获取数据  */
  function getDiaryData(personId) {
    $.ajax({
      type: 'post',
      url: apiPrefix + '/qfang-agent-api/api/mobile/diary/getDiary',
      dataType: 'json',
      data: {
        personId: personId
      }
    }).then(function(json) {
      if(json && json.data && json.code === 1000) {
        showText(json.data);
        d2.resolve(false);
      } else if(json &&
        json.code == 3002) {
        popupTip('仅限2017年01月01日以前入职的Q房网在职经纪人参与！');
        setTimeout(function() {
          window.location.href = 'login.html';
        }, 2000);
      } else {
        window.location.href = 'login.html';
      }
    }, function() {
      popupTip('系统错误！');
    });
  };
  /* 统计数据 */
  function statisticData(str) {
    $.ajax({
      type: 'post',
      url: apiPrefix + '/qfang-agent-api/api/mobile/diary/log/' + str,
      dataType: 'json'
    });
  };
  /* 每一页动画加载  */
  function addAnima(n) {
    statisticData('page' + n);
    $('.hide').removeClass('anima');
    $('.pages-body:eq(' + n + ')').find('.hide').addClass('anima');
    $('.pages-body:eq(' + n + ')').find('.hide').each(function(i, v) {
      $(this).addClass($(this).data('anima'));
    });
  };
  /* 图片加载进度  */
  function pictureLoading() {
    $('.progress').show();
    $.each(imgs, function(i, e) {
      var img = new Image();
      img.src = 'img/' + imgs[i];
      img.onload = function() {
        prog += 1 / imgs.length * 100;
        $('.prog').css({
          'width': prog + '%'
        });
        if(Math.round(prog) === 100) {
          d1.resolve();
          //$('.loading').hide();
        }
      };
    });
  }
  /* 加载页面 */
  var params = getSearchData();
  var sessionid = window.sessionStorage.getItem('sessionid');
  if(params.personId) {
    getDiaryData(params.personId);
    pictureLoading();
  } else if(sessionid) {
    getMyDiaryData(sessionid);
    pictureLoading();
  } else {
    //popupTip(params.appsessionid);
    if(typeof native === 'undefined') {
      if(params.appsessionid) {
        getMyDiaryData(params.appsessionid);
        pictureLoading();
      } else {
        window.location.href = 'login.html';
      }
    } else {
      var jsonData;
      try {
        jsonData = JSON.parse(native.getUserInfor());
      } catch(e) {
        window.location.href = 'login.html';
      }
      getMyDiaryData(jsonData.sessionid);
      pictureLoading();
    }
  };
  $.when(d1, d2).done(function(v1, v2) {
    $('.loading').hide();
    addAnima(0);
    if(v2) {
      $('#see-diary').hide();
      $('#flaunt').show();
      $('#keep-diary').show();
    } else {
      $('#see-diary').show();
      $('#flaunt').hide();
      $('#keep-diary').hide();
    }
  });
  /* 翻页 */
  $('.body').sliding({
    callback: function(n) {
      addAnima(n);
      if(n === 5 && !myChart) {
        myChart = echarts.init(document.getElementById('charts'));
        myChart.setOption(getOptions(chartData));
      }
    }
  });
  /* 查看详情 */
  $('#see-details').on('tap', function() {
    $('.popup-body').find('.content').hide().first().show();
    $('.popup-body').show();
    statisticData($(this).data('mark'));
  });
  /* 关闭弹窗 */
  $('.popup-body').find('.close').on('tap', function() {
    $('.popup-body').hide();
    //statisticData($(this).data('mark'));
  });
  /* 下一项能力 */
  $('.popup-body').find('.next').on('tap', function() {
    $(this).closest('.content').hide().next('.content').show();
    statisticData($(this).data('mark'));
  });
  /* 最后一项能力 */
  $('.popup-body').find('.next-close').on('tap', function() {
    $('.popup-body').hide();
    //statisticData($(this).data('mark'));
  });
  /* 查看我的日记 */
  $('#see-diary').on('tap', function() {
    window.location.href = 'login.html';
    statisticData($(this).data('mark'));
  });
  /* 向同事炫耀一下  */
  $('#flaunt').on('tap', function() {
    var $this = $(this);
    if(typeof native !== 'undefined') {
      var title = document.title;
      var content = '2016年你一定不知道！原来我在Q房网有这么耀眼的瞬间！快来围观我的Q房日记吧！';
      var link = apiPrefix + '/agent-management/mobile/my2016/index.html?personId=' + $('#personId').val();
      var pic = apiPrefix + '/agent-management/mobile/my2016/img/share.jpg';
      var callback = function(a, b) {
        statisticData($this.data('mark') + '|' + a + '|' + b);
      };
      native.shareDlg(title, content, link, pic, callback);
    } else {
      $('#share').show();
      statisticData($this.data('mark') + '|微信');
    }
  });
  /* 喊同事写日记 */
  $('#keep-diary').on('tap', function() {
    var $this = $(this);
    if(typeof native !== 'undefined') {
      var title = document.title;
      var content = '嘿！还记得2016年你在Q房网吹过的那些牛B吗？快来翻看属于你自己的Q房日记吧！';
      var link = apiPrefix + '/agent-management/mobile/my2016/login.html';
      var pic = apiPrefix + '/agent-management/mobile/my2016/img/share.jpg';
      var callback = function(a, b) {
        statisticData($this.data('mark') + '|' + a + '|' + b);
      };
      native.shareDlg(title, content, link, pic, callback);
    } else {
      $('#share').show();
      statisticData($this.data('mark') + '|微信');
    }
  });
  /* 关闭分享层 */
  $('#share').on('tap', function() {
    $(this).hide();
  });
});

/* music */
$(function() {
  var _audio = document.getElementById('music-audio')
  $('.music-but').find('a').on('tap', function() {
    if(_audio.paused) {
      $('.music-bg').attr('src', 'img/music2.png').addClass('bg');
      _audio.play();
    } else {
      $('.music-bg').attr('src', 'img/music3.png').removeClass('bg');
      _audio.pause();
    }
  });
});