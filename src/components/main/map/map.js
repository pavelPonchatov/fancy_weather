import React, { useState, useEffect, useMemo } from 'react'
import './map.scss'
import {apiTokenMap} from './../../../const'



const Map = (props) => {
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

   
    useEffect(() => {
        const mapInitial = () => {
            mapboxgl.accessToken = apiTokenMap;

            if (typeof props.coordinate === 'object') {
                    const mapbox = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: typeof props.coordinate === 'object' ? [props.coordinate.coord.lon, props.coordinate.coord.lat] : [0, 0],
                        zoom: 10
                        });
        
                document.querySelectorAll('.mapboxgl-control-container').forEach(el => el.style.display = 'none');
                let arrMap = document.querySelectorAll('.mapboxgl-canvas-container');
                
                arrMap.forEach(el => {
                    if (arrMap.length > 1) {
                        el.style.display = 'none';
                    }
                    arrMap[arrMap.length - 1].style.display = 'block';
                })
            }
        }
            
            mapInitial();
    }, [mapboxgl.Map, mapboxgl.accessToken, props.coordinate])

    const convertCoordinate =  (dd) => {
        let deg = dd | 0;
        let frac = Math.abs(dd - deg);
        let min = (frac * 60) | 0;
        return `${deg}°${min}'`;
    }


    return useMemo(() => {
        return (
            <div className='map-wrapper'>
                <div className='map' id='map'></div>
                <div className='coordinate'>{`${props.translateWord(localStorage.getItem('language'), 'Latitude', 'Широта', 'Шырата')}: ${typeof props.coordinate === 'object' ? convertCoordinate(props.coordinate.coord.lat) : 0}`}</div>
                <div className='coordinate'>{`${props.translateWord(localStorage.getItem('language'), 'Longitude', 'Долгота', 'Даўгата')}: ${typeof props.coordinate === 'object' ? convertCoordinate(props.coordinate.coord.lon) : 0}`}</div>
            </div>
        )
    }, [props])
}

export default Map