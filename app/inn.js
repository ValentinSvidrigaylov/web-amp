'use client'
import Image from 'next/image'
import styles from './page.module.css'
import * as Tone from 'tone'
import "./libs/tonejs-instruments-master/Tonejs-Instruments.js"
import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import EffectToggle from "./components/EffectToggle.js";
import EffectValue from "./components/EffectValue.js";
import { getKeysByValue } from './libs/essentials.js';
import {
	isAnyAudioContext, isAnyAudioNode,
	isAnyAudioParam, isAnyOfflineAudioContext,
} from "standardized-audio-context";

//const meter = new Tone.Meter();
//let mic = new Tone.UserMedia().connect(meter).toDestination();

var map = {};

export default function Inner(props) {
function noteToInt (note) {return notesSeqeunce.indexOf(note.replace(/\d+/.exec(note)[0],'')) + 12*/\d+/.exec(note)};
function intToNote (int) {return notesSeqeunce[int%12]+~~(int/12)};
let pb_changed = false;

// Tone.UserMedia.debug = true
Tone.context.lookAhead = 0;
// console.log(Tone.UserMedia.debug)
const [mic, setMic] = useState();

// const [testvar, setTestvar] = useState("a");

const [SF, setSF] = useState();
const [tuner, setTuner] = useState();
const [chordShapesShown, setChordShapesShown] = useState(false);
const [isSF, setIsSF] = useState(false);
const [isTuner, setIsTuner] = useState();
const [gaugePosition, setGaugePosition] = useState();
const [isTunerInit, setIsTunerInit] = useState(false);
const [volume, setVolume] = useState();
const [isVolume, setIsVolume] = useState(false);
const [distortion, setDistortion] = useState();
//let [distortion, setDistortion] = [new Tone.Distortion(0.3), (v)=>{distortion=v}];
const [isDistortion, setIsDistortion] = useState(false);
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
const [pitchshifter, setPitchShifter] = useState() //memory leaks because of this value
const [isPitchShifter, setIsPitchShifter] = useState(false)

const [current_ir, setcurrent_ir] = useState()
const [iscurrent_ir, setiscurrent_ir] = useState(false)
let effects = [[volume,isVolume],[distortion, isDistortion], [gain, isGain], [bitcrusher, isBitcrusher], [chorus, isChorus], [delay, isDelay], [reverb, isReverb], [pitchshifter, isPitchShifter], [current_ir, iscurrent_ir]];
const _start_effects = [[volume,isVolume],[distortion, isDistortion], [gain, isGain], [bitcrusher, isBitcrusher], [chorus, isChorus], [delay, isDelay], [reverb, isReverb], [pitchshifter, isPitchShifter]];


const [stringsAmount, setStringsAmount] = useState(6);
const [fretsAmount, setFretsAmount] = useState(21);
const [frets, setFrets] = useState([]);
const [fretsTriggers, setFretsTriggers] = useState([]);

const [stringsTriggers, setStringsTriggers] = useState([]);

const [guitar, setGuitar] = useState();
const [guitarTuning, setGuitarTuning] = useState(['E4','B3','G3','D3','A2','E2']);
const [pitchBinding, setPitchBinding] = useState([...guitarTuning]);
const [scaleLength, setScaleLength] = useState(647.7);

const [tunerThreshold, setTunerThreshold] = useState(-80);

useEffect(()=>{
  //default values must be the same as here, otherwise effect will be different from the one that is displayed
  let mic_t = new Tone.UserMedia();
  mic_t.output = new Tone.Mono();
  setMic(mic_t);
  setGuitar(new Tone.Sampler({urls: {"C4": "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3", "A4": "A4.mp3",}, release: 1, baseUrl: "./samples/guitar-electric/"}).chain(new Tone.Mono(), Tone.Destination));
  setVolume(new Tone.Volume(10));
  setDistortion(new Tone.Distortion(5))
  setGain(new Tone.Gain(20))
  setBitcrusher(new Tone.BitCrusher({bits: 8, wet: 1}))
  setChorus(new Tone.Chorus({frequency: 4, delayTime: 2.5, depth: 1, wet: 1}).start())
  setDelay(new Tone.FeedbackDelay({delayTime: "8n", feedback: .1, wet: 1}))
  setReverb(new Tone.Reverb(30))
  setPitchShifter(new Tone.PitchShift({pitch: -12, wet: 1}))
},[]);

// useEffect(()=>{
//    if (mic && typeof mic == Tone.UserMedia) {
//       mic.output = new Tone.Mono();
//       mic.debug = true
//       mic.start()
//       console.log(mic)
//    }
// },[mic])

// useEffect(()=>{
//   if (typeof bitcrusher == Tone.BitCrusher) {
//     bitcrusher.wet.value = 1;
//   }
// },[bitcrusher])

// useEffect(()=>{
//    if (typeof pitchshifter == Tone.PitchShift) {
//      pitchshifter.wet.value = 1;
//    }
//    console.log(pitchshifter)
//  },[pitchshifter])
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
//   mic.connect(new Tone.Convolver('amp.wav').toDestination()).toDestination()
  mic.open() /*.then(() => {
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
//split guitar and mic effects
//flageolets and other guitar techiques

function handlePositionChange(effect, amount) {
   //works but fails when in reverse
   mic.open()
   Tone.start()
   let t0 = effects[0]
   let t = effects[1]
   // let t = [...effects.filter((e)=>e[1]).map((e)=>e[0].toDestination())]
   effects.move(effects.map((e)=>e[0]).indexOf(effect),effects.map((e)=>e[0]).indexOf(effect)+amount > 0 ? effects.map((e)=>e[0]).indexOf(effect)+amount % effects.length : effects.length + (effects.map((e)=>e[0]).indexOf(effect)+amount % effects.length));
   console.log(effects)
   let mapped = effects.filter((e)=>e[1]).map((e)=>e[0].toDestination())
   console.log(mapped)
   console.log("eq: ",t===effects[2])
   console.log("eq2:", t0===effects[0])
   console.log(t)
   console.log(effects[2])
   console.log("eq: ",t[0]===effects[2][0])
   console.log("eq2:", t0[0]===effects[0][0])
   // console.log(t.toReversed())
   // console.log(mapped.map(e=>e instanceof Tone.ToneAudioNode))
   // console.log(mapped.map(e=>isAnyAudioNode(e)))
   console.log(mic)
   // toggleEffect(effect,true)
   //disconnects nodes here but cant connect for some reason when differs from current effect chain
   //fails when moving node passes through turned on node but after that all nodes before turned on node work
   //all this probably happens because array that contains usestates is mutable but it cant
   // console.log(mapped.equals(t.toReversed()))
   // console.log(mapped[0] == t[1])
   // console.log(mapped[1] == t[0])
   //found the issue: this all happens because it connects not right
   //i.e. 
   //mic.disconnect().toDestination().chain(...[...mapped].toReversed()).toDestination();
   //mic.disconnect().toDestination().chain(...[...mapped]).toDestination();
   //tested on ons and offs, fails after three effects are connected and one of them disconnects: connects with different shape, with fan connection this doesnt seem to happend but all effects that were before current are on
   //all fails when effects array mutates since nodes are not exactly the same
//    console.log(mapped[0])
//    console.log(mapped)
//    console.log(effects.filter((e)=>e[1]).map((e)=>e[0].toDestination()))
//    // mic.disconnect().chain(...mapped).toDestination();
//    let tt = [new Tone.Distortion(10).toDestination(), new Tone.FeedbackDelay(0.6).toDestination()]
//    mic.disconnect().chain(...tt).toDestination();
//    guitar.disconnect().chain(...tt).toDestination();
//    function moved(arro, old_index, new_index) {
//       let arr = [...arro]
//       while (old_index < 0) {
//           old_index += arr.length;
//       }
//       while (new_index < 0) {
//           new_index += arr.length;
//       }
//       if (new_index >= arr.length) {
//           var k = new_index - arr.length + 1;
//           while (k--) {
//               arr.push(undefined);
//           }
//       }
//       arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
//       console.log(arr)
//       console.log(arro)
//       return arr; // for testing purposes
//   };
//    tt.move(0,1)
//    // tt.pop();
//    // tt.push(reverb)
//    // tt.splice(0, 0, tt.splice(1, 1)[0]);

//    // mic.disconnect().chain(...moved(tt,0,1), Tone.Destination)
//    // let a = [1,2,3];
//    // [a[0],a[1]]=[a[1],a[0]]
//    // console.log(a) 

//    // tt.insert(tt[0],1)
//    // tt.shift()
//    console.log(tt)
//    guitar.disconnect().chain(...tt).toDestination()
mic.open()
    let tt = [new Tone.Distortion(10), new Tone.Gain(100)]
    mic.disconnect().chain(...tt, Tone.Destination);
    function moved(arro, old_index, new_index) {
        let arr = [...arro]
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        console.log(arr)
        console.log(arro)
        return arr; // for testing purposes
    };

    console.log(tt)
    mic.disconnect().chain(...moved(tt,0,1), Tone.Destination)
// let tt = [new Tone.Distortion(10), new Tone.FeedbackDelay(0.6)]
//    mic.disconnect().chain(...tt, Tone.Destination);
//    function moved(arro, old_index, new_index) {
//       let arr = [...arro]
//       while (old_index < 0) {
//           old_index += arr.length;
//       }
//       while (new_index < 0) {
//           new_index += arr.length;
//       }
//       if (new_index >= arr.length) {
//           var k = new_index - arr.length + 1;
//           while (k--) {
//               arr.push(undefined);
//           }
//       }
//       arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
//       console.log(arr)
//       console.log(arro)
//       return arr; // for testing purposes
//   };
// //    tt.move(0,1)
//    // tt.pop();
//    // tt.push(reverb)
//    // tt.splice(0, 0, tt.splice(1, 1)[0]);

//    // mic.disconnect().chain(...moved(tt,0,1), Tone.Destination)
//    // let a = [1,2,3];
//    // [a[0],a[1]]=[a[1],a[0]]
//    // console.log(a) 

//    // tt.insert(tt[0],1) 
//    // tt.shift()
//    console.log(tt)
//    mic.disconnect().chain(...moved(tt,0,1), Tone.Destination)
//    // mic.disconnect().chain(new Tone.PitchShift(12).toDestination()).toDestination();
//    // guitar.disconnect().chain(...[...mapped]).toDestination();
//    // let value = effects.map(e=>e[0])
//    // console.log(effects[value.indexOf(effect)][1])
//    // let effectId = value.indexOf(effect);
//    // let effects_outer = document.getElementById("effects")
//    // let allEffects = effects_outer.children;
//    // let src = allEffects[effectId]
//    // let src_index = [...allEffects].move(effectId,effectId+amount).indexOf(src)
//    // let dest = allEffects[effectId+amount]

   // let m_array = [...allEffects].toMoved(effectId,effectId+amount)
   // console.log(m_array)
   // effects_outer.innerHTML=''
   // for (let i of m_array) {
   //    effects_outer.appendChild(i)
   // }
   // toggleEffect(effectId, effect)
 }

function toggleEffect(value, effect) {
mic.open().catch(e=>alert("Couldn't open the mic"))
Tone.start()
if (value) { //wrong sequencing here
  console.log('triggered');
  //add sequencing here
  //mic.connect(gain).toDestination();
  //mic.connect(meter).connect(vargain).connect(vol).toDestination();
  // console.log(gain.gain)
   //   let amount=1
   //   effects.move(effects.map((e)=>e[0]).indexOf(effect),effects.map((e)=>e[0]).indexOf(effect)+amount);
  let mapped = [...effects.filter((e)=>e[1]||e[0]==effect)].map((e)=>e[0])
  console.log(effects)
//   new Tone.Mono(mic.connect(effect).toDestination()).toDestination();
//   guitar.connect(effect).toDestination();
// mic.chain(...[new Tone.Distortion(100).toDestination(), new Tone.Delay(0.6).toDestination()].reverse()).toDestination()
// console.log([new Tone.Distortion(100).toDestination(), new Tone.Delay(0.6).toDestination()].reverse())
// mic.disconnect().chain(...[...mapped].reverse()).toDestination()
// console.log(mapped.reverse())
   // if (current_ir != undefined) {
   //    mapped.push(new Tone.Convolver(current_ir))
   // }  
   console.log(mapped)
  mic.disconnect().chain(...mapped, new Tone.Mono(), Tone.Destination)
  guitar.disconnect().chain(...mapped, new Tone.Mono(), Tone.Destination)
  // let mapped = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
  // console.log(mapped)
  //console.log(effects[1][1]);
  //[...a.filter((e)=>e[1])].map((e)=>e[0])
  //let mapped = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
  //console.log(mapped)
  //mic.chain().toDestination();
  //setTimeout(()=>{mic.disconnect(vargain)},5000)
  //mic.connect(bitcrusher).toDestination();
  //mic = new Tone.UserMedia().connect(meter).connect(vargain).connect(vol).toDestination();
} else {
  console.log('disconnected')
  //mic.disconnect(meter).disconnect(vargain).disconnect(vol).toDestination();
//   let mapped = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
let mapped = [...effects.map((e)=>e[0] == effect ? (()=>{let t = e;e[1]=false;return e})() : (()=>e)()).filter((e)=>e[1])].map((e)=>e[0])
  console.log(mapped)
//   mapped = mapped.filter((e)=>e!=effect)
  console.log()
//   if (current_ir != undefined) {
//       mapped.push(new Tone.Convolver(current_ir))
//    }
   console.log(mapped)
  mic.disconnect().chain(...mapped, new Tone.Mono(), Tone.Destination);
  guitar.disconnect().chain(...mapped, new Tone.Mono(), Tone.Destination);
  //mic.disconnect(vargain).disconnect(vol).toDestination();
  //mic.close()
  //mic = new Tone.UserMedia().toDestination();
}
}

// //this function probably mutates value because link is not the same or smth
// //  function changeEffectVal(newVal,oldVal) {
// function changeEffectVal(property, value, object) {
//    mic.open()
//    Tone.start()
//    // let newEffectVal = newVal.toDestination();
//    object[property] = value;
//    let mapped = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
//    console.log(mapped)
//    // mapped = mapped.filter((e)=>e!=object)
//    // console.log(mapped)
//    //console.log('err')
//    // mic.disconnect().chain(...[...mapped, newEffectVal]).toDestination();
//    mic.disconnect().chain(...mapped).toDestination();
//    // guitar.disconnect().chain(...[...mapped, newEffectVal]).toDestination();
//    guitar.disconnect().chain(...mapped).toDestination();
// }

//this function probably mutates value because link is not the same or smth
function changeEffectVal(newVal,oldVal) {
   mic.open().catch(e=>alert("Couldn't open the mic"))
   Tone.start()
   let newEffectVal = newVal;
   let mapped = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
   // let effectIndex = mapped.indexOf(oldVal)
   // console.log(mapped)
   // mapped = mapped.filter((e)=>e!=oldVal)
   console.log(mapped.indexOf(oldVal))
   console.log(mapped)
   console.log(mapped[mapped.indexOf(oldVal)])
   console.log(mapped.indexOf(oldVal))
   effects[mapped.indexOf(oldVal)][0]=newEffectVal
   mapped[mapped.indexOf(oldVal)]=newEffectVal
   console.log(mapped)
   //console.log('err')
   // if (current_ir != undefined) {
   //    mapped.push(new Tone.Convolver(current_ir))
   // }
   mic.disconnect().chain(...mapped, new Tone.Mono(), Tone.Destination);
   guitar.disconnect().chain(...mapped, new Tone.Mono(), Tone.Destination);
}

function addVolume(value) {
   setIsVolume(value);
   toggleEffect(value, volume);
}

function changeVolumeValue(value) {
   // console.log(`changed to ${value}!`)
   setVolume(new Tone.Volume(Math.round(value)));
   changeEffectVal(new Tone.Volume(Math.round(value)), volume);
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
  setDistortion(new Tone.Distortion(value));
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
    let mapped = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
    console.log(mapped)
    //console.log(effects[1][1]);
    //[...a.filter((e)=>e[1])].map((e)=>e[0])
    //let mapped = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
    //console.log(mapped)
    //mic.chain().toDestination();
    //setTimeout(()=>{mic.disconnect(vargain)},5000)
    //mic.connect(bitcrusher).toDestination();
    //mic = new Tone.UserMedia().connect(meter).connect(vargain).connect(vol).toDestination();
  } else {
    setIsGain(false);
    console.log('disconnected')
    //mic.disconnect(meter).disconnect(vargain).disconnect(vol).toDestination();
    let mapped = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
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
  setGain(new Tone.Gain(value));
  changeEffectVal(new Tone.Gain(value), gain);
  //mic.disconnect(gain).connect(new Tone.Gain(value)).toDestination();
  // let newGain = new Tone.Gain(value).toDestination();
  // let mapped = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
  // console.log(mapped)
  // mapped = mapped.filter((e)=>e!=gain)
  // console.log(mapped)
  // //console.log('err')
  // mic.disconnect().chain(...[...mapped, newGain]).toDestination();
  
}

function changeBitcrusherValue(value) {
  let newVal = new Tone.BitCrusher({bits: value, wet: 1});
//   bitcrusher.wet.value = 1;
  setBitcrusher(newVal);
  changeEffectVal(newVal, bitcrusher);
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
   let effect = new Tone.Chorus({frequency: Number(value), delayTime: chorus.delayTime, depth: chorus.depth, wet: chorus.wet.value}).start();
   // mic.open()
   // Tone.start()
   console.log('changed!');
   setChorus(effect);
   changeEffectVal(effect, chorus);
   //mic.disconnect(gain).connect(new Tone.Gain(value)).toDestination();
   // mic.disconnect().toDestination();
}

function changeChorusDelayValue(value) {
   let effect = new Tone.Chorus({frequency: chorus.frequency.value, delayTime: Number(value), depth: chorus.depth, wet: chorus.wet.value}).start();
   console.log('changed!');
   setChorus(effect);
   changeEffectVal(effect, chorus);
}

function changeChorusDepthValue(value) {
   let effect = new Tone.Chorus({frequency: chorus.frequency.value, delayTime: chorus.delayTime, depth: Number(value), wet: chorus.wet.value}).start();
   console.log('changed!');
   setChorus(effect);
   changeEffectVal(effect, chorus);
}

function changeChorusWetValue(value) {
   let effect = new Tone.Chorus({frequency: chorus.frequency.value, delayTime: chorus.delayTime, depth: chorus.depth, wet: Number(value)}).start();
   setChorus(effect);
   changeEffectVal(effect, chorus);
}

function addDelay(value) {
  setIsDelay(value);
  toggleEffect(value, delay);  
}

function changeDelayValue(value) {
  console.log('changed!')
  setDelay(new Tone.FeedbackDelay({delayTime: "8n", feedback: value, wet: 1}));
  changeEffectVal(new Tone.FeedbackDelay({delayTime: "8n", feedback: value, wet: 1}), delay);
}

function addReverb(value) {
  setIsReverb(value);
  toggleEffect(value, reverb);  
}

function changeReverbValue(value) {
  console.log('changed!')
  console.log(Number(value));
  setReverb(new Tone.Reverb(Number(value))); 
  changeEffectVal(new Tone.Reverb(Number(value)), reverb);
}

function addPitchShifter(value) {
   setIsPitchShifter(value);
   toggleEffect(value, pitchshifter);  
   console.log(pitchshifter)
 }
 
 function changePitchShifterValue(value) {
   console.log(pitchshifter.wet.value)
   setPitchShifter(new Tone.PitchShift({pitch: Number(value), wet: pitchshifter.wet.value})); 
   changeEffectVal(new Tone.PitchShift({pitch: Number(value), wet: pitchshifter.wet.value}), pitchshifter);
   console.log(pitchshifter)
 }
 
 function changePitchShifterWetValue(value) {
   console.log(pitchshifter.pitch)
   console.log(Number(value))
   setPitchShifter(new Tone.PitchShift({pitch: pitchshifter.pitch, wet: Number(value)})); 
   changeEffectVal(new Tone.PitchShift({pitch: pitchshifter.pitch, wet: Number(value)}), pitchshifter);
 }

const fret_width = 10;

let distance_to_nut = 5480;
let last_index = [];

let strumming = false;
let strumming_string;

useEffect(()=>{
   console.log(stringsAmount)
   if (stringsAmount!=null) {
      let t_last_index = [];
      for (let i = 0; i < stringsAmount; i++) {
         t_last_index.push(last_index.length > i ? last_index[i] : 0)
      }
      last_index = t_last_index
      console.log(t_last_index)
      console.log(`last index: ${t_last_index}`);
   }
},[stringsAmount])

useEffect(()=>{
   console.log('generating frets...')
   let t_frets = [];
   let t_strings = [];
   let t_frets_triggers = [];
   for (let i = 1; i < fretsAmount; i++) {
      let distance_from_nut = distance_to_nut*(1-1/((2**(1/12))**i));
      let fret_size = distance_to_nut*((1-1/((2**(1/12))**i))-(1-1/((2**(1/12))**(i-1))));
      let fret_heigh_increment = (2**(1/12))**i*30
      let fret_height = 350+fret_heigh_increment
      if ((i+1)%12==0) {
         t_frets = [...t_frets, <rect height="10" width={fret_height} x={-fret_heigh_increment/2} y={distance_from_nut} key={i}/>, <circle r="25" cy={distance_from_nut+(distance_to_nut*(1-1/((2**(1/12))**(i+1)))-distance_from_nut)/2} cx={(fret_height-fret_heigh_increment)/4} fill=''/>, <circle r="25" cy={distance_from_nut+(distance_to_nut*(1-1/((2**(1/12))**(i+1)))-distance_from_nut)/2} cx={(fret_height-fret_heigh_increment)*3/4} fill=''/>];
      } else if ((i+1)%12==3||(i+1)%12==5||(i+1)%12==7||(i+1)%12==9) {
         t_frets = [...t_frets, <rect height="10" width={fret_height} x={-fret_heigh_increment/2} y={distance_from_nut} key={i}/>, <circle r="25" cy={distance_from_nut+(distance_to_nut*(1-1/((2**(1/12))**(i+1)))-distance_from_nut)/2} cx={(fret_height-fret_heigh_increment)/2} fill=''/>];
      } else {
         t_frets = [...t_frets, <rect height="10" width={fret_height} x={-fret_heigh_increment/2} y={distance_from_nut} key={i}/>];
      }
   }
   // <g className='circle' style={{display: pitchBinding[0] == guitarTuning[0] ? 'block' : 'none'}}><circle r="40" cx={-((2**(1/12))**0*30/2)/6} cy={-320+(distance_to_nut*(1-1/((2**(1/12))**(0+1)))-320)/2} fill='darkblue' id={guitarTuning[0]}/><text textAnchor="middle" x={((2**(1/12))**0*30/2)/6} y={-320+(distance_to_nut*(1-1/((2**(1/12))**(0+1)))-320)/2+30} fill='whitesmoke' style={{fontSize: '5em'}}>{guitarTuning[0]}</text></g>
   // <rect height={distance_to_nut*((1-1/((2**(1/12))**0))-(1-1/((2**(1/12))**(0-1))))} width={(2**(1/12))**1*30*2} x={-((2**(1/12))**0*30/2)} y={-320} key={0} fill='transparent' fillOpacity="0" note={guitarTuning[0]} onClickCapture={(e)=>{let t_pitchBinding = [...pitchBinding];console.log(t_pitchBinding);e.target.parentElement.querySelectorAll('.circle')[last_index[0]].style.display = 'none';t_pitchBinding[0] = guitarTuning[0]; setPitchBinding(t_pitchBinding); console.log(last_index[0]); last_index[0] = 0;}}/>
   for (let j = 0; j < stringsAmount; j++) {
      let distance_from_nut = -320;
      let fret_size = distance_to_nut*((1-1/((2**(1/12))**0))-(1-1/((2**(1/12))**(0-1))));
      let fret_heigh_increment = ((2**(1/12))**0*30/2)
      let fret_height = (2**(1/12))**1*30*2
      let pitch_note = guitarTuning[j];
      t_frets_triggers = [...t_frets_triggers, <g className='circle' style={{display: pitchBinding[j] == pitch_note ? 'block' : 'none'}}><circle r="40" cx={fret_heigh_increment/6} cy={distance_from_nut+(distance_to_nut*(1-1/((2**(1/12))**(0+1)))+distance_from_nut/8)/2} fill='darkblue' id={pitch_note}/><text textAnchor="middle" y={distance_from_nut+(distance_to_nut*(1-1/((2**(1/12))**(0+1)))+distance_from_nut/8)/2+30} fill='whitesmoke' style={{fontSize: '5em'}}>{pitch_note}</text></g>, <rect height={fret_size} width={fret_height} x={-fret_heigh_increment/2} y={distance_from_nut} key={0} fill='transparent' fillOpacity="0" note={pitch_note} onClickCapture={(e) => {let t_pitchBinding = [...e.target.parentElement.parentElement.parentElement.getAttribute('pitchbinding').split(',')];console.log(t_pitchBinding); t_pitchBinding[j] = pitch_note; pb_changed=false; setPitchBinding(pb => {let t = [...pb];t[j]=pitch_note;return t}); pb_changed = false; console.log(e.target.parentElement.querySelector('.circle')); e.target.parentElement.querySelectorAll('.circle')[last_index[j]].style.display = 'none'; e.target.parentElement.querySelectorAll('.circle')[0].style.display = 'block'; last_index[j] = 0; console.log(e.target.parentElement.querySelectorAll('.circle')[0].style)}}/>];      
      for (let i = 0; i < fretsAmount; i++) {
         // console.log(i)
         let distance_from_nut = distance_to_nut*(1-1/((2**(1/12))**i));
         let fret_size = distance_to_nut*((1-1/((2**(1/12))**i))-(1-1/((2**(1/12))**(i-1))));
         let fret_heigh_increment = (2**(1/12))**i*30
         let fret_height = (2**(1/12))**1*30*2
         let pitch_note = intToNote(noteToInt(guitarTuning[j])+i+1);
         // console.log(noteToInt(guitarTuning[j]))
         // console.log(pitch_note)
         t_frets_triggers = [...t_frets_triggers, <g className='circle' style={{display: pitchBinding[j] == pitch_note ? 'block' : 'none'}}><circle r="40" cx={fret_heigh_increment/6} cy={distance_from_nut+(distance_to_nut*(1-1/((2**(1/12))**(i+1)))-distance_from_nut)/2} fill='darkblue' id={pitch_note}/><text textAnchor="middle" y={distance_from_nut+(distance_to_nut*(1-1/((2**(1/12))**(i+1)))-distance_from_nut)/2+30} fill='whitesmoke' style={{fontSize: '5em'}}>{pitch_note}</text></g>, <rect height={fret_size} width={fret_height} x={-fret_heigh_increment/2} y={distance_from_nut} key={i+1} fill='transparent' fillOpacity="0" note={pitch_note} onClickCapture={(e) => {let t_pitchBinding = [...e.target.parentElement.parentElement.parentElement.getAttribute('pitchbinding').split(',')];console.log("t_pitchBinding before: ",t_pitchBinding); t_pitchBinding[j] = pitch_note; console.log("t_pitchBinding after: ",t_pitchBinding); pb_changed=false; setPitchBinding(pb => {let t = [...pb];t[j]=pitch_note;return t}); pb_changed = false; console.log(e.target.parentElement.querySelector('.circle')); e.target.parentElement.querySelectorAll('.circle')[last_index[j]].style.display = 'none'; e.target.parentElement.querySelectorAll('.circle')[i+1].style.display = 'block'; last_index[j] = i+1; console.log(e.target.parentElement.querySelectorAll('.circle')[i+1].style)}}/>]; 
      }
      t_strings.push(t_frets_triggers)
      t_frets_triggers = []
   }
   setFrets(t_frets);
   setFretsTriggers(t_frets_triggers);
   setStringsTriggers(t_strings);
},[fretsAmount])

useEffect(()=>{console.log(frets)},[frets])

let notesSeqeunce = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

useEffect(()=>{
   if (localStorage || !localStorage.getItem('stringsAmount')) {
      localStorage.setItem('stringsAmount', 6)
   }
   setStringsAmount(localStorage.getItem('stringsItem'))
},[])

useEffect(()=>{
   console.log("pb_changed");
   console.log(pitchBinding);
   pb_changed=true;
},[pitchBinding])
// var map = {}; // You could also use an array
// onkeydown = onkeyup = function(e){
//     e = e || event; // to deal with IE
//     map[e.keyCode] = e.type == 'keydown';
//     /* insert conditional here */
// }

if (typeof window != "undefined") {
console.log(stringsAmount)
   window.onkeydown = (e)=>{
      // e.preventDefault()
      console.log(e)
      map[e.key.toLowerCase()] = e.type == 'keydown';
      let strings = JSON.parse(localStorage.getItem('strings')) || function(){localStorage.setItem('strings', JSON.stringify(["1","2","3","4","5","6"]));return ["1","2","3","4","5","6"]}();
      let fretting_keys = JSON.parse(localStorage.getItem('frettingKeys')) || function(){localStorage.setItem('frettingKeys', JSON.stringify(["q","w","e","r","t","y","u","i","o","p","[","]","a","s","d","f","g","h","j","k","l",";"]));return ["q","w","e","r","t","y","u","i","o","p","[","]","a","s","d","f","g","h","j","k","l",";"]}();
      // console.log('ock: ',octavechangekeys)
      // console.log(getKeysByValue(octavechangekeys, e.key.toLowerCase()))
      // console.log(getKeysByValue(octavechangekeys, e.key.toLowerCase()).length > 0)
      console.log(getKeysByValue(strings, 'alt'.toLowerCase()))
      console.log(Object.entries(map).filter((ev)=>(getKeysByValue(strings, ev[0].toLowerCase()).length>0&&ev[1])))
      console.log(map)
      console.log(`assertion: ${(getKeysByValue(fretting_keys, e.key.toLowerCase()).length > 0 && Object.entries(map).filter((ev)=>(getKeysByValue(strings, ev[0].toLowerCase()).length>0&&ev[1])).length>0)}`)
      console.log(`assertion2: ${getKeysByValue(strings, e.key.toLowerCase()).length > 0 && Object.entries(map).filter((ev)=>(getKeysByValue(fretting_keys, ev[0].toLowerCase()).length>0&&ev[1])).length>0}`)
      // JSON.parse(localStorage.getItem("chords"))      
      let chords = JSON.parse(localStorage.getItem("chords")) || function(){localStorage.setItem('chords', JSON.stringify([]));return []}();
      if (Object.values(chords).map(e=>e.key).includes(e.key.toLowerCase())) {
         // console.log(Object.values(JSON.parse(localStorage.getItem("chords"))).map(e=>[Object.getOwnPropertyNames(e), e.key.toLowerCase]).filter)
         console.log(Object.keys(chords).map(e=>[e,chords[e].key]))
         console.log(e.key.toLowerCase())
         console.log(chords[Object.keys(chords).map(e=>[e,chords[e].key]).filter(el=>el[1]==e.key.toLowerCase())[0][0]].shape);
         setChordShape(chords[Object.keys(chords).map(e=>[e,chords[e].key]).filter(el=>el[1]==e.key.toLowerCase())[0][0]].shape)
         // window.dispatchEvent(new Event("keydown", {type: 'keydown', key: '6'}))
         // window.dispatchEvent(new Event("keydown", {type: 'keydown', key: 'tab'}))
         let stringsOuter = document.getElementById('strings');
         console.log(JSON.parse(stringsOuter.getAttribute("stringsamount"))-1)
         // const event = new KeyboardEvent('keydown', { key: strings[JSON.parse(stringsOuter.getAttribute("stringsamount"))-1] });
         // window.dispatchEvent(event);
         // const event2 = new KeyboardEvent('keydown', { key: "tab" });
         // window.dispatchEvent(event2);
         // setChordShape(Object.values(JSON.parse(localStorage.getItem("chords"))).map(e=>[Object.getOwnPropertyNames(e),e.shape]).filter(e=>e[0]==Object.getOwnPropertyNames(e))[1]);
      } else if (e.altKey) {
         e.preventDefault(); //undefined behaviour
         console.log('alt + ',e.key.toLowerCase());
         if (getKeysByValue(strings, e.key.toLowerCase()).length > 0) {
            let pressedKeyMapped = getKeysByValue(strings, e.key.toLowerCase());
            for (let i = 0; i < pressedKeyMapped.length; i++) {
            // for (let i = 0; i < getKeysByValue(strings, e.key.toLowerCase()).length; i++) {
               let stringsOuter = document.getElementById('strings');
               if (stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]==guitarTuning[pressedKeyMapped[i]]) {
                  return; //since there is no fret on nut
               } else if ((noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]])+1)>=12) {
                  // let frequency = Tone.Frequency(guitarTuning[pressedKeyMapped[i]]).toFrequency() / ((((distance_to_nut*(1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]]))))))) / distance_to_nut);
                  let frequency = Tone.Frequency(guitarTuning[pressedKeyMapped[i]]).toFrequency() / (((((1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]]))))))))
                  console.log("length: ",((1-(distance_to_nut*(1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]])+1))) / stringsOuter.children[pressedKeyMapped[i]].children[0].getAttribute("height"))) * scaleLength))
                  console.log("half Length: ",(((1-(distance_to_nut*(1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]])))) / stringsOuter.children[pressedKeyMapped[i]].children[0].getAttribute("height"))) * scaleLength)))
                  // console.log("if: ",Tone.Frequency(guitarTuning[strings.indexOf(getKeysByValue(strings, e.key.toLowerCase())[i])+1]).toFrequency())
                  console.log("curnote number: ",noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]))
                  console.log("curnote: ",stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]])
                  console.log("frequency: ",frequency);
                  guitar.triggerAttack(frequency);
               } else {
                  let frequency = Tone.Frequency(guitarTuning[pressedKeyMapped[i]]).toFrequency() / (((1-1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]]))))));
                  // console.log("length: ",(((distance_to_nut*(1-1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]])+1))) / stringsOuter.children[pressedKeyMapped[i]].children[0].getAttribute("height"))) * scaleLength))
                  console.log("length: ", ((distance_to_nut*(1-1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]])))) / distance_to_nut)))
                  // console.log("divison: ",((((distance_to_nut*(1-1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]])+1))) / stringsOuter.children[pressedKeyMapped[i]].children[0].getAttribute("height"))) * scaleLength) / scaleLength))
                  // console.log("half Length: ",(((1-(distance_to_nut*(1-1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]])))) / stringsOuter.children[pressedKeyMapped[i]].children[0].getAttribute("height"))) * scaleLength)))
                  // console.log("if: ",Tone.Frequency(guitarTuning[strings.indexOf(getKeysByValue(strings, e.key.toLowerCase())[i])+1]).toFrequency())
                  console.log("curnote number: ",noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]))
                  console.log("curnote: ",stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]])
                  console.log("frequency: ",frequency);
                  guitar.triggerAttack(frequency);
               }
               // let frequency = Tone.Frequency(guitarTuning[pressedKeyMapped[i]]).toFrequency() / (((1-(distance_to_nut*(1-1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]])+1))) / stringsOuter.children[pressedKeyMapped[i]].children[0].getAttribute("height"))) * scaleLength) / scaleLength);
               // console.log("length: ",((1-(distance_to_nut*(1-1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]])+1))) / stringsOuter.children[pressedKeyMapped[i]].children[0].getAttribute("height"))) * scaleLength))
               // console.log("half Length: ",(((1-(distance_to_nut*(1-1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]) - noteToInt(guitarTuning[pressedKeyMapped[i]])))) / stringsOuter.children[pressedKeyMapped[i]].children[0].getAttribute("height"))) * scaleLength)))
               // console.log("if: ",Tone.Frequency(guitarTuning[strings.indexOf(getKeysByValue(strings, e.key.toLowerCase())[i])+1]).toFrequency())
               // console.log("curnote number: ",noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]]))
               // console.log("curnote: ",stringsOuter.getAttribute("pitchbinding").split(',')[pressedKeyMapped[i]])
               // console.log(strings)
               // console.log(pressedKeyMapped[i])
               // console.log(pressedKeyMapped)
               // console.log(i)
               // console.log(strings.indexOf(pressedKeyMapped[i]))
               // console.log("cf: ",distance_to_nut*(1-1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[strings.indexOf(getKeysByValue(strings, e.key.toLowerCase())[i])])-noteToInt(guitarTuning[strings.indexOf(getKeysByValue(strings, e.key.toLowerCase())[i])]))))) //*scaleLength
               // console.log("sL: ",scaleLength)
               // console.log("Length: ",distance_to_nut*(1-1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[strings.indexOf(strings[i])]) - noteToInt(guitarTuning[strings.indexOf(strings[i])])))))
               // console.log("divided length: ",(distance_to_nut*(1-1/((2**(1/12))**(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[strings.indexOf(strings[i])]) - noteToInt(guitarTuning[strings.indexOf(strings[i])])))) / scaleLength))
               // console.log("sf: ",Tone.Frequency(guitarTuning[strings.indexOf(getKeysByValue(strings, e.key.toLowerCase())[i])+1]).toFrequency())
               // console.log("frequency: ",frequency);
               // guitar.triggerAttack(frequency);
            }
         }
      } else if ((getKeysByValue(strings, e.key.toLowerCase()).length > 0 && Object.entries(map).filter((ev)=>(getKeysByValue(["tab"], ev[0].toLowerCase()).length>0&&ev[1])).length>0)) {
         e.preventDefault()
         console.log("tab!!!!!!!")
         // if (Object.entries(map).filter((ev)=>(getKeysByValue(strings, ev[0].toLowerCase()).length>0&&ev[1])).length>0) {
            e.stopPropagation(); 
            let pressedKeyMapped = Object.entries(map).filter((ev)=>(getKeysByValue(strings, ev[0].toLowerCase()).length>0&&ev[1]));
            console.log(strings);
            console.log(e.key.toLowerCase());
            console.log(pressedKeyMapped[0])
            console.log(strings.indexOf(pressedKeyMapped[0]))
            let stringsOuter = document.getElementById('strings');
            for (let i = 0; i < pressedKeyMapped.length; i++) {
               for (let j = 0; j < Number(strings.indexOf(pressedKeyMapped[i][0]))+1; j++) {
                  stringsOuter.querySelector(`#string-${j+1}`).dispatchEvent(new Event('mouseup'))
                  stringsOuter.querySelector(`#string-${j+1}`).dispatchEvent(new Event('mousedown'))
                  // console.log('key',Number(pressedKeyMapped)+1);
                  // for (let k = 0; k < Number(strings.indexOf(beforePressedKeyMapped[j][0]))+1; k++) {
                  //    let string = stringsOuter.querySelector(`#string-${k+1}`).parentElement;
                  //    string.children[string.children.length-1].querySelectorAll('rect')[Number(pressedKeyMapped[i])].dispatchEvent(new Event('click'))
                  // }
               }
            }
            strumming = true;
            strumming_string = Number(strings.indexOf(pressedKeyMapped[0][0]))+1;
         // }
         // } else if (getKeysByValue(strings, e.key.toLowerCase()).length > 0) {
         //    e.stopPropagation(); 
         //    console.log("first")
         //    let pressedKeyMapped = getKeysByValue(strings, e.key.toLowerCase());                                    
         //    console.log(strings);
         //    console.log(e.key.toLowerCase());
         //    let stringsOuter = document.getElementById('strings');
         //    for (let i = 0; i < pressedKeyMapped.length; i++) {
         //       for (let j = 0; j < strings.indexOf(pressedKeyMapped[i]); j++) {
         //          stringsOuter.querySelector(`#string-${j+1}`).dispatchEvent(new Event('mousedown'))
         //          // console.log('key',Number(pressedKeyMapped)+1);
         //       }
         //    }
         // }
      } else if (e.shiftKey) { //shift for moving shape, alt for flageolets, ctrl for barre cuz it causes window to close
         //left to right (0-21), bottom to top (1-6)
         e.preventDefault(); //disables all except t, w, n
         console.log('shift + ',e.key.toLowerCase());
         if (getKeysByValue(fretting_keys, e.key.toLowerCase()).length > 0) {
            let stringsOuter = document.getElementById('strings');
            console.log(123123);
            let pressedKeyMapped = getKeysByValue(fretting_keys, e.key.toLowerCase());
            let node_key = Math.min(...stringsOuter.getAttribute("pitchbinding").split(',').map((e)=>noteToInt(e)-noteToInt(guitarTuning[stringsOuter.getAttribute("pitchbinding").split(',').indexOf(e)])).filter((e)=>e!=0)); //if ctrl is not pressed, if it's pressed all the keys must move
            console.log("nk ",node_key);
            let delta_node_key = node_key - Number(pressedKeyMapped[0]);
            for (let i = 0; i < pressedKeyMapped.length; i++) {
               console.log(321);
               // for (let j = 0; j < pitchBinding; j++) {
                  // if (guitarTuning[j] != pitchBinding[j] && noteToInt(guitarTuning[j]) > noteToInt(pitchBinding[j]) ) { noteToInt(guitarTuning[j]) + fretting_keys.indexOf(e.key.toLowerCase())
                  //    return;
                  // }

                  // if (fretting_keys.indexOf(pressedKeyMapped) <   pitchBinding[j]) {
                  //    return;
                  // }
               // }  
               console.log('i',i)
               // console.log(stringsAmount)

               //doesnt work properly after first move, some notes shift 1 step more
               //fails when going backwards and still holding shift
               console.log(document.getElementById('strings').getAttribute('stringsamount'));
               for (let j = 0; j < Number(document.getElementById('strings').getAttribute('stringsamount')); j++) {
                  console.log('j',j)
                  let string = stringsOuter.querySelector(`#string-${j+1}`).parentElement;
                  // if (noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j]) - delta_node_key == 0) {
                  //    break;
                  // }
                  if (stringsOuter.getAttribute("pitchbinding").split(',')[j] == guitarTuning[j] && !isSF) {
                     continue;
                  }
                  // startedCycle = true;
                  console.log('dnk ',delta_node_key);
                  //bug lays in here somewhere
                  //one of the keys stays on its position (highest key by order)
                  console.log("note(current): ",stringsOuter.getAttribute("pitchbinding").split(',')[j],", int: ",noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]));
                  console.log("tuning: ",guitarTuning[j],", int: ",noteToInt(guitarTuning[j]))
                  console.log("note shift",noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j]));
                  console.log("shift amount ", noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j]) - delta_node_key);
                  // string.children[string.children.length-1].querySelectorAll('rect')[noteToInt(pitchBinding[j]) - noteToInt(guitarTuning[j]) + Number(pressedKeyMapped[i]) > fretsAmount ? fretsAmount : noteToInt(pitchBinding[j]) - noteToInt(guitarTuning[j]) + Number(pressedKeyMapped[i])].dispatchEvent(new Event('click'));
                  //this thing changes only upper string in pitchbinding for some reason (probably cause last step of this cycle, as other steps, uses pitchbinding from state or smth)
                  string.children[string.children.length-1].querySelectorAll('rect')[noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j]) - delta_node_key].dispatchEvent(new Event('click'));
                  // while (!pb_changed) {
                  //    console.log("wait")
                  // }
                  // pb_changed=false;
               }
            }
         } else if (getKeysByValue(["!","@","#","$","%","^"], e.key.toLowerCase()).length > 0) { //temporary solution since OS disallows to view which key is being shifted
            console.log()
            console.log("shift + num!!!")
            console.log()
            let stringsOuter = document.getElementById('strings');
            console.log(123123);
            let pressedKeyMapped = getKeysByValue(["!","@","#","$","%","^"], e.key.toLowerCase());
            let node_key = Math.min(...[...stringsOuter.children].filter((e)=>guitarTuning[[...stringsOuter.children].indexOf(e)]!=stringsOuter.getAttribute('pitchbinding').split(',')[[...stringsOuter.children].indexOf(e)]).map((e)=>[...stringsOuter.children].indexOf(e))); //if ctrl is not pressed, if it's pressed all the keys must move
            console.log("nk ",node_key);
            console.log([...stringsOuter.children].filter((e)=>guitarTuning[[...stringsOuter.children].indexOf(e)]!=stringsOuter.getAttribute('pitchbinding').split(',')[[...stringsOuter.children].indexOf(e)]).map((e)=>[...stringsOuter.children].indexOf(e)))
            let delta_node_key = Number(pressedKeyMapped[0]) - node_key;
            console.log("diff is ",delta_node_key)
            console.log(pressedKeyMapped)
            
            // let string = stringsOuter.querySelector(`#string-${j+1}`).parentElement;
            // if (noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j]) - delta_node_key == 0) {
            //    break;
            // }
            // if (stringsOuter.getAttribute("pitchbinding").split(',')[j] == guitarTuning[j] && !isSF) {
            //    continue;
            // }
            // startedCycle = true;
            // let diff = node_key - pressedKeyMapped[i];
            // if (stringsOuter.getAttribute("pitchbinding").split(',')[j] == guitarTuning[j] && !isSF) {
            //    continue;
            // }
            if (delta_node_key == 0) {
               return;
            } else if (delta_node_key > 0) {
               // noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j]) - delta_node_key
               for (let i = 0; i < pressedKeyMapped.length; i++) {
                  for (let j = Number(document.getElementById('strings').getAttribute('stringsamount')) - 1; j >= 0; j--) {
                     console.log('j',j)
                     // delta_node_key = Number(pressedKeyMapped[0]) - node_key;
                     if (delta_node_key+j+1>Number(document.getElementById('strings').getAttribute('stringsamount'))) {
                        console.log(delta_node_key+j+1)
                        console.log("string out of range!");
                        let string = stringsOuter.querySelector(`#string-${j+1}`).parentElement;
                        string.children[string.children.length-1].querySelectorAll('rect')[0].dispatchEvent(new Event('click'));
                        continue;
                     }
                     console.log("\ncalcs: ")
                     console.log(delta_node_key+j+1)
                     console.log(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j]))
                     let string = stringsOuter.querySelector(`#string-${delta_node_key+j+1}`).parentElement;
                     string.children[string.children.length-1].querySelectorAll('rect')[noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j])].dispatchEvent(new Event('click'));                     
                     string = stringsOuter.querySelector(`#string-${j+1}`).parentElement;
                     string.children[string.children.length-1].querySelectorAll('rect')[0].dispatchEvent(new Event('click'));
                  }
               }
            } else {
               for (let i = 0; i < pressedKeyMapped.length; i++) {
                  for (let j = 0; j < Number(document.getElementById('strings').getAttribute('stringsamount')); j++) {
                     console.log('j',j)
                     // delta_node_key = Number(pressedKeyMapped[0]) - node_key;
                     if (delta_node_key+j+1<1) {
                        console.log(delta_node_key+j+1)
                        console.log("string out of range!");
                        let string = stringsOuter.querySelector(`#string-${j+1}`).parentElement;
                        string.children[string.children.length-1].querySelectorAll('rect')[0].dispatchEvent(new Event('click'));
                        continue;
                     }
                     console.log("\ncalcs: ")
                     console.log(delta_node_key+j+1)
                     console.log(noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j]))
                     let string = stringsOuter.querySelector(`#string-${delta_node_key+j+1}`).parentElement;
                     string.children[string.children.length-1].querySelectorAll('rect')[noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j])].dispatchEvent(new Event('click'));                     
                     string = stringsOuter.querySelector(`#string-${j+1}`).parentElement;
                     string.children[string.children.length-1].querySelectorAll('rect')[0].dispatchEvent(new Event('click'));
                  }
               }
            }
            // console.log('dnk ',delta_node_key);
            // console.log("note(current): ",stringsOuter.getAttribute("pitchbinding").split(',')[j],", int: ",noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]));
            // console.log("tuning: ",guitarTuning[j],", int: ",noteToInt(guitarTuning[j]))
            // console.log("note shift",noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j]));
            // console.log("shift amount ", noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j]) - delta_node_key);
            // string.children[string.children.length-1].querySelectorAll('rect')[noteToInt(pitchBinding[j]) - noteToInt(guitarTuning[j]) + Number(pressedKeyMapped[i]) > fretsAmount ? fretsAmount : noteToInt(pitchBinding[j]) - noteToInt(guitarTuning[j]) + Number(pressedKeyMapped[i])].dispatchEvent(new Event('click'));
            //this thing changes only upper string in pitchbinding for some reason (probably cause last step of this cycle, as other steps, uses pitchbinding from state or smth)
            // string.children[string.children.length-1].querySelectorAll('rect')[noteToInt(stringsOuter.getAttribute("pitchbinding").split(',')[j]) - noteToInt(guitarTuning[j]) - delta_node_key].dispatchEvent(new Event('click'));
            // while (!pb_changed) {
            //    console.log("wait")
            // }
            // pb_changed=false;
         }
      } else if ((getKeysByValue(fretting_keys, e.key.toLowerCase()).length > 0 && Object.entries(map).filter((ev)=>(getKeysByValue(strings, ev[0].toLowerCase()).length>0&&ev[1])).length>0) || (getKeysByValue(strings, e.key.toLowerCase()).length > 0 && Object.entries(map).filter((ev)=>(getKeysByValue(fretting_keys, ev[0].toLowerCase()).length>0&&ev[1])).length>0)) {
         e.stopPropagation();
         if (getKeysByValue(fretting_keys, e.key.toLowerCase()).length > 0 && Object.entries(map).filter((ev)=>(getKeysByValue(strings, ev[0].toLowerCase()).length>0&&ev[1])).length>0) {
            if (e.ctrlKey || map.ctrl) { //shift for moving shape, alt for flageolets, ctrl for barre cuz it causes window to close
               e.preventDefault(); //disables all except t, w, n
               let beforePressedKeyMapped = Object.entries(map).filter((ev)=>(getKeysByValue(strings, ev[0].toLowerCase()).length>0&&ev[1]));
               let pressedKeyMapped = getKeysByValue(fretting_keys, e.key.toLowerCase());
               let stringsOuter = document.getElementById('strings');
               for (let i = 0; i < pressedKeyMapped.length; i++) {
                  for (let j = 0; j < beforePressedKeyMapped.length; j++) {
                     for (let k = 0; k < Number(strings.indexOf(beforePressedKeyMapped[j][0]))+1; k++) {                        
                        let string = stringsOuter.querySelector(`#string-${k+1}`).parentElement;
                        string.children[string.children.length-1].querySelectorAll('rect')[Number(pressedKeyMapped[i])].dispatchEvent(new Event('click'))
                     }
                  }
               }
               if (isSF) {
                  console.log()
                  console.log("strings amount: ",stringsOuter.getAttribute('stringsamount'))
                  console.log()
                  for (let j = 0; j < beforePressedKeyMapped.length; j++) {
                     for (let k = Number(strings.indexOf(beforePressedKeyMapped[j][0]))+1; k < Number(stringsOuter.getAttribute('stringsamount')); k++) {
                        let stringsOuter = document.getElementById('strings');
                        let string = stringsOuter.querySelector(`#string-${k+1}`).parentElement;
                        string.children[string.children.length-1].querySelectorAll('rect')[0].dispatchEvent(new Event('click'))
                     }
                  }
               }
               console.log('ctrl + ',e.key.toLowerCase());
               return;
            } else {
               let beforePressedKeyMapped = Object.entries(map).filter((ev)=>(getKeysByValue(strings, ev[0].toLowerCase()).length>0&&ev[1]));
               let pressedKeyMapped = getKeysByValue(fretting_keys, e.key.toLowerCase());
               console.log(`ll's: ${pressedKeyMapped.length}, ${beforePressedKeyMapped}`)
               for (let i = 0; i < pressedKeyMapped.length; i++) {
                  for (let j = 0; j < beforePressedKeyMapped.length; j++) {
                     let stringsOuter = document.getElementById('strings');
                     console.log(beforePressedKeyMapped[j][0])
                     console.log(strings.indexOf(beforePressedKeyMapped[j][0]));
                     let string = stringsOuter.querySelector(`#string-${Number(strings.indexOf(beforePressedKeyMapped[j][0]))+1}`).parentElement;
                     console.log(pressedKeyMapped[i])
                     console.log(string.children[string.children.length-1].querySelectorAll('rect')[Number(pressedKeyMapped[i])])
                     console.log(pressedKeyMapped)
                     console.log('str',pressedKeyMapped[i])
                     console.log('frt',beforePressedKeyMapped[j])
                     guitar.triggerRelease(pitchBinding[Number(beforePressedKeyMapped[j][0])-1]);
                     string.children[string.children.length-1].querySelectorAll('rect')[Number(pressedKeyMapped[i])].dispatchEvent(new Event('click'))
                     guitar.triggerAttack(string.children[string.children.length-1].querySelectorAll('rect')[Number(pressedKeyMapped[i])].getAttribute('note'))
                  }
               }
            }
         } else if (getKeysByValue(strings, e.key.toLowerCase()).length > 0 && Object.entries(map).filter((ev)=>(getKeysByValue(fretting_keys, ev[0].toLowerCase()).length>0&&ev[1])).length>0) {
            if (e.ctrlKey || map.ctrl) { //shift for moving shape, alt for flageolets, ctrl for barre cuz it causes window to close
               e.preventDefault(); //disables all except t, w, n
               let beforePressedKeyMapped = Object.entries(map).filter((ev)=>(getKeysByValue(fretting_keys, ev[0].toLowerCase()).length>0&&ev[1]));
               let pressedKeyMapped = getKeysByValue(strings, e.key.toLowerCase());
               let stringsOuter = document.getElementById('strings');
               for (let i = 0; i < pressedKeyMapped.length; i++) {
                  for (let j = 0; j < beforePressedKeyMapped.length; j++) {
                     for (let k = 0; k < Number(pressedKeyMapped[i])+1; k++) {
                        let string = stringsOuter.querySelector(`#string-${k+1}`).parentElement;
                        string.children[string.children.length-1].querySelectorAll('rect')[Number(fretting_keys.indexOf(beforePressedKeyMapped[j][0]))].dispatchEvent(new Event('click'))
                     }
                  }
               }
               if (isSF) {
                  for (let i = 0; i < pressedKeyMapped.length; i++) {
                     for (let k = Number(pressedKeyMapped[i])+1; k < Number(stringsOuter.getAttribute("stringsAmount")); k++) {
                        console.log("strings amount: ",Number(strings.getAttribute("stringsAmount")))
                        let stringsOuter = document.getElementById('strings');
                        let string = stringsOuter.querySelector(`#string-${k+1}`).parentElement;
                        string.children[string.children.length-1].querySelectorAll('rect')[0].dispatchEvent(new Event('click'))
                     }
                  }
               }
               console.log('ctrl + ',e.key.toLowerCase());
               return;
            } else {
               let beforePressedKeyMapped = Object.entries(map).filter((ev)=>(getKeysByValue(fretting_keys, ev[0].toLowerCase()).length>0&&ev[1]));
               let pressedKeyMapped = getKeysByValue(strings, e.key.toLowerCase());
               console.log(`ll's: ${pressedKeyMapped.length}, ${beforePressedKeyMapped}`)
               for (let i = 0; i < pressedKeyMapped.length; i++) {
                  for (let j = 0; j < beforePressedKeyMapped.length; j++) {
                     let stringsOuter = document.getElementById('strings');
                     console.log(beforePressedKeyMapped[j][0])
                     console.log(strings.indexOf(beforePressedKeyMapped[j][0]));
                     console.log(pressedKeyMapped[i]);
                     console.log(strings)
                     console.log(Number(pressedKeyMapped[i])+1);
                     console.log(pressedKeyMapped)
                     let string = stringsOuter.querySelector(`#string-${Number(pressedKeyMapped[i])+1}`).parentElement;
                     console.log(pressedKeyMapped[i])
                     console.log(string.children[string.children.length-1].querySelectorAll('rect')[Number(pressedKeyMapped[i])])
                     console.log(Number(fretting_keys.indexOf(beforePressedKeyMapped[j][0])))
                     console.log("str1",pitchBinding[Number(fretting_keys.indexOf(beforePressedKeyMapped[j][0]))])
                     guitar.triggerRelease(pitchBinding[Number(fretting_keys.indexOf(beforePressedKeyMapped[j][0]))]);
                     string.children[string.children.length-1].querySelectorAll('rect')[Number(fretting_keys.indexOf(beforePressedKeyMapped[j][0]))].dispatchEvent(new Event('click'))
                  }
               }
            }
         }
      } else if (getKeysByValue(strings, e.key.toLowerCase()).length > 0) {
      //pathname.match(/\w+(\/\w+)[/]?$/)[1]
      e.stopPropagation(); 
      //const notes = JSON.parse(localStorage.getItem('notes')) || function(){localStorage.setItem('notes', JSON.stringify(["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]));return ["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]}();
      
      console.log(strings);
      let pressedKeyMapped = getKeysByValue(strings, e.key.toLowerCase());
      console.log(e.key.toLowerCase());
      let stringsOuter = document.getElementById('strings');
      if (pressedKeyMapped != undefined) {
      for (let i = 0; i < pressedKeyMapped.length; i++ ){
      // let mappedKey = Number(pressedKeyMapped[i])-Number(pressedKeyMapped[i])%12+keyMap[pressedKeyMapped[i]%12];
      // console.log(pressedKeyMapped)
      // console.log(strings.indexOf(pressedKeyMapped[i]))
      stringsOuter.querySelector(`#string-${Number(pressedKeyMapped)+1}`).dispatchEvent(new Event('mousedown'))
      console.log('key',Number(pressedKeyMapped)+1);
      // console.log('mapped',mappedKey );
      // console.log(synthsvg.children)
      // console.log(synthsvg.children[mappedKey])
      // synthsvg.children[mappedKey].dispatchEvent(new Event('mousedown'));
      // console.log(synthsvg.children[mappedKey].getAttribute('isPressed'));
      /*if (!synthsvg.children[mappedKey].getAttribute("isPressed")) {
      //synthsvg.children[mappedKey].dispatchEvent(new Event('mousedown'));
      synthsvg.children[mappedKey].setAttribute("isPressed",true);
      }*/
      }
      }
      }
}
window.onkeyup = (e)=>{
   map[e.key.toLowerCase()] = e.type == 'keydown';
   let strings = JSON.parse(localStorage.getItem('strings')) || function(){localStorage.setItem('strings', JSON.stringify(["1","2","3","4","5","6"]));return ["1","2","3","4","5","6"]}();
   // console.log('ock: ',octavechangekeys)
   // console.log(getKeysByValue(octavechangekeys, e.key.toLowerCase()))
   // console.log(getKeysByValue(octavechangekeys, e.key.toLowerCase()).length > 0)
   if (getKeysByValue(strings, e.key.toLowerCase()).length > 0) {
   //pathname.match(/\w+(\/\w+)[/]?$/)[1]
   e.stopPropagation(); 
   //const notes = JSON.parse(localStorage.getItem('notes')) || function(){localStorage.setItem('notes', JSON.stringify(["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]));return ["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]}();
   
   console.log(strings);
   let pressedKeyMapped = getKeysByValue(strings, e.key.toLowerCase());
   console.log(e.key.toLowerCase());
   let stringsOuter = document.getElementById('strings');
   if (pressedKeyMapped != undefined) {
   for (let i = 0; i < pressedKeyMapped.length; i++ ){
   // let mappedKey = Number(pressedKeyMapped[i])-Number(pressedKeyMapped[i])%12+keyMap[pressedKeyMapped[i]%12];
   // console.log(pressedKeyMapped)
   // console.log(strings.indexOf(pressedKeyMapped[i]))
   stringsOuter.querySelector(`#string-${Number(pressedKeyMapped)+1}`).dispatchEvent(new Event('mouseup'))
   console.log('key',Number(pressedKeyMapped)+1);
   // console.log('mapped',mappedKey );
   // console.log(synthsvg.children)
   // console.log(synthsvg.children[mappedKey])
   // synthsvg.children[mappedKey].dispatchEvent(new Event('mousedown'));
   // console.log(synthsvg.children[mappedKey].getAttribute('isPressed'));
   /*if (!synthsvg.children[mappedKey].getAttribute("isPressed")) {
   //synthsvg.children[mappedKey].dispatchEvent(new Event('mousedown'));
   synthsvg.children[mappedKey].setAttribute("isPressed",true);
   }*/
   }
   }
   } else if (strumming) { //((getKeysByValue(strings, e.key.toLowerCase()).length > 0 && Object.entries(map).filter((ev)=>(getKeysByValue(["tab"], ev[0].toLowerCase()).length>0&&ev[1])).length>0) || (e.key.toLowerCase() == "tab" && Object.entries(map).filter((ev)=>(getKeysByValue(strings, ev[0].toLowerCase()).length>0&&ev[1])).length>0)) && 
      console.log("tab end!!!!!!!")
      // if (Object.entries(map).filter((ev)=>(getKeysByValue(strings, ev[0].toLowerCase()).length>0&&ev[1])).length>0) {
         e.stopPropagation(); 

         console.log("is strumming: ",strumming)
         // let pressedKeyMapped = Object.entries(map).filter((ev)=>(getKeysByValue(strings, ev[0].toLowerCase()).length>0&&ev[1]));
         console.log(strings);
         console.log(e.key.toLowerCase());
         // console.log(pressedKeyMapped[0])
         // console.log(strings.indexOf(pressedKeyMapped[0]))
         let stringsOuter = document.getElementById('strings');
         // for (let i = 0; i < pressedKeyMapped.length; i++) {
         for (let j = 0; j < strumming_string; j++) {
            stringsOuter.querySelector(`#string-${j+1}`).dispatchEvent(new Event('mouseup'))
            // console.log('key',Number(pressedKeyMapped)+1);
            // for (let k = 0; k < Number(strings.indexOf(beforePressedKeyMapped[j][0]))+1; k++) {
            //    let string = stringsOuter.querySelector(`#string-${k+1}`).parentElement;
            //    string.children[string.children.length-1].querySelectorAll('rect')[Number(pressedKeyMapped[i])].dispatchEvent(new Event('click'))
            // }
         }
         // }
         strumming = false;
         strumming_string = false;
      // }
      // } else if (getKeysByValue(strings, e.key.toLowerCase()).length > 0) {
      //    e.stopPropagation(); 
      //    console.log("first")
      //    let pressedKeyMapped = getKeysByValue(strings, e.key.toLowerCase());                                    
      //    console.log(strings);
      //    console.log(e.key.toLowerCase());
      //    let stringsOuter = document.getElementById('strings');
      //    for (let i = 0; i < pressedKeyMapped.length; i++) {
      //       for (let j = 0; j < strings.indexOf(pressedKeyMapped[i]); j++) {
      //          stringsOuter.querySelector(`#string-${j+1}`).dispatchEvent(new Event('mousedown'))
      //          // console.log('key',Number(pressedKeyMapped)+1);
      //       }
      //    }
      // }
   }
}
}
// },[])

