import React, {useState, useEffect} from "react";
import axios from "axios";
import useChatGpt from "@/hook/useChatGpt";

export default function Quiz() {
  // get the quiz data from the api
  const [quizData, setQuizData] = useState([] as any);
  useEffect(() => {
    axios.get("http://localhost:3001/").then((res) => {
      setQuizData(res.data);
    });
  }, []);

  // random number that under the length of the quiz data
  const randomNum = Math.floor(Math.random() * quizData.length);
  if (quizData[randomNum]) {
    console.log(quizData[randomNum].question);
  }
  const translation = useChatGpt(quizData[randomNum]?.question);
  console.log(translation);
  return (
    <div>
      <h1>
        {quizData[randomNum] ? quizData[randomNum].question : "Loading..."}
      </h1>
      <h1>{translation ? translation : "Loading..."}</h1>
    </div>
  );
}
