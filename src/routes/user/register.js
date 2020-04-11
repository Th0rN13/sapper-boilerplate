import { registerUser } from 'db/db';
import { sendMail } from 'db/email';

export async function post(req, res) {
  const result = await registerUser(req.body);
  if (result.ok) {
    const {id, login, name, email, emailHash} = result.user;
    req.session.user = {id, login, name, avatar: ''};
    const link = `http://localhost:3000/confirm-email/${emailHash}`;
    sendMail(email, link);
  }
  res.end(JSON.stringify(result));
}
