const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const connectDb = require("./config/connectDb");

const configPath = path.join(__dirname, "config", ".env");

dotenv.config({ path: configPath });

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server running. Use our API on port: ${process.env.PORT}`);
});
