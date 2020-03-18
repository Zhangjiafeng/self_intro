import React from 'react';
import './Intro.scss'
const takeUrl="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1623883963,4210469546&fm=26&gp=0.jpg";
const url="http://t9.baidu.com/it/u=86853839,3576305254&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1581572553&t=9aaacdc69279bb7b4e7da717c5c2379f";

export default class Intro extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            url:takeUrl,
            hour:0,
            minute:0,
            second:0,
        }
    }

    componentDidMount() {
        let that=this;
        window.onscroll=function(){
            let windowHeight=window.innerHeight;
            let offsetTop=that.img?that.img.offsetTop:0;
            let imgHeight=that.img?that.img.style.height:0;
            let scrollHeight=document.documentElement.scrollTop;
            let display=(offsetTop+Number.parseFloat(imgHeight)-scrollHeight-windowHeight)
            if(display<0){
                that.setState({
                    url
                })
            }
        }

        let timer=setInterval(()=>{
            let date=new Date();
            this.setState({
                hour:(date.getHours()%12+date.getMinutes()/60+date.getSeconds()/3600)/12*360,
                minute:((date.getMinutes()+date.getSeconds()/60)/60)*360,
                second:date.getSeconds()/60*360
            })
        },1000)

    }

    render() {
        const arr=[1,2,3,4,5,6,7,8,9];
        const color=['red','orange','green','blue','pink','gray','black','skyblue','#45DD54']
        return(
            <div className="Intro">
                {/*<div className='clock'>*/}
                {/*    <div style={{transform:"rotate("+this.state.hour+"deg)"}} className='clock_hour'></div>*/}
                {/*    <div style={{transform:"rotate("+this.state.minute+"deg)"}} className='clock_minute'></div>*/}
                {/*    <div style={{transform:"rotate("+this.state.second+"deg)"}} className='clock_second'></div>*/}
                {/*    <div className="clock_origin"></div>*/}
                {/*</div>*/}
                <div className="table">
                    {
                        arr.map((item,index)=>{
                            return (
                                <div className="table_cell" style={{background:color[index]}}>{arr[index]}</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
