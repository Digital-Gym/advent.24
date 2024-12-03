use std::fs;

#[derive(PartialEq)]
enum Direction{
  Up,
  Down
}

fn get_direction(diff: i32) -> Direction {
  if diff > 0 {Direction::Up} else {Direction::Down}
}

fn give_dif(a: &str, b: &str) -> i32{
  b.parse::<i32>().unwrap() - a.parse::<i32>().unwrap()
}

fn process_report(raw_report: &str) -> bool{
  let report: Vec<&str> = raw_report.trim().split(" ").collect();
  let direction = get_direction(give_dif(report[0], report[1]));
  
  for i in 0..(report.len() - 1){
    let dif = give_dif(report[i], report[i+1]);

    if get_direction(dif) != direction {
      return false;
    }

    if dif.abs() >= 1 && dif.abs() <= 3 {
      continue;
    }
    return false;
  }

  return true;
}

fn main() {
  let input = fs::read_to_string("input.txt")
      .expect("Should have been able to read the file");

  let data = input.split("\n").into_iter();
  let mut sum = 0;

  for i in data{
    if process_report(i) {
      sum += 1;
    }
  }

  println!("Answer: {}", sum);
}