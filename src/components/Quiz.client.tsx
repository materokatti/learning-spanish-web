import {useEffect, useState} from "react";
import axios from "axios";

const Quiz = () => {
  // get Quiz data from API
  const [quizData, setQuizData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/quiz").then((res) => {
      setQuizData(res.data);
    });
  }, []);

  return (
    <div>
      {quizData?.map((quiz: any, index: number) => (
        <div key={index}>
          <h2>{quiz.question}</h2>
          <p>{quiz.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
