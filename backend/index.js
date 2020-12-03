const IMAGE_SEARCH_URL = "https://www.google.com/searchbyimage?site=search&sa=X&image_url=";
let object;
usedList = [];

gamePoints = 0;
imagesShown = 0;

window.onload = () => {
  pickRandomImage();
}

const pickRandomImage = () => {
  object = DATABASE[Math.floor(Math.random() * DATABASE.length)];
  if (!usedList.includes(object._id)){
    document.getElementById("image").src = object.imgSrc;
    document.getElementById("caption").innerText = object.caption;
    document.getElementById("reverse-image-search").href = IMAGE_SEARCH_URL + object.imgSrc;
    usedList.push(object._id);

    imagesShown++;
  } else {
    pickRandomImage();
  }
}

const submitAnswer = (answer) => {
  if (answer === object.bool){
    // alert("correct");
    gamePoints++;
  } else {
    // alert("incorrect");
  }

  if (imagesShown >= 5){
    gameOver();
  } else {
    pickRandomImage();
  }
}

function gameOver(){
  alert(`Points: ${gamePoints}/${imagesShown}`);
}

function copyText(){
  let text = document.getElementById("caption");
  text.select();
  text.setSelectionRange(0, 99999);

  document.execCommand("copy");
}