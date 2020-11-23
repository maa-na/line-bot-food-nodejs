'use strict';

import express from 'express'
import line from '@line/bot-sdk'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 3008;

const config = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')) //ブラウザ確認用(無くても問題ない)
app.get("/webhook", (req, res) => res.send('webhook ok(GET)')) // 追加
app.post("/webhook", (req, res) => res.json({ test: "hook" })) // 追加
app.post('/webhook', line.middleware(config), (req, res) => handleEvent(req, res))

const client = new line.Client(config);

async function handleEvent(req, res) {
  console.log('hoge')
  const events = req.body.events;
  const promises = events.map(event => replay(event))

  Promise.all(promises).then(console.log("pass"));
}

async function replay(event) {
  const profile =  await client.getProfile(event.source.userId);

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: `${profile.displayName}さん、今「${event.message.text}」って言いました？`
  })
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
