import { createResetHash } from 'db/db.js';

export function post(req, res) {
  console.log('Post request');
  const { login } = req.body;
  createResetHash(login);
  res.end(JSON.stringify({ ok: true }));
}
