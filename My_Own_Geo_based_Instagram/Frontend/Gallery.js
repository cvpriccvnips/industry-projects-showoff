import React, { Component }from 'react';
import PropTypes from 'prop-types';
import GridGallery from 'react-grid-gallery';

export class Gallery extends Component {
 static propTypes = {
   images: PropTypes.arrayOf(
     PropTypes.shape({
       user: PropTypes.string.isRequired,
       src: PropTypes.string.isRequired,
       thumbnail: PropTypes.string.isRequired,
       caption: PropTypes.string,
       thumbnailWidth: PropTypes.number.isRequired,
       thumbnailHeight: PropTypes.number.isRequired
     })
   ).isRequired
 }

 render() {
   const images = this.props.images.map((image) => {
     return {
       ...image,
       customOverlay: (
         <div style={captionStyle}>
           <div>{`${image.user}: ${image.caption}`}</div>
         </div>
       ),
     };
   });

   return (
     <div style={wrapperStyle}>
       <GridGallery
         backdropClosesModal
         images={images}
         enableImageSelection={false}/>
     </div>
   );
 }
}


const wrapperStyle = {
 display: "block",
 minHeight: "1px",
 width: "100%",
 border: "1px solid #ddd",
 overflow: "auto"
};

const captionStyle = {
 backgroundColor: "rgba(0, 0, 0, 0.8)",
 maxHeight: "240px",
 overflow: "hidden",
 position: "absolute",
 bottom: "0",
 width: "100%",
 color: "white",
 padding: "2px",
 fontSize: "90%"
};

/*

这段代码定义了一个名为Gallery的React组件，用于显示图片网格画廊。

以下是代码的主要功能：

通过import语句引入了React、Component、PropTypes和react-grid-gallery模块。

Gallery组件继承自Component类，并定义了images属性的类型检查。

在render方法中，通过this.props.images.map方法遍历images数组，对每个图片进行处理。

使用展开运算符...复制image对象，并为每个图片添加了customOverlay属性。customOverlay是一个自定义的覆盖层，用于显示图片的作者和标题。

customOverlay是一个包含作者和标题信息的<div>元素，样式由captionStyle定义。

最后，将处理后的图片数组传递给react-grid-gallery组件进行展示。react-grid-gallery组件具有一些属性，如backdropClosesModal用于点击背景关闭模态框，enableImageSelection用于禁用图片选择等。

wrapperStyle定义了画廊容器的样式，包括宽度、边框和溢出设置。

captionStyle定义了覆盖层的样式，包括背景颜色、最大高度、溢出设置、位置、宽度、颜色和字体大小。

这个组件用于展示一个图片网格画廊，可以根据传入的图片数组生成相应的网格展示，并提供了自定义的覆盖层用于显示图片的作者和标题。
*/