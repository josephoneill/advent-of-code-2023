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

  isCubeCountValid() {
    if (this.redCubes > this.MAX_RED_CUBES) {
      return false;
    }

    if (this.greenCubes > this.MAX_GREEN_CUBES) {
      return false;
    }

    if (this.blueCubes > this.MAX_BLUE_CUBES) {
      return false;
    }

    return true;
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

    if (!gameSequence.isCubeCountValid()) {
      sum -= parseInt(gameID, 10);
      break;
    }
  }
  sum += parseInt(gameID);
}

console.log(`The solution is ${sum}`);