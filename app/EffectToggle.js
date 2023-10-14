import './effects.css'
import { useEffect, useState } from "react";

const EffectToggle = ({ id, label, trueBypass, setTrueBypass, checked, change, ...props }) => {
    const [isChecked, setIsChecked] = useState(false);    

    /*useEffect(()=>{
      if (isChecked != prevCountRef) {
        setTrueBypass(isChecked); 
        change(isChecked)
        prevCountRef.current = isChecked;
      }
    },[isChecked]);*/
    
    return (
      <div className="checkbox-wrapper">
        <input type="checkbox" name={id} id={id} checked={isChecked} onChange={() => {console.log(`value: ${isChecked}`);setIsChecked((prev) => !prev);setTrueBypass(!isChecked); change(!isChecked)}} className={isChecked ? "checked" : ""} {...props}></input>
        <div className="track" onClick={() => {setIsChecked((prev) => !prev)}}></div>
        <label htmlFor={id}>{label}</label>
      </div>
    )
  };
  export default EffectToggle;