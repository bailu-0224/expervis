$(function () {

    var experIndex_1 = -1;  //选择大实验的标记
    var experIndex_2 = -1;  //选择小实验的标记
    var choose_index = -1;
    var PageName = window.location.href.split('/');

    //1.选择大实验
    $(".tab_list>li").click(function () {
        //排他思想
        $(this).siblings().children("ul").hide();
        $(this).siblings().children("a").css("background-color", "rgba(0, 0, 0, 0)");
        choose_index = $(this).index();
        if (choose_index != 0) {
            $(".choose_window").show();
        }
        // 判断选择实验类型，实验一，二，三
        switch (choose_index) {
            case 2:
                experIndex_1 = 0;
                $(".choose_window > p").text("无人机集群组网协同实验");
                $(".choose_content > p").text("实验一");
                break;
            case 4:
                experIndex_1 = 1;
                $(".choose_window > p").text("无人机集群信号欺骗实验");
                $(".choose_content >p").text("实验二");
                break;
            case 6:
                experIndex_1 = 2;
                $(".choose_window > p").text("无人机集群网络攻击实验");
                $(".choose_content > p").text("实验三");
                break;
        }

    })

    //2.选择小实验
    $(".choose_button").click(function () {
        $(".choose_window").hide();
        $(".tab_list>li").eq(choose_index).siblings().children("a").css("background", "rgba(0, 0, 0, 0)");
        $(".tab_list>li").eq(choose_index).children("ul").show();
        $(".tab_list>li").eq(choose_index).children("a").css("background-color", "##B5570B");
    })

    // 3.给选择实验加绑定事件
    $(".exper_choose>ul>li").click(function () {
        experIndex_2 = $(this).index();
        exper[experIndex_1][experIndex_2] = 1; //最终选择哪个实验的标记
        localStorage.clear();//清楚做实验历史信息
        localStorage.setItem("experOption", exper)
    })

    //实验简介
    $(".exper_intro").click(function () {
        $(".intro_window > p").text("实验简介");
        // $(".process_window > p").css("margin", "0px 114px");
        $(".intro_content #intro > p").text("在无人机集群协同避障的场景下，理解无人机信号欺骗与无人机协同控制之间的互相影响关系。学生首先选择无人机仿真场景，根据实验步骤提示，在不同的GPS欺骗配置下进行仿真实验，观察相应的仿真结果.无人机集群协同避障的场景下，理解无人机信号欺骗与无人机协同控制之间的互相影响关系。学生首先选择无人机仿真场景，根据实验步骤提示，在不同的GPS欺骗配置下进行仿真实验，观察相应的仿真结果");
        $(".intro_window").show();
    })

    $(".intro_button").click(function () {
        $(".intro_window").hide();
        $(this).children("a").css("background-color", "rgba(0, 0, 0, 0)");
    })


    //right
    //1.退出
    if (PageName[PageName.length - 1] != "experIndex.html" && PageName[PageName.length - 1] != "experConfig.html") {
        $(".exit").click(function () {
            window.location.href = "experConfig.html";
        })
    }

    //关闭
    //信息展示窗口方法
    function infoShow(domEle, title, content) {
        $(domEle).click(function () {
            $(".kno_title p").text(title);
            $(".kno_content_detail").text(content)
            $(".kno_window").css("display", "block");
        });
        $(".kno_login_button,.kno_close_login").click(function () {
            $(".kno_window").css("display", "none");
        })
    }

    //欢迎主界面
    $(".wel_login_button").click(function () {
        $(".wel_window").hide();
    });


    function getDubArray(n, m) {
        var tArray = new Array();  //先声明一维
        for (var i = 0; i < n; i++) {    //一维长度为i,i为变量，可以根据实际情况改变

            tArray[i] = new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；

            for (var j = 0; j < m; j++) {   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；

                tArray[i][j] = "";    //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
            }
        }
        return tArray;
    }

});
