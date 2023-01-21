import { openai } from "../config/config";
import { Buffer } from "buffer";
import { storyFormatter, generateUUID } from "./functions";
import { supabase } from "../config/supabaseClient";
import AWS from "aws-sdk";
var speechParams = {
  OutputFormat: "mp3",
  SampleRate: "16000",
  Text: "",
  TextType: "text",
  LanguageCode: "",
  VoiceId: "",
};
var speechParamsJson = {
  OutputFormat: "json",
  SampleRate: "16000",
  Text: "",
  TextType: "text",
  LanguageCode: "",
  VoiceId: "",
  SpeechMarkTypes: ["word"],
};
const params = {
  ACL: "public-read",
  Bucket: "umarpolly",
  Key: ``,
  Body: {},
};
const performTextEnglish = (x, setErrorData) => {
  var polly = new AWS.Polly({ apiVersion: "2016-06-10" });
  speechParams.Text = x;
  speechParams.VoiceId = "Salli";
  speechParams.LanguageCode = "en-US";
  return polly
    .synthesizeSpeech(speechParams)
    .promise()
    .then((audio) => {
      return audio;
    })
    .catch((err) => {
      setErrorData((prevState) => {
        return {
          ...prevState,
          status: true,
          message: err.code ? err?.code : "Internet Error",
          severity: "error",
        };
      });
    });
};
const performTextEnglishJson = (x, setErrorData) => {
  var polly = new AWS.Polly({ apiVersion: "2016-06-10" });
  speechParamsJson.Text = x;
  speechParamsJson.VoiceId = "Salli";
  speechParamsJson.LanguageCode = "en-US";
  return polly
    .synthesizeSpeech(speechParamsJson)
    .promise()
    .then((audio) => {
      return audio;
    })
    .catch((err) => {
      setErrorData((prevState) => {
        return {
          ...prevState,
          status: true,
          message: err.code ? err?.code : "Internet Error",
          severity: "error",
        };
      });
    });
};

export const textToSpeechEn = async (
  sentenceList,
  setRecordingArray,
  setLoading,
  setErrorData,
  setActiveStep
) => {
  try {
    let tt3;
    let newSet = [];
    for (const [i, el] of sentenceList.entries()) {
      const task = el.value.replace(/(\r\n|\n|\r)/gm, "");
      const res = await performTextEnglish(task, setErrorData);
      const resJson = await performTextEnglishJson(task, setErrorData);
      tt3 = await saveImages(res.AudioStream, "mp3", setErrorData);
      let objArray = [];
      if (resJson.AudioStream) {
        const buf = Buffer.from(resJson.AudioStream);
        const content = buf.toString();
        const lines = content.split("\n");
        //console.log("is res 2",buf,content,lines)
        if (!lines[lines.length - 1]) {
          lines.pop();
        }
        for (const line of lines) {
          const obj = JSON.parse(line);
          objArray.push(obj);
        }
      }
      //   console.log({'task': task, 'result': res},tt3)
      if (tt3.Location) {
        newSet = [
          ...newSet,
          {
            backgroundCover: el.backgroundCover,
            backgroundImage: el.backgroundImage,
            id: el.id,
            mode: el.mode,
            value: el.value.replace(/(\r\n|\n|\r)/gm, ""),
            audio: tt3.Location,
            speechParams: objArray,
          },
        ];
        setRecordingArray((prevVals) => [
          ...prevVals,
          {
            backgroundCover: el.backgroundCover,
            backgroundImage: el.backgroundImage,
            id: el.id,
            mode: el.mode,
            value: el.value.replace(/(\r\n|\n|\r)/gm, ""),
            audio: tt3.Location,
            speechParams: objArray,
          },
        ]);
      }
    }
    if (tt3.Location) {
    } else if (tt3.message) {
      setErrorData((prevState) => {
        return {
          ...prevState,
          status: true,
          message: tt3.message ? tt3?.message : "Internet Error",
          severity: "error",
        };
      });
    }
    return newSet;
  } catch (err) {
    console.log(err);
    setLoading((prevState) => {
      return { ...prevState, status: false, message: "" };
    });
  }
};

export const saveImages = async (data, format, setErrorData) => {
  var s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  //Setting Body to audioSTream and Key to unique name to avoid replacement.
  if (format === "image") {
    params.Key = data.name;
  } else {
    params.Key = `${generateUUID()}.${format}`;
  }
  params.Body = data;
  const res = await s3
    .upload(params)
    .promise()
    .then((data1) => {
      return data1;
    })
    .catch((err) => {
      return err;
    });
  return res;
};

export const getStory = async (
  prompt,
  setSentenceList,
  setStoryTitles,
  setActiveStep,
  setLoading,
  setErrorData,
  step
) => {
  try {
    const res = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1770,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const formatter = storyFormatter(res.data.choices[0].text);

    setSentenceList(formatter.sentenceSet);
    setStoryTitles(formatter.titleSet);
    setActiveStep(step);
    setLoading((prevState) => {
      return { ...prevState, status: false, message: "" };
    });
  } catch (error) {
    setLoading((prevState) => {
      return { ...prevState, status: false, message: "" };
    });
    setErrorData((prevState) => {
      return {
        ...prevState,
        status: true,
        message: error.response
          ? error?.response?.data.error.message
          : "Internet Error",
        severity: "error",
      };
    });
  }
};
export const addStory = async (
  story,
  title,
  setActiveStep,
  setLoading,
  setErrorData
) => {
  setLoading((prevState) => {
    return { ...prevState, message: "saving to db" };
  });
  try {
    const docRef = await supabase
      .from("stories")
      .insert({ title: title, story: story });
    if (docRef?.error?.code) {
      setErrorData((prevState) => {
        return {
          ...prevState,
          status: true,
          message: docRef.error.code ? docRef.error.message : "Internet Error",
          severity: "error",
        };
      });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    setLoading((prevState) => {
      return { ...prevState, status: false, message: "" };
    });
  } catch (e) {
    setLoading((prevState) => {
      return { ...prevState, status: false, message: "" };
    });
    setErrorData((prevState) => {
      return {
        ...prevState,
        status: true,
        message: e ? e : "Internet Error",
        severity: "error",
      };
    });
  }
};

export const getStoriesList = async () => {
  const { data, error } = await supabase
  .from('stories')
  .select()
  .order('id', { ascending: false })
  return { data: data, error:error}
}
export const getSpecificStory = async (id) => {
  const { data, error } = await supabase
  .from('stories')
  .select().eq('id', id) 
  console.log("in req",data,id)
  return { data: data, error:error}
}