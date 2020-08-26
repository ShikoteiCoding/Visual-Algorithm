class PathfindingAlgorithm {

  constructor(grid, start, end) {
    this.map = grid;
    this.start = start;
    this.end = end;
  }

  find(){}
}

class AstarAlgorithm extends PathfindingAlgorithm{

  constructor(grid, start, end, open, closed) {
    super(grid, start, end);
    this.init(open, closed)
  }

  init(open, closed) {
    this.destination_reached = false;

    // Data containers needed
    this.open_list = open;
    this.closed_list = closed;
    this.path = new Map();

    this.open_list.push(this.start);

  }

  d(node1, node2) {
    return sqrt((node1.x - node2.x)**2 + (node1.y - node2.y)**2);
  }

  g(node) {
    return sqrt((this.start.x - node.x)**2 + (this.start.y - node.y)**2);
  }

  h(node) {
    return dist(this.end.x, this.end.y, node.x, node.y);
  }

  f(node) {
    return this.g(node) + this.h(node);
  }

  // lowest_f_score() {
  //   let lowest = this.open_list[0];
  //   let f_lowest = this.f(lowest);
  //   for (let element of this.open_list) {
  //     let f_element = this.f(element);
  //     if (f_element < f_lowest) {
  //       lowest = element;
  //       f_lowest = f_element;
  //     }
  //   }
  //   return lowest;
  // }

  lowest_f_score() {
    let lowest_index = 0;
    for (let i = 0; i < this.open_list.length; i++) {
      if (this.open_list[i].f < this.open_list[lowest_index].f) {
        lowest_index = i;
      }
    }
    return lowest_index;
  }

  remove_from_open_list(cell) {
    for (let i = this.open_list.length; i >= 0; i--) {
      if (this.open_list[i] === cell) {
        this.open_list.splice(i, 1);
      }
    }
  }

  neighbors(node) {
    let neighbors = [];
    neighbors.push({x: node.x, y: node.y - 1});
    neighbors.push({x: node.x, y: node.y + 1});
    neighbors.push({x: node.x - 1, y: node.y});
    neighbors.push({x: node.x + 1, y: node.y});
    return neighbors.filter((el) => {
      return el.x >= 0 && el.x <= 19 && el.y >= 0 && el.y <= 19 && this.map[el.x][el.y] != 1;
    });
  }

  debug() {
  }

  find() {
  }

  find_on_frame() {

    if (this.open_list.length > 0) {
      let current = this.open_list[this.lowest_f_score()];
      if (current === this.end) {
        noLoop();
        console.log("Path done");
      }

      this.remove_from_open_list(current);
      this.closed_list.push(current);

      let neighbors = current.neighbors;

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (!this.closed_list.includes(neighbor) && neighbor.type != 1) {
          let temp_g = current.g + 1;

          let new_path = false;
          if (this.open_list.includes(neighbor)) {
            if (temp_g < neighbor.g) {
              neighbor.g = temp_g;
              new_path = true;
            }
          } else {
              neighbor.g = temp_g;
              new_path = true;
              this.open_list.push(neighbor);
            }

            if (new_path) {
              neighbor.h = this.h(neighbor);
              neighbor.f = neighbor.h + neighbor.g;
              neighbor.previous = current;
            }
          }
        // ENDFOR
      }
      return current;
    }
    return;
  }
}
