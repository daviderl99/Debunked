
window.onload = () => {
  if (isFirstPlaythrough()) {
    changeButtonData();
  }
}

const isFirstPlaythrough = () => {
  return localStorage.getItem("gamePlayed");
}

const changeButtonData = () => {
  let btn = document.getElementsByClassName("btn btn-primary glowing")[0];
  console.log(btn);
  btn.setAttribute("onClick", "location.href='./game.html'");
  btn.innerText = "Play";
}