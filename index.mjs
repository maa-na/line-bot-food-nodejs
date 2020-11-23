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

  const events = req.body.events;

  const apiRes = await getGourmetSearch()
  console.log('res', apiRes.results)

  const names = apiRes.results.shop.map(val => val.name)
  console.log('names', names)

  const promises1 = events.map(event => repalyNames(event, names))

  console.log('come on handler', promises1)
  // const events = req.body.events;
  // const promises2 = events.map(event => replay(event))

  Promise.all(promises1).then(console.log("pass1"));
  // Promise.all(promises2).then(console.log("pass2"));
}

  async function repalyNames(event, names) {
    // return client.replyMessage(event.replyToken, {
    //   type: "text",
    //   text: names
    // })
    const requests = names.map(name => ({
      type: "text",
      text: name
    }))
    return client.replyMessage(event.replyToken, requests)
    // await Promise.all(names.map(async(name) => await client.replyMessage(event.replyToken, {
    //   type: "text",
    //   text: name
    // }))).then(console.log('succsess!'))
}

async function replay(event) {
  const profile =  await client.getProfile(event.source.userId);

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: `${profile.displayName}さん、今「${event.message.text}」って言いました？`
  })
}
