import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import { json } from 'body-parser';
import session from 'express-session';
import sessionSequelize from 'express-session-sequelize';
import * as sapper from '@sapper/server';
import { sequelize } from 'db/db.js';
import http from 'http';
import io from 'socket.io';
const sessionSequelizeStore = sessionSequelize(session.Store);
const server = http.createServer();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const sessionStore = new sessionSequelizeStore({
  db: sequelize,
});

polka({ server })
  .use(json())
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
      store: sessionStore,
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

let numUsers = 0;

io(server).on('connection', function(socket) {
  ++numUsers;
  let message = 'Server: A new user has joined the chat';
  socket.emit('user joined', { message, numUsers });
  socket.broadcast.emit('user joined', { message, numUsers });

  socket.on('message', function(msg) {
    socket.broadcast.emit('message', msg);
  })

  socket.on('disconnect', function() {
    --numUsers;
    socket.broadcast.emit('user left', numUsers);
  })

  socket.on('user disconnect', function(name) {
    socket.broadcast.emit('message', `Server: ${name} has left the chat.`)
  })
});
