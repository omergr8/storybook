import classes from "./NotHappy.module.css";
import React, { useState, useEffect } from "react";
import SelectBox from "../../../Common/SelectBox/SelectBox";

const NotHappy = ({isActive,notHappy,setNotHappy}) => {
  console.log("test", isActive);
  const onNotHappySelect = (el)=>{
    setNotHappy(el)
}
  return (
    <>
  <div className={classes.main}>
        <div className={classes.title}>
            <p>Choose how to create a new story.</p>
        </div>
        <div className={classes.box}>
        <div className={classes.boxDiv}>
        <SelectBox title={"Regenerate new story from same prompt"} selectedItem={notHappy} onSelect={onNotHappySelect}/>
        </div>
        <div className={classes.boxDiv}>
        <SelectBox title={"Start over with new prompt"} selectedItem={notHappy} onSelect={onNotHappySelect}/>
        </div>
      
        </div>
      </div>
    </>
  );
};
export default NotHappy;
