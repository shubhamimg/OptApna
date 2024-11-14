const express = require("express");
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Shubham Agarwal",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "Apna Collge",
        content: "Hard Work Is IMporatnt"
    },
    {
        id: uuidv4(),
        username: "Aachuki Agarwal",
        content: "I love Shubham"
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content })
    res.redirect("/posts")
});


app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);

    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.status(404).render("error.ejs");
    }
});


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newContent;
    res.render("thankyou.ejs");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", { post })
});


app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.send("Delete Success")
})


app.listen(port, () => {
    console.log(`Listining to the port number ${port}`);
})