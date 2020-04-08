import { registerUser, loadProfile } from 'db/db.js';

export function post(req, res) {
  const result = registerUser(req.body);
  if (result.ok) req.session.user = result.user;
  res.end(JSON.stringify(result));
}
