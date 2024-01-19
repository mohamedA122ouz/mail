import express from "express";
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;
app.listen((port || 4242), "0.0.0.0");
console.log(port);
import mail from "./index.js";
/*
body should be like 
only phone is optional
{
    to:"reseiverAddress@example.com",
    subject:"Hello World!",
    body:
    {   
        username:"Service requester Name",
        email:"ServiceRequesterMail@example.com",
        phone:"01659678687"(optional),
        message:"<h1>this is a test</h1>"
    }
}
*/
app.post("/mail", (req, res) => {
    try {
        
        let data = req.body;
        let i = mail(data.to, data.subject, data.body);
        if (i) {
            res.json({ msg: "mail sent" });
        }
        else
            throw "mail not sent";
    }
    catch (e) {
        console.log(e);
        res.json({ msg: e });
    }
});