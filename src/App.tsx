import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Quiz from "./components/quiz";

type quizDataType = {
  current: number, 
  count: number
}
function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [quizData, setQuizData] = useState<quizDataType>();
  useEffect(() => {
    invoke<string>('get_quiz_info_api', {
      option: 'test'
    }).then((response) => setQuizData({...JSON.parse(response), current:0}))
  }, [])

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <Quiz quest={quizData?.count ?? 0}/>
    </div>
  );
}

export default App;
