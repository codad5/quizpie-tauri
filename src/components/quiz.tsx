import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState , useRef} from "react";

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
    const selectRef = useRef<HTMLSelectElement>(null);
    useEffect(() => {
        if (quest > 0) {
            invoke<string>('get_question_api', { quest: quest }).then((response) => setQuestion({ ...JSON.parse(response) }))
        }
    }, [quest, restart]);
    const submitAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        invoke<string>('check_answer', { quest: currentQuestion?.current, answer : parseInt(selectRef.current?.value as string)}).then((response) => {
            let answerResponse: QuestionResponses = JSON.parse(response);
            console.log(answerResponse);
            if ((answerResponse as AnswerResponse)?.correct  === false) {
                setAnswer(false);
            }
            else {
                setAnswer(true);
                setQuestion(answerResponse);
            }
        })
    }

    return <>
        <div>
            <button onClick={() => setRestart(!restart)}>Restart</button>
            <br />
            <hr />
            <div>
                Question No {(currentQuestion?.current ?? 0)}/{currentQuestion?.count}: 
                <br />
                <h4>{currentQuestion?.question}</h4>
            </div>
            <div>
                <select ref={selectRef}>
                    <option value={-1} selected disabled hidden>Choose here</option>
                    {
                        currentQuestion?.options.map((option, key) => (
                            <option value={key} key={key}>{option}</option>
                        ))
                    }
                </select>
            </div>
            <br />
            <button onClick={submitAnswer}>Next</button>
            {correctAnswer === false && <div>Wrong Answer</div>}
        </div>
    </>
}