
import React from 'react';
import { Button } from 'antd';
import echarts from 'echarts'
import {yearIncomeOptions,deepCopy,lineOpts} from './../tools/utils'
import { InputNumber } from 'antd';
import './style.scss'
class WriteData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inComeData: [
                {
                    year: 2018,
                    monthsData: [
                        {
                            monthMoney: 10000,
                            months: 6
                        },
                        {
                            monthMoney:12100,
                            months:6
                        }
                    ]
                },
                {
                    year: 2017,
                    monthsData: [
                        {
                            monthMoney: 2100,
                            months: 6
                        },
                        {
                            monthMoney: 14000,
                            months: 6
                        }
                    ]
                },
                {
                    year: 2016,
                    monthsData: [
                        {
                            monthMoney: 8001,
                            months: 4
                        },
                        {
                            monthMoney: 2300,
                            months: 4
                        },
                        {
                            monthMoney:5600,
                            months:4
                        }
                    ]
                }
            ]
        }
    }
    getStateIncomeData(){
        let { inComeData } = this.state;
        inComeData = deepCopy(inComeData)
        return inComeData;
    }
    addMonthsEvents(j) {
        let inComeData = this.getStateIncomeData();
        inComeData[j].monthsData.push({
            monthMoney: 0,
            months: 1
        })
        this.setState({
            ...this.state,
            inComeData
        })
    }
    delMonth(i,j){
        let inComeData = this.getStateIncomeData();
        inComeData[i].monthsData = inComeData[i].monthsData.filter((e,jj)=>{
            return j !== jj
        })
        this.setState({
            ...this.state,
            inComeData
        })
    }
    addYearsEvents() {
        let inComeData = this.getStateIncomeData();
        inComeData.push({
            year: 2018,
            monthsData: [
                {
                    monthMoney: 0,
                    months: 1
                }
            ]
        })
        this.setState({
            ...this.state,
            inComeData
        })
    }
    delYear(i){
        let inComeData = this.getStateIncomeData();
        inComeData = inComeData.filter((e,j)=>{
            return j !== i
        })
        this.setState({
            ...this.state,
            inComeData
        })
    }
    changeYear(i,val) {
        let inComeData = this.getStateIncomeData();
        inComeData[i].year = val;
        this.setState({
            ...this.state,
            inComeData
        })
    }
    changeMoths(i,j,val) {
        let inComeData = this.getStateIncomeData();
        inComeData[i].monthsData[j].months = val;
        this.setState({
            ...this.state,
            inComeData
        })
    }
    changeMonthMoney(i,j,val) {
        let inComeData = this.getStateIncomeData();
        inComeData[i].monthsData[j].monthMoney = val;
        this.setState({
            ...this.state,
            inComeData
        })
    }
    makeChart(){
        let inComeData = this.getStateIncomeData();
        let years = [],yearsIncome = [];
        inComeData.forEach(e=>{
            years.push(e.year);
            let t = e.monthsData.reduce((t,ele) =>{
                return t += ele.months * ele.monthMoney
            },0)
            yearsIncome.push({
                name:e.year,
                value:t
            })
        })
        let myChart = echarts.init(document.getElementById('picChart'))
        myChart.setOption(yearIncomeOptions(years,yearsIncome))
        this.makeLineData();
    }
    makeLineData(){
        let inComeData = this.getStateIncomeData();
        //1、年份排序
        inComeData.sort((a,b) => {
            return a.year - b.year
        })
        //2、生成时间线
        let times = [];
        let moneys = [];
        inComeData.forEach(e=>{
            let m = 1 ;
            e.monthsData.forEach(ele=>{
                let i = m;
                m += ele.months;
                for(; i < m; i++){
                    moneys.push(ele.monthMoney)
                    times.push(`${e.year}-${i}`)
                }
            })
        })
        let myChart = echarts.init(document.getElementById('lineChart'))
        myChart.setOption(lineOpts(times,moneys))
    }
    render() {
        return (<div className="wirte-data">
            <div className="detail-data">
                <div>
                    <Button onClick={this.makeChart.bind(this)}>画图</Button>
                </div>
                {this.state.inComeData.map((e,i) => {
                    return (
                        <div key={i} className="item-year">
                            <div className="item-filed">
                                年份：
                                <label>
                                 <InputNumber value={e.year} onChange={this.changeYear.bind(this,i)}/>
                                </label>
                            </div>
                            {
                                e.monthsData.map((env,j) => {
                                    return (
                                        <div key={j} className="item-filed">
                                            月薪：
                                            <label>
                                                <InputNumber  value={env.monthMoney}  onChange={this.changeMonthMoney.bind(this,i,j)} />
                                            </label>
                                            <label > X </label>
                                            月数：
                                            <label>
                                                <InputNumber value={env.months} onChange={this.changeMoths.bind(this,i,j)}/>
                                            </label>
                                           
                                            <label>
                                                <Button type="danger" onClick={this.delMonth.bind(this,i,j)}>Delete Month</Button>
                                            </label>
                                        </div>
                                    )
                                })
                            }
                            <div className="del-filed">
                                <label>
                                    <Button type="primary" onClick={this.addMonthsEvents.bind(this,i)}>Add Month</Button>
                                </label>
                                <label>
                                    <Button type="danger" onClick={this.delYear.bind(this,i)}>Delete Year</Button>
                                </label>
                            </div>
                        </div>
                    )
                })}
                <Button type="primary" onClick={this.addYearsEvents.bind(this)}>Add Year</Button>
            </div>
            <div className="all-charts">
                <div id="picChart" className="pic-chart " ></div>
                <div id="lineChart" className="line-chart item-chart"></div>
            </div>
         
        </div>)
    }
}
export default WriteData;
