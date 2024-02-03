const http = require("http");
const app = require("./app.js");
require("dotenv").config();

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
