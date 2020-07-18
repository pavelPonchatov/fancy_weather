import React, { useState, useEffect, useMemo } from 'react'
import './temperatureThreeDays.scss'
import {weekdayFull, weekdayFullRu, weekdayFullBe} from './../../../../const'

const TemperatureThreeDays = (props) => {
    const [nameDay1, setNameDay1] = useState('');
    const [nameDay2, setNameDay2] = useState('');
    const [nameDay3, setNameDay3] = useState('');
    const [tempDay1, setTempDay1] = useState('');
    const [tempDay2, setTempDay2] = useState('');
    const [tempDay3, setTempDay3] = useState('');
    const [iconDay1, setIconDay1] = useState('');
    const [iconDay2, setIconDay2] = useState('');
    const [iconDay3, setIconDay3] = useState('');



    useEffect( () => {
        const getDayAll = () => {
            if (typeof props.weatherList === 'object') {
                let dateTime = new window.Date(props.weatherList[9].dt_txt);
                setNameDay1(props.translateWord(localStorage.getItem('language'), weekdayFull[dateTime.getDay()], weekdayFullRu[dateTime.getDay()], weekdayFullBe[dateTime.getDay()]));
                let dateTime2 = new window.Date(props.weatherList[17].dt_txt);
                setNameDay2(props.translateWord(localStorage.getItem('language'), weekdayFull[dateTime2.getDay()], weekdayFullRu[dateTime2.getDay()], weekdayFullBe[dateTime2.getDay()]));
                let dateTime3 = new window.Date(props.weatherList[25].dt_txt);
                setNameDay3(props.translateWord(localStorage.getItem('language'), weekdayFull[dateTime3.getDay()], weekdayFullRu[dateTime3.getDay()], weekdayFullBe[dateTime3.getDay()]));
            }
        }

        const getTemp = () => {
            if (typeof props.weatherList === 'object') {
                setTempDay1(Math.floor(props.weatherList[8].main.temp));
                setTempDay2(Math.floor(props.weatherList[16].main.temp));
                setTempDay3(Math.floor(props.weatherList[24].main.temp));
            }
        }
        
        const getIcon = () => {
            if (typeof props.weatherList === 'object') {
                setIconDay1(`url("./weather-icon/${props.weatherList[8].weather[0].icon}.svg") no-repeat`);
                setIconDay2(`url("./weather-icon/${props.weatherList[16].weather[0].icon}.svg") no-repeat`);
                setIconDay3(`url("./weather-icon/${props.weatherList[24].weather[0].icon}.svg") no-repeat`);
            }
        }
        

        getDayAll();
        getTemp();
        getIcon();
    }, [props, props.weatherList])

    

    
    return useMemo(() => {
        return (
            <div className='temperature__days'>
                <ul className='days__list'>
                    <li className='day'>
                        <h5 className='day__name'>{nameDay1}</h5>
                        <div className='wrapper-day'>
                            <div className='day__number'>{tempDay1}°</div>
                            <div className='day__icon' style={{background: iconDay1}}></div>
                        </div>
    
                    </li>
                    <li className='day'>
                        <h5 className='day__name'>{nameDay2}</h5>
                        <div className='wrapper-day'>
                            <div className='day__number'>{tempDay2}°</div>
                            <div className='day__icon' style={{background: iconDay2}}></div>
                        </div>
                    </li>
                    <li className='day'>
                        <h5 className='day__name'>{nameDay3}</h5>
                        <div className='wrapper-day'>
                            <div className='day__number'>{tempDay3}°</div>
                            <div className='day__icon' style={{background: iconDay3}}></div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }, [iconDay1, iconDay2, iconDay3, nameDay1, nameDay2, nameDay3, tempDay1, tempDay2, tempDay3])
}

export default TemperatureThreeDays