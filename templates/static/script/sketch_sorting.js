let algorithm_selected = 1;
let values = [];
let width = 400;
let height = 400;
let algorithm = null;
let state = 'stop';
let sorted = false;

// Shuffle the values using random() from p5.js
function shuffle_values() {
  for (let i = 0; i < width; i++) {
    values[i] = random(height);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Init of the canvas
function setup() {
  createCanvas(width, height);

  // Init values
  shuffle_values();

  // Create algorithm
  algorithm = new QuickSortAlgorithm(values);
}

// Update of the canvas
function draw() {
  background(220);
  stroke(100, 100, 180);
  for (let i = 0; i < width; i++) {
    line(i, height, i, height-values[i]);
  }

  // if (state == 'play') sorted = algorithm.sort_on_frame();
  algorithm.sort(0, values.length - 1);
}
