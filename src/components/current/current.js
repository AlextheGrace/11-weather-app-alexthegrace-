 import React, {Component } from 'react';
 import './current.css';
 import  Weather  from '../../model/Weather';
 import loader from '../img/loader-new.gif';


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
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${apikey}`);
    let data = await response.json();
    return data;
}

    function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
    }
  
    function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
    }

    function convert(input) {
        return input + 10;  
    }


export default class Current extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            main: [],
            weather: [],
            location: [],
            temperature: {
            temp: 0,
            unit: "c",
            },
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        getWeatherViaLocation().then(data => 
            {this.setState({main: data.main,
                            weather: data.weather[0],
                            location: data.name,
                            temp: data.main.temp,
                            unit: "c",
                            isLoading: false });
            console.log(data.main);
            console.log(data.weather);
            console.log(data);
        });
    }
    

    handleChange(e) {
        
        this.setState({unit: e.target.value, });
        if(this.state.unit === "c") {
            this.setState({temp: 10});
        }
        else {
            this.setState({temp: 40 });
        }
        
        
            
        
    }
    render() {
         const {location, temp, main, unit, weather, isLoading } = this.state;

            if (isLoading) {
                return <img className="loader" src={loader}/>
            }

                return (

                    <div className="content">
                    
                        <ul>
                            <li><h2>{location}</h2></li>
                            <li><p>{weather.main}</p></li>
                            <li><img className="weather-icon" src={`http://openweathermap.org/img/w/${weather.icon}.png`} /></li>
                            <li><h1>{temp}</h1>
                                <select value={unit} onChange={this.handleChange}>
                                    <option value="c">C°(celcius)</option>
                                    <option value="f">F°(Fahrenheit)</option>
                                </select>
                            </li>
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