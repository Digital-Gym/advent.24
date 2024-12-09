const a = await Deno.readTextFile("input.txt");

let i = 0;
let total = 0;
let state = true; 

function isDigit(n: string): boolean{
  const code = n.charCodeAt(0);
  if(code >= 48 && code <= 57){
    return true;
  }
  return false;
}

while (i < a.length){
  // parse mul
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

    if(state){
      total += Number(left) * Number(right);
    }
  }

  if (a[i] == 'd' && a[i+1] == 'o'){
    i = i + 2;
    if(a[i] == '(' && a[i+1] == ')'){
      state = true;
      i = i + 2;
      continue;
    }

    if (a[i] == 'n' && a[i+1] == "'" && a[i+2] == 't' && a[i+3] == '(' && a[i+4] == ')'){
      state = false;
      i = i + 5;
      continue;
    }
  }

  i++;
}

console.log(total);