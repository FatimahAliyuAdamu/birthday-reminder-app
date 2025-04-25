import cron from 'node-cron';
import User from '../models/userModel.js';
import { transporter } from '../config/mailer.js';

export const startBirthdayJob = () => {
  cron.schedule('0 7 * * *', async () => {
    const today = new Date();
    const users = await User.find();

    const celebrants = users.filter(u => {
      const dob = new Date(u.dob);
      return dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth();
    });

    for (const user of celebrants) {
      await transporter.sendMail({
        from: `"Birthday Bot" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: 'Happy Birthday! 🎉',
        html: `<h1>Happy Birthday, ${user.username}!</h1><p>Wishing you a joyful day!</p>`,
      });
    }
  });
};
