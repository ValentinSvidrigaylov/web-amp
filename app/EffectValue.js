import { Instrument } from 'tone/build/esm/instrument/Instrument';
import './effects.css'
import { useState, useEffect } from "react";

const EffectValue = ({ id, label, trueBypass, setTrueBypass, defaultValue, change, min, max, strict, ...props }) => {
    const [value, setValue] = useState(defaultValue);
    const [rangeMin, setRangeMin] = useState(min);
    const [rangeMax, setRangeMax] = useState(max);

    const strictMin = strict ? strict[0] : false;
    const strictMax = strict ? strict[1] : false;
    
    return (
      <div className="range-wrapper container center-block">
        
        <span className='text-center center-block'><label htmlFor={id}>{label}:&nbsp;</label><input type='number' value={value} onInput={(e) => {if (trueBypass) {if (!e.target.value) {e.target.value = 0}; setValue(e.target.value); setTrueBypass(e.target.value); change(e.target.value)}}}/></span><br/>
        <div className='center-block text-center'>
          <input type='number' className='min' disabled={strictMin} value={rangeMin} onInput={(e)=>{if (!strictMin) {console.log(e.target.value>max);if (e.target.value>max) {return;};setRangeMin(e.target.value); if (value<e.target.value) {setValue(e.target.value);change(e.target.value)}}}}/>
          <input type="range" step="0.01" min={rangeMin} max={rangeMax} name={id} id={id} value={value} onChange={(e) => {if (trueBypass) {setValue(e.target.value); setTrueBypass(e.target.value); change(e.target.value)}}} {...props}></input>
          <input type='number' className='max' disabled={strictMax} value={rangeMax} onInput={(e)=>{if (!strictMax) {if (e.target.value<min) {return;};setRangeMax(e.target.value); if (value>e.target.value) {setValue(e.target.value);change(e.target.value)}}}}/>
        </div>
      </div>
    );
  };
  export default EffectValue;