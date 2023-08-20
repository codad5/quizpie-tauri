pub mod response;

pub fn get_next_question_position(current: i32, max:u32) -> u32 {
    let next = current + 1;
    if next > max as i32 {
        return 1;
    } 
    next as u32
}

pub fn get_previous_question_position(current: i32, max:u32) -> u32 {
    let previous = current - 1;
    if previous < 1 {
        return max;
    } 
    previous as u32
}

// pub fn get_random_question_position(current: i32, max:u32) -> u32 {
//     let mut rng = rand::thread_rng();
//     let random = rng.gen_range(1..max);
//     if random == current as u32 {
//         return get_random_question_position(current, max);
//     }
//     random
// }

// format the position, that is 1 is actually the position 0 in the vector
pub fn format_position(position: u32) -> usize {
    let mut new_position = position;
    if position > 0 {
        new_position -= 1;
    }
    new_position as usize
}