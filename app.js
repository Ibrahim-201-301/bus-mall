'use strict';

//global variables
var imgOne = document.getElementById('bag');
var imgTwo = document.getElementById('banana');
var imgThree = document.getElementById('bathroom');
var imageHouse = document.getElementById('image-house');
var resultList = document.getElementById('result-house');
var imgArray = [];
//NEW CONTENT
var imgContainerArray = [imgOne, imgTwo, imgThree];
//END NEW CONTENT
var calcClicks = 0;

//RandomImage constructor
function RandomImage(src, name) {
  this.src = `../img/${src}.jpg`;
  this.alt = name;
  this.title = name;
  this.seen = 0;
  this.clicked = 0;

  imgArray.push(this);
}

//helper functions
function randomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//generate random images
function populateImgs() {
  var currentImages = [];
  for (var i = 0; i < imgContainerArray.length; i++) {
    var currentIndex = randomIndex(imgArray.length);
    while (currentImages.includes(currentIndex)) {
      currentIndex = randomIndex(imgArray.length);
    }
    currentImages.push(currentIndex);
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

//populates upon 25 clicks
function twentyFiveClicks() {
  if (calcClicks === 25) {
    renderlist();
    imageHouse.removeEventListener('click', handleClick);
  }
}

//new image instantiation
function populateOnPageLoad() {
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
populateOnPageLoad();
populateImgs();

