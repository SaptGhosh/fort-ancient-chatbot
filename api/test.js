export default function handler(req, res) {

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {

        return res.status(500).json({
            message: "OpenAI API key was NOT found."
        });

    }


    return res.status(200).json({
        message: "OpenAI API key is available to the backend."
    });

}
