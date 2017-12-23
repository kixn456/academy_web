
/**
 * Created by Administrator on 2017/10/23.
 *@description
 *@author
 *@out
 */


import React,{Component} from 'react';
import  ReactDOM from 'react-dom';
import {Grid,ROW,Col,Pagination} from "react-bootstrap";
import Storage from '../common/storeage';

import UserHeader from '../userCenter/userHeader'
import * as leftMenuData from '../config/config_userCenter';
import LeftMenu from '../userCenter/leftMenu/index';
import  * as TeachCenterServer from '../server/teachCenterServer';
import {Router,IndexRoute, Route, Link, hashHistory } from 'react-router'
import * as Commom from "../public/commom/commom";
const basePath=Commom.getRootPath();
export default class MyCourseList extends Component{
    constructor(props) {
        super(props);
        this.state= {
            courseTableTitle:[
                        "视频信息",
                        "课程名称",
                        "报名人数",
                        "状态",
                        "发布时间",
                        "适用人群",
                        "课程分类",
                        "发布价格",
                        "操作"
             ],
            pageInfo:{},
            courseList: [],
            queryParmaster:{
                startCreateTime:'2017-12-01 00:00:00',
                endCreateTime:'2017-12-30 00:00:01',
                category:'tcoursepub',
                pageSize:10,
                pageNum:1,
                status:this.props.status // 0:全部10240：已发布1草稿
            },
        }
    }


    componentDidMount(){

        this.getCourseList();
    }


    //接收到新的参数时的变化
    componentWillReceiveProps(nextProps){
        if(nextProps.status!=this.state.status){
            let queryParmaster={
                startCreateTime:'2017-12-01 00:00:00',
                    endCreateTime:'2017-12-30 00:00:01',
                    category:'tcoursepub',
                    pageSize:10,
                    pageNum:1,
                    status:nextProps.status // 0:全部10240：已发布1草稿
            };
            this.setState({
                queryParmaster:queryParmaster
            },()=> this.getCourseList())

        }

    }

    getCourseList(){
        let _self=this;
        let userInfo=Storage.get("userInfo");
        let parmaster=Object.assign({},this.state.queryParmaster);
        parmaster.userId=userInfo.userId;
        TeachCenterServer.getCourseListWithTeacher(parmaster,function(code,data){
            let myCourse=data.list;
            let pageInfo={
                "pageNum":data.pageNum,
                "pageSize":data.pageSize,
                "size":data.size,
                "total": data.total,
                "pages": data.pages
            }
            _self.setState({
                courseList:myCourse,
                pageInfo:pageInfo
            })
        })
    }
    removeCourse(index){
        let _self=this;
        let courseList=this.state.courseList;

        //这里需要重新请求或者刷新
        if(confirm("你确定要删除该课程吗？")){
            courseList.splice(index,1);
            this.setState({
                courseList:courseList
            })
        }

        console.log(courseList.length);
    }
    handleSelect(e){
        let queryParmaster=this.state.queryParmaster;
        queryParmaster.pageNum=e;
        this.getCourseList();

    }
    render(){
        let _self=this;
        let courseList=this.state.courseList;
        let courseTableTitle=this.state.courseTableTitle;
        let pageInfo=this.state.pageInfo;
        let courseType=this.props.courseType;
        return (
            <Col>

            <table className="table table-bordered" >
                <thead>
                <tr style={{background:'#eee',fontWeight:'bold'}}>
                    {
                        courseTableTitle.map(function(item,index){
                            return <th key={index}>{item}</th>
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    (courseList.length>0)
                    ?
                    courseList.map(function(item,index){
                        let orderData=JSON.parse(item.orderData);
                        let imgUrl=Commom.formatServerPhoto(orderData.courseAvatar);
                        let category=JSON.parse(orderData.category);
                        return (
                        (courseType==0 && item.status==10240)
                            ?
                            <tr key={index}>
                                <td><a href={basePath+"courseDetail.html?id="+orderData.courseId}><img src={imgUrl.middlePhoto} style={{width:'50px'}}/></a></td>
                                <td style={{verticalAlign:'middle'}}><a href={basePath+"courseDetail.html?id="+orderData.courseId}>{orderData.title}</a></td>
                                <td style={{verticalAlign:'middle'}}>10</td>
                                <td style={{verticalAlign:'middle'}}>{"上线"}</td>
                                <td style={{verticalAlign:'middle'}}>{item.updateTime.substring(0,10)}</td>
                                <td style={{verticalAlign:'middle'}}>{orderData.fitPeople.substring(0,10)}</td>
                                <td style={{verticalAlign:'middle'}}>{category.name}-{category.child.name}</td>
                                <td style={{verticalAlign:'middle'}}>{orderData.originalPrice>0?orderData.originalPrice:'免费'}</td>
                                <td style={{verticalAlign:'middle'}}><Link to={'ModifyTeach/id='+orderData.courseId}>编辑</Link>｜删除</td>
                            </tr>
                                :
                            (courseType==1 && item.status!=10240)
                                ?
                            <tr key={index}>
                                <td><a href={basePath+"courseDetail.html?id="+orderData.courseId}><img src={imgUrl.middlePhoto} style={{width:'50px'}}/></a></td>
                                <td style={{verticalAlign:'middle'}}><a href={basePath+"courseDetail.html?id="+orderData.courseId}>{orderData.title}</a></td>
                                <td style={{verticalAlign:'middle'}}>10</td>
                                <td style={{verticalAlign:'middle'}}>{'草稿'}</td>
                                <td style={{verticalAlign:'middle'}}>{item.createTime.substring(0,10)}</td>
                                <td style={{verticalAlign:'middle'}}>{orderData.fitPeople.substring(0,10)}</td>
                                <td style={{verticalAlign:'middle'}}>{category.name}-{category.child.name}</td>
                                <td style={{verticalAlign:'middle'}}>{orderData.originalPrice>0?orderData.originalPrice:'免费'}</td>
                                <td style={{verticalAlign:'middle'}}><Link to={'ModifyTeach/id='+orderData.courseId}>编辑</Link>｜<a href="#" onClick={()=>_self.removeCourse(index)}>删除</a></td>
                            </tr>
                        :
                        null
                        )
                    })
                        :
                        <tr>
                            <td colSpan={courseTableTitle.length} style={{textAlign:'center'}}>
                                <span style={styles.spin}>努力加载中</span>
                            </td>
                        </tr>
                }
                </tbody>

            </table>
            <div>
            <Pagination
                items={pageInfo.pages}
                activePage={pageInfo.pageNum}
                onSelect={this.handleSelect.bind(this)}
             />
            </div>
            </Col>

        )
    }
}

const styles={
    spin:{
        background:'url("../images/spin/spin.gif") no-repeat left center', backgroundSize:'30px',padding:'30px 40px',lineHeight:'100px'
    }
}









