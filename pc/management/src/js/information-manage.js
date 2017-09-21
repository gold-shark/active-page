$(function() {
  /* 富文本编辑器  */
  if ($('#edit-content').length) {
    KindEditor.ready(function(K) { editor = K.create('#edit-content'); });
  }

  /* 日期选择  */
  if ($('#creterStratTime').length && $('#creterEndTime').length) {
    var creterStratTime = {
      elem : '#creterStratTime',
      format : 'YYYY-MM-DD',
      min : laydate.now(), //设定最小日期为当前日期
      max : '2099-06-16',  //最大日期
      choose : function(datas) {
        creterEndTime.min = datas; //开始日选好后，重置结束日的最小日期
        creterEndTime.start = datas //将结束日的初始值设定为开始日
      }
    };
    var creterEndTime = {
      elem : '#creterEndTime',
      format : 'YYYY-MM-DD',
      min : laydate.now(),
      max : '2099-06-16',
      choose : function(datas) {
        creterStratTime.max = datas; //结束日选好后，重置开始日的最大日期
      }
    };
    laydate(creterStratTime);
    laydate(creterEndTime);
  }
  if ($('#releaseStratTime').length && $('#releaseEndTime').length) {
    var releaseStratTime = {
      elem : '#releaseStratTime',
      format : 'YYYY-MM-DD',
      min : laydate.now(), //设定最小日期为当前日期
      max : '2099-06-16',  //最大日期
      choose : function(datas) {
        releaseEndTime.min = datas; //开始日选好后，重置结束日的最小日期
        releaseEndTime.start = datas //将结束日的初始值设定为开始日
      }
    };
    var releaseEndTime = {
      elem : '#releaseEndTime',
      format : 'YYYY-MM-DD',
      min : laydate.now(),
      max : '2099-06-16',
      choose : function(datas) {
        releaseStratTime.max = datas; //结束日选好后，重置开始日的最大日期
      }
    };
    laydate(releaseStratTime);
    laydate(releaseEndTime);
  }
  if ($('#issued-date').length) {
    laydate({
      elem : '#issued-date',
      format : 'YYYY-MM-DD hh:mm:ss',
      istime : true,
    });
  }

  /* 添加要闻弹窗   */
  $('#add-important').on('click', function() { openArticle(1); });

  /* 添加导购弹窗   */
  $('#add-shoppers').on('click', function() { openArticle(2); });

  /* 添加百科弹窗   */
  $('#add-encyclopaedia').on('click', function() { openArticle(3); });

  /* 全选 -国家  */
  $('#all-countries')
      .on('click', function() {
        if ($(this).prop('checked')) {
          $(this).parent().next().find('.checkbox').prop('checked', true);
        } else {
          $(this).parent().next().find('.checkbox').prop('checked', false);
        }
      });

  var index = window.top.layer.getFrameIndex(window.name); //获取窗口索引
  var regChar = /^[\u4e00-\u9fa5\sa-zA-Z0-9]+$/; //中文、英文、数字、空格
  /* 确定-添加文章 */
  $('#ok-article')
      .on('click', function() {
        var articleTitle = $.trim($('#article-title').val());
        var issuedDate = $.trim($('#issued-date').val());
        var countries = '';
        var source = $.trim($('#source').val());
        var picture = '';
        var articleIntroduction = $.trim($('#article-introduction').val());
        var editContent = $.trim(editor.html());
        $('#countries-items .checkbox')
            .each(function() {
              if ($(this).prop('checked')) {
                countries += $(this).val() + ',';
              }
            });
        countries = countries.substr(0, countries.length - 1);
        if ($('#article-picture').attr('src') !== '../img/2.jpg') {
          picture = $('#article-picture').attr('src');
        }
        if (articleTitle === '') {
          errorTips('请输入标题！', '#article-title');
        } else if (articleTitle.length > 40) {
          errorTips('字数超出了40个字符!', '#article-title');
        } else if (countries === '') {
          errorTips('只少选择一个国家!', '#all-countries');
        } else if (source === '') {
          errorTips('请输入文章来源!', '#source');
        } else if (!regChar.test(source)) {
          errorTips('只允许输入中英文、数字及空格！', '#source');
        } else if (source.length > 30) {
          errorTips('字数超出了30个字符!', '#source');
        } else if (picture === '') {
          errorTips('请上传图片!', '#article-picture');
        } else if (articleIntroduction === '') {
          errorTips('请输入文章导语!', '#article-introduction');
        } else if (articleIntroduction.length > 100) {
          errorTips('字数超出了100个字符!', '#article-introduction');
        } else if (editContent === '') {
          errorTips('请输入编辑内容!', '.ke-container');
        } else {
          // 数据处理代码{}
          refreshIframe();
          window.top.layer.close(index);
        }
      });

  /* 取消-事件  */
  $('#cancel').on('click', function() { window.top.layer.close(index); });

  /* 打开-添加文章弹窗 */
  function openArticle(typeId) {
    window.top.layer.open({
      type : 2,
      title : '添加文章',
      shadeClose : true,
      shade : 0.5,
      area : [ '900px', '90%' ],
      content : 'information-manage/insert-article.html?typeId=' + typeId
    });
  }

  /* 刷新-当前iframe页面  */
  function refreshIframe() {
    var currentIframe = window.top.$('.iframe-items.show > iframe');
    currentIframe[0].contentWindow.location.reload(true);
  }

  /* tips提示 - 错误  */
  function errorTips(content, strId) {
    layer.tips(content, strId, {tips : [ 1, '#e00' ]});
    $(strId).focus();
  }
});
