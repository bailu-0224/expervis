var tableInit = 0;
var init = 0;
var chooseFly = 0;
var comDistance = 0;

var indexindex = 1;
var choosemode = 0;

var points = [];
for(let i=0;i<10;i++)
    points[i]=new THREE.Vector3(0,50,20+i*10);
var tArray=new Array(flyIndictor);
for(var k=0;k<flyIndictor;k++)
    tArray[k]=new Array(flyIndictor);
for(var i=0;i<flyIndictor;i++)
    for(var k=0;k<flyIndictor;k++)
        tArray[i][k]=0;

//初始化图表
function initChart() {
    flyChart = echarts.init(document.getElementById('flyechart'));
    flockChart_1 = echarts.init(document.getElementById('flockChart_1'));
    flockChart_2 = echarts.init(document.getElementById('flockChart_2'));
    flockChart_3 = echarts.init(document.getElementById('flockChart_3'));
    rippleChart_1 = echarts.init(document.getElementById('ripple_1'));
    rippleChart_2 = echarts.init(document.getElementById('ripple_2'));
    barChart = echarts.init(document.getElementById('bar'));
    areaChart = echarts.init(document.getElementById('line'));
    doubleBarchart = echarts.init(document.getElementById('unit_2'));
    radarChart = echarts.init(document.getElementById('unit_3'));

    //flocking初始化
    var flockOption = ({
        title: {
            left: 5,
            top: 5,
            textStyle: {
                fontWeight: 'normal',
                fontSize: 15,
                color: '#fff'
            }
        },
        //调整表格的位置
        grid: {
            top: '28%',
            left: '15%',
            right: '10%',
            bottom: '10%',
        },
        xAxis: {
            type: 'category',
            show: true,
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#8087e2',
                },
            },
            axisLabel: {
                formatter: function () {
                    return "";
                }
            },
            axisTick: {
                show: false,
            },
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '50%'],
            axisLine: {
                lineStyle: {
                    color: '#8087e2',
                },
            },
            splitLine: {
                show: 'true',
                lineStyle: {
                    width: 0.05,
                    color: '#BFBFBF',
                    type: 'dotted',
                },
            },
        },
        series: [{
            color: '#60acfc',
            top: 1,
            data: 0,
            type: 'line',
            lineStyle: {
                normal: {
                    color: '#fdb851',
                },
            },
        }]
    });
    flockChart_1.setOption(flockOption);
    flockChart_2.setOption(flockOption);
    flockChart_3.setOption(flockOption);


    //飞机初始化
    //comFlag初始化
    for (var i = 0; i < flyIndictor; i++) {
        for (var j = 0; j < flyIndictor; j++) {
            compareFlag[i][j] = -1;
        }
    }
    // timeFlag初始化
    for (var i = 0; i < flyIndictor; i++) {
        for (var j = 0; j < flyIndictor; j++) {
            timeFlag[i][j] = 0;
        }
    }
    //missFlag初始化
    for (var i = 0; i < flyIndictor; i++) {
        for (var j = 0; j < flyIndictor; j++) {
            missFlag[i][j] = 0;
        }
    }
    //节点初始化
    for (var i = 0; i < flyIndictor; i++) {
        if (i == 0) {
            var node = {
                name: "0",
                value: [0, 0],
                symbol: "image://" + "images/blueFly.png",
                symbolSize: 15,
            };
        } else {
            var node = {
                name: i,
                value: [0, 0],
                symbol: "image://" + "images/blueFly.png",
                symbolSize: 15,
            };
        }
        nodes.push(node);
    }

    //受欺骗节点添加
    for (var i = flyIndictor; i < flyIndictor + spoofNum; i++) {
        var node = {
            name: i,
            value: [0, 0],
            symbol: "",
            symbolSize: 15,

        }
        nodes.push(node);
    }


    //障碍物添加

    //exper_1
    if (experFlag == 1) {
        blockFill_exper1(8, 5, 25, 32);
        blockFill_exper1(1, 7, 40, 60);
        blockFill_exper1(3, 1, 54, 60);
        blockFill_exper1(6, 1, 49, 20);
    } else if (experFlag == 3) {
        //exper_2
        blockFill_2_5(4, 4, 45, 45); //中
        blockFill_2_5(2, 4, 0, 47.5);  //左
        blockFill_2_5(2, 8, 25, 47.5);
        blockFill_2_5(4, 2, 47.5, 90); //上
        blockFill_2_5(8, 2, 47.5, 55); //上
        blockFill_2_5(2, 4, 90, 47.5) // 右
        blockFill_2_5(2, 8, 55, 47.5)  //
        blockFill_2_5(4, 2, 47.5, 0)  //下
        blockFill_2_5(8, 2, 47.5, 25)  //
    } else if (experFlag == 5) {
        // exper_3
        blockFill_2_5(4, 8, 5, 65);
        blockFill_2_5(8, 2, 25, 55);
        blockFill_2_5(4, 8, 35, 75);
        blockFill_2_5(8, 2, 55, 75);
        blockFill_2_5(8, 2, 55, 75);
        blockFill_2_5(8, 2, 35, 35);
        blockFill_2_5(2, 8, 40, 35);
        blockFill_2_5(8, 2, 65, 15);
        blockFill_2_5(2, 8, 70, 15);
    }


    flyOption = {
        grid: {
            left: 5,
            top: 10,
            bottom: 5,
            right: 10,
            containLabel: true,
        },
        xAxis: {
            type: 'value',
            // max: showBorder[experFlag],
            max: 80,
            splitNumber: 10,
            axisLine: {
                lineStyle: {
                    color: '#8087e2',
                },
            },
            splitLine: {
                show: 'true',
                lineStyle: {
                    width: 0.05,
                    color: '#BFBFBF',
                    type: 'dotted',
                },
            },
        },
        yAxis: {
            type: 'value',
            // max: showBorder[experFlag],
            max: 80,
            splitNumber: 10,
            axisLine: {
                lineStyle: {
                    color: '#8087e2',
                },
            },
            splitLine: {
                show: 'true',
                lineStyle: {
                    width: 0.05,
                    color: '#BFBFBF',
                    type: 'dotted',
                },
            },
        },
        toolbox: {
            feature: {
                dataZoom: {}
            }
        },
        series: [
            {
                type: 'graph',
                layout: 'none',
                coordinateSystem: 'cartesian2d',
                label: {
                    show: true,
                    textStyle: {
                        fontSize: 14,
                        fontWeight: "normal",
                        color: "#FFFF00"
                    }
                },
                lineStyle: {
                    // color: "green",
                    color: "#336633",
                    opacity: 0.9,
                    width: 0.5,
                    curveness: 0
                }
            }, {
                type: 'graph',
                layout: 'none',
                coordinateSystem: 'cartesian2d',
                hoverAnimation: false, //鼠标悬浮是否有区域弹出动画，false:无  true:有
                lineStyle: {
                    color: "green",
                    // color: "#336633",
                    opacity: 0.9,
                    width: 0.5,
                    curveness: 0
                },
                data: blockNodes,
            },
        ]
    };
    flyChart.setOption(flyOption);

    //个体双向bar图初始化
    var legendData = ['发包数', '收包数']; //图列
    var ydata = ["0", '1', '2', '3', '4'];
    var doubleBaroption = {
        title: {
            text: "帧数",
            left: "center",
            top: -2,
            textStyle: {
                fontWeight: 'normal',
                fontSize: 10,
                color: '#fff'
            }
        },
        legend: {
            data: legendData,
            align: 'right',
            x: 'center',
            y: 'bottom',
            textStyle: {
                color: '#fff',
                fontSize: 10,
            },
            width: 210,
            height: 6,
        },
        grid: [{
            x: '55%',
            y: '12%',
            width: '40%',
            height: '55%'
        },

        {
            x: '5%',
            y2: '32%',
            width: '40%',
            height: '55%'
        },
        ],
        xAxis: [{
            gridIndex: 0,
            //  min: 0,
            max: 10,
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#8087e2',
                    width: 0.5,
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0)'
                    // color:'65F5FD'
                }
            },
            axisLabel: {
                formatter: '{value}',
                color: '#fff',
                fontSize: 8
            },
        },
        {
            gridIndex: 1,
            //  min: 0,
            max: 10,
            inverse: true,
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#8087e2',
                    width: 0.5
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0)'
                    // color: '65F5FD'
                }
            },
            axisLabel: {
                // formatter: '{value}',
                color: '#fff',
                fontSize: 8
            },
        },
        ],
        yAxis: [{
            gridIndex: 0,
            data: ydata,
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 8,
                    color: '#fff'
                }
            },
        },
        {
            gridIndex: 1,
            data: ydata,
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
        },
        ],
        series: [{
            name: legendData[1],
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            // data: doubleBarData[0],
            itemStyle: {
                normal: {
                    color: '#ffa800',
                    barBorderRadius: [5, 5, 5, 5]
                },
                emphasis: {
                    barBorderRadius: [5, 5, 5, 5]
                },
            },
            barWidth: 5,
            Radius: [10, 10, 0, 0],
            label: {
                normal: {
                    show: false,
                    position: 'top'
                }
            },
        },
        {
            name: legendData[0],
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            // data: doubleBarData[1],
            itemStyle: {
                normal: {
                    color: '#1ace4a',
                    barBorderRadius: [5, 5, 5, 5]
                },
                emphasis: {
                    barBorderRadius: [5, 5, 5, 5]
                },
            },
            barWidth: 5,
            label: {
                normal: {
                    show: false,
                    position: 'bottom'
                }
            },
        },
        ]
    };
    doubleBarchart.setOption(doubleBaroption);


    // 雷达图
    var radarnode = [{
        name: "",
        value: [15, 15],
        symbol: "image://" + "images/circleSpoof.png",
        symbolSize: 12,
    }, {
        name: "1",
        value: [15, 30],
        symbol: "image://" + "images/circle.png",
        symbolSize: 12,
    }, {
        name: "2",
        value: [15, 0],
        symbol: "image://" + "images/circle.png",
        symbolSize: 12,
    }, {
        name: "3",
        value: [0, 15],
        symbol: "image://" + "images/circle.png",
        symbolSize: 12,
    }, {
        name: "4",
        value: [30, 15],
        symbol: "image://" + "images/circle.png",
        symbolSize: 12,
    }];
    for (var i = 0; i < 5; i++) {
        radarNodes.push(radarnode[i]);
    }

    initRadar();

    function initRadar() {
        var indicator = [];
        for (var i = 0; i < 360; i++) {
            indicator.push({
                text: "",
                max: 20,
            });
        };
        var radarOption = {
            legend: [{
                z: 999,
                data: [{
                    name: '当前无人机',
                    icon: "image://" + "images/circleSpoof.png",
                    textStyle: {
                        color: '#fff',
                        fontSize: 10,
                    }
                }, {
                    name: '通信范围无人机',
                    icon: "image://" + "images/circle.png",
                    textStyle: {
                        color: '#fff',
                        fontSize: 10,
                    }
                }],
                padding: 5,
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 60,
                selectedMode: false,
                orient: "horizontal",
                icon: 'circle',
                x: 'left',
                y: 'bottom',
                textStyle: {
                    color: '#fff',
                    fontSize: 10,
                    padding: -4,
                },
            }],
            grid: {
                left: 12,
                right: 55,
                top: 10,
                bottom: -10,
                containLabel: true,
            },
            xAxis: {
                show: false,
                type: 'value',
                max: comDistance * 2,
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        color: '#8087e2',
                    },
                    show: false,
                },
                splitLine: {
                    show: 'true',
                    lineStyle: {
                        width: 0.05,
                        color: '#BFBFBF',
                        type: 'dotted',
                    },
                },
            },
            yAxis: {
                show: false,
                type: 'value',
                max: comDistance * 2,
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        color: '#8087e2',
                    },
                    show: false,
                },
                splitLine: {
                    show: 'true',
                    lineStyle: {
                        width: 0.05,
                        color: '#BFBFBF',
                        type: 'dotted',
                    },
                },
            },
            radar: [
                {
                    indicator: indicator,
                    center: ['45%', '50%'],
                    radius: 60,
                    startAngle: 90,
                    splitNumber: 6,
                    shape: 'circle',
                    splitArea: {
                        areaStyle: {
                            color: 'rgba(255, 255, 255, 0)'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 255, 51, 0)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(0, 255, 51, 1)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '当前无人机',
                    type: 'radar',
                    symbol: 'circle',
                }, {
                    name: "通信范围无人机",
                    type: 'graph',
                    layout: 'none',
                    coordinateSystem: 'cartesian2d',
                    label: {
                        show: true,
                        textStyle: {
                            fontSize: 10,
                            fontWeight: "normal",
                            color: "#FFFF00"
                            // color: "#F7DC6F"
                        }
                    },
                    data: radarNodes
                }
            ]
        };
        radarChart.setOption(radarOption);
        // radarNodes = [];
    }

    //ripple水滴图初始化
    rippleData_1.push(rippleValue_1);
    rippleData_1.push(rippleValue_1);
    rippleData_1.push(rippleValue_1);
    rippleData_1.push(rippleValue_1);
    rippleData_1.push(rippleValue_1);
    var rippleOption_1 = {
        title: {
            text: '瞬时丢包率(%)',
            left: 1,
            top: 5,
            textStyle: {
                fontWeight: 'normal',
                fontSize: 15,
                // color: 'rgb(97, 142, 205)'
                // color: '#60acfc',
                color: '#fff'
            }
        },

        series: [{
            type: 'liquidFill',
            radius: '80%',
            data: rippleData_1,
            backgroundStyle: {
                borderWidth: 5,
                borderColor: 'rgb(255,0,255,0.9)',
                color: 'rgb(255,0,255,0.01)'
                // color: 'rgb(96,172,252,0.01)'
            },
            label: {
                normal: {
                    formatter: (rippleValue_1 * 100).toFixed(2) + '%',
                    color: '#60acfc',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 20,
                    }
                }
            }
        }]
    }
    rippleChart_1.setOption(rippleOption_1);

    rippleData_2.push(rippleValue_2);
    rippleData_2.push(rippleValue_2);
    rippleData_2.push(rippleValue_2);
    rippleData_2.push(rippleValue_2);
    rippleData_2.push(rippleValue_2);
    var rippleOption_2 = {
        title: {
            text: '平均丢包率(%)',
            left: 1,
            top: 5,
            textStyle: {
                fontWeight: 'normal',
                fontSize: 15,
                color: '#fff'
            }
        },

        series: [{
            grid: {
                left: '5%',
                top: '5%',
                right: '10%',
                bottom: '5%',
            },
            type: 'liquidFill_1',
            radius: '80%',
            data: rippleData_2,
            backgroundStyle: {
                borderWidth: 5,
                borderColor: 'green',
                color: 'rgb(255,0,255,0.01)'
            },
            label: {
                normal: {
                    formatter: (rippleValue_2 * 100).toFixed(2) + '%',
                    color: 'pink',
                    textStyle: {
                        fontWeight: 'norma  l',
                        fontSize: 20,
                    }
                }
            }
        }]
    }
    rippleChart_2.setOption(rippleOption_2);

    //bar条目图初始化
    var barOption = {
        title: {
            text: '延迟(s)',
            textStyle: {
                fontWeight: 'normal',
                color: '#ffff',
                fontSize: 15,
            },
            left: 5,
            top: 5,
        },
        tooltip: {
            show: true,
            formatter: "{b}:{c}"
        },

        grid: {
            left: '5%',
            top: '5%',
            right: '10%',
            bottom: '5%',
            containLabel: true
        },

        xAxis: {
            min: 0,
            max: 1,
            type: 'value',
            show: false,
            position: 'top',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#fff',
                }
            },
            splitLine: {
                show: false
            },
        },

        yAxis: [{
            type: 'category',
            axisTick: {
                show: false,
                alignWithLabel: false,
                length: 5,

            },
            "splitLine": { //网格线
                "show": false
            },
            inverse: true, //排序
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#fff',
                }
            },
            data: ['avg', '0-0', '0-0', '0-0', '0-0']
        }

        ],

        series: [
            //背景色，灰条
            {
                show: true,
                type: 'bar',
                barGap: '-100%',
                barWidth: '35%',
                itemStyle: {
                    normal: {
                        color: 'rgba(102, 102, 102,0.5)'
                    },
                },
                z: 1,
                data: grayBar,
            }, {
                show: true,
                color: '#1ace4a',
                type: 'bar',
                barGap: '-100%',
                barWidth: '35%',
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{c}',
                        textStyle: {
                            color: 'white' //color of value
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        show: true,
                        color: function (params) {
                            return {
                                type: 'linear',
                                colorStops: [{
                                    offset: 0,
                                    color: colorArray[params.dataIndex],
                                }],
                            }
                        },
                        barBorderRadius: 70,
                        borderWidth: 0,
                        borderColor: '#333',
                    }
                },
                z: 2,
                data: barData,
            }
        ]
    };
    barChart.setOption(barOption);

    //area面积图初始化
    var areaOption = ({
        title: {
            text: '吞吐量(bit/s)',
            left: 5,
            top: 5,
            textStyle: {
                fontWeight: 'normal',
                fontSize: 15,
                // color: '#60acfc',
                color: '#fff'
            }
        },
        //调整表格的位置
        grid: {
            top: '25%',
            left: '20%',
            right: '10%',
            bottom: '10%',
        },
        xAxis: {
            type: 'category',
            show: true,
            axisLabel: {
                formatter: function () {
                    return "";
                }
            },
            axisTick: {
                show: false,
            },
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#8087e2',
                },
            },

        },
        yAxis: {
            type: 'value',
            // boundaryGap: [0, '50%'],
            max: 6000,
            axisLine: {
                lineStyle: {
                    color: '#8087e2',
                },
            },
            splitLine: {
                show: 'true',
                lineStyle: {
                    width: 0.05,
                    color: '#BFBFBF',
                    type: 'dotted',
                },
            },
        },
        series: [{
            color: '#60acfc',
            top: 1,
            data: areaData,
            type: 'line',
            lineStyle: {
                normal: {
                    // color: '#fdb851',
                    color: '#60acfc',
                },
            },
            areaStyle: {},
            smooth: true,
        }]
    });
    areaChart.setOption(areaOption);
}



