import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Only POST requests are allowed."
        });
    }

    try {

        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                error: "No question was provided."
            });
        }

        const response = await client.responses.create({
            model: "gpt-5-mini",

            input: [
                {
                    role: "user",
                    content: question
                }
            ]
        });

        return res.status(200).json({
            answer: response.output_text
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Something went wrong while calling OpenAI."
        });
    }
}
