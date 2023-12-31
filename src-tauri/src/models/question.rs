use serde::Deserialize;
#[derive(Debug, Deserialize, Clone)]
pub struct Question {
    pub question: String,
    pub options: Vec<String>,
    pub answer: usize
}



impl Question {
    pub fn validate_answer(&self, answer: usize) -> bool {
        self.answer == answer
    }
}
    