//刷新图表
function setOptions(name, x, y, target, isAttack, netLostPackage, totalLostPackage, netThrough, delayLable, delayData, avgDelay, flockData_1, flockData_2, flockData_3, isCollision, send, recv, table) {

    //flock刷新
    flockAddData_1(true, flockData_1);
    flockStep_1();
    flockAddData_2(true, flockData_2);
    flockStep_2();
    flockAddData_3(true, flockData_3);
    flockStep_3();

    fly3dStep(name, x, y,target,isAttack,isCollision);

    //飞机图
    flyStep(name, x, y, target, isAttack, isCollision);

    //双向bar图
    doubleBarStep(send, recv);

    //水滴图
    rippleStep_1(netLostPackage);
    rippleStep_2(totalLostPackage);

    //表格更新
    updateTable(table);

    //bar图
    barStep(delayData, delayLable, avgDelay);

    //面积图刷新
    areaAddData(true, netThrough);
    areaStep();

    //雷达图
    radarStep(name, x, y);

}


function fly3dStep(name, x, y,target) {

    for (let i = 0; i < flyIndictor; i++) {

        // console.log(parseFloat(myVector[0])+"  "+parseFloat(myVector[1]));
        points[i]=new THREE.Vector3(parseFloat(x[i])*2,50, parseFloat(y[i])*2);

        for(let j = 0;j < flyIndictor;j++){
            tArray[i][j]=parseInt(target[i][j]);
        }
    }
    // num++;
}
//flocking相关方法
//1
function flockAddData_1(shift, data) {
    flockDate_scal.push(flockIndex_scal);
    flockData_scal.push(data);
    flockIndex_scal++;
    if (shift) {
        flockDate_scal.shift();
        flockData_scal.shift();
    }
};
function flockStep_1() {
    flockChart_1.setOption({
        title: {
            text: getTitle(flockText, 0),
        },
        xAxis: {
            data: flockDate_scal,
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            max: 1,
        },
        series: [{
            data: flockData_scal
        }
        ]
    });
}
//2
function flockAddData_2(shift, data) {
    flockDate_vel.push(flockIndex_vel);
    flockData_vel.push(data);
    flockIndex_vel++;
    if (shift) {
        flockDate_vel.shift();
        flockData_vel.shift();
    }
};
function flockStep_2() {
    flockChart_2.setOption({
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLine: {
                lineStyle: {
                    color: '#8087e2',
                },
            },
            splitLine: {
                show: 'true',
                lineStyle: {
                    width: 0.05,
                    color: '#BFBFBF',
                    type: 'dotted',
                },
            },
        },
        title: {
            text: getTitle(flockText, 1),
        },
        xAxis: {
            data: flockDate_vel,
        },
        yAxis: {
            minInterval: 1
        },
        series: [{
            data: flockData_vel
        }
        ]
    });
}
//3
function flockAddData_3(shift, data) {
    flockDate_Rmin.push(flockIndex_Rmin);
    flockData_Rmin.push(data);
    flockIndex_Rmin++;
    if (shift) {
        flockDate_Rmin.shift();
        flockData_Rmin.shift();
    }
};
function flockStep_3() {
    flockChart_3.setOption({
        title: {
            text: getTitle(flockText, 2),
        },
        xAxis: {
            data: flockDate_Rmin,
        },
        series: [{
            data: flockData_Rmin
        }
        ]
    });

}

