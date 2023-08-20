use crate::{helpers, models};
use helpers::response::{QuizInfoResponse, QuestionResponse, AnswerResponse};
use models::quiz::Quiz;


#[tauri::command]
pub fn get_quiz_info_api() -> String {
    let quiz_data = Quiz::load(String::from("questions/test.json"));
    let quiz_info =  QuizInfoResponse {
        count: quiz_data.count(),
    };
    serde_json::to_string(&quiz_info).expect("JSON serialization error")
}

#[tauri::command]
pub fn get_question_api(quest: usize) -> String {
    let mut data = Quiz::load(String::from("questions/test.json"));
    let binding = data.clone();
    let next = helpers::get_next_question_position(quest as i32, data.count());
    println!("next: {}", next);
    println!("quest: {}", quest);
    println!("data.count(): {}", data.count());
    let question = binding.questions.get(helpers::format_position(next)).expect("Question not found");
    let question_response = QuestionResponse {
        count: data.count(),
        current: next,
        next: next + 1,
        question: question.question.clone(),
        options: question.options.clone(),
    };
    serde_json::to_string(&question_response).expect("JSON serialization error")
    // serde_json::to_string(&question_response).expect("JSON serialization error")
}


#[tauri::command]
pub fn check_answer(quest: u32, answer: usize) -> String {
    let mut data = Quiz::load(String::from("questions/test.json"));
    let binding = data.clone();
    let question = binding.questions.get(helpers::format_position(quest)).expect("Question not found");
    if question.validate_answer(answer){
        return get_question_api(quest as usize);
    }
    let question_response = AnswerResponse {
        count: data.count(),
        current: quest ,
        next: quest  ,
        question: question.question.clone(),
        options: question.options.clone(),
        answer: question.answer,
        correct: false,
    };
    serde_json::to_string(&question_response).expect("JSON serialization error")
    // serde_json::to_string(&question_response).expect("JSON serialization error")
}