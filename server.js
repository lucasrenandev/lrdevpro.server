require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/contact-form", async (req, res) => {
    const { name, email, tel, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: "Nova mensagem de " + name,
        text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${tel}\nMensagem: ${message}`
    }

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({sucess: true, message: "Sucesso ao enviar e-mail!"});
    }
    catch(error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).json({sucess: false, message: "Erro ao enviar e-mail"});
    }
});

app.get("/", (req, res) => {
    res.send("Servidor node.js rodando com sucesso!");
});

app.listen(port, () => console.log(`Server running on port ${port}`));