import logs from './logs';
import parsers from './parsers';
import security from './security';

export const registerMiddleware = app => {
	logs(app);
	parsers(app);
	security(app);
};
