struct Score {
    high_score: i32,
    last_score: i32,
}

impl Score {
    fn new() -> Score {
        Score {
            high_score: 0,
            last_score: 0,
        }
    }

    fn update_high_score(&mut self, score: i32) {
        if score > self.high_score {
            self.high_score = score;
        }
    }

    fn update_last_score(&mut self, score: i32) {
        self.last_score = score;
    }

    fn save(&self) {
        // TODO: save to json file
        
    }
}