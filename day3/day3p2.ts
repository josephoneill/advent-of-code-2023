import * as fs from 'fs';
import { spec } from 'node:test/reporters';
import path from 'path';

type Location = {
  x: number;
  y: number;
}

class Part {
  x: number;
  y: number;
  width: number;
  partNumber: string;
  id: string;
  height = 1;

  constructor(x: number, y: number, width: number, partNumber: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.partNumber = partNumber;
    this.id = `${partNumber}-${x}-${y}`;
  }

  isPartAdjacentToLocation(loc: Location) {
    // Extend our "rect" by 1 unit in each direction during check
    return (
      (
        this.x - 1 <= loc.x &&
        this.x + this.width >= loc.x &&
        this.y - 1 <= loc.y &&
        this.y + this.height >= loc.y
      )
    );
  }
}

const rawInput = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const inputArray = rawInput.split(/[\r\n]+/);

let parts: Array<Array<Part>> = [];
let specialCharacterLocations: Array<Location> = [];

for (let i = 0; i < inputArray.length; i++) {
  const line = inputArray[i];
  let numLine = line;
  let numOffet = 0;
  let charLine = line;
  let charOffset = 0;

  let partNumbers = line.match(/\d+/g);
  let specialCharacters = line.match(/\*/g);
  const partsOnLine: Array<Part> = [];
  
  if (partNumbers) {
    partNumbers.forEach((partNumber: string) => {
      const location = numLine.indexOf(partNumber);
      numLine = numLine.substring(numLine.indexOf(partNumber) + partNumber.length);
      const part = new Part(location + numOffet, i, partNumber.length, partNumber);
      numOffet += location + partNumber.length;
      partsOnLine.push(part);
    });
  }

  parts.push(partsOnLine);

  if (specialCharacters) {
    let charactersArray: Location[] = [];
    Array.from(specialCharacters).forEach((specialCharacter) => {
      const x = charLine.indexOf(specialCharacter);
      const y = i;
      charLine = charLine.substring(charLine.indexOf(specialCharacter) + specialCharacter.length);
      charactersArray.push({ x: x + charOffset, y });
      charOffset += x + 1;
    });
    // const charactersArray: Location[] = Array.from(specialCharacters).map(specialChar => ({ x: charLine.indexOf(specialChar), y: i }));
    specialCharacterLocations.push(...charactersArray);
  }
}

let sum = 0;
specialCharacterLocations.forEach((specialCharLocation) => {
  const startIndex = Math.max(specialCharLocation.y - 1, 0);
  const endIndex = Math.min(parts.length - 1, specialCharLocation.y + 1);
  const partNumbersAdjacentToChar: Array<string> = [];
  for (let i = startIndex; i <= endIndex; i++) {
    let partsLine = parts[i];
    partsLine.forEach((part) => {
      if (part.isPartAdjacentToLocation(specialCharLocation)) {
        partNumbersAdjacentToChar.push(part.partNumber)
        partsLine = partsLine.filter(x => x.id !== part.id);
        parts[i] = partsLine;
      }
    });
  }

  
  if (partNumbersAdjacentToChar.length === 2) {
    sum += partNumbersAdjacentToChar.reduce((acc, num) => acc * parseInt(num, 10), 1);
  }
});

console.log(`The solution is ${sum}`);