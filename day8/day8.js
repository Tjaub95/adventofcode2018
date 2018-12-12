var fs = require('fs');

function get_input() {
    return fs.readFileSync('day8_input.txt', 'utf8').split(' ').map(Number);
};

let input = get_input();
let index = 0;
let total = 0;

// Node with header 2 values -> childNode count, metadata count
// child nodes
// one or more metadata entries
function parse_tree() {
    const subtrees = input[index++]
    const metadata = input[index++]
    let sum = 0
    if (subtrees === 0) {
      for (let m = 0; m < metadata; m++) {
        const i = input[index++]
        total += i
        sum += i
      }
    } else {
      const values = []
      for (let s = 0; s < subtrees; s++) {
        values.push(parse_tree())
      }
      for (let m = 0; m < metadata; m++) {
        const i = input[index++]
        total += i
        if (i >= 1 && i <= values.length) {
          sum += values[i - 1]
        }
      }
    }
    return sum
}

let sum = parse_tree();
console.log("First solution is " + total);
console.log("Second solution is " + sum);
