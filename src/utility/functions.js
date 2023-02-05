


export const storyFormatter = (sampleData) => {
  const whitespaceRemoved = sampleData
  const arrayToObj = (myArray) => {
    return myArray.map((str, index) => ({
      value: str,
      id: index + 1,
      backgroundImage: "",
      backgroundCover: "",
      mode: "",
    }));
  };
  const sentenceArrayTitle = whitespaceRemoved
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|");
  const titleIndex = sentenceArrayTitle.findIndex((el) =>
    el.startsWith("Title:")
  );
  const sentenceArray = sentenceArrayTitle.slice(0, titleIndex);
  let titleArray = sentenceArrayTitle.slice(
    titleIndex + 1,
    sentenceArrayTitle.length
  );
  titleArray.forEach(function (part, index) {
    this[index] = {
      value: part.replace(/[0-9]/g, ""),
      id: index + 1,
      backgroundImage: "",
      backgroundCover: "",
      mode: "",
      type: "title",
    };
  }, titleArray);
  return {
    sentenceSet: arrayToObj(sentenceArray),
    titleSet: titleArray
  }
};

export function generateUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  export const getSpeechMarkAtTime = (speechMarks, time) => {
    const length = speechMarks.length;
    let match = speechMarks[0];
    let found = false;
    let i = 1;
    while (i < length && !found) {
      if (speechMarks[i].time <= time) {
        match = speechMarks[i];
      } else {
        found = true;
      }
      i++;
    }
    return match;
  };

  export const textModifier = (story, time, word, text) => {
    const sentenceArray = story;
    let beforeText = [];
    let afterText = [];
     let highlight = story[0].value;
    //const usingSplit = text.split(" ").filter((item) => item);
    const newText = text.replace(/([^\d])\.([^\d])/g,'$1. $2').replace(/([\d])\.([^\d])/g,'$1. $2').replace(/([^\d])\.([\d])/g,'$1. $2')
    const usingSplit = newText.split(" ").filter((item) => item);
    if (time) {
      sentenceArray.forEach((element, i) => {
        if (element.time < time) {
          beforeText.push(usingSplit[i]);
        } else if (element.time > time) {
          afterText.push(usingSplit[i]);
        }else if (element.time === time) {
          highlight = usingSplit[i];
        }
      });
    } else {
      afterText = usingSplit;
      !word && afterText.splice(0, 1);
    }
    //console.log("function test",beforeText,highlight,afterText,'split',usingSplit,usingSplit2)
    let cleanAfterText = afterText.filter((item) => item);
    let cleanBeforeText = beforeText.filter((item) => item);
    cleanBeforeText.push("");
    cleanAfterText.unshift("");
    return {
      before: cleanBeforeText.join(" "),
      after: cleanAfterText.join(" "),
      highlight: highlight,
    };
  };

  const urlMatch = (text) =>{
    return text?.match(/\bhttps?:\/\/\S+/gi);
  }

  export const storyParser = (text,fontSize) =>{
    const arrayToObj = (myArray) => {
      return myArray.map((str, index) => {
        const url = urlMatch(str)
        let obj = {   
          value: '',
          id: '',
          backgroundImage: null ,
          fontSize:fontSize
        }
        if(url){
         obj= {   
            value: str.replace(url[0],"").replace(/(\r\n|\n|\r)/gm, ""),
            id: index + 1,
            backgroundImage: url[0] ,
            fontSize:fontSize
          }
        }else{
          obj= {   
            value: str,
            id: index + 1,
            backgroundImage:  null ,
            fontSize:fontSize
          }
        }
        return obj
      });
    };
    const sentenceArray= text
    .replace(/([?!\n\n])\s*\n(?=[a-zA-Z])/g, "$1|")
    .split("|");
    return arrayToObj(sentenceArray)
  }

  export const titleParser = (text,fz) =>{
    const url = urlMatch(text)
    let obj = {   
      value: '',
      backgroundImage: '' ,
      fontSize:fz
    }
    if(url){
      obj= {   
         value: text.replace(url[0],"").replace(/(\r\n|\n|\r)/gm, ""),
         backgroundImage: url[0] ,
         fontSize:fz
       }
     }else{
       obj= {   
         value: text,
         backgroundImage:  null ,
         fontSize:fz
       }
     }
     return obj
  }

  export const storyPromptCreator = (textValue, englishGrade, storyWords) => {
    return `Tell me a story in ${storyWords} or less that is interesting and creative. Story should use ${englishGrade} language. The story begins like this, “${textValue}” At the end of the story add three lines space and use the tag "Title:" and then give me 3 sample titles in numbered list for this story.`;
  };

  export const transToUppercase = (t) => {
    return t.charAt(0).toUpperCase() + t.slice(1);
  };