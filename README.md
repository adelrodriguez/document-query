# Document Query

A usage of LangChain to ask questions about a document. I'm testing this out with the Tax Code of the Dominican Republic (see `src/data/doc.pdf`), which I converted into text using `pdftotext` (see `src/data/doc.txt`).

Next steps:

1. Enable conversational queries so the model has context about the previous question.
2. Create a simple UI to run this online (using Next.js and hosting in Vercel).
