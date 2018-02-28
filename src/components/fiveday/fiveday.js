

import './fiveday.css';
import React, {Component } from 'react';
import loader from '../img/loader-new.gif';
import {toCelsius, toFahrenheit, tryConvert } from '../tools/tempconverter.js'
import {getWeatherFiveDayForecast } from '../tools/getweather.js'



 
 const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    });
 }




 export default class FivedayForeCast extends Component {
     constructor(props){
         super(props);
         this.state = {
            forecastList: [],
            location:[],
            temp:[]
         };
     }
     
     componentDidMount(){
        this.setState({ isLoading: true });
        getWeatherFiveDayForecast().then(data => {
            // let groupedByDay = groupByTime(data.list, 'ts', 'day')
            console.log(data.list);
            this.setState({
                forecastList: data.list,
                location: data.name,
                isLoading: false
             });
        });
     }
     render(){
          
        
        const { location, forecastList, isLoading } = this.state;

        if (isLoading) {
            return <img className="loader" src={loader}/>
        }
        
        
        const locationTitle = <h2>{location}</h2>;
        const content = forecastList.map((forecast,index) =>
        <div className="forecast-container" key={index}>
            {}
            <h3>{forecast.dt_txt}</h3> 
            <ul>
                <li><p className="temp">{forecast.main.temp}</p></li>
                <p>weather: {forecast.weather[0].main} </p>
                <div className="hot">{forecast.main.temp_max}</div><div className="cold">{forecast.main.temp_min}</div>

                <img className="weather-icon" src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} />
                <p>{forecast.clouds.all}</p> 
            </ul>
        
        </div>
        );

         return( 
            <div>
                {locationTitle}

                    <div className="fiveday-forecast">
                        {content}
                    </div>
            </div>  
        )
     }
 }