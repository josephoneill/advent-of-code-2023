import * as fs from 'fs';
import path from 'path';

const rawInput = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const inputArray = rawInput.split(/[\r\n]+/);

let sum = 0;

for (let i = 0; i < inputArray.length; i++) {
  const line = inputArray[i];
  const numbersFromLine = line.match(/\d+/g);

  // Might be null, check before proceeding
  if (!numbersFromLine) {
    continue;
  }

  const calibrationValue = numbersFromLine[0].slice(0, 1) + numbersFromLine[numbersFromLine.length - 1].slice(-1);

  sum += parseInt(calibrationValue);
}

console.log(`The solution is ${sum}`);