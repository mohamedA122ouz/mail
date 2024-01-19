import mail from "nodemailer";
import fs from "fs";
import path from "path";
async function main(to, subject, body) {
    try {
        let html = fs.readFileSync(path.resolve("./mail.html"), "utf8");
        html = html.replace("$$N", body.username);
        html = html.replaceAll("$$E", body.email);
        html = html.replaceAll("$$P", body.phone || "not provided");
        html = html.replace("$$M", body.message);
        const transporter = mail.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "azouznodemailer@gmail.com",
                pass: "dqal hcaa lzyq vxjj",
            },
        });
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: `${body.username}<azouznodemailer@gmail.com>`, // sender address
            to: `${to}`, // list of receivers
            subject: subject, // Subject line
            html: html, // html body
        });
        console.log("Message sent: %s", info.messageId);
        if(info.accepted){
            return true;
        }
        else{
            throw "mail Not sent";
        }
    }catch(e){
        console.log(e)
        return false;
    }
}

export default main;