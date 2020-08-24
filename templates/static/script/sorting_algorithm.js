class SortingAlgorithm {

  constructor(values) {
    this.values = values;
  }

  sort() {}
  sort_on_frame() {}

  swap(a, b) {
    // sleep(15);
    let temp = this.values[a];
    this.values[a] = this.values[b];
    this.values[b] = temp;
  }
}

class BubbleSortAlgorithm extends SortingAlgorithm {

  constructor(values) {
    super(values);
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
  }

  async partition(start, end) {
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

  async quicksort(start, end) {
    if (start >= end) return;
    let index = await this.partition(start, end);
    await Promise.all([this.quicksort(start, index - 1), this.quicksort(index + 1, end)]);
  }

  sort() {
    this.quicksort(0, this.values.length - 1);
  }

  sort_on_frame() {

  }
}
