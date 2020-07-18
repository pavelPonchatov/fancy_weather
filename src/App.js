import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/header/header'
import Main from './components/main/main'
import './app.scss'

const imgToken = 'SsY82pNQNSIlQJ5j6Nr4Bm2ZwWRdtltzury9sE3S-rQ'

function App() {
  const [inputValue, setInputValue] = useState();
  const [resultInputValue, setResultInputValue] = useState('');
  const [tempFormat, setTempFormat] = useState('');
  const [imageBack, setImageBack] = useState('./bg-default.png');
  const [language, setLanguage] = useState();


  const getInputVaulue = useCallback((value) => {
    setInputValue(value);
  }, []) 
  const getResultInputValue = useCallback((value) => {
    setResultInputValue(value);
  }, [])
  const getTempFormat = useCallback((value) => {
    setTempFormat(value);
  }, [])
  const getLanguage = useCallback((value) => {
    setLanguage(value);
  }, [])

    const getImage = async () => {
      const url = `https://api.unsplash.com/photos/random?query=nature,summer&client_id=${imgToken}&orientation=landscape`;
      const res = await fetch(url);
      const data = await res.json();
      setImageBack(data.urls.regular);
    }
  useEffect(() => {
    getImage();
  })

  return useMemo( () => {
    return (
      <div className='wrapper-img'
      style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${imageBack})`,backgroundSize: 'cover'}}>
 
        <div className='wrapper'>
         <Header getInputVaulue={getInputVaulue} resultInputValue={resultInputValue} getTempFormat={getTempFormat} getImage={getImage} getLanguage={getLanguage} language={language}/>
         <Main inputValue={inputValue} getResultInputValue={getResultInputValue} tempFormat={tempFormat} language={language}/>
        </div>
     </div>
    );
  }


  ,[getInputVaulue, getLanguage, getResultInputValue, getTempFormat, imageBack, inputValue, language, resultInputValue, tempFormat])

}

export default App;
