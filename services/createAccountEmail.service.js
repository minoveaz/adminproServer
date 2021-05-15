var nodemailer = require('nodemailer');


const sendEmail = async (req, res ) => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions ={
        from: "Remitente",
        to:"ing.miller.vega@gmail.com",
        subject: "Mensaje Prueba Email NodeJS",
        text: "Este es un mensaje de Prueba"
    }

    const info = await transporter.sendMail(mailOptions, (error, info) => {
        console.log('Info..', info);
        if(error){
            console.log(error);
        }else{
            console.log('message sent', info.messageId);
            console.log(req.body)
        }
    });

}

module.exports = {
    sendEmail
}



