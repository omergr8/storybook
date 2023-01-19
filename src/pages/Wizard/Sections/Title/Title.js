import classes from "./Title.module.css";
import React, { useState, useEffect } from "react";
import SelectBox from "../../../Common/SelectBox/SelectBox";
import ImageModeTab from "../../../Common/ImageModeTab/ImageModeTab";
import { saveImages } from "../../../../utility/request";
const Title = ({
  isActive,
  titles,
  setTitles,
  selectedTitle,
  setSelectedTitle,
}) => {
  const [selectedBox, setSelectedBox] = useState("");
  const onTitleSelect = (el) => {
    setSelectedTitle(el);
  };
  const onInputChange = (e) => {
    var customObj = {
      value: e,
      id: titles.length +1,
      backgroundImage: "",
      backgroundCover: "",
      mode: "",
      type: "custom",
    };
    const copySet = [...titles];
   // console.log("i am ic bef",  copySet);
    copySet[copySet.length - 1].type === "title" && (copySet[titles.length] = customObj);
    const customIndex = titles.findIndex(el=>el.type==='custom')
    customObj.backgroundCover = titles[titles.length - 1].backgroundCover 
    if (titles[titles.length - 1].type === "title") {
      setTitles(copySet);
    }else if(customIndex!==-1){
      customObj.backgroundCover = titles[titles.length - 1].backgroundCover 
      customObj.backgroundImage = titles[titles.length - 1].backgroundImage 
      customObj.mode = titles[titles.length - 1].mode 
      copySet[customIndex] =  customObj
      // console.log("i am ic",copySet)
       setTitles(copySet);
    }
    setSelectedTitle(customObj);
  };
  const onBackgroundChange = async (id, mode, background) => {
    //console.log("i am change ", id, mode, background, "test", titles);
    const copySet = [...titles];
    let temporaryarray = titles.slice();
    const objIndex = copySet.findIndex((obj) => obj.id == id);
    copySet[objIndex].mode = mode;
    if (mode === "image") {
      temporaryarray[objIndex]['status'] = true;
      setTitles(temporaryarray)
      const imageUrl = await saveImages(background.file,'image')
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
    setTitles(copySet);
  };
  return (
    <>
      <div className={classes.main}>
        <div className={classes.title}>
          <p>Choose Title</p>
        </div>
        <div className={classes.box}>
          {titles.map(
            (el, i) =>
              el.type === "title" && (
                <div key={i} className={classes.boxDiv}>
                  <SelectBox
                    title={el.value}
                    titleObj={el}
                    selectedBox={selectedBox}
                    setSelectedBox={setSelectedBox}
                    selectedItem={selectedTitle}
                    onSelect={onTitleSelect}
                  />
                </div>
              )
          )}
          <div className={classes.boxDiv}>
            <SelectBox
              type="text"
              title={"create own title"}
              handleInput={onInputChange}
              selectedBox={selectedBox}
              setSelectedBox={setSelectedBox}
              selectedItem={selectedTitle}
              onSelect={onTitleSelect}
            />
          </div>
        </div>
        {selectedTitle && (
          <div className={classes.titleImageSection}>
            <div className={classes.title}>
              <p>Choose Title Image</p>
            </div>

            <div className={classes.content}>
              <ImageModeTab
                sentence={selectedTitle}
                onChange={onBackgroundChange}
                mode="title"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Title;
