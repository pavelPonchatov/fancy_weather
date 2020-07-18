import React, { useState, useEffect } from 'react'
import './date.scss'
import nameCountry from './fullNameCountry.json';
import nameCountryRu from './fullNameCountryRu.json';
import nameCountryBe from './fullNameCountryBe.json';
import {weekday, weekdayRu, weekdayBE, month, monthRu, monthBe} from './../../../const'


const Date = (props) => {
    const [dateTime, setDataTime] = useState(new window.Date());
    const [cityName, setCityName] = useState('');
    const [countryName, setCountryName] = useState('');
    

    const tick = setInterval(() => {setDataTime(new window.Date())}, 1000);

    useEffect( () => {
        const getCityName = () => {
            if (typeof props.cityData === 'object') {
                setCityName(props.cityData.name);
                setCountryName(props.translateWord(localStorage.getItem('language'), nameCountry[props.cityData.country], nameCountryRu[props.cityData.country], nameCountryBe[props.cityData.country]));
            }
        }
        getCityName();
    }, [props, props.cityData, props.language])



    return (
        <div className='main__date'>
            <h1 className='main__text city-name'>{`${cityName}, ${countryName}`}</h1>
            <div className='wrapper-time'>
                <h4 className='main__text date-now'>{`${props.translateWord(localStorage.getItem('language'), weekday[dateTime.getDay()], weekdayRu[dateTime.getDay()], weekdayBE[dateTime.getDay()])} ${dateTime.getDate()} ${props.translateWord(localStorage.getItem('language'), month[dateTime.getMonth()], monthRu[dateTime.getMonth()], monthBe[dateTime.getMonth()])}`}</h4>
                <h4 className='main__text time'>{ dateTime.toLocaleTimeString('en-US', {hour12: false,hour: "numeric", minute: "numeric", second: "numeric"}) }</h4>
            </div>

        </div>


    ) 
}

export default Date