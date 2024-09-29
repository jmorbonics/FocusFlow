// server.js

import fs from "fs";
import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
// import { getStreamingCompletion } from "./src/modules/openai/index.js";

const app = express();
const port = process.env.PORT || 3005;
// const apiKey = process.env.OPEN_AI_KEY;   // can add api key to .env file instead
// const apiKey = "sk-proj-EyczAoRe1isIn5MjdKpAT3BlbkFJza3ab4Jc3stady8IjgIH";
const apiKey = "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";
const openai = new OpenAI({ apiKey: apiKey });


app.use(cors());
app.use(express.json()); 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Here, we define the '/chatbot' route to handle questions from our frontend
app.post("/chatbot", async (req, res) => {
  console.log("GPT request received");

  const { question } = req.body;

  res.setHeader("Content-Type", "text/plain");

  const assistant = await openai.beta.assistants.create({
    name: "Clearguide Traffic Analyst Assistant",
    instructions: "You are an expert user of Clearguide Traffic Tool. Use you knowledge base to answer questions about use of the clearguide system. You can't link photos or graphs. When you make html p tags use className=\"gpt-p\"",
    model: "gpt-4o",
    tools: [{ type: "file_search" }],
  });

//   const fileStreams = ["src/gpt-resources/ClearGuide_User_Manual.pdf", 
//                        "src/gpt-resources/ClearGuide_Datasheet.pdf", 
//                        "src/gpt-resources/ClearGuide_Signal_Trends_Datasheet.pdf", 
//                        "src/gpt-resources/ClearGuide_Speeding_Analytics_Datasheet.pdf", 
//                        "src/gpt-resources/VantageRadius_User_Guide.pdf"].map((path) =>
//     fs.createReadStream(path),
//   );
   
  // Create a vector store including files.
//   let vectorStore = await openai.beta.vectorStores.create({
//     name: "Clearguide User Manual",
//   });

//   await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
//     files: fileStreams,
//   });

  await openai.beta.assistants.update(assistant.id, {
    // tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
  });
  
  // "According to the clearguide user manual, How do I run time of day report?",

  const thread = await openai.beta.threads.create({
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
  });

  // create a run and check the output 
  const stream = openai.beta.threads.runs
  .stream(thread.id, {
    assistant_id: assistant.id,
  })
  .on("textCreated", () => console.log("assistant >"))
  .on("textDelta", (textDelta, snapshot) => res.write(textDelta.value))
  .on("toolCallCreated", (event) => console.log("assistant " + event.type))
  .on("messageDone", async (event) => {
    if (event.content[0].type === "text") {
      const { text } = event.content[0];
      const { annotations } = text;
      const citations = [];

      let index = 0;
      for (let annotation of annotations) {
        text.value = text.value.replace(annotation.text, "[" + index + "]");
        const { file_citation } = annotation;
        if (file_citation) {
          const citedFile = await openai.files.retrieve(file_citation.file_id);
          citations.push("[" + index + "]" + citedFile.filename);
        }
        index++;
      }

      // res.send(text.value); //  + "\n" + citations.join("\n")
      console.log(text);
      res.end();
    }});
  

  // res.send(response.choices[0].message.content);
  console.log("GPT request completed");
});


/////////////////////////////////////////////////


// import {ChatOpenAI} from '@langchain/openai';
// // import { PromptTemplate } from "@langchain/prompts";

// app.post("/llamachatbot", async (req, res) => {
//   console.log("GPT request received");

//   const { question } = req.body;

//   const openAIApiKey = "sk-proj-EyczAoRe1isIn5MjdKpAT3BlbkFJza3ab4Jc3stady8IjgIH";

//   const llm = new ChatOpenAI({ openAIApiKey })

//   const res2 = await llm.invoke(question);
//   console.log(res2);
//   res.send(res2.content + "\n"); 

//   console.log("Lang request completed");
// });



/////////////////////////////////////////////////


// Here, we define the '/ragchatbot' route to handle questions from our frontend
// app.post("/ragchatbot", async (req, res) => {
//   console.log("RAG GPT request received");

//   const { question } = req.body;

//   res.setHeader("Content-Type", "text/plain");

//   const csvfile = await openai.files.create({
//     file: fs.createReadStream("src/gpt-resources/spm_wait_time.csv"),
//     purpose: "assistants",
//   });

//   const assistant = await openai.beta.assistants.create({
//     name: "Clearguide Traffic Analyst Assistant",
//     instructions: "You are an expert user of Clearguide Traffic Tool. Use you knowledge base to answer questions about use of the clearguide system. You can't link photos or graphs. You have access to a csv file filled with data about an intersection. Don't mention to the user if you fail on the first atempt while accessing the csv file. spm_wait_time.csv has data from the intersection of N 3rd & Grape.",
//     model: "gpt-4o",
//     tools: [{ type: "file_search" },
//             { type: "code_interpreter" }],
//     tool_resources: {
//       code_interpreter: {
//         file_ids: [csvfile.id],
//       },
//     },
//   });

//   const fileStreams = ["src/gpt-resources/ClearGuide_User_Manual.pdf", 
//                        "src/gpt-resources/ClearGuide_Datasheet.pdf", 
//                        "src/gpt-resources/ClearGuide_Signal_Trends_Datasheet.pdf", 
//                        "src/gpt-resources/ClearGuide_Speeding_Analytics_Datasheet.pdf", 
//                        "src/gpt-resources/VantageRadius_User_Guide.pdf"].map((path) =>
//     fs.createReadStream(path),
//   );
   
//   // Create a vector store including files.
//   let vectorStore = await openai.beta.vectorStores.create({
//     name: "Clearguide User Manual",
//   });

//   await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
//     files: fileStreams,
//   });

//   await openai.beta.assistants.update(assistant.id, {
//     tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
//   });
  
//   // "According to the clearguide user manual, How do I run time of day report?",

//   const thread = await openai.beta.threads.create({
//     messages: [
//       {
//         role: "user",
//         content: question,
//       },
//     ],
//   });

//   const result = "";

//   // create a run and check the output 
//   const stream = openai.beta.threads.runs
//   .stream(thread.id, {
//     assistant_id: assistant.id,
//   })
//   .on("textCreated", () => console.log("assistant >"))
//   .on("textDelta", (textDelta, snapshot) => res.write(textDelta.value))
//   .on("toolCallCreated", (event) => console.log("assistant " + event.type))
//   .on("end", async (event) => {
//     res.end()
//     // if (event.content[0].type === "text") {
//     //   const { text } = event.content[0];
//     //   const { annotations } = text;
//     //   const citations = [];

//     //   let index = 0;
//     //   for (let annotation of annotations) {
//     //     text.value = text.value.replace(annotation.text, "[" + index + "]");
//     //     const { file_citation } = annotation;
//     //     if (file_citation) {
//     //       const citedFile = await openai.files.retrieve(file_citation.file_id);
//     //       citations.push("[" + index + "]" + citedFile.filename);
//     //     }
//     //     index++;
//     //   }

//     //   // res.send(text.value); //  + "\n" + citations.join("\n")
//     // result.send(text.value);
//     // }
//   });
  

//   // res.send(response.choices[0].message.content);
//   console.log("RAG GPT request completed");
// });

