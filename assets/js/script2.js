// const newsAPIkey = "012eed9660f8495dadcabb4c8bd85ca7";
const textAPIkey = "da6d75ca4emsh6141adc1de07170p15d12ajsn08a3f957a221";
const newsAPIkey = "4ff7a804afc85531b4d7c3a6916c8670"
const historyContainer = document.getElementById('history-list');

var searchHistoryList = [];
var searchHistoryAi = [];


function getNews(query) {
    // Replaces spaces in search query with plus
    // symbol, as stated the documentatiton
    // query = query;
    // let apiCall = `https://newsapi.org/v2/everything?q=${query}&pageSize=8&page${page}&apiKey=${newsAPIkey}`;
         apiCall = `https://mediastack.com/v1/news?access_key = 4ff7a804afc85531b4d7c3a6916c8670 & keywords = ${query} & sources = en`;
    fetch(apiCall)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.status == "ok") {
          // Get array of articles from data
          let articles = data.articles;
          // Iterate over articles and append to webpage
          for (let i = 0; i < articles.length; i++) {
            fillSearchResults(articles[i]);
          }
        } else {
          console.log(">> API Call to newsapi.org failed");
        }
      });
  }
  
// Generates content for webpage
function fillSearchResults(result) {
  // articlesView is placeholder for page element
  // yet to be created
  console.log(result);
  //articlesView.addElement(result);
  let link = document.createElement('a');
  link.href = results.url;
  document.getElementById('search-results').appendChild(link);
}

//Updates storage from history array
function updateHistory(historyArray, storage) {
  var storageItem;
  for (var i = 0; i < historyArray.length; i++) {
    storageItem = storage + ' ' + i;
    if (historyArray[i] != null) {
      localStorage.setItem(storageItem, historyArray[i]);
    }
  }
}

//Updates history array from storage
function recallHistory(historyArray, storage) {
  var storageItem;
  for (var i = 0; i < 10; i++) {
    storageItem = storage + ' ' + i;
    historyArray[i] = localStorage.getItem(storageItem);
  }
}

//Renders the history list on the page
function renderHistory(historyArray) {
  var historyEntry;
  for (var i = 0; i < historyArray.length; i++) {
    historyEntry  = document.createElement("li");
    historyEntry.innerHTML = historyArray[i].toString();
    historyContainer.appendChild(historyEntry);
  }
}

recallHistory(searchHistoryList, "link-history");
recallHistory(searchHistoryAi, "ai-history");
renderHistory(searchHistoryList);
    
getNews("United States");

//   var root = document.body

//   m.render(root, "hello world")