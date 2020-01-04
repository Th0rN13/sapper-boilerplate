import { loadProfile } from 'db/usersDb.js';

export function get(req, res) {
  const userFind = loadProfile(req.session.user);
  const result = {
    ok: userFind.id !== -1,
    ...(userFind.id !== -1) ? userFind : {},
  }
  res.end(JSON.stringify(result));
}
