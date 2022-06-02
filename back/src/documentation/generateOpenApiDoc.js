// Require Package
const path = require("path");
const postmanToOpenApi = require("postman-to-openapi");

// Postman Collection Path
const postmanCollection = path.join(__dirname, "./collection.json");
// Output OpenAPI Path
const outputFile = path.join(__dirname, "./collection.yml");

const generateOpenApiDoc = async () => {
  try {
    const result = await postmanToOpenApi(postmanCollection, outputFile, {
      defaultTag: "General",
    });

    // console.log(`OpenAPI specs: ${result}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = generateOpenApiDoc;
