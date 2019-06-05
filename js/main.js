"use strict";

// ---------- Google spreadsheet diagram --------- //

let sheetId = "1ACxLeDeGTBV8iMWaHjK-sr1XAGk3ACMr7myHwyoDGoA";
let sheetNumber = 1;
let sheetUrl = "https://spreadsheets.google.com/feeds/list/" + sheetId + "/" + sheetNumber + "/public/full?alt=json";
console.log(sheetUrl);

fetch(sheetUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    appendChart(json.feed.entry);
  });

function appendChart(data) {
  console.log(data);

  // prepare data
  let kategori = [];
  let count = [];
  let color = [];

  for (let macro of data) {
    kategori.push(macro['gsx$kategori']['$t']);
    count.push(macro['gsx$count']['$t']);
    color.push(macro['gsx$color']['$t']);
  }

  // generate chart
  let chart = document.getElementById('chart');
  let myDoughnutChart = new Chart(chart, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: count,
        backgroundColor: color
      }],
      labels: kategori
    }
  });
}

/*------------ END ---------*/
