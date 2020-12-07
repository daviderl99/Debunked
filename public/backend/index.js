const IMAGE_SEARCH_URL = "https://www.google.com/searchbyimage?site=search&sa=X&image_url=";
let object;
let usedList = [];

const levels = 5;
let gamePoints = 0;
let imagesShown = 0;

window.onload = () => {
  pickRandomImage();
  document.getElementById("nextImage").addEventListener("click", pickRandomImage);
}

const pickRandomImage = () => {
  hideDescriptionDiv();
  object = DATABASE[Math.floor(Math.random() * DATABASE.length)];
  if (!usedList.includes(object._id)){ // If image & caption have not been shown yet
    document.getElementById("image").src = object.imgSrc;
    document.getElementById("caption").innerText = object.caption;
    document.getElementById("reverse-image-search").href = IMAGE_SEARCH_URL + object.imgSrc;
    usedList.push(object._id);

    imagesShown++;
    showButtonsDiv();
  } else {
    pickRandomImage();
  }
}

const submitAnswer = (answer) => {
  if (answer === object.bool){
    // Correct
    gamePoints++;
    hideButtonsDiv();
    showDescriptionDiv("correct");
  } else {
    // Incorrect
    hideButtonsDiv();
    showDescriptionDiv("wrong");
  }

  if (imagesShown >= levels){
    // ends immediately atm
    gameOver();
  }
}

const gameOver = () => {
  sessionStorage.setItem("levels", levels);
  sessionStorage.setItem("gamePoints", gamePoints);
  window.location.replace("./gameover.html");
}

const hideButtonsDiv = () => {
  div = document.getElementsByClassName("btn-container")[0];
  div.style.display = "none";
}

const showButtonsDiv = () => {
  div = document.getElementsByClassName("btn-container")[0];
  div.style.display = "block";
}

const hideDescriptionDiv = () => {
  div = document.getElementById("desc-container");
  div.style.display = "none";
}

const showDescriptionDiv = (answer) => {
  div = document.getElementById("desc-container");
  desc = document.getElementById("description");
  img = document.getElementById("img-bubble");

  desc.innerText = object.description;
  img.src = `../assets/${answer}.png`;
  div.style.display = "block";
}

// function copyText(){
//   let span = document.getElementById("caption");
//   event.clipboardData.setData("text/plain", span.textContent);

//   document.execCommand("copy");
// }