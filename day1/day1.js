var fs = require('fs');

fs.readFile('day1_input.txt', 'utf8', (err, contents) => {
    if (err) throw err;
    else {
        let freq_arr = contents.split('\r\n');
        const final_freq = freq_arr.reduce((total, freq) => parseInt(total) + parseInt(freq));
        console.log(final_freq);
    }
});