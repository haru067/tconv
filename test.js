const { execSync } = require('child_process');
const baseCommand = 'node ./index.js';

const test = (input, expected) => {
    const cmd = input ? `${baseCommand} ${input}` : baseCommand;
    console.log('-------------------------');
    console.log(cmd);
    const result = execSync(cmd).toString().trim();
    if (result == expected) {
        console.log(`[Success] ${input} -> ${expected}`);
    } else {
        console.log(`[Failed] result: ${result}, expected: ${expected}`);
    }
};

test('20180102', 1514818800);
test('201408111300', 1407729600);
test('20170815071422', 1502748862);
test("'2018/06/07 12:14'", 1528341240);