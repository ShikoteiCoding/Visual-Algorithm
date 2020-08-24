function button_play_press() {
  let btn = document.getElementById('button_play');
  if (state == 'stop') {
    state = 'play';
    btn.children[0].className = "fa fa-pause";
  } else if (state == 'play') {
    state = 'stop';
    btn.children[0].className = "fa fa-play";
  }
}

function change_algorithm_on_select() {
  let selection = document.getElementById('sorting-algorithm-selection');
  algorithm_selected = parseInt(selection.options[selection.selectedIndex].value);
  if (algorithm_selected == 1) algorithm = new BubbleSortAlgorithm(values);
  if (algorithm_selected == 2) algorithm = new QuickSortAlgorithm(values);
}
