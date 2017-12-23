/**
 * Created by Administrator on 2017/10/10.
 */

import React, {Component} from 'react';
import { Form, Input,  Row, Col} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
export default class NewInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let _self=this;


        return (
                <FormItem
                    {...this.props.formItemLayout}
                    label={this.props.label}
                    hasFeedback
                    validateStatus={this.props.validateStatus}
                    help={this.props.help}
                    defaultValue={this.props.defaultValue}
                >
                    {

                        (!_self.props.rows||_self.props.rows<=1)
                            ?
                            <Input id={_self.props.id} required={_self.props.required}  value={this.props.defaultValue} name={this.props.name}  placeholder={this.props.placeholder} onChange={(e)=>this.props.onChange(e)} />
                            :
                            <TextArea id={_self.props.id} rows={_self.props.rows} value={this.props.defaultValue}  name={_self.props.name}  placeholder={this.props.placeholder} onChange={(e)=>this.props.onChange(e)}/>

                    }



                </FormItem>
        )
    }

}
export const CoustomInput = Form.create()(NewInput);