import classes from "./ImageTab.module.css";
import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import LoaderBackdrop from "../../../Backdrop/LoaderBackdrop";
import clsx from "clsx";

const ImageTab = ({ sentence, onChange, mode,imageStatus }) => {
  const maxNumber = 1;
  console.log('test ghj',sentence);
  const onImageChange = (imageList, addUpdateIndex) => {
    // data for submit
    onChange(sentence.id, "image", imageList[0]);
    // setImages(imageList);
  };
  return (
    <>
      <div className={classes.main}>
        <ImageUploading
          multiple
          value={sentence.backgroundImage}
          onChange={onImageChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI

            <div className="upload__image-wrapper">
              <div
                className={classes.imageBox}
                onClick={onImageUpload}
                {...dragProps}
              >
                <div>
                  {sentence?.backgroundImage ? (
                    <div className={classes.image}>
                      <img src={sentence?.backgroundImage} alt="" />
                    </div>
                  ) : (sentence.status) ?<div className={classes.loader} ><CircularProgress sx={{color:'#1A4ED6'}}/><p>Please wait...Your Image is being uploading.</p>  </div>: (
                    <div className={classes.textContent}>
                      <div className={classes.addIcon}>
                        <AddIcon sx={{ fontSize: "40px" }} />
                      </div>
                      <div className={classes.text1}>
                        <p>Tap to upload photo</p>
                      </div>
                      <div className={classes.text2}>
                        <p>or choose Text only mode</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </ImageUploading>

        {mode !== "title" && (
          <div className={classes.text}>
            <p>{sentence.value}</p>
          </div>
        )}
      </div>
    </>
  );
};
export default ImageTab;
