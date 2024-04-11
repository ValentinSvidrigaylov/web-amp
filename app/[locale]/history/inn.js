'use client';
import { useTranslations } from "next-intl";
import styles from 'app/page.module.css';
import "app/css/history.css";
import * as Tone from 'tone'
import { usePathname, useSearchParams } from 'next/navigation';
import React, { Fragment, useEffect, useCallback, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Inner() {
  const [popups,setPopups] = useState({});
  const [test,setTest] = useState();

  const t = useTranslations("HistoryPage");

  function handleCacheControl(url) {
    // if (url.match(/\.data/) || url.match(/\.bundle/)) {
    //   return "must-revalidate";
    // }
    // if (url.match(/\.mp4/) || url.match(/\.wav/)) {
    return "immutable"; //since there is no mutable files (except you wanna get the latest version)
    // }
    // return "no-store";
  }

    const { unityProvider, requestPointerLock, requestFullscreen, sendMessage, addEventListener, removeEventListener, isLoaded, loadingProgression } = useUnityContext({
        loaderUrl: "./build/webgl_build.loader.js",
        dataUrl: "./build/webgl_build.data",
        frameworkUrl: "./build/webgl_build.framework.js",
        codeUrl: "./build/webgl_build.wasm",
        cacheControl: handleCacheControl
      });

      let trackedImage;
      let mouseOnImage;
      let output;
      let actualImageSize;
      let characterDiv;

      let fullscreen = false;

      let checked = true;
      let started = false;
      const characterMarkerSizePercentage = 0.04;

      function handleClick(e) {
        //debounce(()=>{requestPointerLock()},3000);
        if (checked == true) {
          requestPointerLock();
          checked = false;
          started = true;
          // if (started == false) {
          //   started = true;
            //console.log('started');
            setTimeout(() => {
              checked=true
            }, 3000)
          // } 
        }
      }

  useEffect(()=>{
    if (isLoaded&&typeof window != "undefined") {
      document.querySelector('canvas').addEventListener("click", handleClick);
      trackedImage = document.querySelector('img#trackedImage');
      mouseOnImage = { x:0, y:0};
      output = document.querySelector("input[type='text']");
      actualImageSize = { width: 0, height: 0 };
      actualImageSize.width = trackedImage.clientWidth;
      actualImageSize.height = trackedImage.clientHeight;
      characterDiv = document.getElementById("character");
      characterDiv.style.width = `${trackedImage.clientWidth*characterMarkerSizePercentage}px`;
      characterDiv.style.height = `${trackedImage.clientWidth*characterMarkerSizePercentage}px`;
      console.log("character is: ");
      console.log(characterDiv);
      
      trackedImage.addEventListener("mousedown", function(e){
        mouseOnImage.x = e.pageX - trackedImage.offsetParent.offsetLeft;
        mouseOnImage.y = e.pageY - trackedImage.offsetParent.offsetTop;
        //parseFloat(Number.parseFloat().toFixed(2))
        output.value = `x: ${ parseFloat(mouseOnImage.x / actualImageSize.width * 100).toFixed(2) /* since our outer div's width is equals to image width, we need to extract 100% from actual percentage; upd: fixed by tracking offset from parent */  }%, y: ${ parseFloat(mouseOnImage.y / actualImageSize.height * 100).toFixed(2) }%`;
        console.log(`${ parseFloat(mouseOnImage.x / actualImageSize.width * 100).toFixed(2)};${parseFloat(mouseOnImage.y / actualImageSize.height * 100).toFixed(2)}`);
        sendMessage("EventSystem", "TeleportPlayerToSpecificPos", `${parseFloat(mouseOnImage.y / actualImageSize.height * 100).toFixed(2)};${parseFloat(mouseOnImage.x / actualImageSize.width * 100).toFixed(2)}`);
      });
      trackedImage.addEventListener("mousemove", function(e){
        mouseOnImage.x = e.pageX - trackedImage.offsetParent.offsetLeft;
        mouseOnImage.y = e.pageY - trackedImage.offsetParent.offsetTop;
        // console.log("");
        // console.log("offsets: ",trackedImage.offsetParent.offsetLeft,trackedImage.offsetParent.offsetTop);
        // console.log("e axes: ",e.pageX,e.pageY);
        // console.log("x: ",mouseOnImage.x,"y: ",mouseOnImage.y);
        // console.log("width: ",actualImageSize.width,"height: ",actualImageSize.height);
        // console.log("percentages: ",parseFloat(mouseOnImage.x / actualImageSize.width * 100).toFixed(2),parseFloat(mouseOnImage.y / actualImageSize.height * 100).toFixed(2));
      });
      trackedImage.addEventListener("mouseup", function(e){
        mouseOnImage.x = e.pageX - trackedImage.offsetParent.offsetLeft;
        mouseOnImage.y = e.pageY - trackedImage.offsetParent.offsetTop;
      });
      window.onresize = () => {
        actualImageSize.width = trackedImage.clientWidth;
        actualImageSize.height = trackedImage.clientHeight;
        characterDiv.style.width = `${trackedImage.clientWidth*characterMarkerSizePercentage}px`;
        characterDiv.style.height = `${trackedImage.clientWidth*characterMarkerSizePercentage}px`;
      };

      window.onkeydown ??= (e)=>{started ? e.preventDefault() : null;console.log(e.keyCode);switch (e.keyCode) {case 70: requestFullscreen(!fullscreen);break; case 67: e.preventDefault();break; case 27: started = false;break;}};

      window.onresize = (e) => {
        let wrap = document.querySelector("div.map-mask-wrap");
        let inner = [...wrap.children].slice(2)
        let trackedImage = document.getElementById("trackedImage");
        console.log(inner)
        for (let i of inner) {
          console.log(i)
          i.style.width = `${trackedImage.clientWidth*characterMarkerSizePercentage/2}px`;
          i.style.height = `${trackedImage.clientWidth*characterMarkerSizePercentage/2}px`;
          i.style.left = `${trackedImage.clientWidth*(i.getAttribute("y")*0.01- characterMarkerSizePercentage*0.5/2)}px`;
          i.style.top = `${trackedImage.clientHeight*(i.getAttribute("x")*0.01 - characterMarkerSizePercentage*0.5/2)}px`;
        }      
      }
    }
    },[isLoaded])

    const handleUpdateMarkerPosition = useCallback((x, y) => {
      // console.log(`${x},${y}`);
      if (typeof window != "undefined") {
        characterDiv = document.getElementById("character");
        trackedImage = document.querySelector('img#trackedImage');  
        characterDiv.style.visibility = "visible";
        characterDiv.style.left = `${trackedImage.clientWidth*(y*0.01 - characterMarkerSizePercentage*0.5)}px`;
        characterDiv.style.top = `${trackedImage.clientHeight*(x*0.01 - characterMarkerSizePercentage*0.5)}px`;
      }
    }, []);

    // let active_popups = [];
    // let popups = {};

    useEffect(()=>{
      console.log("")
      console.log("test changed!")
      console.log(test)
      console.log("")
    },[test])
    
    // let i = 0;
    const inner_popups = {Fender: {inner: t.raw("popups_fender")}, 
    VintageFender: {inner: t.raw("popups_vintagefender")},
    Gibson: {inner: t.raw("popups_gibson")}, 
    Ibanez: {inner: t.raw("popups_ibanez")},
    VintageFenderTele: {inner: t.raw("popups_vintagefendertele")},
    Squier: {inner: t.raw("popups_squier")},
    Epiphone: {inner: t.raw("popups_epiphone")},
    Marshall: {inner: t.raw("popups_marshall")},
    Boss: {inner: t.raw("popups_boss")},
    FenderHammerTone: {inner: t.raw("popups_fenderhammertone")},
    VintageMarshall: {inner: t.raw("popups_vintagemarshall")}};


    const handleTriggerEventWeb = useCallback((EventName,x,y) => {
      // setTest((()=>{console.log("test ch");return i})());
      // i++;
      let trackedImage = document.getElementById("trackedImage");
      console.log("test: ",test);
      console.log("trigger event",EventName);
      console.log("event pos: ", x, y);      
      let wrap = trackedImage.parentElement;
      if (!wrap.querySelector(`#${EventName}`)||[...wrap.querySelectorAll("div")].filter((e)=>e.id!="character").filter((e)=>Number(e.getAttribute("x"))==x&&Number(e.getAttribute("y"))==y).length == 0) {
        let el = document.createElement("div");
        el.style.cssText = `background: #DCDCDC; border-radius: 50%; z-index: 10; width: ${trackedImage.clientWidth*characterMarkerSizePercentage/2}px; height: ${trackedImage.clientWidth*characterMarkerSizePercentage/2}px; left: ${trackedImage.clientWidth*(y*0.01- characterMarkerSizePercentage*0.5/2)}px; top: ${trackedImage.clientHeight*(x*0.01 - characterMarkerSizePercentage*0.5/2)}px; transform-style: preserve-3d;`
        el.setAttribute("x", x);
        el.setAttribute("y", y);
        el.id = EventName;
        el.onclick = () => {
          // !active_popups.includes(EventName) ? active_popups.push(EventName) : active_popups.splice(active_popups.indexOf(EventName), 1);
          // setPopups({...popups, [EventName]: {innerHTML: inner_popups[EventName].innerHTML,isActive: el.children[0].style.display == "none" ? true : false}})
          setPopups({...popups, [EventName]: {innerHTML: inner_popups[EventName].innerHTML,isActive: el.children.length != 0 ? !el.children[0].open : !document.getElementById(EventName).children[0].open}})
          // console.log("dialog is: ",el.children[0].open)
        };
        // active_popups.push(EventName);
        wrap.appendChild(el);
        // let t_popups = popups;
        // t_popups[EventName]={innerHTML: inner_popups[EventName],isActive:true};
        // console.log(inner_popups);
        // console.log("t_popups: ",t_popups);
        setPopups({...popups, [EventName]: {innerHTML: inner_popups[EventName].inner,isActive:true}});
      } else {
        // popups[EventName].isActive=true;
        // let t_popups = popups;
        // t_popups[EventName].isActive=true;
        // console.log("t_popups: ",t_popups);
        console.log("popups: ",popups)
        // setPopups({...popups, [EventName]: {innerHTML: popups[EventName].innerHTML,isActive:true}});
        setPopups({...popups, [EventName]: {innerHTML: inner_popups[EventName].inner,isActive:true}});
      }
    }, []);

    const handleUnTriggerEventWeb = useCallback((EventName) => {
      // console.log("untrigger event",EventName);
      // let t_popups = popups;
      // t_popups[EventName].isActive=false;
      // console.log("t_popups (untrigger): ",t_popups);
      // const inner_popups = {Fender: {inner: `<div style="width: 15vw;max-height: 15vh;overflow: auto;border: 3px solid black;top: 0.9vh;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac posuere quam. Curabitur volutpat lectus tincidunt eros congue iaculis. Aenean dui augue, porta et nisi at, fermentum tincidunt purus. Pellentesque pretium convallis mollis. Nullam lorem orci, molestie et interdum vel, ornare sit amet dui. Suspendisse eu purus interdum, sodales sem ac, mattis urna. Nullam molestie dolor dolor, sed feugiat ex bibendum non. Nulla vel elementum dui, a varius dolor. Nulla tempus sollicitudin gravida. Phasellus hendrerit tellus turpis, vel facilisis nisl tincidunt tincidunt.</div>`}, VintageFender: {inner: `<div style="width: 15vw;max-height: 15vh;overflow: auto;border: 3px solid black;top: 0.9vh;left: -10px"><b>Hello, World!</b></div>`}};
      console.log(popups)
      setPopups({...popups, [EventName]: {innerHTML: inner_popups[EventName].inner,isActive:false}});
      // setPopups({...popups, [EventName]: {innerHTML: popups[EventName].innerHTML,isActive:false}});
      // setPopups({...popups, [EventName]: {innerHTML: inner_popups[EventName],isActive:false}});
    }, []);
 
    useEffect(() => {
      addEventListener("UpdateMarkerPosition", handleUpdateMarkerPosition);
      addEventListener("TriggerEventWeb", handleTriggerEventWeb);
      addEventListener("UnTriggerEventWeb", handleUnTriggerEventWeb);
      return () => {
        removeEventListener("UpdateMarkerPosition", handleUpdateMarkerPosition);
        removeEventListener("TriggerEventWeb", handleTriggerEventWeb);
        removeEventListener("UnTriggerEventWeb", handleUnTriggerEventWeb);
      };
    }, [addEventListener, removeEventListener, handleUpdateMarkerPosition, handleTriggerEventWeb, handleUnTriggerEventWeb]);

    useEffect(()=>{
      console.log("")
      console.log("popups change");
      console.log(popups)
      console.log("")
      if (window) {
        for (let el in popups) {
          let wrap = document.querySelector("div.map-mask-wrap");
          console.log(el);
          let cur = wrap.querySelector(`#${el}`);
          console.log("\ncur:\n ",cur);
          if (!cur.querySelector(`dialog.popup-content`)) {
            let item =  document.createElement("dialog");
            let trackedImage = wrap.querySelector("img");
            item.classList.add("popup-content");
            item.innerHTML = '<svg style="width: 20px; height:10px;position: relative; left: -10px; top: -10px"><polygon points="10,0 20,10 0,10"></polygon></svg>'+popups[el].innerHTML;
            console.log("inn: ",popups[el].innerHTML)
            // item.style.cssText = ``;
            // item.style.display = "block";
            item.show()
            item.style.position = "absolute";
            item.style.left = item.style.top = `${trackedImage.clientWidth*characterMarkerSizePercentage/4}px`;
            item.style.transform = "translateZ(-10px)";
            item.show()
            // item.style.left = trackedImage.clientWidth*(Number(cur.getAttribute("y") - characterMarkerSizePercentage*0.5/2)*0.01);
            // item.style.top = trackedImage.clientHeight*(Number(cur.getAttribute("x") - characterMarkerSizePercentage*0.5/2)*0.01);
            
            cur.appendChild(item);
          } else {
            let item = cur.querySelector(`dialog.popup-content`);
            // item.style.display = popups[el].isActive ? "block" : "none";
            popups[el].isActive ? item.show() : item.close()
          }
        }
      }
    },[popups]);

    useEffect(()=>()=>{
      if (typeof window != "undefined") {
        window.onresize = null;
        window.onkeydown = null;
      }
    },[])
// const [octave, setOctave] = useState(); //init octave
// console.log("initial octave: ", octave)
// const [keysLength, setKeysLength] = useState();
// const [renderSynth, setRenderSynth] = useState(()=>()=>{});
// const [test, setTest] = useState(()=>()=>{console.log('old')})
return (
    <main className={styles.main}>
        <div className={[styles.description, 'center-block text-center m-2']} style={{lineHeight: '3rem'}}>
            <span>{ t("showcase_title") }</span>
        </div>
        <div className="center-block">
          <span className={styles.description} style={{textAlign: "center", display:"block", marginLeft: "auto", marginRight: "auto", padding: "2rem"}}>{ t("showcase_hints") }</span>
          {/* <input type="text" style={{display: "block", marginLeft: "auto", marginRight: "auto"}} disabled/> */}
          {loadingProgression<1 && <span style={{textAlign: "center", display:"block", marginLeft: "auto", marginRight: "auto", padding: "2rem"}}>{ t("showcase_loading") }{(loadingProgression*100).toFixed(2)}%</span>}
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", padding: "0 !important", margin: "0 !important", maxWidth: "80vw"}}>
            <Unity unityProvider={unityProvider} style={{width: "100%", margin: 'auto', display: 'block'}}/>
            <div class="map-mask-wrap">
              <img src="img/map.png" width='100%' height='100%' id="trackedImage"/>
              <div style={{ background: "black", borderRadius: "50%", left: "50%", top: "50%", visibility: "hidden", zIndex: 10 }} id="character"></div>
            </div>
          </div>
        </div>
    </main>
    );
}