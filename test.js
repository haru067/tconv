const { execSync } = require('child_process');
const baseCommand = 'node ./index.js';

const test = (input, expected) => {
    const cmd = input ? `${baseCommand} ${input}` : baseCommand;
    console.log(cmd);
    const result = execSync(cmd).toString().trim();
    if (result == expected) {
        console.log(`[Success]`);
    } else {
        console.log(`[Failed] result: ${result}, expected: ${expected}`);
    }
    console.log(result);
};

test('20180102', 1514818800);