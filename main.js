import express from "express";
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;
app.listen((port || 4242), "0.0.0.0");
console.log(port);
import mail from "./index.js";
app.post("/mail", async (req, res) => {
    try {

        let data = req.body;
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