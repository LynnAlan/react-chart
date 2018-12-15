export const yearIncomeOptions = (legendData, seriesData) => {
    let option = {
        title:{
            text:"年收入占比图",
            x:'center'

        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: legendData
        },
        series: [{
            name: '收入数据',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: seriesData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    return option
}
export const deepCopy = function (obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
export const lineOpts = (xAxisData, seriesData) => {
    let option = {
        title:{
            text:'月薪浮动图',
            x:'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            minInterval: 10,
            interval: 20,
            axisPointer: {
                type: "line", // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {
                    // 直线指示器样式设置
                    color: "#48b",
                    width: 2,
                    type: "solid"
                },
            },
            axisLabel: {
                rotate: 35, //倾斜度 -90 至 90 默认为0
                textStyle: {
                    fontWeight: "bolder",
                    color: "#000000"
                }
            },
        },
        toolbox: {
            show: true
            // feature: {
            //     dataView: { show: true, readOnly: false },
            //     magicType: { show: true, type: ['line'] },
            //     restore: { show: true },
            //     saveAsImage: { show: true }
            // }
        },
        calculable: true,
        grid: {
            x: 60,
            y: 45,
            x2: 5,
            y2: 60,
            borderWidth: 1
        },
        yAxis: {
            name: '月薪',
            type: 'value'

        },
        series: [{
            name: '月薪',
            data: seriesData,
            type: 'line'
        }]
    }
    return option
}