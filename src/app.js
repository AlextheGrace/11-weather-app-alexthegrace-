
import React, {Component } from 'react';
import { Header, Current, Footer,Testcomponent, FivedayForeCast  } from './components';




export default class App extends Component {
    render() {
        return (
        <div className="app">
            <Header/>
                <FivedayForeCast/>
            {/* <Footer/> */}
        </div>

        )
    }
}
