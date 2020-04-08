import { tryLogin, loadProfile } from 'db/db';

export function post(req, res) {
  const result = tryLogin(req.body.login, req.body.password);
  if (result.ok && result.user_id !== -1) {
    const user = loadProfile(result.user_id);
    req.session.user = user;
    result.user = user;
  }
  res.end(JSON.stringify(result));
}
