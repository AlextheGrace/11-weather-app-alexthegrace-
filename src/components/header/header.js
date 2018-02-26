import React, {Component } from 'react';
import './header.css';

export default class Header extends Component {
    render() {
        return (
        <div className="header">
            <h1>Whats the Weather?</h1>
        <nav>
            <ul>
                <a href="/daily"><li>daily</li></a>
                <a href="/"><li>current</li></a> 
            </ul>
        </nav>
        </div>
        )
    }
}