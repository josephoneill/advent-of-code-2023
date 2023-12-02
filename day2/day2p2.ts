import * as fs from 'fs';
import path from 'path';

class GameSequence {
  readonly MAX_RED_CUBES = 12;
  readonly MAX_GREEN_CUBES = 13;
  readonly MAX_BLUE_CUBES = 14;
  id: string;
  redCubes: number;
  greenCubes: number;
  blueCubes: number;

  constructor(id: string, redCubes: number = 0, greenCubes: number = 0, blueCubes: number = 0) {
    this.id = id;
    this.redCubes = redCubes;
    this.greenCubes = greenCubes;
    this.blueCubes = blueCubes;
  }

  addToCubeColor(color: string, count: number) {
    switch (color) {
      case 'red':
        this.redCubes += count;
        break;
      case 'green':
        this.greenCubes += count;
        break;
      case 'blue':
        this.blueCubes += count;
        break;
      default:
        console.error(`No such cube with color code ${color} exists!`);
        break;
    }
  }

  getPowerOfSet() {
    return this.redCubes * this.greenCubes * this.blueCubes;
  }
}

const rawInput = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const inputArray = rawInput.split(/[\r\n]+/);

let sum = 0;

for (let i = 0; i < inputArray.length; i++) {
  const line = inputArray[i];
  
  const gameID = line.substring(line.indexOf(' ') + 1, line.indexOf(':'));
  // + 2, one for index offset, one for the space following the :
  const sequencesString = line.substring(line.indexOf(':') + 2);
  const sequences: string[] = sequencesString.split(';').map((x: string) => x.trim());

  const minGameSequence = new GameSequence(gameID);
  for (let j = 0; j < sequences.length; j++) {
    const gameSequence = new GameSequence(gameID);
    const sequence = sequences[j];
    const sequenceCubesData = sequence.split(',').map((x: string) => x.trim());

    for (let k = 0; k < sequenceCubesData.length; k++) {
      const cubeData = sequenceCubesData[k];
      const cubeDataArray = cubeData.split(' ');
      const cubeCount = cubeDataArray[0];
      const cubeColor = cubeDataArray[1];

      gameSequence.addToCubeColor(cubeColor, parseInt(cubeCount, 10));
    }

    // Check if the current sequence's cube's value is less than our minimum
    if (gameSequence.redCubes > minGameSequence.redCubes) {
      minGameSequence.redCubes = gameSequence.redCubes;
    }

    if (gameSequence.greenCubes > minGameSequence.greenCubes) {
      minGameSequence.greenCubes = gameSequence.greenCubes;
    }

    if (gameSequence.blueCubes > minGameSequence.blueCubes) {
      minGameSequence.blueCubes = gameSequence.blueCubes;
    }
  }

  sum += minGameSequence.getPowerOfSet();
}

console.log(`The solution is ${sum}`);