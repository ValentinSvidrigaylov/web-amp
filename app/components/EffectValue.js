import { Instrument } from 'tone/build/esm/instrument/Instrument';
import '../css/effects.css'
import { useState, useEffect } from "react";

const EffectValue = ({ id, label, trueBypass, setTrueBypass, defaultValue, change, min, max, strict, step=0.01, ...props }) => {
    const [value, setValue] = useState(defaultValue);
    const [rangeMin, setRangeMin] = useState(min);
    const [rangeMax, setRangeMax] = useState(max);

    const strictMin = strict ? strict[0] : false;
    const strictMax = strict ? strict[1] : false;
    
    return (
      <div className="range-wrapper container center-block">
        
        <span className='text-center center-block'><label htmlFor={id}>{label}:&nbsp;</label><input type='number' value={value} onInput={(e) => {console.log("val:",Number(e.target.value));e.target.setCustomValidity("");if (Number(e.target.value) > rangeMax || Number(e.target.value) < rangeMin) {console.log("\n\nminmax\n\n");console.log(e.target);if (strictMin && Number(e.target.value) < rangeMin || strictMax && Number(e.target.value) > rangeMax) {return;}; if (Number(e.target.value) < rangeMin) {setRangeMin(Number(e.target.value))}; if (Number(e.target.value) > rangeMax) {setRangeMax(Number(e.target.value))}};if (trueBypass) {if (!e.target.value) {e.target.value = 0}; setValue(e.target.value); setTrueBypass(e.target.value); change(e.target.value)}}}/></span><br/>
        <div className='center-block text-center'>
          <input type='number' className='min' disabled={strictMin} value={rangeMin} onInput={(e)=>{if (!strictMin) {console.log(e.target.value>max);if (e.target.value>max) {return;};setRangeMin(e.target.value); if (value<e.target.value) {setValue(e.target.value);change(e.target.value)}}}}/>
          <input type="range" step={step} min={rangeMin} max={rangeMax} name={id} id={id} value={value} onChange={(e) => {console.log("val:",Number(e.target.value));if (Number(e.target.value) > rangeMax || Number(e.target.value) < rangeMin) {console.log("\n\nminmax\n\n");if (strictMin && Number(e.target.value) < rangeMin) {e.target.setCustomValidity("Value is lower than range!")}; if (strictMax && Number(e.target.value) > rangeMax) {e.target.setCustomValidity("Value is higher than range!")}; e.target.setCustomValidity("Value is higher or lower than range!");return;}; if (trueBypass) {setValue(e.target.value); setTrueBypass(e.target.value); change(e.target.value)}}} {...props}></input>
          <input type='number' className='max' disabled={strictMax} value={rangeMax} onInput={(e)=>{if (!strictMax) {if (e.target.value<min) {return;};setRangeMax(e.target.value); if (value>e.target.value) {setValue(e.target.value);change(e.target.value)}}}}/>
        </div>
      </div>
    );
  };
  export default EffectValue;