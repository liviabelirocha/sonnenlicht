require("dotenv").config();

const app = require("./app");
const port = require("./constants/port");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
