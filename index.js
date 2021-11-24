console.log("Game Starting........");
let playerShip = 3;
let enemyShip = 3;
let rowHeader = ["  ", "A ", "B ", "C ", "D ", "E ", "F ", "G ", "H "];
let column = 4;
let playerGrid = createGrid();
let enemyGrid = createGrid();

printMap(playerGrid);
printMap(enemyGrid);

for (let i = 1; i < 3; i++) {
  //player's trun to place ship
  if (i === 1) {
    let x = prompt("Enter the x coordinate for your ship head ");
    let y = prompt("Enter the y coordinate for your ship body ");
    let z = prompt("Enter the y coordinate for your ship tail ");
    placeShip("A3", "B3", "C3", playerGrid, true);
  } else {
    //enemy's turn to place ship
    let x = prompt("Enter the x coordinate for your ship head ");
    let y = prompt("Enter the y coordinate for your ship body ");
    let z = prompt("Enter the y coordinate for your ship tail ");
    placeShip("A1", "B1", "C1", enemyGrid, false);
  }
}
//GAME LOOP
while (playerShip > 0 && enemyShip > 0) {
  let playerAttackCoordinate = prompt(
    "Provide the coordinate for your attack"
  ).split("");
  console.log("playerAttackCoordinate", playerAttackCoordinate);
  let playerAttackRow = playerAttackCoordinate[1];
  let playerAttackColumn = rowHeader.indexOf(playerAttackCoordinate[0] + " ");
  if (attack(playerAttackRow, playerAttackColumn, enemyGrid)) {
    enemyShip--;
  }
  printMap(enemyGrid);
  let enemyAttackCoordinate = prompt(
    "Provide the coordinate for your attack"
  ).split("");
  let enemyAttackRow = enemyAttackCoordinate[1];
  let enemyAttackColumn = rowHeader.indexOf(enemyAttackCoordinate[0] + " ");
  if (attack(enemyAttackRow, enemyAttackColumn, playerGrid)) {
    playerShip--;
  }
  printMap(playerGrid);
}

//create grids
function createGrid() {
  let grid = [];
  //creat grid body
  for (let i = 0; i < 9; i++) {
    grid[i] = [];
    for (let j = 0; j < 8; j++) {
      grid[i][j] = " -";
    }
  }
  //add grid head
  grid.splice(0, 0, rowHeader);
  for (let i = 1; i < grid.length; i++) {
    grid[i].splice(0, 0, `${i}`);
  }
  return grid;
}

//print out grid
function printMap(grid, isPlayer) {
  if (isPlayer) {
    console.log("player grid");
  } else if (isPlayer === false) {
    console.log("enemy grid");
  }
  for (let i = 1; i < grid.length; i++) {
    console.log(grid[i - 1].join(""));
  }
}

//place ships
function placeShip(x, y, z, grid, isPlayer) {
  let head = x.split("");
  let body = y.split("");
  let tail = z.split("");
  let headRowIndex = rowHeader.indexOf(head[0] + " ");
  grid[head[1]][headRowIndex] = " S";
  let bodyRowIndex = rowHeader.indexOf(body[0] + " ");
  grid[body[1]][bodyRowIndex] = " S";
  let tailRowIndex = rowHeader.indexOf(tail[0] + " ");
  grid[tail[1]][tailRowIndex] = " S";
  printMap(grid, isPlayer);
}

//attack
function attack(x, y, grid) {
  console.log(x, y);
  console.log(grid[x][y]);
  if (grid[x][y] == " S") {
    grid[y][x] = " O";
    return true;
  } else if (grid[x][y] == " -") {
    grid[x][y] = "X";
    return false;
  } else {
    return false;
  }
}

//can also use readline to get user entered data instead of using prompt
