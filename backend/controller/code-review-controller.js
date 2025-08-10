import OpenAI from "openai";
export const reviewCode = async (req, resp) => {
  const {language, code} = req.body;
  const openai = new OpenAI({
    apiKey: "test"
  });

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: `Review this ${language} code for bugs and optimizations:\n\n${code}`,
    store: true,
  });

  resp.status(200).json({feedback: response.output_text})
  // response.then((result) => resp.status(200).json({feedback: result.output_text}));
};
