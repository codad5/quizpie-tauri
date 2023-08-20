use serde::Serialize;




trait Response {

}
#[derive(Serialize)]
pub struct GreetResponse{
    pub message: String,
}

#[derive(Serialize)]
pub struct QuizInfoResponse {
    pub count : u32,
}

#[derive(Serialize)]
pub struct QuestionResponse {
    pub count : u32,
    pub current: u32,
    pub next: u32,
    pub question: String,
    pub options : Vec<String>,
}

#[derive(Serialize)]
pub struct AnswerResponse {
    pub count : u32,
    pub current: u32,
    pub next: u32,
    pub question: String,
    pub options : Vec<String>,
    pub answer: usize,
    pub correct: bool,
}