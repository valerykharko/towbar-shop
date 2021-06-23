require("dotenv").config();
const express = require("express");
const path = require("path");
const sequelize = require("./database/db");
const models = require("./database/models/models");
const PORT = process.env.PORT || 3000;
const PORT_WS = process.env.PORT_WS || 3002;
const server = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const ws = require("ws");
const TelegramAPI = require("node-telegram-bot-api");
const bodyParser = require("body-parser");

server.use(cors());
server.use(express.json());
server.use(
  express.static(path.resolve(__dirname, "database/static/documents"))
);
server.use(express.static(path.resolve(__dirname, "database/static/images")));
server.use(fileUpload({}));
server.use(bodyParser.urlencoded({ extends: false }));
server.use("/api", router);

// Обработка ошибок, последний Middleware
server.use(errorHandler);
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();

const wss = new ws.Server({ port: PORT_WS }, () =>
  console.log(`WebSocket Server has been started on port ${PORT_WS}...`)
);

wss.on("connection", function connection(ws) {
  ws.on("message", function (message) {
    message = JSON.parse(message);
    switch (message.event) {
      case "message":
        broadcastMessage(message);
        break;
      case "connection":
        broadcastMessage(message);
        break;
    }
  });
});

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}

const startTgBot = () => {
  const TGToken = "1732821605:AAEXsEbR2K1HenMNiqa_vgDjVx-HuBZ_VaY";

  const bot = new TelegramAPI(TGToken, { polling: true });

  const FarkopOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Акура", callback_data: "Акура" }],
        [{ text: "БМВ", callback_data: "Акура" }],
        [{ text: "Мерседес", callback_data: "Акура" }],
      ],
    }),
  };

  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "Получить информацию о пользователе" },
    { command: "/love", description: "Ты меня любишь?" },
    { command: "/farkop", description: "Подбор фаркопа" },
  ]);

  bot.on("message", async (message) => {
    const text = message.text;
    const chatId = message.chat.id;
    if (text === "/start") {
      await bot.sendMessage(chatId, `Привет! Это telegramBot "FarkopBuy"`);
      return bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/22c/b26/22cb267f-a2ab-41e4-8360-fe35ac048c3b/8.webp"
      );
    }
    if (text === "/info") {
      return bot.sendMessage(chatId, `Тебя зовут ${message.from.first_name}`);
    }
    if (text === "/love") {
      await bot.sendMessage(
        chatId,
        `${message.from.first_name}, я люблю тебя)))`
      );
      return bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/348/e30/348e3088-126b-4939-b317-e9036499c515/2.webp"
      );
    }
    if (text === "/farkop") {
      await bot.sendMessage(
        chatId,
        `${message.from.first_name}, выберите ваше авто`
      );
      return bot.sendMessage(chatId, "Тута", FarkopOptions);
    }
    return bot.sendMessage(
      chatId,
      `${message.from.first_name}, я тебя не понимаю, попробуй еще раз!`
    );
  });

  bot.on("callback_query", (message) => {
    const data = message.data;
    const chatId = message.chat.id;
    return bot.sendMessage(
      chatId,
      `${message.from.first_name}, Вы выбрали ${data}`
    );
  });
};

// startTgBot();
