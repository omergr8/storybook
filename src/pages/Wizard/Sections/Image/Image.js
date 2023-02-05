import classes from "./Image.module.css";
import React from "react";
import SelectBox from "../../../Common/SelectBox/SelectBox";
import { imageOptionSet } from "../../../Constants/sets";
const Image = ({ imageOption, setImageOption }) => {

  const onGradeSelect = (el) => {
    setImageOption(el);
  };

  return (
    <>
      <div className={classes.main}>
        <div className={classes.title}>
          <p>Will you be adding images to each page?</p>
        </div>
        <div className={classes.box}>
          {imageOptionSet.map((el, i) => (
            <div key={i} className={classes.boxDiv}>
              <SelectBox
                title={el}
                selectedItem={imageOption}
                onSelect={onGradeSelect}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Image;
