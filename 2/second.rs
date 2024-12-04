// shittiest code ever :)
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

fn process_report(raw_report: &str, from: i32, adj: i32) -> bool{
  let report: Vec<&str> = raw_report.split(" ").collect();
  let direction = get_direction(give_dif(report[from as usize], report[from as usize + 1]));
  let mut ignore_index: i32 = -1;
  let mut i = 0;

  while i < report.len() - 1 && ignore_index as usize != report.len() - 1{
    if ignore_index == i as i32 {
      i += 1;
      continue;
    }

    let step = if ignore_index == (i as i32) + 1 {i + 2} else {i+1};
    let dif = give_dif(report[i], report[step]);
  
    if dif.abs() >= 1 && dif.abs() <= 3 && get_direction(dif) == direction {
      i += 1;
      continue;
    }

    if ignore_index == -1 {
      ignore_index = i as i32 + adj;
      i = 0;
      continue;
    }

    return false;
  }

  return true;
}

fn main() {
  let input = fs::read_to_string("input.txt")
      .expect("Should have been able to read the file");

  let data = input.split("\r\n").into_iter();
  let mut sum = 0;

  for i in data{
    // O(number of reports) * O(number of levels in a report) * 4 xD
    // cheks with 
    // skips first, ignores self
    // skips first, ignores next
    // no skip, ignores self
    // no skip, ignore next
    if process_report(i, 0, 0) || process_report(i, 1, 0) || process_report(i, 0, 1) || process_report(i, 1, 1){
      sum += 1;
    }
  }

  println!("Answer: {}", sum);
}