// let current_ir;

function renderIRs() {
   {
      //IRs section
      let irsJSON = JSON.parse(localStorage.getItem("irs")) || function(){localStorage.setItem('irs', JSON.stringify({}));return {}}();
      let outer = document.getElementById("irs");
      let irs = irsJSON
      outer.innerHTML=''
      console.log("irs: ",irs)

      let reset = document.createElement("div");
      reset.id = "resetir"
      reset.onclick = () => {//console.log(mic);mic.open();Tone.start(); let mapped = [...effects.filter((e)=>e[1])].map((e)=>e[0]);
         setiscurrent_ir(false);
         setcurrent_ir();
         // toggleEffect(0,current_ir);
         // console.log(mapped)
         // mapped = mapped.filter((e)=>e!=effect)
         // console.log(mapped)
         // mic.disconnect().chain(...[...mapped], new Tone.Mono(), Tone.Destination);
         // guitar.disconnect().chain(...[...mapped], new Tone.Mono(), Tone.Destination);
         // if (current_ir) {
         //    console.log("\n\n\n")
         //    console.log(current_ir)
         //    toggleEffect(0,new Tone.Convolver(current_ir))
         //    current_ir=undefined
         // }
      };
      reset.style.border = "3px solid black";
      reset.textContent = "reset current IR"
      outer.appendChild(reset)


      for (let e in irs) {
         let el = document.createElement("div");
         // console.log(irs[e])
         // current_ir = irs[e];
         el.onclick = () => {console.log(irs[e]);
            console.log(mic);
            setiscurrent_ir(true);
            setcurrent_ir(new Tone.Convolver(irs[e]));
            // toggleEffect(1,current_ir)
         } //mic.disconnect(current_ir);guitar.disconnect(current_ir)};current_ir=irs[e];toggleEffect(0,new Tone.Convolver(irs[e]))
         el.style.cssText = "border: 3px solid black; display: flex; flex-direction: row; justify-content: space-between"
         el.textContent = e;
         let deleteIR = document.createElement("div");
         deleteIR.textContent = "x";
         deleteIR.style.cssText = "background: red; height: 3ch; width: 3ch; text-align: center; border-left: 2px solid black; cursor: pointer"
         deleteIR.onclick = () => {let newIRs = JSON.parse(localStorage.getItem("irs")); delete newIRs[e]; localStorage.setItem("irs", JSON.stringify(newIRs));renderIRs()};
         el.appendChild(deleteIR);
         outer.appendChild(el)
      }
   }
}

useEffect(()=>{
   console.log(current_ir)
   console.log(document.getElementById("resetir"))
   if (document.readyState === 'complete'&&document.getElementById("resetir")&&mic!=undefined) {
      console.log("current_ir update")
      toggleEffect(iscurrent_ir, current_ir)
   }
},[current_ir, iscurrent_ir])

function renderChords() {
   {
      //Chords section
      let chordsJSON = JSON.parse(localStorage.getItem("chords")) || function(){localStorage.setItem('chords', JSON.stringify({}));return {}}();
      let outer = document.getElementById("Chords");
      let chords = chordsJSON
      outer.innerHTML=''
      for (let e in chords) {
         let el = document.createElement("div");
         el.onclick = () => {setChordShape(chords[e].shape)};
         el.style.border = "3px solid black";
         el.textContent = e
         let deleteChord = document.createElement("div");
         deleteChord.textContent = "x";
         deleteChord.style.cssText = "background: red; height: 3ch; width: 100%; text-align: center; border-left: 2px solid black; cursor: pointer; word-break: break-all;"
         deleteChord.onclick = () => {let newChords = JSON.parse(localStorage.getItem("chords")); delete newChords[e]; localStorage.setItem("chords", JSON.stringify(newChords));renderChords()};
         el.appendChild(deleteChord);
         outer.appendChild(el)
      }
   }
}

useEffect(()=>{
   window.isTuner_c = isTuner;
   // console.log(window.isTuner_c);
},[isTuner])

