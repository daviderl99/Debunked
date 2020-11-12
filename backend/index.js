usedList = [];

window.onload = () => {
  pickRandomImage();
}

const pickRandomImage = () => {
  let obj = DATABASE[Math.floor(Math.random() * DATABASE.length)];
  if (!usedList.includes(obj._id)){
    document.getElementById("image").src = obj.imgSrc;
    document.getElementById("caption").innerText = obj.caption;
    usedList.push(obj._id);
  }
}

const checkAnswer = (answer) => {
  console.log(answer);
  pickRandomImage();
}