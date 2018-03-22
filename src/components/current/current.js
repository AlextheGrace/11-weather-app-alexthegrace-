

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
            celsius: true,
            sun: []
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        getWeatherViaLocation().then(data => 
            {this.setState({main: data.main,
                            weather: data.weather[0],
                            location: data.name,
                            temp: data.main.temp,
                            sun: data.sys,
                            isLoading: false });
            console.log(data.main);
            console.log(data.weather);
            console.log(data);
        });
    }
    

    handleChange(e) {
        this.setState({ celsius: !this.state.celsius })
    }

    convertSunToTime(unixTime) {
        let dateTime = new Date(unixTime*1000);
        let hours = dateTime.getHours();
        let minutes = "0" + dateTime.getMinutes();
        let formattedTime = hours + ':' + minutes.substr(-2)
            return formattedTime;
    }

    render() {
         const {location, temp, main, weather, isLoading, celsius, sun } = this.state;

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
                            <button onClick={this.handleChange}>Show in {celsius ? 'Fahrenheit' : 'Celsius'}</button>
                            <li>sunrise: {this.convertSunToTime(sun.sunrise)} </li>
                            <li>sunset:{this.convertSunToTime(sun.sunset)} </li>
                            <li><div className="hot">{main.temp_max}</div><div className="cold">{main.temp_min}</div></li>
                            <li></li>
                            <li>humidity: {main.humidity}%</li>
                        </ul>
                        <ul>
                            <li>{weather.description}</li>
                        </ul>
                        <div className="push"></div>
                    </div>
                )
    }
}