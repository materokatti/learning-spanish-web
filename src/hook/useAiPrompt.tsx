import { useState, useEffect } from "react";
import axios from "axios";

const useAiPrompt = (prompt: string) => {
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    if (prompt) {
      fetch("http://localhost:3001/llama-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })
        .then((response) => response.json())
        .then((data) => {
          // 여기서 data는 /llama-query 엔드포인트로부터의 응답입니다.
          console.log(data);
          setTranslation(data); // 이 부분은 "Llama 2" 응답 구조에 맞게 조정해야 할 수도 있습니다.
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [prompt]);

  return translation;
};

export default useAiPrompt;
