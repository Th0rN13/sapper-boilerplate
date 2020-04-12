import { createResetHash } from 'db/db.js';
import { sendMail } from 'helpers/email';

export async function post(req, res) {
  const { login } = req.body;
  const result = await createResetHash(login);
  if (result.ok) {
    const {email, hash} = result;
    const link = `http://localhost:3000/reset-password/${hash}`;
    sendMail(email, link);
  }
  res.end(JSON.stringify({ ok: true }));
}
