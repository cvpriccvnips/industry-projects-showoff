import React from 'react';
import { TopBar } from './TopBar';
import { Main } from './Main';
import { TOKEN_KEY } from '../constants';

import '../styles/App.css';

class App extends React.Component {
 state = {
   isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
 }

 handleLoginSucceed = (token) => {
   localStorage.setItem(TOKEN_KEY, token)
   this.setState({ isLoggedIn: true });
 }

 handleLogout = () => {
   localStorage.removeItem(TOKEN_KEY);
   this.setState({ isLoggedIn: false });
 }

 render() {
   return (
     <div className="App">
       <TopBar handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn}/>
       <Main handleLoginSucceed={this.handleLoginSucceed} isLoggedIn={this.state.isLoggedIn}/>
     </div>
   );
 }
}

export default App;

// 这段代码是一个React组件，表示一个名为App的应用程序组件。它的主要功能如下：

// 导入了React模块以及其他所需的组件和常量。
// 定义了一个类组件App，并设置了一个初始状态isLoggedIn，它的值为从本地存储中获取的TOKEN_KEY对应的值（如果存在）的布尔值。
// 定义了一个handleLoginSucceed方法，用于在登录成功时更新状态和本地存储。
// 定义了一个handleLogout方法，用于在注销时清除本地存储和更新状态。
// 在render方法中，渲染了一个div元素，它的className属性设置为"App"，表示整个应用程序的根容器。
// 在根容器中，渲染了TopBar组件和Main组件，并通过属性将状态和方法传递给它们。
// TopBar组件接收handleLogout和isLoggedIn作为属性，用于显示顶部导航栏和处理注销操作。
// Main组件接收handleLoginSucceed和isLoggedIn作为属性，用于显示主要内容区域和处理登录成功操作。
// 总体来说，这段代码的主要功能是创建一个React应用程序组件，它包含了顶部导航栏和主要内容区域，并根据用户登录状态显示不同的界面和处理用户登录和注销操作。