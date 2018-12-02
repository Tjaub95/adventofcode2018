use std::fs::File;
use std::io::prelude::*;
use std::collections::HashSet;

fn get_input() -> String {
    let mut f = File::open("day1_input.txt").expect("file not found");

    let mut contents = String::new();
    f.read_to_string(&mut contents)
        .expect("something went wrong reading the file");


    return contents;
}

fn final_sum(input: String) -> i32 {
    let input_iter = input.split("\r\n");
    let mut sum = 0;
    for freq in input_iter {
        let freq_int: i32 = freq.parse().unwrap();
        sum += freq_int;
    }
    return sum;
}

fn first_repeat_sum(input: String) -> i32 {
    let mut sum = 0;
    let mut safe_to_add = true;
    let mut known_values = HashSet::new();
    known_values.insert(sum);
    while safe_to_add {
        let input_iter = input.split("\r\n");
        for freq in input_iter {
            let freq_int: i32 = freq.parse().unwrap();
            if safe_to_add {
                sum += freq_int;
            }
            if known_values.contains(&sum) {
                safe_to_add = false;
            }
            known_values.insert(sum);
        }
    }
    return sum;
}

fn main() {
    println!("First solution is {}", final_sum(get_input()));
    println!("Second solution is {}", first_repeat_sum(get_input()));
}