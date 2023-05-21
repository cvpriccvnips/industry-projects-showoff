import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';
import blueMarkerUrl from '../assets/images/blue-marker.svg';

export class AroundMarker extends React.Component {
 static propTypes = {
   post: PropTypes.object.isRequired,
 }

 state = {
   isOpen: false,
 }

 handleToggle = () => {
   this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
 }

 render() {
   const { user, message, url, location, type } = this.props.post;
   const { lat, lon } = location;
   const isImagePost = type === 'image';
   const customIcon = isImagePost ? undefined : {
     url: blueMarkerUrl,
     scaledSize: new window.google.maps.Size(26, 41),
   };
   return (
     <Marker
       position={{ lat, lng: lon }}
       onMouseOver={isImagePost ? this.handleToggle : undefined}
       onMouseOut={isImagePost ? this.handleToggle : undefined}
       onClick={isImagePost ? undefined: this.handleToggle}
       icon={customIcon}
     >
       {this.state.isOpen ? (
         <InfoWindow>
           <div>
             {isImagePost
               ? <img src={url} alt={message} className="around-marker-image"/>
               : <video src={url} controls className="around-marker-video"/>}
             <p>{`${user}: ${message}`}</p>
           </div>
         </InfoWindow>
       ) : null}
     </Marker>
   );
 }
}

// 这段代码定义了一个名为AroundMarker的React组件，它用于在谷歌地图上显示一个标记点，并在用户与标记点进行交互时显示信息窗口。以下是代码的主要功能的解释：

// 导入了React、react-google-maps库中的Marker和InfoWindow组件，以及prop-types库。
// 定义了一个名为AroundMarker的类组件。
// 使用propTypes静态属性指定了post属性的类型为object，并且它是必需的。
// 定义了一个名为isOpen的状态，用于跟踪信息窗口是否打开。
// 定义了handleToggle方法，用于切换信息窗口的打开和关闭状态。
// 在render方法中，从this.props.post中获取帖子对象的属性，例如用户、消息、URL、位置和类型。
// 检查帖子类型是否为图片类型，并根据需要设置自定义图标。如果是图片类型，图标将使用默认的谷歌地图标记图标；否则，将使用一个蓝色标记图标。
// 在Marker组件中，设置标记点的位置和相关的事件处理函数。如果是图片类型的帖子，将触发鼠标悬停和离开时的handleToggle方法；如果是视频类型的帖子，则不会触发这些事件。
// 根据isOpen状态的值决定是否渲染InfoWindow组件。如果isOpen为true，则显示信息窗口，并根据帖子类型渲染相应的内容（图片或视频）以及用户和消息信息。
// 最后，将AroundMarker组件导出供其他组件使用。
// 这段代码的功能是在谷歌地图上显示一个标记点，并在用户与标记点进行交互时显示相关信息。当用户将鼠标悬停在图片类型的标记点上时，信息窗口会自动打开，移开鼠标时窗口关闭。对于非图片类型的标记点，点击标记点会打开或关闭信息窗口。信息窗口内显示了帖子的内容（图片或视频）以及相关的用户和消息信息。
