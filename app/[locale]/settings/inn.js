'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from 'app/page.module.css'
import * as Tone from 'tone'
import "app/libs/tonejs-instruments-master/Tonejs-Instruments.js"
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Inner() {
const t = useTranslations("SettingsPage");

const [increaseOctaveKey, setIncreaseOctaveKey] = useState('');
const [decreaseOctaveKey, setDecreaseOctaveKey] = useState('');
const [stringsAmount, setStringsAmount] = useState(6);
const [frettingKeysAmount, setFrettingKeysAmount] = useState(21+1);

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
label.textContent = `${t("mapping_synth_keys_label")} ${i+1}:`;
label.htmlFor = `key${i}`;
let outer = document.createElement('div');
outer.classList.add('m-2')
outer.appendChild(label);
outer.appendChild(keySelect);
mappingSection.appendChild(outer);
}

let strings = JSON.parse(localStorage.getItem('strings')) || function(){localStorage.setItem('strings', JSON.stringify(["1","2","3","4","5","6"]));return ["1","2","3","4","5","6"]}();
let stringsMappingSection = document.getElementById('strings-mapping-section');
stringsMappingSection.innerHTML = '';

for (let i = 0; i < stringsAmount; i++) {
  let stringSelect = document.createElement('input');
  stringSelect.type = 'text';
  stringSelect.maxlength = '1';
  stringSelect.value = strings[i] ? strings[i] : '';
  stringSelect.name = `string${i}`;
  stringSelect.id = `string${i}`;
  stringSelect.onchange = (e) => {
  let allStrings = JSON.parse(localStorage.getItem('strings'));
  allStrings[i] = stringSelect.value;
  localStorage.setItem('strings', JSON.stringify(allStrings));
  };
  let label = document.createElement('label');
  label.textContent = `${t("mapping_guitar_strings_label")} ${i+1}:`;
  label.htmlFor = `string${i}`;
  let outer = document.createElement('div');
  outer.classList.add('m-2')
  outer.appendChild(label);
  outer.appendChild(stringSelect);
  stringsMappingSection.appendChild(outer);
  }

// let controlsMappingSection = document.getElementById('controls-mapping-section')
// controlsMappingSection.innerHTML = '';

},[])

function setRangeValue(val, minVal, maxVal, setter) {
  val = Number(val)
  if (val && typeof val == 'number' && val >= minVal && val <= maxVal) {
    setter(val)
  } else {
    alert(`Wrong value '${val}'! Correct it and check it again.`)
  }
}

function setSettingsRange(val, minVal, maxVal, stateSetter, storageSetterName) {
  setRangeValue(val,minVal,maxVal,()=>{stateSetter(val), localStorage.setItem(storageSetterName, JSON.stringify([val, localStorage.getItem(storageSetterName)]))});
}

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

function stringsChange(e) {
  setSettingsRange(e.target.value,1,12,setStringsAmount,'stringsAmount');
}

function fretsChange(e) {
  setSettingsRange(e.target.value,1,36,setFretsAmount,'fretsAmount');
}

useEffect(()=>{
  if (localStorage || !localStorage.getItem('stringsAmount')) {
     localStorage.setItem('stringsAmount', JSON.stringify(6))
  }
  setStringsAmount(localStorage.getItem('stringsAmount'))
  if (localStorage || !localStorage.getItem('frettingKeysAmount')) {
    localStorage.setItem('frettingKeysAmount', JSON.stringify(21+1))
  }
  setFrettingKeysAmount(localStorage.getItem('frettingKeysAmount'));

  // frets-mapping-section
  let fretsMappingSection = document.getElementById('frets-mapping-section');
  fretsMappingSection.innerHTML = '';
  let fretting_keys = JSON.parse(localStorage.getItem('frettingKeys')) || function(){localStorage.setItem('frettingKeys', JSON.stringify(["q","w","e","r","t","y","u","i","o","p","[","]","a","s","d","f","g","h","j","k","l",";"]));return ["q","w","e","r","t","y","u","i","o","p","[","]","a","s","d","f","g","h","j","k","l",";"]}();
  for (let i = 0; i < frettingKeysAmount; i++) {
    let fretSelect = document.createElement('input');
    fretSelect.type = 'text';
    fretSelect.maxlength = '1';
    fretSelect.value = fretting_keys[i] ? fretting_keys[i] : '';
    fretSelect.name = `fret${i}`;
    fretSelect.id = `fret${i}`;
    fretSelect.onchange = (e) => {
    let allFrets = JSON.parse(localStorage.getItem('frettingKeys'));
    allFrets[i] = fretSelect.value;
    localStorage.setItem('frettingKeys', JSON.stringify(allFrets));
    };
    let label = document.createElement('label');
    label.textContent = `${t("mapping_guitar_frets_label")} ${i}:`;
    label.htmlFor = `fret${i}`;
    let outer = document.createElement('div');
    outer.classList.add('m-2')
    outer.appendChild(label);
    outer.appendChild(fretSelect);
    fretsMappingSection.appendChild(outer);
  }
},[])



  return (
    <main className={styles.main}>
      {/* <h2 className='m-3'>Settings</h2> */}
      <h5 className='m-4'>{ t("data_hint") }</h5>
      <div className={styles.description}>
        { t("mapping_hint") }
      </div>
      <h2>{ t("mapping_title") }</h2>
      <h3>{ t("mapping_synth_title") }</h3>
      <div className={styles.description}>
        { t("mapping_synth_keys_description") }
      </div>
      <div id="key-mapping-section"></div>
      <div id="controls-mapping-section">
        <div className={styles.description}>
          { t("mapping_synth_octaves_description") }
        </div>
        <div className='m-1'>
          <label htmlFor='octave+'>{ t("mapping_synth_octaves_increase_label") }</label>
          <input id="octave+" type='text' value={increaseOctaveKey} onChange={(e)=>{increaseOctave(e)}}/>
        </div>
        <div className='m-1'>
          <label htmlFor='octave-'>{ t("mapping_synth_octaves_decrease_label") }</label>
          <input id="octave-" type='text' value={decreaseOctaveKey} onChange={(e)=>{decreaseOctave(e)}}/>
        </div>
      </div>
      <h3>{ t("mapping_guitar_title") }</h3>
      <div className='m-1'>
        <div className={styles.description}>
          { t("mapping_guitar_stringsamount_description") }
        </div>
        <label htmlFor='strings'>{ t("mapping_guitar_stringsamount_label") }</label>
        <input id="strings" type='number' value={stringsAmount} onChange={(e)=>{stringsChange(e)}}/>
      </div>
      <div className={styles.description}>
        { t("mapping_guitar_strings_description") }
      </div>
      <div id="strings-mapping-section"></div>
      <div className='m-1'>
        <div className={styles.description}>
          { t("mapping_guitar_fretsamount_description") }
        </div>
        <label htmlFor='frets'>{ t("mapping_guitar_fretsamount_label") }</label>
        <input id="frets" type='number' value={frettingKeysAmount} onChange={(e)=>{fretsChange(e)}}/>
      </div>
      <div className={styles.description}>
        { t("mapping_guitar_frets_description") }
      </div>
      <div id="frets-mapping-section"></div>
    </main>
  )
}
