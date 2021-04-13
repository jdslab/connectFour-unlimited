const sketch = (s) => {
  let gameField;
  let nextPlayer;
  let gameEnded;
  s.setup = () => {
    let canvas = s.createCanvas(s.windowWidth, s.windowHeight);
    canvas.style('display', 'block');
    nextPlayer = true;
    gameField = [];
    gameEnded = false;
    s.noLoop();
    document.getElementById("playAgainButton").addEventListener("click", () => {
      modal.hide("gameEndedModal");
      gameField = [];
      gameEnded = false;
      s.redraw();
    });
  }

  s.draw = () => {
    // resizeCanvas(windowWidth, windowHeight);
    s.background(255);
    s.stroke(128);
    s.strokeWeight(2);
    s.noFill();
    for(let i = 0; i < s.windowWidth/20; i++) {
      s.line(i * 20, 0, i * 20, Math.floor(s.height/20)*20);
    }
    for(let i = 0; i < s.windowHeight/20; i++) {
      s.line(0, i * 20, Math.floor(s.width/20)*20, i * 20);
    }
    gameField.forEach(checker => {
      if(checker.player === true) {
        s.stroke("#FF4DE2");
        s.circle(checker.column * 20 + 10, Math.floor(s.height/20)*20 - checker.row * 20 - 10, 15);
      } else if (checker.player === false) {
        s.stroke("#673805");
        s.line(checker.column * 20 + 3, Math.floor(s.height/20)*20 - checker.row * 20 - 17, checker.column * 20 + 17, Math.floor(s.height/20)*20 - checker.row * 20 - 3);
        s.line(checker.column * 20 + 17, Math.floor(s.height/20)*20 - checker.row * 20 - 17, checker.column * 20 + 3, Math.floor(s.height/20)*20 - checker.row * 20 - 3);
      }
    });
  }

  s.mouseClicked = () => {
    processUserInput("mouse");
  }

  s.touchStarted = () => {
    processUserInput("touch");
  }

  function processUserInput(mode){
    if(s.touches.length > 1){
      return;
    }
    if(gameEnded){
      return;
    }
    let row;
    let column;
    if(mode === "mouse"){
      row = s.int((Math.floor(s.height/20)*20 - s.mouseY)/20);
      column = s.int(s.mouseX/20);
    } else if(mode === "touch"){
      row = s.int((Math.floor(s.height/20)*20 - s.touches[0].y)/20);
      column = s.int(s.touches[0].x/20);
    }
    if(gameField.some(checker => checker.row === row && checker.column === column)){
      return;
    }
    if(row !== 0 && !gameField.some(checker => checker.row === row - 1 && checker.column === column)){
      return;
    }
    let newChecker = new gameChecker(row, column, nextPlayer);
    gameField.push(newChecker);
    nextPlayer = !nextPlayer;

    // Check if game ends
    gameEnded = gameField.some(checker => {
      return gameField.some(otherChecker => otherChecker.row === checker.row && otherChecker.column === checker.column + 1 && checker.player === otherChecker.player) &&
          gameField.some(otherChecker => otherChecker.row === checker.row && otherChecker.column === checker.column + 2 && checker.player === otherChecker.player) &&
          gameField.some(otherChecker => otherChecker.row === checker.row && otherChecker.column === checker.column + 3 && checker.player === otherChecker.player) ||
          gameField.some(otherChecker => otherChecker.column === checker.column && otherChecker.row === checker.row + 1 && checker.player === otherChecker.player) &&
          gameField.some(otherChecker => otherChecker.column === checker.column && otherChecker.row === checker.row + 2 && checker.player === otherChecker.player) &&
          gameField.some(otherChecker => otherChecker.column === checker.column && otherChecker.row === checker.row + 3 && checker.player === otherChecker.player) ||
          gameField.some(otherChecker => otherChecker.row === checker.row + 1 && otherChecker.column === checker.column + 1 && checker.player === otherChecker.player) &&
          gameField.some(otherChecker => otherChecker.row === checker.row + 2 && otherChecker.column === checker.column + 2 && checker.player === otherChecker.player) &&
          gameField.some(otherChecker => otherChecker.row === checker.row + 3 && otherChecker.column === checker.column + 3 && checker.player === otherChecker.player) ||
          gameField.some(otherChecker => otherChecker.row === checker.row + 1 && otherChecker.column === checker.column - 1 && checker.player === otherChecker.player) &&
          gameField.some(otherChecker => otherChecker.row === checker.row + 2 && otherChecker.column === checker.column - 2 && checker.player === otherChecker.player) &&
          gameField.some(otherChecker => otherChecker.row === checker.row + 3 && otherChecker.column === checker.column - 3 && checker.player === otherChecker.player);
    });
    if(gameEnded) {
      modal.show("gameEndedModal");
    }
    s.redraw();
  }
}

let myp5 = new p5(sketch);

class gameChecker {
  constructor(row, column, player) {
    this.row = row;
    this.column = column;
    this.player = player;
  }
}
