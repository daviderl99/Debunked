
window.onload = () => {
  maxlevels = sessionStorage.getItem("maxlevels");
  gamePoints = sessionStorage.getItem("gamePoints");
  Grade = evaluateGrade(gamePoints, maxlevels);

  document.getElementById("grade").src = `../assets/${Grade.grade}`;
  document.getElementById("pointsReceived").innerHTML = 
  `
    You got ${gamePoints}/${maxlevels} points.
    <br><br>
    ${Grade.description}
  `;
}

const evaluateGrade = (gamePoints, maxlevels) => {
  percentage = Math.floor(100 * gamePoints / maxlevels);
  index = Math.round(mapRange(percentage, 0, 100, 6, 0));
  return Grades[index];
}

// Re-maps a number from one range to another
const mapRange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;