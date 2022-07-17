import { timeFunction, createWithCapacity, createWithPuhs, sum } from './functions.js';

const testCase = process.argv[2];
const length = +process.argv[3];

const map = {
    capacity: createWithCapacity,
    push: createWithPuhs
}

const { time: creatingTime, result } = timeFunction(() => map[testCase](length));
const { time: sumTime} = timeFunction(() => sum(result));

console.log(JSON.stringify({
    creatingTime,
    sumTime,
}));