'use client'
import Image from 'next/image'
import styles from '../page.module.css'
import * as Tone from 'tone'
import "../libs/tonejs-instruments-master/Tonejs-Instruments.js"
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Settings() {

const [increaseOctaveKey, setIncreaseOctaveKey] = useState('');
const [decreaseOctaveKey, setDecreaseOctaveKey] = useState('');

useEffect(()=>{
setIncreaseOctaveKey(localStorage.getItem('octavechangekeys') ? JSON.parse(localStorage.getItem('octavechangekeys'))[0] : '')
setDecreaseOctaveKey(localStorage.getItem('octavechangekeys') ? JSON.parse(localStorage.getItem('octavechangekeys'))[1] : '')
let keyLength = Number(localStorage.getItem('keysLength')) || function() {localStorage.setItem('keysLength',12);return 12}();
let keys = JSON.parse(localStorage.getItem('keys')) || function(){localStorage.setItem('keys', JSON.stringify(["q","w","e","r","t","y","u","i","o","p","[","]"]));return ["q","w","e","r","t","y","u","i","o","p","[","]"]}();
let keyMap = [0,2,1,4,3,5,7,6,9,8,11,10] // ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"] to ["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]
const notes = JSON.parse(localStorage.getItem('notes')) || function(){localStorage.setItem('notes', JSON.stringify(["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]));return ["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]}();
let mappingSection = document.getElementById('key-mapping-section');
mappingSection.innerHTML = '';
let overoctaves = 0;
for (let i = 0; i < keyLength; i++) {
let keySelect = document.createElement('input');
keySelect.type = 'text';
keySelect.maxlength = '1';
keySelect.value = keys[i] ? keys[i] : '';
keySelect.name = `key${i}`;
keySelect.id = `key${i}`;
keySelect.onchange = (e) => {
let allKeys = JSON.parse(localStorage.getItem('keys'));
allKeys[i] = keySelect.value;
localStorage.setItem('keys', JSON.stringify(allKeys));
};
let label = document.createElement('label');
label.textContent = `Key ${i+1}:`;
label.htmlFor = `key${i}`;
let outer = document.createElement('div');
outer.classList.add('m-2')
outer.appendChild(label);
outer.appendChild(keySelect);
mappingSection.appendChild(outer);
}

// let controlsMappingSection = document.getElementById('controls-mapping-section')
// controlsMappingSection.innerHTML = '';

},[])

function increaseOctave(e) {
  console.log(localStorage)
  console.log([e.target.value, localStorage.getItem('octavechangekeys') ? JSON.parse(localStorage.getItem('octavechangekeys'))[1] : null])
  setIncreaseOctaveKey(e.target.value)
  localStorage.setItem('octavechangekeys', JSON.stringify([e.target.value, localStorage.getItem('octavechangekeys') ? JSON.parse(localStorage.getItem('octavechangekeys'))[1] : null]))
}

function decreaseOctave(e) {  
  setDecreaseOctaveKey(e.target.value)
  localStorage.setItem('octavechangekeys', JSON.stringify([localStorage.getItem('octavechangekeys') ? JSON.parse(localStorage.getItem('octavechangekeys'))[0] : null, e.target.value]))
}

  return (
    <main className={styles.main}>
      <h2>Settings</h2>
      <div className={styles.description}>
      please, write full name of key (if it is not one letter)
      </div>
      <h2>Key mapping</h2>
      <h3>Synth</h3>
      <div id="key-mapping-section"></div>
      <div id="controls-mapping-section">
        <div className='m-1'>
          <label htmlFor='octave+'>Increase octave: </label>
          <input id="octave+" type='text' value={increaseOctaveKey} onInput={(e)=>{increaseOctave(e)}}/>
        </div>
        <div className='m-1'>
          <label htmlFor='octave-'>Decrease octave: </label>
          <input id="octave-" type='text' value={decreaseOctaveKey} onInput={(e)=>{decreaseOctave(e)}}/>
        </div>
      </div>
      <h3>Guitar</h3>
    </main>
  )
}
