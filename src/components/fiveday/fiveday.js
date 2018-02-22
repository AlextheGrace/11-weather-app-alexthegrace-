import React, {Component } from 'react';
import './fiveday.css';



var getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
 
 
 async function getWeatherFiveDayForecast() {
    const apikey = "e050a36d3b735728a17a7aa66e12cc90";
    console.log("getting location....");
    let position = await getPosition();
    console.log("getting weather....")
    let response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${apikey}`);
    let data = await response.json();
    return data;
 }

 



 export default class FivedayForeCast extends Component {
     constructor(props){
         super(props);
         this.state = {
            forecastList: [],
            temp:[]
         };
     }
     componentDidMount(){
        
        getWeatherFiveDayForecast().then(data => {
            
            console.log(data.list)
            this.setState({
                forecastList: data.list,
                temp: data.list.main
             });
        });
     }
     render(){
        
        const {forecastList } = this.state;
        
        
        const content = forecastList.map((post,index) =>
        <div key={index}>
            <h3>{post.dt_txt}</h3>
            <p>temp: {post.main.temp} </p>
            <p>temp: {post.weather[0].main} </p> 
            <p>{post.clouds.all}</p>
            
        </div>
        );

         return(
             
            <div className="fiveday-forecast">
                {content}
            </div>
            
        )
     }
 }