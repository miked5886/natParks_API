"use strict";

const apiKey = "W3z4SRUGadAQVbNPSeSNZyOkELlM2EXveuUJU3wk";
const searchURL = "https://api.nps.gov/api/v1/parks";

$(document).ready(function() {
  watchSubmitForm();
});

//Watch for form submit
function watchSubmitForm() {
  console.log("watchSumbitForm works!");
  $("#search-form").submit(e => {
    e.preventDefault();
    let searchState = $("#state-code").val();
    let numResults = $("#number-input").val();
    getParks(searchState, numResults);
  });
}

//Format Search Query
function formatQueryParams(params) {
  console.log("formatQueryParams function works!");
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

//GET Request to nat parks API
function getParks(query, limit = 10) {
  console.log("getParks works!");

  const params = {
    stateCode: query,
    limit,
    api_key: apiKey
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  //Test query in console
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      console.log(err);
      alert("Something went wrong, try again!");
    });
}

//Display Results to the dom
function displayResults(responseJson) {
  console.log("displayResult function works");
  $("#results-list").empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(`<br> <br>
      <h3>${responseJson.data[i].fullName}</h3>
      <h4">${responseJson.data[i].description}</h4>
      <br><br>
      <a  target="_blank" href=" ${responseJson.data[i].url}">Visit Website</a> <hr>
     `);
  }
  $("#results-list").removeClass("hidden");
}