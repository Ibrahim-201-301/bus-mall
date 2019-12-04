'use strict';

//global variables
var imgOne = document.getElementById('bag');
var imgTwo = document.getElementById('banana');
var imgThree = document.getElementById('bathroom');
var imageHouse = document.getElementById('image-house');
var resultList = document.getElementById('result-house');
var ctx = document.getElementById('myChart').getContext('2d');
var imgArray = [];
var titles = []; 
var dataArray = []; //in chart, use data: dataArray --- be sure to push to this array somewhere
var imgContainerArray = [imgOne, imgTwo, imgThree];
var calcClicks = 0;

function drawGraph() {
  // eslint-disable-next-line no-undef
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: titles,
      datasets: [{
        label: '# of Votes',
        // data: [imgArray[0].clicked, 19, 3, 5, 2, 3],
        data: dataArray,
        backgroundColor: [
          'rgba(177, 179, 177, 0.2)',
          'rgba(161, 201, 161, 0.2)',
          'rgba(177, 179, 177, 0.2)',
          'rgba(161, 201, 161, 0.2)',
          'rgba(177, 179, 177, 0.2)',
          'rgba(161, 201, 161, 0.2)',
          'rgba(177, 179, 177, 0.2)',
          'rgba(161, 201, 161, 0.2)',
          'rgba(177, 179, 177, 0.2)',
          'rgba(161, 201, 161, 0.2)',
          'rgba(177, 179, 177, 0.2)',
          'rgba(161, 201, 161, 0.2)',
          'rgba(177, 179, 177, 0.2)',
          'rgba(161, 201, 161, 0.2)',
          'rgba(177, 179, 177, 0.2)',
          'rgba(161, 201, 161, 0.2)',
          'rgba(177, 179, 177, 0.2)',
          'rgba(161, 201, 161, 0.2)',
          'rgba(177, 179, 177, 0.2)',
          'rgba(161, 201, 161, 0.2)'
        ],
        borderColor: [
          'rgba(177, 179, 177, 1)',
          'rgba(161, 201, 161, 1)',
          'rgba(177, 179, 177, 1)',
          'rgba(161, 201, 161, 1)',
          'rgba(177, 179, 177, 1)',
          'rgba(161, 201, 161, 1)',
          'rgba(177, 179, 177, 1)',
          'rgba(161, 201, 161, 1)',
          'rgba(177, 179, 177, 1)',
          'rgba(161, 201, 161, 1)',
          'rgba(177, 179, 177, 1)',
          'rgba(161, 201, 161, 1)',
          'rgba(177, 179, 177, 1)',
          'rgba(161, 201, 161, 1)',
          'rgba(177, 179, 177, 1)',
          'rgba(161, 201, 161, 1)',
          'rgba(177, 179, 177, 1)',
          'rgba(161, 201, 161, 1)',
          'rgba(177, 179, 177, 1)',
          'rgba(161, 201, 161, 1)'
        ],
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
  imgArray.push(this);
}

//helper functions
function randomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//generate random images
//AND add property to create 3 new unique images, no duplicates from immediate previous set
function populateImgs() {
  var currentImages = [];
  // var nextImages = [];
  for (var i = 0; i < imgContainerArray.length; i++) {
    var currentIndex = randomIndex(imgArray.length);
    // var nextIndex = randomIndex(imgArray.length);
    while (currentImages.includes(currentIndex)) {
      currentIndex = randomIndex(imgArray.length);
    }
    // while (nextImages.includes(currentIndex)) {
    //   nextIndex = randomIndex(imgArray.length);
    // }
    currentImages.push(currentIndex);
    // nextImages.push(nextIndex);
    imgContainerArray[i].src = imgArray[currentIndex].src;
    imgContainerArray[i].alt = imgArray[currentIndex].alt;
    imgContainerArray[i].title = imgArray[currentIndex].title;
    imgArray[currentIndex].seen++;
  }
}

//event listener
function handleClick(event) {
  var votedOn = event.target.title;
  calcClicks++;

  for (var i = 0; i < imgArray.length; i++) {
    if (votedOn === imgArray[i].title) {
      imgArray[i].clicked++;
    }
  }
  populateImgs();
  twentyFiveClicks();
}

//appends list to result-house
var renderlist = function() {
  for (var i = 0; i < imgArray.length; i++) {
    var ulEl = document.createElement('ul');
    resultList.appendChild(ulEl);
    var liEl = document.createElement('li');
    liEl.textContent = `${imgArray[i].title} was seen ${imgArray[i].seen} times and voted for ${imgArray[i].clicked} times.`;
    ulEl.appendChild(liEl);
  }
};

function chartResults() {
  for (var i = 0; i < imgArray.length; i++){
    console.log(`${imgArray[i].title} : ${imgArray[i].clicked}`);
    dataArray.push(imgArray[i].clicked);
  }
}

//populates upon 25 clicks
function twentyFiveClicks() {
  if (calcClicks === 25) {
    renderlist();
    imageHouse.removeEventListener('click', handleClick);
    chartResults();
    drawGraph();
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
populateImgs();

