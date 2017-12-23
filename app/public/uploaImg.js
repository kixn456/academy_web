/**
 * Created by Administrator on 2017/9/30.
 */

import React, {Component} from 'react';
import { Form, Icon, Row, Col,Button,Upload, message } from 'antd';




const FormItem = Form.Item;


const props = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    action: '//files.chunzeacademy.com:9200/images/uploadThumbImage'
    /* onChange(info) {
     console.log("---------------");
     console.log(info);
     const status = info.file.status;
     if (status !== 'uploading') {
     console.log(info.file, info.fileList);
     }
     if (status === 'done') {
     message.success(`${info.file.name} file uploaded successfully.`);

     } else if (status === 'error') {
     message.error(`${info.file.name} file upload failed.`);
     }
     }*/
};

class UploadPhoto extends Component {
    constructor(props) {
        super(props);
        this.state={
            imgPath:''
        }
    }


    componentDidMount(){
        this.setState({
            imgPath:this.props.photoPath
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.photoPath!=this.state.imgPath){
            this.setState({
                imgPath:nextProps.photoPath
            })
        }
    }

    uploadOnChange(info){

        const status = info.file.status;
        if (status !== 'uploading') {

        }
        if (status === 'done') {

            let result=info.file.response;
            message.success(`${info.file.name} 上传成功`);
            if(result.retCode==0){
                this.uploadCallBack(result.responseInfo);
                this.setState({
                    imgPath:result.responseInfo
                })
            }


        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
    uploadCallBack(imgPath){

        this.props.uploadCallBack(imgPath);
    }

    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        let imgPath=this.state.imgPath;

        return (
            <Form  style={{marginTop:20}}>

                <FormItem
                    {...formItemLayout}
                    label=""
                >

                    <Upload
                        className="avatar-uploader"
                        name="avatar"
                        {...props}
                        onChange={(info)=>this.uploadOnChange(info)}
                    >
                        {
                            (imgPath!="")
                                ?
                                <img src={imgPath} style={{width:"200px",height:'auto',maxHeight:'140px'}} />
                                :
                                <Icon type="plus" className="avatar-uploader-trigger" />
                        }
                    </Upload>
                </FormItem>
            </Form>
        );
    }

}
export const UploadImg = Form.create()(UploadPhoto);