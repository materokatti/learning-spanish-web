import { useState, useEffect } from "react";
import axios from "axios";

const useAiPrompt = (prompt: string) => {
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    if (prompt) {
      // "Llama 2" API 엔드포인트 및 인증 정보
      const apiEndpoint = "LLAMA_2_API_ENDPOINT";
      // const apiKey = process.env.NEXT_PUBLIC_LLAMA_API_KEY;

      axios
        .post(
          apiEndpoint,
          {
            // "Llama 2"에 필요한 요청 본문 구성
            model: "llama2",
            prompt: `${prompt}라는 단어가 들어간 스페인어 문제를 내 줘...`,
            // 기타 "Llama 2"에 필요한 매개변수 추가
          },
          {
            headers: {
              // Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // "Llama 2" 응답 구조에 맞게 데이터 처리
          console.log(response.data); // 응답 로깅
          setTranslation(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [prompt]);

  return translation;
};

export default useAiPrompt;
