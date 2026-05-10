import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Champs obligatoires manquants',
      });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.RECEIVER_EMAIL) {
      return res.status(500).json({
        success: false,
        error: 'Variables d’environnement manquantes',
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Zendayadeco" <${process.env.GMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `Nouveau message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #2C3E35; max-width: 600px;">
          <h2>Nouveau message de ${name}</h2>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <hr style="border-color: #C4956A; margin: 20px 0;" />
          <p>${String(message).replace(/\n/g, '<br />')}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur contact API:', error);

    return res.status(500).json({
      success: false,
      error: 'Erreur lors de l’envoi du message',
    });
  }
}