import classes from "./TextTab.module.css";
import React, { useState, useEffect } from "react";
import { background } from "../../../../Constants/BackgroundUrl";
import clsx from "clsx";

const TextTab = ({sentence,onChange}) => {

console.log("in text",sentence)

  return (
    <>
      <div className={classes.main}>
        <div className={classes.textFlex}>
          <div className={classes.text} style={{backgroundImage:`url(${sentence.backgroundCover})`}}>
           <div className="container-80">
           <p>
             {sentence.value}
            </p>
           </div>
          </div>
          <div className={classes.backgroundSelector}>
            {background.map((el, i) => (
              <div key={i} onClick={()=>onChange(sentence.id,'text',el)} className={clsx(classes.backBox,el===sentence.backgroundCover && classes.activatedBox)} style={{backgroundImage:`url(${el})` }}>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default TextTab;
