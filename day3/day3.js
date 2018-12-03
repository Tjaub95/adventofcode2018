var fs = require('fs');

function get_input() {
    return new Promise((resolve, reject) => {
        fs.readFile('day3_input.txt', 'utf8', (err, contents) => {
            if (err) reject(err);
            else resolve(contents.split('\r\n'));
        });
    });
};

function calculate_sq_in_overlap(input) {
    return new Promise((resolve) => {
        let grid = {}
        for (const square_line of input) {
            let [claim, trash, coords, grid_mod] = square_line.split(" ");
            let [x, y] = coords.slice(0, -1).split(",").map((str_val) => parseInt(str_val));
            let [width, height] = grid_mod.split("x").map((str_val) => parseInt(str_val));
            for (let i = x; i < x + width; i++) {
                for (let j = y; j < y + height; j++) {
                    grid[`${i},${j}`] = (grid[`${i},${j}`] || 0) + 1;
                };
            };
        };
        resolve(Object.values(grid).filter((overlaps) => overlaps > 1).length);
    });
};

function get_unique_claim(input) {
    return new Promise((resolve) => {
        let grid = {};
        let claims = {};
        for (const square_line of input) {
            let [claim, trash, coords, grid_mod] = square_line.split(" ");
            let [x, y] = coords.slice(0, -1).split(",").map((str_val) => parseInt(str_val));
            let [width, height] = grid_mod.split("x").map((str_val) => parseInt(str_val));
            claims[claim] = true;
            for (let i = x; i < x + width; i++) {
                for (let j = y; j < y + height; j++) {
                    if (grid[`${i},${j}`]) {
                        claims[grid[`${i},${j}`]] = false;
                        claims[claim] = false;
                    }
                    grid[`${i},${j}`] = claim;
                };
            };
        };
        resolve(Object.entries(claims).filter((claim) => claim[1]));
    });
}

get_input()
.then((data) => {
    calculate_sq_in_overlap(data)
    .then((data) => console.log("First solution is " + data));

    get_unique_claim(data)
    .then((data) => console.log("Second solution is " + data));
});