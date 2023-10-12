const textAPIkey = "da6d75ca4emsh6141adc1de07170p15d12ajsn08a3f957a221";
const newsAPIkey = "pub_310941d0b0fa18d49abbe048e6b4f4d748fbe"



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
            console.log(data)
        //   Get array of articles from data
          let articles = data.results;
          // Iterate over articles and append to webpage
          for (let i = 0; i < articles.length; i++) {
            fillSearchResults(articles[i]);
          }
        } else {
          console.log(">> API Call to newsapi.org failed");
        }
      })
      .catch(function(error) {
        console.error('Error fetching data:', error);
      });
  }
  
  // Generates content for webpage
  function fillSearchResults(result) {
    let searchResultsElement = document.getElementById('search-results');
    let listItem = document.createElement('li')
    let link = document.createElement('a');
        link.href = result.link;
        link.textContent = result.title;
        listItem.appendChild(link);
        searchResultsElement.appendChild(listItem); 
        }
  getNews("moon");