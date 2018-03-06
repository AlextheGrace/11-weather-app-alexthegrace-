

import './fiveday.css';
import React, { Component } from 'react';
import loader from '../img/loader-new.gif';
import {getWeatherFiveDayForecast } from '../tools/getweather.js'
import {toCelsius, toFahrenheit, tryConvert } from '../tools/tempconverter.js'



 
const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    });
 }

// const convertToDate = function(array,date) {
//     return array.forEach(el => {
//         el.date =  new Date(el.Date*1000).getUTCDate();
//     });
// }




export default class FivedayForeCast extends Component {
    constructor(props){
         super(props);
         this.convertTemp = this.handleChange.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.state = {
            forecastList: [],
            location:[],
            temp:[],
            unit: "C",
            temp: 0,
         };
     }
     
    componentDidMount(){
        this.setState({ isLoading: true });
        getWeatherFiveDayForecast().then(data => {
        const dataList = data.list.forEach(data => {
            return data.dt = new Date(data.dt*1000).getUTCDate();
            
        });
        const group = groupBy(data.list);
        console.log(dataList);
            
            console.log(data.list);
            this.setState({
                forecastList: data.list,
                location: data.name,
                isLoading: false,
                unit: "C",
                celsius: true
             });   
        });
    }
    
    

    handleChange(e) {
        this.setState({ celsius: !this.state.celsius })
    }

     
    render(){
          
        
        const { unit, location, forecastList, isLoading, celsius } = this.state;

        if (isLoading) {
            return <img className="loader" src={loader}/>
        }
        
        
        

        

        const content = forecastList.map((forecast,index) =>
        <div className="forecast-container" key={index}>
            <h3>{forecast.dt_txt}</h3> 
                <ul>
                    <li><p className="temp">{celsius ? forecast.main.temp : toFahrenheit(forecast.main.temp)}{celsius ? 'C' : 'F'}°</p></li>
                    <p>weather: {forecast.weather[0].main} </p>
                    <div className="hot">{forecast.main.temp_max}</div><div className="cold">{forecast.main.temp_min}</div>
                    <img className="weather-icon" src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} />
                    <p>{forecast.clouds.all}</p> 
                </ul>
        </div>
        );

        return( 
            <div>
                <h1>{location}</h1>
                <button onClick={this.handleChange}>Show in {celsius ? 'F' : 'C'}</button>
                    <div className="fiveday-forecast">
                        {content}
                    </div>
            </div>  
        )
     }
}