// function renderTuner() {
   // let tuner = document.getElementById("tuner");
   // console.log(isTuner_c)
   // let mic = new Tone.UserMedia();
   // mic.output = new Tone.Mono();
   // // mic.toDestination()
   // // console.log(mic)
   // let fft = new Tone.FFT({size:16384});
   // mic.connect(fft)
   // mic.open().then(() => {
   //    // promise resolves when input is available
   //    console.log("mic open");
   //    // print the incoming mic levels in decibels
   //    if (!isTunerInit) {
   //       setIsTunerInit(true);
   //    } else {
   //       return;
   //    }
   //    setInterval(() => {
   //       // console.log(window.isTuner_c);
   // //       let unordered = fft.getValue();
   // // //         let unordered = Object.entries(fft.getValue()).map(
   // // //    ([prop, propValue]) => { return [propValue, prop]; }
   // // // );
   // //       const result = Object.entries(unordered).map(
   // //    ([prop, propValue]) => { return [propValue, prop]; }
   // // );
   // // let ordered = Object.fromEntries(result);
   // // ordered = Object.keys(unordered).toSorted().toReversed().reduce(
   // // (obj, key) => { 
   // //    obj[key] = unordered[key]; 
   // //    return obj;
   // // }, 
   // // {}
   // // );
   // let mappedKeys = Object.keys(fft.getValue()).map(e=>fft.getFrequencyOfIndex(Number(e)));
   // let mapped_t = fft.getValue();
   // let mapped = {}
   // for (let i = 0; i < mappedKeys.length; i++) {
   //    mapped[mappedKeys[i]]=mapped_t[i]
   // }
   // // console.log([1].map(index => fft.getFrequencyOfIndex(index)));
   // let t = Object.values(mapped);
   // let max = Math.max(...t);
   // // console.log(Object.entries(mapped).filter(e=>e[1]==max))
   // // setTuner(JSON.stringify(Object.entries(mapped).filter(e=>e[1]==max)))
   // let cur_frequency = Tone.Frequency(Number(Object.entries(mapped).filter(e=>e[1]==max)[0][0]));
   // if (cur_frequency == 0 || cur_frequency < 0) {
   //    setTuner("play a note to find its pitch")
   //    setGaugePosition(50);
   //    return;
   // }
   // let low_note = (Tone.Frequency(intToNote(noteToInt(cur_frequency.toNote())-1))-cur_frequency)/(Tone.Frequency(intToNote(noteToInt(cur_frequency.toNote())-1))-Tone.Frequency(intToNote(noteToInt(cur_frequency.toNote()))))
   // let high_note = (Tone.Frequency(intToNote(noteToInt(cur_frequency.toNote())+1))-cur_frequency)/(Tone.Frequency(intToNote(noteToInt(cur_frequency.toNote())+1))-Tone.Frequency(intToNote(noteToInt(cur_frequency.toNote()))))
   // setGaugePosition(low_note < high_note ? (low_note.clamp(0,1)/2)*100 : low_note==high_note ? 50 : (1-high_note.clamp(0,1)/2)*100);
   // setTuner(`${cur_frequency.toNote()}`)
   // }, 500);
   // }).catch(e => {
   //    // promise is rejected when the user doesn't have or allow mic access
   //    console.log("mic not open");
   // });
// }

useEffect(()=>{
   if (!isTunerInit&&isTuner) {
      Tone.start();
      let mic = new Tone.UserMedia();
      mic.output = new Tone.Mono();
      // mic.toDestination()
      // console.log(mic)
      let fft = new Tone.FFT({size:16384});
      mic.connect(fft)
      mic.open().then(() => {
      // promise resolves when input is available
      console.log("mic open");
      // print the incoming mic levels in decibels
      if (!isTunerInit) {
         setIsTunerInit(true);
      } else {
         return;
      }
      setInterval(() => {
         // console.log(window.isTuner_c);
      //       let unordered = fft.getValue();
      // //         let unordered = Object.entries(fft.getValue()).map(
      // //    ([prop, propValue]) => { return [propValue, prop]; }
      // // );
      //       const result = Object.entries(unordered).map(
      //    ([prop, propValue]) => { return [propValue, prop]; }
      // );
      // let ordered = Object.fromEntries(result);
      // ordered = Object.keys(unordered).toSorted().toReversed().reduce(
      // (obj, key) => { 
      //    obj[key] = unordered[key]; 
      //    return obj;
      // }, 
      // {}
      // );
      let GT = document.getElementById("GT");
      let mappedKeys = Object.keys(fft.getValue()).map(e=>fft.getFrequencyOfIndex(Number(e)));
      let mapped_t = fft.getValue();
      let mapped = {}
      for (let i = 0; i < mappedKeys.length; i++) {
         mapped[mappedKeys[i]]=mapped_t[i]
      }
      // console.log([1].map(index => fft.getFrequencyOfIndex(index)));
      let t = Object.values(mapped);
      let max = Math.max(...t);
      // console.log(Object.entries(mapped).filter(e=>e[1]==max))
      // setTuner(JSON.stringify(Object.entries(mapped).filter(e=>e[1]==max)))
      let cur_frequency = Tone.Frequency(Number(Object.entries(mapped).filter(e=>e[1]==max)[0][0]));
      if (cur_frequency == 0 || cur_frequency < 0 || max <= tunerThreshold) {
         GT.style.setProperty("--tuner-background","color-mix(in srgb, var(--nav-background) 85%, white)");
         setTuner("play a note to find its pitch")
         setGaugePosition(50);
         return;
      }
      let low_note = (Tone.Frequency(intToNote(noteToInt(cur_frequency.toNote())-1))-cur_frequency)/(Tone.Frequency(intToNote(noteToInt(cur_frequency.toNote())-1))-Tone.Frequency(intToNote(noteToInt(cur_frequency.toNote()))))
      let high_note = (Tone.Frequency(intToNote(noteToInt(cur_frequency.toNote())+1))-cur_frequency)/(Tone.Frequency(intToNote(noteToInt(cur_frequency.toNote())+1))-Tone.Frequency(intToNote(noteToInt(cur_frequency.toNote()))))
      setGaugePosition(low_note < high_note ? (low_note.clamp(0,1)/2)*100 : low_note==high_note ? 50 : (1-high_note.clamp(0,1)/2)*100);
      setTuner(`${cur_frequency.toNote()}`)
      setIsTunerInit(true);
      let tgp = (low_note < high_note ? (low_note.clamp(0,1)/2)*100 : low_note==high_note ? 50 : (1-high_note.clamp(0,1)/2)*100)
      if (Math.round(tgp < 50 ? tgp*2 : 200 - 2*tgp)>90) {
         GT.style.setProperty("--tuner-background","#0fb30f");
      } else {
         GT.style.setProperty("--tuner-background","color-mix(in srgb, var(--nav-background) 85%, white)");
      }
      }, 500);
      }).catch(e => {
         // promise is rejected when the user doesn't have or allow mic access
         console.log("mic not open");
         alert("Couldn't open the mic");
      });
   }
},[isTuner])

function changeA4Value(value) {
   Tone.FrequencyClass.A4 = value;
}

useEffect(()=>{
   if (typeof window != "undefined"&&typeof mic != "undefined") {
      //changePos section
      // {
      //    let handlePositionChange = (effect, amount) => {
      //       if (mic) {
      //          mic.open()
      //          Tone.start()
      //          effects.move(effects.map((e)=>e[0]).indexOf(effect),effects.map((e)=>e[0]).indexOf(effect)+amount > 0 ? effects.map((e)=>e[0]).indexOf(effect)+amount % effects.length : effects.length + (effects.map((e)=>e[0]).indexOf(effect)+amount % effects.length));
      //          console.log(effects)
      //          let mapped = [...effects.filter((e)=>e[1])].map((e)=>e[0])
      //          console.log(mapped)
      //          mic.disconnect().chain(...[...mapped]).toDestination();
      //          guitar.disconnect().chain(...[...mapped]).toDestination();
      //       }
      //     }

      //    let outer = [...document.getElementById("effects").getElementsByClassName("effect")];

      //    for (let i of outer) {
      //       let up = document.createElement("button");
      //       up.textContent = '↑';
      //       up.classList.add(...'center-block p-0 arrow-sign'.split(' '));
      //       up.onClickCapture = handlePositionChange(_start_effects[outer.indexOf(i)][0],-1)
      //       let down = document.createElement("button");
      //       down.textContent = '↓';
      //       down.classList.add(...'center-block p-0 arrow-sign'.split(' '));
      //       down.onClickCapture = handlePositionChange(_start_effects[outer.indexOf(i)][0],1)
      //       i.prepend(up);
      //       i.appendChild(down);
      //    }
      //    //<button className='center-block p-0 arrow-sign' onClickCapture={handlePositionChange(distortion,-1)}>↑</button>
      //    //<button className='center-block p-0 arrow-sign' onClickCapture={handlePositionChange(distortion,1)}>↓</button>
      // }

      renderIRs();
      renderChords();
      // renderTuner();
   }
},[mic])

useEffect(()=> () => {
   if (typeof window != "undefined") {
      window.onkeydown = null;
      window.onkeyup = null;
   }
},[]);

useEffect(()=>{
   let sf_inner = document.getElementById("SF");
   [...sf_inner.children].forEach((el)=>{
      el.onclick = (e) => {e.stopPropagation()};
   });
},[])

function addSF(value) {
   setIsSF(value);
}

function addTuner(value) {
   // Tone.start()
   // mic.open().catch(e=>alert("Couldn't open the mic"))
   setIsTuner(value)
}

function setChordShape(shape) { //shape is an array of fret's indices
   for (let i = 0; i < document.getElementById('strings').getAttribute('stringsamount'); i++) {
      // for (let j = 0; j < document.getElementById('strings').getAttribute('fretsamount'); j++) {
      let stringsOuter = document.getElementById('strings');
      let string = stringsOuter.querySelector(`#string-${i+1}`).parentElement;
      shape[i] ? string.children[string.children.length-1].querySelectorAll('rect')[shape[i]].dispatchEvent(new Event('click')) : string.children[string.children.length-1].querySelectorAll('rect')[0].dispatchEvent(new Event('click'))
      // }
   }
}

function addChord(e) {
   console.log(e)
   console.log(e.target[0].value,e.target[1].value,e.target[2].value)
   if (e.target[0].value && e.target[1].value) {
      console.log(e.target[1].value)
      let parsedValue = e.target[1].value.includes("[") && e.target[1].value.includes("]") ? e.target[1].value.replace("[","").replace("]","").includes(",") ? e.target[1].value.replace("[","").replace("]","").split(",").map(e=>Number(e)) : e.target[1].value.replace("[","").replace("]","").includes(", ") ? e.target[1].value.replace("[","").replace("]","").split(", ").map(e=>Number(e)) : null : e.target[1].value.includes(",") ? e.target[1].value.split(",").map(e=>Number(e)) : e.target[1].value.includes(", ") ? e.target[1].value.split(", ").map(e=>Number(e)) : null;
      console.log(parsedValue)
      parsedValue && localStorage.getItem("chords") && JSON.parse(localStorage.getItem("chords"))[e.target[0].value] ? (confirm(`Replace existing chord with this name? (${e.target[0].value})`) && localStorage.setItem("chords", JSON.stringify({...JSON.parse(localStorage.getItem("chords")), [e.target[0].value]: {key: e.target[2].value, shape: parsedValue}}))) : localStorage.setItem("chords", JSON.stringify({...JSON.parse(localStorage.getItem("chords")), [e.target[0].value]: {key: e.target[2].value.toLowerCase(), shape: parsedValue}}));
   }
   renderChords();
}

function handleIR(e) {
   let f = document.querySelector("input[type='file']#ir")
   console.log(e)
   if(f.files[0].type.indexOf('audio/') !== 0){
      console.warn('not an audio file');
      return;
      }
    const reader = new FileReader();
    reader.onload = function(e){
      var str = this.result;
      // this is a string, so you can store it in localStorage, even if it's really not a good idea
      console.log(str);
      if (!f.value.replace(/.*[\/\\]/, '').includes(".wav")) {
         alert("Wrong format or filename! IRs must be wav files!")
         return;
      }
      console.log(f.value.replace(/.*[\/\\]/, '').replace(".wav",""))
      console.log({...JSON.parse(localStorage.getItem("irs")), [f.value.replace(/.*[\/\\]/, '').replace(".wav","")]: str})
      localStorage.setItem("irs",JSON.stringify({...JSON.parse(localStorage.getItem("irs")), [f.value.replace(/.*[\/\\]/, '').replace(".wav","")]: str}));
      renderIRs();
      // const aud = new Audio(str);
      // aud.play();
      };
    reader.readAsDataURL(f.files[0]);
}

function changeTunerThreshold(value) {
   setTunerThreshold(value);
}

// let testarr = [testvar]

// useState(()=>{
//    console.log(testvar)
//    console.log("testarr:",testarr)
//    if (typeof window != "undefined"&&document.querySelector("#testel")) {
//       let el = document.querySelector("#testel")
//       el.textContent=testarr[0];
//       console.log(testarr)
//       el.onClickCapture = (e) => {e.target.textContent="qwed"}
//    }
// },[testvar])

// function testFunction() {
//    setTestvar("b");
//    console.log(testarr)
//    console.log("change")
// }
// function resetIR(e) {
   
