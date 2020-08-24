class SortingAlgorithm {

  constructor(values) {
    this.values = values;
  }

  init() {}

  sort() {}

  sort_on_frame() {}

  swap(a, b) {
    let temp = this.values[a];
    this.values[a] = this.values[b];
    this.values[b] = temp;
  }
}

class BubbleSortAlgorithm extends SortingAlgorithm {

  constructor(values) {
    super(values);
    this.init();
  }

  init() {
    this.swapped = true;
    this.n = this.values.length;
  }

  sort() {
    let n = this.values.length;
    let swapped = true;
    while (swapped) {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (this.values[i] > this.values[i+1]) {
          this.swap(i, i+1);
          swapped = true;
        }
      }
      n -= 1;
    }
  }

  sort_on_frame() {
    // The frame per second is replacing the while loop
    if (this.swapped) {
      this.swapped = false;
      for (let i = 0; i < this.n - 1; i++) {
        if (this.values[i] > this.values[i+1]) {
          this.swap(i, i+1);
          this.swapped = true;
        }
      }
      this.n -= 1;
    }
    return !this.swapped;
  }
}

class QuickSortAlgorithm extends SortingAlgorithm {

  constructor(values) {
    super(values);
    this.init();
  }

  init() {
    this.start = 0;
    this.end = values.length - 1;

    // Creating a 'stack'
    this.stack = Array.from(Array(this.end - this.start + 1), () => 0);

    // Initializing the stack
    this.top = 0;
    this.stack[this.top] = this.start;
    this.top ++;
    this.stack[this.top] = this.end;
  }

  partition(start, end) {
    let pivot_index = start;
    let pivot_value = this.values[end];
    for (let i = start; i < end; i++) {
      if (this.values[i] < pivot_value) {
        this.swap(i, pivot_index);
        pivot_index++;
      }
    }
    this.swap(pivot_index, end);
    return pivot_index;
  }

  quicksort(start, end) {
    if (start >= end) return;
    let index = this.partition(start, end);
    this.quicksort(start, index - 1);
    this.quicksort(index + 1, end);
  }

  sort() {
    this.quicksort(0, this.values.length - 1);
  }

  sort_on_frame() {

    if (this.top >= 0) {
      this.end = this.stack[this.top];
      this.top --;
      this.start = this.stack[this.top];
      this.top --;

      let pivot_index = this.partition(this.start, this.end);

      if (pivot_index > this.start) {
        this.top ++;
        this.stack[this.top] = 1;
        this.top ++;
        this.stack[this.top] = pivot_index - 1;
      }

      if (pivot_index + 1 < this.end) {
        this.top ++;
        this.stack[this.top] = pivot_index + 1;
        this.top ++;
        this.stack[this.top] = this.end;
      }
      return false;
    } else {
      return true;
    }
  }
}
