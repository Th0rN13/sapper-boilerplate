import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import { json } from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
// import pg from 'pg';
// import connectPgSimple from 'connect-pg-simple';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const FileStore = sessionFileStore(session);
// const pgSession = connectPgSimple(session);
// const pgPool = new pg.Pool({});

polka()
  .use(json())
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
      store: new FileStore({
        path: `.sessions`,
      }),
      // store: new pgSession({
      //   pool: pgPool,
      //   tableName: 'uses_sessions',
      // }),
    })
  )
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req) => ({
        user: req.session && req.session.user
      })
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
