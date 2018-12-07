var fs = require('fs');

function get_input() {
    return new Promise((resolve, reject) => {
        fs.readFile('day7_input.txt', 'utf8', (err, contents) => {
            if (err) reject(err);
            else resolve(contents.split('\r\n'));
        });
    });
};

function determine_step_order(input) {
    let steps = {};
    for (const line of input) {
        let [/*Step*/, stepCurr, /*must*/, /*be*/, /*finished*/, /*before*/, /*step*/, stepItPrecedes] = line.split(" ");
        if (steps[stepCurr]) {
            steps[stepCurr].push(stepItPrecedes);
        }
        else {
            steps[stepCurr] = [stepItPrecedes];
        };
    }
    
    console.log(steps)

    stepOrder = [];
    let stepsKeys = Object.keys(steps);
    let counter = 0;
    for (step in steps) {
        if (steps[stepsKeys[counter]].includes(step)) {
            // This step comes after this key
            console.log(step)
        } else {
            // step precedes this key
            counter++;
        }
    }
    return steps;
}

get_input()
.then((data) => {
    console.log("First solution is " + determine_step_order(data));
});