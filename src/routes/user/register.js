import { registerUser } from 'db/db';
import { sendMail } from 'db/email';

export async function post(req, res) {
  const result = await registerUser(req.body);
  if (result.ok) {
    req.session.user = result.user;
    sendMail(result.user.email, result.user.password);
  }
  res.end(JSON.stringify(result));
}
