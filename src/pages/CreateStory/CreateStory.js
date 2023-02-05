import classes from "./CreateStory.module.css";
import React, { useState } from "react";
import Toast from "../Common/Toast/Toast";
import StoryArea from "./components/StoryArea/StoryArea";
import TitleArea from "./components/TitleArea/TitleArea";
import PageCard from "../Common/PageCard/PageCard";
import LoaderBackdrop from "../Common/Backdrop/LoaderBackdrop";
import { useNavigate } from "react-router-dom";
import { storyParser, titleParser, } from "../../utility/functions";
import { textToSpeechEn,addStory } from "../../utility/request";

const CreateStory = ({}) => {
    const navigate = useNavigate();
  const [storyText, setStoryText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [fontSize, setFontSize] = useState(20);
  const [titleFontSize, setTitleFontSize] = useState(30);
  const [storySet, setStorySet] = useState();
  const [titleObj, setTitleObj] = useState();
  const [recordingArray, setRecordingArray] = React.useState([]);
  const [loading, setLoading] = React.useState({ status: false, message: "" });
  const [errorData, setErrorData] = useState({
    status: false,
    message: "",
    severity: "error",
  });

  const onRefresh = () => {
    if(storyText === "" && titleText !== "" ){
        setErrorData({
            status: true,
            message: "Please Input Story Text",
            severity: "error",
          })
    }else if(storyText !== "" && titleText === "" ){
        setErrorData({
            status: true,
            message: "Please Input Story Title",
            severity: "error",
          })
    }else if(storyText === "" && titleText === "" ){
        setErrorData({
            status: true,
            message: "Please Input Story Text and Title",
            severity: "error",
          })
    }
    if (storyText !== "" && titleText !== "") {
        setErrorData({
            status: false,
            message: "",
            severity: "error",
          })
      const sp = storyParser(storyText,fontSize);
      const title = titleParser(titleText,titleFontSize);
      setStorySet(sp);
      setTitleObj(title);
    }
  };

  const handlePage = () =>{
    navigate(`/`);
  }

  const handleSubmit = async () =>{
    //console.log('story is',storySet)
   if(storySet && titleObj){
    setLoading((prevState) => {
        return {
          ...prevState,
          status: true,
          message: "Please wait, converting text to audio",
        };
      });
      const data = await textToSpeechEn(
        storySet,
        setRecordingArray,
        setLoading,
        setErrorData,
      );
      //console.log('story is',storySet,data)
      addStory(data, titleObj, null, setLoading, setErrorData,handlePage);
   }else{
    setErrorData({
        status: true,
        message: "Please generate story first",
        severity: "error",
      })
   }
      
  }
  
  return (
    <>
    <Toast errorData={errorData} setErrorData={setErrorData} />
    <LoaderBackdrop data={loading} />
      <div className={classes.main}>
        <div className="container-90">
          <div className={classes.flexGrid}>
            <div className={classes.grid1}>
              <div className={classes.fixed}>
                <div>
                  <StoryArea
                    storyText={storyText}
                    setStoryText={setStoryText}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    onRefresh={onRefresh}
                  />
                </div>
                <div className={classes.title}>
                  <TitleArea
                    titleText={titleText}
                    setTitleText={setTitleText}
                    titleFontSize={titleFontSize}
                    setTitleFontSize={setTitleFontSize}
                  />
                </div>
                <div className={classes.submit}>
                  <button className={classes.submitButton} onClick={handleSubmit}>Submit Story</button>
                </div>
              </div>
            </div>
            <div className={classes.grid2}>
              {storySet && titleObj ? (
                <>
                {storySet.map((el,i)=>(
                    <div key={i} className={classes.contentCard}>
                    <PageCard page={'Page ' + el.id} text={el.value} image={el.backgroundImage} fontSize={el.fontSize} />
                  </div>
                ))}
                  
                  <div>
                    <PageCard page="Title" type="title" text={titleObj.value} image={titleObj.backgroundImage} fontSize={titleObj.fontSize}  />
                  </div>
                </>
              ) : (
                <>
                  <div className={classes.contentCard}>
                    <PageCard page="Page 1" />
                  </div>
                  <div>
                    <PageCard page="Title" type="title" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateStory;
