import * as fs from 'fs';
import path from 'path';

const rawInput = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const inputArray = rawInput.split(/[\r\n]+/);
const wordToNumberRef = new Map([
  ["one", '1'],
  ["two", '2'],
  ["three", '3'],
  ["four", '4'],
  ["five", '5'],
  ["six", '6'],
  ["seven", '7'],
  ["eight", '8'],
  ["nine", '9'],
]);

const numberAsWordKeys = Array.from(wordToNumberRef.keys());

let sum = 0;

for (let i = 0; i < inputArray.length; i++) {
  const line = inputArray[i];

  let firstNumber = '';
  let secondNumber = ''
  for (let j = 1; j <= line.length && (firstNumber === '' || secondNumber === ''); j++) {
    const firstCurrChar = line.charAt(j - 1);
    const secondCurrChar = line.charAt(line.length - j);
    const firstNumberSearchVal = line.substring(0, j);
    const secondNumberSearchVal = line.slice(-j);
  
    if (firstNumber === '') {
      firstNumber = searchForNumber(firstCurrChar, firstNumberSearchVal);
    }

    if (secondNumber === '') {
      secondNumber = searchForNumber(secondCurrChar, secondNumberSearchVal);
    }
  }

  const calibrationValue = firstNumber + secondNumber;

  sum += parseInt(calibrationValue);
}

function searchForNumber(character: string, searchVal: string): string {
  if (isNumber(character)) {
    return character;
  } else if (wordToNumberRef.has(searchVal)) {
    return wordToNumberRef.get(searchVal)!!;
  }

  const searchForWord = numberAsWordKeys.find((x) => searchVal.includes(x));
  if (searchForWord && wordToNumberRef.has(searchForWord)) {
    return wordToNumberRef.get(searchForWord)!!;
  }

  return '';
}

function isNumber(val: string) {
  return /^-?\d+$/.test(val);
}

console.log(`The solution is ${sum}`);