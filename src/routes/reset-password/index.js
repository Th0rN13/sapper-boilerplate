import { resetPassword } from 'db/usersDb.js';

export function post(req, res) {
  console.log('Post request');
  const { hash } = req.body;
  resetPassword(hash);
  res.end(JSON.stringify({ ok: true }));
}
