
// API key and URL
const baseUrl = 'https://developer.nps.gov/api/v1';

const apiKey = 'greBpc0BsZccTd4pipxLI4DAKeiocGSeHo5nELXp';



//function for formatting the querys for URL
function formatQuery(options) {
 const queryItems = Object.keys(options)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
  return queryItems.join('&');
}


// loop and display the results in the dom
function displayResults(responseJson) {

  $('#results-container').removeClass('hidden').empty();
  for (let i = 0; i < responseJson.data.length; ++i) {
   $('#results-container').append(`<li> <b> ${responseJson.data[i].fullName} </b></br> ${responseJson.data[i].url} </br> <p>${responseJson.data[i].description}</p> </li>`)
   console.log(responseJson);
  } 


//console.log(responseJson);
}

// fetch the url using fetch and catch 
function getUrl(query, maxResult) {
  const options = {
    stateCode: query,
    limit: maxResult,
    api_key: apiKey,
  };

//const reference = "https://developer.nps.gov/api/v1/parks?stateCode=az&limit=10&api_key=greBpc0BsZccTd4pipxLI4DAKeiocGSeHo5nELXp";

  const queryString = formatQuery(options)
  const url = baseUrl + '/parks' + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}


// pull the values using jQuery to insert as params
function getValues() {
$('#submit-button').on('click', event => {
  event.preventDefault();
  const stateValue = $('#state-search').val();
  const maxResult = $('#max-results').val();
  if (maxResult <= 50) {
    $(getUrl(stateValue, maxResult));
  } else {
    alert('The max results to be displayed must be less than or equal to 50.')
  }
  console.log(stateValue, maxResult);
  
})
}

// render all functions
function renderFunctions() {
  $(getValues);   
}

$(renderFunctions);