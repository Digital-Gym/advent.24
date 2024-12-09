const a = await Deno.readTextFile("input.txt");

let i = 0;
let total = 0;

function isDigit(n: string): boolean{
  const code = n.charCodeAt(0);
  if(code >= 48 && code <= 57){
    return true;
  }
  return false;
}

while (i < a.length){
  if(a[i] == 'm' && a[i+1] == 'u' && a[i+2] == 'l'){
    i = i + 3;

    if(a[i] != '('){
      continue;
    }

    i++;
    let right = '';
    let left = '';

    while (isDigit(a[i])){
      left += a[i];
      i++;
    }

    if(a[i] !== ','){
      continue;
    }

    i++;
    while (isDigit(a[i])){
      right += a[i];
      i++;
    }

    if(a[i] !==')'){
      continue;
    }

    if(left.length == 0 || right.length == 0){
      continue;
    }

    total += Number(left) * Number(right);
  }
  i++;
}

console.log(total);