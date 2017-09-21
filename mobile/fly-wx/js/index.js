function wx_get_token() {
    $token = S('access_token');
    if (!$token) {
        $res = file_get_contents('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx6d7ea42348e0a28d&secret=2ef91f7429f4fc0d7abf2e2cc9428db1');
        $res = json_decode($res, true);
        $token = $res['access_token'];
        S('access_token', $token, 3600);
    }
    return $token;
}
{"access_token":"ACCESS_TOKEN","expires_in":7200}
{"access_token":"vdlThyTfyB0N5eMoi3n_aMFMKPuwkE0MgyGf_0h0fpzL8p_hsdUX8VGxz5oSXuq5dM69lxP9wBwN9Yzg-0kVHY33BykRC0YXZZZ-WdxEic4","expires_in":7200}

function wx_get_jsapi_ticket(){
    $ticket = "";
    do{
        $ticket = S('wx_ticket');
        if (!empty($ticket)) {
            break;
        }
        $token = S('access_token');
        if (empty($token)){
            wx_get_token();
        }
        $token = S('access_token');
        if (empty($token)) {
            logErr("get access token error.");
            break;
        }
        $url2 = sprintf("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi",
            $token);
        $res = file_get_contents($url2);
        $res = json_decode($res, true);
        $ticket = $res['ticket'];
        S('wx_ticket', $ticket, 3600);
    }while(0);
    return $ticket;
}


{"errcode":0,"errmsg":"ok","ticket":"sM4AOVdWfPE4DxkXGEs8VMKv7FMCPm-I98-klC6SO3Q3AwzxqljYWtzTCxIH9hDOXZCo9cgfHI6kwbe_YWtOQg","expires_in":7200}



$timestamp = time();
$wxnonceStr = "http://www.qfang.com";
$wxticket = wx_get_jsapi_ticket();
$wxOri = sprintf("jsapi_ticket=%s&noncestr=%s&tamp=%s&url=%s",$wxticket, $wxnonceStr, $timestamp,'http://www.qfang.com');
$wxSha1 = sha1($wxOri);

