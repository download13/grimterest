import path from 'path';
import express from 'express';
import authRoutes from './auth-twitter';
import {dbConnect} from './db';
import apiRoutes from './api';


const DEV = process.env.NODE_ENV !== 'production';
const PUBLIC_PATH = path.resolve(process.cwd(), 'dist/client');

const app = express()
	.use(express.static(PUBLIC_PATH))
	.set('x-powered-by', false);

app.get('/', serveApp);
app.get('/user', serveApp);
app.get('/user/:id', serveApp);
app.get('/pin/:id', serveApp);
app.get('/login', serveApp);
app.get('/create', serveApp);

authRoutes(app);

apiRoutes(app);

dbConnect().then(() => {
	app.listen(process.env.PORT || 80, process.env.IP || '127.0.0.1', () => {
		console.log('Listening' + (DEV ? ' dev' : ''));
	});
});

function serveApp(req, res) {
	res.sendFile('index.html', {root: PUBLIC_PATH});
}