function getTitle(text, i) {
    return text[i];
}

//双向bar图相关方法
//1.双向bar图刷新
var index = 0;
function doubleBarStep(send, recv) {
    // console.log(chooseFly);
    if (index < 5) {
        sendPacket[index] = send[chooseFly];
        RecvPacket[index] = recv[chooseFly];
        index++;
    } else {
        for (var i = 0; i < 4; i++) {
            sendPacket[i] = sendPacket[i + 1];
            RecvPacket[i] = RecvPacket[i + 1];
        }
        RecvPacket[4] = recv[chooseFly];
        sendPacket[4] = send[chooseFly];
    }
    doubleBarchart.setOption({
        series: [{
            data: RecvPacket,
        },
        {
            data: sendPacket,
        }
        ]
    })
}

//飞机图相关方法
//1.飞机刷新
function flyStep(name, x, y, target, isAttack, isCollision) {
    //对比线的变化
    if (init == 0) {
        compareFlag = compareData(target, target);
        isCollisionCompareFlag = compareCollision(isCollision, isCollision);
        init++;
    } else {
        compareFlag = compareData(linksCompare, target);
        isCollisionCompareFlag = compareCollision(isCollisionCompare, isCollision);
    }

    // console.log(isCollisionCompareFlag);

    //判断路由时间标记，持续5次刷新
    for (var i = 0; i < flyIndictor; i++) {
        for (var j = 0; j < flyIndictor; j++) {
            if (compareFlag[i][j] == false) {
                timeFlag[i][j] = redOr;
            } else if (compareFlag[i][j] == true && timeFlag[i][j] != 0) {
                timeFlag[i][j] -= 1;
            }
        }
    }
   
    //判断延迟标记，持续5次刷新
    for (var i = 0; i < flyIndictor; i++) {
        for (var j = 0; j < flyIndictor; j++) {
            var randomline=Math.floor((Math.random()*100)+1);
            if (randomline==5) {
                delayFlag[i][j] = 5;
            } else if (randomline!=5 && delayFlag[i][j] != 0) {
                delayFlag[i][j] -= 1;
            }
        }
    }

    //判断丢包标记，持续3次刷新
    for (var i = 0; i < flyIndictor; i++) {
        for (var j = 0; j < flyIndictor; j++) {
            var randombox=Math.floor((Math.random()*100)+1);
            if (randombox==5) {
                missFlag[i][j] = 5;
            } else if (randombox!=5 && missFlag[i][j] != 0) {
                missFlag[i][j] -= 1;
            }
        }
    }

    //判断爆炸时间标记，持续3次刷新
    for (var i = 0; i < flyIndictor + spoofNum; i++) {
        if (isCollisionCompareFlag[i] == false) {
            isCollisionTimeFlag[i] = 2;
        } else if (isCollisionCompareFlag[i] == true && isCollisionTimeFlag[i] != 0) {
            isCollisionTimeFlag[i] -= 1;
        }
    }

    // console.log(isCollisionTimeFlag);
    for (var i = 0; i < flyIndictor + spoofNum; i++) {
        nodes[i].value = [x[i], y[i]];
        if (isCollisionTimeFlag[i] == 0) {
            //攻击，欺骗，虚假判断(1,0,2)
            if (isAttack[i] == 1) {
                nodes[i].symbol = "image://" + "images/redFly.png";
                nodes[i].symbolSize = 16;
            } else if (isAttack[i] == 0) {
                nodes[i].symbol = "image://" + "images/blueFly.png";
                nodes[i].symbolSize = 16;
            } else {

                nodes[i].name = name[i] + "'";
                nodes[i].symbol = "image://" + "images/circleSpoof.png";
                nodes[i].symbolSize = 14;
            }
        } else {
            nodes[i].symbol = "image://" + "images/explode.png";
            nodes[i].symbolSize = 40;
        }
        for (var j = 0; j < target[i].length; j++) {
            // console.log("线:" + target[i]);
            if (target[i][j] == 1) {
                if (timeFlag[i][j] == 0) {
                    var link = {
                        source: name[i],
                        target: j,
                        // lineStyle: {
                        //     color: "green",
                        // }
                    }
                }
                else {
                    var link = {
                        source: name[i],
                        target: j,
                        lineStyle: {
                            color: "red",
                            width: 2,
                        }
                    }
                }
                links.push(link);
            }
        }
        // console.log("时间标记" + timeFlag);

    }
    // console.log(flyCharts.link.length);
    flyChart.setOption({
        series: [
            {
                data: nodes,
                links: links,
            }
        ]
    })
    linksCompare = target;
    links = [];
    isCollisionCompare = isCollision;

}
//2.标记
function compareData(oldData, newData) {
    var Flag = getDubArray(flyIndictor, flyIndictor);
    // console.log("newData" + newData);
    // console.log("oldData" + oldData);
    for (var i = 0; i < flyIndictor; i++) {
        for (var j = 0; j < flyIndictor; j++) {
            if (newData[i][j] == oldData[i][j]) {
                Flag[i][j] = true;
            }
            else {
                Flag[i][j] = false;
            }
        }
    }
    return Flag;
}
function compareCollision(oldData, newData) {
    var Flag = [];

    for (var i = 0; i < flyIndictor; i++) {

        if (newData[i] == oldData[i]) {
            Flag[i] = true;
        }
        else {
            Flag[i] = false;
        }
    }
    return Flag;
}

