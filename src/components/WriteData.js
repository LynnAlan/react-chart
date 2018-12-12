
import React from 'react';
import { Button } from 'antd';
import echarts from 'echarts'
import {yearIncomeOptions,deepCopy} from './../tools/utils'
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
                            monthMoney: 0,
                            months: 1
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
        console.log(inComeData)
        let monthsData = inComeData[0].monthsData;
        let months = monthsData.reduce((t,e,i)=>{
            t.push(e.months)
            return t
        },[])
        let monthData = monthsData.reduce((t,e,i)=>{
            t.push({
                name:e.months,
                value:e.monthMoney
            })
            return t
        },[])
        let myChart = echarts.init(document.getElementById('lineChart'))
        myChart.setOption(yearIncomeOptions(months,monthData))
    }
    render() {
        return (<div className="wirte-data">
            <div className="detail-data">
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
                                    { <Button type="primary" onClick={this.addMonthsEvents.bind(this,i)}>Add Month</Button>}
                                </label>
                                <label>
                                    {<Button type="danger" onClick={this.delYear.bind(this,i)}>Delete Year</Button>}
                                </label>
                            </div>
                        </div>
                    )
                })}
                <Button type="primary" onClick={this.addYearsEvents.bind(this)}>Add Year</Button>
                <div>
                    <Button onClick={this.makeChart.bind(this)}>画图</Button>
                </div>
                <div id="lineChart" className="line-chart item-chart"></div>
                
            </div>
        </div>)
    }
}
export default WriteData;
