import { findLogin } from './_users.js';

export function post(req, res) {
  const result = findLogin(req.body.login, req.body.password);
  if (result.ok) req.session.user = result.user;
  res.end(JSON.stringify(result));
}
