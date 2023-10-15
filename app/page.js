'use client'
import Image from 'next/image'
import styles from './page.module.css'
import * as Tone from 'tone'
import "./libs/tonejs-instruments-master/Tonejs-Instruments.js"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import EffectToggle from "./EffectToggle.js";
import EffectValue from "./EffectValue.js";

Number.prototype.fromExponent = function() {
  var data = String(this).split(/[eE]/);
  if (data.length == 1) return data[0];

  var z = '',
    sign = this < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + '0.';
    while (mag++) z += '0';
    return z + str.replace(/^\-/, '');
  }
  mag -= str.length;
  while (mag--) z += '0';
  return str + z;
}

//const meter = new Tone.Meter();
//let mic = new Tone.UserMedia().connect(meter).toDestination();

export default function Home(props) {
const [mic, setMic] = useState();

const [distortion, setDistortion] = useState()
//let [distortion, setDistortion] = [new Tone.Distortion(0.3), (v)=>{distortion=v}];
const [isDistortion, setIsDistortion] = useState(false)
//let [isDistortion, setIsDistortion] = [false, (v)=>{isDistortion=v}]
//const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
//const tom = new Tone.UserMedia().connect(feedbackDelay);
//tom.open();
const [gain, setGain] = useState()
//let [gain, setGain] = [new Tone.Gain(0.3), (v)=>{gain=v}];
const [isGain, setIsGain] = useState(false)
//let [isGain, setIsGain] = [false, (v)=>{isGain=v}]
const [bitcrusher, setBitcrusher] = useState()
const [isBitcrusher, setIsBitcrusher] = useState(false)
const [chorus, setChorus] = useState()
//let [chorus, setChorus] = [new Tone.Chorus(0.3), (v)=>{chorus=v}];
const [isChorus, setIsChorus] = useState(false)
//let [isChorus, setIsChorus] = [false, (v)=>{isChorus=v}]
const [delay, setDelay] = useState()
const [isDelay, setIsDelay] = useState(false)
const [reverb, setReverb] = useState() //memory leaks because of this value
const [isReverb, setIsReverb] = useState(false)
const effects = [[distortion, isDistortion], [gain, isGain], [bitcrusher, isBitcrusher], [chorus, isChorus], [delay, isDelay], [reverb, isReverb]];

useEffect(()=>{
  setMic(new Tone.UserMedia().toDestination());
  setDistortion(new Tone.Distortion(10).toDestination())
  setGain(new Tone.Gain(250).toDestination())   
  setBitcrusher(new Tone.BitCrusher(8).toDestination())
  setChorus(new Tone.Chorus(4,2.5,1).toDestination().start())
  setDelay(new Tone.FeedbackDelay("8n", .8).toDestination())
  setReverb(new Tone.Reverb(30).toDestination())
},[]);

useEffect(()=>{
  if (typeof bitcrusher == Tone.BitCrusher) {
    bitcrusher.wet.value = 1;
  }
},[bitcrusher])
//setInterval(() => console.log(meter.getValue()), 100);
// const vol = new Tone.Volume(-120000000).toDestination();
// const vargain = new Tone.Gain(1500).toDestination();
// const bitcrusher = new Tone.BitCrusher(1).toDestination();
function allowMicContext() {
  Tone.start()
  //mic = new Tone.UserMedia().connect(meter).connect(vargain).connect(vol).toDestination();
  //setTimeout(()=>{mic.disconnect(vargain)},5000)
  //mic.disconnect(vargain).toDestination();
  //mic = new Tone.UserMedia().connect(new Tone.Gain(3.4028234663852886e+38)).connect(new Tone.Gain(3.4028234663852886e+38)).connect(new Tone.Gain(3.4028234663852886e+38)).connect(new Tone.Gain(3.4028234663852886e+38)).connect(new Tone.Gain(3.4028234663852886e+38)).connect(new Tone.Gain(3.4028234663852886e+38)).connect(new Tone.Gain(3.4028234663852886e+38)).connect(new Tone.Gain(3.4028234663852886e+38)).connect(new Tone.Volume(0.00000001)).toDestination();
  //mic.disconnect().toDestination();
  //mic.disconnect(new Tone.Gain(10000000000000000000000000000000000000)).toDestination();
  mic.open()/*.then(() => {
    // promise resolves when input is available
    console.log("mic open");
    // print the incoming mic levels in decibels
    setInterval(() => console.log(meter.getValue()), 100);
  }).catch(e => {
    // promise is rejected when the user doesn't have or allow mic access
    console.log("mic not open");
  });*/
}
//these are stacking when changed for some reason
//when state is updated, mic connecting multiple times
//if nothing helps, set mic with and w/o new effect
//upd: fixed in a wierd way, may need to be fixed in future
//todo: simplify functions by reducing code amount - yes
//reverb is too heavy
//todo: add multiple range inputs to change effects, check if effects are sequenced

//MEMORY LEAKS! Need fix ASAP, encountering them when allowing mic context but its not because of it - fixed
function toggleEffect(value, effect) {
mic.open()
Tone.start()
if (value) {
  console.log('triggered');
  //add sequencing here
  //mic.connect(gain).toDestination();
  //mic.connect(meter).connect(vargain).connect(vol).toDestination();
  // console.log(gain.gain)
  mic.connect(effect).toDestination();
  // let mapped  = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
  // console.log(mapped)
  //console.log(effects[1][1]);
  //[...a.filter((e)=>e[1])].map((e)=>e[0])
  //let mapped  = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
  //console.log(mapped)
  //mic.chain().toDestination();
  //setTimeout(()=>{mic.disconnect(vargain)},5000)
  //mic.connect(bitcrusher).toDestination();
  //mic = new Tone.UserMedia().connect(meter).connect(vargain).connect(vol).toDestination();
} else {
  console.log('disconnected')
  //mic.disconnect(meter).disconnect(vargain).disconnect(vol).toDestination();
  let mapped  = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
  console.log(mapped)
  mapped = mapped.filter((e)=>e!=effect)
  console.log(mapped)
  mic.disconnect().chain(...[...mapped]).toDestination();
  //mic.disconnect(vargain).disconnect(vol).toDestination();
  //mic.close()
  //mic = new Tone.UserMedia().toDestination();
}
}

function changeEffectVal(newVal,oldVal) {
mic.open()
Tone.start()
let newEffectVal = newVal.toDestination();
let mapped  = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
console.log(mapped)
mapped = mapped.filter((e)=>e!=oldVal)
console.log(mapped)
//console.log('err')
mic.disconnect().chain(...[...mapped, newEffectVal]).toDestination();
}

function addDistortion(value) {
  console.log(value);
  setIsDistortion(value);
  toggleEffect(value, distortion);
  // mic.open()
  // Tone.start()
  /*if (value) {
    mic.connect(distortion).toDestination();
  } else {
    console.log('disconnected')
    mic.disconnect(distortion).toDestination();
  }*/
  //mic = new Tone.UserMedia().connect(meter).connect(vargain).connect(vol).toDestination();
}

function changeDistortionValue(value) {
  console.log(`changed to ${value}!`)
  setDistortion(new Tone.Distortion(value).toDestination());
  changeEffectVal(new Tone.Distortion(value), distortion);
  // mic.disconnect(distortion).connect(new Tone.Distortion(value)).toDestination();
}

/*console.log('state: ', mic.state != "started")
  if (mic.state != "started") {
    mic.open()
    Tone.start()
  }*/

function addGain(value) {
  //console.log(`value: ${value}`);
  setIsGain(value);
  toggleEffect(value, gain);
  /*if (value) {
    setIsGain(true);
    console.log('triggered');
    //mic.connect(gain).toDestination();
    //mic.connect(meter).connect(vargain).connect(vol).toDestination();
    console.log(gain.gain)
    mic.connect(gain).toDestination();
    let mapped  = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
    console.log(mapped)
    //console.log(effects[1][1]);
    //[...a.filter((e)=>e[1])].map((e)=>e[0])
    //let mapped  = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
    //console.log(mapped)
    //mic.chain().toDestination();
    //setTimeout(()=>{mic.disconnect(vargain)},5000)
    //mic.connect(bitcrusher).toDestination();
    //mic = new Tone.UserMedia().connect(meter).connect(vargain).connect(vol).toDestination();
  } else {
    setIsGain(false);
    console.log('disconnected')
    //mic.disconnect(meter).disconnect(vargain).disconnect(vol).toDestination();
    let mapped  = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
    console.log(mapped)
    mapped = mapped.filter((e)=>e!=gain)
    console.log(mapped)
    mic.disconnect().chain(...[...mapped]).toDestination();
    //mic.disconnect(vargain).disconnect(vol).toDestination();
    //mic.close()
    //mic = new Tone.UserMedia().toDestination();
  }*/
  // mic = new Tone.UserMedia().connect(meter).connect(vargain).connect(vol).toDestination();
}

function changeGainValue(value) {
  //mic.open()
  //Tone.start()
  console.log(`changed to ${value}!`)
  setGain(new Tone.Gain(value).toDestination());
  changeEffectVal(new Tone.Gain(value), gain);
  //mic.disconnect(gain).connect(new Tone.Gain(value)).toDestination();
  // let newGain = new Tone.Gain(value).toDestination();
  // let mapped  = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
  // console.log(mapped)
  // mapped = mapped.filter((e)=>e!=gain)
  // console.log(mapped)
  // //console.log('err')
  // mic.disconnect().chain(...[...mapped, newGain]).toDestination();
  
}

function changeBitcrusherValue(value) {
  let newVal = new Tone.BitCrusher(value).toDestination();
  bitcrusher.wet.value = 1;
  setBitcrusher(newVal);
  changeEffectVal(newVal);
}

function addBitcrusher(value) {
  setIsBitcrusher(value);
  toggleEffect(value, bitcrusher);
}

function addChorus(value) {
  console.log(value);
  //mic.open()
  //Tone.start()
  setIsChorus(value);
  toggleEffect(value, chorus);  
}

function changeChorusFrequencyValue(value) {
  // mic.open()
  // Tone.start()
  console.log('changed!')
  setChorus(new Tone.Chorus(value, chorus.delayTime, chorus.depth).toDestination().start());  
  changeEffectVal(new Tone.Chorus(value, chorus.delayTime, chorus.depth).start(), chorus);
  //mic.disconnect(gain).connect(new Tone.Gain(value)).toDestination();
  // mic.disconnect().toDestination();
}

function changeChorusDelayValue(value) {
  console.log('changed!')
  setChorus(new Tone.Chorus(chorus.frequency.value, value, chorus.depth).toDestination().start());  
  changeEffectVal(new Tone.Chorus(chorus.frequency.value, value, chorus.depth).start(), chorus);
}

function changeChorusDepthValue(value) {
  console.log('changed!')
  setChorus(new Tone.Chorus(chorus.frequency.value, chorus.delayTime, value).toDestination().start());  
  changeEffectVal(new Tone.Chorus(chorus.frequency.value, chorus.delayTime, value).start(), chorus);
}

function addDelay(value) {
  setIsDelay(value);
  toggleEffect(value, delay);  
}

function changeDelayValue(value) {
  console.log('changed!')
  setDelay(new Tone.FeedbackDelay("8n", value).toDestination());
  changeEffectVal(new Tone.FeedbackDelay("8n", value), delay);
}

function addReverb(value) {
  setIsReverb(value);
  toggleEffect(value, reverb);  
}

function changeReverbValue(value) {
  console.log('changed!')
  console.log(Number(value));
  setReverb(new Tone.Reverb(Number(value)).toDestination()); 
  changeEffectVal(new Tone.Reverb(Number(value)), reverb);
}
// let allowMicContext=()=>{};
// let addDistortion=()=>{};
// let changeDistortionValue=()=>{};
// let addGain=()=>{};
// let changeGainValue=()=>{};
// let addChorus=()=>{};
// let changeChorusValue=()=>{};
/*<div className='col effect center-block'>
            <input type='checkbox' id='distortion' name='distortion'/>
            <span className='effect-toggle'></span>
            <label htmlFor="distortion">Distortion</label>
          </div>*/
  return (
    <main className={styles.main}>
      <Link href="/settings">To settings</Link>
      <div className={styles.description}>
        Simple guitar amp based on <a href="https://tonejs.github.io/" target='blank'>tone js</a>
      </div>
      <button id='mic' onClick={allowMicContext}>Allow mic context</button>
      <div className="center-block container">
        <h2 className='text-center'>Effects:</h2>
        <div className="row">
          <EffectToggle label="Distortion" id="distortion" checked={false} change={addDistortion} trueBypass={isDistortion} setTrueBypass={setIsDistortion}/>
          <EffectValue label="DistortionValue" id="distortionvalue" defaultValue={10} change={changeDistortionValue} min={0} max={10000} trueBypass={isDistortion} setTrueBypass={setIsDistortion}/>
        </div>
        <div className="row">
          <EffectToggle label="Gain" id="gain" checked={false} change={addGain} trueBypass={isGain} setTrueBypass={setIsGain}/>
          <EffectValue label="GainValue" id="gainvalue" defaultValue={250} change={changeGainValue} min={0} max={3.4028234663852886e+38.fromExponent()} trueBypass={isGain} setTrueBypass={setIsGain}/>
        </div>
        <div className="row">
          <EffectToggle label="Bitcrusher" id="bitcrusher" checked={false} change={addBitcrusher} trueBypass={isBitcrusher} setTrueBypass={setIsBitcrusher}/>
          <EffectValue label="BitcrusherValue" id="bitcrushervalue" defaultValue={10} change={changeBitcrusherValue} min={1} max={16} trueBypass={isBitcrusher} setTrueBypass={setIsBitcrusher} strict={[1,1]}/>
        </div>
        <div className="row">
          <EffectToggle label="Chorus" id="chorus" checked={false} change={addChorus} trueBypass={isChorus} setTrueBypass={setIsChorus}/>
          <EffectValue label="ChorusFrequencyValue" id="chorusvalue" defaultValue={4} change={changeChorusFrequencyValue} min={0} max={15} trueBypass={isChorus} setTrueBypass={setIsChorus}/>
          <EffectValue label="ChorusDelayTimeValue" id="chorusvalue" defaultValue={100} change={changeChorusDelayValue} min={0} max={250} trueBypass={isChorus} setTrueBypass={setIsChorus}/>
          <EffectValue label="ChorusDepthValue" id="chorusvalue" defaultValue={0.2} change={changeChorusDepthValue} min={0} max={1} trueBypass={isChorus} setTrueBypass={setIsChorus} strict={[1,1]}/>
        </div>
        <div className="row">
          <EffectToggle label="Delay" id="delay" checked={false} change={addDelay} trueBypass={isDelay} setTrueBypass={setIsDelay}/>
          <EffectValue label="DelayValue" id="delay" defaultValue={0.1} change={changeDelayValue} min={0} max={1} trueBypass={isDelay} setTrueBypass={setIsDelay}/>
        </div>
        <div className="row">
          <EffectToggle label="Reverb" id="reverb" checked={false} change={addReverb} trueBypass={isReverb} setTrueBypass={setIsReverb}/>
          <span>*values above 150 requires a lot of memory, setting this above 150 may cause browser to crash</span>
          <EffectValue label="ReverbValue" id="reverb" defaultValue={30} change={changeReverbValue} min={0} max={30} trueBypass={isReverb} setTrueBypass={setIsReverb}/>
        </div>
      </div>
    </main>
  )
}
