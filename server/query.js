const client = require("./utils/openSearchClient");

async function searchRecipes() {
  try {
    const response = await client.search({
      index: "epirecipes",
      body: {
        query: {
          match_all: {},
        },
      },
    });

    console.log("Search results:", response.body.hits.hits);
  } catch (error) {
    console.error("Error searching recipes:", error);
  }
}

searchRecipes();
