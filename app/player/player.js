
/**
 * Created by Administrator on 2017/9/30.
 *@description
 *@author
 *@out
 */

import React,{Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,Row,Col} from "react-bootstrap";
import * as VideoServer from '../server/videoPlayerServer';
import * as Commom from '../public/commom/commom';
import * as CourseServer from '../server/courseCenterServer';

let  newPlayer=null;
export default class MainFrame extends Component{
    constructor(props){
        super(props);
        this.state={
            courseInfo:null
        }
    }
    componentDidMount(){
        let request=Commom.GetRequest();
        let videoInfo=this.state;
        this.initCourseList(request.courseId);

    }

    //初始化播放列表
    initCourseList(courseId){
        let _self=this;

        CourseServer.getCourseAllClassByAjax(courseId,function(code,data){
            _self.setState({
                courseInfo:data
            })

        },function(e){
            console.log("error");
        });
    }
    //初始化播放器
    initPlayer(videoInfo){
      let videoList=document.querySelectorAll("video");

        if(videoList.length==0)
        {
            if(!videoInfo)
            {
                videoInfo={
                    vid:'1e067a2831b641db90d570b6480fbc40',
                    cover:'https://s3m.mediav.com/galileo/03119583cced5bd241dac650e944c6d8.gif',
                    playauth:''
                }
            }
            newPlayer = new Aliplayer({
                id: "c_player",
                autoplay:true,
                isLive:false,//是否直播
                /*playsinline:true,
                 useH5Prism:false,
                 useFlashPrism:false,*/
                width:"100%",
                height:"600px",
                vid : videoInfo.vid,//媒体转码服务的媒体Id
                cover:'https://s3m.mediav.com/galileo/03119583cced5bd241dac650e944c6d8.gif',//入场广告
                playauth : videoInfo.playauth
                //source:videoInfo.videoUrl,
            })
        }else{
            newPlayer.replayByVidAndPlayAuth(videoInfo.vid,videoInfo.playauth);
        }


       /* //播放结束时调用
        newPlayer.on("ended",function(){

            console.log("-------");
        })*/

    }



    initPlayVideo(vodPlayInfo) {
        let _self=this;
        VideoServer.ajaxReqPlayVideo(vodPlayInfo,function(retCode,data){
            if(retCode==0)
            {
              let payInfo={
                    vid:data.videoId,
                    playauth:data.playAuth
                }
               _self.initPlayer(payInfo);
            }else{
                alert("get playAuth error");
            }
        });
    }

    channelExhange(videoId){
        let vodPlayInfo={
            "videoId":videoId
        };
        this.initPlayVideo(vodPlayInfo);
    }

    render(){
        let courseInfo=this.state.courseInfo;
        let _self=this;
        return (
            <Grid style={{padding:'20px'}}>
                <Col sm={9} style={{background:'gray',height:'600px'}}>
                    <div id='c_player' className='prism-player' ></div>
                </Col>
                <Col sm={3} style={{background:'black',height:'600px'}}>

                    {
                        (courseInfo!=null)
                         ?

                            courseInfo.map(function(item,index){
                                return (<div style={{color:'white'}} key={index}>
                                    {item.id}
                                        <ul>
                                            {
                                                item.courseList.map(function(courseItem,courseIndex){
                                                    return (
                                                        <li style={{color:'white',textAlign:'left',listStyle:'none'}}
                                                            key={courseIndex}
                                                            onClick={()=>_self.channelExhange(courseItem.videoId,courseItem.videoUrl)}>
                                                         {courseItem.classTitle}
                                                     </li>
                                                    )
                                                })
                                            }
                                        </ul>

                                    </div>)
                            })
                            :
                            null

                    }

                </Col>
            </Grid>
        )
    }
}

ReactDOM.render(
    <MainFrame/>,
    document.getElementById('mainFrame')
);
