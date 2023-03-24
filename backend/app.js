const express = require("express");

const app = express();

app.listen(3000,() => console.log("Server listening at port 3000"));

app.get("/", (req, res) => {
    res.send("Hello World");
})

const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");

async function main() {
  const endpoint = "https://ollie-testfrom.cognitiveservices.azure.com/";
  const apiKey = "717032a4a8ea4d928a7401618329be07";
  const modelId = "d03e2758-8b7a-4d62-a953-eec10b1bd7ec";
  const path = "../src/media/account6.pdf";

  const readStream = fs.createReadStream(path);

  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginAnalyzeDocument(modelId, readStream, {
    onProgress: ({ status }) => {
      console.log(`status: ${status}`);
    },
  });

  // There are more fields than just these three
  const { documents, pages, tables } = await poller.pollUntilDone();

  console.log("Documents:");
  for (const document of documents || []) {
    console.log(`Type: ${document.docType}`);
    console.log("Fields:");
    for (const [name, field] of Object.entries(document.fields)) {
      console.log(
        `Field ${name} has value '${field.value}' with a confidence score of ${field.confidence}`
      );
    }
  }
  console.log("Pages:");
  for (const page of pages || []) {
    console.log(`Page number: ${page.pageNumber} (${page.width}x${page.height} ${page.unit})`);
  }

  console.log("Tables:");
  for (const table of tables || []) {
    console.log(`- Table (${table.columnCount}x${table.rowCount})`);
    for (const cell of table.cells) {
      console.log(`  - cell (${cell.rowIndex},${cell.columnIndex}) "${cell.content}"`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});