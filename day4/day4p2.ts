import * as fs from 'fs';
import { spec } from 'node:test/reporters';
import path from 'path';

const rawInput = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const inputArray = rawInput.split(/[\r\n]+/);

const cardNumOfCopiesMap = new Map();
for (let i = 0; i < inputArray.length; i++) {
  const line = inputArray[i];

  const cardNumber = parseInt(line.substring(line.indexOf(' ') + 1, line.indexOf(':')).trim(), 10);

  if (!cardNumOfCopiesMap.has(cardNumber)) {
    cardNumOfCopiesMap.set(cardNumber, 0);
  }

  const numbers = line.substring(line.indexOf(':') + 2);
  const winningNumbers = numbers.substring(0, numbers.indexOf('|') - 1).split(' ').map(x => x.trim()).filter(x => x);
  const lottoNumbers = numbers.substring(numbers.indexOf('|') + 1).split(' ').map(x => x.trim()).filter(x => x);
  const winningCount = lottoNumbers.reduce((acc, num) => acc + Number(winningNumbers.includes(num)), 0);

  if (winningCount === 0) continue;

  for (let i = 1; i <= winningCount; i++) {
    const copyCardNum = cardNumber + i;
    if (!cardNumOfCopiesMap.has(copyCardNum)) {
      cardNumOfCopiesMap.set(copyCardNum, cardNumOfCopiesMap.get(cardNumber) + 1);
    } else {
      const currCopyCardCount = cardNumOfCopiesMap.get(copyCardNum);
      cardNumOfCopiesMap.set(copyCardNum, currCopyCardCount + cardNumOfCopiesMap.get(cardNumber) + 1);
    }
  }
}

console.log(`The solution is ${Array.from(cardNumOfCopiesMap.values()).reduce((acc, num) => acc + num + 1, 0 )}`);