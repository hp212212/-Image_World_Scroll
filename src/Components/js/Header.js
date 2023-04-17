import React, { useState, useEffect } from 'react'
import Sun from '../Assets/Images/sun-color-icon.svg'
import Moon from '../Assets/Images/moon-icon.svg'
import GoToUp from '../Assets/Images/GoToUp.webp'
import '../css/Header.css'

export default function Header() {
  const [btnName, setBtnName] = useState(Sun)
  const [Theme, setTheme] = useState('Dark')
  const ThemToggle = () => {
    if (btnName === Moon) {
      setTheme('Dark')
      setBtnName(Sun)
    } else {
      setTheme('Light')
      setBtnName(Moon)
    }
  }
  // const refToTop = useRef();
  const GoTop = () => {
    const body = document.querySelector('#root');
    body.scrollIntoView({
      behavior: 'smooth'
    }, 500)

  }

  useEffect(() => {
    document.body.className = Theme
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Theme])
  return (
    <>
      <img className='HeaderImg' src={btnName} alt="Hitesh" onClick={ThemToggle} />
      <h1 className='HeaderH1'>Search Images</h1>
      <img className='SearchTop' src={GoToUp} alt="Hitesh"
        onClick={GoTop}
      />
    </>
  )
}
