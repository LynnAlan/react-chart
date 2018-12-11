
import React from 'react';
import { Button } from 'antd';
import echarts from 'echarts'
import {picOptions} from './../tools/utils'

class WriteData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inComeData: [
                {
                    year: '2018',
                    monthsData: [
                        {
                            monthMoney: '14000',
                            months: 12
                        }
                    ]
                }
            ]
        }
    }
    addYearsEvents(j) {
        let { inComeData } = this.state;
        inComeData = JSON.parse(JSON.stringify(inComeData))
        inComeData[j].monthsData.push({
            monthMoney: '18000',
            months: 12
        })
        this.setState({
            ...this.state,
            inComeData
        })
    }
    changeYear(i,e) {
        let { inComeData } = this.state;
        inComeData = JSON.parse(JSON.stringify(inComeData));
        inComeData[i].year = e.target.value;
        this.setState({
            ...this.state,
            inComeData
        })
    }
    changeMoths(i,j,e) {
        let { inComeData } = this.state;
        inComeData = JSON.parse(JSON.stringify(inComeData));
        inComeData[i].monthsData[j].months = e.target.value;
        this.setState({
            ...this.state,
            inComeData
        })
    }
    changeMonthMoney(i,j,e) {
        let { inComeData } = this.state;
        inComeData = JSON.parse(JSON.stringify(inComeData));
        inComeData[i].monthsData[j].monthMoney = e.target.value;
        this.setState({
            ...this.state,
            inComeData
        })
    }
    makeChart(){
        let { inComeData } = this.state;
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
        myChart.setOption(picOptions(months,monthData))

        console.log(inComeData,)
    }
    render() {
        return (<div>
            {this.state.inComeData.map((e, i) => {
                return (
                    <div key={i}>
                        <div >
                            年份：<input type="text" value={e.year} onChange={this.changeYear.bind(this, i)} />
                        </div>
                        {
                            e.monthsData.map((env, j) => {
                                return (
                                    <div key={j}>
                                        月薪
                                        <label>
                                            <input type="text" placeholder="请输入月薪" value={env.monthMoney} onChange={this.changeMonthMoney.bind(this, i,j)} />
                                        </label>
                                        <span > X </span>
                                        <label>
                                            <input type="text" placeholder='请输入月薪的月数' value={env.months} onChange={this.changeMoths.bind(this, i,j)} />
                                        </label>
                                        {e.monthsData.length == j + 1 ? <Button type="primary" onClick={this.addYearsEvents.bind(this,i)}>Add</Button>:null}
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            })}
            <div id="lineChart" className="line-chart item-chart"></div>

            <div>
                <Button onClick={this.makeChart.bind(this)}>画图</Button>
            </div>
        </div>)
    }
}
export default WriteData;
