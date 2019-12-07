/* eslint-disable no-unused-vars */
'use strict';

//global variables
var imgOne = document.getElementById('bag');
var imgTwo = document.getElementById('banana');
var imgThree = document.getElementById('bathroom');
var imageHouse = document.getElementById('image-house');
var resultList = document.getElementById('result-house');
var ctx = document.getElementById('myChart').getContext('2d');
var twentyImgArray = [];
var titles = [];
var dataArrayVoted = [];
var dataArraySeen = [];
var uniqueArray = [];
var threeImgArray = [imgOne, imgTwo, imgThree];
var calcClicks = 0;

// var titleVotes = new Object();
// titleVotes.title = titles;
// titleVotes.vites = dataArrayVoted;

//bar chart data
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

//RandomImage constructor
function RandomImage(src, name) {
  this.src = `../img/${src}.jpg`;
  this.alt = name;
  this.title = name;
  this.seen = 0;
  this.clicked = 0;

  titles.push(name);
  twentyImgArray.push(this);
}

//helper functions
function randomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//create 3 new unique images, no duplicates from immediate previous set
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

//generate random images
function populateImgs() {
  uniqueThree();
  for (var i = 0; i < threeImgArray.length; i++) {
    threeImgArray[i].src = twentyImgArray[uniqueArray[i]].src;
    threeImgArray[i].alt = twentyImgArray[uniqueArray[i]].alt;
    threeImgArray[i].title = twentyImgArray[uniqueArray[i]].title;
    twentyImgArray[uniqueArray[i]].seen++;
  }
}

//event listener
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

//appends list to result-house
var renderlist = function() {
  for (var i = 0; i < twentyImgArray.length; i++) {
    var ulEl = document.createElement('ul');
    resultList.appendChild(ulEl);
    var liEl = document.createElement('li');
    liEl.textContent = `${twentyImgArray[i].title} was seen ${twentyImgArray[i].seen} times and voted for ${twentyImgArray[i].clicked} times.`;
    ulEl.appendChild(liEl);
  }
};

//adds data to graph -called within fn 25clicks
function chartResults() {
  for (var i = 0; i < twentyImgArray.length; i++){
    dataArrayVoted.push(twentyImgArray[i].clicked);
    dataArraySeen.push(twentyImgArray[i].seen);
  }
  // console.log('data', dataArrayVoted);
}

//upon 25 clicks, render result list and populate bar chart with results
function twentyFiveClicks() {
  if (calcClicks === 25) {
    renderlist();
    imageHouse.removeEventListener('click', handleClick);
    chartResults();
    drawGraph();

    //save image title and vote data
    var dataLS = localStorage.getItem('item-data');
    for (var i = 0; i < titles.length; i++) {
      
      if (dataLS){
        console.log('yes: ', dataLS);
        
      } else {
        var titleVotes = {
          title: titles,
          votes: dataArrayVoted,
        };
        localStorage.setItem('item-data', JSON.stringify(titleVotes));
        var getVoteData = localStorage.getItem('vote-data');

        var parseVoteData = JSON.parse(getVoteData);
        parseVoteData;
      }
    }
  } else {
    removeImgs();
    populateImgs();
    localStorage.getItem('item-data');
  }
}

//new image instantiation
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

//render
imageHouse.addEventListener('click', handleClick);
addToConstructor();

//local storage
var storageArray = [];
function titleAndVotes(title, votes) {
  this.title = title;
  this.votes = votes;
  storageArray.push(this);
}
