import classes from "./SelectBox.module.css";
import React, { useState, useEffect } from "react";
import clsx from "clsx";

const SelectBox = ({
  title,
  titleObj,
  selectedItem,
  handleInput,
  onSelect,
  type = "select",
  selectedBox = "select",
  setSelectedBox,
}) => {

  const onClickHandle = () => {
    if(titleObj){
        onSelect(titleObj);
    }else{
        onSelect(title);
    }
    
    setSelectedBox && setSelectedBox("select");
  };
  const handleText = (e) => {
    setSelectedBox && setSelectedBox(e);
  };
  const onInputFocus = (e) => {
    if(e.target.value===""){
        onSelect("")
    }else{
        handleInput(e.target.value)
    }
  };
  const onInputChange = (e) =>{
    handleInput(e)
  }
  return (
    <>
      <div className={classes.main}>
        {type === "select" ? (
          <div
            onClick={onClickHandle}
            className={clsx(
              classes.box,
              (selectedItem === title || selectedItem?.value === title) &&
                selectedBox === "select" &&
                classes.selected
            )}
          >
            <div className="container-85">
              <p>{title}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => handleText("text")}
            className={classes.inputText}
          >
            <input
              className={clsx(selectedBox === "text" && classes.selectedInput)}
              placeholder="create own title"
              onChange={(e) => onInputChange(e.target.value)}
              onFocus={onInputFocus}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default SelectBox;
