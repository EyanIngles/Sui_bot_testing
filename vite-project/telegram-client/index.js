// Use import instead of require
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";
import { getBalance } from "../src/sui-client-calls/balance-call.js"

dotenv.config();  // Initialize environment variables

const { TOKEN, URL_SERVER } = process.env;

const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = `${URL_SERVER}/webhook/${TOKEN}`;

const app = express();
app.use(bodyParser.json());

// Telegram webhook setup
const init = async () => {
  try {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log("Webhook set:", res.data);
  } catch (error) {
    console.error("Error setting webhook:", error.response.data);
  }
};

// Handle incoming Telegram messages
app.post(URI, async (req, res) => {
  const message = req.body.message;
  const chatId = message.chat.id;
  const text = message.text;

  let address;

  console.log("Received message:", text);
  
    if (text.includes("/balance")) {
      try{address = text.slice(9, 76)
        // address check...
        await sendMessage(chatId, `Searching Up Address \nGetting Address balance now...`);
  
        // calling get balance to check balance of wallet input.
        const balance = await getBalance(address); // this is a sui client call that is being called from balance-call.
        await sendMessage(chatId, `Current Address Balance Is: ${balance} SUI`);
        res.sendStatus(200);
        return
      } catch {
          await sendMessage(chatId, "Invalid Address, Please refer to our example:");
          await sendMessage(chatId, "/balance 0x0ExAmPleAddreSS0123456789abcdef0123456789abcdef0123 \n\nor type /help for more information");
          res.sendStatus(200);
          return
        }
    } 
    if(text.includes("/commands")) {
      await sendMessage(chatId, "/balance \nUsage: /balance 0xYourSuiAddress \n\nMore coming soon...");
      res.sendStatus(200);
      return
    }
    if(text.includes("/help")) {
      await sendMessage(chatId, "/commands: View all available commands and their usage. \nUsage: /commands");
      await sendMessage(chatId, "/balance: Check the balance of any Sui address on the mainnet. \nUsage: /balance 0xYourSuiAddress");
      res.sendStatus(200);
      return
    }
    if (text.includes("/start")) {
      await sendMessage(chatId, "👋 Welcome to SuiBot!");
      await sendMessage(chatId, "To get started, use /help to see some options and what they do.");
          res.sendStatus(200);
          return
    }
    if (text.includes("Thank") || text.includes("thank")) {
      await sendMessage(chatId, "Your Welcome :)");
          res.sendStatus(200);
          return
    } else {
      await sendMessage(chatId, "Invalid command. Use /commands to see options.");
          res.sendStatus(200);
          return
    }

  
});

// Helper function to send messages
const sendMessage = async (chatId, text) => {
  try {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: text,
    });
  } catch (error) {
    console.error("Error sending message:", error.response.data);
  }
};


app.listen(process.env.PORT || 8000, async () => {
  console.log("App listening on port", process.env.PORT || 8000);
  await init();
});
