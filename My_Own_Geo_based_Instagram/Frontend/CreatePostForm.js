import React from 'react';
import { Form, Input, Upload, Icon } from 'antd';

class NormalCreatePostForm extends React.Component {
 normFile = e => {
   console.log('Upload event:', e);
   if (Array.isArray(e)) {
     return e;
   }
   return e && e.fileList;
 };

 beforeUpload = () => false;

 render() {
   const { getFieldDecorator } = this.props.form;
   const formItemLayout = {
     labelCol: { span: 6 },
     wrapperCol: { span: 14 },
   };
   return (
     <Form {...formItemLayout}>
       <Form.Item label="Message">
         {getFieldDecorator('message', {
           rules: [{ required: true, message: 'Please input message.' }],
         })(<Input />)}
       </Form.Item>
       <Form.Item label="Image/Video">
         <div className="dropbox">
           {getFieldDecorator('image', {
             valuePropName: 'fileList',
             getValueFromEvent: this.normFile,
             rules: [{ required: true, message: 'Please select an image.' }]
           })(
             <Upload.Dragger name="files" beforeUpload={this.beforeUpload}>
               <p className="ant-upload-drag-icon">
                 <Icon type="inbox" />
               </p>
               <p className="ant-upload-text">Click or drag file to this area to upload</p>
               <p className="ant-upload-hint">Support for a single or bulk upload.</p>
             </Upload.Dragger>,
           )}
         </div>
       </Form.Item>
     </Form>
   );
 }
}

export const CreatePostForm = Form.create()(NormalCreatePostForm);


/*
这段代码定义了一个名为CreatePostForm的React组件，用于创建帖子的表单。

以下是代码的主要功能：

NormalCreatePostForm是一个继承自React.Component的类组件。

normFile方法用于处理上传文件的事件，将文件转换为文件列表。如果上传的是多个文件，直接返回文件列表；如果上传的是单个文件，将文件包装成一个文件列表。

beforeUpload方法用于限制文件上传，始终返回false，表示禁止上传文件。这样可以阻止用户直接通过点击上传按钮上传文件，而只能通过拖拽文件到指定区域来上传。

在render方法中，使用antd库的Form、Input、Upload和Icon组件来构建表单。

使用this.props.form提供的getFieldDecorator方法来包装message和image字段的输入框和文件上传控件，以实现表单验证和数据绑定。

formItemLayout对象定义了表单项的布局，包括标签的列数和输入控件的列数。

Form.Item组件用于包裹每个表单项，指定标签和输入控件。

getFieldDecorator方法接收字段名和配置对象，包括验证规则和初始值，将表单项与表单进行关联，并添加验证规则。

Input组件用于输入消息的文本框。

Upload.Dragger组件用于实现拖拽上传功能，包含一个拖拽区域和相关提示信息。

valuePropName属性设置为fileList，指定表单字段的值是文件列表。

getValueFromEvent属性指定在上传文件时触发的事件处理函数，将上传的文件转换为文件列表。

rules属性指定验证规则，要求必须选择一个图片。

最后，通过Form.create()方法对NormalCreatePostForm组件进行包装，生成一个新的组件CreatePostForm，并将其导出。

这个组件实现了一个用于创建帖子的表单，包含了消息文本框和文件上传控件，可以进行表单验证和文件上传。




 */