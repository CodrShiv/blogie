const express = require("express"),
  axios = require("axios"),
  app = express(),
  path = require("path"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
require("dotenv").config();

const PORT = process.env.PORT || 5000,
  CLIENT_URL =
    process.env.PRODUCTION === "true"
      ? "https://blogie.ml"
      : "http://localhost:3000",
  SERVER_URL =
    process.env.PRODUCTION === "true"
      ? "https://blogie.ml"
      : "http://localhost:5000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: CLIENT_URL,
    optionsSuccessStatus: 200,
  })
);
app.post("/create", (req, res) => {
  var data = JSON.stringify({
    "message": "Create File",
    "content": req.body.content
  });
  var url = `https://api.github.com/repos/${JSON.parse(req.body.data).username}/${JSON.parse(req.body.data).reponame}/contents/${uuid.v4()}.html`;
  var config = {
    method: 'put',
    url: url,
    headers: { 
      'Content-Type': 'application/json', 
      'Accept': 'application/vnd.github+json', 
      'Authorization': `Bearer ${req.body.auth}`, 
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    res.sendStatus(200)
  })
  .catch(function (error) {
    console.log(error);
  });
  
});
app.get("/auth", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID
    }&redirect_uri=${`${SERVER_URL}/success`}&scope=repo,read:user,user:email&state=${process.env.STATE}&allow_signup=true`
  );
});
app.get("/success", (req, res) => {
  if (req.query.state === process.env.STATE) {
    axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        "client_id": process.env.CLIENT_ID,
        "client_secret": process.env.CLIENT_SECRET,
        "code": req.query.code
      })
    })
      .then(function (response) {
        res.redirect(`${CLIENT_URL}?access_token=${response.data.access_token}`)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});
app.listen(PORT, () => {
  console.log(`Blogie is listening on PORT ${PORT} 🚀`);
});
