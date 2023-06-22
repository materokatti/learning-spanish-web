import {useState, useEffect} from "react";
import axios from "axios";

const useChatGpt = (prompt: string) => {
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    if (prompt) {
      const api_key = "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";

      axios
        .post(
          "https://api.openai.com/v1/completions",
          {
            prompt: 'Translate the following English text to French: "{text}"',
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
          console.log(response.data.choices[0].text.trim());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [prompt]);

  return translation;
};

export default useChatGpt;
