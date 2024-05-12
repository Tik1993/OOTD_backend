const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "../logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "../logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, `../logs/${logFileName}`),
      logItem
    );
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
};

const logger = async (req, res, next) => {
  if (req.method === "POST") {
    await logEvents(
      `${req.method}\t${req.url}\t${req.headers.origin}`,
      "reqLog.log"
    );
  }

  next();
};

module.exports = { logEvents, logger };
