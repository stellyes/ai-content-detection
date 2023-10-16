const textAPIkey = "da6d75ca4emsh6141adc1de07170p15d12ajsn08a3f957a221";
const newsAPIkey = "pub_310941d0b0fa18d49abbe048e6b4f4d748fbe";
const historyContainer = document.getElementById("history-list");
const searchBox = document.getElementById("search-bar");
const radioLinks = document.querySelector("#search-type-links");
const radioAi = document.querySelector("#search-type-ai");
const textSearchResult = document.querySelector("#ai-result");
const percentResult = document.querySelector("#ai-percent");

var searchHistoryList = [];
var searchHistoryAi = [];

function getNews(query) {
  m.request({
    url: `https://newsdata.io/api/1/news?apikey=pub_310941d0b0fa18d49abbe048e6b4f4d748fbe&q=${query}&size=1`,
  })
    .then(function (data) {
      console.log(data);
      if (data.status == "success") {
        console.log(data);
        // Get array of articles from data
        let articles = data.results;
        // Iterate over articles and append to webpage
        for (let i = 0; i < articles.length; i++) {
          fillSearchResults(articles[i]);
        }
      }
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
    });
}

// Checks input text for AI likeness
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

function handleTextResults(data) {
  let probability = parseFloat(data.real_probability) * 100;
  let outcome = "Definitely AI";

  if (probability > 60) {
    outcome = "Likely not AI";
  } else if (probability > 40) {
    outcome = "Maybe AI";
  }

  let percentage = `${Math.floor(probability)}%`;

  return { result: outcome, percent: percentage };
}

// Generates content for webpage
function fillSearchResults(result) {
  let searchResultsElement = document.getElementById("search-results-view");
  // Creating link element through Mithral.js
  let link = m("a", { href: result.link, target: "_blank" }, result.title);
  // Creating list element
  let listItem = m(
    "li.w3-margin-left.w3-round-large",
    { id: "search-result" },
    [link]
  );
  // Append listItem to searchResultsElement
  m.render(searchResultsElement, listItem);
}

function handleSearch() {
  if (radioAi.checked) {
    addHistory(searchHistoryAi, "ai-history");
    checkFullText(searchBox.value);
  } else if (radioLinks.checked) {
    getNews(searchBox.value);
    addHistory(searchHistoryList, "link-history");
    renderHistory(searchHistoryList);
  }
}

//Adds a new searched item to the search history
function addHistory(historyArray, storage) {
  var searchedContent = searchBox.value;

  //If search entry has been searched, removes the old entry from history
  if (historyArray.includes(searchedContent)) {
    historyArray.splice(historyArray.indexOf(searchedContent), 1);
  }
  //If history has more than 5 entries, removes the oldest entry
  else if (historyArray.length >= 5) {
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
  for (var i = 0; i < 5; i++) {
    storageItem = storage + " " + i;
    historyArray[i] = localStorage.getItem(storageItem);
  }
}

//Renders the history list on the page
function renderHistory(historyArray) {
  var historyEntries = [];

  if (historyArray[0] == undefined || historyArray[0] == null) {
    return;
  }
  //Removes the old history list
  for (var i = 0; i < historyArray.length - 1; i++) {
    if (historyArray[i] == null || historyContainer.lastElementChild == null) {
      break;
    }
    historyContainer.lastElementChild.remove();
    console.log("removed el");
  }
  //Initial page rendering
  for (var i = 0; i < historyArray.length; i++) {
    if (historyArray[i] == null) {
      break;
    }
    //historyEntry = document.createElement("li");
    let historyText = historyArray[i].toString();
    historyEntries[i] = m("li", historyText);
  }
  m.render(historyContainer, historyEntries);
}

recallHistory(searchHistoryList, "link-history");
//recallHistory(searchHistoryAi, "ai-history");
renderHistory(searchHistoryList);

if (searchHistoryList[0] != undefined || searchHistoryList[0] != null) {
  searchBox.value = searchHistoryList[0].toString();
}
