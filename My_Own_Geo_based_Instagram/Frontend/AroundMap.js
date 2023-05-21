import React from 'react';
import {
 withScriptjs,
 withGoogleMap,
 GoogleMap,
} from "react-google-maps";
import { AroundMarker } from './AroundMarker';
import { POS_KEY } from '../constants';

class NormalAroundMap extends React.Component {
 reloadMarker = () => {
   const center = this.getCenter();
   const radius = this.getRadius();
   this.props.loadPostsByTopic(center, radius);
 }

 getCenter() {
   const center = this.map.getCenter();
   return { lat: center.lat(), lon: center.lng() };
 }

 getRadius() {
   const center = this.map.getCenter();
   const bounds = this.map.getBounds();
   if (center && bounds) {
     const ne = bounds.getNorthEast();
     const right = new window.google.maps.LatLng(center.lat(), ne.lng());
     return 0.001 * window.google.maps.geometry.spherical.computeDistanceBetween(center, right);
   }
 }


 getMapRef = (mapInstance) => {
   this.map = mapInstance;
   window.map = mapInstance;
 }

 render() {
   const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
   return (
     <GoogleMap
       ref={this.getMapRef}
       defaultZoom={11}
       defaultCenter={{ lat, lng: lon }}
       onDragEnd={this.reloadMarker}
       onZoomChanged={this.reloadMarker}
     >
       {this.props.posts.map((post) => <AroundMarker post={post} key={post.url} />)}
     </GoogleMap>
   );
 }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));

// 这段代码是一个使用react-google-maps库创建的React组件，用于显示一个基本的谷歌地图并在地图上显示标记点。以下是代码的主要功能的解释：

// 导入了React以及从react-google-maps库中导入的几个相关组件和常量。
// 定义了一个名为NormalAroundMap的类组件。
// 在NormalAroundMap组件中定义了一些方法和属性，用于处理地图和标记点的加载和更新。
// reloadMarker方法用于重新加载地图上的标记点。它获取地图的中心点和半径，并通过调用父组件传递的loadPostsByTopic方法来加载该区域内的帖子。
// getCenter方法用于获取地图的中心点坐标。
// getRadius方法用于计算地图的半径。它获取地图的中心点和边界，并使用谷歌地图API计算中心点到右边界的距离来估算半径。
// getMapRef方法用于获取地图实例的引用，并将其保存在组件的map属性中。
// 在render方法中，通过读取本地存储中的位置信息，获取经纬度坐标用于设置地图的初始中心点。
// 使用withScriptjs和withGoogleMap高阶组件将NormalAroundMap组件包装，使其具有与谷歌地图相关的功能。
// 在GoogleMap组件中，设置了地图的默认缩放级别、默认中心点以及拖动和缩放事件的处理函数。
// 使用map方法将posts数组中的每个帖子映射为AroundMarker组件，并通过属性传递给它们。
// 最后，将包装后的AroundMap组件导出供其他组件使用。
// 这段代码的功能是创建一个基本的谷歌地图，并在地图上显示一组标记点，这些标记点代表了一些帖子的位置信息。它允许用户拖动地图或改变缩放级别时重新加载地图上的标记点。