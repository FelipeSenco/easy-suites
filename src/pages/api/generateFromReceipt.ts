import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { base64File } = req.body;

  if (!base64File) {
    return res.status(400).json({ message: "Bad Request: No image data provided." });
  }

  const payload = {
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `{
    "dataPagamento": "{Extract the payment date in the format DD/MM/YYYY or null if unavailable}",
    "nomePagador": "{Extract the payer's name or null if unavailable}",
    "valorPago": "{Extract the amount paid, formatted as a number with two decimal places, or null if unavailable}"
    You response should be ONLY the json
  }`,
          },
          {
            type: "image_url",
            image_url: {
              url: base64File,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  };

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error calling OpenAI API:", (error as any).response.data);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
