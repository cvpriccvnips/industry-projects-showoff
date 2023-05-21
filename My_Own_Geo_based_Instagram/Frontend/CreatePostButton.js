import React from 'react';
import { Modal, Button, message } from 'antd';
import { CreatePostForm } from './CreatePostForm';
import { API_ROOT, AUTH_HEADER, TOKEN_KEY, POS_KEY, LOC_SHAKE, TOPIC_AROUND } from '../constants';

export class CreatePostButton extends React.Component {
 state = {
   visible: false,
   confirmLoading: false,
 };

 showModal = () => {
   this.setState({
     visible: true,
   });
 };

 handleOk = () => {
   this.form.validateFields((err, values) => {
     console.log(values);
     if (!err) {
       const token = localStorage.getItem(TOKEN_KEY);
       const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));

       const formData = new FormData();
       formData.set('lat', lat + Math.random() * LOC_SHAKE * 2 - LOC_SHAKE);
       formData.set('lon', lon + Math.random() * LOC_SHAKE * 2 - LOC_SHAKE);
       formData.set('message', values.message);
       formData.set('image', values.image[0].originFileObj);

       this.setState({ confirmLoading: true });
       fetch(`${API_ROOT}/post`, {
         method: 'POST',
         headers: {
           Authorization: `${AUTH_HEADER} ${token}`
         },
         body: formData,
       })
         .then((response) => {
           if (response.ok) {
             return this.props.loadPostsByTopic();
           }
           throw new Error('Failed to create post.');
         })
         .then(() => {
           this.setState({ visible: false, confirmLoading: false });
           this.form.resetFields();
           message.success('Post created successfully!');
         })
         .catch((e) => {
           console.error(e);
           message.error('Failed to create post.');
           this.setState({ confirmLoading: false });
         });
     }
   });
 };

 handleCancel = () => {
   console.log('Clicked cancel button');
   this.setState({
     visible: false,
   });
 };

 getFormRef = (formInstance) => {
   this.form = formInstance;
 }

 render() {
   const { visible, confirmLoading } = this.state;
   return (
     <div>
       <Button type="primary" onClick={this.showModal}>
         Create New Post
       </Button>
       <Modal
         title="Create New Post"
         visible={visible}
         onOk={this.handleOk}
         okText='Create'
         confirmLoading={confirmLoading}
         onCancel={this.handleCancel}
       >
         <CreatePostForm ref={this.getFormRef}/>
       </Modal>
     </div>
   );
 }
}


/*
这段代码实现了一个名为CreatePostButton的React组件，它用于显示一个创建新帖子的按钮，并在点击按钮时弹出一个模态框，允许用户填写帖子信息并创建帖子。

以下是代码的主要功能：

state对象包含两个属性：visible和confirmLoading，分别用于控制模态框的显示和确定按钮的加载状态。

showModal方法用于设置visible属性为true，从而显示模态框。

handleOk方法在点击确定按钮时触发。它首先验证表单字段的值，然后从本地存储中获取用户令牌和位置信息。

创建一个FormData对象，将表单字段的值设置为对应的键值对，包括经纬度稍微抖动一下以增加随机性。

发起POST请求到后端API的/post端点，包括请求头部的身份验证信息和表单数据作为请求体。

根据响应的结果，如果成功创建帖子，则调用loadPostsByTopic方法重新加载相关主题的帖子。

最后，更新组件的状态，关闭模态框，重置表单字段，显示成功的消息。

如果发生错误，打印错误信息，并显示创建帖子失败的消息。

handleCancel方法在点击取消按钮时触发，设置visible属性为false，从而关闭模态框。

getFormRef方法用于获取表单组件的引用，以便在提交表单时进行验证和重置字段。

render方法渲染组件的UI界面，包括一个"Create New Post"的按钮和一个模态框，模态框内包含一个CreatePostForm组件用于填写帖子信息。

这个组件用于在应用程序中实现创建新帖子的功能。
*/