import * as nodemailer from 'nodemailer'
import * as postmarkTransport from 'nodemailer-postmark-transport'
import * as ejs from 'ejs'
import * as inlineCSS from 'inline-css'

async function configureForDev() {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  })
}

async function configureForProd() {
  return nodemailer.createTransport(postmarkTransport({
    auth: {
      apiKey: process.env.POSTMARK_API_KEY
    }
  }));
}

async function configure() {
  return process.env.NODE_ENV == 'production' ? await configureForProd() : await configureForDev()
}

async function renderEmail(file, data) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(file, data, { root: `${__dirname}/../emails/` }, (err, str) => {
      if (err) {
        return reject(err)
      }
      resolve(str)
    })
  })
}

async function sendInvitation(email: string, token: string) {
  const transporter = await configure()

  const host = process.env.HOSTNAME || "http://localhost:3000"
  let html = await renderEmail(`server/emails/invitation.ejs`, { token, host })
  html = await inlineCSS(html, { url: " " })

  let info = await transporter.sendMail({
    from: "Make it Real <info@makeitreal.camp>",
    to: email,
    subject: "Tu acceso al curso de Fundamentos en Desarrollo Web",
    html
  })

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

async function sendForgotPassword(email: string, token: string) {
  const transporter = await configure()

  const host = process.env.HOSTNAME || "http://localhost:3000"
  let html = await renderEmail(`server/emails/forgotPassword.ejs`, { token, host })
  html = await inlineCSS(html, { url: " " })

  let info = await transporter.sendMail({
    from: "Make it Real <info@makeitreal.camp>",
    to: email,
    subject: "[Fundamentos Desarrollo Web] Reestablecer contraseña",
    html
  })

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

function send(to: string, from: string, subject: string, body:string): void {
  console.log("To: ", to)
  console.log("From: ", from)
  console.log("Subject: ", subject)
  console.log("Body: ", body)
}

export default {
  sendInvitation,
  sendForgotPassword
}
