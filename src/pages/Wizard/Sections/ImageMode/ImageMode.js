import classes from "./ImageMode.module.css";
import React, { useState } from "react";
import SelectBox from "../../../Common/SelectBox/SelectBox";
import ControlButton from "../../../Common/ControlButton/ControlButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ImageModeTab from "../../../Common/ImageModeTab/ImageModeTab";
import { saveImages } from "../../../../utility/request";

const ImageMode = ({
  isHappy,
  setIsHappy,
  handleNext,
  isActive,
  sentenceList,
  setSentenceList,
  imageOption
}) => {
  const [imageStatus,setImageStatus] = useState({status:false,id:0})

  const onSatisfactionSelect = (el) => {
    setIsHappy(el);
  };
  const onBackgroundChange = async (id, mode, background) => {
    const copySet = [...sentenceList];
    let temporaryarray = sentenceList.slice();
    const objIndex = copySet.findIndex((obj) => obj.id == id);
    copySet[objIndex].mode = mode;
    copySet[objIndex].status = false;
    if (mode === "image") {
      temporaryarray[objIndex]['status'] = true;
      setSentenceList(temporaryarray)
      const imageUrl = await saveImages(background.file)
      if(imageUrl.Location){
        copySet[objIndex].backgroundImage = imageUrl.Location;
        copySet[objIndex].status = false;
      }else{
        copySet[objIndex].backgroundImage = background;
        copySet[objIndex].status = false;
      } 
    } else {
      copySet[objIndex].backgroundCover = background;
    }
    setSentenceList(copySet);
  };

  return (
    <>
      <div className={classes.main}>
        <div className={classes.title}>
          <p>Here’s your AI generated story.</p>
        </div>
        <div className={classes.header}>
          <div className={classes.box}>
            <div className={classes.quest}>
              <p>Are you happy with this story?</p>
            </div>
            <div className={classes.selectBox}>
              <div className={classes.yesBox}>
                <SelectBox
                  title={"Yes"}
                  selectedItem={isHappy}
                  onSelect={onSatisfactionSelect}
                />
              </div>
              <div className={classes.noBox}>
                <SelectBox
                  title={"No"}
                  selectedItem={isHappy}
                  onSelect={onSatisfactionSelect}
                />
              </div>
            </div>
            <div className={classes.nextButton}>
              <ControlButton
                text=""
                icon={<NavigateNextIcon sx={{ fontSize: "45px" }} />}
                isActive={isActive}
                onNext={handleNext}
              />
            </div>
          </div>
        </div>
        {sentenceList.map((el, i) => (
          <div key={i} className={classes.content}>
            <ImageModeTab sentence={el} imageOption={imageOption} imageStatus={imageStatus} onChange={onBackgroundChange} />
          </div>
        ))}
      </div>
    </>
  );
};
export default ImageMode;
