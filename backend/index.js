const IMAGE_SEARCH_URL = "https://www.google.com/searchbyimage?site=search&sa=X&image_url=";
let object;
let usedObjects = [];

const maxlevels = 5;
let gamePoints = 0;
let currLevel = 0;
let progressBarWidth = 0;

window.onload = () => {
  isFirstPlaythrough();
  displayRandomImage();
  document.getElementById("next-image").addEventListener("click", displayRandomImage);
}

const isFirstPlaythrough = () => {
  if (!localStorage.getItem("gamePlayed")) {
    location.href = "./instructions.html";
    localStorage.setItem("gamePlayed", true);
  }
}

const displayRandomImage = () => {
  if (isGameOver()) return endGame();

  hideDescriptionDiv();
  object = randomFromArray();

  // Make sure image & caption have not been shown already
  if (!usedObjects.includes(object._id) && object.caption !== "") {
    document.getElementById("image").src = object.imgSrc;
    document.getElementById("caption").innerText = object.caption;
    document.getElementById("reverse-image-search").href = IMAGE_SEARCH_URL + object.imgSrc;

    usedObjects.push(object._id);

    currLevel++;
    showButtonsDiv();
  } else {
    displayRandomImage();
  }
}

const submitAnswer = (answer) => {
  if (answer === object.bool) { // Correct
    gamePoints++;
    hideButtonsDiv();
    colorText(true);
    showDescriptionDiv("correct");
  }
  else { // Incorrect
    hideButtonsDiv();
    colorText(false);
    showDescriptionDiv("incorrect");
  }

  updateProgressBar(currLevel, maxlevels);
}

function isGameOver() {
  return (currLevel >= maxlevels);
}

const endGame = () => {
  sessionStorage.setItem("maxlevels", maxlevels);
  sessionStorage.setItem("gamePoints", gamePoints);
  window.location.replace("./gameover.html");
}

const randomFromArray = () => {
  return DATABASE[Math.floor(Math.random() * DATABASE.length)];
}

const colorText = (bool) => {
  answerSpan = document.getElementById("answer");
  if (bool) {
    answerSpan.style.color = "#008F00";
  } else {
    answerSpan.style.color = "#FF2F2F";
  }
}

const showDescriptionDiv = (answer) => {
  div = document.getElementById("description-container");
  desc = document.getElementById("description");
  answerSpan = document.getElementById("answer");

  desc.innerText = object.description;
  answerSpan.innerText = answer.toUpperCase();
  // img.src = `../assets/${answer}.png`;
  div.style.display = "block";
}

const updateProgressBar = (curr, max) => {
  let percentage = Math.floor(100 * curr / max);
  let bar = document.getElementById("progess-bar");

  let intv = setInterval(frame, 10);
  function frame() {
    if (progressBarWidth === percentage) {
      progressBarWidth = percentage;
      clearInterval(intv);
      return;
    }
    progressBarWidth++;
    bar.style.width = `${progressBarWidth}%`;
  }
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
  div = document.getElementById("description-container");
  div.style.display = "none";
}