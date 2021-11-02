$(function () {

    var timeoutID;
    var timeAll = 200000;
    //    计时
    startInterval(timeAll);

    //开始暂停功能
    var startTime = +new Date();
    var suspendTime = 0;
    // console.log(startTime);
    var flagNavi = true;
    $(".suspend > p").click(function () {
        //点击了暂停
        if (flagNavi) {
            $(this).text("开始");
            suspendTime = +new Date();
            //  console.log(1 + ":" + startTime);
            //  console.log(1 + ":" + suspendTime);
            timeAll = timeAll - (suspendTime - startTime);
            console.log(timeAll);
            clearInterval();
            sendInfo(socket, 1001);
            flagNavi = false;
        } else {
            $(this).text("暂停");
            startTime = +new Date();
            //  console.log(2 + ":" + startTime);
            //  console.log(2 + ":" + suspendTime);
            sendInfo(socket, 1000);
            startInterval(timeAll);
            flagNavi = true;
        }
    })


    function startInterval(time) {
        timeoutID = setInterval(function () {
            $(".exit_window").css("display", "block");
            timeAll = 200000;
            clearInterval();
            sendInfo(socket, -1);
            socket.close();
        }, time)
    }


    function clearInterval() {
        window.clearInterval(timeoutID);
    }


    //重新仿真
    $(".start").css("color", "#CCCCCC");
    $(".start").css("background-color", "#666666");
    setInterval(restart, timeAll);
    function restart() {
        $(".start").css("color", "#ffffff");
        $(".start").css("background-color", "rgba(0, 0, 0, .5)");
        
        $(".start").one("click", function () {
            $(".start").css("color", "#CCCCCC");
            $(".start").css("background-color", "#666666");
            $(".exit_window").css("display", "none");

            startInterval(200000);
            //socket.close();
            ws();
            sendInfo(socket, 1);
            // $('.start').unbind('onclick', null);//去掉标签中的onclick事件

        })
    }

    window.onbeforeunload = function () {
        sendInfo(socket, -1);
        socket.close();
    }

    window.onload = function () {
        ws();
    }



    //初始化图表
    initChart();

    //开启连接
    function ws() {
        if ('WebSocket' in window) {
            socket = new WebSocket(target);
            socket.onopen = function () {
                sendInfo(socket, 1);
            };
            redInfo(socket);
        } else if ('MozWebSocket' in window) {
            socket = new MozWebSocket(target);
            socket.onopen = function () {
                sendInfo(socket, 1);
            };
            redInfo(socket);
        } else {
            alert('WebSocket is not supported by this browser.');
            return;
        }
    }

    //读取数据，并传入图表  
    function redInfo(socket) {
        socket.onmessage = function (event) {
            processData(event.data);
        }
    }

    //处理数据
    function processData(data) {
        

        //将字符串分割为每一个飞机的字符数组
        var sumData = splitData(data, "#")
        var oneFlyData = [];
        var flyName = [];
        var x = [];
        var y = [];
        var target = getDubArray(flyIndictor + spoofNum, flyIndictor + spoofNum);
        // console.log(flyIndictor + spoofNum);

        var connectData = [];
        var netLostPackage = 0;
        var totalLostPackage = 0;
        var netThrough = 0;
        var delayLable = [];
        var LableIndex = 0;
        var delayData = [];
        var dataIndex = 0;
        var avgDelay = 0;
        var isAttack = [];
        var isCollision = [];
        var hops = [];
        var send = [];
        var recv = [];
        var index = 0;
        var table = getDubArray(flyIndictor, flyIndictor);

        for (var i = 0; i < sumData.length; i++) {
            // 将每一个飞机的数据分割为字符数组
            var oneFlyData = splitData(sumData[i] + ",", ",");
            // console.log(oneFlyData);
            if (i < sumData.length - 1) {
                for (var j = 0; j < oneFlyData.length; j++) {
                    // console.log("长度为" + oneFlyData.length);
                    if (j == 0) {
                        flyName[i] = oneFlyData[j];
                    } else if (j == 1) {
                        x[i] = oneFlyData[j];
                    } else if (j == 2) {
                        y[i] = oneFlyData[j];
                    } else if (j == oneFlyData.length - 5) {
                        //分割连接数据字符串
                        connectData = splitData(oneFlyData[j], "*");
                        //console.log("连接状况" + connectData);
                        //判断是否有连线
                        for (var k = 0; k < connectData.length; k++) {
                            if (connectData[k] == 1) {
                                target[i][k] = 1;
                            }
                            else {
                                target[i][k] = 0;
                            }
                        }
                    } else if (j == oneFlyData.length - 4) {
                        isAttack[i] = oneFlyData[j];
                    } else if (j == oneFlyData.length - 3) {
                        isCollision[i] = oneFlyData[j];
                    } else if (j == oneFlyData.length - 2) {
                        hops = splitData(oneFlyData[j], "*");
                        index++;  //必须有，否则会出错．因为只需要真实飞机的数量
                        if (index < flyIndictor) {
                            for (var k = 0; k < hops.length; k++) {
                                table[i][k] = hops[k];
                            }
                        }

                    } else if (j == oneFlyData.length - 1) {
                        // console.log(oneFlyData[j]);
                        send_Rec_Packet = splitData(oneFlyData[j], "*");
                        send[i] = send_Rec_Packet[0];
                        recv[i] = send_Rec_Packet[1];
                    }
                }
            } else {
                //获取本地实验选择，并传递相应的参数
                // experOption = localStorage.getItem("experOption");
                // if (experOption[0][0] == 1 || experOption[0][1] == 1) {
                // console.log(experOption);
                var dataInfictor = splitData(sumData[i], "*");
                var entireData = splitData(dataInfictor[0] + ",", ",");//前三个指标，丢包率和吞吐量
                var flockData = splitData(dataInfictor[dataInfictor.length - 1] + ",", ",");
                for (var k = 0; k < entireData.length; k++) {
                    if (k == 0) {
                        netLostPackage = entireData[k];
                    } else if (k == 1) {
                        totalLostPackage = parseFloat(entireData[k]).toFixed(2);
                    } else if (k == 2) {
                        netThrough = parseFloat(entireData[k]).toFixed(2);
                    }
                }

                //延迟图指标相关
                for (var k = 1; k < dataInfictor.length - 1; k++) {
                    if (k % 2 != 0 && k != dataInfictor.length - 2) {
                        delayLable[LableIndex++] = dataInfictor[k];
                    } else if (k % 2 == 0) {
                        delayData[dataIndex++] = parseFloat(dataInfictor[k] / 1000).toFixed(2);
                    } else {
                        avgDelay = parseFloat(dataInfictor[k] / 1000).toFixed(2);
                    }
                }

            }
        }
        // console.log(table);
        // console.log("target:" + target);
        // console.log("是否受攻击:" + isAttack);
        // console.log("丢包率" + netLostPackage);
        // console.log("吞吐量" + netThrough);
        // console.log("延迟的标签" + delayLable);
        // console.log("延迟的数值" + delayData);
        // console.log("平均延迟" + avgDelay);
        // console.log("scal" + parseFloat(flockData[0]).toFixed(2));
        // console.log("是否碰撞:" + isCollision);
        // console.log(send);

        setOptions(flyName, x, y, target, isAttack, netLostPackage, totalLostPackage, netThrough, delayLable, delayData, avgDelay, parseFloat(flockData[0]).toFixed(2), parseFloat(flockData[1]).toFixed(2), parseFloat(flockData[2]).toFixed(2), isCollision, send, recv,table);
    }




    //发送消息
    function sendInfo(socket, flag) {

        var experConfigPara = splitData(localStorage.getItem("parasCompare") + ",", ",");
        experConfigPara[0] = experFlag;

        if (flag == 1) {
            socket.send(experConfigPara);

        } else {
            socket.send(flag);
        }

    }

    //处理数据，以chat字符结尾，若尾部没有则需添个
    function splitData(str, chat) {
        var substr = '';
        var sb = [];
        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) != chat) {
                substr += str.charAt(i);
            } else {
                sb.push(substr);
                substr = "";
            }
        }
        return sb;
    }

})
