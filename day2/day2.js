var fs = require('fs');

function get_input() {
    return new Promise((resolve, reject) => {
        fs.readFile('day2_input.txt', 'utf8', (err, contents) => {
            if (err) reject(err);
            else resolve(contents.split('\r\n'));
        });
    });
};

function calculate_checksum(input) {
    return new Promise((resolve) => {
        let count_arr = input.reduce((count_arr,boxId) => {
            const appearances = {};
            const letters = [...boxId];
            letters.forEach((letter) => {
                appearances[letter] = appearances[letter] ? appearances[letter] + 1 : 1;
            });

            const appearances_keys = Object.keys(appearances);
            if (appearances_keys.some(key => appearances[key] === 2)) count_arr[0]++;
            if (appearances_keys.some(key => appearances[key] === 3)) count_arr[1]++;
            return count_arr;
        }, [0,0]);
        resolve(count_arr[0] * count_arr[1]);
    });
};

function correct_box_id(input) {
    return new Promise((resolve) => {
        for (let item of input) {
            let lettersA = item.split('');
            for (let i = input.indexOf(item) + 1; i < input.length; ++i) {
                let diff = [];
                let lettersB = input[i].split('');
                for (let l = 0; l < lettersA.length; ++l) {
                    if (lettersA[l] !== lettersB[l]) {
                        if (diff.push(lettersA[l]) >= 2)
                            break;
                    }
                }
                if (diff.length === 1) {
                    resolve(item.replace(diff[0], ''));
                }
            }
        }
    })
}

get_input()
.then((data) => {
    calculate_checksum(data)
    .then((data) => console.log("First solution is " + data));

    correct_box_id(data)
    .then((data) => console.log("Second solution is " + data));
});