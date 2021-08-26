import express from 'express';
import routes from './routes';
import config from './config/environment';
import configureDynamo from './config/dynamodb';
import {registerMiddleware} from './middleware';

const app = express();
registerMiddleware(app);

app.listen(config.PORT, () => {
	try {
		configureDynamo();
		app.use(routes);
		console.log(`Server running on port: ${config.PORT}`);
	} catch (e) {
		console.error(e);
	}
});
