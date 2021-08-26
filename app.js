import express from 'express';
import {registerMiddleware} from './middleware';
import routes from './routes';
import config from './config';

const app = express();
registerMiddleware(app);

app.listen(config.PORT, () => {
	app.use(routes);
	console.log(`Server running on port: ${config.PORT}`);
});
