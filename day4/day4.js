var fs = require('fs');

function get_input() {
    return new Promise((resolve, reject) => {
        fs.readFile('day4_input.txt', 'utf8', (err, contents) => {
            if (err) reject(err);
            else resolve(contents.split('\r\n').sort());
        });
    });
};

function maxMinute(arr) {
  let minute = Math.max(...arr);
  let index = arr.findIndex(v => {return v == minute; });
  return [minute, index];
}

function base_line(input) {
  return new Promise((resolve) => {
    let guards = [];
    let guard = 0;
    let sleep = 0;

    const stateRegex = /\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] (Guard #|)(\d+|wakes|falls)/;

    for (const line of input) {
      [/*match*/, /*year*/, /*month*/, /*day*/, /*hour*/, minute, /*trash*/, state] = stateRegex.exec(line);
      
      if (state === "wakes") {
        for (let i = sleep; i <= parseInt(minute); i++) {
          guards[guard][i]++;
        }
        
      } else if (state === "falls") {
        sleep = parseInt(minute);
      } else {
        guard = state;
        if (!guards[guard]) guards[guard] = new Array(60).fill(0);
      }
    }

    resolve(guards);
  });
}

function calculate_most_minutes_slept(guards) {
  return new Promise((resolve) => {
    var most = [-1, -1];
    guards.forEach((arr, id) => {
        let minutes = arr.reduce((a, b) => { return a + b; }, 0);
        [,index] = maxMinute(arr);
        if (minutes > most[1]) most = [id, minutes, index];
    });
    resolve(most[0]*most[2]);
  });
};

function calculate_bigliest_minute_slept(guards) {
  return new Promise((resolve) => {
    var most = [-1, -1];
    guards.forEach((arr, id) => {
        [minute,index] = maxMinute(arr);
        if (minute > most[1]) most = [id, minute, index];
    });
    resolve(most[0]*most[2]);
  });
};

get_input()
.then((data) => {
  base_line(data)
  .then((guards) => {
    calculate_most_minutes_slept(guards)
    .then((data) => console.log("First solution is " + data));

    calculate_bigliest_minute_slept(guards)
    .then((data) => console.log("Second solution is " + data));
  });
});