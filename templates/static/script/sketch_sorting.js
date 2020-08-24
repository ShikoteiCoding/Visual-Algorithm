let algorithm_selected = 1;
let values = [];
let width = 400;
let height = 400;
let algorithm = new SortingAlgorithm(values);
let state = 'stop';
let sorted = false;

// Shuffle the values using random() from p5.js
function shuffle_values() {
  for (let i = 0; i < width; i++) {
    values[i] = random(height);
  }
  sorted = false;
  algorithm.init();
}

// Init of the canvas
function setup() {
  createCanvas(width, height);

  // Init values
  shuffle_values();

  // Create algorithm
  algorithm = new BubbleSortAlgorithm(values);

}

// Update of the canvas
function draw() {
  background(220);
  stroke(100, 100, 180);
  for (let i = 0; i < width; i++) {
    line(i, height, i, height-values[i]);
  }

  if (!sorted) {
    if (state == 'play') sorted = algorithm.sort_on_frame();
  }
}
