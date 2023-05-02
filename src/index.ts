import * as dotenv from 'dotenv';
import { OpenAI } from 'langchain/llms/openai';
import * as fs from 'node:fs';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RetrievalQAChain } from 'langchain/chains';
import * as readline from 'node:readline';

dotenv.config();

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
const text = fs.readFileSync('./src/data/sample.txt', 'utf8');
const textSpliter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSpliter.createDocuments([text]);

const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Ready to answer questions! Type 'exit' to quit.");
ask();

function ask() {
  rl.question('< ', async (query) => {
    if (query === 'exit') {
      rl.close();
      return;
    }

    const res = await chain.call({ query });

    console.log(`>${res.text}`);
    ask();
  });
}
