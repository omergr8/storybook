import classes from "./EnglishLevel.module.css";
import React, { useState, useEffect } from "react";
import SelectBox from "../../../Common/SelectBox/SelectBox";
import { englishLevel } from "../../../Constants/sets";
const EnglishLevel = ({englishGrade,setEnglishGrade }) => {
    
    const onGradeSelect = (el)=>{
        setEnglishGrade(el)
    }
  return (
    <>
      <div className={classes.main}>
        <div className={classes.title}>
            <p>What level English do you want the story to be written in?</p>
        </div>
        <div className={classes.box}>
            {
                englishLevel.map((el,i)=>(
                    <div key={i} className={classes.boxDiv}>
                        <SelectBox title={el} selectedItem={englishGrade} onSelect={onGradeSelect}/>
                        </div>  
                ))
            }
            
        </div>
      </div>
    </>
  );
};
export default EnglishLevel;
