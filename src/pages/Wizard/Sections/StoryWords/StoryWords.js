import classes from "./StoryWords.module.css";
import React, { useState, useEffect } from "react";
import clsx from 'clsx'
import SelectBox from "../../../Common/SelectBox/SelectBox";
import { storyWordsSet } from "../../../Constants/sets";
const StoryWords = ({storyWords,setStoryWords }) => {
    
    const onGradeSelect = (el)=>{
        setStoryWords(el)
    }
  return (
    <>
      <div className={classes.main}>
        <div className={classes.title}>
            <p>How many words would you like your story to be?</p>
        </div>
        <div className={classes.box}>
            {
                storyWordsSet.map((el,i)=>(
                    <div key={i} className={clsx(classes.boxDiv,(el==="100 words" && storyWords==="") && classes.animation)}>
                        <SelectBox title={el} selectedItem={storyWords} onSelect={onGradeSelect}/>
                        </div>  
                ))
            }
            
        </div>
      </div>
    </>
  );
};
export default StoryWords;
