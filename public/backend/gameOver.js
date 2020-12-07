
window.onload = () => {
  levels = sessionStorage.getItem("levels");
  gamePoints = sessionStorage.getItem("gamePoints");
  Grade = evaluateGrade(gamePoints, levels);

  document.getElementById("grade").src = `../assets/${Grade.grade}`;
  document.getElementById("pointsReceived").innerHTML = `
    You got ${gamePoints}/${levels} points. 
    <br><br>
    ${Grade.desc}`;
}

const evaluateGrade = (gamePoints, levels) => {
  percentage = Math.floor(100 * gamePoints / levels);
  index = Math.round(mapRange(percentage, 0, 100, 6, 0));
  return Grades[index];
}

const mapRange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;