(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[938],{4759:function(e,t,g){Promise.resolve().then(g.bind(g,5347))},4513:function(e,t,g){var o,a=g(8762);a(o={A7:"A7.[mp3|ogg]",A1:"A1.[mp3|ogg]",A2:"A2.[mp3|ogg]",A3:"A3.[mp3|ogg]",A4:"A4.[mp3|ogg]",A5:"A5.[mp3|ogg]",A6:"A6.[mp3|ogg]","A#7":"As7.[mp3|ogg]","A#1":"As1.[mp3|ogg]","A#2":"As2.[mp3|ogg]","A#3":"As3.[mp3|ogg]","A#4":"As4.[mp3|ogg]","A#5":"As5.[mp3|ogg]","A#6":"As6.[mp3|ogg]",B7:"B7.[mp3|ogg]",B1:"B1.[mp3|ogg]",B2:"B2.[mp3|ogg]",B3:"B3.[mp3|ogg]",B4:"B4.[mp3|ogg]",B5:"B5.[mp3|ogg]",B6:"B6.[mp3|ogg]",C7:"C7.[mp3|ogg]",C1:"C1.[mp3|ogg]",C2:"C2.[mp3|ogg]",C3:"C3.[mp3|ogg]",C4:"C4.[mp3|ogg]",C5:"C5.[mp3|ogg]",C6:"C6.[mp3|ogg]"},"C7","C7.[mp3|ogg]"),a(o,"C#7","Cs7.[mp3|ogg]"),a(o,"C#1","Cs1.[mp3|ogg]"),a(o,"C#2","Cs2.[mp3|ogg]"),a(o,"C#3","Cs3.[mp3|ogg]"),a(o,"C#4","Cs4.[mp3|ogg]"),a(o,"C#5","Cs5.[mp3|ogg]"),a(o,"C#6","Cs6.[mp3|ogg]"),a(o,"D7","D7.[mp3|ogg]"),a(o,"D1","D1.[mp3|ogg]"),a(o,"D2","D2.[mp3|ogg]"),a(o,"D3","D3.[mp3|ogg]"),a(o,"D4","D4.[mp3|ogg]"),a(o,"D5","D5.[mp3|ogg]"),a(o,"D6","D6.[mp3|ogg]"),a(o,"D#7","Ds7.[mp3|ogg]"),a(o,"D#1","Ds1.[mp3|ogg]"),a(o,"D#2","Ds2.[mp3|ogg]"),a(o,"D#3","Ds3.[mp3|ogg]"),a(o,"D#4","Ds4.[mp3|ogg]"),a(o,"D#5","Ds5.[mp3|ogg]"),a(o,"D#6","Ds6.[mp3|ogg]"),a(o,"E7","E7.[mp3|ogg]"),a(o,"E1","E1.[mp3|ogg]"),a(o,"E2","E2.[mp3|ogg]"),a(o,"E3","E3.[mp3|ogg]"),a(o,"E4","E4.[mp3|ogg]"),a(o,"E5","E5.[mp3|ogg]"),a(o,"E6","E6.[mp3|ogg]"),a(o,"F7","F7.[mp3|ogg]"),a(o,"F1","F1.[mp3|ogg]"),a(o,"F2","F2.[mp3|ogg]"),a(o,"F3","F3.[mp3|ogg]"),a(o,"F4","F4.[mp3|ogg]"),a(o,"F5","F5.[mp3|ogg]"),a(o,"F6","F6.[mp3|ogg]"),a(o,"F#7","Fs7.[mp3|ogg]"),a(o,"F#1","Fs1.[mp3|ogg]"),a(o,"F#2","Fs2.[mp3|ogg]"),a(o,"F#3","Fs3.[mp3|ogg]"),a(o,"F#4","Fs4.[mp3|ogg]"),a(o,"F#5","Fs5.[mp3|ogg]"),a(o,"F#6","Fs6.[mp3|ogg]"),a(o,"G7","G7.[mp3|ogg]"),a(o,"G1","G1.[mp3|ogg]"),a(o,"G2","G2.[mp3|ogg]"),a(o,"G3","G3.[mp3|ogg]"),a(o,"G4","G4.[mp3|ogg]"),a(o,"G5","G5.[mp3|ogg]"),a(o,"G6","G6.[mp3|ogg]"),a(o,"G#7","Gs7.[mp3|ogg]"),a(o,"G#1","Gs1.[mp3|ogg]"),a(o,"G#2","Gs2.[mp3|ogg]"),a(o,"G#3","Gs3.[mp3|ogg]"),a(o,"G#4","Gs4.[mp3|ogg]"),a(o,"G#5","Gs5.[mp3|ogg]"),a(o,"G#6","Gs6.[mp3|ogg]")},5347:function(e,t,g){"use strict";g.r(t),g.d(t,{default:function(){return Inner}}),g(6691);var o=g(8518),a=g.n(o);g(7707),g(4513);var n=g(2265);g(1396);var s=g(7437);function Inner(){var e=(0,n.useState)(""),t=e[0],g=e[1],o=(0,n.useState)(""),r=o[0],i=o[1],m=(0,n.useState)(6),c=m[0],l=m[1],p=(0,n.useState)(22),d=p[0],u=p[1];function setSettingsRange(e,t,g,o,a){var n;(n=Number(n=e))&&"number"==typeof n&&n>=t&&n<=g?(o(e),localStorage.setItem(a,JSON.stringify([e,localStorage.getItem(a)]))):alert("Wrong value '".concat(n,"'! Correct it and check it again."))}return(0,n.useEffect)(function(){g(localStorage.getItem("octavechangekeys")?JSON.parse(localStorage.getItem("octavechangekeys"))[0]:""),i(localStorage.getItem("octavechangekeys")?JSON.parse(localStorage.getItem("octavechangekeys"))[1]:"");var e=Number(localStorage.getItem("keysLength"))||(localStorage.setItem("keysLength",12),12),t=JSON.parse(localStorage.getItem("keys"))||(localStorage.setItem("keys",JSON.stringify(["q","w","e","r","t","y","u","i","o","p","[","]"])),["q","w","e","r","t","y","u","i","o","p","[","]"]);JSON.parse(localStorage.getItem("notes"))||localStorage.setItem("notes",JSON.stringify(["C","D","C#","E","D#","F","G","F#","A","G#","B","A#"]));var o=document.getElementById("key-mapping-section");o.innerHTML="";for(var _loop=function(e){var g=document.createElement("input");g.type="text",g.maxlength="1",g.value=t[e]?t[e]:"",g.name="key".concat(e),g.id="key".concat(e),g.onchange=function(t){var o=JSON.parse(localStorage.getItem("keys"));o[e]=g.value,localStorage.setItem("keys",JSON.stringify(o))};var a=document.createElement("label");a.textContent="Key ".concat(e+1,":"),a.htmlFor="key".concat(e);var n=document.createElement("div");n.classList.add("m-2"),n.appendChild(a),n.appendChild(g),o.appendChild(n)},a=0;a<e;a++)_loop(a);var n=JSON.parse(localStorage.getItem("strings"))||(localStorage.setItem("strings",JSON.stringify(["1","2","3","4","5","6"])),["1","2","3","4","5","6"]),s=document.getElementById("strings-mapping-section");s.innerHTML="";for(var _loop2=function(e){var t=document.createElement("input");t.type="text",t.maxlength="1",t.value=n[e]?n[e]:"",t.name="string".concat(e),t.id="string".concat(e),t.onchange=function(g){var o=JSON.parse(localStorage.getItem("strings"));o[e]=t.value,localStorage.setItem("strings",JSON.stringify(o))};var g=document.createElement("label");g.textContent="String ".concat(e+1,":"),g.htmlFor="string".concat(e);var o=document.createElement("div");o.classList.add("m-2"),o.appendChild(g),o.appendChild(t),s.appendChild(o)},r=0;r<c;r++)_loop2(r)},[]),(0,n.useEffect)(function(){(localStorage||!localStorage.getItem("stringsAmount"))&&localStorage.setItem("stringsAmount",JSON.stringify(6)),l(localStorage.getItem("stringsAmount")),(localStorage||!localStorage.getItem("frettingKeysAmount"))&&localStorage.setItem("frettingKeysAmount",JSON.stringify(22)),u(localStorage.getItem("frettingKeysAmount"));var e=document.getElementById("frets-mapping-section");e.innerHTML="";for(var t=JSON.parse(localStorage.getItem("frettingKeys"))||(localStorage.setItem("frettingKeys",JSON.stringify(["q","w","e","r","t","y","u","i","o","p","[","]","a","s","d","f","g","h","j","k","l",";"])),["q","w","e","r","t","y","u","i","o","p","[","]","a","s","d","f","g","h","j","k","l",";"]),_loop3=function(g){var o=document.createElement("input");o.type="text",o.maxlength="1",o.value=t[g]?t[g]:"",o.name="fret".concat(g),o.id="fret".concat(g),o.onchange=function(e){var t=JSON.parse(localStorage.getItem("frettingKeys"));t[g]=o.value,localStorage.setItem("frettingKeys",JSON.stringify(t))};var a=document.createElement("label");a.textContent="Fret ".concat(g,":"),a.htmlFor="fret".concat(g);var n=document.createElement("div");n.classList.add("m-2"),n.appendChild(a),n.appendChild(o),e.appendChild(n)},g=0;g<d;g++)_loop3(g)},[]),(0,s.jsxs)("main",{className:a().main,children:[(0,s.jsx)("h2",{children:"Settings"}),(0,s.jsx)("h5",{className:"m-4",children:"*Clearing browser's cache or sites' data will erase these settings"}),(0,s.jsxs)("div",{className:a().description,children:["Please, write full name of key (if it is not one letter).",(0,s.jsx)("br",{})," All of these bindings are clickable so you can use instruments without it"]}),(0,s.jsx)("h2",{children:"Key mapping"}),(0,s.jsx)("h3",{children:"Synth"}),(0,s.jsx)("div",{className:a().description,children:"Sets a keyboard key that represents a synth key"}),(0,s.jsx)("div",{id:"key-mapping-section"}),(0,s.jsxs)("div",{id:"controls-mapping-section",children:[(0,s.jsx)("div",{className:a().description,children:"Sets a key to increase or decrease octave (leave it empty if you don't need it)"}),(0,s.jsxs)("div",{className:"m-1",children:[(0,s.jsx)("label",{htmlFor:"octave+",children:"Increase octave: "}),(0,s.jsx)("input",{id:"octave+",type:"text",value:t,onChange:function(e){g(e.target.value),localStorage.setItem("octavechangekeys",JSON.stringify([e.target.value,localStorage.getItem("octavechangekeys")?JSON.parse(localStorage.getItem("octavechangekeys"))[1]:null]))}})]}),(0,s.jsxs)("div",{className:"m-1",children:[(0,s.jsx)("label",{htmlFor:"octave-",children:"Decrease octave: "}),(0,s.jsx)("input",{id:"octave-",type:"text",value:r,onChange:function(e){i(e.target.value),localStorage.setItem("octavechangekeys",JSON.stringify([localStorage.getItem("octavechangekeys")?JSON.parse(localStorage.getItem("octavechangekeys"))[0]:null,e.target.value]))}})]})]}),(0,s.jsx)("h3",{children:"Guitar"}),(0,s.jsxs)("div",{className:"m-1",children:[(0,s.jsx)("div",{className:a().description,children:"Sets amount of strings on guitar (not implemented yet)"}),(0,s.jsx)("label",{htmlFor:"strings",children:"Strings amount: "}),(0,s.jsx)("input",{id:"strings",type:"number",value:c,onChange:function(e){setSettingsRange(e.target.value,1,12,l,"stringsAmount")}})]}),(0,s.jsx)("div",{className:a().description,children:"Sets a keyboard key to play certian guitar string (also used in flageolets, fretting, strumming and some other features)"}),(0,s.jsx)("div",{id:"strings-mapping-section"}),(0,s.jsxs)("div",{className:"m-1",children:[(0,s.jsx)("div",{className:a().description,children:"Sets amount of frets on guitar (not implemented yet)"}),(0,s.jsx)("label",{htmlFor:"frets",children:"Frets amount: "}),(0,s.jsx)("input",{id:"frets",type:"number",value:d,onChange:function(e){setSettingsRange(e.target.value,1,36,setFretsAmount,"fretsAmount")}})]}),(0,s.jsx)("div",{className:a().description,children:"Sets a keyboard key to use certian guitar fret in flageolets, fretting, strumming and some other features"}),(0,s.jsx)("div",{id:"frets-mapping-section"})]})}},8518:function(e){e.exports={main:"page_main__nw1Wk",description:"page_description__lvaOp",code:"page_code__9AfUJ",grid:"page_grid__JZ9Cz",card:"page_card__Cf__u",center:"page_center__NcdcW",logo:"page_logo__ikIZE",content:"page_content___38fW",vercelLogo:"page_vercelLogo__YYFl1",rotate:"page_rotate__xIioM"}}},function(e){e.O(0,[738,396,691,971,650,744],function(){return e(e.s=4759)}),_N_E=e.O()}]);