use crate::{helpers, models};
use helpers::response::{QuizInfoResponse, QuestionResponse};
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
    let next_question_index = helpers::get_next_question_position((quest - 1 )as i32, binding.count());
    let question = binding.questions.get(next_question_index as usize).expect(format!("cant get question at {}", next_question_index).as_str());
    let question = question.clone();
    let question_response = QuestionResponse {
        count : data.ready().count(),
        current: quest as u32,
        next:(quest+1) as u32,
        question: question.question,
        options:question.options
    };
    serde_json::to_string(&question_response).expect("JSON serialization error")
}