// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


mod structs;
mod response;

use std::{fs::File, io::Read, env};
use response::{GreetResponse, QuizInfoResponse, QuestionResponse};
use structs::Quiz;


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    let response = GreetResponse {
        message: format!("Hello, {}! You've been greeted from Rust!", name),
    };

    // Serialize the response object to JSON and return as a string
    serde_json::to_string(&response).expect("JSON serialization error")
}


#[tauri::command]
fn get_quiz_info_api() -> String {
    let mut data = get_quiz_info().expect("something failed");
    let quiz_info =  QuizInfoResponse {
        count: data.ready().count()
    };
    serde_json::to_string(&quiz_info).expect("JSON serialization error")
}

#[tauri::command]
fn get_question_api(quest: usize) -> String {
    let mut data = get_quiz_info().expect("something failed");
    let binding = data.clone();
    let question = binding.questions.get(quest).expect(format!("cant get question at {}", quest).as_str());
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


fn get_quiz_info() -> Result<Quiz, String> {
    let mut file = File::open("./questions/test.json").expect("Failed to read file");
    let mut content = String::new();
    file.read_to_string(&mut content).expect("something went wrong");
    let parsed_data : Quiz = serde_json::from_str(&content).expect("something went wrong");
    Ok(parsed_data)
    
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_quiz_info_api, get_question_api])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