//水波图相关方法
//水波图刷新
function rippleStep_1(netLostPackage) {
    rippleValue_1 = netLostPackage;
    rippleData_1 = [];
    rippleData_1.push(rippleValue_1);
    rippleData_1.push(rippleValue_1);
    rippleData_1.push(rippleValue_1);
    rippleData_1.push(rippleValue_1);
    rippleData_1.push(rippleValue_1);
    rippleChart_1.setOption({
        series: [{
            data: rippleData_1,
            label: {
                normal: {
                    formatter: (rippleValue_1 * 100).toFixed(2) + '%',
                }
            }
        }]
    })
}

function rippleStep_2(totalLostPackage) {
    rippleValue_2 = totalLostPackage;
    rippleData_2 = [];
    rippleData_2.push(rippleValue_2);
    rippleData_2.push(rippleValue_2);
    rippleData_2.push(rippleValue_2);
    rippleData_2.push(rippleValue_2);
    rippleData_2.push(rippleValue_2);
    rippleChart_2.setOption({
        series: [{
            data: rippleData_2,
            label: {
                normal: {
                    formatter: (rippleValue_2 * 100).toFixed(2) + '%',
                }
            }
        }]
    })
}
//bar图相关方法
//1.bar图刷新
function barStep(delayData, delayLable, avgDelay) {
    barData = [avgDelay, delayData[0], delayData[1], delayData[2], delayData[3]];
    barLable = ["avg", delayLable[0], delayLable[1], delayLable[2], delayLable[3]];
    barChart.setOption({
        yAxis: [{
            data: barLable,
        }],
        series: [
            //背景色，灰条
            {
                show: true,
                type: 'bar',
                barGap: '-100%',
                barWidth: '35%',
                itemStyle: {
                    normal: {
                        color: 'rgba(102, 102, 102,0.5)'
                    },
                },
                z: 1,
                data: grayBar,
            }, {
                show: true,
                color: '#1ace4a',
                type: 'bar',
                barGap: '-100%',
                barWidth: '35%',
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{c}',
                        textStyle: {
                            color: 'white' //color of value
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        show: true,
                        color: function (params) {
                            return {
                                type: 'linear',
                                colorStops: [{
                                    offset: 0,
                                    color: colorArray[params.dataIndex],
                                }],
                            }
                        },
                        barBorderRadius: 70,
                        borderWidth: 0,
                        borderColor: '#333',
                    }
                },
                z: 2,
                data: barData,
            }
        ]
    })
    barData = [];
}

//面积图相关方法
function areaAddData(shift, data) {
    areaDate.push(areaIndex);
    areaData.push(data)
    // console.log(areaDate);
    areaIndex++;
    if (shift) {
        areaDate.shift();
        areaData.shift();
    }
};
//1.面积图刷新
function areaStep() {
    areaChart.setOption({
        xAxis: {
            data: areaDate,
        },
        series: [{
            data: areaData,
        }
        ]
    });
}

//判断展示数据的多少
for (var i = 0; i < 20; i++) {
    flockAddData_1();
    flockAddData_2();
    flockAddData_3();
    areaAddData();
}


function blockFill(row, column, x, y) {
    for (var i = 0; i < column; i++) {
        for (var j = 0; j < row; j++) {
            var node = {
                value: [x + 5 * i, y + 5 * j],
                symbol: "image://" + "images/wall.png",
                symbolSize: [35, 25],
                symbolOffset: ['40%', '-40%']
            }
            blockNodes.push(node);
        }
    }
}

function blockFill_exper1(row, column, x, y) {
    for (var i = 0; i < column; i++) {
        for (var j = 0; j < row; j++) {
            var node = {
                value: [x + 2 * i, y + 2 * j],
                symbol: "image://" + "images/wall.png",
                symbolSize: [14, 10],
                symbolOffset: ['40%', '-40%']
            }
            blockNodes.push(node);
        }
    }
}

function blockFill_2_5(row, column, x, y) {
    for (var i = 0; i < column; i++) {
        for (var j = 0; j < row; j++) {
            var node = {
                value: [x + 2.5 * i, y + 2.5 * j],
                symbol: "image://" + "images/wall.png",
                symbolSize: [17.5, 12.5],
                symbolOffset: ['40%', '-40%']
            }
            blockNodes.push(node);
        }
    }
}