// }
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
      <div className={[styles.description, 'center-block text-center m-2']} style={{lineHeight: '3rem', zIndex:1}}>
        <span>Simple guitar amp based on <h5><a href="https://tonejs.github.io/" target='blank'>tone js</a></h5></span>
        {/* <span onClickCapture={testFunction} id="testel">{ testarr[0] }</span> */}
      </div>
      <div style={{zIndex: 10, padding: "0 0.8rlh" }}>
         <label htmlFor="ir">Load an <a href="https://en.wikipedia.org/wiki/Impulse_response">Impulse Response</a> file (you can grab it from <a href="https://tonehunt.org/all?filter=ir">here</a> or some other place)</label><br/>
         <span>*be sure to reset your ir before playing because when you change or turn on and off any effect, ir is gaining</span><br/>
         <input id="ir" type='file' onChangeCapture={(e)=>{console.log('ir');handleIR(e);}} accept="audio/*" style={{margin: "0.5rlh auto", display: "block"}}/>
         <div style={{margin: "1rem auto"}}>
            {/* <div id="ds-irs" style={{width: "100%", overflow: "auto",background: "#999999", border: "3px solid black", display: "block", }}>
               <div style={{border: "3px solid black"}} onClick={resetIR()}>disconnect all irs</div>
            </div> */}
            <div id="irs" style={{width: "100%", overflow: "auto",background: "#999999", border: "3px solid black", display: "block", }}>

            </div>
         </div>
      </div>
      <EffectToggle style={{zIndex: 1}} label="Strict fretting" id="SF" checked={false} change={addSF} trueBypass={isSF} setTrueBypass={setIsSF}/>
      <div id="GT" style={{ "--tuner-background": "color-mix(in srgb, var(--nav-background) 85%, white)", "-webkit-transition": "background-color 1000ms linear", "-ms-transition": "background-color 1000ms linear", "transition": "background-color 1000ms linear" }}>
            <div id="tuner" style={{ wordBreak: "break-all" }}>
               <span>Guitar tuner</span>
               <div className="row effect">
                  <EffectToggle label="Tuner" id="tunertoggle" checked={false} change={addTuner} trueBypass={isTuner} setTrueBypass={setIsTuner}/>
                  <span>*not affected by other effects, tuner is not 100% accurate at low frequencies (2^14 resolution <a href="https://en.wikipedia.org/wiki/Fast_Fourier_transform" target='_blank'>Fast Fourier Transform</a>)</span>
                  <EffectValue label="A4 Value" id="a4value" defaultValue={440} change={changeA4Value} min={430} max={450} trueBypass={isTuner} setTrueBypass={setIsTuner} strict={[1,1]} step={1}/>
                  {/* <EffectValue label="Tuner Threshold" id="tunerthreshold" defaultValue={-80} change={changeTunerThreshold} min={-120} max={0} trueBypass={isTuner} setTrueBypass={setIsTuner} strict={[1,1]} step={1}/> */}
                  { isTuner && <div className="gauge" style={{ "--gauge-bg": "var(--tuner-background)", "--gauge-value": gaugePosition, "--gauge-display-value": `${Math.round(gaugePosition < 50 ? gaugePosition*2 : 200 - 2*gaugePosition)}`, width: "auto", margin: "0.5rlh auto" }}>
                     <div className="ticks">
                        <div className="tithe" style={{ "--gauge-tithe-tick":1 }}></div>
                        <div className="tithe" style={{ "--gauge-tithe-tick":2 }}></div>
                        <div className="tithe" style={{ "--gauge-tithe-tick":3 }}></div>
                        <div className="tithe" style={{ "--gauge-tithe-tick":4 }}></div>
                        <div className="tithe" style={{ "--gauge-tithe-tick":6 }}></div>
                        <div className="tithe" style={{ "--gauge-tithe-tick":7 }}></div>
                        <div className="tithe" style={{ "--gauge-tithe-tick":8 }}></div>
                        <div className="tithe" style={{ "--gauge-tithe-tick":9 }}></div>
                        <div className="min"></div>
                        <div className="mid"></div>
                        <div className="max"></div>
                     </div>
                     <div className="tick-circle">
                     <span style={{ textAlign: "center", width: "100%", textAlign: "center", position: "absolute", bottom: "0", wordBreak: "keep-all", padding: "0 1rlh" }}>{ isTuner ? <h3>{ tuner }</h3> : "Turn on the tuner to be able to tune your instrument" }</span><br/>
                     </div>
                     <div className="needle">
                        <div className="needle-head"></div>
                     </div>
                     <div className="labels">
                        <div className="value-label"></div>
                     </div>
                     </div> }
               </div>
            </div>
      </div>
      <div id="CS">
         <div style={{display: "block", marginLeft: "auto", marginRight: "auto", textAlign: "center", height: "100%"}} onClickCapture={(e)=>{e.stopPropagation();e.preventDefault();setChordShapesShown(!chordShapesShown);}}>Chord shapes
         </div>
         <div style={{display: chordShapesShown ? "block" : "none", position: "relative", left: "50%", top: "-50%" }}> {/*  style={{display: chordShapesShown ? "block" : "none"}} */}
               <div style={{overflow: "auto", width: "12rem", height: "12rem", background: "#999999", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}} id="DefaultChords">
                  {/* default chords */}
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([0,1,0,2,3])}}>C</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([2,3,2,0])}}>D</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([1,1,2,3,3,1])}}>F</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([2,4,4,4,2,2])}}>B</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([0,0,1,2,2,0])}}>E</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([0,2,2,2,0,0])}}>A</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([3,3,0,0,2,3])}}>G</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([0,0,0,2,2,0])}}>Em</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([0,1,2,2,0,0])}}>Am</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([1,3,2,0])}}>Dm</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([2,3,4,4,2,2])}}>Bm</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([0,1,3,2,3])}}>C7</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([0,1,0,1,0])}}>A7</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([1,0,0,0,2,3])}}>G7</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([0,0,1,0,2,0])}}>E7</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([1,2,1,0])}}>D7</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([2,0,2,1,2])}}>B7</div>
                  <div style={{border: "3px solid black"}} onClickCapture={(e)=>{setChordShape([1,1,2,1,3,1])}}>F7</div>
               </div>
               <div style={{overflow: "auto", width: "12rem", background: "#999999", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}} id="Chords">
                  {/* custom chords */}
                  
               </div>
               <div style={{width: "12rem", overflow: "auto",background: "#999999", position: "relative", border: "3px solid black"}}>
                  <form onSubmit={(e)=>{e.preventDefault();addChord(e);return false}}>
                     <input type="text" placeholder='Enter chord name...'/>
                     <input type="text" placeholder='Enter chord shape...'/>
                     <input type="text" placeholder='Enter key name...'/>
                     <input style={{ display: "block", margin: "0.2rlh auto" }}type="submit" value='Press to add chord'/>
                  </form>
               </div>
            </div>
      </div>
      {/* <EffectToggle label="Volume" id="volume" checked={false} change={addVolume} trueBypass={isVolume} setTrueBypass={setIsVolume}/>
      <EffectValue label="VolumeValue" id="volumevalue" defaultValue={10} change={changeVolumeValue} min={0} max={1000} trueBypass={isVolume} setTrueBypass={setIsVolume}/> */}
      {/* transform: translateY(300px) rotate(315deg) !important; */}
      {/* only add triggers, not whole surface, but you should make strings move */}
      <div id="guitar">
      <svg viewBox='0 0 1000 900' id="guitarsvg" transform='rotate(45)' style={{marginTop: "-15vh", marginBottom: "-15vh", zIndex: "1"}} xmlns="http://www.w3.org/2000/svg"><defs
     id="defs6">
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath18">
      <path
         d="M 2926.17,4440.37 C 2502.27,4269.91 2480.67,3804.97 2171.16,3392.32 1861.65,2979.67 1166.4,3083.71 760.59,2569.36 374.852,2080.39 785.25,1553.44 1202.4,1145.29 1619.46,737.141 2081.43,293.078 2633.13,714.641 c 520.65,397.889 401.4,967.409 673.56,1240.649 280.35,281.34 622.08,271.71 790.92,526.59 118.8,179.37 77.94,305.01 14.49,338.76 -84.06,44.73 -163.98,-8.82 -195.93,-34.11 -76.41,-60.21 -235.71,-174.6 -418.86,-47.52 -90,62.37 -122.49,129.6 -137.52,236.16 l -49.32,611.91 c -140.58,-8.19 -195.12,51.57 -240.48,109.89 -140.85,181.26 -0.27,429.48 68.49,498.24 56.34,56.25 156.06,138.69 134.55,209.34 -13.05,42.93 -73.44,75.15 -161.82,75.15 -53.01,0 -116.1,-11.61 -185.04,-39.33 m 384.3,-853.29 c 1.44,0.09 2.97,0.18 4.41,0.27 l -4.41,-0.27"
         id="path16" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath24">
      <path
         d="m 2180.53,544.258 c -359.76,0.051 -680.43,309.691 -978.13,601.032 -417.15,408.15 -827.548,935.1 -441.81,1424.07 405.81,514.35 1101.06,410.31 1410.57,822.96 309.51,412.65 331.11,877.59 755.01,1048.05 68.94,27.72 132.03,39.33 185.04,39.33 88.38,0 148.77,-32.22 161.82,-75.15 21.51,-70.65 -78.21,-153.09 -134.55,-209.34 -68.76,-68.76 -209.34,-316.98 -68.49,-498.24 42.54,-54.69 93.13,-110.65 215.21,-110.65 8.1,0 16.53,0.25 25.27,0.76 v 0 0 l 49.32,-611.91 c 15.03,-106.56 47.52,-173.79 137.52,-236.16 60.39,-41.9 118.16,-57.55 171.25,-57.55 107.92,0.01 196.39,64.71 247.61,105.07 23.1,18.29 71.28,51.35 127.98,51.35 21.71,0 44.67,-4.85 67.95,-17.24 63.45,-33.75 104.31,-159.39 -14.49,-338.76 C 3928.77,2227 3587.04,2236.63 3306.69,1955.29 3034.53,1682.05 3153.78,1112.53 2633.13,714.641 2475.24,593.988 2324.78,544.25 2180.53,544.258 m 172.11,64.722 h 1.86 c 8.09,0.161 17.78,2.27 28.97,7.02 686.25,247.859 669.06,1074.24 871.65,1312.38 268.56,315.72 763.2,317.25 883.35,662.22 3.66,11.62 5.31,20.73 5.49,27.54 v 2.4 c -0.26,9.39 -3.7,13.69 -8.5,13.69 -8.75,0 -22.05,-14.3 -28.94,-38.14 -151.74,-354.96 -664.74,-360.63 -876.15,-648.54 -231.66,-315.63 -204.21,-1025.101 -870.3,-1279.261 -45.48,-16.379 -44.03,-58.641 -7.43,-59.309 m -172.49,172.739 c 23.56,-38.43 50.03,-60.789 76.5,-60.789 1.42,0 2.83,0.058 4.24,0.191 27.95,2.539 51.52,30 68.66,74.481 27.74,48.187 41.78,123.539 34.3,206.498 -1.1,12.09 -2.62,23.93 -4.52,35.49 -0.66,16.58 -1.75,33.49 -3.31,50.64 -17.46,192.51 -86.4,344.34 -155.34,344.34 -1.44,0 -2.88,-0.09 -4.23,-0.27 -70.38,-6.39 -112.95,-170.73 -95.22,-367.11 1.56,-17.22 3.54,-34.11 5.89,-50.6 0.21,-11.64 0.85,-23.512 1.94,-35.531 7.5,-83.161 35,-154.938 71.09,-197.34 m 805.36,2767.561 c -92.41,0 -150.53,-243.13 -406.2,-459.72 -219.78,-186.12 -523.62,-179.46 -791.91,-480.96 -284.49,-319.59 120.78,-535.5 383.76,-790.56 148.05,-143.55 338.94,-232.2 319.05,-719.19 -4.46,-108.998 59.08,-185.319 130.72,-185.319 0.59,0 1.17,0 1.76,0.008 89.73,1.531 151.47,77.492 239.22,238.411 148.05,271.44 247.68,750.6 459,923.22 245.16,200.34 707.13,220.5 776.7,579.33 15.3,79.08 -2.09,104.92 -32.31,104.92 -51.17,0 -139.13,-74.12 -167.31,-89.17 -22.71,-12.13 -122.17,-84.99 -242.3,-84.99 -116.92,0 -253.41,69 -357.82,330.15 l -199.71,475.47 c -9,35.82 -20.7,157.59 -112.14,158.4 -0.17,0 -0.34,0 -0.51,0 M 1199.4,2792.2 h 2.54 c 8.35,0.27 19,3.11 31.87,9.54 372.24,187.83 798.57,238.05 1022.58,536.76 309.51,412.65 327.42,832.05 760.23,1042.83 26.64,16.16 36.71,26.91 37.08,33.41 v 0.69 c -0.26,4.85 -6.31,7.13 -14.89,7.39 h -3.57 c -8.8,-0.25 -19.5,-2.28 -29.24,-5.58 -423.9,-170.55 -476.01,-640.71 -785.52,-1053.27 -224.28,-299.16 -631.53,-336.42 -1006.92,-517.14 -40.64,-17.08 -44.02,-53.65 -14.16,-54.63 m 2111.07,794.88 v 0 c 0.72,0.05 1.46,0.09 2.2,0.14 l -2.2,-0.14 m 2.2,0.14 2.21,0.13 c -0.72,-0.04 -1.46,-0.09 -2.21,-0.13"
         id="path22" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1523.39,951.709,781.708,-1251.28,2408.08,2308.57)"
       spreadMethod="pad"
       id="radialGradient30">
      <stop
         style={{stopOpacity:"1",stopColor:"#805f20",}}
         offset="0"
         id="stop26" />
      <stop
         style={{stopOpacity:"1",stopColor:"#1e1e1b",}}
         offset="1"
         id="stop28" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath46">
      <path
         d="m 6766.29,6666.52 c -94.23,-51.57 -1044.27,-560.61 -1077.21,-584.55 1.26,-24.39 19.17,-146.7 -20.07,-224.73 l 246.6,-247.68 c 38.52,39.15 62.1,64.89 72.45,74.7 86.4,82.35 167.94,68.31 240.75,54.18 35.64,-6.84 69.21,-13.68 100.17,-9.27 56.07,73.98 320.67,491.13 345.33,529.2 11.79,18.18 45.81,11.16 90.18,4.14 48.87,-7.65 110.16,-15.39 167.76,10.44 87.75,39.42 160.29,141.3 112.14,263.52 -35.46,89.82 -123.48,148.14 -205.02,148.14 -25.65,0 -50.58,-5.76 -73.08,-18.09"
         id="path44" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath52">
      <path
         d="m 5915.61,5609.56 -246.6,247.68 c 39.24,78.03 21.33,200.34 20.07,224.73 32.94,23.94 982.98,532.98 1077.21,584.55 22.5,12.33 47.43,18.09 73.08,18.09 81.54,0 169.56,-58.32 205.02,-148.14 48.15,-122.22 -24.39,-224.1 -112.14,-263.52 -29.99,-13.45 -60.97,-17.79 -90.69,-17.79 -27.36,0 -53.64,3.68 -77.07,7.35 -23.42,3.7 -43.95,7.41 -59.86,7.41 -14.23,0 -24.75,-2.97 -30.32,-11.55 -24.66,-38.07 -289.26,-455.22 -345.33,-529.2 -6.82,-0.97 -13.77,-1.4 -20.83,-1.4 -25.02,0 -51.55,5.34 -79.34,10.67 -27.82,5.4 -56.92,10.79 -87.08,10.79 -48.75,0 -100.29,-14.09 -153.67,-64.97 -10.35,-9.81 -33.93,-35.55 -72.45,-74.7 m 357.3,215.1 c 1.53,-8.55 3.24,-17.1 5.49,-25.38 0.19,-0.74 0.75,-1.05 1.48,-1.05 2.37,0 6.54,3.2 5.99,5.19 -2.07,7.92 -3.6,16.02 -4.95,24.12 2.7,1.08 5.04,1.98 6.57,2.61 24.57,10.44 62.28,36.18 63.18,66.06 0.38,12.99 -5.11,18.79 -13,20.57 0.01,0 0.03,0 0.04,0 1.89,0 4.68,1.47 4.68,3.37 0,1.08 0.18,6.93 0.27,8.1 2.87,-5.07 6.14,-6.97 9.5,-6.97 2.01,0 4.05,0.67 6.07,1.75 4.23,2.25 6.39,6.93 6.12,10.71 1.15,-0.85 6.64,-1.1 8.95,-1.1 0.39,0 0.69,0.01 0.86,0.02 2.52,0.27 3.06,0.99 -0.27,1.89 -14.67,4.23 -17.73,18.27 -19.71,24.84 -0.23,0.72 -0.6,1.01 -1.04,1.01 -1.32,0 -3.19,-2.61 -3.19,-4.16 0,-3.33 12.42,-20.52 7.29,-28.08 -1.18,-1.78 -2.46,-2.56 -3.76,-2.56 -4.72,0 -9.61,10.41 -10.46,20.65 -0.03,0.45 -0.34,0.64 -0.81,0.64 -1.99,0 -6.92,-3.44 -6.48,-5.41 1.62,-7.2 0.36,-16.02 0.27,-23.4 0,-0.55 0.26,-0.9 0.68,-1.1 -1.63,0.29 -3.34,0.42 -5.13,0.42 -9.97,0 -21.93,-4.15 -30.92,-7.96 -10.98,-4.59 -21.51,-10.17 -31.95,-15.93 -1.53,8.82 -2.43,17.55 -1.35,25.02 0.22,1.24 -0.41,1.63 -1.26,1.63 -0.87,0 -1.97,-0.41 -2.61,-0.73 -15.18,-7.37 -47.26,-27.24 -48.24,-46.85 v -1.74 c 0.02,-0.39 0.04,-0.79 0.09,-1.18 0.27,-2.3 2.05,-3.25 4.79,-3.25 9.95,0 32.69,12.51 43.27,19 0.54,-2.43 0.9,-4.95 1.35,-7.38 0.27,-1.62 0.54,-3.33 0.72,-4.95 -12.96,-9.63 -29.16,-24.39 -34.02,-36.63 -5.29,-13.55 1.6,-17.74 12.09,-17.74 8.96,0 20.53,3.05 29.4,5.95 m 140.43,259.31 c -0.74,0 -2.94,-2.13 -3.72,-3.62 -28.35,-55.62 -83.16,-117.54 -135.63,-151.47 -3.16,-2.13 -2.85,-4.3 -0.8,-4.3 0.81,0 1.89,0.33 3.14,1.15 54.54,35.37 107.19,98.55 136.62,156.24 0.76,1.45 0.76,2 0.39,2 m -25.59,-86.06 c 13.23,-23.76 29.61,-47.25 46.26,-68.49 0.61,-0.77 1.52,-1.12 2.21,-1.12 0.84,0 1.36,0.5 0.67,1.39 -17.82,22.86 -31.23,53.1 -45,78.57 -0.16,0.32 -0.44,0.46 -0.8,0.46 -1.88,0 -5.93,-3.71 -6.31,-4.69 -0.45,-1.35 -2.16,-6.66 -2.88,-7.56 -1.42,-1.52 -1.33,-2.07 -0.55,-2.07 1.33,0 4.66,1.62 5.68,2.7 l 0.72,0.81 m -23.86,-25.64 c -2.75,0 -7.87,-5.59 -6.2,-5.77 8.46,-0.99 12.6,-14.76 15.21,-21.51 0.17,-0.46 0.56,-0.64 1.07,-0.64 1.9,0 5.49,2.62 5.77,3.61 0.99,3.78 -3.33,8.55 -4.5,12.06 -1.89,5.67 -6.75,18.09 -1.44,20.25 0.54,-0.63 5.94,1.8 8.46,-7.83 1.62,-6.48 6.39,-8.37 11.43,-8.64 0.14,-0.01 0.27,-0.01 0.39,-0.01 2.16,0 2.37,1.42 0.24,2.44 -6.84,3.23 -9.54,21.15 -17.58,21.15 -1.59,0 -3.38,-0.69 -5.46,-2.34 -4.5,-3.6 -5.4,-8.37 -4.95,-13.5 l -2.25,0.72 c -0.06,0.01 -0.12,0.01 -0.19,0.01 m 35.56,45.44 c 0.72,-3.15 1.44,-6.21 2.61,-9.18 2.23,-5.93 7.49,-8.5 13.87,-8.5 1.08,0 2.19,0.08 3.32,0.22 2.99,0.32 4.82,2.61 1.37,2.61 -0.39,0 -0.84,-0.03 -1.37,-0.09 -0.36,-0.04 -0.71,-0.06 -1.04,-0.06 -7.91,-0.01 -9.46,11.85 -10.93,18.24 -0.5,2.27 -1.56,5.63 -4.33,5.63 -0.2,0 -0.4,-0.01 -0.62,-0.05 -5.13,-0.9 -6.03,-4.5 -9.18,-7.92 -2.53,-2.76 -1.06,-4.49 1.13,-4.49 1.24,0 2.71,0.55 3.82,1.79 l 1.35,1.8 m 27.14,36.14 c -0.57,0 -1.33,-0.21 -2.3,-0.68 -12.42,-5.85 -22.23,-27.45 -6.66,-35.55 1.12,-0.57 2.26,-0.83 3.4,-0.83 4.93,0 9.84,4.69 12.62,8.12 5.67,6.66 7.83,16.29 14.04,22.41 2.31,2.22 2.33,3.22 1.38,3.22 -0.83,0 -2.39,-0.76 -3.81,-2.14 -7.2,-7.02 -10.35,-16.2 -18.72,-21.78 -0.94,-0.63 -1.83,-0.9 -2.66,-0.9 -4.05,0 -6.73,6.37 -6.88,8.91 -0.27,4.59 3.69,11.7 7.92,13.68 3.09,1.47 4.26,5.54 1.67,5.54 m 7.78,50.98 c 7.92,-8.73 22.68,-25.11 30.87,-33.39 0.71,-0.74 1.53,-1.04 2.32,-1.04 2.38,0 4.46,2.81 2.36,4.91 -13.14,13.41 -26.55,27 -38.34,41.58 -0.6,0.74 -1.4,1.05 -2.25,1.05 -2.88,0 -6.39,-3.56 -4.86,-6.27 2.88,-5.31 4.23,-11.79 6.39,-17.46 0.15,-0.39 0.3,-0.56 0.44,-0.56 1.01,0 1.73,8.81 3.07,11.18 m 21.67,35.17 c -4.68,0 -8.84,-2.64 -11.32,-6.82 -2.07,-0.54 -5.76,-2.79 -6.03,-4.68 -2.07,-13.86 11.79,-28.53 21.96,-35.82 3.49,-2.52 8.51,-4.19 13.06,-4.19 5.53,0 10.34,2.49 10.79,8.96 0.9,12.33 -8.55,29.16 -17.64,37.71 -3.57,3.38 -7.34,4.84 -10.82,4.84 m -44.12,-33.03 c -2.6,0 -6.45,-6.29 -4.55,-7.36 1.26,-0.63 7.11,-3.6 6.39,-5.4 -0.66,-1.91 -0.34,-2.62 0.41,-2.62 1.39,0 4.25,2.51 4.9,4.33 1.98,5.58 -1.89,8.37 -6.48,10.89 -0.21,0.11 -0.44,0.16 -0.67,0.16 m -159.5,-280.69 c -9.38,0 -14.18,4.4 -7.23,17.55 4.77,9.09 12.87,16.83 21.06,23.49 1.89,-12.42 3.6,-24.93 5.76,-37.44 -7.14,-2.12 -14.14,-3.6 -19.59,-3.6 m 27.69,6.3 c -1.35,8.64 -2.52,17.37 -3.96,25.92 -0.72,4.32 -1.8,9.18 -2.97,14.13 l 0.45,0.36 c 2.07,1.35 4.23,2.7 6.3,3.96 2.85,2.15 5.17,3.23 6.97,3.23 3.31,0 4.81,-3.65 4.46,-10.88 -2.07,-2.79 -5.31,-5.67 -8.1,-7.92 -2.86,-2.35 -2.49,-4.75 -0.6,-4.75 0.79,0 1.84,0.42 3.03,1.42 4.93,4.04 24.74,28.92 10.66,28.92 -1.59,0 -3.62,-0.31 -6.16,-1.02 -5.85,-1.62 -12.06,-4.59 -18.18,-8.46 -0.9,3.78 -1.71,7.74 -2.52,11.61 l 0.9,0.54 c 15.66,8.46 31.95,17.73 49.5,21.24 1.23,0.25 2.39,0.37 3.47,0.37 12.29,0 15.17,-15.07 13.27,-25.57 -2.88,-16.65 -18,-33.66 -31.86,-42.3 -3.87,-2.34 -13.77,-6.93 -24.66,-10.8 m -47.45,42.95 c -7.17,0 -1.45,13.16 5.33,20.23 6.12,6.3 13.59,11.61 20.97,16.29 l 0.9,0.63 c 0.18,-7.47 1.35,-15.03 2.79,-22.5 -1.71,-0.9 -3.33,-1.8 -4.95,-2.7 -5.94,-3.24 -11.79,-6.39 -17.73,-9.54 -3.24,-1.69 -5.63,-2.41 -7.31,-2.41 m 241.04,218.15 c -7.17,0 -16.58,8.39 -20.52,13.04 -3.42,3.96 -6.84,10.17 -8.19,16.83 1.44,1.08 4.95,1.89 4.86,2.88 -0.62,5.92 1.28,8.12 4.19,8.12 5.1,0 13.3,-6.75 16.51,-12.08 1.35,-2.16 13.95,-25.02 6.03,-28.26 -0.9,-0.37 -1.87,-0.53 -2.88,-0.53"
         id="path50" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1046.9,703.697,346.962,-516.182,6364.38,6147.22)"
       spreadMethod="pad"
       id="radialGradient58">
      <stop
         style={{stopOpacity:"1",stopColor:"#c19357",}}
         offset="0"
         id="stop54" />
      <stop
         style={{stopOpacity:"1",stopColor:"#967447",}}
         offset="1"
         id="stop56" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath70">
      <path
         d="m 5791.86,6313.18 c -36.54,-19.17 -55.08,-56.07 -41.22,-82.44 11.88,-22.68 43.92,-30.06 75.96,-19.35 8.82,-13.05 15.84,-27 20.61,-42.21 l 35.28,21.51 c -10.8,10.44 -19.62,22.5 -27.09,35.73 27.36,20.25 39.69,51.03 27.72,73.8 -8.28,15.84 -26.37,24.3 -47.43,24.3 -13.95,0 -29.25,-3.69 -43.83,-11.34"
         id="path68" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath76">
      <path
         d="m 5736.81,6169.29 h 158.328 v 155.27 H 5736.81 Z"
         id="path74" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(141.689,0,0,-141.689,5746.04,6246.92)"
       spreadMethod="pad"
       id="linearGradient82">
      <stop
         style={{stopOpacity:"1",stopColor:"#ede3cd",}}
         offset="0"
         id="stop78" />
      <stop
         style={{stopOpacity:"1",stopColor:"#a19c9f",}}
         offset="1"
         id="stop80" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath92">
      <path
         d="m 5961.42,6405.97 c -36.63,-19.17 -55.08,-56.07 -41.31,-82.35 11.97,-22.77 44.01,-30.06 76.05,-19.35 8.73,-13.05 15.75,-27.09 20.61,-42.21 l 35.28,21.42 c -10.8,10.53 -19.71,22.59 -27.09,35.73 27.36,20.34 39.69,51.03 27.72,73.89 -8.28,15.84 -26.37,24.21 -47.52,24.21 -13.95,0 -29.16,-3.69 -43.74,-11.34"
         id="path90" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath98">
      <path
         d="m 5906.36,6262.09 h 158.313 v 155.27 H 5906.36 Z"
         id="path96" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(141.68,0,0,-141.68,5915.59,6339.72)"
       spreadMethod="pad"
       id="linearGradient104">
      <stop
         style={{stopOpacity:"1",stopColor:"#ede3cd",}}
         offset="0"
         id="stop100" />
      <stop
         style={{stopOpacity:"1",stopColor:"#a19c9f",}}
         offset="1"
         id="stop102" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath114">
      <path
         d="m 6130.98,6498.85 c -36.63,-19.17 -55.08,-56.07 -41.31,-82.44 11.97,-22.68 44.01,-29.97 76.05,-19.26 8.73,-13.14 15.75,-27.09 20.52,-42.21 l 35.37,21.42 c -10.8,10.53 -19.71,22.5 -27.09,35.73 27.36,20.25 39.69,51.03 27.72,73.8 -8.28,15.84 -26.46,24.3 -47.52,24.3 -13.95,0 -29.16,-3.69 -43.74,-11.34"
         id="path112" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath120">
      <path
         d="m 6075.88,6354.91 h 158.313 v 155.262 H 6075.88 Z"
         id="path118" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(141.689,0,0,-141.689,6085.11,6432.54)"
       spreadMethod="pad"
       id="linearGradient126">
      <stop
         style={{stopOpacity:"1",stopColor:"#ede3cd",}}
         offset="0"
         id="stop122" />
      <stop
         style={{stopOpacity:"1",stopColor:"#a19c9f",}}
         offset="1"
         id="stop124" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath136">
      <path
         d="m 6300.54,6591.73 c -36.63,-19.26 -55.17,-56.16 -41.31,-82.44 11.88,-22.77 43.92,-30.06 76.05,-19.35 8.73,-13.05 15.75,-27.09 20.52,-42.21 l 35.37,21.42 c -10.8,10.53 -19.71,22.59 -27.09,35.82 27.27,20.25 39.69,50.94 27.72,73.8 -8.37,15.84 -26.46,24.21 -47.52,24.21 -13.95,0 -29.16,-3.6 -43.74,-11.25"
         id="path134" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath142">
      <path
         d="m 6245.4,6447.8 h 158.332 v 155.27 H 6245.4 Z"
         id="path140" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(141.689,0,0,-141.689,6254.64,6525.44)"
       spreadMethod="pad"
       id="linearGradient148">
      <stop
         style={{stopOpacity:"1",stopColor:"#ede3cd",}}
         offset="0"
         id="stop144" />
      <stop
         style={{stopOpacity:"1",stopColor:"#a19c9f",}}
         offset="1"
         id="stop146" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath158">
      <path
         d="m 6470.01,6684.52 c -36.54,-19.17 -55.08,-56.07 -41.22,-82.35 11.88,-22.77 44.01,-30.06 76.05,-19.35 8.73,-13.14 15.75,-27.09 20.52,-42.21 l 35.28,21.42 c -10.8,10.53 -19.62,22.59 -27.09,35.73 27.36,20.34 39.69,51.03 27.72,73.89 -8.28,15.84 -26.37,24.21 -47.43,24.21 -13.95,0 -29.25,-3.69 -43.83,-11.34"
         id="path156" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath164">
      <path
         d="m 6414.93,6540.62 h 158.332 v 155.27 H 6414.93 Z"
         id="path162" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(141.689,0,0,-141.689,6424.17,6618.25)"
       spreadMethod="pad"
       id="linearGradient170">
      <stop
         style={{stopOpacity:"1",stopColor:"#ede3cd",}}
         offset="0"
         id="stop166" />
      <stop
         style={{stopOpacity:"1",stopColor:"#a19c9f",}}
         offset="1"
         id="stop168" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath180">
      <path
         d="m 6639.57,6777.4 c -36.54,-19.17 -55.08,-56.07 -41.22,-82.44 11.88,-22.68 43.92,-30.06 75.96,-19.35 8.73,-13.05 15.75,-27 20.61,-42.21 l 35.28,21.51 c -10.8,10.44 -19.62,22.5 -27.09,35.73 27.36,20.25 39.69,51.03 27.72,73.8 -8.28,15.84 -26.37,24.3 -47.52,24.3 -13.95,0 -29.16,-3.69 -43.74,-11.34"
         id="path178" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath186">
      <path
         d="m 6584.46,6633.5 h 158.328 v 155.27 H 6584.46 Z"
         id="path184" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(141.689,0,0,-141.689,6593.7,6711.14)"
       spreadMethod="pad"
       id="linearGradient192">
      <stop
         style={{stopOpacity:"1",stopColor:"#ede3cd",}}
         offset="0"
         id="stop188" />
      <stop
         style={{stopOpacity:"1",stopColor:"#a19c9f",}}
         offset="1"
         id="stop190" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath330">
      <path
         d="m 5823.63,6079 c 0,-29.7 24.12,-53.82 53.82,-53.82 29.79,0 53.82,24.12 53.82,53.82 0,29.7 -24.03,53.82 -53.82,53.82 -29.7,0 -53.82,-24.12 -53.82,-53.82"
         id="path328" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath336">
      <path
         d="m 5823.68,6025.18 h 107.652 v 107.652 H 5823.68 Z"
         id="path334" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(107.646,0,0,-107.646,5823.68,6079)"
       spreadMethod="pad"
       id="linearGradient342">
      <stop
         style={{stopOpacity:"1",stopColor:"#ded9d4",}}
         offset="0"
         id="stop338" />
      <stop
         style={{stopOpacity:"1",stopColor:"#805f20",}}
         offset="1"
         id="stop340" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath352">
      <path
         d="m 5997.69,6170.53 c 0,-29.79 24.03,-53.91 53.82,-53.91 29.7,0 53.82,24.12 53.82,53.91 0,29.7 -24.12,53.82 -53.82,53.82 -29.79,0 -53.82,-24.12 -53.82,-53.82"
         id="path350" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath358">
      <path
         d="m 5997.66,6116.66 h 107.648 v 107.652 H 5997.66 Z"
         id="path356" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(107.646,0,0,-107.646,5997.67,6170.48)"
       spreadMethod="pad"
       id="linearGradient364">
      <stop
         style={{stopOpacity:"1",stopColor:"#ded9d4",}}
         offset="0"
         id="stop360" />
      <stop
         style={{stopOpacity:"1",stopColor:"#805f20",}}
         offset="1"
         id="stop362" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath374">
      <path
         d="m 6171.75,6261.97 c 0,-29.7 24.03,-53.82 53.73,-53.82 29.79,0 53.91,24.12 53.91,53.82 0,29.7 -24.12,53.82 -53.91,53.82 -29.7,0 -53.73,-24.12 -53.73,-53.82"
         id="path372" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath380">
      <path
         d="m 6171.75,6208.2 h 107.629 v 107.641 H 6171.75 Z"
         id="path378" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(107.627,0,0,-107.627,6171.75,6262.02)"
       spreadMethod="pad"
       id="linearGradient386">
      <stop
         style={{stopOpacity:"1",stopColor:"#ded9d4",}}
         offset="0"
         id="stop382" />
      <stop
         style={{stopOpacity:"1",stopColor:"#805f20",}}
         offset="1"
         id="stop384" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath396">
      <path
         d="m 6345.72,6353.5 c 0,-29.7 24.12,-53.82 53.82,-53.82 29.7,0 53.82,24.12 53.82,53.82 0,29.7 -24.12,53.82 -53.82,53.82 -29.7,0 -53.82,-24.12 -53.82,-53.82"
         id="path394" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath402">
      <path
         d="m 6345.7,6299.72 h 107.66 v 107.652 H 6345.7 Z"
         id="path400" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(107.656,0,0,-107.656,6345.7,6353.54)"
       spreadMethod="pad"
       id="linearGradient408">
      <stop
         style={{stopOpacity:"1",stopColor:"#ded9d4",}}
         offset="0"
         id="stop404" />
      <stop
         style={{stopOpacity:"1",stopColor:"#805f20",}}
         offset="1"
         id="stop406" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath418">
      <path
         d="m 6519.78,6444.94 c 0,-29.7 24.03,-53.82 53.82,-53.82 29.7,0 53.82,24.12 53.82,53.82 0,29.79 -24.12,53.82 -53.82,53.82 -29.79,0 -53.82,-24.03 -53.82,-53.82"
         id="path416" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath424">
      <path
         d="m 6519.77,6391.21 h 107.652 v 107.637 H 6519.77 Z"
         id="path422" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(107.656,0,0,-107.656,6519.77,6445.03)"
       spreadMethod="pad"
       id="linearGradient430">
      <stop
         style={{stopOpacity:"1",stopColor:"#ded9d4",}}
         offset="0"
         id="stop426" />
      <stop
         style={{stopOpacity:"1",stopColor:"#805f20",}}
         offset="1"
         id="stop428" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath440">
      <path
         d="m 6693.75,6536.47 c 0,-29.7 24.12,-53.82 53.82,-53.82 29.79,0 53.82,24.12 53.82,53.82 0,29.7 -24.03,53.82 -53.82,53.82 -29.7,0 -53.82,-24.12 -53.82,-53.82"
         id="path438" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath446">
      <path
         d="m 6693.77,6482.66 h 107.641 v 107.641 H 6693.77 Z"
         id="path444" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(107.637,0,0,-107.637,6693.77,6536.49)"
       spreadMethod="pad"
       id="linearGradient452">
      <stop
         style={{stopOpacity:"1",stopColor:"#ded9d4",}}
         offset="0"
         id="stop448" />
      <stop
         style={{stopOpacity:"1",stopColor:"#805f20",}}
         offset="1"
         id="stop450" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath504">
      <path
         d="m 1152.99,1155.1 c -15.66,11.16 -30.78,15.03 -38.25,8.28 -10.35,-9.45 -1.62,-35.91 19.53,-59.13 21.15,-23.22 46.62,-34.38 57.06,-24.93 7.83,7.2 4.68,24.12 -6.48,42.03 h 36.63 l -68.49,63.18 v -29.43"
         id="path502" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath510">
      <path
         d="m 1104.39,1069.89 h 117.039 v 114.621 H 1104.39 Z"
         id="path508" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(54.8961,0,0,-54.8961,1165.9,1130.24)"
       spreadMethod="pad"
       id="radialGradient516">
      <stop
         style={{stopOpacity:"1",stopColor:"#805f20",}}
         offset="0"
         id="stop512" />
      <stop
         style={{stopOpacity:"1",stopColor:"#1e1e1b",}}
         offset="1"
         id="stop514" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath526">
      <path
         d="m 3298.86,4464.31 c -9,-1.62 -13.68,-15.21 -12.69,-33.03 l -27.63,6.03 c 14.13,-12.96 25.38,-41.76 22.86,-66.51 l 14.76,22.14 c 7.29,-15.03 17.19,-24.48 25.65,-22.95 11.88,2.25 16.29,25.11 9.99,51.12 -6.03,24.75 -19.62,43.38 -31.05,43.38 l -1.89,-0.18"
         id="path524" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath532">
      <path
         d="m 3256.15,4466.49 81.98,-1.97 2.42,-98.01 -81.99,1.96 z"
         id="path530" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(43.369,-1.03928,1.03928,-42.1898,3296.64,4417.53)"
       spreadMethod="pad"
       id="radialGradient538">
      <stop
         style={{stopOpacity:"1",stopColor:"#805f20",}}
         offset="0"
         id="stop534" />
      <stop
         style={{stopOpacity:"1",stopColor:"#1e1e1b",}}
         offset="1"
         id="stop536" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath548">
      <path
         d="M 3016.62,4381.33 C 2583.81,4170.55 2565.9,3751.15 2256.39,3338.5 2032.38,3039.79 1606.05,2989.57 1233.81,2801.74 c -63.09,-31.5 -72.72,23.04 -20.25,45.09 375.39,180.72 782.64,217.98 1006.92,517.14 309.51,412.56 361.62,882.72 785.52,1053.27 34.74,11.79 81.81,7.29 10.62,-35.91"
         id="path546" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath554">
      <path
         d="m 1201.94,2792.2 h -2.54 c -29.86,0.98 -26.48,37.55 14.16,54.63 375.39,180.72 782.64,217.98 1006.92,517.14 309.51,412.56 361.62,882.72 785.52,1053.27 9.74,3.3 20.44,5.33 29.24,5.58 h 3.57 c 8.58,-0.26 14.63,-2.54 14.89,-7.39 v -0.69 c -0.37,-6.5 -10.44,-17.25 -37.08,-33.41 -432.81,-210.78 -450.72,-630.18 -760.23,-1042.83 -224.01,-298.71 -650.34,-348.93 -1022.58,-536.76 -12.87,-6.43 -23.52,-9.27 -31.87,-9.54"
         id="path552" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath602">
      <path
         d="M 4138.47,2590.6 C 4018.32,2245.63 3523.68,2244.1 3255.12,1928.38 3052.53,1690.24 3069.72,863.859 2383.47,616 c -64.26,-27.27 -79.38,32.129 -23.4,52.289 666.09,254.16 638.64,963.631 870.3,1279.261 211.41,287.91 724.41,293.58 876.15,648.54 13.5,46.71 51.57,56.79 31.95,-5.49"
         id="path600" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath608">
      <path
         d="m 2354.5,608.98 h -1.86 c -36.6,0.668 -38.05,42.93 7.43,59.309 666.09,254.16 638.64,963.631 870.3,1279.261 211.41,287.91 724.41,293.58 876.15,648.54 6.89,23.84 20.19,38.14 28.94,38.14 4.8,0 8.24,-4.3 8.5,-13.69 v -2.4 c -0.18,-6.81 -1.83,-15.92 -5.49,-27.54 C 4018.32,2245.63 3523.68,2244.1 3255.12,1928.38 3052.53,1690.24 3069.72,863.859 2383.47,616 c -11.19,-4.75 -20.88,-6.859 -28.97,-7.02"
         id="path606" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath620">
      <path
         d="m 2196.45,1432.3 c -70.38,-6.39 -112.95,-170.73 -95.22,-367.11 17.82,-196.381 89.28,-350.46 159.66,-344.069 70.38,6.391 112.95,170.731 95.13,367.109 -17.46,192.51 -86.4,344.34 -155.34,344.34 -1.44,0 -2.88,-0.09 -4.23,-0.27"
         id="path618" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath626">
      <path
         d="m 2256.65,720.93 c -26.47,0 -52.94,22.359 -76.5,60.789 21.95,-25.789 47.08,-40.707 72.83,-40.707 2,0 4.01,0.09 6.02,0.269 27.98,2.539 52.24,22.52 70.55,54.321 -17.14,-44.481 -40.71,-71.942 -68.66,-74.481 -1.41,-0.133 -2.82,-0.191 -4.24,-0.191 m -149.53,293.66 c -2.35,16.49 -4.33,33.38 -5.89,50.6 -17.73,196.38 24.84,360.72 95.22,367.11 1.35,0.18 2.79,0.27 4.23,0.27 68.94,0 137.88,-151.83 155.34,-344.34 1.56,-17.15 2.65,-34.06 3.31,-50.64 -5.76,34.93 -15.06,67.16 -26.92,95.14 -2.82,31.2 -6.61,60.82 -10.05,86.27 -1.78,13.78 -5.54,20.87 -8.73,21.33 h -0.66 c -3.25,-0.49 -5.67,-8.32 -4.29,-23.4 1.66,-15.88 2.91,-30.87 3.81,-45.04 -25.91,42.44 -58.73,68.26 -92.64,68.26 -1.98,0 -3.96,-0.09 -6.03,-0.27 -31.95,-2.9 -59.09,-28.61 -78.01,-68.72 -0.76,10.5 -1.4,21.46 -1.91,32.9 -0.88,14.85 -4.27,22.23 -7.46,22.5 h -0.35 c -2.95,-0.24 -5.64,-6.65 -5.87,-18.94 v -3.56 0 c 0.29,-20.8 0.76,-44.34 1.89,-69.17 -10.35,-34.72 -15.79,-75.91 -14.99,-120.3"
         id="path624" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(37.0337,-260.248,-260.248,-37.0337,2190.2,1346.45)"
       spreadMethod="pad"
       id="linearGradient632">
      <stop
         style={{stopOpacity:"1",stopColor:"#4a5150",}}
         offset="0"
         id="stop628" />
      <stop
         style={{stopOpacity:"1",stopColor:"#1e1e1b",}}
         offset="1"
         id="stop630" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath642">
      <path
         d="m 2213.82,1239.88 c -70.29,-6.39 -117.27,-123.12 -104.76,-260.821 12.42,-137.7 79.65,-244.168 149.94,-237.778 70.38,6.387 117.27,123.117 104.85,260.819 -12.15,133.83 -75.87,238.05 -144,238.05 -1.98,0 -3.96,-0.09 -6.03,-0.27"
         id="path640" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath648">
      <path
         d="m 2252.98,741.012 c -25.75,0 -50.88,14.918 -72.83,40.707 -36.09,42.402 -63.59,114.179 -71.09,197.34 -1.09,12.019 -1.73,23.891 -1.94,35.531 -0.8,44.39 4.64,85.58 14.99,120.3 4.83,-105.88 21.66,-235.128 87.57,-274.722 1.15,-0.449 2.3,-0.707 3.44,-0.809 h 1.94 c 17.01,1.379 31.39,38.993 9.47,60.661 -23,22.66 -75.18,65.402 -88.72,251.14 18.92,40.11 46.06,65.82 78.01,68.72 2.07,0.18 4.05,0.27 6.03,0.27 33.91,0 66.73,-25.82 92.64,-68.26 11.1,-175.769 -33.25,-224.21 -52.41,-249.531 -18.2,-23.871 -0.12,-57.398 16.68,-58.5 h 1.68 c 1.82,0.121 3.6,0.641 5.31,1.621 40.43,32.938 52.64,102.469 53.01,176.53 v 7.45 c -0.15,27.83 -1.89,56.15 -4.35,83.27 11.86,-27.98 21.16,-60.21 26.92,-95.14 1.9,-11.56 3.42,-23.4 4.52,-35.49 7.48,-82.959 -6.56,-158.311 -34.3,-206.498 -18.31,-31.801 -42.57,-51.782 -70.55,-54.321 -2.01,-0.179 -4.02,-0.269 -6.02,-0.269 m -132.49,301.948 c -0.45,-18.81 0,-38.16 1.8,-58.23 11.83,-129.789 69.41,-231.339 130.01,-231.339 1.63,0 3.26,0.07 4.9,0.218 62.46,5.582 103.23,118.262 91.17,251.641 -0.45,4.95 -1.08,9.72 -1.62,14.58 -2.61,-106.471 -39.96,-188.728 -93.06,-193.502 -1.64,-0.148 -3.29,-0.219 -4.92,-0.219 -58.34,-0.007 -113.66,94.11 -128.28,216.851"
         id="path646" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(29.9446,-182.091,-260.623,-33.0544,2205.35,1179.42)"
       spreadMethod="pad"
       id="linearGradient654">
      <stop
         style={{stopOpacity:"1",stopColor:"#4a5150",}}
         offset="0"
         id="stop650" />
      <stop
         style={{stopOpacity:"1",stopColor:"#1e1e1b",}}
         offset="1"
         id="stop652" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath664">
      <path
         d="m 2252.3,753.391 c -60.6,0 -118.18,101.55 -130.01,231.339 -1.8,20.07 -2.25,39.42 -1.8,58.23 14.62,-122.741 69.94,-216.858 128.28,-216.851 1.63,0 3.28,0.071 4.92,0.219 53.1,4.774 90.45,87.031 93.06,193.502 0.54,-4.86 1.17,-9.63 1.62,-14.58 12.06,-133.379 -28.71,-246.059 -91.17,-251.641 -1.64,-0.148 -3.27,-0.218 -4.9,-0.218"
         id="path662" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(29.9446,-182.091,-260.623,-33.0544,2205.35,1179.42)"
       spreadMethod="pad"
       id="linearGradient670">
      <stop
         style={{stopOpacity:"1",stopColor:"#656a6b",}}
         offset="0"
         id="stop666" />
      <stop
         style={{stopOpacity:"1",stopColor:"#545858",}}
         offset="1"
         id="stop668" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath680">
      <path
         d="m 2122.11,1134.89 c -1.13,24.83 -1.6,48.37 -1.89,69.17 v 0 3.56 c 0.23,12.29 2.92,18.7 5.87,18.94 h 0.35 c 3.19,-0.27 6.58,-7.65 7.46,-22.5 0.51,-11.44 1.15,-22.4 1.91,-32.9 -5.21,-11.05 -9.8,-23.2 -13.7,-36.27"
         id="path678" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(37.0337,-260.248,-260.248,-37.0337,2190.2,1346.45)"
       spreadMethod="pad"
       id="linearGradient686">
      <stop
         style={{stopOpacity:"1",stopColor:"#a3a3a4",}}
         offset="0"
         id="stop682" />
      <stop
         style={{stopOpacity:"1",stopColor:"#919393",}}
         offset="1"
         id="stop684" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath696">
      <path
         d="m 2215.06,859.359 h -1.94 c -1.14,0.102 -2.29,0.36 -3.44,0.809 -65.91,39.594 -82.74,168.842 -87.57,274.722 3.9,13.07 8.49,25.22 13.7,36.27 13.54,-185.738 65.72,-228.48 88.72,-251.14 21.92,-21.668 7.54,-59.282 -9.47,-60.661"
         id="path694" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(29.9446,-182.091,-260.623,-33.0544,2205.35,1179.42)"
       spreadMethod="pad"
       id="linearGradient702">
      <stop
         style={{stopOpacity:"1",stopColor:"#a3a3a4",}}
         offset="0"
         id="stop698" />
      <stop
         style={{stopOpacity:"1",stopColor:"#919393",}}
         offset="1"
         id="stop700" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath712">
      <path
         d="m 2332.41,1132.73 c -6.02,14.22 -12.7,27.33 -19.92,39.16 -0.9,14.17 -2.15,29.16 -3.81,45.04 -1.38,15.08 1.04,22.91 4.29,23.4 h 0.66 c 3.19,-0.46 6.95,-7.55 8.73,-21.33 3.44,-25.45 7.23,-55.07 10.05,-86.27"
         id="path710" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(37.0337,-260.248,-260.248,-37.0337,2190.2,1346.45)"
       spreadMethod="pad"
       id="linearGradient718">
      <stop
         style={{stopOpacity:"1",stopColor:"#838788",}}
         offset="0"
         id="stop714" />
      <stop
         style={{stopOpacity:"1",stopColor:"#727676",}}
         offset="1"
         id="stop716" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath728">
      <path
         d="m 2278.44,863.859 h -1.68 c -16.8,1.102 -34.88,34.629 -16.68,58.5 19.16,25.321 63.51,73.762 52.41,249.531 7.22,-11.83 13.9,-24.94 19.92,-39.16 2.46,-27.12 4.2,-55.44 4.35,-83.27 v -7.45 c -0.37,-74.061 -12.58,-143.592 -53.01,-176.53 -1.71,-0.98 -3.49,-1.5 -5.31,-1.621"
         id="path726" />
    </clipPath>
    <linearGradient
       x1="0"
       y1="0"
       x2="1"
       y2="0"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(29.9446,-182.091,-260.623,-33.0544,2205.35,1179.42)"
       spreadMethod="pad"
       id="linearGradient734">
      <stop
         style={{stopOpacity:"1",stopColor:"#838788",}}
         offset="0"
         id="stop730" />
      <stop
         style={{stopOpacity:"1",stopColor:"#727676",}}
         offset="1"
         id="stop732" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath748">
      <path
         d="m 6279.88,5798.23 c -0.73,0 -1.29,0.31 -1.48,1.05 -2.25,8.28 -3.96,16.83 -5.49,25.38 -8.87,-2.9 -20.44,-5.95 -29.4,-5.95 -10.49,0 -17.38,4.19 -12.09,17.74 4.86,12.24 21.06,27 34.02,36.63 -0.18,1.62 -0.45,3.33 -0.72,4.95 -0.45,2.43 -0.81,4.95 -1.35,7.38 -10.58,-6.49 -33.32,-19 -43.27,-19 -2.74,0 -4.52,0.95 -4.79,3.25 -0.05,0.39 -0.07,0.79 -0.09,1.18 v 1.74 c 0.98,19.61 33.06,39.48 48.24,46.85 0.64,0.32 1.74,0.73 2.61,0.73 0.85,0 1.48,-0.39 1.26,-1.63 -1.08,-7.47 -0.18,-16.2 1.35,-25.02 10.44,5.76 20.97,11.34 31.95,15.93 8.99,3.81 20.95,7.96 30.92,7.96 1.79,0 3.5,-0.13 5.13,-0.42 0.28,-0.13 0.61,-0.2 0.99,-0.2 7.89,-1.78 13.38,-7.58 13,-20.57 -0.9,-29.88 -38.61,-55.62 -63.18,-66.06 -1.53,-0.63 -3.87,-1.53 -6.57,-2.61 1.35,-8.1 2.88,-16.2 4.95,-24.12 0.55,-1.99 -3.62,-5.19 -5.99,-5.19 m -13.63,69.09 c -8.19,-6.66 -16.29,-14.4 -21.06,-23.49 -6.95,-13.15 -2.15,-17.55 7.23,-17.55 5.45,0 12.45,1.48 19.59,3.6 -2.16,12.51 -3.87,25.02 -5.76,37.44 m 20.65,12.86 c -1.8,0 -4.12,-1.08 -6.97,-3.23 -2.07,-1.26 -4.23,-2.61 -6.3,-3.96 l -0.45,-0.36 c 1.17,-4.95 2.25,-9.81 2.97,-14.13 1.44,-8.55 2.61,-17.28 3.96,-25.92 10.89,3.87 20.79,8.46 24.66,10.8 13.86,8.64 28.98,25.65 31.86,42.3 1.9,10.5 -0.98,25.57 -13.27,25.57 -1.08,0 -2.24,-0.12 -3.47,-0.37 -17.55,-3.51 -33.84,-12.78 -49.5,-21.24 l -0.9,-0.54 c 0.81,-3.87 1.62,-7.83 2.52,-11.61 6.12,3.87 12.33,6.84 18.18,8.46 2.54,0.71 4.57,1.02 6.16,1.02 14.08,0 -5.73,-24.88 -10.66,-28.92 -1.19,-1 -2.24,-1.42 -3.03,-1.42 -1.89,0 -2.26,2.4 0.6,4.75 2.79,2.25 6.03,5.13 8.1,7.92 0.35,7.23 -1.15,10.88 -4.46,10.88 m -27.04,32.5 -0.9,-0.63 c -7.38,-4.68 -14.85,-9.99 -20.97,-16.29 -6.78,-7.07 -12.5,-20.23 -5.33,-20.23 1.68,0 4.07,0.72 7.31,2.41 5.94,3.15 11.79,6.3 17.73,9.54 1.62,0.9 3.24,1.8 4.95,2.7 -1.44,7.47 -2.61,15.03 -2.79,22.5"
         id="path746" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1046.9,703.697,346.962,-516.182,6364.38,6147.22)"
       spreadMethod="pad"
       id="radialGradient754">
      <stop
         style={{stopOpacity:"1",stopColor:"#7c633e",}}
         offset="0"
         id="stop750" />
      <stop
         style={{stopOpacity:"1",stopColor:"#624f32",}}
         offset="1"
         id="stop752" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath764">
      <path
         d="m 6337.71,5916.78 c -0.01,0 -0.03,0 -0.04,0 -0.38,0 -0.71,0.07 -0.99,0.2 -0.42,0.2 -0.68,0.55 -0.68,1.1 0.09,7.38 1.35,16.2 -0.27,23.4 -0.44,1.97 4.49,5.41 6.48,5.41 0.47,0 0.78,-0.19 0.81,-0.64 0.85,-10.24 5.74,-20.65 10.46,-20.65 1.3,0 2.58,0.78 3.76,2.56 5.13,7.56 -7.29,24.75 -7.29,28.08 0,1.55 1.87,4.16 3.19,4.16 0.44,0 0.81,-0.29 1.04,-1.01 1.98,-6.57 5.04,-20.61 19.71,-24.84 3.33,-0.9 2.79,-1.62 0.27,-1.89 -0.17,-0.01 -0.47,-0.02 -0.86,-0.02 -2.31,0 -7.8,0.25 -8.95,1.1 0.27,-3.78 -1.89,-8.46 -6.12,-10.71 -2.02,-1.08 -4.06,-1.75 -6.07,-1.75 -3.36,0 -6.63,1.9 -9.5,6.97 -0.09,-1.17 -0.27,-7.02 -0.27,-8.1 0,-1.9 -2.79,-3.37 -4.68,-3.37"
         id="path762" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1046.9,703.697,346.962,-516.182,6364.38,6147.22)"
       spreadMethod="pad"
       id="radialGradient770">
      <stop
         style={{stopOpacity:"1",stopColor:"#7c633e",}}
         offset="0"
         id="stop766" />
      <stop
         style={{stopOpacity:"1",stopColor:"#624f32",}}
         offset="1"
         id="stop768" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath780">
      <path
         d="m 6373.97,5944.35 c -0.51,0 -0.9,0.18 -1.07,0.64 -2.61,6.75 -6.75,20.52 -15.21,21.51 -1.67,0.18 3.45,5.77 6.2,5.77 0.07,0 0.13,0 0.19,-0.01 l 2.25,-0.72 c -0.45,5.13 0.45,9.9 4.95,13.5 2.08,1.65 3.87,2.34 5.46,2.34 8.04,0 10.74,-17.92 17.58,-21.15 2.13,-1.02 1.92,-2.44 -0.24,-2.44 -0.12,0 -0.25,0 -0.39,0.01 -5.04,0.27 -9.81,2.16 -11.43,8.64 -2.52,9.63 -7.92,7.2 -8.46,7.83 -5.31,-2.16 -0.45,-14.58 1.44,-20.25 1.17,-3.51 5.49,-8.28 4.5,-12.06 -0.28,-0.99 -3.87,-3.61 -5.77,-3.61"
         id="path778" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1046.9,703.697,346.962,-516.182,6364.38,6147.22)"
       spreadMethod="pad"
       id="radialGradient786">
      <stop
         style={{stopOpacity:"1",stopColor:"#7c633e",}}
         offset="0"
         id="stop782" />
      <stop
         style={{stopOpacity:"1",stopColor:"#624f32",}}
         offset="1"
         id="stop784" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath796">
      <path
         d="m 6436.22,5928.3 c -0.69,0 -1.6,0.35 -2.21,1.12 -16.65,21.24 -33.03,44.73 -46.26,68.49 l -0.72,-0.81 c -1.02,-1.08 -4.35,-2.7 -5.68,-2.7 -0.78,0 -0.87,0.55 0.55,2.07 0.72,0.9 2.43,6.21 2.88,7.56 0.38,0.98 4.43,4.69 6.31,4.69 0.36,0 0.64,-0.14 0.8,-0.46 13.77,-25.47 27.18,-55.71 45,-78.57 0.69,-0.89 0.17,-1.39 -0.67,-1.39"
         id="path794" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1046.9,703.697,346.962,-516.182,6364.38,6147.22)"
       spreadMethod="pad"
       id="radialGradient802">
      <stop
         style={{stopOpacity:"1",stopColor:"#7c633e",}}
         offset="0"
         id="stop798" />
      <stop
         style={{stopOpacity:"1",stopColor:"#624f32",}}
         offset="1"
         id="stop800" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath812">
      <path
         d="m 6415.93,6000.03 c -6.38,0 -11.64,2.57 -13.87,8.5 -1.17,2.97 -1.89,6.03 -2.61,9.18 l -1.35,-1.8 c -1.11,-1.24 -2.58,-1.79 -3.82,-1.79 -2.19,0 -3.66,1.73 -1.13,4.49 3.15,3.42 4.05,7.02 9.18,7.92 0.22,0.04 0.42,0.05 0.62,0.05 2.77,0 3.83,-3.36 4.33,-5.63 1.47,-6.39 3.02,-18.25 10.93,-18.24 0.33,0 0.68,0.02 1.04,0.06 0.53,0.06 0.98,0.09 1.37,0.09 3.45,0 1.62,-2.29 -1.37,-2.61 -1.13,-0.14 -2.24,-0.22 -3.32,-0.22"
         id="path810" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1046.9,703.697,346.962,-516.182,6364.38,6147.22)"
       spreadMethod="pad"
       id="radialGradient818">
      <stop
         style={{stopOpacity:"1",stopColor:"#7c633e",}}
         offset="0"
         id="stop814" />
      <stop
         style={{stopOpacity:"1",stopColor:"#624f32",}}
         offset="1"
         id="stop816" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath828">
      <path
         d="m 6421.03,6016.79 c -1.14,0 -2.28,0.26 -3.4,0.83 -15.57,8.1 -5.76,29.7 6.66,35.55 0.97,0.47 1.73,0.68 2.3,0.68 2.59,0 1.42,-4.07 -1.67,-5.54 -4.23,-1.98 -8.19,-9.09 -7.92,-13.68 0.15,-2.54 2.83,-8.91 6.88,-8.91 0.83,0 1.72,0.27 2.66,0.9 8.37,5.58 11.52,14.76 18.72,21.78 1.42,1.38 2.98,2.14 3.81,2.14 0.95,0 0.93,-1 -1.38,-3.22 -6.21,-6.12 -8.37,-15.75 -14.04,-22.41 -2.78,-3.43 -7.69,-8.12 -12.62,-8.12"
         id="path826" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1046.9,703.697,346.962,-516.182,6364.38,6147.22)"
       spreadMethod="pad"
       id="radialGradient834">
      <stop
         style={{stopOpacity:"1",stopColor:"#7c633e",}}
         offset="0"
         id="stop830" />
      <stop
         style={{stopOpacity:"1",stopColor:"#624f32",}}
         offset="1"
         id="stop832" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath844">
      <path
         d="m 6273.19,5924.58 c -2.05,0 -2.36,2.17 0.8,4.3 52.47,33.93 107.28,95.85 135.63,151.47 0.78,1.49 2.98,3.62 3.72,3.62 0.37,0 0.37,-0.55 -0.39,-2 -29.43,-57.69 -82.08,-120.87 -136.62,-156.24 -1.25,-0.82 -2.33,-1.15 -3.14,-1.15"
         id="path842" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1046.9,703.697,346.962,-516.182,6364.38,6147.22)"
       spreadMethod="pad"
       id="radialGradient850">
      <stop
         style={{stopOpacity:"1",stopColor:"#7c633e",}}
         offset="0"
         id="stop846" />
      <stop
         style={{stopOpacity:"1",stopColor:"#624f32",}}
         offset="1"
         id="stop848" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath860">
      <path
         d="m 6414.17,6091.59 c -0.75,0 -1.07,0.71 -0.41,2.62 0.72,1.8 -5.13,4.77 -6.39,5.4 -1.9,1.07 1.95,7.36 4.55,7.36 0.23,0 0.46,-0.05 0.67,-0.16 4.59,-2.52 8.46,-5.31 6.48,-10.89 -0.65,-1.82 -3.51,-4.33 -4.9,-4.33"
         id="path858" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1046.9,703.697,346.962,-516.182,6364.38,6147.22)"
       spreadMethod="pad"
       id="radialGradient866">
      <stop
         style={{stopOpacity:"1",stopColor:"#7c633e",}}
         offset="0"
         id="stop862" />
      <stop
         style={{stopOpacity:"1",stopColor:"#624f32",}}
         offset="1"
         id="stop864" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath876">
      <path
         d="m 6467.56,6070.4 c -0.79,0 -1.61,0.3 -2.32,1.04 -8.19,8.28 -22.95,24.66 -30.87,33.39 -1.34,-2.37 -2.06,-11.18 -3.07,-11.18 -0.14,0 -0.29,0.17 -0.44,0.56 -2.16,5.67 -3.51,12.15 -6.39,17.46 -1.53,2.71 1.98,6.27 4.86,6.27 0.85,0 1.65,-0.31 2.25,-1.05 11.79,-14.58 25.2,-28.17 38.34,-41.58 2.1,-2.1 0.02,-4.91 -2.36,-4.91"
         id="path874" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1046.9,703.697,346.962,-516.182,6364.38,6147.22)"
       spreadMethod="pad"
       id="radialGradient882">
      <stop
         style={{stopOpacity:"1",stopColor:"#7c633e",}}
         offset="0"
         id="stop878" />
      <stop
         style={{stopOpacity:"1",stopColor:"#624f32",}}
         offset="1"
         id="stop880" />
    </radialGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath892">
      <path
         d="m 6473.71,6088.49 c -4.55,0 -9.57,1.67 -13.06,4.19 -10.17,7.29 -24.03,21.96 -21.96,35.82 0.27,1.89 3.96,4.14 6.03,4.68 2.48,4.18 6.64,6.82 11.32,6.82 3.48,0 7.25,-1.46 10.82,-4.84 9.09,-8.55 18.54,-25.38 17.64,-37.71 -0.45,-6.47 -5.26,-8.96 -10.79,-8.96 m -19.67,46.06 c -2.91,0 -4.81,-2.2 -4.19,-8.12 0.09,-0.99 -3.42,-1.8 -4.86,-2.88 1.35,-6.66 4.77,-12.87 8.19,-16.83 3.94,-4.65 13.35,-13.04 20.52,-13.04 1.01,0 1.98,0.16 2.88,0.53 7.92,3.24 -4.68,26.1 -6.03,28.26 -3.21,5.33 -11.41,12.08 -16.51,12.08"
         id="path890" />
    </clipPath>
    <radialGradient
       fx="0"
       fy="0"
       cx="0"
       cy="0"
       r="1"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1046.9,703.697,346.962,-516.182,6364.38,6147.22)"
       spreadMethod="pad"
       id="radialGradient898">
      <stop
         style={{stopOpacity:"1",stopColor:"#7c633e",}}
         offset="0"
         id="stop894" />
      <stop
         style={{stopOpacity:"1",stopColor:"#624f32",}}
         offset="1"
         id="stop896" />
    </radialGradient>
  </defs>
  <g
     id="g8"
     transform="matrix(1.3333333,0,0,-1.3333333,0,945.78667)">
    <g
       id="g10"
       transform="scale(0.1)">
      <g
         id="g12">
        <g
           id="g14"
           clipPath="url(#clipPath18)">
          <g
             id="g20"
             clipPath="url(#clipPath24)">
            <path
               d="m 2160,544 v 1 h -24 v 1 h -11 v 1 h -10 v 1 h -10 v 1 h -9 v 1 h -7 v 1 h -6 v 1 h -6 v 1 h -6 v 1 h -6 v 1 h -6 v 1 h -6 v 1 h -5 v 1 h -5 v 1 h -4 v 1 h -4 v 1 h -4 v 1 h -4 v 1 h -4 v 1 h -5 v 1 h -4 v 1 h -4 v 1 h -4 v 1 h -4 v 1 h -3 v 1 h -4 v 1 h -3 v 1 h -3 v 1 h -4 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -4 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -4 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 5 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 5 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 6 h -1 v 6 h -1 v 6 h -1 v 6 h -1 v 6 h -1 v 6 h -1 v 5 h -1 v 6 h -1 v 10 h -1 v 9 h -1 v 10 h -1 v 10 h -1 v 11 h -1 v 29 h -1 v 29 h 1 v 27 h 1 v 13 h 1 v 9 h 1 v 9 h 1 v 9 h 1 v 9 h 1 v 7 h 1 v 5 h 1 v 5 h 1 v 6 h 1 v 5 h 1 v 5 h 1 v 5 h 1 v 6 h 1 v 5 h 1 v 4 h 1 v 4 h 1 v 3 h 1 v 4 h 1 v 4 h 1 v 3 h 1 v 4 h 1 v 4 h 1 v 3 h 1 v 4 h 1 v 4 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 4 v 1 h 3 v 1 h 3 v 1 h 4 v 1 h 3 v 1 h 4 v 1 h 3 v 1 h 4 v 1 h 4 v 1 h 4 v 1 h 4 v 1 h 5 v 1 h 4 v 1 h 4 v 1 h 5 v 1 h 6 v 1 h 5 v 1 h 6 v 1 h 6 v 1 h 8 v 1 h 8 v 1 h 10 v 1 h 13 v 1 h 42 v -1 h 14 v -1 h 7 v -1 h 7 v -1 h 7 v -1 h 6 v -1 h 4 v -1 h 4 v -1 h 4 v -1 h 4 v -1 h 4 v -1 h 3 v -1 h 4 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -6 h 1 v -23 h -1 v -6 h -1 v -5 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -5 h -1 v -4 h -1 v -5 h -1 v -5 h -1 v -5 h -1 v -6 h -1 v -6 h -1 v -8 h -1 v -7 h -1 v -11 h -1 v -16 h -1 v -28 h 1 v -15 h 1 v -10 h 1 v -7 h 1 v -7 h 1 v -5 h 1 v -5 h 1 v -5 h 1 v -5 h 1 v -3 h 1 v -4 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 3 v -1 h 4 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 5 v -1 h 4 v -1 h 4 v -1 h 4 v -1 h 6 v -1 h 7 v -1 h 6 v -1 h 10 v -1 h 11 v -1 h 46 v 1 h 6 v -1 h -4 v -6 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -12 h 1 v -13 h 1 v -12 h 1 v -13 h 1 v -11 h 1 v -7 h 1 v -6 h 1 v -6 h 1 v -5 h 1 v -5 h 1 v -6 h 1 v -5 h 1 v -4 h 1 v -4 h 1 v -5 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 4 v -1 h 3 v -1 h 3 v -1 h 4 v -1 h 4 v -1 h 5 v -1 h 5 v -1 h 5 v -1 h 5 v -1 h 7 v -1 h 9 v -1 h 11 v -1 h 31 v 1 h 11 v 1 h 10 v 1 h 6 v 1 h 7 v 1 h 5 v 1 h 5 v 1 h 4 v 1 h 4 v 1 h 4 v 1 h 4 v 1 h 4 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 4 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 4 v 1 h 3 v 1 h 4 v 1 h 5 v 1 h 5 v 1 h 5 v 1 h 8 v 1 h 30 v -1 h 7 v -1 h 6 v -1 h 5 v -1 h 4 v -1 h 3 v -1 h 3 v -1 h 4 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -4 h 1 v -4 h 1 v -5 h 1 v -5 h 1 v -4 h 1 v -10 h 1 v -9 h 1 v -29 h -1 v -11 h -1 v -10 h -1 v -6 h -1 v -5 h -1 v -6 h -1 v -5 h -1 v -5 h -1 v -3 h -1 v -4 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -4 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -4 v -1 h -3 v -1 h -4 v -1 h -3 v -1 h -4 v -1 h -3 v -1 h -5 v -1 h -4 v -1 h -4 v -1 h -5 v -1 h -4 v -1 h -5 v -1 h -4 v -1 h -5 v -1 h -5 v -1 h -4 v -1 h -5 v -1 h -6 v -1 h -8 v -1 h -8 v -1 h -7 v -1 h -8 v -1 h -7 v -1 h -8 v -1 h -16 v -1 h -20 v -1 z m 192,66 v -1 h 3 v 1 h 7 v 1 h 6 v 1 h 3 v 1 h 3 v 1 h 4 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 5 h 1 v 4 h 1 v 5 h 1 v 17 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 1 h -3 v 1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -3 h -1 v -4 h -1 v -7 h 1 v -4 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 4 v -1 z m -98,112 v -1 h 4 v 1 h 8 v 1 h 4 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 4 h 1 v 4 h 1 v 5 h 1 v 4 h 1 v 5 h 1 v 5 h 1 v 5 h 1 v 7 h 1 v 8 h 1 v 7 h 1 v 10 h 1 v 15 h 1 v 51 h -1 v 15 h -1 v 9 h -1 v 8 h -1 v 8 h -1 v 8 h -1 v 11 h -1 v 15 h -1 v 15 h -1 v 14 h -1 v 11 h -1 v 8 h -1 v 9 h -1 v 8 h -1 v 7 h -1 v 7 h -1 v 7 h -1 v 7 h -1 v 7 h -1 v 5 h -1 v 6 h -1 v 5 h -1 v 6 h -1 v 5 h -1 v 5 h -1 v 5 h -1 v 5 h -1 v 4 h -1 v 5 h -1 v 4 h -1 v 5 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 3 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -3 v 1 h -5 v 1 h -13 v -1 h -4 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -5 h -1 v -4 h -1 v -5 h -1 v -4 h -1 v -5 h -1 v -6 h -1 v -6 h -1 v -6 h -1 v -6 h -1 v -8 h -1 v -8 h -1 v -8 h -1 v -9 h -1 v -12 h -1 v -13 h -1 v -21 h -1 v -67 h 1 v -23 h 1 v -15 h 1 v -13 h 1 v -10 h 1 v -9 h 1 v -8 h 1 v -9 h 1 v -8 h 1 v -8 h 1 v -19 h 1 v -17 h 1 v -10 h 1 v -8 h 1 v -7 h 1 v -7 h 1 v -6 h 1 v -5 h 1 v -5 h 1 v -6 h 1 v -5 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 4 v -1 h 3 v -1 h 3 v -1 z m 359,193 v -1 h 18 v 1 h 9 v 1 h 6 v 1 h 5 v 1 h 5 v 1 h 3 v 1 h 3 v 1 h 4 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 4 h 1 v 4 h 1 v 4 h 1 v 4 h 1 v 4 h 1 v 4 h 1 v 5 h 1 v 5 h 1 v 6 h 1 v 6 h 1 v 7 h 1 v 8 h 1 v 13 h 1 v 16 h -1 v 9 h -1 v 5 h -1 v 4 h -1 v 4 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -3 v 1 h -5 v 1 h -11 v -1 h -7 v -1 h -4 v -1 h -5 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -4 v -1 h -3 v -1 h -3 v -1 h -4 v -1 h -4 v -1 h -4 v -1 h -5 v -1 h -4 v -1 h -4 v -1 h -6 v -1 h -6 v -1 h -5 v -1 h -8 v -1 h -9 v -1 h -10 v -1 h -42 v 1 h -10 v 1 h -8 v 1 h -8 v 1 h -5 v 1 h -5 v 1 h -5 v 1 h -5 v 1 h -4 v 1 h -3 v 1 h -3 v 1 h -4 v 1 h -3 v 1 h -4 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 4 h -1 v 5 h -1 v 5 h -1 v 5 h -1 v 5 h -1 v 5 h -1 v 4 h -1 v 5 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -3 v 1 h -3 v 1 h -4 v 1 h -4 v 1 h -4 v 1 h -8 v 1 h -11 v -1 h -6 v -1 h -4 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -6 h -1 v -8 h -1 v -7 h -1 v -7 h -1 v -33 h 1 v -12 h 1 v -9 h 1 v -5 h 1 v -5 h 1 v -5 h 1 v -6 h 1 v -4 h 1 v -3 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -5 h 1 v -4 h 1 v -4 h 1 v -5 h 1 v -5 h 1 v -5 h 1 v -5 h 1 v -5 h 1 v -6 h 1 v -6 h 1 v -6 h 1 v -6 h 1 v -7 h 1 v -6 h 1 v -8 h 1 v -8 h 1 v -8 h 1 v -8 h 1 v -11 h 1 v -11 h 1 v -12 h 1 v -15 h 1 v -18 h 1 v -28 h 1 v -82 h -1 v -56 h 1 v -10 h 1 v -7 h 1 v -6 h 1 v -5 h 1 v -5 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 5 v -1 h 5 v -1 z M 1195,2794 v -1 h 14 v 1 h 4 v 1 h 4 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 5 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -3 v 1 h -17 v -1 h -7 v -1 h -4 v -1 h -4 v -1 h -4 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -12 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1"
               style={{fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path32" />
          </g>
        </g>
      </g>
      <path
         d="m 3098.16,3390.88 c -9,35.82 -20.7,157.59 -112.14,158.4 -92.7,0.9 -150.57,-242.73 -406.71,-459.72 -219.78,-186.12 -523.62,-179.46 -791.91,-480.96 -284.49,-319.59 120.78,-535.5 383.76,-790.56 148.05,-143.55 338.94,-232.2 319.05,-719.19 -4.5,-109.889 60.12,-186.569 132.48,-185.311 89.73,1.531 151.47,77.492 239.22,238.411 148.05,271.44 247.68,750.6 459,923.22 245.16,200.34 707.13,220.5 776.7,579.33 41.22,213.03 -154.8,39.69 -199.62,15.75 -44.82,-23.94 -388.44,-284.31 -600.12,245.16 l -199.71,475.47"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path34" />
      <path
         d="m 2297.14,1861.79 c 18.23,-17.4 18.88,-46.29 1.46,-64.51 L 2133.1,1623.8 c -17.42,-18.23 -46.3,-18.95 -64.5,-1.55 l -381.34,363.86 c -18.23,17.38 -18.89,46.29 -1.46,64.52 l 165.49,173.48 c 17.43,18.22 46.3,18.92 64.53,1.54 l 381.32,-363.86"
         style={{fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path36" />
      <path
         d="m 2229.96,1835.19 c 16.12,-15.38 20.68,-36.81 10.18,-47.79 l -99.93,-104.74 c -10.5,-10.98 -32.08,-7.46 -48.21,7.94 l -337.58,322.09 c -16.12,15.41 -20.67,36.81 -10.15,47.8 l 99.9,104.74 c 10.52,11 32.11,7.46 48.24,-7.94 l 337.55,-322.1"
         style={{fill:"#6a5d4e",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path38" />
      <g
         id="g40">
        <g
           id="g42"
           clipPath="url(#clipPath46)">
          <g
             id="g48"
             clipPath="url(#clipPath52)">
            <path
               d="m 5915,5609 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 4 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 4 h 1 v 3 h 1 v 4 h 1 v 5 h 1 v 5 h 1 v 5 h 1 v 5 h 1 v 7 h 1 v 7 h 1 v 10 h 1 v 11 h 1 v 21 h 1 v 30 h -1 v 23 h -1 v 15 h -1 v 12 h -1 v 11 h -1 v 13 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 4 v 1 h 5 v 1 h 5 v 1 h 6 v 1 h 9 v 1 h 28 v -1 h 8 v -1 h 8 v -1 h 5 v -1 h 5 v -1 h 4 v -1 h 4 v -1 h 4 v -1 h 3 v -1 h 3 v -1 h 4 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -5 h 1 v -4 h 1 v -5 h 1 v -9 h 1 v -9 h 1 v -30 h -1 v -10 h -1 v -7 h -1 v -5 h -1 v -4 h -1 v -5 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -4 v -1 h -4 v -1 h -4 v -1 h -4 v -1 h -5 v -1 h -4 v -1 h -7 v -1 h -8 v -1 h -10 v -1 h -43 v 1 h -13 v 1 h -9 v 1 h -8 v 1 h -8 v 1 h -7 v 1 h -7 v 1 h -6 v 1 h -6 v 1 h -7 v 1 h -6 v 1 h -7 v 1 h -7 v 1 h -8 v 1 h -26 v -1 h -5 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -2 v -1 h -15 v -1 h -11 v 1 h -14 v 1 h -10 v 1 h -7 v 1 h -7 v 1 h -6 v 1 h -6 v 1 h -5 v 1 h -6 v 1 h -5 v 1 h -5 v 1 h -6 v 1 h -5 v 1 h -5 v 1 h -6 v 1 h -5 v 1 h -6 v 1 h -7 v 1 h -7 v 1 h -8 v 1 h -10 v 1 h -15 v 1 h -18 v -1 h -14 v -1 h -8 v -1 h -7 v -1 h -5 v -1 h -4 v -1 h -5 v -1 h -4 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 z m 364,191 v -1 h 3 v 1 h 1 v 1 h 1 v 1 h 1 v 5 h -1 v 5 h -1 v 4 h -1 v 5 h -1 v 6 h -1 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 4 h 1 v 12 h -1 v 3 h -1 v 3 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -4 v 1 h -9 v -1 h -6 v -1 h -4 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v 5 h -1 v 21 h -4 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -4 h -1 v -8 h 2 v -1 h 6 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v -3 h 1 v -6 h 1 v -5 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -4 h -1 v -5 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 4 v -1 h 8 v 1 h 6 v 1 h 5 v 1 h 4 v 1 h 4 v 1 h 3 v 1 h 4 v -5 h 1 v -5 h 1 v -5 h 1 v -4 h 1 v -5 h 1 z m -32,26 v 1 h -2 v 1 h -1 v 1 h -2 v 10 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v -5 h 1 v -7 h 1 v -6 h 1 v -7 h 1 v -6 h 1 v -7 h 1 v -1 h -4 v -1 h -4 v -1 h -5 v -1 z m 33,6 v 1 h -1 v 6 h -1 v 7 h -1 v 7 h -1 v 6 h -1 v 5 h -1 v 5 h -1 v 5 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v -1 h 2 v -1 h 1 v -3 h 1 v -8 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -3 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 4 h 1 v 1 h -1 v 2 h -1 v 1 h -8 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v 5 h -1 v 4 h -1 v 4 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 5 v 1 h 6 v -1 h 3 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -6 h 1 v -7 h -1 v -6 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -2 v -1 z m -50,43 v 1 h -1 v 7 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v -2 h 1 v -8 h 1 v -8 h 1 v -6 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -3 v -1 h -2 v -1 z m 107,43 v -1 h 2 v 1 h 2 v 1 h 1 v 10 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 2 v -1 h 1 v -1 h 6 v 1 h 3 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 3 h 1 v 3 h 4 v -1 h 7 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -2 v -1 h -1 v -4 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -8 h -1 v -2 h -1 v -1 h -2 v -1 h -3 v 1 h -2 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 3 h -1 v 2 h -1 v 4 h -1 v 6 h -3 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h 1 z m -65,8 v -1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -2 z m 163,4 v -1 h 1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -2 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -1 h 1 v 1 h 2 v 1 h 1 v 1 h 3 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 z m -62,16 v -1 h 3 v 1 h 1 v 1 h 2 v 5 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 8 h 1 v 2 h 1 v 1 h 4 v -1 h 2 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 3 v -1 h 3 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -3 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -3 h -1 v -7 h -3 v 1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 z m 38,56 v -1 h 10 v 1 h -5 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 4 h -1 v 5 h -1 v 2 h -1 v 1 h -1 v 1 h -3 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -3 h 3 v 1 h 2 v 2 h 2 v -2 h 1 v -3 h 1 v -4 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 z m 9,16 v -1 h 2 v 1 h 3 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -4 v 1 h -2 v 2 h -1 v 1 h -1 v 2 h -1 v 3 h -1 v 2 h 1 v 4 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h -3 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -3 h -1 v -2 h -1 v -4 h -1 v -4 h 1 v -4 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 z m -24,38 v -1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 z m 9,15 v -1 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 z m 61,1 v -1 h 3 v 1 h 1 v 3 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -4 v -1 h -1 v -1 h -1 v -4 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -1 h 1 v 4 h 1 v 5 h 3 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 z m -55,9 h 1 v 1 h -1 z m 59,9 v -1 h 7 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 1 v 3 h 1 v 7 h -1 v 5 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -3 v 1 h -1 v -1 h -4 v -1 h -2 v -1 h -1 v -1 h -2 v -2 h -1 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -1 v -7 h 1 v -4 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 z m -56,3 v -1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 4 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -3 v -1 h -1 v -2 h -1 v -3 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 z m 57,0 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 1 h 1 v 1 h 2 v 1 h 2 v 5 h 1 v 3 h 1 v 1 h 6 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -5 h 1 v -3 h -1 v -3 h -1 v -1 h -2 v -1"
               style={{fill:"url(#radialGradient58)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path60" />
          </g>
        </g>
      </g>
      {/* <path
         d="m 5911.84,5607.76 c -439.84,-447 -2640.66,-2715.5 -2640.66,-2715.5 -31.4,-23.56 -136.8,62.79 -201.84,128.93 -65.03,66.16 -126.84,155.49 -118.85,205.21 0,0 2710.74,2615.53 2717.15,2628.22 l 244.2,-246.86"
         style={{fill:"#c19357",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path62" /> */}
      <g
         id="g64">
        <g
           id="g66"
           clipPath="url(#clipPath70)">
          <g
             id="g72"
             clipPath="url(#clipPath76)">
            <path
               d="m 5846,6169 v 4 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -5 v -1 h -4 v -1 h -5 v -1 h -7 v -1 h -16 v 1 h -6 v 1 h -5 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 18 h 1 v 6 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 6 v 1 h 6 v 1 h 17 v -1 h 7 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -5 h 1 v -14 h -1 v -5 h -1 v -4 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -3 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1"
               style={{fill:"url(#linearGradient82)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path84" />
          </g>
        </g>
      </g>
      <path
         d="m 2823.7,2400.63 c 31.75,-33.36 -69.96,-130.16 -101.72,-96.8 l -356.77,374.84 c -31.73,33.34 69.97,130.13 101.71,96.77 l 356.78,-374.81"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path272" />
      <path
         d="m 2823.28,2408.35 c 31.42,-32.32 -59.87,-121.05 -91.28,-88.74 l -352.83,362.91 c -31.4,32.31 59.88,121.03 91.3,88.69 l 352.81,-362.86"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path274" />
      <path
         d="m 3181.31,2737.28 c 32.31,-32.84 -67.77,-131.31 -100.09,-98.5 l -362.97,368.84 c -32.3,32.81 67.77,131.28 100.07,98.48 l 362.99,-368.82"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path276" />
      <path
         d="m 3171.84,2751.23 c 31.42,-32.33 -59.87,-121.07 -91.29,-88.74 l -352.83,362.89 c -31.39,32.31 59.89,121.04 91.3,88.71 l 352.82,-362.86"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path278" />
      <path
         d="m 2488.26,2042.3 c 28,-36.58 -83.53,-121.91 -111.53,-85.33 l -314.44,411 c -27.98,36.56 83.53,121.87 111.51,85.28 l 314.46,-410.95"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path280" />
      <path
         d="m 2480.92,2051.91 c 27.38,-35.81 -73.74,-113.17 -101.12,-77.38 l -307.56,401.98 c -27.38,35.8 73.73,113.15 101.11,77.35 l 307.57,-401.95"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path282" />
      <path
         d="m 2398.61,2768.38 c 0,-13.48 -10.92,-24.4 -24.39,-24.4 -13.48,0 -24.4,10.92 -24.4,24.4 0,13.48 10.92,24.4 24.4,24.4 13.47,0 24.39,-10.92 24.39,-24.4"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path284" />
      <path
         d="m 2843.91,2314.22 c 0,-13.48 -10.92,-24.41 -24.4,-24.41 -13.47,0 -24.39,10.93 -24.39,24.41 0,13.48 10.92,24.4 24.39,24.4 13.48,0 24.4,-10.92 24.4,-24.4"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path286" />
      <path
         d="m 3197.21,2648.89 c 0,-13.47 -10.92,-24.41 -24.39,-24.41 -13.48,0 -24.4,10.94 -24.4,24.41 0,13.47 10.92,24.4 24.4,24.4 13.47,0 24.39,-10.93 24.39,-24.4"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path288" />
      <path
         d="m 2757.25,3111.19 c 0,-13.48 -10.92,-24.41 -24.4,-24.41 -13.47,0 -24.4,10.93 -24.4,24.41 0,13.47 10.93,24.4 24.4,24.4 13.48,0 24.4,-10.93 24.4,-24.4"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path290" />
      <path
         d="m 2104.66,2468.31 c 0,-13.47 -10.92,-24.4 -24.39,-24.4 -13.48,0 -24.4,10.93 -24.4,24.4 0,13.48 10.92,24.4 24.4,24.4 13.47,0 24.39,-10.92 24.39,-24.4"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path292" />
      <path
         d="m 2496.4,1950.37 c 0,-13.47 -10.92,-24.4 -24.39,-24.4 -13.49,0 -24.41,10.93 -24.41,24.4 0,13.48 10.92,24.41 24.41,24.41 13.47,0 24.39,-10.93 24.39,-24.41"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path294" />
      <path
         d="m 2429.85,2041.26 c 0.22,-9.89 -7.63,-18.1 -17.54,-18.33 -9.91,-0.21 -18.11,7.62 -18.34,17.53 -0.23,9.92 7.62,18.12 17.54,18.34 9.89,0.24 18.11,-7.61 18.34,-17.54"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path560" />
      <path
         d="m 2375.19,2110.35 c 0.22,-9.9 -7.64,-18.12 -17.54,-18.34 -9.92,-0.21 -18.11,7.62 -18.34,17.54 -0.23,9.91 7.61,18.11 17.54,18.34 9.9,0.23 18.11,-7.62 18.34,-17.54"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path562" />
      <path
         d="m 2320.52,2179.43 c 0.22,-9.92 -7.63,-18.12 -17.53,-18.33 -9.92,-0.23 -18.12,7.62 -18.35,17.53 -0.23,9.9 7.62,18.11 17.54,18.34 9.9,0.21 18.11,-7.62 18.34,-17.54"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path564" />
      <path
         d="m 2265.85,2248.51 c 0.22,-9.91 -7.62,-18.14 -17.54,-18.36 -9.9,-0.2 -18.11,7.63 -18.33,17.55 -0.23,9.91 7.62,18.1 17.53,18.35 9.9,0.21 18.11,-7.63 18.34,-17.54"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path566" />
      <path
         d="m 2211.19,2317.59 c 0.23,-9.92 -7.62,-18.13 -17.54,-18.35 -9.9,-0.23 -18.11,7.63 -18.33,17.54 -0.23,9.89 7.62,18.1 17.53,18.35 9.9,0.19 18.12,-7.63 18.34,-17.54"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path568" />
      <path
         d="m 2156.52,2386.67 c 0.23,-9.91 -7.62,-18.12 -17.53,-18.35 -9.9,-0.22 -18.12,7.63 -18.34,17.54 -0.22,9.89 7.62,18.11 17.53,18.34 9.91,0.21 18.12,-7.62 18.34,-17.53"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path570" />
      <path
         d="m 2779.06,2390.2 c 1.25,-9.81 -5.7,-18.8 -15.52,-20.05 -9.85,-1.25 -18.82,5.66 -20.08,15.52 -1.26,9.84 5.69,18.81 15.52,20.07 9.83,1.26 18.82,-5.68 20.08,-15.54"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path572" />
      <path
         d="m 2717.48,2453.2 c 1.25,-9.8 -5.7,-18.81 -15.52,-20.07 -9.84,-1.24 -18.83,5.69 -20.09,15.51 -1.26,9.86 5.68,18.82 15.54,20.08 9.82,1.27 18.81,-5.68 20.07,-15.52"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path574" />
      <path
         d="m 2655.9,2516.2 c 1.25,-9.83 -5.7,-18.83 -15.54,-20.1 -9.81,-1.25 -18.81,5.71 -20.06,15.55 -1.27,9.84 5.68,18.8 15.52,20.06 9.82,1.25 18.82,-5.67 20.08,-15.51"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path576" />
      <path
         d="m 2594.31,2579.18 c 1.25,-9.83 -5.69,-18.81 -15.53,-20.07 -9.82,-1.23 -18.81,5.7 -20.07,15.51 -1.26,9.85 5.68,18.84 15.53,20.1 9.82,1.26 18.81,-5.7 20.07,-15.54"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path578" />
      <path
         d="m 2532.73,2642.18 c 1.26,-9.84 -5.7,-18.81 -15.53,-20.08 -9.83,-1.26 -18.81,5.69 -20.06,15.53 -1.27,9.8 5.68,18.82 15.51,20.08 9.83,1.24 18.82,-5.71 20.08,-15.53"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path580" />
      <path
         d="m 2471.14,2705.17 c 1.26,-9.86 -5.69,-18.82 -15.51,-20.08 -9.84,-1.27 -18.83,5.69 -20.08,15.54 -1.27,9.81 5.7,18.8 15.52,20.06 9.83,1.24 18.81,-5.68 20.07,-15.52"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path582" />
      <path
         d="m 3121.53,2741.03 c 1.25,-9.81 -5.69,-18.8 -15.52,-20.06 -9.84,-1.24 -18.82,5.67 -20.07,15.53 -1.26,9.84 5.69,18.81 15.52,20.07 9.83,1.25 18.81,-5.69 20.07,-15.54"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path584" />
      <path
         d="m 3059.95,2804.03 c 1.25,-9.81 -5.69,-18.81 -15.52,-20.07 -9.83,-1.24 -18.82,5.69 -20.08,15.51 -1.27,9.86 5.69,18.82 15.53,20.08 9.82,1.26 18.81,-5.68 20.07,-15.52"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path586" />
      <path
         d="m 2998.37,2867.04 c 1.25,-9.84 -5.68,-18.84 -15.53,-20.11 -9.82,-1.25 -18.81,5.71 -20.07,15.55 -1.26,9.83 5.68,18.8 15.54,20.06 9.81,1.25 18.8,-5.67 20.06,-15.5"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path588" />
      <path
         d="m 2936.78,2930.01 c 1.26,-9.83 -5.68,-18.81 -15.52,-20.07 -9.82,-1.23 -18.81,5.68 -20.08,15.5 -1.26,9.86 5.69,18.84 15.53,20.1 9.82,1.26 18.81,-5.69 20.07,-15.53"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path590" />
      <path
         d="m 2875.21,2993 c 1.25,-9.83 -5.69,-18.81 -15.54,-20.08 -9.82,-1.25 -18.81,5.7 -20.06,15.53 -1.27,9.81 5.68,18.83 15.52,20.08 9.83,1.25 18.82,-5.7 20.08,-15.53"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path592" />
      <path
         d="m 2813.62,3056 c 1.26,-9.86 -5.69,-18.82 -15.51,-20.09 -9.84,-1.25 -18.83,5.7 -20.08,15.55 -1.28,9.81 5.68,18.8 15.51,20.05 9.84,1.25 18.82,-5.67 20.08,-15.51"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path594" />
      <path
         d="m 1920.15,2177.99 c 0.09,-15.23 -12.15,-27.68 -27.41,-27.77 -15.23,-0.09 -27.66,12.17 -27.78,27.41 -0.11,15.24 12.17,27.67 27.41,27.77 15.25,0.11 27.67,-12.16 27.78,-27.41"
         style={{fill:"#b2acaa",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path456" />
      <path
         d="m 1993.04,2108.74 c 0.1,-15.26 -12.14,-27.67 -27.41,-27.79 -15.23,-0.09 -27.65,12.17 -27.78,27.42 -0.09,15.25 12.18,27.69 27.41,27.77 15.26,0.1 27.68,-12.16 27.78,-27.4"
         style={{fill:"#b2acaa",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path458" />
      <path
         d="m 2065.94,2039.46 c 0.1,-15.24 -12.16,-27.67 -27.41,-27.77 -15.24,-0.11 -27.66,12.17 -27.78,27.4 -0.1,15.26 12.17,27.69 27.41,27.8 15.25,0.07 27.67,-12.18 27.78,-27.43"
         style={{fill:"#b2acaa",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path460" />
      <path
         d="m 2138.83,1970.21 c 0.12,-15.26 -12.16,-27.69 -27.4,-27.79 -15.25,-0.09 -27.68,12.18 -27.79,27.42 -0.09,15.25 12.17,27.68 27.41,27.77 15.24,0.1 27.69,-12.16 27.78,-27.4"
         style={{fill:"#b2acaa",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path462" />
      <path
         d="m 2211.74,1900.93 c 0.1,-15.24 -12.18,-27.69 -27.41,-27.76 -15.25,-0.12 -27.68,12.15 -27.78,27.39 -0.1,15.24 12.16,27.68 27.41,27.79 15.23,0.08 27.67,-12.18 27.78,-27.42"
         style={{fill:"#b2acaa",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path464" />
      <path
         d="m 2284.63,1831.67 c 0.09,-15.25 -12.17,-27.68 -27.42,-27.77 -15.25,-0.1 -27.66,12.17 -27.77,27.4 -0.09,15.25 12.16,27.69 27.42,27.79 15.22,0.09 27.65,-12.17 27.77,-27.42"
         style={{fill:"#b2acaa",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path466" />
      <path
         d="m 5911.84,5607.76 c -439.84,-447 -2640.66,-2715.5 -2640.66,-2715.5 -31.4,-23.56 -136.8,62.79 -201.84,128.93 -65.03,66.16 -126.84,155.49 -118.85,205.21 0,0 2710.74,2615.53 2717.15,2628.22 l 244.2,-246.86"
         style={{fill:"#c19357",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path62" /> 
      <path
         d="m 3282.63,2803.26 c 0,-11.56 -9.37,-20.93 -20.94,-20.93 -11.56,0 -20.93,9.37 -20.93,20.93 0,11.57 9.37,20.94 20.93,20.94 11.57,0 20.94,-9.37 20.94,-20.94"
         style={{fill:"#8b8c82",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path310" />
      <path
         d="m 5691.15,5924.83 -6.59,-44.14 243.02,-250.64 25.76,24.99 -262.19,269.79"
         style={{fill:"#825f21",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path238" />
      <path
         d="m 5693.12,5922.97 -6.62,-44.13 243.04,-250.65 25.74,24.99 -262.16,269.79"
         style={{fill:"#825f21",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path240" />
      <path
         d="m 5687.25,5883.7 -20.76,-30.39 240.64,-248.19 25.77,24.98 -245.65,253.6"
         style={{fill:"#d9dade",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path242" />
      <g transform='rotate(-45) translate(-135, 4350) rotate(180) translate(-350,-3800)'>
         {/* <rect width="350" height="5480" y="0"/> */}
         { frets }
         <g>
            { fretsTriggers }
         </g>
      </g>
      <g transform='rotate(-45) translate(-205, 2650)' pitchbinding={pitchBinding} stringsamount={6} fretsamount={21} id="strings">
         {/* todo: automatize this mess, make adequate tuning system */}
         {/* { <rect width="350" height="500" y="0"/> } */}
         <g transform='rotate(1.35)'>
            <path d="M 0 0 Q 0 0 0 1600" stroke="#b8b8b8" fill="transparent" strokeWidth="15" id='string0wiggly' transform="translate(507.5)">
               <animate
               attributeName="d"
               values='M 0 0 Q 50 800 0 1600;M 0 0 Q -25.0 800 0 1600;M 0 0 Q 12.5 800 0 1600;M 0 0 Q -8.333333333333334 800 0 1600;M 0 0 Q 6.25 800 0 1600;M 0 0 Q -5.0 800 0 1600;M 0 0 Q 4.166666666666667 800 0 1600;M 0 0 Q -3.5714285714285716 800 0 1600;M 0 0 Q 3.125 800 0 1600;M 0 0 Q -2.7777777777777777 800 0 1600;M 0 0 Q 2.5 800 0 1600;M 0 0 Q -2.272727272727273 800 0 1600;M 0 0 Q 2.0833333333333335 800 0 1600;M 0 0 Q -1.9230769230769231 800 0 1600;M 0 0 Q 1.7857142857142858 800 0 1600;M 0 0 Q -1.6666666666666667 800 0 1600;M 0 0 Q 1.5625 800 0 1600;M 0 0 Q -1.4705882352941178 800 0 1600;M 0 0 Q 1.3888888888888888 800 0 1600;M 0 0 Q -1.3157894736842106 800 0 1600;M 0 0 Q 1.25 800 0 1600;M 0 0 Q -1.1904761904761905 800 0 1600;M 0 0 Q 1.1363636363636365 800 0 1600;M 0 0 Q -1.0869565217391304 800 0 1600;M 0 0 Q 1.0416666666666667 800 0 1600;M 0 0 Q -1.0 800 0 1600;M 0 0 Q 0.9615384615384616 800 0 1600;M 0 0 Q -0.9259259259259259 800 0 1600;M 0 0 Q 0.8928571428571429 800 0 1600;M 0 0 Q -0.8620689655172413 800 0 1600;M 0 0 Q 0.8333333333333334 800 0 1600;M 0 0 Q -0.8064516129032258 800 0 1600;M 0 0 Q 0.78125 800 0 1600;M 0 0 Q -0.7575757575757576 800 0 1600;M 0 0 Q 0.7352941176470589 800 0 1600;M 0 0 Q -0.7142857142857143 800 0 1600;M 0 0 Q 0.6944444444444444 800 0 1600;M 0 0 Q -0.6756756756756757 800 0 1600;M 0 0 Q 0.6578947368421053 800 0 1600;M 0 0 Q -0.6410256410256411 800 0 1600;M 0 0 Q 0.625 800 0 1600;M 0 0 Q -0.6097560975609756 800 0 1600;M 0 0 Q 0.5952380952380952 800 0 1600;M 0 0 Q -0.5813953488372093 800 0 1600;M 0 0 Q 0.5681818181818182 800 0 1600;M 0 0 Q -0.5555555555555556 800 0 1600;M 0 0 Q 0.5434782608695652 800 0 1600;M 0 0 Q -0.5319148936170213 800 0 1600;M 0 0 Q 0.5208333333333334 800 0 1600;M 0 0 Q -0.5102040816326531 800 0 1600;M 0 0 Q 0.5 800 0 1600;M 0 0 Q -0.49019607843137253 800 0 1600;M 0 0 Q 0.4807692307692308 800 0 1600;M 0 0 Q -0.4716981132075472 800 0 1600;M 0 0 Q 0.46296296296296297 800 0 1600;M 0 0 Q -0.45454545454545453 800 0 1600;M 0 0 Q 0.44642857142857145 800 0 1600;M 0 0 Q -0.43859649122807015 800 0 1600;M 0 0 Q 0.43103448275862066 800 0 1600;M 0 0 Q -0.423728813559322 800 0 1600;M 0 0 Q 0.4166666666666667 800 0 1600;M 0 0 Q -0.4098360655737705 800 0 1600;M 0 0 Q 0.4032258064516129 800 0 1600;M 0 0 Q -0.3968253968253968 800 0 1600;M 0 0 Q 0.390625 800 0 1600;M 0 0 Q -0.38461538461538464 800 0 1600;M 0 0 Q 0.3787878787878788 800 0 1600;M 0 0 Q -0.373134328358209 800 0 1600;M 0 0 Q 0.36764705882352944 800 0 1600;M 0 0 Q -0.36231884057971014 800 0 1600;M 0 0 Q 0.35714285714285715 800 0 1600;M 0 0 Q -0.352112676056338 800 0 1600;M 0 0 Q 0.3472222222222222 800 0 1600;M 0 0 Q -0.3424657534246575 800 0 1600;M 0 0 Q 0.33783783783783783 800 0 1600;M 0 0 Q -0.3333333333333333 800 0 1600;M 0 0 Q 0.32894736842105265 800 0 1600;M 0 0 Q -0.3246753246753247 800 0 1600;M 0 0 Q 0.32051282051282054 800 0 1600;M 0 0 Q -0.31645569620253167 800 0 1600;M 0 0 Q 0.3125 800 0 1600;M 0 0 Q -0.30864197530864196 800 0 1600;M 0 0 Q 0.3048780487804878 800 0 1600;M 0 0 Q -0.30120481927710846 800 0 1600;M 0 0 Q 0.2976190476190476 800 0 1600;M 0 0 Q -0.29411764705882354 800 0 1600;M 0 0 Q 0.29069767441860467 800 0 1600;M 0 0 Q -0.28735632183908044 800 0 1600;M 0 0 Q 0.2840909090909091 800 0 1600;M 0 0 Q -0.2808988764044944 800 0 1600;M 0 0 Q 0.2777777777777778 800 0 1600;M 0 0 Q -0.27472527472527475 800 0 1600;M 0 0 Q 0.2717391304347826 800 0 1600;M 0 0 Q -0.26881720430107525 800 0 1600;M 0 0 Q 0.26595744680851063 800 0 1600;M 0 0 Q -0.2631578947368421 800 0 1600;M 0 0 Q 0.2604166666666667 800 0 1600;M 0 0 Q -0.25773195876288657 800 0 1600;M 0 0 Q 0.25510204081632654 800 0 1600;M 0 0 Q -0.25252525252525254 800 0 1600;M 0 0 Q 0.25 800 0 1600'
               dur="37.14s"
               repeatCount="1"/>
            </path>
            <rect width="15" height="5150" x="500" y="1600" fill='#b8b8b8'/>
            {/* <g className='circle' style={{display: pitchBinding[j] == pitch_note ? 'block' : 'none'}}><circle r="40" cx={fret_heigh_increment/6} cy={distance_from_nut+(distance_to_nut*(1-1/((2**(1/12))**(i+1)))-distance_from_nut)/2} fill='darkblue' id={pitch_note}/><text textAnchor="middle" x={-fret_heigh_increment/6} y={distance_from_nut+(distance_to_nut*(1-1/((2**(1/12))**(i+1)))-distance_from_nut)/2+30} fill='whitesmoke' style={{fontSize: '5em'}}>{pitch_note}</text></g>, <rect height={fret_size} width={fret_height} x={-fret_heigh_increment/2} y={distance_from_nut} key={i} fill='transparent' fillOpacity="0" note={pitch_note} onClick={(e) => {let t_pitchBinding = [...e.target.parentElement.parentElement.parentElement.getAttribute('pitchbinding').split(',')];console.log(t_pitchBinding); t_pitchBinding[j] = pitch_note; setPitchBinding(t_pitchBinding); console.log(e.target.parentElement.querySelector('.circle')); e.target.parentElement.querySelectorAll('.circle')[i].style.display = 'block'; e.target.parentElement.querySelectorAll('.circle')[last_index[j]].style.display = 'none'; last_index[j] = i; console.log(e.target.parentElement.querySelectorAll('.circle')[i].style)}}/> */}
            <rect width={(2**(1/12))**1*75} height="1650" x={500-((2**(1/12))**1*75)/3} fill='transparent' fillOpacity="0" id='string-1' data-tune={guitarTuning[0]} datacurrenttune={pitchBinding[0]} onMouseDownCapture={(e)=>{if (e.target.getAttribute("isPressed") == undefined) {e.target.setAttribute("isPressed",'');Tone.start();guitar.triggerAttack(e.target.getAttribute('datacurrenttune'));console.log('attack');console.log(e.target.parentElement);e.target.parentElement.querySelector("path#string0wiggly").children[0].beginElement();console.log(e.target.parentElement.querySelector("path#string0wiggly").children[0])}}} onMouseUpCapture={(e)=>{if (e.target.getAttribute("isPressed") != undefined) {e.target.removeAttribute("isPressed");Tone.start();guitar.triggerRelease(e.target.getAttribute('datacurrenttune'));console.log('release')}}} onMouseOutCapture={(e)=>{if (e.target.getAttribute("isPressed") != undefined) {e.target.removeAttribute("isPressed");Tone.start();guitar.triggerRelease(e.target.getAttribute('datacurrenttune'));console.log('release')}}}/>
            <g transform='rotate(179.9) translate(-500, -5500) scale(-1,1)'>
               {/* needs to be fixed by simply adding sub zero index to last_index array */}
               { /*
               t_frets_triggers = [...t_frets_triggers, <g className='circle' style={{display: pitchBinding[j] == pitch_note ? 'block' : 'none'}}><circle r="40" cx={fret_heigh_increment/6} cy={distance_from_nut+(distance_to_nut*(1-1/((2**(1/12))**(i+1)))-distance_from_nut)/2} fill='darkblue' id={pitch_note}/><text textAnchor="middle" x={-fret_heigh_increment/6} y={distance_from_nut+(distance_to_nut*(1-1/((2**(1/12))**(i+1)))-distance_from_nut)/2+30} fill='whitesmoke' style={{fontSize: '5em'}}>{pitch_note}</text></g>, <rect height={fret_size} width={fret_height} x={-fret_heigh_increment/2} y={distance_from_nut} key={i} fill='transparent' fillOpacity="0" note={pitch_note} onClick={(e) => {let t_pitchBinding = [...e.target.parentElement.parentElement.parentElement.getAttribute('pitchbinding').split(',')];console.log(t_pitchBinding); t_pitchBinding[j] = pitch_note; setPitchBinding(t_pitchBinding); console.log(e.target.parentElement.querySelector('.circle')); e.target.parentElement.querySelectorAll('.circle')[i].style.display = 'block'; e.target.parentElement.querySelectorAll('.circle')[last_index[j]].style.display = 'none'; last_index[j] = i; console.log(e.target.parentElement.querySelectorAll('.circle')[i].style)}}/>]; 
               */}
               {/* <g className='circle' style={{display: pitchBinding[0] == guitarTuning[0] ? 'block' : 'none'}}><circle r="40" cx={-((2**(1/12))**0*30/2)/6} cy={-320+(distance_to_nut*(1-1/((2**(1/12))**(0+1)))-320)/2} fill='darkblue' id={guitarTuning[0]}/><text textAnchor="middle" x={((2**(1/12))**0*30/2)/6} y={-320+(distance_to_nut*(1-1/((2**(1/12))**(0+1)))-320)/2+30} fill='whitesmoke' style={{fontSize: '5em'}}>{guitarTuning[0]}</text></g>
               <rect height={distance_to_nut*((1-1/((2**(1/12))**0))-(1-1/((2**(1/12))**(0-1))))} width={(2**(1/12))**1*30*2} x={-((2**(1/12))**0*30/2)} y={-320} key={0} fill='transparent' fillOpacity="0" note={guitarTuning[0]} onClickCapture={(e)=>{let t_pitchBinding = [...pitchBinding];console.log(t_pitchBinding);e.target.parentElement.querySelectorAll('.circle')[last_index[0]].style.display = 'none';t_pitchBinding[0] = guitarTuning[0]; setPitchBinding(t_pitchBinding); console.log(last_index[0]); last_index[0] = 0;}}/> */}
               { stringsTriggers[0] }
            </g>
         </g>
         <g transform='rotate(1)'>
            <path d="M 0 0 Q 0 0 0 1600" stroke="#b8b8b8" fill="transparent" strokeWidth="17.5" id='string1wiggly' transform="translate(408.75)">
               <animate
               attributeName="d"
               values='M 0 0 Q 50 800 0 1600;M 0 0 Q -25.0 800 0 1600;M 0 0 Q 12.5 800 0 1600;M 0 0 Q -8.333333333333334 800 0 1600;M 0 0 Q 6.25 800 0 1600;M 0 0 Q -5.0 800 0 1600;M 0 0 Q 4.166666666666667 800 0 1600;M 0 0 Q -3.5714285714285716 800 0 1600;M 0 0 Q 3.125 800 0 1600;M 0 0 Q -2.7777777777777777 800 0 1600;M 0 0 Q 2.5 800 0 1600;M 0 0 Q -2.272727272727273 800 0 1600;M 0 0 Q 2.0833333333333335 800 0 1600;M 0 0 Q -1.9230769230769231 800 0 1600;M 0 0 Q 1.7857142857142858 800 0 1600;M 0 0 Q -1.6666666666666667 800 0 1600;M 0 0 Q 1.5625 800 0 1600;M 0 0 Q -1.4705882352941178 800 0 1600;M 0 0 Q 1.3888888888888888 800 0 1600;M 0 0 Q -1.3157894736842106 800 0 1600;M 0 0 Q 1.25 800 0 1600;M 0 0 Q -1.1904761904761905 800 0 1600;M 0 0 Q 1.1363636363636365 800 0 1600;M 0 0 Q -1.0869565217391304 800 0 1600;M 0 0 Q 1.0416666666666667 800 0 1600;M 0 0 Q -1.0 800 0 1600;M 0 0 Q 0.9615384615384616 800 0 1600;M 0 0 Q -0.9259259259259259 800 0 1600;M 0 0 Q 0.8928571428571429 800 0 1600;M 0 0 Q -0.8620689655172413 800 0 1600;M 0 0 Q 0.8333333333333334 800 0 1600;M 0 0 Q -0.8064516129032258 800 0 1600;M 0 0 Q 0.78125 800 0 1600;M 0 0 Q -0.7575757575757576 800 0 1600;M 0 0 Q 0.7352941176470589 800 0 1600;M 0 0 Q -0.7142857142857143 800 0 1600;M 0 0 Q 0.6944444444444444 800 0 1600;M 0 0 Q -0.6756756756756757 800 0 1600;M 0 0 Q 0.6578947368421053 800 0 1600;M 0 0 Q -0.6410256410256411 800 0 1600;M 0 0 Q 0.625 800 0 1600;M 0 0 Q -0.6097560975609756 800 0 1600;M 0 0 Q 0.5952380952380952 800 0 1600;M 0 0 Q -0.5813953488372093 800 0 1600;M 0 0 Q 0.5681818181818182 800 0 1600;M 0 0 Q -0.5555555555555556 800 0 1600;M 0 0 Q 0.5434782608695652 800 0 1600;M 0 0 Q -0.5319148936170213 800 0 1600;M 0 0 Q 0.5208333333333334 800 0 1600;M 0 0 Q -0.5102040816326531 800 0 1600;M 0 0 Q 0.5 800 0 1600;M 0 0 Q -0.49019607843137253 800 0 1600;M 0 0 Q 0.4807692307692308 800 0 1600;M 0 0 Q -0.4716981132075472 800 0 1600;M 0 0 Q 0.46296296296296297 800 0 1600;M 0 0 Q -0.45454545454545453 800 0 1600;M 0 0 Q 0.44642857142857145 800 0 1600;M 0 0 Q -0.43859649122807015 800 0 1600;M 0 0 Q 0.43103448275862066 800 0 1600;M 0 0 Q -0.423728813559322 800 0 1600;M 0 0 Q 0.4166666666666667 800 0 1600;M 0 0 Q -0.4098360655737705 800 0 1600;M 0 0 Q 0.4032258064516129 800 0 1600;M 0 0 Q -0.3968253968253968 800 0 1600;M 0 0 Q 0.390625 800 0 1600;M 0 0 Q -0.38461538461538464 800 0 1600;M 0 0 Q 0.3787878787878788 800 0 1600;M 0 0 Q -0.373134328358209 800 0 1600;M 0 0 Q 0.36764705882352944 800 0 1600;M 0 0 Q -0.36231884057971014 800 0 1600;M 0 0 Q 0.35714285714285715 800 0 1600;M 0 0 Q -0.352112676056338 800 0 1600;M 0 0 Q 0.3472222222222222 800 0 1600;M 0 0 Q -0.3424657534246575 800 0 1600;M 0 0 Q 0.33783783783783783 800 0 1600;M 0 0 Q -0.3333333333333333 800 0 1600;M 0 0 Q 0.32894736842105265 800 0 1600;M 0 0 Q -0.3246753246753247 800 0 1600;M 0 0 Q 0.32051282051282054 800 0 1600;M 0 0 Q -0.31645569620253167 800 0 1600;M 0 0 Q 0.3125 800 0 1600;M 0 0 Q -0.30864197530864196 800 0 1600;M 0 0 Q 0.3048780487804878 800 0 1600;M 0 0 Q -0.30120481927710846 800 0 1600;M 0 0 Q 0.2976190476190476 800 0 1600;M 0 0 Q -0.29411764705882354 800 0 1600;M 0 0 Q 0.29069767441860467 800 0 1600;M 0 0 Q -0.28735632183908044 800 0 1600;M 0 0 Q 0.2840909090909091 800 0 1600;M 0 0 Q -0.2808988764044944 800 0 1600;M 0 0 Q 0.2777777777777778 800 0 1600;M 0 0 Q -0.27472527472527475 800 0 1600;M 0 0 Q 0.2717391304347826 800 0 1600;M 0 0 Q -0.26881720430107525 800 0 1600;M 0 0 Q 0.26595744680851063 800 0 1600;M 0 0 Q -0.2631578947368421 800 0 1600;M 0 0 Q 0.2604166666666667 800 0 1600;M 0 0 Q -0.25773195876288657 800 0 1600;M 0 0 Q 0.25510204081632654 800 0 1600;M 0 0 Q -0.25252525252525254 800 0 1600;M 0 0 Q 0.25 800 0 1600'
               dur="37.14s"
               repeatCount="1"/>
            </path>
            <rect width="17.5" height="4950" x="400" y="1600" fill='#b8b8b8'/>
            <rect width={(2**(1/12))**1*75} height="1650" x={400-((2**(1/12))**1*75)/3} fill='transparent' fillOpacity="0" id='string-2' data-tune={guitarTuning[1]} datacurrenttune={pitchBinding[1]} onMouseDownCapture={(e)=>{if (e.target.getAttribute("isPressed") == undefined) {e.target.setAttribute("isPressed",'');Tone.start();guitar.triggerAttack(e.target.getAttribute('datacurrenttune'));console.log('attack');console.log(e.target.parentElement);e.target.parentElement.querySelector("path#string1wiggly").children[0].beginElement();console.log(e.target.parentElement.querySelector("path#string1wiggly").children[0])}}} onMouseUpCapture={(e)=>{if (e.target.getAttribute("isPressed") != undefined) {e.target.removeAttribute("isPressed");Tone.start();guitar.triggerRelease(e.target.getAttribute('datacurrenttune'));console.log('release')}}} onMouseOutCapture={(e)=>{if (e.target.getAttribute("isPressed") != undefined) {e.target.removeAttribute("isPressed");Tone.start();guitar.triggerRelease(e.target.getAttribute('datacurrenttune'));console.log('release')}}}/>
            <g transform='rotate(180) translate(-400, -5500) scale(-1,1)'> 
               {/* <rect height={distance_to_nut*((1-1/((2**(1/12))**0))-(1-1/((2**(1/12))**(0-1))))} width={(2**(1/12))**1*30*2} x={-((2**(1/12))**0*30/2)} y={-320} key={1} fill='transparent' fillOpacity="0" note={guitarTuning[1]} onClickCapture={(e)=>{let t_pitchBinding = [...pitchBinding];t_pitchBinding[1] = guitarTuning[1];setPitchBinding(t_pitchBinding)}}/> */}
               { stringsTriggers[1] }
            </g>
         </g>
         <g transform='rotate(0.65)'>
            <path d="M 0 0 Q 0 0 0 1600" stroke="#b8b8b8" fill="transparent" strokeWidth="20" id='string2wiggly' transform="translate(310)">
               <animate
               attributeName="d"
               values='M 0 0 Q 50 800 0 1600;M 0 0 Q -25.0 800 0 1600;M 0 0 Q 12.5 800 0 1600;M 0 0 Q -8.333333333333334 800 0 1600;M 0 0 Q 6.25 800 0 1600;M 0 0 Q -5.0 800 0 1600;M 0 0 Q 4.166666666666667 800 0 1600;M 0 0 Q -3.5714285714285716 800 0 1600;M 0 0 Q 3.125 800 0 1600;M 0 0 Q -2.7777777777777777 800 0 1600;M 0 0 Q 2.5 800 0 1600;M 0 0 Q -2.272727272727273 800 0 1600;M 0 0 Q 2.0833333333333335 800 0 1600;M 0 0 Q -1.9230769230769231 800 0 1600;M 0 0 Q 1.7857142857142858 800 0 1600;M 0 0 Q -1.6666666666666667 800 0 1600;M 0 0 Q 1.5625 800 0 1600;M 0 0 Q -1.4705882352941178 800 0 1600;M 0 0 Q 1.3888888888888888 800 0 1600;M 0 0 Q -1.3157894736842106 800 0 1600;M 0 0 Q 1.25 800 0 1600;M 0 0 Q -1.1904761904761905 800 0 1600;M 0 0 Q 1.1363636363636365 800 0 1600;M 0 0 Q -1.0869565217391304 800 0 1600;M 0 0 Q 1.0416666666666667 800 0 1600;M 0 0 Q -1.0 800 0 1600;M 0 0 Q 0.9615384615384616 800 0 1600;M 0 0 Q -0.9259259259259259 800 0 1600;M 0 0 Q 0.8928571428571429 800 0 1600;M 0 0 Q -0.8620689655172413 800 0 1600;M 0 0 Q 0.8333333333333334 800 0 1600;M 0 0 Q -0.8064516129032258 800 0 1600;M 0 0 Q 0.78125 800 0 1600;M 0 0 Q -0.7575757575757576 800 0 1600;M 0 0 Q 0.7352941176470589 800 0 1600;M 0 0 Q -0.7142857142857143 800 0 1600;M 0 0 Q 0.6944444444444444 800 0 1600;M 0 0 Q -0.6756756756756757 800 0 1600;M 0 0 Q 0.6578947368421053 800 0 1600;M 0 0 Q -0.6410256410256411 800 0 1600;M 0 0 Q 0.625 800 0 1600;M 0 0 Q -0.6097560975609756 800 0 1600;M 0 0 Q 0.5952380952380952 800 0 1600;M 0 0 Q -0.5813953488372093 800 0 1600;M 0 0 Q 0.5681818181818182 800 0 1600;M 0 0 Q -0.5555555555555556 800 0 1600;M 0 0 Q 0.5434782608695652 800 0 1600;M 0 0 Q -0.5319148936170213 800 0 1600;M 0 0 Q 0.5208333333333334 800 0 1600;M 0 0 Q -0.5102040816326531 800 0 1600;M 0 0 Q 0.5 800 0 1600;M 0 0 Q -0.49019607843137253 800 0 1600;M 0 0 Q 0.4807692307692308 800 0 1600;M 0 0 Q -0.4716981132075472 800 0 1600;M 0 0 Q 0.46296296296296297 800 0 1600;M 0 0 Q -0.45454545454545453 800 0 1600;M 0 0 Q 0.44642857142857145 800 0 1600;M 0 0 Q -0.43859649122807015 800 0 1600;M 0 0 Q 0.43103448275862066 800 0 1600;M 0 0 Q -0.423728813559322 800 0 1600;M 0 0 Q 0.4166666666666667 800 0 1600;M 0 0 Q -0.4098360655737705 800 0 1600;M 0 0 Q 0.4032258064516129 800 0 1600;M 0 0 Q -0.3968253968253968 800 0 1600;M 0 0 Q 0.390625 800 0 1600;M 0 0 Q -0.38461538461538464 800 0 1600;M 0 0 Q 0.3787878787878788 800 0 1600;M 0 0 Q -0.373134328358209 800 0 1600;M 0 0 Q 0.36764705882352944 800 0 1600;M 0 0 Q -0.36231884057971014 800 0 1600;M 0 0 Q 0.35714285714285715 800 0 1600;M 0 0 Q -0.352112676056338 800 0 1600;M 0 0 Q 0.3472222222222222 800 0 1600;M 0 0 Q -0.3424657534246575 800 0 1600;M 0 0 Q 0.33783783783783783 800 0 1600;M 0 0 Q -0.3333333333333333 800 0 1600;M 0 0 Q 0.32894736842105265 800 0 1600;M 0 0 Q -0.3246753246753247 800 0 1600;M 0 0 Q 0.32051282051282054 800 0 1600;M 0 0 Q -0.31645569620253167 800 0 1600;M 0 0 Q 0.3125 800 0 1600;M 0 0 Q -0.30864197530864196 800 0 1600;M 0 0 Q 0.3048780487804878 800 0 1600;M 0 0 Q -0.30120481927710846 800 0 1600;M 0 0 Q 0.2976190476190476 800 0 1600;M 0 0 Q -0.29411764705882354 800 0 1600;M 0 0 Q 0.29069767441860467 800 0 1600;M 0 0 Q -0.28735632183908044 800 0 1600;M 0 0 Q 0.2840909090909091 800 0 1600;M 0 0 Q -0.2808988764044944 800 0 1600;M 0 0 Q 0.2777777777777778 800 0 1600;M 0 0 Q -0.27472527472527475 800 0 1600;M 0 0 Q 0.2717391304347826 800 0 1600;M 0 0 Q -0.26881720430107525 800 0 1600;M 0 0 Q 0.26595744680851063 800 0 1600;M 0 0 Q -0.2631578947368421 800 0 1600;M 0 0 Q 0.2604166666666667 800 0 1600;M 0 0 Q -0.25773195876288657 800 0 1600;M 0 0 Q 0.25510204081632654 800 0 1600;M 0 0 Q -0.25252525252525254 800 0 1600;M 0 0 Q 0.25 800 0 1600'
               dur="42.14s"
               repeatCount="1"/>
            </path>
            <rect width="20" height="4800" x="300" y="1600" fill='#b8b8b8'/>
            <rect width={(2**(1/12))**1*75} height="1650" x={300-((2**(1/12))**1*75)/3} fill='transparent' fillOpacity="0" id='string-3' data-tune={guitarTuning[2]} datacurrenttune={pitchBinding[2]} onMouseDownCapture={(e)=>{if (e.target.getAttribute("isPressed") == undefined) {e.target.setAttribute("isPressed",'');Tone.start();guitar.triggerAttack(e.target.getAttribute('datacurrenttune'));console.log('attack');console.log(e.target.parentElement);e.target.parentElement.querySelector("path#string2wiggly").children[0].beginElement();console.log(e.target.parentElement.querySelector("path#string2wiggly").children[0])}}} onMouseUpCapture={(e)=>{if (e.target.getAttribute("isPressed") != undefined) {e.target.removeAttribute("isPressed");Tone.start();guitar.triggerRelease(e.target.getAttribute('datacurrenttune'));console.log('release')}}} onMouseOutCapture={(e)=>{if (e.target.getAttribute("isPressed") != undefined) {e.target.removeAttribute("isPressed");Tone.start();guitar.triggerRelease(e.target.getAttribute('datacurrenttune'));console.log('release')}}}/>
            <g transform='rotate(180) translate(-300, -5500) scale(-1,1)'>
               {/* <rect height={distance_to_nut*((1-1/((2**(1/12))**0))-(1-1/((2**(1/12))**(0-1))))} width={(2**(1/12))**1*30*2} x={-((2**(1/12))**0*30/2)} y={-320} key={2} fill='transparent' fillOpacity="0" note={guitarTuning[2]} onClickCapture={(e)=>{let t_pitchBinding = [...pitchBinding];t_pitchBinding[2] = guitarTuning[2];setPitchBinding(t_pitchBinding)}}/> */}
               { stringsTriggers[2] }
            </g>
         </g>
         <g transform='rotate(0.25)'>
            <path d="M 0 0 Q 0 0 0 1600" stroke="#b8b8b8" fill="transparent" strokeWidth="22.5" id='string3wiggly' transform="translate(211.25)">
               <animate
               attributeName="d"
               values='M 0 0 Q 50 800 0 1600;M 0 0 Q -25.0 800 0 1600;M 0 0 Q 12.5 800 0 1600;M 0 0 Q -8.333333333333334 800 0 1600;M 0 0 Q 6.25 800 0 1600;M 0 0 Q -5.0 800 0 1600;M 0 0 Q 4.166666666666667 800 0 1600;M 0 0 Q -3.5714285714285716 800 0 1600;M 0 0 Q 3.125 800 0 1600;M 0 0 Q -2.7777777777777777 800 0 1600;M 0 0 Q 2.5 800 0 1600;M 0 0 Q -2.272727272727273 800 0 1600;M 0 0 Q 2.0833333333333335 800 0 1600;M 0 0 Q -1.9230769230769231 800 0 1600;M 0 0 Q 1.7857142857142858 800 0 1600;M 0 0 Q -1.6666666666666667 800 0 1600;M 0 0 Q 1.5625 800 0 1600;M 0 0 Q -1.4705882352941178 800 0 1600;M 0 0 Q 1.3888888888888888 800 0 1600;M 0 0 Q -1.3157894736842106 800 0 1600;M 0 0 Q 1.25 800 0 1600;M 0 0 Q -1.1904761904761905 800 0 1600;M 0 0 Q 1.1363636363636365 800 0 1600;M 0 0 Q -1.0869565217391304 800 0 1600;M 0 0 Q 1.0416666666666667 800 0 1600;M 0 0 Q -1.0 800 0 1600;M 0 0 Q 0.9615384615384616 800 0 1600;M 0 0 Q -0.9259259259259259 800 0 1600;M 0 0 Q 0.8928571428571429 800 0 1600;M 0 0 Q -0.8620689655172413 800 0 1600;M 0 0 Q 0.8333333333333334 800 0 1600;M 0 0 Q -0.8064516129032258 800 0 1600;M 0 0 Q 0.78125 800 0 1600;M 0 0 Q -0.7575757575757576 800 0 1600;M 0 0 Q 0.7352941176470589 800 0 1600;M 0 0 Q -0.7142857142857143 800 0 1600;M 0 0 Q 0.6944444444444444 800 0 1600;M 0 0 Q -0.6756756756756757 800 0 1600;M 0 0 Q 0.6578947368421053 800 0 1600;M 0 0 Q -0.6410256410256411 800 0 1600;M 0 0 Q 0.625 800 0 1600;M 0 0 Q -0.6097560975609756 800 0 1600;M 0 0 Q 0.5952380952380952 800 0 1600;M 0 0 Q -0.5813953488372093 800 0 1600;M 0 0 Q 0.5681818181818182 800 0 1600;M 0 0 Q -0.5555555555555556 800 0 1600;M 0 0 Q 0.5434782608695652 800 0 1600;M 0 0 Q -0.5319148936170213 800 0 1600;M 0 0 Q 0.5208333333333334 800 0 1600;M 0 0 Q -0.5102040816326531 800 0 1600;M 0 0 Q 0.5 800 0 1600;M 0 0 Q -0.49019607843137253 800 0 1600;M 0 0 Q 0.4807692307692308 800 0 1600;M 0 0 Q -0.4716981132075472 800 0 1600;M 0 0 Q 0.46296296296296297 800 0 1600;M 0 0 Q -0.45454545454545453 800 0 1600;M 0 0 Q 0.44642857142857145 800 0 1600;M 0 0 Q -0.43859649122807015 800 0 1600;M 0 0 Q 0.43103448275862066 800 0 1600;M 0 0 Q -0.423728813559322 800 0 1600;M 0 0 Q 0.4166666666666667 800 0 1600;M 0 0 Q -0.4098360655737705 800 0 1600;M 0 0 Q 0.4032258064516129 800 0 1600;M 0 0 Q -0.3968253968253968 800 0 1600;M 0 0 Q 0.390625 800 0 1600;M 0 0 Q -0.38461538461538464 800 0 1600;M 0 0 Q 0.3787878787878788 800 0 1600;M 0 0 Q -0.373134328358209 800 0 1600;M 0 0 Q 0.36764705882352944 800 0 1600;M 0 0 Q -0.36231884057971014 800 0 1600;M 0 0 Q 0.35714285714285715 800 0 1600;M 0 0 Q -0.352112676056338 800 0 1600;M 0 0 Q 0.3472222222222222 800 0 1600;M 0 0 Q -0.3424657534246575 800 0 1600;M 0 0 Q 0.33783783783783783 800 0 1600;M 0 0 Q -0.3333333333333333 800 0 1600;M 0 0 Q 0.32894736842105265 800 0 1600;M 0 0 Q -0.3246753246753247 800 0 1600;M 0 0 Q 0.32051282051282054 800 0 1600;M 0 0 Q -0.31645569620253167 800 0 1600;M 0 0 Q 0.3125 800 0 1600;M 0 0 Q -0.30864197530864196 800 0 1600;M 0 0 Q 0.3048780487804878 800 0 1600;M 0 0 Q -0.30120481927710846 800 0 1600;M 0 0 Q 0.2976190476190476 800 0 1600;M 0 0 Q -0.29411764705882354 800 0 1600;M 0 0 Q 0.29069767441860467 800 0 1600;M 0 0 Q -0.28735632183908044 800 0 1600;M 0 0 Q 0.2840909090909091 800 0 1600;M 0 0 Q -0.2808988764044944 800 0 1600;M 0 0 Q 0.2777777777777778 800 0 1600;M 0 0 Q -0.27472527472527475 800 0 1600;M 0 0 Q 0.2717391304347826 800 0 1600;M 0 0 Q -0.26881720430107525 800 0 1600;M 0 0 Q 0.26595744680851063 800 0 1600;M 0 0 Q -0.2631578947368421 800 0 1600;M 0 0 Q 0.2604166666666667 800 0 1600;M 0 0 Q -0.25773195876288657 800 0 1600;M 0 0 Q 0.25510204081632654 800 0 1600;M 0 0 Q -0.25252525252525254 800 0 1600;M 0 0 Q 0.25 800 0 1600'
               dur="47.14s"
               repeatCount="1"/>
            </path>
            <rect width="22.5" height="4600" y="1600" x="200" fill='#b8b8b8'/>
            <rect width={(2**(1/12))**1*75} height="1650" x={200-((2**(1/12))**1*75)/3} fill='transparent' fillOpacity="0" id='string-4' data-tune={guitarTuning[3]} datacurrenttune={pitchBinding[3]} onMouseDownCapture={(e)=>{if (e.target.getAttribute("isPressed") == undefined) {e.target.setAttribute("isPressed",'');Tone.start();guitar.triggerAttack(e.target.getAttribute('datacurrenttune'));console.log('attack');console.log(e.target.parentElement);e.target.parentElement.querySelector("path#string3wiggly").children[0].beginElement();console.log(e.target.parentElement.querySelector("path#string3wiggly").children[0])}}} onMouseUpCapture={(e)=>{if (e.target.getAttribute("isPressed") != undefined) {e.target.removeAttribute("isPressed");Tone.start();guitar.triggerRelease(e.target.getAttribute('datacurrenttune'));console.log('release')}}} onMouseOutCapture={(e)=>{if (e.target.getAttribute("isPressed") != undefined) {e.target.removeAttribute("isPressed");Tone.start();guitar.triggerRelease(e.target.getAttribute('datacurrenttune'));console.log('release')}}}/>
            <g transform='rotate(180) translate(-200, -5500) scale(-1,1)'>
               {/* <rect height={distance_to_nut*((1-1/((2**(1/12))**0))-(1-1/((2**(1/12))**(0-1))))} width={(2**(1/12))**1*30*2} x={-((2**(1/12))**0*30/2)} y={-320} key={3}  fill='transparent' fillOpacity="0" note={guitarTuning[3]} onClickCapture={(e)=>{let t_pitchBinding = [...pitchBinding];t_pitchBinding[3] = guitarTuning[3];setPitchBinding(t_pitchBinding)}}/> */}
               { stringsTriggers[3] }
            </g>
         </g>
         <g transform='rotate(-0.05)'>
            <path d="M 0 0 Q 0 0 0 1600" stroke="#b8b8b8" fill="transparent" strokeWidth="25" id='string4wiggly' transform="translate(113.75)">
               <animate
               attributeName="d"
               values='M 0 0 Q 50 800 0 1600;M 0 0 Q -25.0 800 0 1600;M 0 0 Q 12.5 800 0 1600;M 0 0 Q -8.333333333333334 800 0 1600;M 0 0 Q 6.25 800 0 1600;M 0 0 Q -5.0 800 0 1600;M 0 0 Q 4.166666666666667 800 0 1600;M 0 0 Q -3.5714285714285716 800 0 1600;M 0 0 Q 3.125 800 0 1600;M 0 0 Q -2.7777777777777777 800 0 1600;M 0 0 Q 2.5 800 0 1600;M 0 0 Q -2.272727272727273 800 0 1600;M 0 0 Q 2.0833333333333335 800 0 1600;M 0 0 Q -1.9230769230769231 800 0 1600;M 0 0 Q 1.7857142857142858 800 0 1600;M 0 0 Q -1.6666666666666667 800 0 1600;M 0 0 Q 1.5625 800 0 1600;M 0 0 Q -1.4705882352941178 800 0 1600;M 0 0 Q 1.3888888888888888 800 0 1600;M 0 0 Q -1.3157894736842106 800 0 1600;M 0 0 Q 1.25 800 0 1600;M 0 0 Q -1.1904761904761905 800 0 1600;M 0 0 Q 1.1363636363636365 800 0 1600;M 0 0 Q -1.0869565217391304 800 0 1600;M 0 0 Q 1.0416666666666667 800 0 1600;M 0 0 Q -1.0 800 0 1600;M 0 0 Q 0.9615384615384616 800 0 1600;M 0 0 Q -0.9259259259259259 800 0 1600;M 0 0 Q 0.8928571428571429 800 0 1600;M 0 0 Q -0.8620689655172413 800 0 1600;M 0 0 Q 0.8333333333333334 800 0 1600;M 0 0 Q -0.8064516129032258 800 0 1600;M 0 0 Q 0.78125 800 0 1600;M 0 0 Q -0.7575757575757576 800 0 1600;M 0 0 Q 0.7352941176470589 800 0 1600;M 0 0 Q -0.7142857142857143 800 0 1600;M 0 0 Q 0.6944444444444444 800 0 1600;M 0 0 Q -0.6756756756756757 800 0 1600;M 0 0 Q 0.6578947368421053 800 0 1600;M 0 0 Q -0.6410256410256411 800 0 1600;M 0 0 Q 0.625 800 0 1600;M 0 0 Q -0.6097560975609756 800 0 1600;M 0 0 Q 0.5952380952380952 800 0 1600;M 0 0 Q -0.5813953488372093 800 0 1600;M 0 0 Q 0.5681818181818182 800 0 1600;M 0 0 Q -0.5555555555555556 800 0 1600;M 0 0 Q 0.5434782608695652 800 0 1600;M 0 0 Q -0.5319148936170213 800 0 1600;M 0 0 Q 0.5208333333333334 800 0 1600;M 0 0 Q -0.5102040816326531 800 0 1600;M 0 0 Q 0.5 800 0 1600;M 0 0 Q -0.49019607843137253 800 0 1600;M 0 0 Q 0.4807692307692308 800 0 1600;M 0 0 Q -0.4716981132075472 800 0 1600;M 0 0 Q 0.46296296296296297 800 0 1600;M 0 0 Q -0.45454545454545453 800 0 1600;M 0 0 Q 0.44642857142857145 800 0 1600;M 0 0 Q -0.43859649122807015 800 0 1600;M 0 0 Q 0.43103448275862066 800 0 1600;M 0 0 Q -0.423728813559322 800 0 1600;M 0 0 Q 0.4166666666666667 800 0 1600;M 0 0 Q -0.4098360655737705 800 0 1600;M 0 0 Q 0.4032258064516129 800 0 1600;M 0 0 Q -0.3968253968253968 800 0 1600;M 0 0 Q 0.390625 800 0 1600;M 0 0 Q -0.38461538461538464 800 0 1600;M 0 0 Q 0.3787878787878788 800 0 1600;M 0 0 Q -0.373134328358209 800 0 1600;M 0 0 Q 0.36764705882352944 800 0 1600;M 0 0 Q -0.36231884057971014 800 0 1600;M 0 0 Q 0.35714285714285715 800 0 1600;M 0 0 Q -0.352112676056338 800 0 1600;M 0 0 Q 0.3472222222222222 800 0 1600;M 0 0 Q -0.3424657534246575 800 0 1600;M 0 0 Q 0.33783783783783783 800 0 1600;M 0 0 Q -0.3333333333333333 800 0 1600;M 0 0 Q 0.32894736842105265 800 0 1600;M 0 0 Q -0.3246753246753247 800 0 1600;M 0 0 Q 0.32051282051282054 800 0 1600;M 0 0 Q -0.31645569620253167 800 0 1600;M 0 0 Q 0.3125 800 0 1600;M 0 0 Q -0.30864197530864196 800 0 1600;M 0 0 Q 0.3048780487804878 800 0 1600;M 0 0 Q -0.30120481927710846 800 0 1600;M 0 0 Q 0.2976190476190476 800 0 1600;M 0 0 Q -0.29411764705882354 800 0 1600;M 0 0 Q 0.29069767441860467 800 0 1600;M 0 0 Q -0.28735632183908044 800 0 1600;M 0 0 Q 0.2840909090909091 800 0 1600;M 0 0 Q -0.2808988764044944 800 0 1600;M 0 0 Q 0.2777777777777778 800 0 1600;M 0 0 Q -0.27472527472527475 800 0 1600;M 0 0 Q 0.2717391304347826 800 0 1600;M 0 0 Q -0.26881720430107525 800 0 1600;M 0 0 Q 0.26595744680851063 800 0 1600;M 0 0 Q -0.2631578947368421 800 0 1600;M 0 0 Q 0.2604166666666667 800 0 1600;M 0 0 Q -0.25773195876288657 800 0 1600;M 0 0 Q 0.25510204081632654 800 0 1600;M 0 0 Q -0.25252525252525254 800 0 1600;M 0 0 Q 0.25 800 0 1600'
               dur="52.14s"
               repeatCount="1"/>
            </path>
            <rect width="25" height="4400" y="1600" x="100" fill='#b8b8b8'/>
            <rect width={(2**(1/12))**1*75} height="1650" x={100-((2**(1/12))**1*75)/3} fill='transparent' fillOpacity="0" id='string-5' data-tune={guitarTuning[4]} datacurrenttune={pitchBinding[4]} onMouseDownCapture={(e)=>{if (e.target.getAttribute("isPressed") == undefined) {e.target.setAttribute("isPressed",'');Tone.start();guitar.triggerAttack(e.target.getAttribute('datacurrenttune'));console.log('attack');console.log(e.target.parentElement);e.target.parentElement.querySelector("path#string4wiggly").children[0].beginElement();console.log(e.target.parentElement.querySelector("path#string4wiggly").children[0])}}} onMouseUpCapture={(e)=>{if (e.target.getAttribute("isPressed") != undefined) {e.target.removeAttribute("isPressed");Tone.start();guitar.triggerRelease(e.target.getAttribute('datacurrenttune'));console.log('release')}}} onMouseOutCapture={(e)=>{if (e.target.getAttribute("isPressed") != undefined) {e.target.removeAttribute("isPressed");Tone.start();guitar.triggerRelease(e.target.getAttribute('datacurrenttune'));console.log('release')}}}/>
            <g transform='rotate(180) translate(-100, -5500) scale(-1,1)'>
               {/* <rect height={distance_to_nut*((1-1/((2**(1/12))**0))-(1-1/((2**(1/12))**(0-1))))} width={(2**(1/12))**1*30*2} x={-((2**(1/12))**0*30/2)} y={-320} key={4} fill='transparent' fillOpacity="0" note={guitarTuning[4]} onClickCapture={(e)=>{let t_pitchBinding = [...pitchBinding];t_pitchBinding[4] = guitarTuning[4];setPitchBinding(t_pitchBinding)}}/> */}
               { stringsTriggers[4] }
            </g>
         </g>
         <g transform='rotate(-0.55)'>
            <path d="M 0 0 Q 0 0 0 1600" stroke="#b8b8b8" fill="transparent" strokeWidth="27.5" id='string5wiggly' transform="translate(13.75)">
               <animate
               attributeName="d"
               values='M 0 0 Q 50 800 0 1600;M 0 0 Q -25.0 800 0 1600;M 0 0 Q 12.5 800 0 1600;M 0 0 Q -8.333333333333334 800 0 1600;M 0 0 Q 6.25 800 0 1600;M 0 0 Q -5.0 800 0 1600;M 0 0 Q 4.166666666666667 800 0 1600;M 0 0 Q -3.5714285714285716 800 0 1600;M 0 0 Q 3.125 800 0 1600;M 0 0 Q -2.7777777777777777 800 0 1600;M 0 0 Q 2.5 800 0 1600;M 0 0 Q -2.272727272727273 800 0 1600;M 0 0 Q 2.0833333333333335 800 0 1600;M 0 0 Q -1.9230769230769231 800 0 1600;M 0 0 Q 1.7857142857142858 800 0 1600;M 0 0 Q -1.6666666666666667 800 0 1600;M 0 0 Q 1.5625 800 0 1600;M 0 0 Q -1.4705882352941178 800 0 1600;M 0 0 Q 1.3888888888888888 800 0 1600;M 0 0 Q -1.3157894736842106 800 0 1600;M 0 0 Q 1.25 800 0 1600;M 0 0 Q -1.1904761904761905 800 0 1600;M 0 0 Q 1.1363636363636365 800 0 1600;M 0 0 Q -1.0869565217391304 800 0 1600;M 0 0 Q 1.0416666666666667 800 0 1600;M 0 0 Q -1.0 800 0 1600;M 0 0 Q 0.9615384615384616 800 0 1600;M 0 0 Q -0.9259259259259259 800 0 1600;M 0 0 Q 0.8928571428571429 800 0 1600;M 0 0 Q -0.8620689655172413 800 0 1600;M 0 0 Q 0.8333333333333334 800 0 1600;M 0 0 Q -0.8064516129032258 800 0 1600;M 0 0 Q 0.78125 800 0 1600;M 0 0 Q -0.7575757575757576 800 0 1600;M 0 0 Q 0.7352941176470589 800 0 1600;M 0 0 Q -0.7142857142857143 800 0 1600;M 0 0 Q 0.6944444444444444 800 0 1600;M 0 0 Q -0.6756756756756757 800 0 1600;M 0 0 Q 0.6578947368421053 800 0 1600;M 0 0 Q -0.6410256410256411 800 0 1600;M 0 0 Q 0.625 800 0 1600;M 0 0 Q -0.6097560975609756 800 0 1600;M 0 0 Q 0.5952380952380952 800 0 1600;M 0 0 Q -0.5813953488372093 800 0 1600;M 0 0 Q 0.5681818181818182 800 0 1600;M 0 0 Q -0.5555555555555556 800 0 1600;M 0 0 Q 0.5434782608695652 800 0 1600;M 0 0 Q -0.5319148936170213 800 0 1600;M 0 0 Q 0.5208333333333334 800 0 1600;M 0 0 Q -0.5102040816326531 800 0 1600;M 0 0 Q 0.5 800 0 1600;M 0 0 Q -0.49019607843137253 800 0 1600;M 0 0 Q 0.4807692307692308 800 0 1600;M 0 0 Q -0.4716981132075472 800 0 1600;M 0 0 Q 0.46296296296296297 800 0 1600;M 0 0 Q -0.45454545454545453 800 0 1600;M 0 0 Q 0.44642857142857145 800 0 1600;M 0 0 Q -0.43859649122807015 800 0 1600;M 0 0 Q 0.43103448275862066 800 0 1600;M 0 0 Q -0.423728813559322 800 0 1600;M 0 0 Q 0.4166666666666667 800 0 1600;M 0 0 Q -0.4098360655737705 800 0 1600;M 0 0 Q 0.4032258064516129 800 0 1600;M 0 0 Q -0.3968253968253968 800 0 1600;M 0 0 Q 0.390625 800 0 1600;M 0 0 Q -0.38461538461538464 800 0 1600;M 0 0 Q 0.3787878787878788 800 0 1600;M 0 0 Q -0.373134328358209 800 0 1600;M 0 0 Q 0.36764705882352944 800 0 1600;M 0 0 Q -0.36231884057971014 800 0 1600;M 0 0 Q 0.35714285714285715 800 0 1600;M 0 0 Q -0.352112676056338 800 0 1600;M 0 0 Q 0.3472222222222222 800 0 1600;M 0 0 Q -0.3424657534246575 800 0 1600;M 0 0 Q 0.33783783783783783 800 0 1600;M 0 0 Q -0.3333333333333333 800 0 1600;M 0 0 Q 0.32894736842105265 800 0 1600;M 0 0 Q -0.3246753246753247 800 0 1600;M 0 0 Q 0.32051282051282054 800 0 1600;M 0 0 Q -0.31645569620253167 800 0 1600;M 0 0 Q 0.3125 800 0 1600;M 0 0 Q -0.30864197530864196 800 0 1600;M 0 0 Q 0.3048780487804878 800 0 1600;M 0 0 Q -0.30120481927710846 800 0 1600;M 0 0 Q 0.2976190476190476 800 0 1600;M 0 0 Q -0.29411764705882354 800 0 1600;M 0 0 Q 0.29069767441860467 800 0 1600;M 0 0 Q -0.28735632183908044 800 0 1600;M 0 0 Q 0.2840909090909091 800 0 1600;M 0 0 Q -0.2808988764044944 800 0 1600;M 0 0 Q 0.2777777777777778 800 0 1600;M 0 0 Q -0.27472527472527475 800 0 1600;M 0 0 Q 0.2717391304347826 800 0 1600;M 0 0 Q -0.26881720430107525 800 0 1600;M 0 0 Q 0.26595744680851063 800 0 1600;M 0 0 Q -0.2631578947368421 800 0 1600;M 0 0 Q 0.2604166666666667 800 0 1600;M 0 0 Q -0.25773195876288657 800 0 1600;M 0 0 Q 0.25510204081632654 800 0 1600;M 0 0 Q -0.25252525252525254 800 0 1600;M 0 0 Q 0.25 800 0 1600'
               dur="57.14s"
               repeatCount="1"/>
            </path>

  {/* <rect width="1000" height="1000">
    <animate
      attributeName="rx"
      values="0;5;0"
      dur="10s"
      repeatCount="indefinite" />
  </rect> */}

            <rect width="27.5" height="4200" x="0" y="1600" fill='#b8b8b8'/>
            <rect width={(2**(1/12))**1*75} height="1650" x={0-((2**(1/12))**1*75)/3} fill='transparent' fillOpacity="0" id='string-6' data-tune={guitarTuning[5]} datacurrenttune={pitchBinding[5]} onMouseDownCapture={(e)=>{if (e.target.getAttribute("isPressed") == undefined) {e.target.setAttribute("isPressed",'');Tone.start();guitar.triggerAttack(e.target.getAttribute('datacurrenttune'));console.log('attack');console.log(e.target.parentElement);e.target.parentElement.querySelector("path#string5wiggly").children[0].beginElement();console.log(e.target.parentElement.querySelector("path#string5wiggly").children[0])}}} onMouseUpCapture={(e)=>{if (e.target.getAttribute("isPressed") != undefined) {e.target.removeAttribute("isPressed");Tone.start();guitar.triggerRelease(e.target.getAttribute('datacurrenttune'));console.log('release')}}} onMouseOutCapture={(e)=>{if (e.target.getAttribute("isPressed") != undefined) {e.target.removeAttribute("isPressed");Tone.start();guitar.triggerRelease(e.target.getAttribute('datacurrenttune'));console.log('release')};}}/>
            <g transform='rotate(180) translate(0, -5500) scale(-1,1)'>
               {/* <rect height={distance_to_nut*((1-1/((2**(1/12))**0))-(1-1/((2**(1/12))**(0-1))))} width={(2**(1/12))**1*30*2} x={-((2**(1/12))**0*30/2)} y={-320} key={5} fill='transparent' fillOpacity="0" note={guitarTuning[5]} onClickCapture={(e)=>{let t_pitchBinding = [...pitchBinding];t_pitchBinding[5] = guitarTuning[5];setPitchBinding(t_pitchBinding)}}/> */}
               { stringsTriggers[5] }
            </g>
         </g>
      </g>
      <g
         id="g86">
        <g
           id="g88"
           clipPath="url(#clipPath92)">
          <g
             id="g94"
             clipPath="url(#clipPath98)">
            <path
               d="m 6016,6262 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -4 v -1 h -5 v -1 h -4 v -1 h -8 v -1 h -17 v 1 h -6 v 1 h -5 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 4 h -1 v 7 h -1 v 9 h 1 v 6 h 1 v 4 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 4 v 1 h 6 v 1 h 5 v 1 h 15 v -1 h 7 v -1 h 4 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -8 h 1 v -6 h -1 v -8 h -1 v -3 h -1 v -4 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1"
               style={{fill:"url(#linearGradient104)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path106" />
          </g>
        </g>
      </g>
      <g
         id="g108">
        <g
           id="g110"
           clipPath="url(#clipPath114)">
          <g
             id="g116"
             clipPath="url(#clipPath120)">
            <path
               d="m 6186,6354 v 1 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -3 v -1 h -5 v -1 h -4 v -1 h -7 v -1 h -20 v 1 h -6 v 1 h -4 v 1 h -2 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 17 h 1 v 6 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 4 v 1 h 6 v 1 h 6 v 1 h 12 v -1 h 8 v -1 h 4 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -5 h 1 v -16 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -3 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1"
               style={{fill:"url(#linearGradient126)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path128" />
          </g>
        </g>
      </g>
      <g
         id="g130">
        <g
           id="g132"
           clipPath="url(#clipPath136)">
          <g
             id="g138"
             clipPath="url(#clipPath142)">
            <path
               d="m 6355,6447 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 1 h -2 v -1 h -4 v -1 h -4 v -1 h -7 v -1 h -22 v 1 h -6 v 1 h -4 v 1 h -3 v 1 h -2 v 1 h -3 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 4 h -1 v 8 h -1 v 7 h 1 v 6 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 5 v 1 h 6 v 1 h 23 v -1 h 5 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -7 h 1 v -8 h -1 v -7 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1"
               style={{fill:"url(#linearGradient148)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path150" />
          </g>
        </g>
      </g>
      <g
         id="g152">
        <g
           id="g154"
           clipPath="url(#clipPath158)">
          <g
             id="g160"
             clipPath="url(#clipPath164)">
            <path
               d="m 6525,6540 v 1 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -2 v -1 h -4 v -1 h -4 v -1 h -7 v -1 h -23 v 1 h -6 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 16 h 1 v 6 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 5 v 1 h 6 v 1 h 21 v -1 h 6 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -5 h 1 v -17 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1"
               style={{fill:"url(#linearGradient170)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path172" />
          </g>
        </g>
      </g>
      <g
         id="g174">
        <g
           id="g176"
           clipPath="url(#clipPath180)">
          <g
             id="g182"
             clipPath="url(#clipPath186)">
            <path
               d="m 6694,6633 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v -1 h -4 v -1 h -4 v -1 h -6 v -1 h -7 v -1 h -9 v 1 h -10 v 1 h -5 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 4 h -1 v 9 h -1 v 5 h 1 v 6 h 1 v 5 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 5 v 1 h 6 v 1 h 20 v -1 h 6 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -7 h 1 v -9 h -1 v -7 h -1 v -3 h -1 v -4 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1"
               style={{fill:"url(#linearGradient192)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path194" />
          </g>
        </g>
      </g>
      <path
         d="m 2761.73,1131.19 c 0,-48.72 -39.49,-88.22 -88.2,-88.22 -48.72,0 -88.22,39.5 -88.22,88.22 0,48.73 39.5,88.22 88.22,88.22 48.71,0 88.2,-39.49 88.2,-88.22"
         style={{fill:"#8b8c82",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path260" />
      <path
         d="m 2743.26,1486.31 c 0,-48.72 -39.49,-88.21 -88.21,-88.21 -48.71,0 -88.2,39.49 -88.2,88.21 0,48.73 39.49,88.21 88.2,88.21 48.72,0 88.21,-39.48 88.21,-88.21"
         style={{fill:"#8b8c82",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path262" />
      <path
         d="m 2636.46,1823.35 c 0,-48.73 -39.5,-88.22 -88.21,-88.22 -48.71,0 -88.2,39.49 -88.2,88.22 0,48.72 39.49,88.21 88.2,88.21 48.71,0 88.21,-39.49 88.21,-88.21"
         style={{fill:"#8b8c82",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path264" />
      <path
         d="m 2731.3,1492.13 c 0,-42.12 -34.14,-76.25 -76.25,-76.25 -42.11,0 -76.25,34.13 -76.25,76.25 0,42.12 34.14,76.24 76.25,76.24 42.11,0 76.25,-34.12 76.25,-76.24"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path266" />
      <path
         d="m 2624.5,1830.26 c 0,-42.11 -34.14,-76.24 -76.25,-76.24 -42.11,0 -76.25,34.13 -76.25,76.24 0,42.12 34.14,76.25 76.25,76.25 42.11,0 76.25,-34.13 76.25,-76.25"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path268" />
      <path
         d="m 2749.77,1138.53 c 0,-42.12 -34.14,-76.25 -76.25,-76.25 -42.11,0 -76.25,34.13 -76.25,76.25 0,42.12 34.14,76.26 76.25,76.26 42.11,0 76.25,-34.14 76.25,-76.26"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path270" />
      <path
         d="m 1800.4,2296.94 c 0,-11.56 -9.37,-20.93 -20.94,-20.93 -11.56,0 -20.93,9.37 -20.93,20.93 0,11.57 9.37,20.94 20.93,20.94 11.57,0 20.94,-9.37 20.94,-20.94"
         style={{fill:"#8b8c82",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path296" />
      <path
         d="m 2645.44,989.77 c 0,-11.571 -9.38,-20.942 -20.94,-20.942 -11.56,0 -20.94,9.371 -20.94,20.942 0,11.56 9.38,20.93 20.94,20.93 11.56,0 20.94,-9.37 20.94,-20.93"
         style={{fill:"#8b8c82",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path298" />
      <path
         d="m 2341.46,1754.02 c 0,-11.56 -9.38,-20.93 -20.93,-20.93 -11.57,0 -20.95,9.37 -20.95,20.93 0,11.57 9.38,20.94 20.95,20.94 11.55,0 20.93,-9.37 20.93,-20.94"
         style={{fill:"#8b8c82",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path300" />
      <path
         d="m 3161.21,1969.72 c 0,-11.57 -9.38,-20.94 -20.94,-20.94 -11.56,0 -20.94,9.37 -20.94,20.94 0,11.55 9.38,20.94 20.94,20.94 11.56,0 20.94,-9.39 20.94,-20.94"
         style={{fill:"#8b8c82",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path302" />
      <path
         d="m 4039.28,2623.14 c 0,-11.57 -9.39,-20.94 -20.94,-20.94 -11.56,0 -20.95,9.37 -20.95,20.94 0,11.56 9.39,20.93 20.95,20.93 11.55,0 20.94,-9.37 20.94,-20.93"
         style={{fill:"#8b8c82",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path304" />
      <path
         d="m 2393.63,2888.29 c 0,-11.56 -9.37,-20.94 -20.92,-20.94 -11.58,0 -20.95,9.38 -20.95,20.94 0,11.56 9.37,20.94 20.95,20.94 11.55,0 20.92,-9.38 20.92,-20.94"
         style={{fill:"#8b8c82",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path306" />
      <path
         d="m 3008.49,3452.94 c 0,-11.56 -9.38,-20.94 -20.95,-20.94 -11.55,0 -20.93,9.38 -20.93,20.94 0,11.56 9.38,20.94 20.93,20.94 11.57,0 20.95,-9.38 20.95,-20.94"
         style={{fill:"#8b8c82",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path308" />
      <path
         d="m 2393.63,2770.3 c 0,-11.56 -9.37,-20.93 -20.92,-20.93 -11.58,0 -20.95,9.37 -20.95,20.93 0,11.57 9.37,20.94 20.95,20.94 11.55,0 20.92,-9.37 20.92,-20.94"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path312" />
      <path
         d="m 2099.7,2470.66 c 0,-11.56 -9.38,-20.94 -20.94,-20.94 -11.56,0 -20.94,9.38 -20.94,20.94 0,11.56 9.38,20.94 20.94,20.94 11.56,0 20.94,-9.38 20.94,-20.94"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path314" />
      <path
         d="m 2492.94,1948.78 c 0,-11.56 -9.37,-20.94 -20.93,-20.94 -11.57,0 -20.94,9.38 -20.94,20.94 0,11.56 9.37,20.93 20.94,20.93 11.56,0 20.93,-9.37 20.93,-20.93"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path316" />
      <path
         d="m 2753.78,3112.69 c 0,-11.57 -9.37,-20.94 -20.94,-20.94 -11.56,0 -20.93,9.37 -20.93,20.94 0,11.56 9.37,20.93 20.93,20.93 11.57,0 20.94,-9.37 20.94,-20.93"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path318" />
      <path
         d="m 3193.75,2648.89 c 0,-11.56 -9.37,-20.94 -20.94,-20.94 -11.56,0 -20.93,9.38 -20.93,20.94 0,11.56 9.37,20.94 20.93,20.94 11.57,0 20.94,-9.38 20.94,-20.94"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path320" />
      <path
         d="m 2841.94,2312.65 c 0,-11.56 -9.38,-20.95 -20.94,-20.95 -11.56,0 -20.94,9.39 -20.94,20.95 0,11.55 9.38,20.94 20.94,20.94 11.56,0 20.94,-9.39 20.94,-20.94"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path322" />
      <g
         id="g324">
        <g
           id="g326"
           clipPath="url(#clipPath330)">
          <g
             id="g332"
             clipPath="url(#clipPath336)">
            <path
               d="m 5868,6025 v 1 h -4 v 1 h -3 v 1 h -4 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 6 h -1 v 12 h 1 v 6 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 4 v 1 h 3 v 1 h 4 v 1 h 19 v -1 h 4 v -1 h 3 v -1 h 4 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -4 h 1 v -3 h 1 v -3 h 1 v -7 h 1 v -10 h -1 v -7 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -4 v -1 h -3 v -1 h -4 v -1"
               style={{fill:"url(#linearGradient342)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path344" />
          </g>
        </g>
      </g>
      <g
         id="g346">
        <g
           id="g348"
           clipPath="url(#clipPath352)">
          <g
             id="g354"
             clipPath="url(#clipPath358)">
            <path
               d="m 6045,6116 v 1 h -6 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 7 h -1 v 11 h 1 v 7 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 7 v 1 h 11 v -1 h 7 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -7 h 1 v -11 h -1 v -7 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -6 v -1"
               style={{fill:"url(#linearGradient364)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path366" />
          </g>
        </g>
      </g>
      <g
         id="g368">
        <g
           id="g370"
           clipPath="url(#clipPath374)">
          <g
             id="g376"
             clipPath="url(#clipPath380)">
            <path
               d="m 6216,6208 v 1 h -4 v 1 h -3 v 1 h -4 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 4 h -1 v 3 h -1 v 3 h -1 v 7 h -1 v 10 h 1 v 7 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 4 v 1 h 3 v 1 h 4 v 1 h 19 v -1 h 4 v -1 h 3 v -1 h 4 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -6 h 1 v -12 h -1 v -6 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -4 v -1 h -4 v -1"
               style={{fill:"url(#linearGradient386)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path388" />
          </g>
        </g>
      </g>
      <g
         id="g390">
        <g
           id="g392"
           clipPath="url(#clipPath396)">
          <g
             id="g398"
             clipPath="url(#clipPath402)">
            <path
               d="m 6394,6299 v 1 h -7 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 6 h -1 v 11 h 1 v 6 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 7 v 1 h 11 v -1 h 7 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -7 h 1 v -11 h -1 v -7 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -7 v -1"
               style={{fill:"url(#linearGradient408)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path410" />
          </g>
        </g>
      </g>
      <g
         id="g412">
        <g
           id="g414"
           clipPath="url(#clipPath418)">
          <g
             id="g420"
             clipPath="url(#clipPath424)">
            <path
               d="m 6564,6391 v 1 h -4 v 1 h -4 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 7 h -1 v 10 h 1 v 7 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 5 v 1 h 17 v -1 h 5 v -1 h 3 v -1 h 4 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -4 h 1 v -6 h 1 v -12 h -1 v -6 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -4 v -1 h -4 v -1"
               style={{fill:"url(#linearGradient430)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path432" />
          </g>
        </g>
      </g>
      <g
         id="g434">
        <g
           id="g436"
           clipPath="url(#clipPath440)">
          <g
             id="g442"
             clipPath="url(#clipPath446)">
            <path
               d="m 6742,6482 v 1 h -7 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 6 h -1 v 11 h 1 v 6 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 4 v 1 h 6 v 1 h 11 v -1 h 7 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -6 h 1 v -13 h -1 v -6 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -7 v -1"
               style={{fill:"url(#linearGradient452)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path454" />
          </g>
        </g>
      </g>
      <path
         d="m 1765.5,2023.15 c 0.12,-15.24 -12.15,-27.68 -27.4,-27.78 -15.24,-0.1 -27.66,12.17 -27.79,27.41 -0.09,15.25 12.19,27.68 27.41,27.77 15.26,0.1 27.69,-12.15 27.78,-27.4"
         style={{fill:"#b2acaa",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path468" />
      <path
         d="m 1838.4,1953.9 c 0.1,-15.27 -12.15,-27.7 -27.41,-27.79 -15.23,-0.09 -27.66,12.17 -27.79,27.42 -0.08,15.24 12.18,27.67 27.42,27.77 15.26,0.1 27.68,-12.16 27.78,-27.4"
         style={{fill:"#b2acaa",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path470" />
      <path
         d="m 1911.3,1884.62 c 0.1,-15.24 -12.16,-27.69 -27.41,-27.76 -15.23,-0.12 -27.67,12.15 -27.78,27.39 -0.11,15.24 12.17,27.68 27.41,27.79 15.24,0.08 27.68,-12.18 27.78,-27.42"
         style={{fill:"#b2acaa",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path472" />
      <path
         d="m 1984.19,1815.36 c 0.11,-15.26 -12.16,-27.68 -27.4,-27.78 -15.25,-0.1 -27.68,12.18 -27.79,27.41 -0.09,15.25 12.17,27.67 27.42,27.77 15.23,0.1 27.66,-12.15 27.77,-27.4"
         style={{fill:"#b2acaa",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path474" />
      <path
         d="m 2057.09,1746.09 c 0.1,-15.25 -12.17,-27.69 -27.41,-27.77 -15.25,-0.12 -27.68,12.16 -27.78,27.39 -0.1,15.25 12.16,27.69 27.42,27.8 15.22,0.08 27.66,-12.18 27.77,-27.42"
         style={{fill:"#b2acaa",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path476" />
      <path
         d="m 2129.99,1676.83 c 0.09,-15.27 -12.19,-27.69 -27.42,-27.77 -15.25,-0.11 -27.68,12.16 -27.78,27.4 -0.09,15.24 12.16,27.67 27.42,27.79 15.23,0.08 27.66,-12.18 27.78,-27.42"
         style={{fill:"#b2acaa",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path478" />
      <path
         d="M 1737.91,2022.95 5877.47,6025.17"
         style={{fill:"#1c1d19",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path480" />
      <path
         d="M 1800.4,1942.42 6051.49,6116.66"
         style={{fill:"#1c1d19",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path482" />
      <path
         d="M 1856.11,1859.09 6239.28,6208.18"
         style={{fill:"#1c1d19",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path484" />
      <path
         d="M 1948.56,1815.17 6435.14,6324.49"
         style={{fill:"#1c1d19",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path486" />
      <path
         d="M 2010.75,1735.13 6573.56,6391.17"
         style={{fill:"#1c1d19",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path488" />
      <path
         d="M 2091.15,1680.54 6742.37,6492.38"
         style={{fill:"#1c1d19",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path490" />
      <path
         d="m 2922.57,1935.96 c -0.64,-0.71 -64.07,-71.03 -102.98,-97.84 -25.59,-17.62 -331.18,-106.44 -555.15,-168.92 0.84,4.3 1.42,8.7 1.42,13.21 0,18.08 -6.98,34.64 -18.51,47.36 l -102.82,-106.7 c 12.56,-8.44 27.9,-13.41 44.48,-13.41 16.71,0 32.06,5.19 44.68,13.75 119.27,33.07 567.34,158.34 606.25,185.18 42.36,29.17 106.59,100.35 109.3,103.35 l -26.67,24.02"
         style={{fill:"#a9a9a9",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path492" />
      <path
         d="m 3171.92,2137.15 c -17.55,19.88 -87.12,-13.05 -155.39,-73.49 -68.23,-60.39 -109.25,-125.45 -91.67,-145.32 17.57,-19.85 87.11,13.03 155.35,73.45 68.23,60.4 109.3,125.49 91.71,145.36"
         style={{fill:"#b4b1a4",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path494" />
      <path
         d="m 3163.63,2137.84 c -13.92,15.74 -76.49,-16.92 -139.78,-72.96 -63.25,-56.01 -103.21,-114.18 -89.28,-129.9 13.92,-15.73 76.48,16.93 139.74,72.93 63.26,56.01 103.25,114.16 89.32,129.93"
         style={{fill:"#ede3cd",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path496" />
      <g
         id="g498">
        <g
           id="g500"
           clipPath="url(#clipPath504)">
          <g
             id="g506"
             clipPath="url(#clipPath510)">
            <path
               d="m 1180,1075 v 1 h -6 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 11 h 1 v 4 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 3 v 1 h 11 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 1 v 28 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h -36 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -4 h 1 v -3 h 1 v -3 h 1 v -13 h -1 v -2 h -1 v -2 h -1 v -2 h -2 v -1 h -1 v -1 h -2 v -1 h -6 v -1"
               style={{fill:"url(#radialGradient516)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path518" />
          </g>
        </g>
      </g>
      <g
         id="g520">
        <g
           id="g522"
           clipPath="url(#clipPath526)">
          <g
             id="g528"
             clipPath="url(#clipPath532)">
            <path
               d="m 3318,4369 v 1 h -4 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -2 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v 18 h -1 v 6 h -1 v 5 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h 2 v -1 h 5 v -1 h 5 v -1 h 4 v -1 h 5 v -1 h 4 v -1 h 3 v 15 h 1 v 4 h 1 v 4 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 2 v 1 h 1 v 1 h 2 v 1 h 7 v -1 h 3 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -4 h 1 v -5 h 1 v -7 h 1 v -20 h -1 v -5 h -1 v -4 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -3 v -1"
               style={{fill:"url(#radialGradient538)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path540" />
          </g>
        </g>
      </g>
      <g
         id="g542">
        <g
           id="g544"
           clipPath="url(#clipPath548)">
          <g
             id="g550"
             clipPath="url(#clipPath554)">
            <g
               id="g556"
               transform="matrix(1902.2,0,0,1648.2,1160.9,2781.9)">
              <image
                 width="1"
                 height="1"
                 style={{imageRendering:"optimizeSpeed",}}
                 preserveAspectRatio="none"
                 transform="matrix(1,0,0,-1,0,1)"
                 id="image558" />
            </g>
          </g>
        </g>
      </g>
      <g
         id="g596">
        <g
           id="g598"
           clipPath="url(#clipPath602)">
          <g
             id="g604"
             clipPath="url(#clipPath608)">
            <g
               id="g610"
               transform="matrix(1844.2,0,0,2041.2,2307.9,602.9)">
              <image
                 width="1"
                 height="1"
                 style={{imageRendering:"optimizeSpeed",}}
                 preserveAspectRatio="none"
                 transform="matrix(1,0,0,-1,0,1)"
                 id="image612" />
            </g>
          </g>
        </g>
      </g>
      <g
         id="g614">
        <g
           id="g616"
           clipPath="url(#clipPath620)">
          <g
             id="g622"
             clipPath="url(#clipPath626)">
            <path
               d="m 2255,720 v 1 h -9 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 3 v -1 h 4 v -1 h 5 v -1 h 21 v 1 h 5 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -8 v -1 z m -148,294 v 2 h -1 v 7 h -1 v 8 h -1 v 9 h -1 v 9 h -1 v 8 h -1 v 10 h -1 v 13 h -1 v 15 h -1 v 23 h -1 v 69 h 1 v 21 h 1 v 13 h 1 v 12 h 1 v 9 h 1 v 8 h 1 v 8 h 1 v 8 h 1 v 6 h 1 v 6 h 1 v 6 h 1 v 5 h 1 v 6 h 1 v 4 h 1 v 5 h 1 v 4 h 1 v 5 h 1 v 4 h 1 v 4 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 4 v 1 h 15 v -1 h 5 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -5 h 1 v -4 h 1 v -5 h 1 v -5 h 1 v -4 h 1 v -5 h 1 v -5 h 1 v -5 h 1 v -6 h 1 v -5 h 1 v -6 h 1 v -5 h 1 v -7 h 1 v -7 h 1 v -7 h 1 v -7 h 1 v -7 h 1 v -8 h 1 v -9 h 1 v -9 h 1 v -10 h 1 v -14 h 1 v -15 h 1 v -17 h 1 v -6 h -1 v 2 h -1 v 6 h -1 v 5 h -1 v 5 h -1 v 5 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 6 h -1 v 10 h -1 v 9 h -1 v 9 h -1 v 9 h -1 v 8 h -1 v 8 h -1 v 8 h -1 v 8 h -1 v 8 h -1 v 7 h -1 v 5 h -1 v 4 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -3 h -1 v -19 h 1 v -11 h 1 v -12 h 1 v -12 h 1 v -8 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -4 v 1 h -4 v 1 h -3 v 1 h -8 v 1 h -8 v -1 h -8 v -1 h -4 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -2 v 13 h -1 v 17 h -1 v 11 h -1 v 4 h -1 v 4 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 1 h -2 v -1 h -1 v -2 h -1 v -2 h -1 v -5 h -1 v -49 h 1 v -29 h 1 v -4 h -1 v -3 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -5 h -1 v -4 h -1 v -5 h -1 v -6 h -1 v -6 h -1 v -6 h -1 v -6 h -1 v -8 h -1 v -11 h -1 v -12 h -1 v -27 h -1 v -1 h 1 v -8"
               style={{fill:"url(#linearGradient632)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path634" />
          </g>
        </g>
      </g>
      <g
         id="g636">
        <g
           id="g638"
           clipPath="url(#clipPath642)">
          <g
             id="g644"
             clipPath="url(#clipPath648)">
            <path
               d="m 2242,741 v 1 h -5 v 1 h -4 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -3 v 1 h -1 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 5 h -1 v 6 h -1 v 5 h -1 v 5 h -1 v 6 h -1 v 7 h -1 v 7 h -1 v 8 h -1 v 10 h -1 v 17 h -1 v 55 h 1 v 12 h 1 v 11 h 1 v 8 h 1 v 6 h 1 v 6 h 1 v 6 h 1 v 6 h 1 v 5 h 1 v 4 h 1 v 5 h 1 v 4 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 1 h 1 v -17 h 1 v -15 h 1 v -13 h 1 v -12 h 1 v -10 h 1 v -9 h 1 v -9 h 1 v -8 h 1 v -7 h 1 v -7 h 1 v -6 h 1 v -6 h 1 v -6 h 1 v -5 h 1 v -5 h 1 v -5 h 1 v -5 h 1 v -4 h 1 v -4 h 1 v -5 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 6 v 1 h 3 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 3 h 1 v 3 h 1 v 2 h 1 v 6 h 1 v 11 h -1 v 5 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 4 h -1 v 5 h -1 v 4 h -1 v 5 h -1 v 5 h -1 v 5 h -1 v 6 h -1 v 6 h -1 v 6 h -1 v 6 h -1 v 7 h -1 v 8 h -1 v 8 h -1 v 8 h -1 v 10 h -1 v 10 h -1 v 12 h -1 v 4 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 2 v 1 h 1 v 1 h 3 v 1 h 2 v 1 h 3 v 1 h 3 v 1 h 3 v 1 h 4 v 1 h 8 v 1 h 10 v -1 h 8 v -1 h 3 v -1 h 4 v -1 h 3 v -1 h 3 v -1 h 3 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -9 h 1 v -30 h 1 v -30 h -1 v -24 h -1 v -14 h -1 v -10 h -1 v -8 h -1 v -8 h -1 v -6 h -1 v -5 h -1 v -6 h -1 v -5 h -1 v -4 h -1 v -4 h -1 v -5 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -4 h -1 v -5 h -1 v -10 h 1 v -4 h 1 v -4 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 3 v -1 h 3 v 1 h 3 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 5 h 1 v 4 h 1 v 5 h 1 v 5 h 1 v 6 h 1 v 7 h 1 v 7 h 1 v 7 h 1 v 13 h 1 v 14 h 1 v 61 h -1 v 21 h -1 v 15 h -1 v 14 h -1 v 7 h 1 v -1 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -5 h 1 v -4 h 1 v -5 h 1 v -6 h 1 v -6 h 1 v -6 h 1 v -7 h 1 v -8 h 1 v -8 h 1 v -9 h 1 v -16 h 1 v -52 h -1 v -15 h -1 v -10 h -1 v -7 h -1 v -8 h -1 v -6 h -1 v -6 h -1 v -5 h -1 v -5 h -1 v -4 h -1 v -5 h -1 v -4 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -4 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -2 v -1 h -3 v -1 h -4 v -1 h -4 v -1 z m 4,14 v -1 h 14 v 1 h 4 v 1 h 4 v 1 h 3 v 1 h 2 v 1 h 2 v 1 h 3 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 2 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 1 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 2 h 1 v 1 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 2 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 3 h 1 v 4 h 1 v 4 h 1 v 4 h 1 v 4 h 1 v 4 h 1 v 5 h 1 v 5 h 1 v 5 h 1 v 6 h 1 v 7 h 1 v 7 h 1 v 8 h 1 v 13 h 1 v 17 h 1 v 39 h -1 v 17 h -1 v 11 h -1 v -6 h -1 v -12 h -1 v -11 h -1 v -7 h -1 v -8 h -1 v -6 h -1 v -5 h -1 v -6 h -1 v -5 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -4 h -1 v -3 h -1 v -4 h -1 v -3 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -3 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -3 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -2 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -2 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -1 v -1 h -1 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -1 v -1 h -2 v -1 h -2 v -1 h -3 v -1 h -3 v -1 h -3 v -1 h -4 v -1 h -20 v 1 h -4 v 1 h -4 v 1 h -3 v 1 h -3 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -2 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 1 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 3 h -1 v 2 h -1 v 3 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 4 h -1 v 3 h -1 v 4 h -1 v 4 h -1 v 5 h -1 v 4 h -1 v 4 h -1 v 5 h -1 v 6 h -1 v 5 h -1 v 5 h -1 v 7 h -1 v 6 h -1 v -25 h 1 v -18 h 1 v -10 h 1 v -8 h 1 v -9 h 1 v -6 h 1 v -6 h 1 v -6 h 1 v -6 h 1 v -5 h 1 v -5 h 1 v -4 h 1 v -5 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -4 h 1 v -3 h 1 v -4 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -3 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -3 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -2 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 1 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 1 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 2 v -1 h 4 v -1 h 3 v -1 h 3 v -1"
               style={{fill:"url(#linearGradient654)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
               id="path656" />
          </g>
        </g>
      </g>
      <g
         id="g658">
        <g
           id="g660"
           clipPath="url(#clipPath664)">
          <path
             d="m 2252.3,753.391 c -60.6,0 -118.18,101.55 -130.01,231.339 -1.8,20.07 -2.25,39.42 -1.8,58.23 14.62,-122.741 69.94,-216.858 128.28,-216.851 1.63,0 3.28,0.071 4.92,0.219 53.1,4.774 90.45,87.031 93.06,193.502 0.54,-4.86 1.17,-9.63 1.62,-14.58 12.06,-133.379 -28.71,-246.059 -91.17,-251.641 -1.64,-0.148 -3.27,-0.218 -4.9,-0.218"
             style={{fill:"url(#linearGradient670)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
             id="path672" />
        </g>
      </g>
      <g
         id="g674">
        <g
           id="g676"
           clipPath="url(#clipPath680)">
          <path
             d="m 2122.11,1134.89 c -1.13,24.83 -1.6,48.37 -1.89,69.17 v 0 3.56 c 0.23,12.29 2.92,18.7 5.87,18.94 h 0.35 c 3.19,-0.27 6.58,-7.65 7.46,-22.5 0.51,-11.44 1.15,-22.4 1.91,-32.9 -5.21,-11.05 -9.8,-23.2 -13.7,-36.27"
             style={{fill:"url(#linearGradient686)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
             id="path688" />
        </g>
      </g>
      <g
         id="g690">
        <g
           id="g692"
           clipPath="url(#clipPath696)">
          <path
             d="m 2215.06,859.359 h -1.94 c -1.14,0.102 -2.29,0.36 -3.44,0.809 -65.91,39.594 -82.74,168.842 -87.57,274.722 3.9,13.07 8.49,25.22 13.7,36.27 13.54,-185.738 65.72,-228.48 88.72,-251.14 21.92,-21.668 7.54,-59.282 -9.47,-60.661"
             style={{fill:"url(#linearGradient702)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
             id="path704" />
        </g>
      </g>
      <g
         id="g706">
        <g
           id="g708"
           clipPath="url(#clipPath712)">
          <path
             d="m 2332.41,1132.73 c -6.02,14.22 -12.7,27.33 -19.92,39.16 -0.9,14.17 -2.15,29.16 -3.81,45.04 -1.38,15.08 1.04,22.91 4.29,23.4 h 0.66 c 3.19,-0.46 6.95,-7.55 8.73,-21.33 3.44,-25.45 7.23,-55.07 10.05,-86.27"
             style={{fill:"url(#linearGradient718)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
             id="path720" />
        </g>
      </g>
      <g
         id="g722">
        <g
           id="g724"
           clipPath="url(#clipPath728)">
          <path
             d="m 2278.44,863.859 h -1.68 c -16.8,1.102 -34.88,34.629 -16.68,58.5 19.16,25.321 63.51,73.762 52.41,249.531 7.22,-11.83 13.9,-24.94 19.92,-39.16 2.46,-27.12 4.2,-55.44 4.35,-83.27 v -7.45 c -0.37,-74.061 -12.58,-143.592 -53.01,-176.53 -1.71,-0.98 -3.49,-1.5 -5.31,-1.621"
             style={{fill:"url(#linearGradient734)",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
             id="path736" />
        </g>
      </g>
      <path
         d="m 2233.97,1368.4 c 0,-20.43 -16.56,-37 -37,-37 -20.44,0 -37,16.57 -37,37 0,20.43 16.56,37 37,37 20.44,0 37,-16.57 37,-37"
         style={{fill:"#777a7b",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path738" />
      <path
         d="m 6931.46,6417.33 c 0,-29.3 -23.76,-53.04 -53.05,-53.04 -29.29,0 -53.05,23.74 -53.05,53.04 0,29.29 23.76,53.04 53.05,53.04 29.29,0 53.05,-23.75 53.05,-53.04"
         style={{fill:"#886d44",fillOpacity:"1",fillRule:"nonzero",stroke:"none",}}
         id="path740" />
      
    </g>
  </g>
</svg>
</div>

      {/* <button id='mic' onClickCapture={allowMicContext} style={{zIndex:1}}>Allow mic context</button> */}
      <h2 className='text-center my-3' style={{zIndex:1}}>Effects:</h2>
      <div className="center-block container" id="effects" style={{width: "80vw"}} effects={effects}>
        <div className="row effect">
          <EffectToggle label="Volume" id="volume" checked={false} change={addVolume} trueBypass={isVolume} setTrueBypass={setIsVolume}/>
          <span>*this effect also holds your distortion and gain effects, so change it, if you want to have only this effect on</span>
          <EffectValue label="Volume Value" id="volumevalue" defaultValue={10} change={changeVolumeValue} min={-1000} max={1000} trueBypass={isVolume} setTrueBypass={setIsVolume}/>
        </div>
        <div className="row effect">
          {/* <button className='center-block p-0 arrow-sign' onClickCapture={()=>{handlePositionChange(distortion,-1)}}>↑</button> */}
          <EffectToggle label="Distortion" id="distortion" checked={false} change={addDistortion} trueBypass={isDistortion} setTrueBypass={setIsDistortion}/>
          <EffectValue label="Distortion Value" id="distortionvalue" defaultValue={5} change={changeDistortionValue} min={0} max={10000} trueBypass={isDistortion} setTrueBypass={setIsDistortion}/>
          {/* <button className='center-block p-0 arrow-sign' onClickCapture={()=>{handlePositionChange(distortion,1)}}>↓</button> */}
        </div>
        <div className="row effect">
          <EffectToggle label="Gain" id="gain" checked={false} change={addGain} trueBypass={isGain} setTrueBypass={setIsGain}/>
          <EffectValue label="Gain Value" id="gainvalue" defaultValue={20} change={changeGainValue} min={0} max={3.4028234663852886e+38.fromExponent()} trueBypass={isGain} setTrueBypass={setIsGain}/>
        </div>
        <div className="row effect">
          <EffectToggle label="Bitcrusher" id="bitcrusher" checked={false} change={addBitcrusher} trueBypass={isBitcrusher} setTrueBypass={setIsBitcrusher}/>
          <EffectValue label="Bitcrusher Value" id="bitcrushervalue" defaultValue={10} change={changeBitcrusherValue} min={1} max={16} trueBypass={isBitcrusher} setTrueBypass={setIsBitcrusher} strict={[1,1]}/>
        </div>
        <div className="row effect">
          {/* <button className='center-block p-0 arrow-sign' onClickCapture={()=>{handlePositionChange(chorus,-1)}}>↑</button> */}
          <EffectToggle label="Chorus" id="chorus" checked={false} change={addChorus} trueBypass={isChorus} setTrueBypass={setIsChorus}/>
          <EffectValue label="Chorus Frequency Value" id="chorusvalue" defaultValue={4} change={changeChorusFrequencyValue} min={0} max={15} trueBypass={isChorus} setTrueBypass={setIsChorus}/>
          <EffectValue label="Chorus Delay Time Value" id="chorusvalue" defaultValue={2.5} change={changeChorusDelayValue} min={0} max={10} trueBypass={isChorus} setTrueBypass={setIsChorus}/>
          <EffectValue label="Chorus Depth Value" id="chorusvalue" defaultValue={1} change={changeChorusDepthValue} min={0} max={1} trueBypass={isChorus} setTrueBypass={setIsChorus} strict={[1,1]}/>
          <EffectValue label="Chorus Wet Value" id="chorusvalue" defaultValue={1} change={changeChorusWetValue} min={0} max={1} trueBypass={isChorus} setTrueBypass={setIsChorus} strict={[1,1]}/>
          {/* <button className='center-block p-0 arrow-sign' onClickCapture={()=>{handlePositionChange(chorus,1)}}>↓</button> */}
        </div>
        <div className="row effect">
          <EffectToggle label="Delay" id="delay" checked={false} change={addDelay} trueBypass={isDelay} setTrueBypass={setIsDelay}/>
          <span>*value of 1 is a looper</span>
          <EffectValue label="Delay Value" id="delay" defaultValue={0.1} change={changeDelayValue} min={0} max={1} trueBypass={isDelay} setTrueBypass={setIsDelay} strict={[1,1]}/>
        </div>
        <div className="row effect">
          <EffectToggle label="Reverb" id="reverb" checked={false} change={addReverb} trueBypass={isReverb} setTrueBypass={setIsReverb}/>
          <span>*values above 150 requires a lot of memory, setting this above 150 may cause browser to crash</span>
          <EffectValue label="Reverb Value" id="reverb" defaultValue={30} change={changeReverbValue} min={0} max={30} trueBypass={isReverb} setTrueBypass={setIsReverb}/>
        </div>
        <div className="row effect">
          <EffectToggle label="Pitch Shifter" id="pitchshifter" checked={false} change={addPitchShifter} trueBypass={isPitchShifter} setTrueBypass={setIsPitchShifter}/>
          <EffectValue label="Pitch Shifter Value" id="pitchshiftervalue" defaultValue={-12} change={changePitchShifterValue} min={-24} max={24} trueBypass={isPitchShifter} setTrueBypass={setIsPitchShifter}/>
          <EffectValue label="Pitch Shifter Wet Value" id="pitchshifterwetvalue" defaultValue={1} change={changePitchShifterWetValue} min={0} max={1} trueBypass={isPitchShifter} setTrueBypass={setIsPitchShifter} strict={[1,1]}/>
        </div>
      </div>
    </main>
  )
}