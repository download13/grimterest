import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './auth-twitter';
import apiRoutes from './api';


const DEV = process.env.NODE_ENV !== 'production';
const PUBLIC_PATH = path.resolve(process.cwd(), 'dist/client');

const app = express()
	.use(express.static(PUBLIC_PATH))
	.use(bodyParser.json())
	.set('x-powered-by', false);

app.get('/', serveApp);
app.get('/login', serveApp);
app.get('/user', serveApp);
app.get('/user/:id', serveApp);
app.get('/create', serveApp);
app.get('/grim/:id', serveApp);

authRoutes(app);
apiRoutes(app);

app.listen(80, () =>
	console.log('Listening' + (DEV ? ' dev' : ''))
);

function serveApp(req, res) {
	res.sendFile('index.html', {root: PUBLIC_PATH});
}
