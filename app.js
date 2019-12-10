'use strict';

/* eslint-disable no-unused-vars */

// global variables
var imgOne = document.getElementById('bag');
var imgTwo = document.getElementById('banana');
var imgThree = document.getElementById('bathroom');

var imageHouse = document.getElementById('image-house');
var resultList = document.getElementById('result-house');

var ctx = document.getElementById('myChart').getContext('2d');
var titles = [];
var dataArrayVoted = [];
var dataArraySeen = [];

var twentyImgArray = [];
var threeImgArray = [imgOne, imgTwo, imgThree];
var uniqueArray = [];
var calcClicks = 0;

// bar chart data
function drawGraph() {
  // eslint-disable-next-line no-undef
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: titles,
      datasets: [{
        label: 'Number of Votes',
        data: dataArrayVoted,
        backgroundColor: 'rgba(161, 201, 161, 0.2)',
        borderColor: 'rgba(161, 201, 161, 1)',
        borderWidth: 2
      },
      {
        label: 'Number of Views',
        data: dataArraySeen,
        backgroundColor: 'rgba(177, 179, 177, 0.2)',
        borderColor: 'rgba(177, 179, 177, 1)',
        borderWidth: 2
      }]
    }
  });
}

// RandomImage constructor
function RandomImage(src, name) {
  this.src = `img/${src}.jpg`;
  this.alt = name;
  this.title = name;
  this.seen = 0;
  this.clicked = 0;

  titles.push(name);
  twentyImgArray.push(this);
}

// helper function
function randomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// create 3 new unique images, no duplicates from immediate previous set
function uniqueThree(){
  while (uniqueArray.length < 6) {
    var random = randomIndex(twentyImgArray.length);
    if (!uniqueArray.includes(random)) {
      uniqueArray.push(random);
    }
  }
}

function removeImgs() {
  for (var i = 0; i < 3; i++) {
    uniqueArray.shift();
  }
}

// generate random images
function populateImgs() {
  uniqueThree();
  for (var i = 0; i < threeImgArray.length; i++) {
    threeImgArray[i].src = twentyImgArray[uniqueArray[i]].src;
    threeImgArray[i].alt = twentyImgArray[uniqueArray[i]].alt;
    threeImgArray[i].title = twentyImgArray[uniqueArray[i]].title;
    twentyImgArray[uniqueArray[i]].seen++;
  }
}

// event listener
function handleClick(event) {
  var votedOn = event.target.title;
  calcClicks++;

  for (var i = 0; i < twentyImgArray.length; i++) {
    if (votedOn === twentyImgArray[i].title) {
      twentyImgArray[i].clicked++;
    }
  }
  twentyFiveClicks();
}

// adds data to graph -to be called in fn 25clicks
function chartResults() {
  for (var i = 0; i < twentyImgArray.length; i++){
    dataArrayVoted.push(twentyImgArray[i].clicked);
    dataArraySeen.push(twentyImgArray[i].seen);
  }
}

// store in localStorage:
// ---titles: array of titles
// ---votesArr: array of total votes per title
function storeInLS(titles, votesArr, seenArr) {

  // areate object to store
  var titleVotes = {
    title: titles,
    votes: votesArr,
    seen: seenArr,
  };

  // stringify object to be saved
  var titlesVotesStr = JSON.stringify(titleVotes);

  // set object in localStorage
  localStorage.setItem('vote-data', titlesVotesStr);
}

// upon 25 clicks, populate bar chart with results
function twentyFiveClicks() {
  if (calcClicks === 25) {
    imageHouse.removeEventListener('click', handleClick);
    chartResults();
    
    // check local storage
    var dataLS = localStorage.getItem('vote-data'); // if empty; dataLS === null

    // returns true if 'dataLS' is not empty (something is in localStorage)
    if (dataLS){
      // parse the dataLS from string to object
      var parseVoteData = JSON.parse(dataLS);

      console.log('old dataArrayVoted: ', dataArrayVoted);
      for (var i = 0; i < parseVoteData.title.length; i++) {
        // increment the dataArrayVoted at each index to include data from localStorage
        dataArrayVoted[i] += parseVoteData.votes[i];
        dataArraySeen[i] += parseVoteData.seen[i];
      }
      console.log('new dataArrayVoted: ', dataArrayVoted);

      // store updated array in localStorage
      storeInLS(titles, dataArrayVoted, dataArraySeen);
      
    } else {
      // store into localStorge for the first time
      storeInLS(titles, dataArrayVoted, dataArraySeen);
    }

    drawGraph();

  // under 25 clicks:
  } else {
    removeImgs();
    populateImgs();
  }
}

// new image instantiation
function addToConstructor() {
  new RandomImage('bag', 'R2D2 Bag');
  new RandomImage('banana', 'Banana Slicer');
  new RandomImage('bathroom', 'iPad & TP Stand');
  new RandomImage('boots', 'Toeless Rainboots');
  new RandomImage('breakfast', 'Breakfast Maker');
  new RandomImage('bubblegum', 'Meatball Bubblegum');
  new RandomImage('chair', 'Funny Red Chair');
  new RandomImage('cthulhu', 'Cthulhu Action Figure');
  new RandomImage('dog-duck', 'Duckbill Dog Muzzle');
  new RandomImage('dragon', 'Canned Dragon Meat');
  new RandomImage('pen', 'Dining Utensil Pen');
  new RandomImage('pet-sweep', 'Pet Sweep');
  new RandomImage('scissors', 'Pizza Scissors');
  new RandomImage('shark', 'Shark Sleeping Bag');
  new RandomImage('sweep', 'Microfiber Onesie');
  new RandomImage('tauntaun', 'TaunTaun Baby Mat');
  new RandomImage('unicorn', 'Canned Unicorn Meat');
  new RandomImage('usb', 'Reptile Tail USB');
  new RandomImage('water-can', 'Nonsense Watering Can');
  new RandomImage('wine-glass', 'Wine Sniffer');
}

// render
imageHouse.addEventListener('click', handleClick);
addToConstructor();
