// Utility Logic
function isEmpty(testString) {
  return (testString.trim().length === 0);
}

//Business logic
function wordCounter(text) {
  if (isEmpty(text)) {
    return 0;
  }
  let wordCount = 0;
  const textArray = text.split(" ");
  textArray.forEach(function (element) {
    if (!Number(element)) { wordCount++; }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (isEmpty(word)) {
    return 0;
  }
  const textArray = text.trim().split(" ");
  let wordCount = 0;
  textArray.forEach(function (element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function offensiveWordCleaner(text) {
  if (isEmpty(text)) {
    return 0;
  }
  const textArray = text.split(" ");
  const offensiveWords = ["zoinks", "muppeteer", "biffaroni", "loopdaloop"];
  let resultArray = [];
  resultArray = textArray.filter(function (element) {
    return !offensiveWords.includes(element.toLowerCase());
  });

  return resultArray.join(" ");
}

function wordFrequency(text) {
  if (isEmpty(text)) {
    return 0;
  }
  const textArray = text.split(" ");
  let resultArray = [];

  textArray.forEach(function (word) {
    let found = false;
    resultArray.forEach(function (element) {
      if (element[0] === word) {
        element[1] += 1;
        found = true;
      }
    });
    if (!found) {
      resultArray.push([word, 1]);
    }
  });
  return resultArray;
}

//UI logic
function boldPassage(word, text) {
  if (isEmpty(text) || isEmpty(word)) {
    return null;
  }
  const p = document.createElement("p");
  let textArray = text.split(" ");
  textArray.forEach(function (element, index) {
    if (word === element) {
      const bold = document.createElement("strong");
      bold.append(element);
      p.append(bold);
    } else {
      p.append(element);
    }
    if (index !== (textArray.length - 1)) {
      p.append(" ");
    }
  });
  return p;
}

function handleFormSubmission(e) {
  e.preventDefault();
  const passage = document.getElementById("text-passage").value;
  const word = document.getElementById("word").value;
  const wordCount = wordCounter(passage);
  const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
  document.getElementById("total-count").innerText = wordCount;
  document.getElementById("selected-count").innerText = occurrencesOfWord;

  let boldedPassage = boldPassage(word, passage);
  if (boldedPassage) {
    document.querySelector("div#bolded-passage").append(boldedPassage);
  } else {
    document.querySelector("div#bolded-passage").innerText = null;
  }

  const resultArray = wordFrequency(passage);
  console.log(resultArray);
}

window.addEventListener("load", function () {
  document.querySelector("form#word-counter").addEventListener("submit", handleFormSubmission);
});