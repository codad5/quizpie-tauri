// fn 

pub fn get_next_question_position(current: u32, max:u32) -> u32 {
    let next = current + max;
    if next <=  max {
        next
    }
    max
}