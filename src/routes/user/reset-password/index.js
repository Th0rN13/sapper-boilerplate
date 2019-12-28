import { resetPassword } from './../_users.js';

export function post(req, res) {
  const { hash } = req.body;
  resetPassword(hash);
  res.end(JSON.stringify({ ok: true }));
}
