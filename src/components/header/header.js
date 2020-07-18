import React from 'react'
import './header.scss'
import HeaderButtons from './headerButtons/headerButtons'
import HeaderSearch from './headerSearch/headerSearch'

const Header = (props) => {
    return (
        <header className='header'>
            <HeaderButtons getTempFormat={props.getTempFormat} getImage={props.getImage} getLanguage={props.getLanguage}/>
            <HeaderSearch getInputVaulue={props.getInputVaulue} resultInputValue={props.resultInputValue} language={props.language}/>
        </header>
    )
}

export default Header