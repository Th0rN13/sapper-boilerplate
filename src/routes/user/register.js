import { registerUser } from 'db/db.js';

export async function post(req, res) {
  const result = await registerUser(req.body);
  if (result.ok) req.session.user = result.user;
  res.end(JSON.stringify(result));
}
