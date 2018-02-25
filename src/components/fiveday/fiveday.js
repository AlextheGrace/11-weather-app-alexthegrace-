import React, {Component } from 'react';
import './fiveday.css';
import loader from '../img/loader-new.gif';


//TODO: import export this as reusable
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
            temp:[]
         };
     }
     
     componentDidMount(){
        this.setState({ isLoading: true });
        getWeatherFiveDayForecast().then(data => {
            // const result = groupBy(data.list,"dt");
            const convertDate = data.list;
            convertDate.forEach(element => {
                element.dt = new Date(element.dt*1000).getUTCDate();
            });
            const output = groupBy(convertDate,'dt');
            console.log(data.list);
            console.log(output);
            console.log(output[0]);

           
            this.setState({
                forecastList: data.list,
                isLoading: false
             });
        });
     }
     render(){
          
        
        const {forecastList, isLoading } = this.state;

        

        if (isLoading) {
            return <img className="loader" src={loader}/>
        }
        
        
        const content = forecastList.map((forecast,index) =>
        <div key={index}>
            {}
            <h3>  {forecast.dt_txt} </h3> 
            <p>temp: {forecast.main.temp} </p>
            <p>weather: {forecast.weather[0].main} </p>
            
            <img className="weather-icon" src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} />
            <p>{forecast.clouds.all}</p> 
        
        </div>
        );

         return( 
            <div className="fiveday-forecast">
                {content}
            </div>  
        )
     }
 }