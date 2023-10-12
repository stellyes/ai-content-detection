const newsAPIkey = "012eed9660f8495dadcabb4c8bd85ca7";
const textAPIkey = "da6d75ca4emsh6141adc1de07170p15d12ajsn08a3f957a221";

// const articlesView = $("#to-be-determined");
// const homepageResults = $("#search-results-container");

// Calls for news articles based on search query, page
// is default = 1 if not specified in function call
function getNews(query, page = 1) {
  // Replaces spaces in search query with plus
  // symbol, as stated the documentatiton
  query = query.replace(" ", "+");
  let apiCall = `https://newsapi.org/v2/everything?q=${query}&pageSize=8&page${page}&apiKey=${newsAPIkey}`;

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
}

function displayTextSearchResults(result) {
  // homepageResults is placeholder for page element
  // yet to be created
  console.log(result);
  //homepageResults.addElement(result);
}

function checkFullText(input) {
  let formattedInput = input.replace(" ", "%20");

  let apiCall = `https://ai-content-detector1.p.rapidapi.com/?text=${formattedInput}`;
  let apiOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": textAPIkey,
      "X-RapidAPI-Host": "ai-content-detector1.p.rapidapi.com",
    },
  };

  fetch(apiCall, apiOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function handleSearch() {}

// Example call with JUST search parameter
// getNews("cats");

// Example call with query and page number
// getNews("cats", 3);

// Example call to text checker
//var fakeArticle =
//   "Cats, with their enigmatic personalities and graceful movements, have been cherished pets for centuries. These independent creatures bring joy and comfort to millions of households worldwide. Cats are known for their agility, keen senses, and curiosity. One of the most endearing qualities of cats is their affectionate nature. They form strong bonds with their owners and enjoy cuddling and purring. However, they also retain a degree of independence that makes them fascinating companions. Their playful antics and hunting instincts keep them active and entertained, often to the delight of their human families. Cats come in a vast array of breeds, each with its unique characteristics and appearance. From the regal Persian with its long, luxurious coat to the sleek and athletic Siamese, there's a cat to suit every preference. Whether you prefer a quiet lap cat or a spirited, adventurous feline, there's a cat for you. Cats are also known for their grooming rituals, keeping themselves immaculately clean. Their grooming habits extend to fellow cats and even their human family members, as they often lick their loved ones to show affection. Beyond being beloved pets, cats have a rich history in various cultures.";

// setTimeout(function () {
//   console.log(">> testing fake article");
//   checkFullText(fakeArticle);
// }, 2000);

// var realArticle =
//   "Perched precariously on her posterior at the riverside, bear 409 looks the very epitome of gluttony. After months of gorging on sockeye salmon, she has tucked away enormous stores of fat to see her through the cold winter months. Her impressive size saw bear 409 – or Beadnose as she was nicknamed – crowned the 2018 Champion of Alaska's Katmai National Park's annual Fat Bear Week. The competition, which began in 2014, has seen members of the public cast in excess of a million votes in some years for their favourite brown bears; all while the animals gobble down dozens of salmon each day at feeding hotspots on the park's Brooks River, ahead of their winter months spent in a deep sleep known as torpor. Gaining weight is important for the bears, as once they enter their den they will not eat or drink until they emerge again in the spring. Although salmon runs in Katmai have been high in recent years, there are some concerns about how the fish might respond to the high temperatures and weather this summer.";

// setTimeout(function () {
//   console.log(">> testing real article");
//   checkFullText(realArticle);
// }, 8000);
