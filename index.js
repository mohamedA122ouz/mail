import mail from "nodemailer";
import fs from "fs";
import path from "path";
import crypto from 'crypto';
const key = process.env.KEY;
function decrypt(text,key) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
function changing(text){
    text =JSON.parse(Buffer.alloc(text.length/2,text,"hex").toString("utf8"));
    return decrypt(text,Buffer.from(key,"hex"));
}
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
                user: "azouznodemailer@gmail.com",
                pass: changing("7b0a20202020226976223a20226632663539386636303538393439363333643064313630383039313734306538222c0a2020202022656e6372797074656444617461223a202230306631393966643736323263613263343730646162333436303135356431666431356136306338386565636634373336626562313231326436313266666231220a7d"),
            },
        });
        const info = await transporter.sendMail({
            from: `${body.username}<azouznodemailer@gmail.com>`,
            to: `${to}`,
            subject: subject,
            html: html,
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