function radarStep(name, x, y) {
    radarNodes = [];
    var xOffset = (parseFloat(comDistance) - parseFloat(x[chooseFly]));
    var yOffset = (parseFloat(comDistance) - parseFloat(y[chooseFly]));
    for (var i = 0; i < flyIndictor; i++) {
        if (i == chooseFly) {
            var radarnode = {
                name: "",
                value: [comDistance, comDistance],
                symbol: "image://" + "images/circleSpoof.png",
                symbolSize: 8,
            }
            radarNodes.push(radarnode);
        } else if (i != chooseFly && Math.pow(Math.pow(x[i] - x[chooseFly], 2) + Math.pow(y[i] - y[chooseFly], 2), 0.5) < comDistance) {
            // console.log("进入");
            var radarnode = {
                name: name[i],
                value: [parseFloat(parseFloat(x[i]) + xOffset), parseFloat(y[i]) + yOffset],
                symbol: "image://" + "images/circle.png",
                symbolSize: 8,
            }
            radarNodes.push(radarnode);
        }
    }
    radarChart.setOption({
        xAxis: {
            show: false,
            type: 'value',
            max: comDistance * 2,
            splitNumber: 10,
            axisLine: {
                lineStyle: {
                    color: '#8087e2',
                },
                show: false,
            },
            splitLine: {
                show: 'true',
                lineStyle: {
                    width: 0.05,
                    color: '#BFBFBF',
                    type: 'dotted',
                },
            },
        },
        yAxis: {
            show: false,
            type: 'value',
            max: comDistance * 2,
            splitNumber: 10,
            axisLine: {
                lineStyle: {
                    color: '#8087e2',
                },
                show: false,
            },
            splitLine: {
                show: 'true',
                lineStyle: {
                    width: 0.05,
                    color: '#BFBFBF',
                    type: 'dotted',
                },
            },
        },
        series: [
            {

            }, {
                data: radarNodes
            }
        ]
    });
}


//表格更新
function updateTable(data_table) {

    if (tableInit == 0) {
        for (var i = 0; i < flyIndictor; i++) {
            for (var j = 0; j < flyIndictor; j++) {
                tableFlag[i][j] = 0;
                tableCompareFlag[i][j] = true;
            }
        }
        tableInit++;
    } else {
        for (var i = 0; i < flyIndictor; i++) {
            for (var j = 0; j < flyIndictor; j++) {
                if (CompareData[i][j] == data_table[i][j]) {
                    tableCompareFlag[i][j] = true;
                } else {
                    tableCompareFlag[i][j] = false;
                }
            }
        }
    }
    // console.log(tableCompareFlag);

    for (var i = 0; i < flyIndictor; i++) {
        for (var j = 0; j < flyIndictor; j++) {
            if (tableCompareFlag[i][j] == false) {
                tableFlag[i][j] = 5;
            } else if (tableCompareFlag[i][j] == true && tableFlag[i][j] != 0) {
                tableFlag[i][j] -= 1;
            }
        }
    }
    // console.log(tableFlag);

    var index = 0
    var tableEle = $("#unit_1 table tbody tr td");
    for (var i = 0; i < data_table[chooseFly].length; i++) {
        if (i != chooseFly) {
            tableEle.eq(index * 2).text(i);
            tableEle.eq(index * 2 + 1).text(data_table[chooseFly][i]);
            if (parseInt(tableFlag[chooseFly][i]) != 0) {
                tableEle.eq(index * 2 + 1).css("color", "#B5570B")
            } else {
                tableEle.eq(index * 2 + 1).css("color", "#ffffff")
            }
            index++;
        }
    }
    CompareData = data_table;
}

/*如果加载红色的无人机调用函数Loadmodel，如果加载蓝色的无人机调用函数Loadmodel1*/
// function load() {

//     Loadmodel(function (model) {
//         let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//         let mdlen = box.max.x - box.min.x; // 模型长度
//         let mdwid = box.max.z - box.min.z; // 模型宽度
//         let mdhei = box.max.y - box.min.y; // 模型高度
//         let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//         let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//         let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//         model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//         model.scale.set(0.015, 0.015, 0.015);
//         plane1=model;
//         scene.add(plane1);
//     });
//     Loadmodel(function (model) {
//         let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//         let mdlen = box.max.x - box.min.x; // 模型长度
//         let mdwid = box.max.z - box.min.z; // 模型宽度
//         let mdhei = box.max.y - box.min.y; // 模型高度
//         let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//         let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//         let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//         model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//         model.scale.set(0.015, 0.015, 0.015);
//         plane2=model;
//         scene.add(plane2);
//     });
//     Loadmodel(function (model) {
//         let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//         let mdlen = box.max.x - box.min.x; // 模型长度
//         let mdwid = box.max.z - box.min.z; // 模型宽度
//         let mdhei = box.max.y - box.min.y; // 模型高度
//         let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//         let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//         let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//         model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//         model.scale.set(0.015, 0.015, 0.015);
//         plane3=model;
//         scene.add(plane3);
//     });
//     Loadmodel(function (model) {
//         let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//         let mdlen = box.max.x - box.min.x; // 模型长度
//         let mdwid = box.max.z - box.min.z; // 模型宽度
//         let mdhei = box.max.y - box.min.y; // 模型高度
//         let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//         let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//         let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//         model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//         model.scale.set(0.015, 0.015, 0.015);
//         plane4=model;
//         scene.add(plane4);
//     });
//     Loadmodel(function (model) {
//         let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//         let mdlen = box.max.x - box.min.x; // 模型长度
//         let mdwid = box.max.z - box.min.z; // 模型宽度
//         let mdhei = box.max.y - box.min.y; // 模型高度
//         let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//         let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//         let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//         model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//         model.scale.set(0.015, 0.015, 0.015);
//         plane5=model;
//         scene.add(plane5);
//     });
//     Loadmodel(function (model) {
//         let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//         let mdlen = box.max.x - box.min.x; // 模型长度
//         let mdwid = box.max.z - box.min.z; // 模型宽度
//         let mdhei = box.max.y - box.min.y; // 模型高度
//         let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//         let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//         let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//         model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//         model.scale.set(0.015, 0.015, 0.015);
//         plane6=model;
//         scene.add(plane6);
//     });
//     Loadmodel(function (model) {
//         let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//         let mdlen = box.max.x - box.min.x; // 模型长度
//         let mdwid = box.max.z - box.min.z; // 模型宽度
//         let mdhei = box.max.y - box.min.y; // 模型高度
//         let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//         let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//         let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//         model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//         model.scale.set(0.015, 0.015, 0.015);
//         plane7=model;
//         scene.add(plane7);
//     });
//     Loadmodel(function (model) {
//         let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//         let mdlen = box.max.x - box.min.x; // 模型长度
//         let mdwid = box.max.z - box.min.z; // 模型宽度
//         let mdhei = box.max.y - box.min.y; // 模型高度
//         let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//         let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//         let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//         model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//         model.scale.set(0.015, 0.015, 0.015);
//         plane8=model;
//         scene.add(plane8);
//     });
//     Loadmodel(function (model) {
//         let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//         let mdlen = box.max.x - box.min.x; // 模型长度
//         let mdwid = box.max.z - box.min.z; // 模型宽度
//         let mdhei = box.max.y - box.min.y; // 模型高度
//         let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//         let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//         let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//         model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//         model.scale.set(0.015, 0.015, 0.015);
//         plane9=model;
//         scene.add(plane9);
//     });
//     // Loadmodel(function (model) {
//     //     let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//     //     let mdlen = box.max.x - box.min.x; // 模型长度
//     //     let mdwid = box.max.z - box.min.z; // 模型宽度
//     //     let mdhei = box.max.y - box.min.y; // 模型高度
//     //     let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//     //     let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//     //     let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//     //     model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//     //     model.scale.set(0.015, 0.015, 0.015);
//     //     plane10=model;
//     //     group.add(plane10);
//     // });
    
