import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { RESUME_DATA } from "@/config/resume-data";
import { BOOK_data } from "@/config/books-data";
import dotenv from "dotenv";

dotenv.config();

async function populatePinecone() {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  console.log(process.env.PINECONE_API_KEY);

  const index = pinecone.Index(process.env.PINECONE_INDEX!);
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({ modelName: "text-embedding-3-small" }),
    { pineconeIndex: index }
  );

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const resumeText = `
    Personal Information:
    Name: ${RESUME_DATA.name}
    Initials: ${RESUME_DATA.initials}
    Location: ${RESUME_DATA.location}
    Location Link: ${RESUME_DATA.locationLink}
    About: ${RESUME_DATA.about}
    Summary: ${RESUME_DATA.summary}
    Avatar URL: ${RESUME_DATA.avatarUrl}
    Website: ${RESUME_DATA.personalWebsiteUrl}

    Contact Information:
    Email: ${RESUME_DATA.contact.email}
    Phone: ${RESUME_DATA.contact.tel}

    Social Media:
    ${RESUME_DATA.contact.social
      .map(
        (social) => `
      Platform: ${social.name}
      URL: ${social.url}
    `
      )
      .join("\n")}

    Work Experience:
    ${RESUME_DATA.work
      .map(
        (job) => `
      Company: ${job.company}
      Company URL: ${job.link}
      Title: ${job.title}
      Period: ${job.start} - ${job.end}
      Description: ${job.description}
      Badges: ${job.badges.join(", ")}
    `
      )
      .join("\n")}

    Education:
    ${RESUME_DATA.education
      .map(
        (edu) => `
      School: ${edu.school}
      Degree: ${edu.degree}
      Period: ${edu.start} - ${edu.end}
      Badges: ${edu.badges.join(", ")}
    `
      )
      .join("\n")}

    Skills: ${RESUME_DATA.skills.join(", ")}

    Languages: ${RESUME_DATA.languages.join(", ")}

    Projects:
    ${RESUME_DATA.projects
      .map(
        (project) => `
      Title: ${project.title}
      Description: ${project.description}
      Tech Stack: ${project.techStack.join(", ")}
      Link: ${project.link.label} - ${project.link.href}
    `
      )
      .join("\n")}
  `;

  const resumeDocs = await textSplitter.createDocuments(
    [resumeText],
    [{ source: "resume", page_content: resumeText }]
  );

  // Prepare books data
  const booksText = JSON.stringify(BOOK_data);
  const booksDocs = await textSplitter.createDocuments(
    [booksText],
    [{ source: "books", page_content: booksText }]
  );

  // Add all documents to Pinecone
  await vectorStore.addDocuments([...resumeDocs, ...booksDocs]);

  console.log("Pinecone database populated successfully!");
}

populatePinecone().catch(console.error);
