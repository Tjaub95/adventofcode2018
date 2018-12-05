var fs = require('fs');

function get_input() {
    return new Promise((resolve, reject) => {
        fs.readFile('day5_input.txt', 'utf8', (err, contents) => {
            if (err) reject(err);
            else resolve(contents);
        });
    });
};

function get_polymer(input) {
    let spliced = false;
    splicing: while(!spliced) {
        spliced = true;
        for (let i = 0; i < input.length - 1; ++i) {
            if (Math.abs(input.charCodeAt(i) - input.charCodeAt(i+1)) == 32) {
                input = input.substring(0, i) + input.substring(i+2);
                spliced = false;
                continue splicing;
            }
        }
    }
    return input.length;
}

function find_smallest_polymer_possible(input) {
    let poly_table = {};
    for (let i = 0; i < 26; i++) {
        let lower = String.fromCharCode(97 + i);
        let upper = String.fromCharCode(65 + i);
        alphaRegex = new RegExp("[" + lower + upper + "]", "g");
        let newTemp = input.replace(alphaRegex, "");
        poly_table[upper] = get_polymer(newTemp);
    }
    return Math.min(...Object.values(poly_table));
}

get_input()
.then((data) => {
    console.log("First solution is " + get_polymer(data));
    console.log("Second solution is " + find_smallest_polymer_possible(data));
});