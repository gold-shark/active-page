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
				"featureType":"land","elementType":"all","stylers":{"color":"#243551"}
			},{
				"featureType":"water","elementType":"all","stylers":{"color":"#000000"}
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
		    dataRange: {
		        min : 0,
		        max : 300,
		        calculable : true,
		      	show: false,
		        color: ['red','orange','yellow','green']
		    },
		    series : [{
	            name: '经纪人',
	            type: 'map',
	            mapType: 'none',
	            hoverable: false,
	            roam:true,
	            data : [],
            	markPoint : {
                	symbolSize: 5, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                	itemStyle: {
                    	normal: {
                        	borderColor: '#1e90ff',
                        	borderWidth: 0,            // 标注边线线宽，单位px，默认为1
                        	label: {show: false}
                    	},
                    	emphasis: {
                        	borderColor: '#1e90ff',
                        	borderWidth: 5,
                        	label: {show: false}
                    	}
                	},
                	data : datajson
            	},
            	geoCoord: coordjson
        	}, {
            	name: 'Top5',
            	type: 'map',
            	mapType: 'none',
            	data:[],
            	markPoint : {
                	symbol:'emptyCircle',
                	symbolSize : function (v){
                    	return 10 + v/100
                	},
                	effect : {
	                    show: true,
	                    shadowBlur : 0
	                },
                	itemStyle:{
                    	normal:{
                        	label:{show:false}
                    	}
                	},
	                data : showdatajson
            	}
        	}
    	]};                   
        var myChart = BMapExt.initECharts(container);
        BMapExt.setOption(option);
    }
);
})();