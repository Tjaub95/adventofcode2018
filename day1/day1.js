var fs = require('fs');

function get_input() {
    return new Promise((resolve, reject) => {
        fs.readFile('day1_input.txt', 'utf8', (err, contents) => {
            if (err) reject(err);
            else resolve(contents.split('\r\n'));
        });
    });
};

function final_sum(input) {
    return new Promise((resolve) => {
        const final_freq = input.reduce((total, freq) => parseInt(total) + parseInt(freq));
        resolve(final_freq);
    });
};

function first_repeat_sum(input) {
    return new Promise((resolve) => {
        let sum = 0;
        let known_values = new Set([sum])
        safe_to_add = true;
        while (safe_to_add) {
            input.forEach(val => {
                if (safe_to_add) sum += parseInt(val);
                if (known_values.has(sum)) safe_to_add = false;
                known_values.add(sum);
            });
        };
        resolve(sum);
    })
};

get_input()
.then((data) => {
    final_sum(data)
    .then((data) => console.log("First solution is " + data))
    .catch((err) => console.log(err));

    first_repeat_sum(data)
    .then((data) => console.log("Second solution is " + data))
    .catch((err) => console.log(err));
});
