/*INSERT GROUP ID AND COOKIE BELOW*/
 
var groupId = 0 // Groupid
var cookie = "" // Roblox cookie
var key = "" // Key for all requests
/*INSERT GROUP ID AND COOKIE ABOVE*/

/*For sending a webhook alerts*/
var webhooks = false // main swich for webhooks, if you do not have webhook information turn this off to prevent errors
var intruder = false // Warns when the app key is false
var webhookevent = false // Warns when an event is triggered
var webhookid = "" // Webhook key for warning and on events
var webhooktoken = "" // Webhook token for warning and on events
 
/*DO NOT FIDDLE UNDER THIS LINE*/
 
 
const express = require("express");
const rbx = require("noblox.js");
const app = express();
app.use(express.static("public"));
const Discord = require('discord.js');
const Webhook = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN)
async function startApp() {
  await rbx.cookieLogin(cookie);
  let currentUser = await rbx.getCurrentUser();
  console.log(currentUser.UserName);
}
async function intruderevent() {
  if(intruder == true) {
    Webhook.send("Someone tried to use your app key")
  }
}
async function logevent(event) {
  if(webhooks == true) {
    if(webhookevent == true)
    Webhook.send("An event was logged with event information:" + event)
  }
}
startApp();
 
app.get("/rank", (req, res) => {
    var User = req.param("userid");
    var Rank = req.param("rank");
  var ReturnKey = req.param("key");
 if(ReturnKey == key) {
    rbx.setRank(groupId, parseInt(User), parseInt(Rank));
    res.json("Ranked!");
   logevent("Rank Changed")
 }
  else {
    res.json("Wrong App Key")
    if(webhooks == true) {
      intruderevent()
    }}});
app.get("/accept", (req, res) => {
    var User = req.param("username");
    var Verdict = req.param("accptordeny");
  var ReturnKey = req.param("key");
 if(ReturnKey == key) {
    rbx.handleJoinRequest(groupId, User, Verdict);
    res.json("Accepted into to group!");
   logevent("Someone was accepted into the group.")
 }
  else {
    res.json("Wrong App Key")
    if(webhooks == true) {
      intruderevent()
    }}});
app.get("/shout", (req, res) => {
    var msg = req.param("msg");
  var ReturnKey = req.param("key");
 if(ReturnKey == key) {
    rbx.shout(groupId, msg);
    res.json("Shouted!");
   logevent("A message was shouted")
 }
  else {
    res.json("Wrong App Key")
    if(webhooks == true) {
      intruderevent()
    }}});
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
  console.log("With app key " + key)
});
// Origonal verstion created by RoScripter and more advanced system made by ItzJakeBoizz/RobloxApi
