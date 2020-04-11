import { tryLogin } from 'db/db';

export async function post(req, res) {
  const result = await tryLogin(req.body.login, req.body.password);
  if (result.ok) {
    const { id, login, name, avatar } = result.user;
    req.session.user = { id, login, name, avatar };
  }
  res.end(JSON.stringify(result));
}
