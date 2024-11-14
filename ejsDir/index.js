const express = require("express");
const app = express();
const path = require("path");
// app.use(express.static("public"))

app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));

const port = 5000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/rolldice", (req, res) => {
    let diceVal = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice", { num: diceVal })
})


app.get("/profile", (req, res) => {
    let name = "Shubham Agarwal";
    res.render("profile", { name })
})

app.get("/instagram/:username", (req, res) => {
    let { username } = req.params
    const instaData = require("./data.json")
    const data = instaData[username];
    if (data) {
        res.render("instagram", { data: instaData[username] });
    } else {
        res.render("error")
    }

})

app.listen(port, () => {
    console.log(`app is running on the Port ${port}`);

})