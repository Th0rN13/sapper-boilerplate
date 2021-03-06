import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import { json } from 'body-parser';
import session from 'express-session';
import sessionSequelize from 'express-session-sequelize';
import * as sapper from '@sapper/server';
import { sequelize } from 'helpers/db';
import http from 'http';
import io from 'socket.io';
import { startChatServer, startNotifyServer } from 'socket';

const server = http.createServer();
const sessionSequelizeStore = sessionSequelize(session.Store);

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
				user: req.session && req.session.user,
			}),
		})
	)
	.listen(PORT, (err) => {
		if (err) console.log('error', err);
	});

const ioServer = io(server);
startChatServer(ioServer);
startNotifyServer(ioServer);
