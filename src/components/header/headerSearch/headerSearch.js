import React, { useState, useEffect, useMemo } from 'react'
import './headerSearch.scss'




const HeaderSearch = ({getInputVaulue, resultInputValue}) => {
    const inputValue = React.createRef();
    const buttonSearch = React.createRef();

    useEffect(() => {
        const checkCorrect = () => {
            resultInputValue === undefined ? inputValue.current.classList.add('input-search--error') : inputValue.current.classList.remove('input-search--error');
        }
        checkCorrect();
    }, [inputValue, resultInputValue])

    const translateWord = (language, en, ru, be) => {
        switch(language) {
            case 'en': return en;
            case 'ru': return ru;
            case 'be': return be;

            default: return en;
        }
    }

    
    
    return useMemo(() => {
        return (
            <div className='header-Search'>
                <input ref={inputValue} className='input-search' 
                placeholder={translateWord(localStorage.getItem('language'), 'Search city', 'Поиск города', 'Пошук горада')}
                onKeyDown={(e) => {if (e.keyCode === 13) getInputVaulue(inputValue.current.value)}}/>
    
                <span className='mic-icon'></span>
                <button ref={buttonSearch} className='button-search' onClick={() => {
                    getInputVaulue(inputValue.current.value)
                    }}>{translateWord(localStorage.getItem('language'), 'Search', 'Поиск', 'Пошук')}</button>
            </div>
    
        )
    }, [buttonSearch, getInputVaulue, inputValue])
}

export default HeaderSearch