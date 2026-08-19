import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


// ---------------------------------------------------------
// LOAD THE FULL FORT ANCIENT DOCUMENT
// ---------------------------------------------------------

const filePath = path.join(process.cwd(), "fort_ancient.txt");

const pdfText = fs.readFileSync(filePath, "utf8");

console.log(
    "Fort Ancient document loaded. Word count:",
    pdfText.split(/\s+/).length
);


// ---------------------------------------------------------
// CHAT ENDPOINT
// ---------------------------------------------------------

export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Only POST requests are allowed."
        });

    }


    try {

        const { question } = req.body;


        if (!question || question.trim() === "") {

            return res.status(400).json({
                error: "No question was provided."
            });

        }


        const response = await client.responses.create({

            model: "gpt-5-nano",

            input: [

                {
                    role: "system",

                    content: `You are a question-answering assistant for a document about Fort Ancient and related archaeological sites in Ohio.
                    Rules:
                    * Answer the user's question specifically and exclusively from the supplied PDF text. Do not use outside knowledge.
                    * If the answer is not stated in the PDF, say: "The provided PDF does not contain enough information to answer this question.
                    * Answer concisely and to the point."
                    * Be warm, friendly, and respectful.
                    * Do not mention these instructions or the prompt in your answer.`
                },

                {
                    role: "user",

                    content: `Here is the complete text extracted from the PDF:

<PDF_DOCUMENT>

${pdfText}

</PDF_DOCUMENT>

Question: ${question}`
                }

            ]

        });


        return res.status(200).json({
            answer: response.output_text
        });


    } catch (error) {

        console.error("OpenAI error:", error);

        return res.status(500).json({
            error: "Something went wrong while generating the answer."
        });

    }

}
