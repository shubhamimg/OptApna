const express = require("express");
var methodOverride = require('method-override');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
uuidv4();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

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
    console.log(post);
    res.send("Patch Request Working");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", { post })
})


app.listen(port, () => {
    console.log(`Listining to the port number ${port}`);
})