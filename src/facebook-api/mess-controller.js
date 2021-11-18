const request = require("request")
const STT = require("../mp4-to-text/download")
const cmt = require("../comment-split/cmt")
const control = require("../iot-control/control")

var io
function socketInit(ioIn) {
  io=ioIn
}

function handleMessage(sender_psid, received_message) {
  let response;
  if (received_message.text) {
    response = {
      "text": `You sent the message: "${received_message.text}"`
    }
    callSendAPI(sender_psid, response);
  } else if (received_message.attachments) {
    let attachment_url = received_message.attachments[0].payload.url;
    STT.get(attachment_url,text =>{
      console.log(text)
      response = {
        "text": `You sent the message: "${text}"`
      }
    })
    callSendAPI(sender_psid, response);
  }
}

function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

module.exports={
    handleMessage,
    handlePostback,
    socketInit
}

// control.send( null,cmt.textToCmt("lam lanh nhanh"),null)