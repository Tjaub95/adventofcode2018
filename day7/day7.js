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
    input.forEach(line => {
        line = line.split(' ');
        const stepCurr = line[1];
        const stepItPrecedes = line[7];
        steps[stepCurr] = steps[stepCurr] || {node:stepCurr, leaves:{}};
        steps[stepItPrecedes] = steps[stepItPrecedes] || {node:stepItPrecedes, leaves:{}};
        steps[stepItPrecedes].leaves[stepCurr] = true;
    });
    let stepsOrder = '';
    while(true) {
        const step = Object.values(steps).filter(node => !Object.keys(node.leaves).length).sort((a,b)=> a.node < b.node ? -1 : 1);
        if(!step[0]) break;
        const node = step[0].node;
        stepsOrder += node;
        delete steps[node];
        Object.values(steps).forEach(o => delete o.leaves[node]);
    };

    return stepsOrder;
}

function build_steps_graph(input) {
    let steps = {};
    input.forEach(line => {
        line = line.split(' ');
        const stepCurr = line[1];
        const stepItPrecedes = line[7];
        steps[stepCurr] = steps[stepCurr] || {node:stepCurr, leaves:{}, duration: stepCurr.charCodeAt(0) - 4};
        steps[stepItPrecedes] = steps[stepItPrecedes] || {node:stepItPrecedes, leaves:{}, duration: stepItPrecedes.charCodeAt(0) - 4};
        steps[stepItPrecedes].leaves[stepCurr] = true;
    });
    return steps;
}

function calculate_time_to_complete(steps, result, seconds) {
    let queue = Object.values(steps).filter(node => Object.keys(node.leaves).length === 0);
    
    if (queue.length === 0) return seconds;
    seconds++;

    for (let i = 0; i < 5; i++) {
        let worker = ({...queue[i]}).node;

        if (steps[worker] && --steps[worker].duration < 1) {
            Object.values(steps).forEach(node => delete node.leaves[worker]);
            delete steps[worker];
        }
    }

    return calculate_time_to_complete(steps, result, seconds);
}



get_input()
.then((data) => {
    let steps = build_steps_graph(data);
    console.log("First solution is " + determine_step_order(data));
    console.log("Second solution is " + calculate_time_to_complete(steps, '', 0));
});