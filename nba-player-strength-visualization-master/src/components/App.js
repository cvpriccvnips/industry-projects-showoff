import React, { Component } from 'react';
import { TopNavBar } from './TopNavBar';
import { Main } from './Main';
import {Footer} from './Footer'

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopNavBar/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}

export default App;