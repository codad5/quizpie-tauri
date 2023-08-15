use std::{fs::File, io::Read};

use serde::Deserialize;

use crate::models::question::Question;

#[derive(Debug, Deserialize, Clone)]
pub struct Quiz {
    file: String,
    count : u32,
    pub questions: Vec<Question>,
}

impl Quiz {
    pub fn count(&self) -> u32 { self.count  }
    pub fn ready(&mut self) -> &mut Self {
        self.count = self.questions.len() as u32;
        self
    }
    pub fn load_questions(&mut self) -> &mut Self {
        let mut file = File::open(self.file.to_string()).expect(&format!("Couldn't open file {}", self.file));
        let mut content = String::new();
        file.read_to_string(&mut content).expect("something went wrong");
        let parsed_data : Quiz = serde_json::from_str(&content).expect("something went wrong");
        self.questions = parsed_data.questions;
        self.count = self.questions.len() as u32;
        self
    }

    pub fn load(file: String) -> Self {
        let mut newquiz =  Self  {
            file : file,
            count:0,
            questions : vec![]
        };
        newquiz.load_questions();
        newquiz
    }
}