
import React, {Component } from 'react';
import { Header, Current, Footer,Testcomponent, FivedayForeCast  } from './components';
import { Switch, Route } from 'react-router-dom';



export default class App extends Component {
    render() {
        return (
        <div className="app">
        <Header/>
        <Switch>
                <Route exact path='/' component={Current}/>
                <Route exact path='/daily' component={FivedayForeCast}/> 
            {/* <Footer/> */}
        </Switch>
        </div>

        )
    }
}
