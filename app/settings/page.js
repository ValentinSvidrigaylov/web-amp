'use client'
import Image from 'next/image'
import styles from '../page.module.css'
import * as Tone from 'tone'
import "../libs/tonejs-instruments-master/Tonejs-Instruments.js"
import { useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function Settings() {

useEffect(()=>{
let keyLength = Number(localStorage.getItem('keyLength')) || function() {localStorage.setItem('keyLength',12);return 12}();
let keys = JSON.parse(localStorage.getItem('keys')) || function(){localStorage.setItem('keys', JSON.stringify(["q","w","e","r","t","y","u","i","o","p","[","]"]));return ["q","w","e","r","t","y","u","i","o","p","[","]"]}();
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
label.textContent = `Key: ${i+1}`;
label.htmlFor = `key${i}`;
let outer = document.createElement('div');
outer.appendChild(label);
outer.appendChild(keySelect);
mappingSection.appendChild(outer);
}
},[])

  return (
    <main className={styles.main}>
      <Navbar></Navbar>
      <h2>Settings</h2>
      <div className={styles.description}>
      please, write full name of key (if it is not one letter)
      </div>
      <h2>Key mapping</h2>
      <div id="key-mapping-section"></div>      
    </main>
  )
}
