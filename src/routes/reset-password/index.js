import { changePassword } from 'db/db.js';

export function post(req, res) {
  console.log('Post request');
  const { hash, newPassword } = req.body;
  changePassword(hash, newPassword);
  res.end(JSON.stringify({ ok: true }));
}
