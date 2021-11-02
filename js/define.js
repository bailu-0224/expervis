
var exper = getDubArray(3, 2);//index界面实验配置
var experOption = splitData(localStorage.getItem("experOption") + ",", ",");
var experFlag = -1;  //实验选择标记0-5

var flyIndictor = 9;
var spoofNum = 0;
var redOr = 5;

//实验配置参数
var experConfigPara = getOneArray(21); //共23个数值
experConfigPara[0] = 1;

//判断当前选择的那个实验，0-6(三个大实验，每个大实验中有两个小实验)
for (var i = 0; i < experOption.length; i++) {
    if (experOption[i] == 1) {
        experFlag = i;
        break;
    }
}   
localStorage.setItem("experFlag", experFlag);


var parasCompare = splitData(localStorage.getItem("parasCompare") + ",", ",");

//判断是否出现红线
if (parasCompare[10] == "静态路由") {
    redOr = 0;
}
switch (experFlag) {
    case 0:
        flyIndictor = 9;
        break;
    case 1:
        flyIndictor = 10;
        break;
    case 2: 
        flyIndictor = 9;
        spoofNum = 2;
        if(parasCompare[13] == 4){
            spoofNum = 4;
        }
        //判断是否受欺骗
        if(parasCompare[15] == 0 && parasCompare[16] == 0){
            spoofNum = 0;
        }
        break;
    case 3:
        flyIndictor = 9;
        spoofNum = 2;
        if(parasCompare[13] == 4){
            spoofNum = 4;
        }
        //判断是否受欺骗
        if(parasCompare[15] == 0 && parasCompare[16] == 0){
            spoofNum = 0;
        }
        break;
    case 4:
        flyIndictor = 9;　
        break;
    case 5:
        flyIndictor = 9;
        break;
}





//socket
var socket; //一个ws对象就是一个通信管道
//var target = "ws://192.168.1.102:8887";
var target = "ws://localhost:8887"; //39.98.43.5

//图表展示大小
var showBorder = [60, 85, 110, 100, 80, 105];

//图表名称
var flyChart;
var flockChart_1, flockChart_2, flockChart_3;
var rippleChart_1;
var rippleChart_2;
var barChart;
var pieChart;
var areaChart;
var doubleBarchart;

//fly指标
var nodes = [];
var links = [];
var blockNodes = [];
var blockLinks = [];
var linksCompare = getDubArray(flyIndictor + spoofNum, flyIndictor + spoofNum);
var compareFlag = getDubArray(flyIndictor + spoofNum, flyIndictor + spoofNum);
var timeFlag = getDubArray(flyIndictor + spoofNum, flyIndictor + spoofNum);
var isCollisionCompare = getOneArray(flyIndictor + spoofNum);
var isCollisionCompareFlag = getOneArray(flyIndictor + spoofNum);
var isCollisionTimeFlag = getOneArray(flyIndictor + spoofNum);

//flocking指标
var flockText = ['Scal稳定性', '碰撞次数(次)', 'Rmin个体最小间距(m)'];
var flockData_scal = [];
var flockData_vel = [];
var flockData_Rmin = [];
var flockIndex_scal = 0;
var flockIndex_vel = 0;
var flockIndex_Rmin = 0;
var flockDate_scal = [];
var flockDate_vel = [];
var flockDate_Rmin = [];


//表格数据
var tableData = getDubArray(flyIndictor, flyIndictor);
var tableFlag = getDubArray(flyIndictor, flyIndictor);
var tableCompareFlag = getDubArray(flyIndictor, flyIndictor);
var CompareData = getDubArray(flyIndictor, flyIndictor);

//双向bar图
var sendPacket = [9, 8, 7, 6, 5];
var RecvPacket = [1, 2, 3, 4, 5];

//雷达图指标
var radarNodes = [];

//ripple水滴图指标
var rippleValue_1 = 0;
var rippleData_1 = [];
var rippleValue_2 = 0;
var rippleData_2 = [];

//bar图指标
var barData = [0, 0, 0, 0, 0];
var grayBar = [1, 1, 1, 1, 1];
var colorArray = ["#ffa800", "#1ace4a", "#1ace4a", "#1ace4a", "#1ace4a"];
var barLable = [];

//面积图指标 
var areaData = [];
var areaIndex = 0;
var areaDate = [];
var netThroughCompare = 0;



function averageData(data) {
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum += data[i];
    }
    return sum / data.length;
}


//定义二维数组
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


function getOneArray(n) {
    var tArray = new Array();  //先声明一维
    for (var i = 0; i < n; i++) {    //一维长度为i,i为变量，可以根据实际情况改变
        tArray[i] = "";    //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
    }
    return tArray;
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