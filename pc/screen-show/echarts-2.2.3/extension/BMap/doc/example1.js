(function () {
    require.config({
        paths: {
            echarts: 'echarts-2.2.3/doc/example/www/js'
        },
        packages: [
            {
                name: 'BMap',
                location: 'echarts-2.2.3/extension/BMap/src',
                main: 'main'
            }
        ]
    });
    require(
    [
        'echarts',
        'BMap',
        'echarts/chart/map'
    ],
    function (echarts, BMapExtension) {
        $('#main').css({
            height:$('body').height(),
            width: $('body').width()
        });        
        var myStyleJson = [{
				"featureType":"land","elementType":"all","stylers":{"color":"#1b1b1b"}
			},{
				"featureType":"water","elementType":"all","stylers":{"color":"#243551"}
			},{
				"featureType":"label","elementType":"labels","stylers":{"visibility":"off"}
			},{
				"featureType":"boundary","elementType":"all","stylers":{"color":"#47638a"}
			},{
				"featureType":"road","elementType":"all","stylers":{"visibility":"off"}
			},{
				"featureType":"poi","elementType":"all","stylers":{"visibility":"off"}
			}];

        // 初始化地图
        var BMapExt = new BMapExtension($('#main')[0], BMap, echarts,{
            enableMapClick: false
        });
        var map = BMapExt.getMap();
        var container = BMapExt.getEchartsContainer();

        var startPoint = {
            x: 100.114129,
            y: 34.550339
        };
        var point = new BMap.Point(startPoint.x, startPoint.y);
        map.centerAndZoom(point, 6);
        map.enableScrollWheelZoom(true);
        // 地图自定义样式
        map.setMapStyle({ styleJson: myStyleJson });
        option = {
		    color: [ 
		    	'rgba(37, 140, 249, 0.8)',
		    	'rgba(14, 241, 242, 0.8)',
		        'rgba(255, 255, 255, 0.8)'
		    ],
		    legend: {
		        orient: 'vertical',
		        x:'left',
		        data:['强','中','弱'],
		        show: false,
		        min: 0,
		        max: 2
		    },
		    series : [{
	            name: '弱',
	            type: 'map',
	            mapType: 'none',
	            itemStyle:{
	                normal:{
	                    borderColor:'rgba(100,149,237,1)',
	                    borderWidth:1.5,
	                    areaStyle:{
	                        color: '#1b1b1b'
	                    }
	                }
	            },
	            data : [],
	            markPoint : {
	                symbolSize: 2,
	                large: true,
	                effect : {
	                    show: true
	                },
	                data : [
		                {name: "海门", value: 0}
                    ]
	            },
	            geoCoord: {
	            	"海门":[121.15,31.89]
                }
		   },{
		      	name: '中',
		        type: 'map',
	            mapType: 'none',
	            data : [],
	            markPoint : {
	                symbolSize: 3,
	                large: true,
	                effect : {
	                    show: true
	                },
	                data : (function(){
	                    var data = [];
	                    var len = 100;
	                    var geoCoord
	                    while(len--) {
	                        data.push({
	                            name : "鄂尔多斯" + len,
	                            value : 1
	                        })
	                    }
	                    return data;
	                })()
	            },
	            geoCoord: (function(){
	                var data = "{";
	                var len = 100;
	                var geoCoord
	                while(len--) {
	                    data += "'鄂尔多斯" + len + "':" + "[" + (109.781327 + Math.random() * 5 * -1) + "," + (39.608266 + Math.random() * 3 * -1) +"],";
	                }
	                data = data.substr(0,data.length -1) + "}";
	                function stringToJson(stringValue) { 
						eval("var theJsonValue = "+ stringValue); 
						return theJsonValue; 
					}
	                return stringToJson(data);
	            })()
		    }, {
	            name: '强',
	            type: 'map',
	            mapType: 'none',
	            hoverable: false,
	            roam:true,
	            data : [],
	            markPoint : {
	                symbol : 'diamond',
	                symbolSize: 6,
	                large: true,
	                effect : {
	                    show: true
	                },
	                data : [
	                    {name: "招远", value: 2},
	                    {name: "舟山", value: 2}
                    ]
	            },
	            geoCoord: {
	                "招远":[120.38,37.35],
	                "舟山":[122.207216,29.985295]
                }
		    }]
		};                 
        var myChart = BMapExt.initECharts(container);
        BMapExt.setOption(option);
    }
);
})();