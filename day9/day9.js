function rotate(marble_queue, positions) {
  if (positions >= 0) {
    for (i = 0; i < positions; i++) {
      // marble_queue.unshift(marble_queue.pop());
      marble_queue.push(marble_queue.shift());
    }
  } else {
    const val = marble_queue.pop();
    marble_queue.splice(marble_queue.length - 2, 0, val);
  }
  
  return marble_queue;
}

function get_high_score(max_players, last_marble) {
  let scores = {};
  let marble_circle = [0];

  for (let marble = 1; marble < last_marble + 1; marble++) {
      if (marble % 23 === 0) {
        marble_circle = rotate(marble_circle, 7);
        if (scores[marble % max_players]) scores[marble % max_players] += marble + marble_circle.pop();
        else scores[marble % max_players] = marble + marble_circle.pop();
        marble_circle = rotate(marble_circle, -1);
      } else {
        marble_circle = rotate(marble_circle, -1);
        marble_circle.push(marble);
      }
  };

  let values = Object.values(scores);

  return Math.max(...values);
}

console.log("First solution is " + get_high_score(432, 71019));
console.log("Second solution is " + get_high_score(432, 7101900));
