class ChartsEvent {
    constructor() {
        this.linexAxisData = [];
        this.lineSeriesData = [];
        this.picxAxisData = [];
        this.picSeriesData = [];
        this.yearIncomeSeriesData = [];
        this.yearIncomeXAxisData = []
    }
    init() {
        this.makeLineSeries();
        this.makeLineXAxis();
        this.makePicSeries();
    }
    makeLineXAxis() {
        for (let i = 2015; i <= 2018; i++) {
            for (let j = 1; j <= 12; j++) {
                if (i == 2015) {
                    if (j > 6) {
                        let m = j < 10 ? `0${j}` : j;
                        this.linexAxisData.push(`${i}-${m}`);
                    }
                } else {
                    let m = j < 10 ? `0${j}` : j;
                    this.linexAxisData.push(`${i}-${m}`);
                }

            }
        }
    }
    makeLineSeries() {
        for (let i = 2015; i <= 2018; i++) {
            if (i == 2015) {
                for (let j = 1; j <= 12; j++) {
                    if (j > 10) {
                        this.lineSeriesData.push(5000)
                    } else if (j <= 10 && j >= 7) {
                        this.lineSeriesData.push(4000)
                    }
                }
            } else if (i == 2016) {
                for (let j = 1; j <= 12; j++) {
                    if (j > 3) {
                        this.lineSeriesData.push(10000)
                    } else {
                        this.lineSeriesData.push(7500)
                    }
                }
            } else if (i == 2017) {
                for (let j = 1; j <= 12; j++) {
                    if (j > 3) {
                        this.lineSeriesData.push(14000)
                    } else {
                        this.lineSeriesData.push(10000)
                    }
                }
            } else if (i == 2018) {
                for (let j = 1; j <= 12; j++) {
                    if (j < 5) {
                        this.lineSeriesData.push(14000)
                    } else if (j >= 5 && j <= 8) {
                        this.lineSeriesData.push(16000)
                    } else if (j > 8) {
                        this.lineSeriesData.push(18000)
                    }
                }
            }
        }
    }
    makePicSeries() {
        let obj = {}
        for (let i = 0; i < this.lineSeriesData.length; i++) {
            if (!obj[this.lineSeriesData[i]]) {
                obj[this.lineSeriesData[i]] = 1
            } else {
                obj[this.lineSeriesData[i]]++
            }
        }
        this.picSeriesData = Object.keys(obj).map((e, i) => {
            return {
                value: obj[e],
                name: e
            }
        })
        this.picxAxisData = Object.keys(obj);
    }
    makeYearIncome() {
        let obj = this.linexAxisData.reduce((o,e,i)=>{
            let item = e.split('-')[0];
            if(!o[item]){
                o[item] = this.lineSeriesData[i];
            }else{
                o[item] += this.lineSeriesData[i]
            }
            return o
        },{})
        this.yearIncomeXAxisData = Object.keys(obj);
        this.yearIncomeSeriesData = this.yearIncomeXAxisData.map(e => {
            return {
                value: obj[e],
                name: e
            }
        })
    }
    setPicChart(id) {
        let myChart = echarts.init(document.getElementById(id))
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: this.picxAxisData
            },
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: this.picSeriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        myChart.setOption(option);
    }
    setLineChart(id) {
        let myChart = echarts.init(document.getElementById(id))
        var option = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.linexAxisData,
                axisLabel: {
                    rotate: 45,
                },
            },
            yAxis: {
                type: 'value'
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {

            },
            series: [{
                data: this.lineSeriesData,
                type: 'line',
                areaStyle: {}
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    }
    setYearIncome(id) {
        let myChart = echarts.init(document.getElementById(id))
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: this.yearIncomeXAxisData
            },
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: this.yearIncomeSeriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        myChart.setOption(option);
    }
}
let Start = new ChartsEvent();
Start.init();
Start.makeYearIncome()
Start.setLineChart('lineChart')
Start.setPicChart('picChart')
Start.setYearIncome('yearIncomeChart');

class OpearteForm{
    constructor(){

    }
    confirmWorkYear(){          
        let dom = document.getElementById('confirmWorkYear');
        dom.addEventListener('click',(e) => {
            let years = document.getElementById('workYear').value;     
            
        })
    }
}
let initData = new OpearteForm();
initData.confirmWorkYear()