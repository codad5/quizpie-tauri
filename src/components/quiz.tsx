import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

type Question = {
    count: number,
    current: number,
    next: number,
    question: string,
    options: String[]
}
export default function Quiz({ quest }: { quest: number }) {
    const [currentQuestion, setQuestion] = useState<Question>();
    useEffect(() => {
        invoke<string>('get_question_api', {quest : quest - 1}).then((response) => setQuestion({...JSON.parse(response)}))
    })
    const submitAnswer = (e) => {
        e.preventDefault();
        invoke<string>('get_question_api', {quest : currentQuestion?.next}).then((response) => setQuestion({...JSON.parse(response)}))
    }

    return <>
        <div>
            <div>
                Question No {(currentQuestion?.current ?? 0)+1}/{currentQuestion?.count}: <div>{currentQuestion?.question}</div>
            </div>
            <div>
                <select>
                    {
                        currentQuestion?.options.map((option, key) => (
                            <option value={key} key={key}>{option}</option>
                        ))
                    }
                </select>
            </div>
            <button onClick={submitAnswer}>Next</button>
        </div>
    </>
}