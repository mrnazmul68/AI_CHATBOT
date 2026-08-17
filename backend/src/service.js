import {
  AIMessage,
  AIMessageChunk,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import z from "zod";
import { createAgent } from "langchain";
import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

async function getLatestInformation({ query }) {
  const response = await tvly.search(query);

  const results = response.results;

  const content = results.map((result) => result.content).join("\n\n");

  return content;
}

const getInformationTool = tool(getLatestInformation, {
  name: "search_web",
  description:
    "Search the web to find up-to-date information about any topic the user asks about.",
  schema: z.object({
    query: z.string(),
  }),
});

const model = new ChatGoogleGenerativeAI({
  model: process.env.GEMINI_MODEL,
  apiKey: process.env.GEMINI_API_KEY,
});

const agent = createAgent({
  model,
  tools: [getInformationTool],
});

const messages = [
  new SystemMessage(
    `Your name is CHONGBONG.
You are an AI assistant of a Todo Manager app.

You help users with questions related to the Todo Manager app.
You do not have access to the database and cannot perform any CRUD operations.

Today's date is ${new Date().toLocaleDateString()}.`,
  ),
];
console.log(messages);

export const chatService = async (prompt) => {
  messages.push(new HumanMessage(prompt));

  const response = await agent.stream(
    {
      messages,
    },
    {
      streamMode: "messages",
    },
  );

  let aiResponse = "";

  for await (const [chunk] of response) {
    if (chunk instanceof AIMessageChunk) {
      const text = chunk.text;

      if (text) {
        aiResponse += text;
      }
    }
  }

  messages.push(new AIMessage(aiResponse));

  return aiResponse;
};
