import { getVectorStore } from "@/lib/pinecone";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { LangChainAdapter, type Message as VercelChatMessage } from "ai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const chatHistory = messages
      .slice(0, -1)
      .map((m: VercelChatMessage) =>
        m.role === "user"
          ? new HumanMessage(m.content)
          : new AIMessage(m.content)
      );

    const currentMessageContent = messages[messages.length - 1].content;

    const chatModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      streaming: true,
      verbose: true,
    });

    const rephrasingModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      verbose: true,
    });

    const retriever = (await getVectorStore()).asRetriever({});

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation, generate a search query to look up relevant information. Focus on key terms and context. Return only the search query without any other text.",
      ],
    ]);

    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: rephrasingModel,
      retriever,
      rephrasePrompt,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "Je suis Marc, un expert en finance et technologie. Je communique de manière professionnelle mais décontractée. " +
          "Je réponds aux questions en me basant sur mon expérience et les informations de mon CV et de mon portfolio. " +
          "Je suis passionné par la finance, le trading, et le développement web. " +
          "Je m'exprime à la première personne et je peux répondre en français ou en anglais selon la langue de la question. " +
          "Formattez vos réponses en markdown." +
          "Si la question est en français, répondez en français. Si la question est en anglais, répondez en anglais." +
          "Ajouter les liens dans les réponses si nécessaire." +
          "\n\nContexte disponible:\n{context}",
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
      documentPrompt: PromptTemplate.fromTemplate(
        "Content: {page_content}\nSource: {source}"
      ),
    });

    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetrieverChain,
    });

    const langchainStream = await retrievalChain.stream({
      input: currentMessageContent,
      chat_history: chatHistory,
    });

    // Transform the LangChain stream to extract just the answer text
    const textStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of langchainStream) {
          if (chunk.answer) {
            controller.enqueue(chunk.answer);
          }
        }
        controller.close();
      },
    });

    return LangChainAdapter.toDataStreamResponse(textStream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