// //加载四艘蓝色无人机
//     //  Loadmodel1(function (model) {
//     //     let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//     //     let mdlen = box.max.x - box.min.x; // 模型长度
//     //     let mdwid = box.max.z - box.min.z; // 模型宽度
//     //     let mdhei = box.max.y - box.min.y; // 模型高度
//     //     let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//     //     let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//     //     let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//     //     model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//     //     model.scale.set(0.015, 0.015, 0.015);
//     //     planeAttack[0]=model;
//     // });
//     // Loadmodel1(function (model) {
//     //     let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//     //     let mdlen = box.max.x - box.min.x; // 模型长度
//     //     let mdwid = box.max.z - box.min.z; // 模型宽度
//     //     let mdhei = box.max.y - box.min.y; // 模型高度
//     //     let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//     //     let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//     //     let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//     //     model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//     //     model.scale.set(0.015, 0.015, 0.015);
//     //     planeAttack[1]=model;
//     // });
//     // Loadmodel1(function (model) {
//     //     let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//     //     let mdlen = box.max.x - box.min.x; // 模型长度
//     //     let mdwid = box.max.z - box.min.z; // 模型宽度
//     //     let mdhei = box.max.y - box.min.y; // 模型高度
//     //     let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//     //     let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//     //     let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//     //     model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//     //     model.scale.set(0.015, 0.015, 0.015);
//     //     planeAttack[2]=model;
//     // });
//     // Loadmodel1(function (model) {
//     //     let box = new THREE.Box3().setFromObject(model); // 获取模型的包围盒
//     //     let mdlen = box.max.x - box.min.x; // 模型长度
//     //     let mdwid = box.max.z - box.min.z; // 模型宽度
//     //     let mdhei = box.max.y - box.min.y; // 模型高度
//     //     let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
//     //     let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
//     //     let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z
//     //     model.position.set(-x1, -y1, -z1); // 将模型进行偏移
//     //     model.scale.set(0.015, 0.015, 0.015);
//     //     planeAttack[3]=model;
//     // });
// }
// function Loadmodel1(callback) {
//     // model
//     var onProgress = function (xhr) {
//         if (xhr.lengthComputable) {
//             var percentComplete = xhr.loaded / xhr.total * 100;
//             var percent = document.getElementById("percent");
//             percent.innerText = Math.round(percentComplete, 2) + '% 已经加载';
//         }
//     };
//     var onError = function (xhr) {
//     };
//     var mtlLoader = new THREE.MTLLoader();
//     mtlLoader.setPath('../Resource/models/uav/');
//     mtlLoader.load('demo7.mtl', function (materials) {
//             materials.preload();
//             var objLoader = new THREE.OBJLoader();
//             objLoader.setMaterials(materials);
//             objLoader.setPath('../Resource/models/uav/');
//             objLoader.load('demo7.obj', function (object) {
//                 console.log(object);
//                 Attacknum++;
//                 callback(object);
//                 if(num===flyIndictor)
//                 {
//                     // setTimeout("init3d()",500);
//                     init3d();

//                 }
//             }, onProgress, onError)
//         }
//     );

// }
// function Loadmodel(callback) {
//     // model
//     var onProgress = function (xhr) {
//         if (xhr.lengthComputable) {
//             var percentComplete = xhr.loaded / xhr.total * 100;
//             var percent = document.getElementById("percent");
//             percent.innerText = Math.round(percentComplete, 2) + '% 已经加载';
//         }
//     };
//     var onError = function (xhr) {
//     };
//     var mtlLoader = new THREE.MTLLoader();
//     mtlLoader.setPath('../Resource/models/uav/');
//     mtlLoader.load('demo6.mtl', function (materials) {
//             materials.preload();
//             var objLoader = new THREE.OBJLoader();
//             objLoader.setMaterials(materials);
//             objLoader.setPath('../Resource/models/uav/');
//             objLoader.load('demo6.obj', function (object) {
//                 console.log(object);
//                 num++;
//                 console.log(num);
//                 console.log(flyIndictor);
//                 callback(object);
//                 if(num===flyIndictor)
//                 {
//                     // setTimeout("init3d()",500);
//                     init3d();

//                 }
//             }, onProgress, onError)
//         }
//     );

// }

// function init3d() {
//     //直接开启帧数检测
//     //编辑代码处
//     var test=[1,0,1,1,0,0,1,0,0,0];
//     camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);//相机构建
//     renderer = new THREE.WebGLRenderer({
//         // canvas: document.getElementById("mainCanvas"),
//         antialias: true, // 抗锯齿
//         alpha: true
//         });//渲染器构建
//     renderer.setClearColor(0xEEEEEE);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.shadowMapEnabled = true;//激活阴影
//     // var axes = new THREE.AxisHelper(500);
//     // scene.add(axes);
//     //构建一个坐标轴,蓝色是x轴，红色是z轴，绿色是y轴

//     // add sky box
//     var path = "../assets/textures/cubemap/parliament/";//设置路径
//     var directions = ["3", "1", "6", "2", "5", "4"];//获取对象
//     var format = ".jpg";//格式
//     //创建盒子，并设置盒子的大小为( 5000, 5000, 5000 )
//     var skyGeometry = new THREE.BoxGeometry(500, 500, 500);
//     //设置盒子材质
//     var materialArray = [];
//     for (var i = 0; i < 6; i++)
//         materialArray.push(new THREE.MeshBasicMaterial({
//             map: THREE.ImageUtils.loadTexture(path + directions[i] + format),//将图片纹理贴上
//             side: THREE.BackSide/*镜像翻转，如果设置镜像翻转，那么只会看到黑漆漆的一片，因为你身处在盒子的内部，所以一定要设置镜像翻转。*/
//         }));
//     var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
//     var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);//创建一个完整的天空盒，填入几何模型和材质的参数
//     scene.add(skyBox);//在场景中加入天空盒
//     var textureGrass = THREE.ImageUtils.loadTexture("../Resource/textures/general/floor.jpg");
//     textureGrass.wrapS = THREE.RepeatWrapping;
//     textureGrass.wrapT = THREE.RepeatWrapping;
//     textureGrass.repeat.set(4, 4);
//     var planeGeometry = new THREE.PlaneGeometry(300, 300);
//     //var planeMaterial = new THREE.MeshBasicMaterial({color:0xcccccc});
//     var planeMaterial = new THREE.MeshLambertMaterial({map: textureGrass});
//     var plane = new THREE.Mesh(planeGeometry, planeMaterial);
//     plane.rotation.x = -0.5 * Math.PI;
//     plane.position.x = 0;
//     plane.position.y = 0;
//     plane.position.z = 0;
//     scene.add(plane);
//     plane.receiveShadow = true;

//     //添加灯光
//     var DirectionalLight = new THREE.DirectionalLight(0xffffff);
//     scene.add(DirectionalLight);
//     //gui
//     var controls = new function () {
//         this.lock_perspective = false;
//         // this.view="60";
//         // this.restart = function () {
//         //     socket.send("restart");
//         // };
//     };

//     // initbuilding();//调用这个函数就可以将建筑物加载出来
//     var gui = new dat.GUI();
//     var spGui = gui.addFolder("View");
//     spGui.add(controls,"lock_perspective");
//     // gui.add(controls,"start");
//     // gui.add(controls,"stop");
//     // spGui.add(controls, "view", ['90', '60', '30']).onChange(function (e) {
//     //     console.log(e);
//     //     switch (e) {
//     //         case "90":
//     //             if(controls.lock_perspective)
//     //             {
//     //                 camera.position.x = 50;
//     //                 camera.position.y = 150;
//     //                 camera.position.z = 50;
//     //                 camera.lookAt(new THREE.Vector3(50,0,75));
//     //             }
//     //             break;
//     //         case "60":
//     //             if(controls.lock_perspective) {
//     //                 camera.position.x = 50;
//     //                 camera.position.y = 75;
//     //                 camera.position.z = 50;
//     //                 camera.lookAt(new THREE.Vector3(0,0,0));
//     //             }
//     //             break;
//     //         case "30":
//     //             if(controls.lock_perspective) {
//     //                 camera.position.x = 50;
//     //                 camera.position.y = 50;
//     //                 camera.position.z = 50;
//     //                 camera.lookAt(new THREE.Vector3(0, 0, 0));
//     //             }
//     //             break;
//     //     }
//     //
//     // });
//     // gui.add(controls,"Perspective_locking");

