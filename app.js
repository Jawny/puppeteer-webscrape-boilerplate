require("dotenv").config();
const cron = require("node-cron");
const express = require("express");
const puppeteerWorkflow = require("./puppeteerWorkflow");

const PORT = process.env.PORT || 8080;

const server = () => {
  const app = express();
  console.log(`server started on port ${PORT}`);
  app.listen(PORT);

  cron.schedule(
    "0 0 * * *",
    async () => {
      await puppeteerWorkflow();
    },
    {
      timezone: "America/Los_Angeles",
    }
  );
};

server();
