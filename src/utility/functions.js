const formatRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const cleanWordRegex = /[^\p{L}\p{N} ]+/gu;

export const storyFormatter = (sampleData) => {
    console.log("sd",sampleData)
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
  console.log("test funct",titleArray,titleIndex,sentenceArrayTitle)
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
    console.log("before is",cleanBeforeText.join(" "),'after',cleanAfterText.join(" "),'hl',highlight)
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