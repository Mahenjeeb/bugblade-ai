import OpenAI from "openai";
export const reviewCode = async (req, resp) => {
  const {language, code} = req.body;
  const openai = new OpenAI({
    apiKey:
      "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",
  });

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: `Review this ${language} code for bugs and optimizations:\n\n${code}`,
    store: true,
  });

  resp.status(200).json({feedback: response.output_text})
  // response.then((result) => resp.status(200).json({feedback: result.output_text}));
};
