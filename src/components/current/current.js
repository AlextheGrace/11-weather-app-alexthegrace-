 import React, {Component } from 'react';
 import './current.css';
 import  Weather  from '../../model/Weather';
 import loader from './img/loader-new.gif';


 var getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }


async function getWeatherViaLocation() {
    const apikey = "e050a36d3b735728a17a7aa66e12cc90";
    console.log("getting location....");
    let position = await getPosition();
    console.log("getting weather....")
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${apikey}`);
    let data = await response.json();
    return data;
}


export default class Current extends Component {
    constructor(props) {
        super(props);
        this.state = {
            main: [],
            weather: [],
            location: [],
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        getWeatherViaLocation().then(data => 
            {this.setState({main: data.main,
                            weather: data.weather[0],
                            location: data.name,
                            isLoading: false });
            console.log(data.main);
            console.log(data.weather);
            console.log(data);
        });
    }

    handleChange(e) {
        
    }
    render() {
         const {location, main, weather, isLoading } = this.state;

            if (isLoading) {
                return <img className="loader" src={loader}/>
          }

                return (

                    <div className="content">
                        <ul>
                            <li><h2>{location}</h2></li>
                            <li> {weather.main}</li>
                            <li><img className="weather-icon" src={`http://openweathermap.org/img/w/${weather.icon}.png`} /></li>
                            <li><h1>{main.temp}°</h1></li>
                            <li> cloudy</li>
                            <li> </li>
                            <li>humidity: {main.humidity}</li>
                        </ul>

                        <ul>
                            <li> {weather.description}</li>
                        </ul>
                        <div className="push"></div>
                    </div>
        )
    }
}