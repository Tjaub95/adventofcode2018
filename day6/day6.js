var fs = require('fs');

function get_input() {
    return new Promise((resolve, reject) => {
        fs.readFile('day6_input.txt', 'utf8', (err, contents) => {
            if (err) reject(err);
            else resolve(contents.split('\r\n').map(line => line.split(', ').map(Number)));
        });
    });
};

const manhattan = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

function get_longest_manhattan_distance(coordinates) {
    const sizes = coordinates.map(() => 0);
    const infinites = [];

    for (let x = 0; x < 400; x++) {
        for (let y = 0; y < 400; y++) {
            let closestCoord = null;
            let closestDistance = Infinity;

            coordinates.forEach(([cx, cy], coord) => {
                const distance = manhattan([x, y], [cx, cy]);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestCoord = coord;
                } else if (distance === closestDistance) {
                    closestCoord = null;
                }
            });

            if (closestCoord !== null) {
                sizes[closestCoord]++;
                if (x === 0 || x === 399 || y === 0 || y === 399) {
                    infinites.push(closestCoord);
                }
            }
        }
    }

    infinites.forEach((index) => {
        sizes[index] = 0;
    });
    return Math.max(...sizes);
}

function region_containing_all_locations(coordinates) {
    const distanceLimit = 10000;
    let regionSize = 0;

    for (let x = 0; x < 400; x++) {
        for (let y = 0; y < 400; y++) {
            const sum = coordinates.reduce((acc, [cx, cy]) => acc + manhattan([x, y], [cx, cy]), 0);
            if (sum < distanceLimit) {
                regionSize++;
            }
        }
    }

    return regionSize;
}

get_input()
.then((data) => {
    console.log("First solution is " + get_longest_manhattan_distance(data));
    console.log("Second solution is " + region_containing_all_locations(data));
});