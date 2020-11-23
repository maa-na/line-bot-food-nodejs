import express from 'express'
import line from '@line/bot-sdk'
import dotenv from 'dotenv'
import { getGourmetSearch } from './apiCall.mjs'

dotenv.config()
const PORT = process.env.PORT || 3008;

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

express()
  .get('/', (req, res) => res.send('Hello LINE BOT!(GET)'))
  .get("/webhook", (req, res) => res.send('webhook ok(GET)'))
  .post('/webhook', line.middleware(config), (req, res) => handleEvent(req, res))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const client = new line.Client(config);

async function handleEvent(req, res) {
  res.status(200).end();
  const event = req.body.events[0];

  const textCheckRes = await textCheck(event)
  console.log('textCheckRes', textCheckRes)

  if (textCheckRes) return

  const apiRes = await getGourmetSearch()
  console.log('res', apiRes.results)

  const names = apiRes.results.shop.map(val => val.name)
  console.log('names', names)

  const promises1 = repalyNames(event, names)

  console.log('come on handler', promises1)

  Promise.all(promises1).then(console.log("pass1"));
}

async function textCheck(event) {
  let returnText = null
  console.log('event.message.text', event.message.text)
  switch (event.message.text) {
    case 'ジャンルから探す':
      returnText = 'ジャンルを入力してください。(例：お肉、お魚　など)'
      break
    case 'このあと行きたい':
      returnText = '入力された時間から１時間半以上滞在できるお店を紹介します。時間を入力してください。(今から、２１時、１５分後　など)'
      break
  }

  if (!returnText) return false 
  
  Promise.all(client.replyMessage(event.replyToken, {
    type: "text",
    text: returnText
  })).then(console.log("first pass ok"));

  return true
}

async function repalyNames(event, names) {
  const requests = names.map(name => ({
    type: "text",
    text: name
  }))
  return client.replyMessage(event.replyToken, requests)
}
