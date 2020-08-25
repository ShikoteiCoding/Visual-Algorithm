let nb_cell_per_axis = 20;
let pencil_possible = {
  0: 'white',
  1: 'blue',
  2: 'green',
  3: 'black'
};
let pencil_now = 1;
let grid_tiles;

function setup() {
  createCanvas(400, 400);
  background(255);
  // Create my model
  grid_tiles = Array.from(Array(nb_cell_per_axis), () => new Array(nb_cell_per_axis).fill(0));

}

function init() {
  // Create my base model
  grid_tiles = Array.from(Array(nb_cell_per_axis), () => new Array(nb_cell_per_axis).fill(0));
}

function draw() {
  grid();
  pencil();
  color_grid();
}

function grid() {
  stroke(150);
  strokeWeight(1);
  let space_between = width / nb_cell_per_axis;
  for (let i = 0; i <= nb_cell_per_axis; i++) {
    line(i * space_between, 0, i * space_between, height);
  }
  for (let j = 0; j <= nb_cell_per_axis; j++) {
    line(0, j * space_between, width, j * space_between);
  }
}

function color_grid() {
  for (let i = 0; i < nb_cell_per_axis; i++) {
    for (let j = 0; j < nb_cell_per_axis; j++) {
      fill(pencil_possible[grid_tiles[i][j]]);
      square(i * nb_cell_per_axis, j * nb_cell_per_axis, nb_cell_per_axis);
    }
  }
}

function pencil() {
  if (mouseX < width && mouseX >= 0 && mouseY < height && mouseY >= 0) {
    if (mouseIsPressed) {
      let x_tile = floor(mouseX / nb_cell_per_axis);
      let y_tile = floor(mouseY / nb_cell_per_axis);
      grid_tiles[x_tile][y_tile] = pencil_now;
    }
  }
}
