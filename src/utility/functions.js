const formatRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const cleanWordRegex = /[^\p{L}\p{N} ]+/gu;
const sam = `Molly saw an ice cream shop. She wanted to get some ice cream for her and her brother Chris, but she didn't have any money.

She thought for a moment, and then she had an idea. She turned to her dog Murphy and said, "Murphy, I need you to help me get some ice cream."
Murphy wagged his tail and barked, "Of course, Molly! What do you need me to do?"

Molly whispered her plan to Murphy and they set off to put it into action. Chris followed along, not knowing what was happening.

https://language-learning-app.s3.amazonaws.com/KTest1and2/lavachocho_hat_1_4fc9e081-0fcd-432f-9041-2d5c26714925.jpg
They walked up to the ice cream shop and Molly asked the man behind the counter for three ice cream cones. The man asked for the money, but Molly just smiled and said, "We don't have any money, but my dog Murphy can talk. Can he pay for the ice cream instead?"

The man looked skeptical, but Molly insisted. Murphy stepped forward and said, "I can talk, and I promise we will pay you back as soon as we can." The man was shocked, but he agreed and gave them the ice cream cones. Molly, Chris and Murphy enjoyed their ice cream cones and walked away with big smiles on their faces.

When they got back to the RV, Molly's mom Sally and dad George were surprised to see them eating ice cream. Molly explained the whole situation, and Sally and George couldn't stop laughing. They even gave Murphy a special doggy treat for being such a clever and resourceful dog.`
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
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
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
    const usingSplit = text.split(" ").filter((item) => item);
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
    let cleanAfterText = afterText.filter((item) => item);
    let cleanBeforeText = beforeText.filter((item) => item);
    //console.log("before is",cleanBeforeText.join(" "),'after',cleanAfterText.join(" "),'hl',highlight)
    var format = formatRegex;
    // if (
    //   cleanAfterText[0] &&
    //   cleanAfterText[0]?.replace(cleanWordRegex, "") ===
    //     word.replace(cleanWordRegex, "")
    // ) {
    //   const special = format.exec(cleanAfterText[0]);
    //   if (special) {
    //     highlight = special["input"];
    //   } else {
    //     highlight = word;
    //   }
    // } else if (word) {
    //   if (
    //     cleanBeforeText[cleanBeforeText.length - 1]?.replace(
    //       cleanWordRegex,
    //       ""
    //     ) !== word.replace(cleanWordRegex, "")
    //   ) {
    //     highlight = word;
    //   } else {
    //     highlight = cleanBeforeText[cleanBeforeText.length - 1];
    //   }
    // }
    // if (
    //   cleanBeforeText[cleanBeforeText.length - 1]?.replace(cleanWordRegex, "") ===
    //   word.replace(cleanWordRegex, "")
    // ) {
    //   const special = format.exec(cleanBeforeText[cleanBeforeText.length - 1]);
    //   if (special) {
    //     highlight = special["input"];
    //   } else {
    //     highlight = word;
    //   }
    // } else if (word) {
    //   if (cleanAfterText[0]) {
    //     highlight = cleanAfterText[0];
    //   } else {
    //     highlight = word;
    //   }
    // }
    // if (
    //   cleanAfterText[0]?.replace(cleanWordRegex, "") ===
    //     word.replace(cleanWordRegex, "") ||
    //   cleanAfterText[0] === word + "."
    // ) {
    //   cleanAfterText.splice(0, 1);
    // }
    // if (
    //   cleanBeforeText[cleanBeforeText.length - 1]?.replace(cleanWordRegex, "") ===
    //     word.replace(cleanWordRegex, "") ||
    //   cleanBeforeText[cleanBeforeText.length - 1] === word + "."
    // ) {
    //   cleanBeforeText.splice(cleanBeforeText.length - 1, 1);
    // }
    cleanBeforeText.push("");
    cleanAfterText.unshift("");
    return {
      before: cleanBeforeText.join(" "),
      after: cleanAfterText.join(" "),
      highlight: highlight,
    };
  };

  const urlMatch = (text) =>{
    // console.log("yh",text?.match(/\bhttps?:\/\/\S+/gi))
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
       // console.log("test thus",str,url)
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