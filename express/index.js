const express = require("express");
const app = express();
const port = 5000;


app.listen(port, () => {
    console.log(`App is running on port no. ${port}`);

})

// app.use((req, res) => {
//     console.log("requst Received");
//     res.send("this is a basic responce")
// })


app.get("/", (req, res) => {
    res.send("I am default Page");
});


// app.get("/contact", (req, res) => {
//     res.send("Contact us")
// });


// app.get("/help", (req, res) => {
//     res.send("Help me")
// })

// app.get("*", (req, res) => {
//     res.send("<h1>Page Not Found </h1>")
// })

app.get("/:username/:id", (req, res) => {

    let { username, id } = req.params
    res.send(`Welcome to page of @ ${username}`)
    // console.log(req.params);

})