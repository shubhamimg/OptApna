const express = require("express");
const app = express();
const port = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/register", (req, res) => {
    let { user, password } = req.query;
    res.send(`Standard GET response Welcome ${user}`);
});


app.post("/register", (req, res) => {
    let { user, password } = (req.body);
    res.send(`Standard POST response ${user}`)
});



app.listen(port, () => {
    console.log(`listen to the port ${port}`);

});


// function personMaker(name, age) {
//     const person = {
//         name: name,
//         age: age,
//         talk() {
//             console.log(`Hello! My Name is ${name}`);
//         }
//     }
//     return person;
// }


// let p1 = personMaker("Shubham", 27);

// console.log(p1);
// p1.talk();


function Person(name, age) {
    this.name = name;
    this.age = age;
    console.log(this);
};

Person.prototype.talk = function () {
    console.log(`My Name is ${this.name}`);
}

let p1 = new Person("Shubham", 27);
p1.talk();



