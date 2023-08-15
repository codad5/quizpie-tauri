pub mod response;

pub fn get_next_question_position(current: i32, max:u32) -> u32 {
    let next = current + 1;
    if next <=  (max as i32) {
        return next as u32;
    }
    return max;
}