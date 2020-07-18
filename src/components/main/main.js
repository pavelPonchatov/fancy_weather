import React, { useState, useEffect } from 'react'
import './main.scss'
import Date from './date/date'
import Temperature from './temperature/temperature'
import Map from './map/map'
import {geoKey, weatherKey} from './../../const'





const Main = (props) => {
    const [coordinate, setCoordinate] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [weatherData, setWeatherData] = useState('');
    const [cityData, setCityData] = useState('');
    const {getResultInputValue} = props;

        useEffect( () => {
            const getGeo = async () => {
                const url = `https://ipinfo.io/?token=${geoKey}`;
                
                const res = await fetch(url);
                const data = await res.json();
                setCity(data.city);
                setCountry(data.country);
                setCoordinate(data.loc.split(','));
                
            }

            getGeo();
        }, [])

        const translateWord = (language, en, ru, be) => {
            switch(language) {
                case 'en': return en;
                case 'ru': return ru;
                case 'be': return be;
    
                default: return en;
            }
        }

        useEffect( () => {
            const getWeather = async () => {
                if (props.inputValue === undefined) {
                    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherKey}&lang=${props.language}&units=${props.tempFormat}`;
                    const res = await fetch(url);
                    const data = await res.json();
                    console.log(data);
                    setWeatherData(data.list);
                    setCityData(data.city);
                    getResultInputValue(data.city);
                } else {
                    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${props.inputValue}&appid=${weatherKey}&lang=${props.language}&units=${props.tempFormat}`;
                    const res = await fetch(url);
                    const data = await res.json();
                    setWeatherData(data.list);
                    setCityData(data.city);
                    getResultInputValue(data.city);
                }

            }

            getWeather();

        },[city, props.inputValue, props.tempFormat, props.language, getResultInputValue]);
        

    
    return (
        <main className='main' >
            <div className='main-wrapper' >
                <Date nameCity = {city} codeCountry = {country} cityData={cityData} inputValue={typeof cityData === 'undefined' ? undefined : props.inputValue} language={props.language} translateWord={translateWord}/>
                <Temperature weather = {weatherData} language={props.language} translateWord={translateWord}/>
            </div>
            <Map coordinate={cityData} language={props.language} translateWord={translateWord}/>
        </main>

    )
}

export default Main