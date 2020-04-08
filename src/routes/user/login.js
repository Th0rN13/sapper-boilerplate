import { tryLogin } from 'db/db';

export async function post(req, res) {
  const result = await tryLogin(req.body.login, req.body.password);
  if (result.ok) {
    req.session.user = result.user;
  }
  res.end(JSON.stringify(result));
}
