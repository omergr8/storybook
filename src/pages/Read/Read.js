import classes from "./Read.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseIcon from "@mui/icons-material/Close";
import Title from "./Sections/Title/Title";
import StoryRead from "./Sections/StoryRead/StoryRead";
import ControlButton from "../Common/ControlButton/ControlButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ReplayIcon from "@mui/icons-material/Replay";
import { getSpeechMarkAtTime } from "../../utility/functions";
import { getSpecificStory } from "../../utility/request";
import LoaderBackdrop from "../Common/Backdrop/LoaderBackdrop";
import ExitDialog from "../Common/ExitDialog/ExitDialog";

const Read = ({}) => {
  const params = useParams();
  const id = React.useRef([]);
  let audioRef = useRef();
  const navigate = useNavigate();
  const [dialogStatus, setDialogStatus] = React.useState(false);
  const [page, setPage] = useState(0);
  const [storyData, setStoryData] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [loading, setLoading] = React.useState({ status: false, message: "" });
  // for audio playback
  const [highlightSection, setHighlightSection] = React.useState({
    from: 0,
    to: 0,
    word: "",
    timeStamp: 0,
    timeStampCurrent: 0,
  });
  const [audioFile, setAudioFile] = useState(new Audio());
  //for custom timer
  const [running, setRunning] = useState(false);
  const [hl, setHl] = useState("");

  useEffect(() => {
    setLoading((prevState) => {
      return {
        ...prevState,
        status: true,
        message: "Please wait, fetching data...",
      };
    });
    getSpecificStory(params.id).then((data) => {
      if (data.data) {
        setStoryData(data.data[0]);
        setLoading((prevState) => {
          return { ...prevState, status: false, message: "" };
        });
      }
    });
  }, []);

  // UseEffect hook to set change selected sentence audio when index of story changes ( next sentence/Previous Sentence )
  useEffect(() => {
    setAudioFile(new Audio(storyData?.story[page - 1]?.audio));
    audioRef.current = new Audio(storyData?.story[page - 1]?.audio);
  }, [page]);

  const resetSection = () => {
    setHighlightSection({
      from: 0,
      to: 0,
      word: "",
      timeStamp: 0,
      timeStampCurrent: 0,
    });
  };
  const clearSetTimeout = () => {
    for (let i = 0; i < storyData?.story[page - 1]?.speechParams.length; i++) {
      clearTimeout(id.current[i]);
    }
  };

  const handleNext = () => {
    if (page < storyData?.story.length) {
      setPage((prevActiveStep) => prevActiveStep + 1);
      onClickPause();
      setRunning(false);
      resetSection();
      setHl("");
      clearSetTimeout();
    }
  };
  const handleBack = (p) => {
    if (page >= 0) {
      setPage((prevActiveStep) => prevActiveStep - 1);
      onClickPause();
      setRunning(false);
    }
    setHl("");
    clearSetTimeout();
    resetSection();
  };

  const detectWord = () => {
    const set = storyData?.story[page - 1]?.speechParams;
    // console.log("set is",set)
    set.forEach((element, i) => {
      id.current[i] = setTimeout(() => {
        setHl(element.value);
        if (
          storyData &&
          audioFile &&
          Object.keys(storyData).length !== 0 &&
          page !== 0
        ) {
          const speechMark = getSpeechMarkAtTime(
            storyData?.story[page - 1]?.speechParams,
            element.time
          );
          onTimeUpdate(speechMark, element.time);
        }
      }, element.time);
    });
  };
  const onClickPlay = (p) => {
    if (page >= 0 || p >= 0) {
      //console.log("i am play 2",audioFile,)
      audioRef.current.play();
      audioRef.current.onplaying = () => {
        setRunning(true);
        detectWord();
      };
    }
  };
  const onClickPause = () => {
    console.log("i pause", audioFile);
    setRunning(false);
    audioRef.current.pause();
  };
  const onTimeUpdate = (speechMark, currentTime) => {
    setHighlightSection({
      from: speechMark.start,
      to: speechMark.end,
      timeStampCurrent: currentTime,
      timeStamp: speechMark.time,
      word: speechMark.value,
    });
  };

  // To detect when audio file ended
  useEffect(() => {
    if (audioFile) {
      audioFile.onended = () => {
        setRunning(false);
        setHl(storyData?.story[page - 1]?.speechParams[0].value);
      };
      if (isAutoPlay && page !== 0) {
        onClickPlay();
      }
    }
  }, [audioFile]);

  const onAutoPlay = () => {
    setIsAutoPlay((prevCheck) => !prevCheck);
  };

  const onExit = () => {
    onClickPause();
    resetSection();
    navigate(`/`);
  };
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      resetSection();
      setRunning(false);
    };
  }, []);
  return (
    <>
      <ExitDialog
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        onExit={onExit}
        message="Are you sure you want to exit this story?"
      />
      <LoaderBackdrop data={loading} />
      {storyData ? (
        <div className={classes.main}>
          <div
            className={classes.exitDiv}
            onClick={() => setDialogStatus(true)}
          >
            <CloseIcon />
          </div>
          <div className="container-85">
            <div className={classes.autoplay}>
              <div onClick={onAutoPlay}>
                <button
                  disabled={!isAutoPlay}
                  className={classes.autoPlayButton}
                >
                  <VolumeUpIcon />
                </button>
              </div>
              <p>autoplay {isAutoPlay ? "on" : "off"}</p>
            </div>
            <div className={classes.replay}>
              <button
                //disabled={isActive}
                className={classes.replayButton}
                onClick={onClickPlay}
              >
                <ReplayIcon />
              </button>
            </div>
            <div className={classes.contentFlex}>
              {page === 0 ? (
                <div className={classes.leftControlEmpty}></div>
              ) : (
                <div className={classes.leftControl}>
                  <ControlButton
                    text=""
                    icon={<NavigateBeforeIcon />}
                    isActive={false}
                    onNext={handleBack}
                  />
                </div>
              )}

              <div className={classes.content}>
                {page === 0 ? (
                  <Title data={storyData?.title} />
                ) : (
                  <StoryRead
                    data={storyData?.story[page - 1]}
                    story={storyData?.story}
                    selectedIndex={page - 1}
                    highlightSection={highlightSection}
                    word={hl}
                    running={running}
                  />
                )}
              </div>
              <div className={classes.rightControl}>
                <ControlButton
                  text=""
                  icon={<NavigateNextIcon />}
                  isActive={page === storyData?.story.length}
                  onNext={handleNext}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        !loading.status && (
          <div className={classes.error}>
            <p>Unable to fetch data. Sorry for the inconvenience</p>
          </div>
        )
      )}
    </>
  );
};
export default Read;
