$(function () {

    //绑定switcher事件
    var flagSwitch = true;
    $.switcher();

    chooseFly = 0;
    $(".chooseFly").change(function () {
        var index = $(this).get(0).selectedIndex;
        if (index != 0) {
            chooseFly = parseInt(index);
        }
    })

    $(".switch_button").click(function () {
        if (flagSwitch) {
            $(".unit").show();
            $("#flockChart_1").hide();
            $("#flockChart_2").hide();
            $("#flockChart_3").hide();
            flagSwitch = false;
        } else {
            $("#flockChart_1").show();
            $("#flockChart_2").show();
            $("#flockChart_3").show();
            $(".unit").hide();
            flagSwitch = true;
        }
    });


    // 实验步骤
    var flag = true;
    var flagGuide = true;
    $(".major_left>h3").click(function () {
        if (flagGuide) {
            $(this).siblings("ul").hide();
            flagGuide = false;
        } else {
            $(this).siblings("ul").show();
            flagGuide = true;
        }
    })

    //实验步骤标题点击
    $(".exper_guide_title").click(function () {
        console.log($(this).index());
        
        if (flag) {
            $(this).siblings(".exper_guide_content").hide();
            flag = false;
        } else {
            $(this).siblings(".exper_guide_content").show();
            flag = true;
        }
    });


    //各实验步骤
    var textGuide = ["分别选择'场景配置'，'协同控制模型配置'，'集群组网配置'，观察默认配置，点击确认",
        "选择'集群组网配置'，将'路由协议'参数改为'静态路由'，点击确认",
        "选择'集群组网配置'，将'通信距离'参数改为'60'，点击确认"];

    var textGuide_2 = ["分别选择'场景配置'，'协同控制模型配置'，'GPS欺骗配置'，观察默认配置，点击确认",
        "选择'GPS欺骗配置'，将'欺骗方差'参数改为'0.1'，点击确认",
        "选择'GPS欺骗配置'，将'欺骗均值'参数改为'800'，点击确认"];

    var textGuide_3 = ["分别选择'场景配置'，'协同控制模型配置'，'网络攻击配置'，观察默认配置，点击确认",
        "选择'网络攻击配置'，将'丢弃率'参数改为'100%'，点击确认",
        "选择'网络攻击配置'，将'攻击节点'参数改为'1,7'，点击确认"
    ];


    //配置填入
    var paras = splitData(localStorage.getItem("parasCompare") + ",", ",");
    configFill($(".contro_config_content > p:odd"), 1, 6);
    console.log(paras);

    //通信距离获取
    if (experFlag == 0 || experFlag == 1) {
        comDistance = paras[8];
        console.log(comDistance);
    } else if (experFlag == 2 || experFlag == 3) {
        comDistance = paras[12];
        console.log(comDistance);
    }else if (experFlag == 4 || experFlag == 5){
        comDistance = paras[18];
    }

    //填充步骤
    var configSucFlag = splitData(localStorage.getItem("configSucFlag") + ",", ",");//获取实验进度
    var configIndex = -1;

    //判断实验标记，，做相应操作，填入实验步骤，标题变化，填入相关配置
    switch (experFlag) {
        case 0:
            setExperConfig(textGuide);
            $(".major>p").text("无人机集群组网协同实验")
            configFill($(".net_config_content > p:odd"), 7, 10);
            break;
        case 1:
            setExperConfig(textGuide);
            $(".major>p").text("无人机集群组网协同实验")
            configFill($(".net_config_content > p:odd"), 7, 10);
            break;
        case 2:
            setExperConfig(textGuide_2);
            $(".major > p").text("无人机集群信号欺骗实验")
            configFill($(".gps_config_content > p:odd"), 11, 16);
            break;
        case 3:
            setExperConfig(textGuide_2);
            $(".major > p").text("无人机集群信号欺骗实验")
            configFill($(".gps_config_content > p:odd"), 11, 16);
            break;
        case 4:
            setExperConfig(textGuide_3);
            $(".major > p").text("无人机集群网络攻击实验")
            configFill($(".attack_config_content > p:odd"), 17, 23);
            break;
        case 5:
            setExperConfig(textGuide_3);
            $(".major > p").text("无人机集群网络攻击实验")
            configFill($(".attack_config_content > p:odd"), 17, 23);
            break;
    };


    //删除多余步骤
    for (var i = textGuide.length; i < 5; i++) {
        $(".exper_guide_title").eq(3).remove();
        $(".exper_guide_content").eq(3).remove();
    }


    //默认显示场景1
    // $(".scene_content_choose>li").eq(0).css("background-color", "#FFAA33");
    // $(".scene_content_show>li").eq(0).css("background", "url(./images/ring.png) no-repeat center/100%")
    // $(".scene_content_show>li").eq(2).css("background", "url(./images/line.png) no-repeat center/100%")

    //配置点击
    $(".contro").click(function () {
        $(".contro_config").css("display", "block");
    });
    $(".contro_config_login_button").click(function () {
        $(".contro_config").css("display", "none");
    });

    $(".net").click(function () {
        $(".net_config").css("display", "block");
    });

    $(".net_config_login_button").click(function () {
        $(".net_config").css("display", "none");
    });
    $(".gps").click(function () {
        $(".gps_config").css("display", "block");
    });

    $(".gps_config_login_button").click(function () {
        $(".gps_config").css("display", "none");
    });

    $(".attack").click(function () {
        $(".attack_config").css("display", "block");
    });

    $(".attack_config_login_button").click(function () {
        $(".attack_config").css("display", "none");
    });

    //左上角关闭按钮
    $(".contro_config_close_login").click(function () {
        $(".contro_config").css("display", "none");
    });
    $(".net_config_close_login").click(function () {
        $(".net_config").css("display", "none");
    });
    $(".gps_config_close_login").click(function () {
        $(".gps_config").css("display", "none");
    });
    $(".attack_config_close_login").click(function () {
        $(".attack_config").css("display", "none");
    });



    //试验结束确定关闭功能
    $(".exit_button").click(function () {
        $(".exit_window").hide();
    })

    //根据标记显示按钮  
    switch (experFlag) {
        case 0:
            $(".footer>div>ul>li").eq(2).css("color", "#CCCCCC");
            $(".footer>div>ul>li").eq(3).css("color", "#CCCCCC");
            $(".footer>div>ul>li").eq(2).css("background-color", "#666666");
            $(".footer>div>ul>li").eq(3).css("background-color", "#666666");
            break;
        case 1:
            $(".footer>div>ul>li").eq(2).css("color", "#CCCCCC");
            $(".footer>div>ul>li").eq(3).css("color", "#CCCCCC");
            $(".footer>div>ul>li").eq(2).css("background-color", "#666666");
            $(".footer>div>ul>li").eq(3).css("background-color", "#666666");
            break;
        case 2:
            $(".footer>div>ul>li").eq(1).css("color", "#CCCCCC");
            $(".footer>div>ul>li").eq(3).css("color", "#CCCCCC");
            $(".footer>div>ul>li").eq(1).css("background-color", "#666666");
            $(".footer>div>ul>li").eq(3).css("background-color", "#666666");
            break;
        case 3:
            $(".footer>div>ul>li").eq(1).css("color", "#CCCCCC");
            $(".footer>div>ul>li").eq(3).css("color", "#CCCCCC");
            $(".footer>div>ul>li").eq(1).css("background-color", "#666666");
            $(".footer>div>ul>li").eq(3).css("background-color", "#666666");
            break;
        case 4:
            $(".footer>div>ul>li").eq(1).css("color", "#CCCCCC");
            $(".footer>div>ul>li").eq(2).css("color", "#CCCCCC");
            $(".footer>div>ul>li").eq(1).css("background-color", "#666666");
            $(".footer>div>ul>li").eq(2).css("background-color", "#666666");
            break;
        case 5:
            $(".footer>div>ul>li").eq(1).css("color", "#CCCCCC");
            $(".footer>div>ul>li").eq(2).css("color", "#CCCCCC");
            $(".footer>div>ul>li").eq(1).css("background-color", "#666666");
            $(".footer>div>ul>li").eq(2).css("background-color", "#666666");
            break;
    }


    //填充配置
    function configFill(dom, head, tail) {
        $.each(dom, function (index, element) {
            $(element).text(paras[head]);
            if (tail != head) {
                head++;
            }
        })
    }


    //添加实验步骤
    function setExperConfig(text) {
        for (var i = 0; i < text.length; i++) {
            $(".exper_guide_content").eq(i).text(text[i]);
        }

        for (var i = 0; i < text.length; i++) {
            if (configSucFlag[i] != "1") {
                configIndex = i - 1;  //判断此时处于哪种配置
                break;
            } else {
                configIndex = text.length - 1;
            }
        }

        // console.log(configIndex);
        for (var i = 0; i < text.length; i++) {
            if (i < configIndex) {
                $(".exper_guide_title").eq(i).css("color", "#00ff00");
                $(".exper_guide_content").eq(i).css("color", "#00ff00"); //绿色
                $(".exper_guide_content").eq(i).hide();
            } else if (i == configIndex) {
                $(".exper_guide_title").eq(i).css("color", "#FFAA33");
                $(".exper_guide_content").eq(i).css("color", "#FFAA33"); //橙色
            } else {
                $(".exper_guide_content").eq(i).hide();
            }
        }
    }

});
