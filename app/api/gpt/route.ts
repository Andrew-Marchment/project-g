import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request, res: Response) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `I want you to act as an expert gift ideas curator.
        I will provide you with some information about a person, and you will generate four relevant, personalized gift ideas for that person. Please ensure that any gift ideas you provide are available for purchase on amazon for under $50.
        Your responsibility is to curate four creative, personalized gift ideas, perfect for the person whom you have been provided with information about.`,
      },
      ...messages,
    ],
    stream: true,
    temperature: 0.5,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
