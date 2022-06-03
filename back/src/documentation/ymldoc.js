const path = require("path");
const YAML = require("yamljs");

const generateOpenApiDoc = require("./generateOpenApiDoc");

// (async () => {
//   await generateOpenApiDoc();
// })();

const ymlfile = YAML.load(path.join(__dirname, "./collection.yml"));

module.exports = ymlfile;
