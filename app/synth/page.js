'use client'
import styles from './page.module.css'
import { useEffect } from 'react';

function Synth() {
const [octave, setOctave] = useState(); //init octave
console.log("initial octave: ", octave)
const [keysLength, setKeysLength] = useState();
let overoctaves = 0;
useEffect(()=>{
    if (localStorage) {
        console.log('rendered');
        setOctave(Number(localStorage.getItem('octave')) || 1);
        console.log(localStorage);
        setKeysLength(Number(localStorage.getItem('keysLength')) || 12);
      }
},[])

useEffect(()=>{
    const key_width = 5;
    const keyborder_width = 1.25;
    const key_height = 280;
    //const gain = new Tone.Gain(100).toDestination();
    var chorus = new Tone.Chorus(4, 5, 1).toDestination().start();
    //const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const synth = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "./samples/guitar-electric/",
    }).toDestination().connect(new Tone.Distortion(0.95).connect(gain).toMaster()).connect(chorus);
    
    let keyMap = [0,2,1,4,3,5,7,6,9,8,11,10] // ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"] to ["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]
    let keysText = document.getElementById('keysValue');
    let octaveText = document.getElementById('octaveValue');
    const notes = JSON.parse(localStorage.getItem('notes')) || function(){localStorage.setItem('notes', JSON.stringify(["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]));return ["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]}();
    let tonesNum = notes.filter((e)=>!e.includes('#'));
    let semiTonesNum = notes.filter((e)=>e.includes('#'));
    let synthblock = document.querySelector('div#synth');
    //<svg style="height: 282.5px; width: 775px" id="synth"></svg>
    let synthsvg// = document.createElementNS("http://www.w3.org/2000/svg", "svg");//document.createElement('svg');
    //synthsvg.id = 'synth';
    
    //octaveText.textContent = 'Least octave: '+ octave;
    //keysText.textContent = 'Keys: '+ keysLength;
    
    function renderSynth() {
    synthblock.innerHTML = "";
    synthsvg = null;
    synthsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");//document.createElement('svg');
    synthsvg.id = 'synthsvg';
    //synthsvg.setAttribute('viewBox', "0 0 300 300");
    for (let i = 0; i < keysLength; i++) {
    let keyToAppend;
    if (notes[i%12].includes('#')) {
    //<rect class="semi-tone" width="35" height="180" stroke="black" stroke-width="3" fill="black" x="38.75" y="1.25"/
    keyToAppend = document.createElementNS("http://www.w3.org/2000/svg", "rect");//document.createElement('rect');
    keyToAppend.setAttribute('width', 35);
    keyToAppend.setAttribute('height', 180);
    keyToAppend.setAttribute('stroke', 'black');
    keyToAppend.setAttribute('stroke-width', 2.5);
    keyToAppend.setAttribute('fill', 'black');
    keyToAppend.classList.add('semi-tone');
    //x*55-17.5+1.25, x - num of tones before
    //keyToAppend.setAttribute('x', overoctaves*386+tonesNum.length*55-17.5+1.25/2);
    //notes.slice(0, notes.indexOf(notes[keyMap[4]])).filter((e)=>!e.includes('#')).length
    keyToAppend.setAttribute('x', overoctaves*385+notes.slice(0, notes.indexOf(notes[keyMap[i%12]])).filter((e)=>!e.includes('#')).length*55-17.5+1.25);
    keyToAppend.setAttribute('y', 1.25);
    
    //synthsvg.appendChild(keyToAppend)
    } else {
    //<rect class="tone" width="55" height="280" rx="10" stroke="black" stroke-width="3" fill="white" x="1.25" y="0.675"></rect>
    keyToAppend = document.createElementNS("http://www.w3.org/2000/svg", "rect");//document.createElement('rect');
    keyToAppend.setAttribute('width', 55);
    keyToAppend.setAttribute('height', 280);
    keyToAppend.setAttribute('stroke', 'black');
    keyToAppend.setAttribute('stroke-width', 2.5);
    keyToAppend.setAttribute('fill', 'white');
    keyToAppend.classList.add('tone');
    //x*55-17.5+1.25, x - num of tones before
    keyToAppend.setAttribute('rx', 10);
    keyToAppend.setAttribute('x', overoctaves*385+tonesNum.indexOf(notes[i%12])*55+1.25);
    keyToAppend.setAttribute('y', 1.25);
    }
    synthsvg.appendChild(keyToAppend);
    //for (let i of synthsvg.children) {
    let curoveroctaves = overoctaves; //we need to save current overoctave value
    console.log(`${notes[[...synthsvg.children].indexOf(keyToAppend)-12*curoveroctaves ]}`+`${octave+curoveroctaves }`);
    console.log(i);
    keyToAppend.onmousedown = (e) => {
    e.stopPropagation();
    if (keyToAppend.getAttribute("isPressed") == undefined) {
    keyToAppend.setAttribute("isPressed",'');
    synth.triggerAttack(`${notes[[...synthsvg.children].indexOf(keyToAppend)-12*curoveroctaves ]}`+`${octave+curoveroctaves }`, Tone.now());
    }
    console.log(`${notes[[...synthsvg.children].indexOf(keyToAppend)-12*curoveroctaves ]}`+`${octave+curoveroctaves }`);
    }
    keyToAppend.onmouseup = (e) => {
    e.stopPropagation();
    if (keyToAppend.getAttribute("isPressed") != undefined) {
    keyToAppend.removeAttribute("isPressed");
    synth.triggerRelease(`${notes[[...synthsvg.children].indexOf(keyToAppend)-12*curoveroctaves ]}`+`${octave+curoveroctaves }`, Tone.now());
    }
    console.log(`${notes[[...synthsvg.children].indexOf(keyToAppend)-12*curoveroctaves ]}`+`${octave+curoveroctaves }`);
    }
    keyToAppend.onmouseleave = (e) => {
    e.stopPropagation();
    synth.triggerRelease(`${notes[[...synthsvg.children].indexOf(keyToAppend)-12*curoveroctaves ]}`+`${octave+curoveroctaves }`, Tone.now());
    //console.log(`${notes[[...synthsvg.children].indexOf(keyToAppend)-12*curoveroctaves ]}`+`${octave+curoveroctaves }`);
    }
    keyToAppend.ontouchstart = (e) => {
    e.stopPropagation();
    synth.triggerAttack(`${notes[[...synthsvg.children].indexOf(keyToAppend)-12*curoveroctaves ]}`+`${octave+curoveroctaves }`, Tone.now());
    console.log(`${notes[[...synthsvg.children].indexOf(keyToAppend)-12*curoveroctaves ]}`+`${octave+curoveroctaves }`);
    }
    keyToAppend.ontouchend = (e) => {
    e.stopPropagation();
    synth.triggerRelease(`${notes[[...synthsvg.children].indexOf(keyToAppend)-12*curoveroctaves ]}`+`${octave+curoveroctaves }`, Tone.now());
    console.log(`${notes[[...synthsvg.children].indexOf(keyToAppend)-12*curoveroctaves ]}`+`${octave+curoveroctaves }`);
    }
    if ((i+1)%12==0 && i != 0) {//[...synthsvg.children].indexOf(keyToAppend) == 11) { //12 - octave length
    overoctaves++;
    }
    //synthsvg.appendChild(keyToAppend);
    }
    
    synthsvg.setAttribute('width', [...synthsvg.children].filter(e=>e.classList.contains('tone')).length*55+1.25*2);
    //synthsvg.setAttribute('height', '100');
    synthsvg.setAttribute('height', 280+1.25*2);
    synthblock.appendChild(synthsvg);
    }
    
    renderSynth();
    
    function getKeysByValue(object, value) {
      return Object.keys(object).filter(key => object[key] === value);
    }
    
    window.onkeydown = (e) => { //[0,2,1,4,3,5,7,6,9,8,11,10] // ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"] to ["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]
    e.stopPropagation(); 
    let keys = JSON.parse(localStorage.getItem('keys')) || function(){localStorage.setItem('keys', JSON.stringify(["q","w","e","r","t","y","u","i","o","p","[","]"]));return ["q","w","e","r","t","y","u","i","o","p","[","]"]}();
    console.log(keys);
    let pressedKeyMapped = getKeysByValue(keys, e.key.toLowerCase());
    console.log(e.key.toLowerCase());
    if (pressedKeyMapped != undefined) {
    for (let i = 0; i < pressedKeyMapped.length; i++ ){
    let mappedKey = Number(pressedKeyMapped[i])-Number(pressedKeyMapped[i])%12+keyMap[pressedKeyMapped[i]%12];
    console.log('key',pressedKeyMapped );
    console.log('mapped',mappedKey );
    synthsvg.children[mappedKey].dispatchEvent(new Event('mousedown'));
    console.log(synthsvg.children[mappedKey].getAttribute('isPressed'));
    /*if (!synthsvg.children[mappedKey].getAttribute("isPressed")) {
    //synthsvg.children[mappedKey].dispatchEvent(new Event('mousedown'));
    synthsvg.children[mappedKey].setAttribute("isPressed",true);
    }*/
    }
    }
    }
    
    window.onkeyup = (e) => { //[0,2,1,4,3,5,7,6,9,8,11,10] // ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"] to ["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]
    e.stopPropagation(); 
    let keys = JSON.parse(localStorage.getItem('keys')) || function(){localStorage.setItem('keys', ["q","w","e","r","t","y","u","i","o","p","[","]"]);return JSON.stringify(["q","w","e","r","t","y","u","i","o","p","[","]"])}();
    let pressedKeyMapped = getKeysByValue(keys, e.key.toLowerCase());
    console.log(e.key.toLowerCase());
    if (pressedKeyMapped != undefined) {
    for (let i = 0; i < pressedKeyMapped.length; i++ ){
    let mappedKey = Number(pressedKeyMapped[i])-Number(pressedKeyMapped[i])%12+keyMap[pressedKeyMapped[i]%12];
    console.log('key',pressedKeyMapped );
    console.log('mapped',mappedKey );
    synthsvg.children[mappedKey].dispatchEvent(new Event('mouseup'));
    console.log(synthsvg.children[mappedKey].getAttribute('isPressed'));
    /*if (synthsvg.children[mappedKey].getAttribute("isPressed")) {
    synthsvg.children[mappedKey].setAttribute("isPressed",false);
    }*/
    }
    }
    }
    
    /*let increaseOctave = document.getElementById('octave+');
    let decreaseOctave = document.getElementById('octave-');
    increaseOctave.onclick = () => {
    if (octave+overoctaves >= 7) {
    return;
    }
    console.log(`before: ${octave}`);
    setOctave(octave+1);
    localStorage.setItem('octave', octave);
    console.log(`after: ${octave}`);
    //octaveText.textContent = 'Least octave: '+ octave;
    };
    decreaseOctave.onclick = () => {
    if (octave < 1) {
    return;
    }
    setOctave(octave-1);
    localStorage.setItem('octave', octave);
    //octaveText.textContent = 'Least octave: '+ octave;
    }; 
    
    let increaseKeys = document.getElementById('key+');
    let decreaseKeys = document.getElementById('key-');
    increaseKeys.onclick = () => {
    if (keysLength >= 48) {
    return;
    }
    setKeysLength(keysLength+1);
    renderSynth();
    localStorage.setItem('keyLength', keysLength);
    //keysText.textContent = 'Keys: '+ keysLength;
    };
    decreaseKeys.onclick = () => {
    if (keysLength < 1) {
    return;
    }
    setKeysLength(keysLength-1);
    renderSynth();
    localStorage.setItem('keyLength', keysLength);
    //keysText.textContent = 'Keys: '+ keysLength;
    };*/ 
    
    
    /*
    let C2 = document.getElementById("C2");
    let C4 = document.getElementById("C4");
    C2.onmousedown = () => {
        console.log(Tone.now());
        synth.triggerAttack("C2", Tone.now());
    }
    C2.onmouseup = () => {
        console.log(Tone.now());
        synth.triggerRelease("C2",Tone.now());
        console.log(Tone.now());
    }
    C4.onmousedown = () => {
        synth.triggerAttack("C4", Tone.now());
    }
    C4.onmouseup = () => {
        synth.triggerRelease(["C4"],Tone.now());
    }
    window.onkeydown = (e) => {
        console.log(Tone.now());
        if (e.key == "c" && !C4.getAttribute("isPressed")) {
            synth.triggerAttack("C4", Tone.now());
            C4.setAttribute("isPressed", true);
        } else if (e.key == "v" && !C2.getAttribute("isPressed")) {
            synth.triggerAttack("C2", Tone.now());
            C2.setAttribute("isPressed", true);
        }
    }
    window.onkeyup = (e) => {
        console.log(Tone.now());
        if (e.key == "c") {
            synth.triggerRelease("C4", Tone.now());        
            C4.removeAttribute("isPressed");
        } else if (e.key == "v") {
            synth.triggerRelease("C2", Tone.now());
            C2.removeAttribute("isPressed");
        }
    }*/
    },[]);

    function increaseOctave () {
        if (octave+overoctaves >= 7) {
          return;
        }
        //console.log(`before: ${octave}`);
        setOctave(octave+1);
        //console.log(`after: ${octave}`);
        //localStorage.setItem('octave', octave);
        //octaveText.textContent = 'Least octave: '+ octave;
      };
      
      function decreaseOctave () {
        if (octave < 1) {
          return;
        }
        //console.log(`before: ${octave}`);
        setOctave(octave-1);
        //console.log(`after: ${octave}`);
        //localStorage.setItem('octave', octave);
        //octaveText.textContent = 'Least octave: '+ octave;
      }; 
      useEffect(()=>{
        console.log(octave == undefined);
        if (octave != undefined) {
          localStorage.setItem('octave', octave);
          console.log('local o', localStorage.getItem('octave'));
          console.log('o',octave);
        }
      }, [octave]);
      
      function decreaseKeysLength() {
        if (keysLength < 1) {
        return;
        }
        setKeysLength(keysLength-1);
        //localStorage.setItem('keyLength', keysLength);
        //keysText.textContent = 'Keys: '+ keysLength;
      }; 
      
      function increaseKeysLength() {
        if (keysLength >= 48) {
        return;
        }
        setKeysLength(keysLength+1);
        //localStorage.setItem('keyLength', keysLength);
        //keysText.textContent = 'Keys: '+ keysLength;
        };
      
        useEffect(()=>{
          if (keysLength != undefined) {
            localStorage.setItem('keysLength', keysLength);
            console.log('local ks', localStorage.getItem('keysLength'));
            console.log('ks',keysLength);
          }
        }, [keysLength])

    return (
    <main>
        <div className={styles.description}>
            Simple digital synth based on <a href="https://tonejs.github.io/" target='blank'>tone js</a>
        </div>
        <div className="center-block container">
            <h2 id='octaveValue' className='text-center'>Least octave: { octave }</h2>
            <div className="row">
            <div className='col'>
                <button id='octave+' className='center-block' onClick={increaseOctave}>octave+</button>
            </div>
            <div className='col'>
                <button id='octave-' className='center-block' onClick={decreaseOctave}>octave-</button>
            </div>
            </div>
        </div>
        <div className="center-block container">
            <h2 id='keysValue' className='text-center'>Keys: { keysLength }</h2>
            <div className="row">
            <div className='col'>
                <button id='key+' className='center-block' onClick={increaseKeysLength}>add key</button>
            </div>
            <div className='col'>
                <button id='key-' className='center-block' onClick={decreaseKeysLength}>remove key</button>
            </div>
            </div>
        </div>
        <div id="synth" className='container'></div>
    </main>
    );
}