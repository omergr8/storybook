import classes from "./Wizard.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Toast from "../Common/Toast/Toast";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseIcon from "@mui/icons-material/Close";
import CreateStory from "./Sections/CreateStory/CreateStory";
import EnglishLevel from "./Sections/EnglishLevel/EnglishLevel";
import StoryWords from "./Sections/StoryWords/StoryWords";
import Image from "./Sections/Image/Image";
import ImageMode from "./Sections/ImageMode/ImageMode";
import NotHappy from "./Sections/NotHappy/NotHappy";
import Title from "./Sections/Title/Title";
import Congrats from "./Sections/Congrats/Congrats";
import RecordButton from "../Common/RecordButton/RecordButton";
import ControlButton from "../Common/ControlButton/ControlButton";
import LoaderBackdrop from "../Common/Backdrop/LoaderBackdrop";
import ExitDialog from "../Common/ExitDialog/ExitDialog";
import { storyPromptCreator,transToUppercase } from "../../utility/functions";
import { getStory, textToSpeechEn, addStory } from "../../utility/request";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

const Wizard = () => {

  // Using react=speech-recognition
  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition();
  
  const navigate = useNavigate();

  const [dialogStatus, setDialogStatus] = React.useState(false);
  const [recordingStatus, setRecordingStatus] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [sentenceArray, setSentenceArray] = useState([]);
  const [sentenceList, setSentenceList] = useState();
  const [recordingArray, setRecordingArray] = React.useState([]);
  const [storyTitles, setStoryTitles] = useState();
  const [selectedTitle, setSelectedTitle] = useState("");
  const [englishGrade, setEnglishGrade] = useState("");
  const [storyWords, setStoryWords] = useState("");
  const [imageOption, setImageOption] = useState("");
  const [isHappy, setIsHappy] = useState("");
  const [notHappy, setNotHappy] = useState("");
  const [images, setImages] = React.useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = React.useState({ status: false, message: "" });
  const [errorData, setErrorData] = useState({
    status: false,
    message: "",
    severity: "error",
  });



  useEffect(() => {
    if (activeStep === 0) {
      textValue === "" ? setIsActive(true) : setIsActive(false);
    }
    if (activeStep === 1) {
      englishGrade === "" ? setIsActive(true) : setIsActive(false);
    }
    if (activeStep === 2) {
      storyWords === "" ? setIsActive(true) : setIsActive(false);
    }
    if (activeStep === 3) {
      imageOption === "" ? setIsActive(true) : setIsActive(false);
    }
    if (activeStep === 4) {
      isHappy === "" ? setIsActive(true) : setIsActive(false);
    }
    if (activeStep === 5) {
      notHappy === "" ? setIsActive(true) : setIsActive(false);
    }
    if (activeStep === 6) {
      selectedTitle === "" ? setIsActive(true) : setIsActive(false);
    }
  }, [
    textValue,
    englishGrade,
    activeStep,
    storyWords,
    imageOption,
    isHappy,
    notHappy,
    selectedTitle,
  ]);
 
  const handleNext = () => {
    if (activeStep === 4 && isHappy === "Yes" && !isActive) {
      setActiveStep((prevActiveStep) => prevActiveStep + 2);
    } else if (activeStep === 4 && isHappy === "Yes" && !isActive) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 5 && !isActive) {
      // logic for not Happy
      if (notHappy === "Start over with new prompt") {
        setActiveStep(0);
      } else {
        getOpenAiStory(4);
      }
    } else if (!isActive && activeStep === 3) {
      getOpenAiStory(4);
    } else if (!isActive && activeStep === 6) {
      handleSave();
    } else if (!isActive) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const appendSentence = (val, cond) => {
    if (cond === true) {
      const sentence = [...sentenceArray, val].join(" ");
      setTextValue(sentence);
    } else if (cond === "type") {
      setSentenceArray([val]);
      setTextValue(val);
    } else if (cond === false) {
      setSentenceArray((prevVals) => [...prevVals, val]);
      const sentence = [...sentenceArray, val].join(" ");
      setTextValue(sentence);
    }
  };

  const onStart = () => {
    setRecordingStatus(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const onEnd = () => {
    resetTranscript();
    setRecordingStatus(false);
    SpeechRecognition.stopListening();
    if (transcript !== "") {
      appendSentence(transToUppercase(transcript) + ".", false);
    }
  };
  useEffect(() => {
    if (recordingStatus && transcript && transcript !== "") {
      appendSentence(transToUppercase(transcript), true);
    } else if (!recordingStatus) {
      resetTranscript();
      SpeechRecognition.startListening();
      SpeechRecognition.stopListening();
    }
  }, [transcript]);

  const steps = [
    {
      label: "Record 1",
      description: (
        <CreateStory
          appendSentence={appendSentence}
          textValue={textValue}
          setTextValue={setTextValue}
        />
      ),
    },
    {
      label: "Record 2",
      description: (
        <EnglishLevel
          englishGrade={englishGrade}
          setEnglishGrade={setEnglishGrade}
        />
      ),
    },
    {
      label: "Record 3",
      description: (
        <StoryWords storyWords={storyWords} setStoryWords={setStoryWords} />
      ),
    },
    {
      label: "Record 4",
      description: (
        <Image imageOption={imageOption} setImageOption={setImageOption} />
      ),
    },
    {
      label: "Record 5",
      description: (
        <ImageMode
          isHappy={isHappy}
          setIsHappy={setIsHappy}
          isActive={isActive}
          handleNext={handleNext}
          images={images}
          setImages={setImages}
          backgroundImage={backgroundImage}
          setBackgroundImage={setBackgroundImage}
          sentenceList={sentenceList}
          setSentenceList={setSentenceList}
          imageOption={imageOption}
        />
      ),
    },
    {
      label: "Record 6",
      description: (
        <NotHappy
          isActive={isActive}
          notHappy={notHappy}
          setNotHappy={setNotHappy}
        />
      ),
    },
    {
      label: "Record 7",
      description: (
        <Title
          isActive={isActive}
          titles={storyTitles}
          setTitles={setStoryTitles}
          selectedTitle={selectedTitle}
          setSelectedTitle={setSelectedTitle}
        />
      ),
    },
    {
      label: "Record 8",
      description: <Congrats selectedTitle={selectedTitle} />,
    },
  ];
  const handleSave = async () => {
    setLoading((prevState) => {
      return {
        ...prevState,
        status: true,
        message: "Please wait, converting text to audio",
      };
    });
    const data = await textToSpeechEn(
      sentenceList,
      setRecordingArray,
      setLoading,
      setErrorData,
      setActiveStep
    );
    //console.log("i am saving", storyTitles, recordingArray, "lk", data);
    addStory(data, selectedTitle, setActiveStep, setLoading, setErrorData);

  };
  const getOpenAiStory = (step) => {
    setLoading((prevState) => {
      return {
        ...prevState,
        status: true,
        message: "Please wait, our AI engine is working on it...",
      };
    });
    const prompt = storyPromptCreator(textValue, englishGrade, storyWords);
    getStory(
      prompt,
      setSentenceList,
      setStoryTitles,
      setActiveStep,
      setLoading,
      setErrorData,
      step
    );
    //console.log("story data is", textValue, englishGrade, storyWords, prompt);
  };

  const onExit = () => {
    navigate(`/`);
  };
  return (
    <>
      <ExitDialog
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        onExit={onExit}
        message="Are you sure you want to exit this story?  Changes will not be saved."
      />
      <Toast errorData={errorData} setErrorData={setErrorData} />
      <LoaderBackdrop data={loading} />
      {steps[activeStep] && (
        <>
          <div
            className={classes.exitDiv}
            onClick={() => setDialogStatus(true)}
          >
            <CloseIcon />
          </div>
          <div className={classes.main}>
            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <div className="container-50">
                  {steps[activeStep].description}
                  <div className={classes.control}>
                    <div className={classes.micButton}>
                      {activeStep === 0 && (
                        <RecordButton
                          recordingStatus={recordingStatus}
                          onStart={onStart}
                          onEnd={onEnd}
                        />
                      )}
                    </div>
                    {activeStep !== 4 && activeStep !== 7 && (
                      <div className={classes.nextButton}>
                        <ControlButton
                          text="tap to continue"
                          icon={<NavigateNextIcon />}
                          isActive={isActive}
                          onNext={handleNext}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </>
      )}
    </>
  );
};
export default Wizard;
