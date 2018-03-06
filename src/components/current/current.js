

 import React, {Component } from 'react';
 import './current.css';
 import loader from '../img/loader-new.gif';
 import {toCelsius, toFahrenheit, tryConvert } from '../tools/tempconverter.js'
 import {getWeatherViaLocation} from '../tools/getweather.js'

export default class Current extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            main: [],
            weather: [],
            location: [],
            temp: 0,
            celsius: true
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        getWeatherViaLocation().then(data => 
            {this.setState({main: data.main,
                            weather: data.weather[0],
                            location: data.name,
                            temp: data.main.temp,
                            unit: "C",
                            isLoading: false });
            console.log(data.main);
            console.log(data.weather);
            console.log(data);
        });
    }
    

    handleChange(e) {
        this.setState({ celsius: !this.state.celsius })
    }

    render() {
         const {location, temp, main, unit, weather, isLoading, celsius } = this.state;

            if (isLoading) {
                return <img className="loader" src={loader}/>
            }

                return (

                    <div className="content">
                        <ul>
                            <li><h2>{location}</h2></li>
                            <li><p>{weather.main}</p></li>
                            <li><img className="weather-icon" src={`http://openweathermap.org/img/w/${weather.icon}.png`} /></li>
                            <li><h1>{celsius ? temp : toFahrenheit(temp)}{celsius ? 'C' : 'F'}°</h1></li>
                            <li><div className="hot">{main.temp_max}</div><div className="cold">{main.temp_min}</div></li>
                            <li> cloudy</li>
                            <li></li>
                            <li>humidity: {main.humidity}%</li>
                        </ul>
                        <ul>
                            <li> {weather.description}</li>
                        </ul>
                        <div className="push"></div>
                    </div>
                )
    }
}