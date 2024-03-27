const qrcode = require("qrcode-terminal");
const qrw = require("qrcode");
const express = require("express");
const app = express();
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("qr", (qr) => {
  stJson = qr;
  qrw.toFile("qr.png", stJson, function (err) {
    if (err) return console.log("error");
  });
  qrcode.generate(qr, { small: true });
});

// Listening to all incoming messages
client.on("message", async (message) => {
  // console.log(message);
  let content = message.body;

  if (content === "Hy") {
    client.sendMessage(
      message.from,
      "Thanks! For contacting us... \
       \nHow may I help you:\
       \n1: Slot book\
       \n2. Know about the product\
       \n our team will connect you soon :) Follow us on facebook for further updates: https://www.facebook.com/officialbhawanishankar"
    );
    // client.on("message", async (message) => {
    //   content = message.body;
    //   switch (content) {
    //     case "1":
    //       client.sendMessage(
    //         message.from,
    //         "Your slot timing is 1pm on 12-apr-2024\nThank you for give us valuable time :)"
    //       );
    //       break;
    //     case "2":
    //       client.sendMessage(
    //         message.from,
    //         "Our products are:\n1. Aanda\n2. Jeevan Shurksha\n3. Cancer Worrier\nThank you for give us valuable time :)"
    //       );
    //       break;

    //     default:
    //       client.sendMessage(
    //         message.from,
    //         "please enter a valid input\n thank you"
    //       );

    //       break;
    //   }
    // });
  } else if (content === "M") {
    const media = MessageMedia.fromFilePath("./ad.jpg");
    await client.sendMessage(message.from, media);
  }
});

client.initialize();

app.get("/", (req, res) => {
  res.send("Express on Versel");
});

const port = 8000;

app.listen(port, () => {
  console.log(`App running on Port  ${port}`);
});
