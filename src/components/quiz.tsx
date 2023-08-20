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
        if (quest > 0) {
            invoke<string>('get_question_api', { quest: quest }).then((response) => setQuestion({ ...JSON.parse(response) }))
        }
    }, [quest])
    const submitAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        invoke<string>('get_question_api', {quest : currentQuestion?.current}).then((response) => setQuestion({...JSON.parse(response)}))
    }

    return <>
        <div>
            <div>
                Question No {(currentQuestion?.current ?? 0)}/{currentQuestion?.count}: <div>{currentQuestion?.question}</div>
            </div>
            <div>
                <select>
                    <option value={-1}>Select an option</option>
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