$(function () {

    //各实验步骤
    // var textGuide = ["分别选择'场景配置'，'协同控制模型配置'，'集群组网配置'，观察默认配置，点击确认",
    //     "选择'集群组网配置'，将'路由协议'参数改为'静态路由'，点击确认",
    //     "选择'集群组网配置'，将'通信距离'参数改为'60'，点击确认"];

    // var textGuide_2 = ["分别选择'场景配置'，'协同控制模型配置'，'GPS欺骗配置'，观察默认配置，点击确认",
    //     "选择'GPS欺骗配置'，将'欺骗方差'参数改为'0.1'，点击确认",
    //     "选择'GPS欺骗配置'，将'欺骗均值'参数改为'800'，点击确认"];

    // var textGuide_3 = ["分别选择'场景配置'，'协同控制模型配置'，'网络攻击配置'，观察默认配置，点击确认",
    //     "选择'网络攻击配置'，将'丢弃率'参数改为'100%'，点击确认",
    //     "选择'网络攻击配置'，将'攻击节点'参数改为'1,7'，点击确认"
    // ];

    var textGuide_0 = ["分别选择'协同控制模型配置'，'集群组网配置'，观察默认配置，点击确认",
        "1.选择'集群组网配置'，将'路由协议'改为'静态路由'，'通信间隔'改为'0.6'，观察实验现象;\n2.选择'集群组网配置'，将'通信距离'改为'60'，观察实验现象;\n3.选择'集群组网配置'，将'通信间隔'改为'0.4'，观察实验现象;\n4.选择'集群组网配置'，将'通信间隔'改为'0.2'，观察实验现象",
        "1.选择'集群组网配置'，将'通信距离'改为'20'，选择'协同控制模型配置'，将'感知距离'改为'30'，观察实验现象;\n2.选择'集群组网配置'，将'路由协议'改为'AODV'，观察实验现象;\n3.选择'协同控制模型配置'，将'感知距离'改为'50'，观察实验现象"];

    var textGuide_1 = ["分别选择'协同控制模型配置'，'GPS欺骗配置'，观察默认配置，点击确认",
        "1.选择'集群组网配置'，将'路由协议'改为'静态路由'，'通信间隔'改为'0.6'，观察实验现象;\n2.选择'集群组网配置'，将'通信距离'改为'50'，观察实验现象;\n3.选择'集群组网配置'，将'通信间隔'改为'0.4'，观察实验现象;\n4.选择'集群组网配置'，将'通信间隔'改为'0.2'，观察实验现象",
        "1.选择'集群组网配置'，将'通信距离'改为'11'，观察实验现象;\n2.选择'协同控制模型配置'，将'平衡距离'改为'4'，观察实验现象;\n3.选择'集群组网配置'，将'路由协议'改为'AODV'，观察实验现象;\n4.选择'协同控制模型配置'，将'平衡距离'改为'3'，观察实验现象"];

    var textGuide_2 = ["分别选择'协同控制模型配置'，'GPS欺骗配置'，观察默认配置，点击确认",
        "1.选择'GPS欺骗配置'，将'欺骗均值'改为'0'，'欺骗方差'改为'0'，'欺骗数量'改为'0'，观察实验现象;\n2.选择'GPS欺骗配置'，将'欺骗均值'改为'550'，'欺骗方差'改为'0.5'，'欺骗数量'改为'2'，'欺骗位置'改为'5,6'，观察实验现象;\n3.选择'GPS欺骗配置'，将'欺骗均值'改为'250'，'欺骗方差'改为'0.1'，观察实验现象;\n4.选择'GPS欺骗配置'，将'欺骗均值'改为'50'，'欺骗方差'改为'0.01'，观察实验现象;\n5.选择'GPS欺骗配置'，将'欺骗均值'改为'550'，'欺骗方差'改为'0.5'，'欺骗数量'改为'4'，'欺骗位置'改为'3,4,5,6'，观察实验现象",
        "1.选择'GPS欺骗配置'，'欺骗方差'改为'0.1'，'欺骗数量'改为'2'，'欺骗位置'改为'5,6'，'通讯距离'改为'13'，观察实验现象;\n2.选择'GPS欺骗配置'，'通讯距离'改为'15'，观察实验现象;\n3.选择'GPS欺骗配置'，'通讯距离'改为'30'，选择'协同控制模型配置'，将'感知范围'改为'30'，观察实验现象;\n4.选择'GPS欺骗配置'，'欺骗数量'改为'4'，'欺骗位置'改为'3,4,5,6'，观察实验现象"
    ];

    var textGuide_3 = ["分别选择'协同控制模型配置'，'GPS欺骗配置'，观察默认配置，点击确认",
        "1.选择'GPS欺骗配置'，将'欺骗均值'改为'0'，'欺骗方差'改为'0'，'欺骗数量'改为'0'，观察实验现象;\n2.选择'GPS欺骗配置'，将'欺骗均值'改为'550'，'欺骗方差'改为'0.5'，'欺骗数量'改为'2'，'欺骗位置'改为'0,3'，观察实验现象;\n3.选择'GPS欺骗配置'，将'欺骗均值'改为'350'，'欺骗方差'改为'0.1'，观察实验现象;\n4.选择'GPS欺骗配置'，将'欺骗均值'改为'50'，'欺骗方差'改为'0.01'，观察实验现象;\n5.选择'GPS欺骗配置'，将'欺骗均值'改为'550'，'欺骗方差'改为'0.5'，'欺骗数量'改为'4'，'欺骗位置'改为'0,1,2,3'，观察实验现象",
        "1.选择'GPS欺骗配置'，'欺骗均值'改为'50'，'欺骗方差'改为'0.1'，'欺骗数量'改为'2'，'欺骗位置'改为'0,3'，选择'协同控制模型配置'，将'平衡距离'改为'9',观察实验现象;\n2.选择'GPS欺骗配置'，'欺骗均值'改为'250'，选择'协同控制模型配置'，将'平衡距离'改为'7'，观察实验现象;\n3.选择'GPS欺骗配置'，'欺骗均值'改为'550'，选择'协同控制模型配置'，将'平衡距离'改为'5'，观察实验现象;\n4.选择'GPS欺骗配置'，'欺骗均值'改为'150'，'欺骗数量'改为'4'，'欺骗节点'改为'0,1,2,3'，选择'协同控制模型配置'，将'平衡距离'改为'9'，观察实验现象，观察实验现象"];

    var textGuide_4 = ["分别选择'协同控制模型配置'，'网络攻击配置'，观察默认配置，点击确认",
        "1.选择'网络攻击配置'，将'丢弃率'改为'50%'，'攻击数量'改为'3'，'攻击节点'改为'2,4,6'，观察实验现象;\n2.选择'网络攻击配置'，将'丢弃率'改为'100%'，观察实验现象;\n3.选择'网络攻击配置'，将'丢弃率'改为'50%'，'攻击节点'改为'0,4,8',观察实验现象;\n4.选择'网络攻击配置'，将'攻击数量'改为'4'，'攻击节点'改为'1,3,5,7'，观察实验现象",
        "1.选择'网络攻击配置'，将'丢弃率'改为'100%'，'攻击数量'改为'3'，'攻击节点'改为'2,4,6'，观察实验现象;\n2.选择'协同控制模型配置'，将'对齐强度'改为'15','平衡距离'改为'4'，观察实验现象;\n3.选择'协同控制模型配置'，将'平衡距离'改为'6'，观察实验现象;\n4.选择'网络攻击配置'，将'通信距离'改为'10'，选择'协同控制模型配置'，将'感知距离'改为'20'，观察实验现象"];

    var textGuide_5 = ["分别选择'协同控制模型配置'，'网络攻击配置'，观察默认配置，点击确认",
        "1.选择'网络攻击配置'，将'丢弃率'改为'50%'，'攻击数量'改为'3'，'攻击节点'改为'1,3,7'，观察实验现象;\n2.选择'网络攻击配置'，将'丢弃率'改为'100%','攻击数量'改为'4'，'攻击节点'改为'1,3,5,7'，观察实验现象;\n3.选择'网络攻击配置'，将'丢弃率'改为'50%'，观察实验现象;\n4.选择'网络攻击配置'，将'丢弃率'改为'100%'，'攻击节点'改为'0,2,6,8'，观察实验现象",
        "1.选择'网络攻击配置'，将'丢弃率'改为'100%'，'攻击数量'改为'4'，'攻击节点'改为'1,3,5,7'，观察实验现象;\n2.选择'协同控制模型配置'，将'编队强度'改为'1','对齐强度'改为'15'，'平衡距离'改为'3'，观察实验现象;\n3.选择'协同控制模型配置'，将'对齐强度'改为'15'，将'编队强度'改为'1.5'，观察实验现象;\n4.选择'网络攻击配置'，将'通信距离'改为'10'，选择'协同控制模型配置'，将'感知距离'改为'20'，观察实验现象"];

    var config_0 = [
        ["1", "6", "45", "6", "10", "2", "1", "0.2", "15", "AODV", "11", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["1", "6", "45", "6", "10", "2", "1", "0.6", "15", "静态路由", "11", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["1", "6", "45", "6", "10", "2", "1", "0.6", "60", "静态路由", "11", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["1", "6", "45", "6", "10", "2", "1", "0.2", "60", "静态路由", "11", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["1", "6", "30", "6", "10", "2", "1", "0.2", "20", "静态路由", "11", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["1", "6", "30", "6", "10", "2", "1", "0.2", "20", "AODV", "11", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["1", "6", "50", "6", "10", "2", "1", "0.2", "20", "AODV", "11", "", "", "", "", "", "", "", "", "", "", "", ""]];

    var config_1 = [
        ["1", "3", "30", "6", "10", "2", "2.1", "0.2", "10", "AODV", "11", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["1", "3", "30", "6", "10", "2", "2.1", "0.6", "10", "静态路由", "11", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["1", "3", "30", "6", "10", "2", "2.1", "0.6", "50", "静态路由", "11", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["1", "3", "30", "6", "10", "2", "2.1", "0.2", "50", "静态路由", "11", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["1", "3.5", "30", "6", "10", "2", "2.1", "0.2", "8", "静态路由", "11", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["1", "3.5", "30", "6", "10", "2", "2.1", "0.2", "8", "AODV", "11", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["1", "4.5", "30", "6", "10", "2", "2.1", "0.2", "8", "AODV", "11", "", "", "", "", "", "", "", "", "", "", "", ""]];

    var config_2 = [
        ["1", "7", "30", "6", "10", "1.5", "1.5", "", "", "", "", "AODV", "15", "2", "5，6", "0", "0", "", "", "", "", "", ""],
        ["1", "7", "30", "6", "10", "1.5", "1.5", "", "", "", "", "AODV", "15", "2", "5，6", "500", "0.5", "", "", "", "", "", ""],
        ["1", "7", "30", "6", "10", "1.5", "1.5", "", "", "", "", "AODV", "15", "2", "5，6", "150", "0.01", "", "", "", "", "", ""]];

    var config_3 = [
        ["1", "5", "40", "4", "10", "2", "2", "", "", "", "", "AODV", "15", "2", "0，3", "0", "0", "", "", "", "", "", ""],
        ["1", "5", "40", "4", "10", "2", "2", "", "", "", "", "AODV", "15", "2", "0，3", "500", "0.5", "", "", "", "", "", ""],
        ["1", "5", "40", "4", "10", "2", "2", "", "", "", "", "AODV", "15", "2", "0，3", "250", "0.5", "", "", "", "", "", ""],
        ["1", "5", "40", "4", "10", "2", "2", "", "", "", "", "AODV", "15", "2", "0，3", "250", "0.1", "", "", "", "", "", ""],
        ["1", "7", "40", "4", "10", "2", "2", "", "", "", "", "AODV", "15", "2", "0，3", "250", "0.1", "", "", "", "", "", ""],
        ["1", "7", "40", "4", "10", "2", "2", "", "", "", "", "AODV", "15", "2", "0，3", "50", "0.1", "", "", "", "", "", ""],
        ["1", "9", "40", "4", "10", "2", "2", "", "", "", "", "AODV", "15", "2", "0，3", "50", "0.1", "", "", "", "", "", ""]];

    var config_4 = [
        ["1", "6", "40", "6", "10", "1.5", "1.5", "", "", "", "", "", "", "", "", "", "", "AODV", "15", "4", "0，2，6，8", "无攻击", "50%"],
        ["1", "6", "40", "6", "10", "1.5", "1.5", "", "", "", "", "", "", "", "", "", "", "AODV", "15", "4", "0，2，6，8", "黑洞攻击", "50%"],
        ["1", "6", "40", "6", "10", "1.5", "1.5", "", "", "", "", "", "", "", "", "", "", "AODV", "15", "4", "1，3，5，7", "黑洞攻击", "50%"],
        ["1", "6", "40", "6", "10", "1.5", "1.5", "", "", "", "", "", "", "", "", "", "", "AODV", "15", "4", "1，3，5，7", "黑洞攻击", "100%"],
        ["1", "6", "40", "6", "5", "1.5", "1.5", "", "", "", "", "", "", "", "", "", "", "AODV", "15", "4", "1，3，5，7", "黑洞攻击", "100%"],
        ["1", "3", "40", "6", "5", "1", "1.5", "", "", "", "", "", "", "", "", "", "", "AODV", "15", "4", "1，3，5，7", "黑洞攻击", "100%"],
        ["1", "3", "20", "6", "5", "1", "1.5", "", "", "", "", "", "", "", "", "", "", "AODV", "10", "4", "1，3，5，7", "黑洞攻击", "100%"]];

    var config_5 = [
        ["1", "5", "35", "5", "10", "1.5", "2", "", "", "", "", "", "", "", "", "", "", "AODV", "15", "4", "0，2，6，8", "无攻击", "50%"],
        ["1", "5", "35", "5", "10", "1.5", "2", "", "", "", "", "", "", "", "", "", "", "AODV", "15", "4", "0，2，6，8", "黑洞攻击", "50%"],
        ["1", "5", "35", "5", "10", "1.5", "2", "", "", "", "", "", "", "", "", "", "", "AODV", "15", "4", "1，3，5，7", "黑洞攻击", "50%"],
        ["1", "5", "35", "5", "10", "1.5", "2", "", "", "", "", "", "", "", "", "", "", "AODV", "15", "4", "1，3，5，7", "黑洞攻击", "100%"],
        ["1", "5", "35", "5", "5", "1.5", "2", "", "", "", "", "", "", "", "", "", "", "AODV", "15", "4", "1，3，5，7", "黑洞攻击", "100%"],
        ["1", "3", "35", "5", "5", "1", "2", "", "", "", "", "", "", "", "", "", "", "AODV", "15", "4", "1，3，5，7", "黑洞攻击", "100%"],
        ["1", "3", "20", "5", "5", "1", "2", "", "", "", "", "", "", "", "", "", "", "AODV", "10", "4", "1，3，5，7", "黑洞攻击", "100%"]];


    var guide_0_0 = ["分别选择'协同控制模型配置'，'集群组网配置'，观察默认配置，点击确认"];
    var guide_0_1 = ["1.选择'集群组网配置'，将'路由协议'改为'静态路由'，'通信间隔'改为'0.6'，观察实验现象", "2.选择'集群组网配置'，将'通信距离'改为'60'，观察实验现象", "3.选择'集群组网配置'，将'通信间隔'改为'0.2'，观察实验现象"];
    var guide_0_2 = ["1.选择'集群组网配置'，将'通信距离'改为'20'，选择'协同控制模型配置'，将'感知距离'改为'30'，观察实验现象;", "2.选择'集群组网配置'，将'路由协议'改为'AODV'，观察实验现象", "3.选择'协同控制模型配置'，将'感知距离'改为'50'，观察实验现象"];

    var guide_1_0 = ["分别选择'协同控制模型配置'，'集群组网配置'，观察默认配置，点击确认"];
    var guide_1_1 = ["1.选择'集群组网配置'，将'路由协议'改为'静态路由'，'通信间隔'改为'0.6'，观察实验现象", "2.选择'集群组网配置'，将'通信距离'改为'50'，观察实验现象", "3.选择'集群组网配置'，将'通信间隔'改为'0.2'，观察实验现象"];
    var guide_1_2 = ["1.选择'集群组网配置'，将'通信距离'改为'8'，选择'协同控制模型配置'，将'平衡距离'改为'3.5',观察实验现象;", "2.选择'集群组网配置'，将'路由协议'改为'AODV'，观察实验现象", "3.选择'协同控制模型配置'，将'平衡距离'改为'4.5'，观察实验现象"];

    var guide_2_0 = ["分别选择'协同控制模型配置'，'GPS欺骗配置'，观察默认配置，点击确认"];
    var guide_2_1 = ["1.选择'GPS欺骗配置'，将'欺骗均值'改为'500'，'欺骗方差'改为'0.5'，观察实验现象", "2.选择'GPS欺骗配置'，将'欺骗均值'改为'250'，观察实验现象", "3.选择'GPS欺骗配置'，'欺骗方差'改为'0.1'，观察实验现象"];
    var guide_2_2 = ["1.选择'协同控制模型配置'，将'平衡距离'改为'7'，观察实验现象;", "2.选择'GPS欺骗配置'，将'欺骗均值'改为'50'，观察实验现象", "3.选择'协同控制模型配置'，将'平衡距离'改为'9'，观察实验现象"];

    var guide_3_0 = ["分别选择'协同控制模型配置'，'GPS欺骗配置'，观察默认配置，点击确认"];
    var guide_3_1 = ["1.选择'GPS欺骗配置'，将'欺骗均值'改为'500'，'欺骗方差'改为'0.5'，观察实验现象", "2.选择'GPS欺骗配置'，将'欺骗均值'改为'250'，观察实验现象;    ", "3.选择'GPS欺骗配置'，'欺骗方差'改为'0.1'，观察实验现象"];
    var guide_3_2 = ["1.选择'协同控制模型配置'，将'平衡距离'改为'7'，观察实验现象;", "2.选择'GPS欺骗配置'，将'欺骗均值'改为'50'，观察实验现象", "3.选择'协同控制模型配置'，将'平衡距离'改为'9'，观察实验现象"];

    var guide_4_0 = ["分别选择'协同控制模型配置'，'网络攻击配置'，观察默认配置，点击确认"];
    var guide_4_1 = ["1.选择'网络攻击配置'，将'攻击方式'改为'黑洞攻击'，观察实验现象;", "2.选择'网络攻击配置'，将'攻击节点'改为'1,3,5,7'观察实验现象", "3.选择'网络攻击配置'，将'丢弃率'改为'100%'，观察实验现象"];
    var guide_4_2 = ["1.选择'协同控制模型配置'，将'对齐强度'改为'5'，观察实验现象", "2.选择'协同控制模型配置'，将'平衡距离'改为'3'，将'编队强度'改为'1',观察实验现象;", "3.选择'协同控制模型配置'，将'感知范围'改为'20'，选择'网络攻击配置'，将'通信距离'改为'10'，观察实验现象"];

    var guide_5_0 = ["分别选择'协同控制模型配置'，'网络攻击配置'，观察默认配置，点击确认"];
    var guide_5_1 = ["1.选择'网络攻击配置'，将'攻击方式'改为'黑洞攻击'，观察实验现象;", "2.选择'网络攻击配置'，将'攻击节点'改为'1,3,5,7'观察实验现象", "3.选择'网络攻击配置'，将'丢弃率'改为'100%'，观察实验现象"];
    var guide_5_2 = ["1.选择'协同控制模型配置'，将'对齐强度'改为'5'，观察实验现象", "2.选择'协同控制模型配置'，将'平衡距离'改为'3'，将'编队强度'改为'1'，观察实验现象;", "3.选择'协同控制模型配置'，将'感知范围'改为'20'，选择'网络攻击配置'，将'通信距离'改为'10'，观察实验现象"];

    // 实验步骤,隐藏或者显示功能    
    var flag = [true,true,true];
    $(".exper_guide_title").click(function () {        
        var index = $(this).attr("value");
        console.log(index);
        if (flag[index]) {
            $(".exper_guide_con").eq(index).css("display","none");
            flag[index] = false;
        } else {
            $(".exper_guide_con").eq(index).css("display","block");
            flag[index] = true;
        }
    });


    var len1;
    var len2;
    var len3;
    var configLen;
    switch (experFlag) {
        case 0:
            len1 = guide_0_0.length;
            len2 = guide_0_1.length;
            len3 = guide_0_2.length;
            break;
        case 1:
            len1 = guide_1_0.length;
            len2 = guide_1_1.length;
            len3 = guide_1_2.length;
            break;
        case 2:
            len1 = guide_2_0.length;
            len2 = guide_2_1.length;
            len3 = guide_2_2.length;
            break;
        case 3:
            len1 = guide_3_0.length;
            len2 = guide_3_1.length;
            len3 = guide_3_2.length;
            break;
        case 4:
            len1 = guide_4_0.length;
            len2 = guide_4_1.length;
            len3 = guide_4_2.length;
            break;
        case 5:
            len1 = guide_5_0.length;
            len2 = guide_5_1.length;
            len3 = guide_5_2.length;
            break;

    }
    configLen = len1 + len2 + len3;
    var configSucFlag = getOneArray(configLen);//配置进行的标记        
    var experConfigPara = getOneArray(23);
    var configIndex = 0; //当前大配置完成进度索引, 0-0，1-1，2-2。。。
    var configSmallIndex = -1; //当前小配置完成进度索引
    //根据当前选择实验进行一些更改
    switch (experFlag) {
        case 0:
            setExperConfig(guide_0_0, $("#guide_0"));//填入实验进度
            setExperConfig(guide_0_1, $("#guide_1"));//填入实验进度
            setExperConfig(guide_0_2, $("#guide_2"));//填入实验进度
            // $(".exper_guide_title").ex(1).text("第二步(网络参数分析)")
            $(".process_window > p").text("实验一:无人机集群组网协同实验");
            $(".process_content > p").text("子实验一：在无人机集群协同编队变化的场景下，理解无人机飞行组网的特性，不同路由协议对无人机协同效果的影响。学生首先选择无人机仿真场景，根据实验步骤提示，在不同的网络配置下进行仿真实验，观察相应的仿真结果。");
            break;
        case 1:
            setExperConfig(guide_1_0, $("#guide_0"));//填入实验进度
            setExperConfig(guide_1_1, $("#guide_1"));//填入实验进度
            setExperConfig(guide_1_2, $("#guide_2"));//填入实验进度            
            $(".process_window > p").text("实验一:无人机集群组网协同实验");
            $(".process_content > p").text("子实验二：在无人机集群协同避障的场景下，理解无人机飞行组网的特性，不同路由协议对无人机协同效果的影响。学生首先选择无人机仿真场景，根据实验步骤提示，在不同的网络配置下进行仿真实验，观察相应的仿真结果。");
            break;
        case 2:
            setExperConfig(guide_2_0, $("#guide_0"));//填入实验进度
            setExperConfig(guide_2_1, $("#guide_1"));//填入实验进度
            setExperConfig(guide_2_2, $("#guide_2"));//填入实验进度
            $(".process_window > p").text("实验二:无人机集群信号欺骗实验");
            $(".process_window > p").css("margin", "0px 114px");
            $(".process_content > p").text("子实验一：在无人机集群协同编队变化的场景下，理解无人机信号欺骗与无人机协同控制之间的互相影响关系。学生首先选择无人机仿真场景，根据实验步骤提示，在不同的GPS欺骗配置下进行仿真实验，观察相应的仿真结果。");//填入步骤总结
            $(".net_attack_gps").text("GPS欺骗配置");
            break;
        case 3:
            setExperConfig(guide_3_0, $("#guide_0"));//填入实验进度
            setExperConfig(guide_3_1, $("#guide_1"));//填入实验进度
            setExperConfig(guide_3_2, $("#guide_2"));//填入实验进度
            $(".process_window > p").css("margin", "0px 114px");
            $(".process_window > p").text("实验二:无人机集群信号欺骗实验");
            $(".process_content > p").text("子实验二：在无人机集群协同避障的场景下，理解无人机信号欺骗与无人机协同控制之间的互相影响关系。学生首先选择无人机仿真场景，根据实验步骤提示，在不同的GPS欺骗配置下进行仿真实验，观察相应的仿真结果。");//填入步骤总结
            break;
        case 4:
            setExperConfig(guide_4_0, $("#guide_0"));//填入实验进度
            setExperConfig(guide_4_1, $("#guide_1"));//填入实验进度
            setExperConfig(guide_4_2, $("#guide_2"));//填入实验进度
            $(".process_window > p").text("实验三:无人机集群网络攻击实验");
            $(".process_content > p").text("子实验一：在无人机集群协同编队变化的场景下，理解黑洞攻击对于自组织网络的影响，理解无人机在遭受到网络攻击时的特点。学生首先选择无人机仿真场景，根据实验步骤提示，在不同的网络攻击配置下进行仿真实验，观察相应的仿真结果。");//填入步骤总结
            break;
        case 5:
            setExperConfig(guide_5_0, $("#guide_0"));//填入实验进度
            setExperConfig(guide_5_1, $("#guide_1"));//填入实验进度
            setExperConfig(guide_5_2, $("#guide_2"));//填入实验进度
            $(".process_window > p").css("margin", "0px 114px");
            $(".process_window > p").text("实验三:无人机集群网络攻击实验");
            $(".process_content > p").text("子实验二：在无人机集群协同避障的场景下，理解黑洞攻击对于自组织网络的影响，理解无人机在遭受到网络攻击时的特点。学生首先选择无人机仿真场景，根据实验步骤提示，在不同的网络攻击配置下进行仿真实验，观察相应的仿真结果。");//填入步骤总结
            break;
    }


    //判断是否开始做实验，创建本地实验步骤,以及实验配置   
    if (localStorage.getItem("configSucFlag") == null) {
        localStorage.setItem("configSucFlag", configSucFlag);
    }
    if (localStorage.getItem("experConfigPara") == null) {
        localStorage.setItem("experConfigPara", experConfigPara);
    }

    //取出本地的实验进度,判断做到哪一步又存入本地
    configSucFlag = splitData(localStorage.getItem("configSucFlag") + ",", ",");
    console.log(configSucFlag);
    console.log(configSucFlag.length);
    for (var i = 0; i < configSucFlag.length; i++) {

        if (configSucFlag[i] != "1") {
            configSmallIndex = i;
            break;
        }
        if (i == configSucFlag.length - 1) {
            configSmallIndex = configSucFlag.length;
        }
    }
    if (configSmallIndex < len1) {
        $(".exper_guide_title").eq(0).css("color", "#FFAA33");
    } else if (configSmallIndex < len1 + len2) {
        $(".exper_guide_con").eq(0).css("display","none");
        flag[0] = false;
        $(".exper_guide_title").eq(0).css("color", "#00ff00");
        $(".exper_guide_title").eq(1).css("color", "#FFAA33");
        configIndex = 1;
    } else if (configSmallIndex < len1 + len2 + len3) {
        $(".exper_guide_con").eq(0).css("display","none");
        flag[0] = false;
        $(".exper_guide_con").eq(1).css("display","none");
        flag[1] = false;        
        $(".exper_guide_title").eq(0).css("color", "#00ff00");
        $(".exper_guide_title").eq(1).css("color", "#00ff00");
        $(".exper_guide_title").eq(2).css("color", "#FFAA33");
        configIndex = 2;
    } else {
        $(".exper_guide_title").eq(0).css("color", "#00ff00");
        $(".exper_guide_title").eq(1).css("color", "#00ff00");
        $(".exper_guide_title").eq(2).css("color", "#00ff00");
        configIndex = 2;
    }

    for (var i = 0; i < configLen; i++) {
        if (i < configSmallIndex) {
            $(".exper_guide  p").eq(i).css("color", "#00ff00")
        } else {
            $(".exper_guide  p").eq(i).css("color", "#FFAA33")
            break;
        }
    }
    console.log(configSmallIndex);

    //取出上一次实验存入的实验参数配置
    experConfigPara = splitData(localStorage.getItem("experConfigPara") + ",", ",");
    console.log(configIndex);
    if (configIndex == 0) {
        console.log(experFlag);
        switch (experFlag) {
            case 0:
                changeConfigShow($(".contro_0 > .contro_config_content > select"), 1, config_0[0]);
                changeConfigShow($(".net_0 > .net_config_content > select"), 7, config_0[0]);
                changeConfigShow($(".gps_config_content > select"), 11, config_0[0]);
                changeConfigShow($(".attack_config_content > select"), 17, config_0[0]);
                break;
            case 1:
                changeConfigShow($(".contro_1 > .contro_config_content > select"), 1, config_1[0]);
                changeConfigShow($(".net_1 > .net_config_content > select"), 7, config_1[0]);
                changeConfigShow($(".gps_config_content > select"), 11, config_1[0]);
                changeConfigShow($(".attack_config_content > select"), 17, config_1[0]);
                break;
            case 2:
                changeConfigShow($(".contro_2 > .contro_config_content > select"), 1, config_2[0]);
                changeConfigShow($(".net_config_content > select"), 7, config_2[0]);
                changeConfigShow($(".gps_0 > .gps_config_content > select"), 11, config_2[0]);
                changeConfigShow($(".attack_config_content > select"), 17, config_2[0]);
                break;
            case 3:
                changeConfigShow($(".contro_3 > .contro_config_content > select"), 1, config_3[0]);
                changeConfigShow($(".net_config_content > select"), 7, config_3[0]);
                changeConfigShow($(".gps_1 > .gps_config_content > select"), 11, config_3[0]);
                changeConfigShow($(".attack_config_content > select"), 17, config_3[0]);
                break;
            case 4:

                changeConfigShow($(".contro_4 > .contro_config_content > select"), 1, config_4[0]);
                changeConfigShow($(".net_config_content > select"), 7, config_4[0]);
                changeConfigShow($(".gps_config_content > select"), 11, config_4[0]);
                changeConfigShow($(".attack_0 > .attack_config_content > select"), 17, config_4[0]);
                break;
            case 5:
                changeConfigShow($(".contro_5 > .contro_config_content > select"), 1, config_5[0]);
                changeConfigShow($(".net_config_content > select"), 7, config_5[0]);
                changeConfigShow($(".gps_config_content > select"), 11, config_5[0]);
                changeConfigShow($(".attack_1 > .attack_config_content > select"), 17, config_5[0]);
                break;
        }
    } else {
        //更改配置显示(不包括初始配置)
        console.log(experConfigPara);

        // changeConfigShow($(".contro_config_content > select"), 1, experConfigPara);
        // changeConfigShow($(".net_config_content > select"), 7, experConfigPara);
        // changeConfigShow($(".gps_config_content > select"), 11, experConfigPara);
        // changeConfigShow($(".attack_config_content > select"), 17, experConfigPara);
        switch (experFlag) {
            case 0:
                changeConfigShow($(".contro_0 > .contro_config_content > select"), 1, experConfigPara);
                changeConfigShow($(".net_0 > .net_config_content > select"), 7, experConfigPara);
                changeConfigShow($(".gps_config_content > select"), 11, experConfigPara);
                changeConfigShow($(".attack_config_content > select"), 17, experConfigPara);
                break;
            case 1:
                changeConfigShow($(".contro_1 > .contro_config_content > select"), 1, experConfigPara);
                changeConfigShow($(".net_1 > .net_config_content > select"), 7, experConfigPara);
                changeConfigShow($(".gps_config_content > select"), 11, experConfigPara);
                changeConfigShow($(".attack_config_content > select"), 17, experConfigPara);
                break;
            case 2:
                changeConfigShow($(".contro_2 > .contro_config_content > select"), 1, experConfigPara);
                changeConfigShow($(".net_config_content > select"), 7, experConfigPara);
                changeConfigShow($(".gps_0 > .gps_config_content > select"), 11, experConfigPara);
                changeConfigShow($(".attack_config_content > select"), 17, experConfigPara);
                break;
            case 3:
                changeConfigShow($(".contro_3 > .contro_config_content > select"), 1, experConfigPara);
                changeConfigShow($(".net_config_content > select"), 7, experConfigPara);
                changeConfigShow($(".gps_1 > .gps_config_content > select"), 11, experConfigPara);
                changeConfigShow($(".attack_config_content > select"), 17, experConfigPara);
                break;
            case 4:
                changeConfigShow($(".contro_4 > .contro_config_content > select"), 1, experConfigPara);
                changeConfigShow($(".net_config_content > select"), 7, experConfigPara);
                changeConfigShow($(".gps_config_content > select"), 11, experConfigPara);
                changeConfigShow($(".attack_0 > .attack_config_content > select"), 17, experConfigPara);
                break;
            case 5:
                changeConfigShow($(".contro_5 > .contro_config_content > select"), 1, experConfigPara);
                changeConfigShow($(".net_config_content > select"), 7, experConfigPara);
                changeConfigShow($(".gps_config_content > select"), 11, experConfigPara);
                changeConfigShow($(".attack_1 > .attack_config_content > select"), 17, experConfigPara);
                break;
        }
    }

    //协同，组网，gps,攻击配置
    $(".contro").click(function () {
        switch (experFlag) {
            case 0:
                $(".contro_0").css("display", "block");
                break;
            case 1:
                $(".contro_1").css("display", "block");
                break;
            case 2:
                $(".contro_2").css("display", "block");
                break;
            case 3:
                $(".contro_3").css("display", "block");
                break;
            case 4:
                $(".contro_4").css("display", "block");
                break;
            case 5:
                $(".contro_5").css("display", "block");
                break;
        }
    });

    $(".contro_config_login_button").click(function () {
        $(".contro_config").css("display", "none");
    });

    //点击确认后拿到相应的数值,初始都为默认值
    experConfigPara[0] = "1";
    switch (experFlag) {
        case 0:
            forEachDom($(".contro_0 .contro_config_content option:selected"), 1, 6);
            forEachDom($(".net_0 .net_config_content option:selected"), 7, 10);
            break;
        case 1:
            forEachDom($(".contro_1 .contro_config_content option:selected"), 1, 6);
            forEachDom($(".net_1 .net_config_content option:selected"), 7, 10);
            break;
        case 2:
            forEachDom($(".contro_2 .contro_config_content option:selected"), 1, 6);
            forEachDom($(".gps_0 .gps_config_content option:selected"), 11, 16);
            break;
        case 3:
            forEachDom($(".contro_3 .contro_config_content option:selected"), 1, 6);
            forEachDom($(".gps_1 .gps_config_content option:selected"), 11, 16);
            break;
        case 4:
            forEachDom($(".contro_4 .contro_config_content option:selected"), 1, 6);
            forEachDom($(".attack_0 .gps_config_content option:selected"), 17, 23);
            break;
        case 5:
            forEachDom($(".contro_5 .contro_config_content option:selected"), 1, 6);
            forEachDom($(".attack_1 .gps_config_content option:selected"), 17, 23);
            break;
    }

    $(".contro_config_login_button").click(function () {
        $(".contro_config").css("display", "none");
        switch (experFlag) {
            case 0:
                forEachDom($(".contro_0 .contro_config_content option:selected"), 1, 6);
                break;
            case 1:
                forEachDom($(".contro_1 .contro_config_content option:selected"), 1, 6);
                break;
            case 2:
                forEachDom($(".contro_2 .contro_config_content option:selected"), 1, 6);
                break;
            case 3:
                forEachDom($(".contro_3 .contro_config_content option:selected"), 1, 6);
                break;
            case 4:
                forEachDom($(".contro_4 .contro_config_content option:selected"), 1, 6);
                break;
            case 5:
                forEachDom($(".contro_5 .contro_config_content option:selected"), 1, 6);
                break;
        }
        localStorage.setItem("experConfigPara", experConfigPara);
    });


    $(".net_config_login_button").click(function () {
        $(".net_config").css("display", "none");
        switch (experFlag) {
            case 0:
                forEachDom($(".net_0 .net_config_content option:selected"), 7, 10);
                if (isEqual(config_0[configSmallIndex], experConfigPara)) {
                    configSucFlag[configSmallIndex] == "1";
                    //将配置信息存入
                    localStorage.setItem("experConfigPara", experConfigPara);
                }
                break;
            case 1:
                forEachDom($(".net_1 .net_config_content option:selected"), 7, 10);
                if (isEqual(config_1[configIndex], experConfigPara)) {
                    configSucFlag[experFlag][configIndex] == "1";
                    //将配置信息存入
                    localStorage.setItem("experConfigPara", experConfigPara);
                }
                break;
        }
    });

    $(".gps_config_login_button").click(function () {
        $(".gps_config").css("display", "none");
        switch (experFlag) {
            case 2:
                console.log(config_2[configIndex]);
                console.log(experConfigPara);
                forEachDom($(".gps_0 .gps_config_content option:selected"), 11, 16);
                if (isEqual(config_2[configSmallIndex], experConfigPara)) {
                    configSucFlag[configSmallIndex] == "1";
                    //将配置信息存入
                    localStorage.setItem("experConfigPara", experConfigPara);
                }
                break;
            case 3:
                forEachDom($(".gps_1 .gps_config_content option:selected"), 11, 16);
                if (isEqual(config_3[configSmallIndex], experConfigPara)) {
                    configSucFlag[configSmallIndex] == "1";
                    //将配置信息存入
                    localStorage.setItem("experConfigPara", experConfigPara);
                }
                break;
        }


    });

    $(".attack_config_login_button").click(function () {
        $(".attack_config").css("display", "none");
        switch (experFlag) {
            case 4:
                forEachDom($(".attack_0 .attack_config_content option:selected"), 17, 23);
                if (isEqual(config_4[configSmallIndex], experConfigPara)) {
                    configSucFlag[configSmallIndex] == "1";
                    //将配置信息存入
                    localStorage.setItem("experConfigPara", experConfigPara);
                }
                break;
            case 5:
                forEachDom($(".attack_1 .attack_config_content option:selected"), 17, 23);
                if (isEqual(config_5[configSmallIndex], experConfigPara)) {
                    configSucFlag[configSmallIndex] == "1";
                    //将配置信息存入
                    localStorage.setItem("experConfigPara", experConfigPara);
                }
                break;
        }

    });

    //根据实验选择相应配置按钮高亮
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

    //配置点击
    $(".net").click(function () {
        switch (experFlag) {
            case 0:
                $(".net_0").css("display", "block");
                break;
            case 1:
                $(".net_1").css("display", "block");
                break;
        }
    });

    $(".gps").click(function () {
        switch (experFlag) {
            case 2:
                $(".gps_0").css("display", "block");
                break;
            case 3:
                $(".gps_1").css("display", "block");
                break;
        }
    });

    $(".attack").click(function () {
        switch (experFlag) {
            case 4:
                $(".attack_0").css("display", "block");
                break;
            case 5:
                $(".attack_1").css("display", "block");
                break;
        }
    });


    //左上角关闭按钮
    $(".scene_config_close_login").click(function () {
        $(".scene_config").css("display", "none");
    });

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

    //实验步骤提示窗口确认
    $(".process_login_button").click(function () {
        $(".process_window").hide()
    })

    //步骤相关方法
    //删除多余步骤
    for (var i = textGuide_0.length; i < 5; i++) {
        $(".exper_guide_title").eq(3).remove();
        $(".exper_guide_content").eq(3).remove();
    }

    //退出按钮
    $(".exit").click(function () {
        window.location.href = "experIndex.html";
    })

    var configCompare;
    var parasCompare;

    //开始仿真按钮
    $(".start").click(function () {
        switch (experFlag) {
            case 0:
                configCompare = config_0;
                break;
            case 1:
                configCompare = config_1;
                break;
            case 2:
                configCompare = config_2;
                break;
            case 3:
                configCompare = config_3;
                break;
            case 4:
                configCompare = config_4;
                break;
            case 5:
                configCompare = config_5;
                break;
        }

        parasCompare = experConfigPara;
        localStorage.setItem("parasCompare", parasCompare);

        if (isEqual(tranArray(configCompare[configSmallIndex]), tranArray(experConfigPara))) {
            configSucFlag[configSmallIndex] = "1";
            localStorage.setItem("experConfigPara", experConfigPara);
            localStorage.setItem("configSucFlag", configSucFlag);
        }
        window.location.href = "experMajor.html"
    })


    //根据选择数量改变坐标
    var gps_val = ["5，6", "4，5"];
    var gps_text = ["5,6", "4,5"];
    var gps_val_1 = ["0，1", "0，3"];
    var gps_text_1 = ["0,1", "0,3"];
    $(".gps_number").change(function () {
        var index = $(this).get(0).selectedIndex;
        switch (experFlag) {
            case 2:
                if (index == 0) {
                    for (var i = 0; i < gps_text.length; i++) {
                        $('.gps_node_0 > option').eq(i).show();
                        $('.gps_node_0 > option').eq(i).val(gps_val[i]);
                        $('.gps_node_0 > option').eq(i).text(gps_text[i])
                    }
                } else {
                    for (var i = 0; i < gps_text.length; i++) {
                        $('.gps_node_0 > option').eq(i).hide();
                        $('.gps_node_0 > option').eq(i).hide();
                    }
                    $('.gps_node_0 > option').eq(0).show();
                    $('.gps_node_0 > option').eq(0).val("3，4，5，6");
                    $('.gps_node_0 > option').eq(0).text("3,4,5,6");
                }
                break;
            case 3:
                if (index == 0) {
                    for (var i = 0; i < gps_text.length; i++) {
                        $('.gps_node_1 > option').eq(i).show();
                        $('.gps_node_1 > option').eq(i).val(gps_val_1[i]);
                        $('.gps_node_1 > option').eq(i).text(gps_text_1[i])
                    }
                } else {
                    for (var i = 0; i < gps_text.length; i++) {
                        $('.gps_node_1 > option').eq(i).hide();
                        $('.gps_node_1 > option').eq(i).hide();
                    }
                    $('.gps_node_1 > option').eq(0).show();
                    $('.gps_node_1 > option').eq(0).val("0，1，2，3");
                    $('.gps_node_1 > option').eq(0).text("0,1,2,3");
                }
                break;

        }
    });


    var attack_val = ["2，4，6", "0，4，8"];
    var attack_text = ["2,4,6", "0,4,8"];
    var attack_val_1 = ["0，2，6，8", "1，3，5，7"];
    var attack_text_1 = ["0,2,6,8", "1,3,5,7"];
    $(".attack_number_0").change(function () {
        var index = $(this).get(0).selectedIndex;
        console.log(index);
        if (index == 0) {
            for (var i = 0; i < attack_val.length; i++) {
                $('.attack_node_0 > option').eq(i).val(attack_val[i]);
                $('.attack_node_0 > option').eq(i).text(attack_text[i]);
            }
        } else {
            for (var i = 0; i < attack_val.length; i++) {
                $('.attack_node_0 > option').eq(i).val(attack_val_1[i]);
                $('.attack_node_0 > option').eq(i).text(attack_text_1[i]);
            }

        }

    });

    $(".attack_number_1").change(function () {
        var index = $(this).get(0).selectedIndex;
        if (index == 0) {
            for (var i = 0; i < attack_val.length; i++) {
                $('.gps_node_1 > option').eq(i).show();
                $('.attack_node_1 > option').eq(i).val(attack_val[i]);
                $('.attack_node_1 > option').eq(i).text(attack_text[i]);
            }
        } else {
            for (var i = 0; i < attack_val.length; i++) {
                $('.gps_node_1 > option').eq(i).show();
                $('.attack_node_1 > option').eq(i).val(attack_val_1[i]);
                $('.attack_node_1 > option').eq(i).text(attack_text_1[i]);
            }

        }
    });

    // 将数组转换为字符串
    function tranArray(data) {
        var sb = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i] != "") {
                sb.push(data[i]);
            }
        }
        return sb;
    }

    //分割字符串
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

    //分割为二维数组
    function splitDubData(str, char) {
        var sb = getDubArray(6, 3);
        var substr = "";
        var x = 0;
        var y = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) != char) {
                substr += str.charAt(i);
            } else {
                sb[x][y++] = substr;
                substr = "";
            }
            if (y == 3) {
                x++;
                y = 0;
            }
        }
        return sb;
    }

    //添加实验步骤
    // function setExperConfig(text) {
    //     for (var i = 0; i < text.length; i++) {
    //         $(".exper_guide_content").eq(i).text(text[i]);

    //     }
    // }


    function setExperConfig(text, ele) {
        ele.empty();
        for (var i = 0; i < text.length; i++) {
            ele.append($("<p></p>").text(text[i]));
        }
        //必须这样写，不知道原因
        ele.children("p").css("position", "relative");
        ele.children("p").css("padding", "0 2em");
        ele.children("p").css("width", "100%");
        ele.children("p").css("font-size", "13px");
        ele.children("p").css("background-color", "#666666");
        ele.children("p").css("color", "#ffffff");
        ele.children("p").css("white-space", "pre-line");
    }


    //遍历配置的值，并压入数组
    function forEachDom(dom, head, tail) {
        $.each(dom, function (index, element) {
            experConfigPara[head] = $(element).val();
            if (head != tail) {
                head++;
            }
        })
    }

    //遍历配置的值，并更改相应配置默认显示
    function changeConfigShow(dom, tail, config) {
        // console.log(config);
        //遍历每一个select
        for (var i = 0; i < dom.length; i++) {
            //遍历每一个option
            for (var j = 0; j < dom.eq(i).children("option").length; j++) {
                // console.log("option:" + dom.eq(i).children("option").eq(j).val());
                // console.log("配置：" + experConfigPara[num]);
                if (String(dom.eq(i).children("option").eq(j).val()) == config[tail]) {
                    // console.log("更改");
                    dom.eq(i).children("option").eq(j).prop("selected", "selected");
                }
            }
            tail++;
        }
    }

    //判断实验配置是否符合预期
    function isEqual(para_1, para_2) {
        var compF = true;
        console.log("配置"　+  para_1);
        console.log("选择"　+ para_2);
        for (var i = 0; i < para_1.length; i++) {
            if (para_1[i] != para_2[i]) {
                compF = false;
                break;
            }
        }
        console.log(compF);

        return compF;
    }


});




