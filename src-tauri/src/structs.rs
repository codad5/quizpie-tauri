use serde::Deserialize;

#[derive(Debug, Deserialize, Clone)]
pub struct Question {
    pub question: String,
    pub options: Vec<String>,
    pub answer: usize
}

#[derive(Debug, Deserialize, Clone)]
pub struct Quiz {
    count : u32,
    pub questions: Vec<Question>,
}

impl Quiz {
    pub fn count(&self) -> u32 { self.count  }
    pub fn ready(&mut self) -> &mut Self {
        self.count = self.questions.len() as u32;
        self
    }
}