import * as readline from 'node:readline/promises';
import * as fs from 'node:fs';

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');
  const lefts: number[] = [];
  const hash: Map<number, number> = new Map();
  let sum: number = 0;

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const left = Number(line.slice(0, 5));
    lefts.push(left);
    
    // write right's freq to hash
    const right = Number(line.slice(8));
    const cached = hash.get(right);
    hash.set(right, (cached ? cached : 0) + 1);
  }

  lefts.forEach((el)=>{
    sum += el * (hash.get(el) ?? 0);
  });

  return sum;
}

console.log("Result:", await processLineByLine());