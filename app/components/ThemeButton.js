'use client'
import { useEffect } from 'react'
import '../css/theme.css'

export default function ThemeButton() {
  
    const storageKey = 'theme-preference'

const onClick = () => {
  // flip current value 
  theme.value = theme.value === 'light'
    ? 'dark'
    : 'light'

  setPreference()
}

const getColorPreference = () => {
  if (typeof localStorage != "undefined" && typeof window != "undefined") {
    if (localStorage?.getItem(storageKey))
      return localStorage?.getItem(storageKey)
    else
      return window?.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
  }
}

const setPreference = () => {
  if (typeof localStorage != "undefined") {
    localStorage?.setItem(storageKey, theme.value)
    reflectPreference()
  }
}

const reflectPreference = () => {
  if (typeof window != "undefined") {
    document.firstElementChild
      .setAttribute('data-theme', theme.value);
    
    document
      .querySelector('#theme-toggle')
      ?.setAttribute('aria-label', theme.value)
  }
}

const theme = {
  value: getColorPreference(),
}

// set early so no page flashes / CSS is made aware
reflectPreference()
if (typeof window != "undefined") {
window.onload = () => {
  // set on load so screen readers can see latest value on the button
  reflectPreference()

  // now this script can find and listen for clicks on the control
  document
    .querySelector('#theme-toggle')
    .addEventListener('click', onClick)
    console.log(111)
}
}
// sync with system changes
useEffect(()=>{
  if (typeof window != "undefined") {
    window?.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches:isDark}) => {
      theme.value = isDark ? 'dark' : 'light'
      setPreference()
    })
  }
},[])

    return (
        <div style={{transition: "0.4s ease", float: "left", padding: "0.5rlh"}}> 
          <button className="theme-toggle" id="theme-toggle" title="Toggles light &amp; dark" aria-label="light" aria-live="polite">
          <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
          <mask className="moon" id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
            <circle cx="24" cy="10" r="6" fill="black"></circle>
          </mask>
          <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor"></circle>
          <g className="sun-beams" stroke="currentColor">
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </g>
          </svg>
          </button>
        </div>
    )
}