//     var groupline = new THREE.Group();
//     var trackballControls;
//     function initcamera() {
//         //渲染视图视角
//         if (controls.lock_perspective===false)
//         {
//             //创建控件并绑定在相机上
//             trackballControls = new THREE.TrackballControls(camera);
//             trackballControls.rotateSpeed = 1.0;
//             trackballControls.zoomSpeed = 1.0;
//             trackballControls.panSpeed = 1.0;
//             trackballControls.noZoom = false;
//             trackballControls.noPan = false;
//             trackballControls.staticMoving = true;
//             trackballControls.dynamicDampingFactor = 0.3;
//             camera.position.x = 65;
//             camera.position.y = 75;
//             camera.position.z = 65;
//             camera.lookAt(new THREE.Vector3(0,0,0));
//         }
//     }
//     /*如果需要加载建筑物。调用这个函数*/
//     function initbuilding() {
//         var textureLoader = THREE.ImageUtils.loadTexture("../Resource/textures/general/building2.jpg");
//         //建筑物1
//         var cubeGeometry1 = new THREE.BoxGeometry(10, 50, 16);
//         var cubeMaterial1 = new THREE.MeshBasicMaterial({map: textureLoader});
//         var cube1 = new THREE.Mesh(cubeGeometry1, cubeMaterial1);
//         cube1.position.x = 30;
//         cube1.position.y = 8;
//         cube1.position.z = 40;
//         scene.add(cube1);
//         //建筑物2
//         var cubeGeometry2 = new THREE.BoxGeometry(14, 50, 2);
//         var cubeMaterial2 = new THREE.MeshBasicMaterial({map: textureLoader});
//         var cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);
//         cube2.position.x = 47;
//         cube2.position.y = 8;
//         cube2.position.z = 61;
//         scene.add(cube2);
//         // //建筑物3
//         var cubeGeometry3 = new THREE.BoxGeometry(2, 50, 6);
//         var cubeMaterial3 = new THREE.MeshBasicMaterial({map: textureLoader});
//         var cube3 = new THREE.Mesh(cubeGeometry3, cubeMaterial3);
//         cube3.position.x = 55;
//         cube3.position.y = 8;
//         cube3.position.z = 63;
//         scene.add(cube3);
//         // //建筑物4
//         var cubeGeometry4 = new THREE.BoxGeometry(2, 50, 12);
//         var cubeMaterial4 = new THREE.MeshBasicMaterial({map: textureLoader});
//         var cube4 = new THREE.Mesh(cubeGeometry4, cubeMaterial4);
//         cube4.position.x = 50;
//         cube4.position.y = 8;
//         cube4.position.z = 26;
//         scene.add(cube4);
//     }

//     //路线1
//     var geometry = new THREE.Geometry();
//     // 把从曲线轨迹上获得的顶点坐标赋值给几何体
//     geometry.vertices = points1;
//     var material = new THREE.LineBasicMaterial({
//         color: 0x4488ff
//     });
//     var line = new THREE.Line(geometry, material);
//     groupline.add(line);
//     //路线2
//     var geometry2 = new THREE.Geometry();
//     // 把从曲线轨迹上获得的顶点坐标赋值给几何体
//     geometry2.vertices = points2;
//     var material2 = new THREE.LineBasicMaterial({
//         color: 0x4488ff
//     });
//     var line2 = new THREE.Line(geometry2, material2);
//     groupline.add(line2);
//     //路线3
//     var geometry3 = new THREE.Geometry();
//     // 把从曲线轨迹上获得的顶点坐标赋值给几何体
//     geometry3.vertices = points3;
//     var material3 = new THREE.LineBasicMaterial({
//         color: 0x4488ff
//     });
//     var line3 = new THREE.Line(geometry3, material3);
//     groupline.add(line3);
//     //路线4
//     var geometry4 = new THREE.Geometry();
//     // 把从曲线轨迹上获得的顶点坐标赋值给几何体
//     geometry4.vertices = points4;
//     var material4 = new THREE.LineBasicMaterial({
//         color: 0x4488ff
//     });
//     var line4 = new THREE.Line(geometry4, material4);
//     groupline.add(line4);
//     //
//     //路线5
//     var geometry5 = new THREE.Geometry();
//     // 把从曲线轨迹上获得的顶点坐标赋值给几何体
//     geometry5.vertices = points5;
//     var material5 = new THREE.LineBasicMaterial({
//         color: 0x4488ff
//     });
//     var line5 = new THREE.Line(geometry5, material5);
//     groupline.add(line5);
//     //
//     //路线6
//     var geometry6 = new THREE.Geometry();
//     // 把从曲线轨迹上获得的顶点坐标赋值给几何体
//     geometry6.vertices = points6;
//     var material6 = new THREE.LineBasicMaterial({
//         color: 0x4488ff
//     });
//     var line6 = new THREE.Line(geometry6, material6);
//     groupline.add(line6);

//     //路线7
//     var geometry7 = new THREE.Geometry();
//     // 把从曲线轨迹上获得的顶点坐标赋值给几何体
//     geometry7.vertices = points7;
//     var material7 = new THREE.LineBasicMaterial({
//         color: 0x4488ff
//     });
//     var line7 = new THREE.Line(geometry7, material7);
//     groupline.add(line7);

//     //路线8
//     var geometry8 = new THREE.Geometry();
//     // 把从曲线轨迹上获得的顶点坐标赋值给几何体
//     geometry8.vertices = points8;
//     var material8 = new THREE.LineBasicMaterial({
//         color: 0x4488ff
//     });
//     var line8 = new THREE.Line(geometry8, material8);
//     groupline.add(line8);

//     //路线9
//     var geometry9 = new THREE.Geometry();
//     // 把从曲线轨迹上获得的顶点坐标赋值给几何体
//     geometry9.vertices = points9;
//     var material9 = new THREE.LineBasicMaterial({
//         color: 0x4488ff
//     });
//     var line9 = new THREE.Line(geometry9, material9);
//     groupline.add(line9);
//     //路线10
//     var geometry10 = new THREE.Geometry();
//     // 把从曲线轨迹上获得的顶点坐标赋值给几何体
//     geometry10.vertices = points10;
//     var material10 = new THREE.LineBasicMaterial({
//         color: 0x4488ff
//     });
//     var line10 = new THREE.Line(geometry10, material10);
//     groupline.add(line10);
//     function redraw()
//     {
//         var line=[];
//     }
//     initcamera();
//     var clock = new THREE.Clock();
//     var step = 0;
//     // setTimeout("modelExplode(plane1,100,points1)",5000);
//     function is3dAttack(isAttack)
//     {
//         var isAttackNum=-1;
//         if(isAttack[i]==1)
//         {
//             isAttackNum++;
//                 switch (i) {
//                     case 0:scene.remove(plane1);
//                            plane1=planeAttack[isAttackNum];
//                            scene.add(plane1);
//                         break;
//                     case 1:scene.remove(plane2);
//                            plane2=planeAttack[isAttackNum];
//                            scene.add(plane2);
//                         break;
//                     case 2:scene.remove(plane3);
//                           plane3=planeAttack[isAttackNum];
//                           scene.add(plane3);
//                         break;
//                     case 3:scene.remove(plane4);
//                           plane4=planeAttack[isAttackNum];
//                           scene.add(plane4);
//                         break;
//                     case 4:scene.remove(plane5);
//                           plane5=planeAttack[isAttackNum];
//                           scene.add(plane5);
//                         break;
//                     case 5:scene.remove(plane6);
//                            plane6=planeAttack[isAttackNum];
//                            scene.add(plane6);
//                         break;
//                     case 6:scene.remove(plane7);
//                            plane7=planeAttack[isAttackNum];
//                            scene.add(plane7);
//                         break;
//                     case 7:scene.remove(plane8);
//                           plane8=planeAttack[isAttackNum];
//                           scene.add(plane8);
//                         break;
//                     case 8:scene.remove(plane9);
//                         plane9=planeAttack[isAttackNum];
//                        scene.add(plane9);
//                         break;
//                     case 9:scene.remove(plane10);
//                         plane10=planeAttack[isAttackNum];
//                         scene.add(plane10);
//                         break;
//              }
    
