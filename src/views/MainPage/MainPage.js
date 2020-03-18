import React from 'react';
import './MainPage.scss'
import {SEARCHENGINE} from "../../common/common";
import {Link} from "react-router-dom";

let hasFocus=false;
export default class MainPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isMobile:false,
            showInput:true,
            inputWidth:0,
            divWidth:50,
            inputMargin:0,
            searchValue:"",
            displayWechat:"none",
            displayQQ:"none",
            hour:0,
            minute:0,
            second:0,
            clockX:"70vw",
            clockY:"72vh",
            isChangeClock:false,
            clockMouseX:0,
            clockMouseY:0,
        }
    }

    componentDidMount() {
        document.onkeydown=(e)=>{
            switch(e.key){
                case "Enter":if(this.state.searchValue!==""&&hasFocus){
                    this.search()
                }
                    break;
                default:break;
            }
        }
        let timer=setInterval(()=>{
            let now=new Date();
            let hour=now.getHours()>=10?now.getHours():"0"+now.getHours();
            let minute=now.getMinutes()>=10?now.getMinutes():"0"+now.getMinutes();
            let second=now.getSeconds()>=10?now.getSeconds():"0"+now.getSeconds();
            this.setState({
                hour,
                minute,
                second
            })
        },1000)
        let date=new Date();
        if(date.getMonth()+1===12&&date.getDate()===13){
            document.documentElement.style.filter='grayscale(1.0)'
        }
    }

    changeStatus(){
        if(this.state.divWidth===50){
            this.setState({
                divWidth:350,
                inputWidth:300,
                inputMargin:20,
            })
            hasFocus=true;
            this.input.focus()
        }else{
            if(this.state.searchValue!=="")
                this.search();
            else{
                this.setState({
                    divWidth:50,
                    inputWidth:0,
                    inputMargin:0,
                })
            }
        }
    }

    search(){
        window.open(SEARCHENGINE.BING+this.state.searchValue);
    }

    blurInput(){
        if(this.state.searchValue===""){
            this.setState({
                divWidth:50,
                inputWidth:0,
                inputMargin:0,

            })
        }
        hasFocus=false;
    }

    changeSearchValue(e){
        this.setState({
            searchValue:e.target.value
        })
    }

    displayWechat(status){
        this.setState({
            displayWechat:status
        })
    }
    displayQQ(status){
        this.setState({
            displayQQ:status
        })
    }
    moveClock(e){
        // console.log(e.pageX)
        let clock=document.getElementsByClassName("MainPage_clock")[0];
        this.setState({
            isChangeClock:true,
            clockMouseX:e.pageX-clock.offsetLeft,
            clockMouseY:e.pageY-clock.offsetTop,
        })
    }
    setClock(e){
        if(this.state.isChangeClock){
            this.setState({
                clockX:e.pageX-this.state.clockMouseX,
                clockY:e.pageY-this.state.clockMouseY,
            })
        }
    }
    cancelMove(e){
        console.log("up")
        this.setState({
            isChangeClock:false,
        })
    }

    render() {
        console.log(undefined==null)
        return(
            <div onMouseMove={this.setClock.bind(this)}  className="MainPage">
                {/*<img className="MainPage_backImg" mode="cover" src={require('../../assets/back1.jpg')} alt=""/>*/}
                <div className="MainPage_top">
                    <div className="MainPage_top_front"><img className="MainPage_top_img" src={require("../../assets/top.png")}/></div>
                    <div className="MainPage_top_back"><img className="MainPage_top_img" src={require("../../assets/top_back.png")}/></div>
                </div>
                <div style={{width:this.state.divWidth,background:"#383838"}} className="MainPage_search">
                    <input onChange={this.changeSearchValue.bind(this)} onBlur={this.blurInput.bind(this)} ref={(input)=>this.input=input} style={{width:this.state.inputWidth,marginLeft:this.state.inputMargin}} className="MainPage_search_input" placeholder={"请输入关键词"}/>
                    <div className="MainPage_search_iconDiv"><img onClick={this.changeStatus.bind(this)} className="MainPage_search_iconDiv_icon" src={require('../../assets/search.png')} alt=""/></div>
                </div>
                <div className="MainPage_aboutMe">
                    <a href="https://github.com/Zhangjiafeng" target="_blank">
                        <div className="MainPage_aboutMe_item">
                            <img className="MainPage_aboutMe_item_img" src={require('../../assets/GitHub.png')} alt=""/>
                        </div>
                    </a>
                    <div className="MainPage_aboutMe_item" onMouseLeave={this.displayWechat.bind(this,"none")}>
                        <div className="MainPage_aboutMe_item_info"style={{display:this.state.displayWechat}}>
                            <img className="MainPage_aboutMe_item_info_code" src={require("../../assets/wechat_code.png")} alt=""/>
                            <div className="MainPage_aboutMe_item_info_triangle"/>
                        </div>

                        <img className="MainPage_aboutMe_item_img" onMouseOver={this.displayWechat.bind(this,"block")} src={require('../../assets/Wechat.png')}/>
                    </div>

                    <div className="MainPage_aboutMe_item" onMouseLeave={this.displayQQ.bind(this,"none")}>
                        <div className="MainPage_aboutMe_item_info"  style={{display:this.state.displayQQ,transform: "translate(-40px,-120% )"}}>
                            <img className="MainPage_aboutMe_item_info_code" src={require("../../assets/qq_code.jpg")} alt=""/>
                            <div className="MainPage_aboutMe_item_info_triangle"/>
                        </div>

                        <img className="MainPage_aboutMe_item_img" onMouseOver={this.displayQQ.bind(this,"block")} src={require('../../assets/QQ.png')}/>
                    </div>

                    <div className="MainPage_aboutMe_item">
                        <Link to={'/intro'} target={"_blank"}><img className="MainPage_aboutMe_item_img" src={require('../../assets/mine.png')} alt=""/></Link>
                    </div>
                </div>
                <div className="MainPage_footer"> Copyright © 2020 Zhang Jiafeng. All rights reserved.</div>
                <div className="MainPage_clock" style={{left:this.state.clockX,top:this.state.clockY}} onMouseDown={this.moveClock.bind(this)} onMouseUp={this.cancelMove.bind(this)}>
                    <div>
                        <span className="MainPage_clock_hours">{this.state.hour}</span>
                        <span>Hours</span>
                    </div>
                    <div>
                        <span className="MainPage_clock_hours">{this.state.minute}</span>
                        <span>Minutes</span>
                    </div>
                    <div>
                        <span className="MainPage_clock_hours">{this.state.second}</span>
                        <span>Seconds</span>
                    </div>
                </div>
            </div>
        )
    }
}
