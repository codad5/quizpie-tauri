import { invoke } from "@tauri-apps/api/tauri";
import { SetStateAction, useEffect, useState, useRef } from "react";

type Question = {
    count: number,
    current: number,
    next: number,
    question: string,
    options: String[]
}

type AnswerResponse = {
    count: number,
    current: number,
    next: number,
    question: string,
    options: string[],
    answer: number,
    correct: boolean,
};


type QuestionResponses = Question | AnswerResponse;
export default function Quiz({ quest }: { quest: number }) {
    const [currentQuestion, setQuestion] = useState<QuestionResponses>();
    const [correctAnswer, setAnswer] = useState<boolean>();
    const [restart, setRestart] = useState<boolean>(false);
    const [quizOptions, setQuizOptions] = useState<string[]>(['test']);
    const [quizOption, setQuizOption] = useState<String>('test');
    const selectedOptionRef = useRef<HTMLSelectElement>(null);
    const [selectedOption, setSelectedOption] = useState<String|number>();
  const handleOptionChange = (event: { target: { value: SetStateAction<number | String | undefined>; }; }) => {
    setSelectedOption(event.target.value);
  };


    useEffect(() => {
        if (quest > 0) {
            invoke<string>('get_question_api', { quest: 0 , option: quizOption}).then((response) => setQuestion({ ...JSON.parse(response) }))
        }
    }, [quizOption, restart]);

    useEffect(() => {
        invoke<string>('get_all_quiz_option').then((response) => setQuizOptions(JSON.parse(response)))
    }, []);
    const submitAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (selectedOption === undefined || parseInt(selectedOption as string) < 0) return
        invoke<string>('check_answer', { quest: currentQuestion?.current, answer : parseInt(selectedOption as string), option: quizOption}).then((response) => {
            let answerResponse: QuestionResponses = JSON.parse(response);
            console.log(answerResponse);
            if ((answerResponse as AnswerResponse)?.correct  === false) {
                setAnswer(false);
            }
            else {
                setAnswer(true);
                setSelectedOption(-1);
                setQuestion(answerResponse);
            }
        })
    }

    return <>
        <div className="w-full">
            <div className="header ">
                <div className="restart-btn-cnt">
                    <button onClick={() => setRestart(!restart)}>Restart</button>
                </div>
                <div className="header-txt">
                    <h1>
                        Quiz Pie
                    </h1>
                </div>
                <div className="restart-btn-cnt">
                    <select ref={selectedOptionRef} onChange={(e) => setQuizOption(e.target.value as String)}>
                        {
                            quizOptions.map((option, key) => (
                                <option value={option} key={key} selected={option == 'test'}>{option}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="quiz-body">
                <div className="question-number">
                    <span className="question-num-big">
                        {(currentQuestion?.current ?? 0)}
                    </span>
                    /{currentQuestion?.count}: 
                </div>
                <div className="question-cnt">
                    <span style={{
                        fontWeight: 500
                    }}>Question :</span>
                    <div>{currentQuestion?.question}</div>
                </div>
                <div className="answer-body">
                    <form>

                        <div className="answer-cnt">
                            <div className="option-group">
                                {
                                    currentQuestion?.options.map((option, key) => (
                                        <label>
                                            <div className="input-option">
                                                <input
                                                    type="radio"
                                                    name="quizOption"
                                                    value={key}
                                                    checked={selectedOption == key}
                                                    onChange={handleOptionChange}
                                                />
                                            </div>
                                                <div className="option-text">
                                                    {option}
                                                </div>
                                        </label>
                                    ))
                                }
                            </div>
                       <br />
                        </div>
                        <div className="submit-btn-cnt">
                             <button onClick={submitAnswer}>Next</button>
                        </div>
                    </form>
                </div>
                {correctAnswer === false && <div>Wrong Answer</div>}
                <br />
            </div>
        </div>
    </>
}