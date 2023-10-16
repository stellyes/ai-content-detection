const textAPIkey = "da6d75ca4emsh6141adc1de07170p15d12ajsn08a3f957a221";

const radioLinks = document.querySelector("#search-type-links");
const radioAi = document.querySelector("#search-type-ai");
const searchBox = document.querySelector("#search-bar");
const textSearchResult = document.querySelector("#ai-result");
const percentResult = document.querySelector("#ai-percent");
const textResultContainer = document.querySelector("#search-results-container");

var searchHistoryList = [];
var searchHistoryAi = [];

function handleTextResults(data) {
  let probability = parseFloat(data.real_probability) * 100;
  let outcome = "Definitely AI";

  if (probability > 60) {
    outcome = "Likely not AI";
  } else if (probability > 40) {
    outcome = "Maybe AI";
  }

  let percentage = `Human likeness: ${Math.floor(probability)}%`;

  return { result: outcome, percent: percentage };
}

function checkFullText(input) {
  let formattedInput = input.replace(" ", "%20");

  m.request({
    url: `https://ai-content-detector1.p.rapidapi.com/?text=${formattedInput}`,
    headers: {
      "X-RapidAPI-Key": textAPIkey,
      "X-RapidAPI-Host": "ai-content-detector1.p.rapidapi.com",
    },
  }).then(function (data) {
    // Function returns an HTML object if
    // API call fails. We can tell the
    // success of the call from its
    // response type
    try {
      JSON.stringify(data); // no need to save, if this fails it's not JSON

      let parsedData = handleTextResults(data);

      m.render(textSearchResult, parsedData.result);
      m.render(percentResult, parsedData.percent);
    } catch {
      m.render(textSearchResult, "ERROR");
      m.render(percentResult, "Failed to read text");
      console.log(">> Error occured when trying to evaluate user text");
    }
  });
}

function handleSearch() {
  if (radioAi.checked) {
    textResultContainer.style.display = "";
    let query = searchBox.value;
    addHistory(searchHistoryAi, "ai-history");
    checkFullText(query);
  } else if (radioLinks.checked) {
    addHistory(searchHistoryList, "link-history");
    location.assign("./search.html");
  }
}

//Adds a new searched item to the search history
function addHistory(historyArray, storage) {
  var searchedContent = searchBox.value;

  //If search entry has been searched, removes the old entry from history
  if (historyArray.includes(searchedContent)) {
    historyArray.splice(historyArray.indexOf(searchedContent), 1);
  }
  //If history has more than 10 entries, removes the oldest entry
  else if (historyArray.length >= 10) {
    historyArray.splice(historyArray.length - 1, 1);
  }
  //Enters the most recent entry to history
  historyArray.unshift(searchedContent);
  updateHistory(historyArray, storage);
}

//Updates storage from history array
function updateHistory(historyArray, storage) {
  var storageItem;
  for (var i = 0; i < historyArray.length; i++) {
    storageItem = storage + " " + i;
    if (historyArray[i] != null) {
      localStorage.setItem(storageItem, historyArray[i]);
    }
  }
}

//Updates history array from storage
function recallHistory(historyArray, storage) {
  var storageItem;
  for (var i = 0; i < 10; i++) {
    storageItem = storage + " " + i;
    historyArray[i] = localStorage.getItem(storageItem);
  }
}

recallHistory(searchHistoryList, "link-history");
recallHistory(searchHistoryAi, "ai-history");
