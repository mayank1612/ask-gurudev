import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Create a new thread
    const thread = await openai.beta.threads.create();

    // Send user message (latest message only)
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: messages[messages.length - 1].content,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID!,
    });

    // Poll for completion with a timeout mechanism
    let responseMessage = "Thinking...";
    const maxAttempts = 10;
    let attempts = 0;

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before polling
      const runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );

      if (runStatus.status === "completed") {
        const messagesResponse = await openai.beta.threads.messages.list(
          thread.id
        );
        const lastMessage = messagesResponse.data[0];

        // Ensure we extract text content correctly
        const textBlock = lastMessage.content.find(
          (block) => block.type === "text"
        );

        if (textBlock && "text" in textBlock) {
          responseMessage = textBlock.text.value;
        } else {
          responseMessage = "No text response available.";
        }
        break;
      }
      attempts++;
    }

    return NextResponse.json({ response: responseMessage });
  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
