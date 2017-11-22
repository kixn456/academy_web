
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
            courseInfo:null,
            player:null,
            cover:'https://s3m.mediav.com/galileo/03119583cced5bd241dac650e944c6d8.gif',
            playauth:'',
            vid:'1e067a2831b641db90d570b6480fbc40',
            videoUrl:'https://player.alicdn.com/video/aliyunmedia.mp4'
        }

    }
    componentDidMount(){
        let request=Commom.GetRequest();
        let videoInfo=this.state;
        this.initPlayer(videoInfo);
        /*this.initData();*/
        this.initCourseList(request.courseId);
    }

    //初始化播放列表
    initCourseList(courseId){
        let _self=this;
      CourseServer.getCourseDetailByAjax(courseId,function(data){
          _self.setState({
              courseInfo:data.responseInfo
          })

      },function(e){
          console.log("请求出错");
      })
    }
    //初始化播放器
    initPlayer(videoInfo){


         newPlayer = new Aliplayer({
            id: "c_player",
            autoplay:true,
            isLive:false,
            playsinline:true,
            useH5Prism:false,
            useFlashPrism:false,
            width:"100%",
            height:"600px",
            vid : videoInfo.vid,//媒体转码服务的媒体Id
            cover:videoInfo.cover,//入场广告
            playauth : videoInfo.playAuth,
            source:videoInfo.videoUrl,
        });

            let _self=this;

        //播放结束时调用
        newPlayer.on("ended",function(){
            _self.initData();

        })


    }


    initData(){

       let player=this.state.player;
       let vodId = "c430dd8534e04ba8a8acc63931893304";
       let vodPlayInfo={
           "videoId":vodId
       };

       let _self=this;
        newPlayer.loadByUrl("http://common.qupai.me/player/qupai.mp4");

     };


    initPlayVideo() {
        VideoServer.ajaxReqPlayVideo(vodPlayInfo,function(retCode,playAuth){
            if(retCode==0)
            {

                //reloaduserPlayInfoAndVidRequestMts(videoId,playAuth);
                    let videoInfo={
                        vid :playAuth.videoId,//媒体转码服务的媒体Id
                        playauth:playAuth.playAuth//播放鉴权 [playauth参照](https://help.aliyun.com/document_detail/52833.html?spm=5176.doc51236.6.627.5gm5gf)
                    }
                _self.initPlayer(videoInfo);
            }else{
                alert("get playAuth error");
            }

        });

    }

    channelExhange(videoId,videoUrl){
        alert(videoId+"==="+videoUrl);
    }

    render(){
        let courseInfo=this.state.courseInfo;
        let _self=this;
        return (
            <Grid>
                <Col sm={9}>
                    <div id='c_player' className='prism-player'></div>
                </Col>
                <Col sm={3} style={{background:'black',height:'600px'}}>

                    {
                        (courseInfo!=null)
                         ?

                            courseInfo.courseChapterList.map(function(item,index){
                                return (<div style={{color:'white'}} key={index}>
                                    {item.chapterTitle}
                                        <ul>
                                            {
                                                item.courseList.map(function(courseItem,courseIndex){
                                                    return <li style={{color:'white'}} key={courseIndex} onClick={()=>_self.channelExhange(courseItem.vodeoId,courseItem.videoUrl)}>
                                                                     {courseItem.classTitle}
                                                        </li>
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
