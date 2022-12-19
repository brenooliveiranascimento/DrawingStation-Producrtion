import nodemailer from 'nodemailer';
import CustomError from './StatusError';

export default class SendEmail {
  async execute(email: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.SEND_EMAIL_PASSWORD
      }
    })

    try {
      await transporter.sendMail({
        from: 'DrawingStation account verification <accountvalidation@drawingstation.com.br>',
        to: email,
        subject: 'Email de verificação da conta',
        html: '<h1>Olá desenhista!!<h1><p>Isso pe um teste!!!<p>'
      })
      return 'Enviado com sucesso!!!'
    } catch(e) {
      throw new CustomError('Erro eo enviar o email', 500);
    }
  }
}
