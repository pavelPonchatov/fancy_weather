import React, { useState, useCallback, useMemo } from 'react'
import './headerButtons.scss'




const HeaderButtons = (props) => {

    const [isOpenMenu, setOpenMenu] = useState(false);
    const [temperature, setTemperature] = useState('metric');
    const [isLanguage, setLanguage] = useState('en');

    const menuLanguage = React.createRef();

    const switchLanguage = useCallback((e) => {
        const allLanguage = menuLanguage.current;

        allLanguage.childNodes.forEach(el => {
            el.classList.add('inactive');
            if (el.getAttribute('id') === e.target.getAttribute("id") ) {
                setLanguage(el.getAttribute("id"));
                localStorage.setItem('language',el.getAttribute("id"));
                setOpenMenu(false);
                el.classList.remove('inactive');
            }
        });
        
    },[menuLanguage])
    props.getLanguage(isLanguage);
    props.getTempFormat(temperature);
    

    return useMemo(() => {
      return (
            <div className='header-buttons'>
                <button className='button button--update' onClick={props.getImage}>
                    <div className='update-icon'></div>
                </button>
                <div className='language-menu'>
                    <button className={`button ${isOpenMenu ? 'button--no-border-radius': null}`} onClick={() => isOpenMenu ?  setOpenMenu(false) :  setOpenMenu(true)}>
                        <span>{localStorage.getItem('language') === null ? 'en' : localStorage.getItem('language')}</span>
                        <span className={`arrow-down ${isOpenMenu ? 'arrow--transform': null}`}></span>
                    </button>
                    <div ref={menuLanguage} onClick={switchLanguage} className={`drop-down-menu ${isOpenMenu ? 'drop-down-menu--show' : null}`} >
                       <button className='drop-down-menu__item button inactive' id='en'>EN</button>
                       <button className='drop-down-menu__item button inactive' id='ru'>RU</button>
                       <button className='drop-down-menu__item button inactive' id='be'>BE</button>
                    </div>
                </div>
                <button className={`button button--F ${temperature === 'imperial' ? null : 'inactive'}`} onClick={() =>  temperature === 'metric' ?  setTemperature('imperial') :  setTemperature('imperial')}>°F</button>
                <button className={`button button--C ${temperature === 'metric' ? null : 'inactive'}`} onClick={() => temperature === 'imperial' ?  setTemperature('metric') :  setTemperature('metric')}>°С</button>
            </div>
    
        )
    }, [isOpenMenu, menuLanguage, props.getImage, switchLanguage, temperature]) 
}

export default HeaderButtons
