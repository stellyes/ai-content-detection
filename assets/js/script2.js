const textAPIkey = "da6d75ca4emsh6141adc1de07170p15d12ajsn08a3f957a221";
const newsAPIkey = "pub_310941d0b0fa18d49abbe048e6b4f4d748fbe";
const historyContainer = document.getElementById("history-list");
const searchBox = document.getElementById("search-bar");

var searchHistoryList = [];
var searchHistoryAi = [];

function getNews(query) {
  apiCall = `https://newsdata.io/api/1/news?apikey=pub_310941d0b0fa18d49abbe048e6b4f4d748fbe&q=${query}&size=2`;
  fetch(apiCall)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.status == "success") {
        console.log(data);
        //   Get array of articles from data
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

// Generates content for webpage
function fillSearchResults(result) {
  let searchResultsElement = document.getElementById("search-results-view");
  let listItem = document.createElement("li");
  let link = document.createElement("a");
  link.href = result.link;
  link.target = "_blank";
  link.textContent = result.title;
  listItem.appendChild(link);
  listItem.setAttribute("id", "search-result");
  listItem.setAttribute("class", "w3-margin-left w3-round-xlarge");
  searchResultsElement.appendChild(listItem);
}

function handleSearch() {
  if (searchBox.value) {
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

//Renders the history list on the page
function renderHistory(historyArray) {
  var historyEntry;

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
    historyEntry = document.createElement("li");
    historyEntry.innerHTML = historyArray[i].toString();
    historyContainer.appendChild(historyEntry);
  }
}

recallHistory(searchHistoryList, "link-history");
recallHistory(searchHistoryAi, "ai-history");

if (searchHistoryList[0] != undefined || searchHistoryList[0] != null) {
  searchBox.value = searchHistoryList[0].toString();
}
handleSearch();
