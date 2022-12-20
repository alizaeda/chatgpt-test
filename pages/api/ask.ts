import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(400).json({ answer: "Bad Request" });
    return;
  }

  const { question } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    // stop: ["\n"],
  });

  console.log(response.data.choices);
  console.log(response.data.choices[0].text);

  res.status(200).json({ answer: response.data.choices[0].text as string });
}

// const { prompt } = req.body;

// const response = await openai.complete({
//   prompt,
//   maxTokens: 5,
//   temperature: 0.9,
//   topP: 1,
//   presencePenalty: 0,
//   frequencyPenalty: 0,
//   bestOf: 1,
//   n: 1,
//   stream: false,
//   stop: ["\n", "  ", "  "],
// });

// res.status(200).json({ answer: response.data.choices[0].text });
