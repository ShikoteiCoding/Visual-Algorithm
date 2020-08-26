let nb_rows = 20;
let nb_cols = 20;
let w, h;
let open_list = [];
let closed_list = [];
let grid = [];
let algorithm = null;
let path = [];
let pencil = 0;
let compute = false;
let start_point_drawned = false;
let end_point_drawned = false;
let start_point = null;
let end_point = null;


class Cell {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.type = 0;
    this.neighbors = [];
    this.previous = null;
  }

  clean() {
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.type = 0;
    this.previous = null;
  }

  show(col) {
    fill(col);
    rect(this.x * w, this.y * h, w, h);
  }

  init_neighbors(grid) {
    let x = this.x;
    let y = this.y;
    if (x > 0)                      this.neighbors.push(grid[x - 1][y]);
    if (x < nb_cols - 1)            this.neighbors.push(grid[x + 1][y]);
    if (y > 0)                      this.neighbors.push(grid[x][y - 1]);
    if (y < nb_rows - 1)            this.neighbors.push(grid[x][y + 1]);
    if (x > 0 && y > 0)             this.neighbors.push(grid[x - 1][y - 1]);
    if (x > 0 && y < nb_rows - 1)       this.neighbors.push(grid[x - 1][y + 1]);
    if (x < nb_cols - 1 && y < nb_rows - 1) this.neighbors.push(grid[x + 1][y + 1]);
    if (x < nb_cols - 1 && y > 0)       this.neighbors.push(grid[x + 1][y - 1]);
  }
}

function create_grid() {
  // Create my base model
  for (let i = 0; i < nb_cols; i++) {
    grid[i] = new Array(nb_rows);
  }

  for (let i = 0; i < nb_cols; i++) {
    for (let j = 0; j < nb_rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  for (let i = 0; i < nb_cols; i++) {
    for (let j = 0; j < nb_rows; j++) {
      grid[i][j].init_neighbors(grid);
    }
  }
}

function clean() {
  for (let i = 0; i < nb_cols; i++) {
    for (let j = 0; j < nb_rows; j++) {
      grid[i][j].clean();
    }
  }
  open_list = [];
  closed_list = [];
  path = [];
  compute = false;
  start_point_drawned = false;
  end_point_drawned = false;
  start_point = null;
  end_point = null;
  algorithm = null;
  loop();
}

function init_algorithm() {
  if (start_point && end_point && open_list && closed_list) {
    algorithm = new AstarAlgorithm(grid, start_point, end_point, open_list, closed_list);
    compute = true;
  }
}

function setup() {
  createCanvas(400, 400);
  background(255);
  create_grid();
  w = width / nb_cols;
  h = height / nb_rows;
}

function draw() {
  draw_grid();
  draw_with_pencil();
  draw_cells();
  if (compute) {
    let current = algorithm.find_on_frame();
    if (current) {
      draw_computed();
      draw_path(current);
    }
  }
}

function draw_grid() {
  stroke(150);
  strokeWeight(1);
  let space_between = width / nb_rows;
  for (let i = 0; i <= nb_cols; i++) {
    line(i * space_between, 0, i * space_between, height);
  }
  for (let j = 0; j <= nb_rows; j++) {
    line(0, j * space_between, width, j * space_between);
  }
}

function draw_cells() {
  for (let i = 0; i < nb_cols; i++) {
    for (let j = 0; j < nb_rows; j++) {
      if (grid[i][j].type == 0) grid[i][j].show(color(255));
      if (grid[i][j].type == 1) grid[i][j].show(color(50, 50, 255));
      if (grid[i][j].type == 2) grid[i][j].show(color(50, 255, 50));
      if (grid[i][j].type == 3) grid[i][j].show(color(0));
    }
  }
}

function draw_computed() {
  if (compute) {
    for (let cell of closed_list) {
      cell.show(color(255, 0, 0));
    }

    for (let cell of open_list) {
      cell.show(color(0, 200, 0));
    }
  }
}

function draw_path(current) {
  path = [];
  let temp = current;
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  for (let cell of path) {
    cell.show(color(100));
  }
}

function draw_with_pencil() {
  if (mouseX < width && mouseX >= 0 && mouseY < height && mouseY >= 0) {
    if (mouseIsPressed && pencil == 1) {
      let x_tile = floor(mouseX / nb_cols);
      let y_tile = floor(mouseY / nb_rows);
      grid[x_tile][y_tile].type = pencil;
    }
    if (mouseIsPressed && pencil == 2) {
      if (!start_point_drawned) {
        edit_start(mouseX, mouseY);
        start_point.type = pencil;
      } else {
        clean_start();
        edit_start(mouseX, mouseY);
        start_point.type = pencil;
      }
    }
    if (mouseIsPressed && pencil == 3) {
      if (!end_point_drawned) {
        edit_end(mouseX, mouseY);
        end_point.type = pencil;
      } else {
        clean_end();
        edit_end(mouseX, mouseY);
        end_point.type = pencil;
      }
    }
  }
}

function clean_start() {
  grid[start_point.x][start_point.y].type = 0;
}

function clean_end() {
  grid[end_point.x][end_point.y].type = 0;
}

function edit_start(x, y) {
  let i = floor(x / nb_cols);
  let j = floor(y / nb_rows);
  start_point = grid[i][j];
  start_point.type = 2;
  start_point_drawned = true;
}

function edit_end(x, y) {
  let i = floor(x / nb_cols);
  let j = floor(y / nb_rows);
  end_point = grid[i][j];
  end_point.type = 3;
  end_point_drawned = true;
}