//         }   
//     }
//     function isExplode(isCollision)
//     {
//         var planetemp;
//         var pointstemp;
//         for(var i=0;i<9;i++)
//         {
//             if(isCollision[i]==1)
//                 {
//                     switch (i) {
//                         case 0:planetemp=plane1;
//                                pointstemp=points1;
//                             break;
//                         case 1:planetemp=plane2;
//                                pointstemp=points2;
//                             break;
//                         case 2:planetemp=plane3;
//                                pointstemp=points3;
//                             break;
//                         case 3:planetemp=plane4;
//                                pointstemp=points4;
//                             break;
//                         case 4:planetemp=plane5;
//                                pointstemp=points5;
//                             break;
//                         case 5:planetemp=plane6;
//                                pointstemp=points6;
//                             break;
//                         case 6:planetemp=plane7;
//                                pointstemp=points7;
//                             break;
//                         case 7:planetemp=plane8;
//                                pointstemp=points8;
//                             break;
//                         case 8:planetemp=plane9;
//                                pointstemp=points9;
//                             break;
//                         case 9:planetemp=plane10;
//                                pointstemp=points10;
//                             break;
//                  }
//                  modelExplode(planetemp,150,pointstemp);
//                   setTimeout("modelExplode(plane1,0,points1)",500);      
//                 }
//         }

//     }
//     // modelExplode(plane1,150,points1);
//     // setTimeout("modelExplode(plane1,0,points1)",5000);  
//     // modelExplode(plane1,0,points1);
//     // //调用这个函数，会让飞机变得散架（模拟爆炸效果），这个函数接收三个参数，飞机、爆炸效果、坐标，当爆炸效果置0时候，飞机恢复原状。
//     var temp=0;
//     function renderScene() {
//         temp++;
//         var delta = clock.getDelta();
//         trackballControls.update(delta);
//         plane1.position.x = points1.x;
//         plane1.position.y = points1.y;
//         plane1.position.z = points1.z;
//         plane2.position.x = points2.x;
//         plane2.position.y = points2.y;
//         plane2.position.z = points2.z;
//         plane3.position.x = points3.x;
//         plane3.position.y = points3.y;
//         plane3.position.z = points3.z;
//         plane4.position.x = points4.x;
//         plane4.position.y = points4.y;
//         plane4.position.z = points4.z;
//         plane5.position.x = points5.x;
//         plane5.position.y = points5.y;
//         plane5.position.z = points5.z;
//         plane6.position.x = points6.x;
//         plane6.position.y = points6.y;
//         plane6.position.z = points6.z;
//         plane7.position.x = points7.x;
//         plane7.position.y = points7.y;
//         plane7.position.z = points7.z;
//         plane8.position.x = points8.x;
//         plane8.position.y = points8.y;
//         plane8.position.z = points8.z;
//         plane9.position.x = points9.x;
//         plane9.position.y = points9.y;
//         plane9.position.z = points9.z;
//         // plane10.position.x = points10.x;
//         // plane10.position.y = points10.y;
//         // plane10.position.z = points10.z;
//         isconnect();
//         requestAnimationFrame(renderScene);
//         if(controls.lock_perspective)
//         {
//                 trackballControls.enabled=false;
//                 camera.position.x=points1.x+30;
//                 camera.position.y=55;
//                 camera.position.z=points1.z+30;
//                 camera.lookAt(new THREE.Vector3(0,0,0));
//         }
//         else
//         {
//             trackballControls.enabled=true;
//         }
//         //is3dAttack(test);
//         //isExplode(isCollision);
//         $("#WebGL-output>canvas").css("width","600px");
//         $("#WebGL-output>canvas").css("height","450px");
//         renderer.render(scene, camera);
//     }
//     renderScene();
//     function sightcontrol() {

//     }
//     function isconnect() {
//         var start;
//         var end;
//         var allChildren = connectline.children;
//         for (var j = allChildren.length - 1; j >= 0; j--) {
//             if (allChildren[j] instanceof THREE.Line) {
//                 connectline.remove(allChildren[j]);
//             }
//         }
//         for(var i=0;i<flyIndictor;i++)
//         {
//             for(var k=i;k<flyIndictor;k++)
//             {
//                 if(tArray[i][k]===1)
//                 {
//                     switch (i) {
//                             case 0:start=points1;
//                                 break;
//                             case 1:start = points2;
//                                 break;
//                             case 2:start = points3;
//                                 break;
//                             case 3:start = points4;
//                                 break;
//                             case 4:start = points5;
//                                 break;
//                             case 5:start = points6;
//                                 break;
//                             case 6:start = points7;
//                                 break;
//                             case 7:start = points8;
//                                 break;
//                             case 8:start = points9;
//                                 break;
//                             case 9:start = points10;
//                                 break;
//                     }
//                     switch (k) {
//                         case 0:end=points1;
//                             break;
//                         case 1:end = points2;
//                             break;
//                         case 2:end = points3;
//                             break;
//                         case 3:end = points4;
//                             break;
//                         case 4:end = points5;
//                             break;
//                         case 5:end = points6;
//                             break;
//                         case 6:end = points7;
//                             break;
//                         case 7:end = points8;
//                             break;
//                         case 8:end = points9;
//                             break;
//                         case 9:end = points10;
//                             break;
//                     }
//                     drawline(start,end);
//                 }
//             }
//         }
//         scene.add(connectline);

//     }


//     function drawline(a,b)
//     {

//         var curve = new THREE.CatmullRomCurve3([
//                 //起点
//                 a,
//                 //终点
//                 b,
//             ],
//             false,
//         );
//         var connection_points = curve.getPoints(100);
//         var geometry = new THREE.Geometry();
//         // 把从曲线轨迹上获得的顶点坐标赋值给几何体
//         geometry.vertices = connection_points;
//         var material = new THREE.LineBasicMaterial({
//             color: 0x4488ff
//         });
//         var line = new THREE.Line(geometry, material);
//         connectline.add(line);
//     }

//     document.getElementById("WebGL-output").appendChild(renderer.domElement);


// }
// function modelExplode(model,num,centerpoint){
//     var modelWorldCenter=centerpoint;//.addVectors(box.max,box.min).multiplyScalar(0.5);//模型中心坐标
//     console.log("model中心点",modelWorldCenter);
//     var childBox=new THREE.Box3();
//     model.traverse(function(child){
//         if(child.isMesh){
//             childBox.setFromObject(child);
//             var childCenter=new THREE.Vector3().addVectors(childBox.max,childBox.min).multiplyScalar(0.5);
//             if(isNaN(childCenter.x))return;
//             child.childCenter=new THREE.Vector3().subVectors(childCenter,modelWorldCenter).normalize();
//             //保存初始坐标
//             //child.userData.oldPs = child.getWorldPosition(new THREE.Vector3());
//             // console.log("初始坐标",child.userData.oldPs);
//             if(!child.isMesh || !child.childCenter) return;

//             //爆炸公式
//             child.position.copy(child.childCenter).multiplyScalar(num);
//             //console.log("child.position",child.position);
//         }
//     });
// }