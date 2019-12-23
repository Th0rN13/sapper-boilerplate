import { registerUser } from './_users.js';

export function post(req, res) {
  const result = registerUser(req.body);
  if (result.ok) req.session.user = result.user;
  res.end(JSON.stringify(result));
}
