// part - 1
let sum = 0;
const a:number[] = [];
const b:number[] = [];

const input = await Deno.readTextFile("input.txt");
const pairs = input.split("\n");

pairs.forEach((x)=>{
  const pair = x.split("   ");
  a.push(Number(pair[0]));
  b.push(Number(pair[1]));
});

a.sort();
b.sort();

for(let i = 0; i<a.length; i++){
  sum += Math.abs(a[i] - b[i]);
}

console.log(sum);