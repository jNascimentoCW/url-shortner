const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const querystring = require("querystring");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Using static files
app.use(express.static(`${__dirname}/public`));

//Server
const mainPage = fs.readFileSync(`${__dirname}/public/index.html`, "utf-8");

app.get("/", (req, res) => {
  res.render(mainPage);
});

app.post("/", async (req, res) => {
  //Changing the URL for a short version
  const $ = cheerio.load(mainPage);

  if (req.body.url === "") {
    $(".shorten-card form").addClass("wrong");
    console.log("error");
  } else {
    const { data } = await axios({
      url: "https://cleanuri.com/api/v1/shorten",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      data: querystring.stringify({
        url: req.body.url,
      }),
    });

    // const copyURL = await navigator.clipboard.read(data.result_url);
    $(".shorten-site-card ").addClass("show-card");
    $("p.url").text(req.body.url);
    $("a.shortUrl").text(data.result_url).attr("href", data.result_url);
    $("button.copyURL").attr("href", data.result_url);
  }

  res.end($.html());
});

// Listenig to the server
app.listen(port, () => {
  console.log(`Server listeing on port ${port}`);
});
