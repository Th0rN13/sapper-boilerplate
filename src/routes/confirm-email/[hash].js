import { confirmEmail } from 'db/db.js';

export function get(req, res) {
  const { hash } = req.params;
  const result = confirmEmail(hash);
  res.end(JSON.stringify(result));
}
