import { changePassword } from 'helpers/db.js';

export async function post(req, res) {
  const { hash, newPassword } = req.body;
  const result = await changePassword(hash, newPassword);
  res.end(JSON.stringify(result));
}
