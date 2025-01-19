import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

if (!process.env.PINECONE_API_KEY) {
  throw new Error("Missing Pinecone API key");
}

if (!process.env.PINECONE_ENVIRONMENT) {
  throw new Error("Missing Pinecone environment");
}

if (!process.env.PINECONE_INDEX) {
  throw new Error("Missing Pinecone index name");
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

export async function getVectorStore() {
  const index = pinecone.Index(process.env.PINECONE_INDEX!);

  return await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({ modelName: "text-embedding-3-small" }),
    { pineconeIndex: index }
  );
}
