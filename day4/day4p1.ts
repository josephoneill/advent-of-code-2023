import * as fs from 'fs';
import { spec } from 'node:test/reporters';
import path from 'path';

const rawInput = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const inputArray = rawInput.split(/[\r\n]+/);

let sum = 0;
for (let i = 0; i < inputArray.length; i++) {
  const line = inputArray[i];

  const numbers = line.substring(line.indexOf(':') + 2);
  const winningNumbers = numbers.substring(0, numbers.indexOf('|') - 1).split(' ').map(x => x.trim()).filter(x => x);
  const lottoNumbers = numbers.substring(numbers.indexOf('|') + 1).split(' ').map(x => x.trim()).filter(x => x);
  const winningCount = lottoNumbers.reduce((acc, num) => acc + Number(winningNumbers.includes(num)), 0);

  if (winningCount === 0) continue;

  sum += 2**(winningCount-1);
}

console.log(`The solution is ${sum}`);