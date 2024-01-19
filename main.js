import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));
const port = process.env.PORT || 4000;
app.listen((port || 4242), "0.0.0.0");
console.log(port);
import mail from "./index.js";
// let count = {};
// try {
//     count = fs.readFileSync("./counter.json");
//     count = JSON.parse(count);
// }
// catch {
//     fs.writeFileSync("./counter.json", "{}");
//     count = fs.readFileSync("./counter.json");
//     count = JSON.parse(count);
// }
// function setCount(user) {
//     if (user) {
//         if (count[user] === undefined) {
//             count[user] = 0;
//         }
//         count[user]++;
//         fs.writeFileSync("./counter.json", JSON.stringify(count));
//     }
//     else {
//         throw "undefined username";
//     }
// }


app.post("/mail", async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        // setCount(data.to);
        let i = await mail(data.to, data.subject, data.body);
        if (i) {
            res.status(200);
            res.json({ msg: "mail sent" });
        }
        else if (!i) {
            res.status(500);
            res.json({ msg: "mail not sent" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json({ msg: "mail not sent" });
    }
});
app.get("/counter", (req, res) => {
    let u = req.query.username;
    console.log(u);
    try {
        setCount(u);
        res.status(200);
        res.json({ msg: count[u]});
        return;
    }
    catch (e) {
        res.status(404);
        res.json({ msg: "user not exist" });
        console.log(e);
        console.log(req.query);
    }
});