require("dotenv").config("../../.env")
const router = require("express").Router();
const control=require("./mess-controller")

router.get("/",(req,res)=>{
  res.send("bot is active")
})
router.get("/webhook", (req, res) => {
  let VERIFY_TOKEN = process.env.PAGE_ACCESS_TOKEN;
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

router.post("/webhook", (req, res) => {
  let body = req.body;
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);
      if (webhook_event.message) {
        control.handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        control.handlePostback(sender_psid, webhook_event.postback);
      }
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

module.exports=router