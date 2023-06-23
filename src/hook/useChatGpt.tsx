import { useState, useEffect } from "react";
import axios from "axios";

const useChatGpt = (prompt: string) => {
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    if (prompt) {
      const api_key = process.env.NEXT_PUBLIC_API_KEY;
      axios
        .post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `${prompt}라는 단어가 들어간 스페인어 문제를 내 줘.
                          단, 다음 조건에 맞게 문제를 내 줘
                          * ${prompt}가 들어간 스페인어 문장이어야 함.
                          * 레벨이 A1, A2, B1, B2 순으로 총 4 문장이 나와야 함.
                          * 문장 하단에는 한국어 해석이 들어가야 함.
                          * ${prompt}가 들어갈 공간은 빈칸으로 비워서 문제를 푸는 사람이 맞추도록 함. 
                          `,
              },
            ],
            max_tokens: 60,
          },
          {
            headers: {
              Authorization: `Bearer ${api_key}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data.choices[0].message);
          setTranslation(response.data.choices[0].message.content);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [prompt]);

  return translation;
};

export default useChatGpt;
