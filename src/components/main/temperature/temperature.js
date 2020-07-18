import React, {useState, useEffect, useRef, useMemo } from 'react'
import './temperature.scss'
import TemperatureThreeDays from './temperatureThreeDays/temperatureThreeDays'



const Temperature = (props) => {
    const [mainTemp, setMainTemp] = useState(0);
    const [mainIcon, setMainIcon] = useState('');
    const [weatherDesc, setWeatherDesc] = useState('');
    const [weatherFellLike, setWeatherFellLike] = useState('');
    const [weatherWind, setWeatherWind] = useState('');
    const [weatherHumidity, setWeatherHumidity] = useState('');


    useEffect( () => {
        const getDescWeather = () => {
            if (typeof props.weather === 'object') {
                setMainTemp(Math.floor(props.weather[1].main.temp));
                setMainIcon(props.weather[0].weather[0].icon);
                setWeatherDesc(props.weather[1].weather[0].description);
                setWeatherFellLike(props.weather[1].main.feels_like);
                setWeatherWind(props.weather[1].wind.speed);
                setWeatherHumidity(props.weather[1].main.humidity);
             }
        }
        getDescWeather();
    }, [props.weather])
    
    
    return useMemo(() => {
        return (
            <div className='main__temperature'>
                <div className='temperature__number--big'>{mainTemp}</div>
                <div className='icon--big'  style={{background: `url("./weather-icon/${mainIcon}.svg") no-repeat`}}></div>
    
                <div className='temperature__desc'>
                    <div className='desc__title'>{weatherDesc}</div>
                     <ul className='desc__list'>
                         <li className='desc__item'>{`${props.translateWord(localStorage.getItem('language'), 'FEELS LIKE', 'ОЩУЩАЕТСЯ КАК', 'Адчуваецца як')}: ${Math.floor(weatherFellLike)}°`}</li>
                         <li className='desc__item'>{`${props.translateWord(localStorage.getItem('language'), 'wind', 'ветер', 'Вецер')}: ${weatherWind} m/s`}</li>
                         <li className='desc__item'>{`${props.translateWord(localStorage.getItem('language'), 'humidity', 'влажность', 'Вільготнасць')}: ${weatherHumidity}%`}</li>
                     </ul>
                </div>
    
                <TemperatureThreeDays weatherList={props.weather} language={props.language} translateWord={props.translateWord}/>
            </div>
        ) 
    }, [mainIcon, mainTemp, props, weatherDesc, weatherFellLike, weatherHumidity, weatherWind])  
}

export default Temperature