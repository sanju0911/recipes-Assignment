const fs = require("fs");
const path = require("path");
const client = require("./utils/Opensearc");

const datasetPath = path.join(__dirname, "full_format_recipes.json");
const BATCH_SIZE = 100;

async function indexRecipes() {
  try {
    console.log("Reading dataset...");
    const data = fs.readFileSync(datasetPath, "utf-8");
    const recipes = JSON.parse(data);

    let bulkOperations = [];

    console.log(`Preparing to index ${recipes.length} recipes...`);

    for (let i = 0; i < recipes.length; i++) {
      bulkOperations.push({ index: { _index: "epirecipes" } });
      bulkOperations.push(recipes[i]);

      if ((i + 1) % BATCH_SIZE === 0 || recipes.length - 1) {
        const { body: bulkResponse } = await client.bulk({
          body: bulkOperations,
        });
        if (bulkResponse.errors) {
          console.error(
            "Errors occurred during bulk indexing:",
            bulkResponse.errors
          );
        } else {
          console.log(
            `Indexed ${bulkOperations.length / 2} recipes successfully!`
          );
        }
        bulkOperations = [];
      }
    }

    console.log("Indexing completed!");
  } catch (error) {
    console.error("Error indexing recipes:", error);
  }
}

indexRecipes();
