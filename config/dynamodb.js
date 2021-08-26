import config from './environment';
import dynamo from 'dynamodb';
import {registerModel as registerCustomerModel} from '../models/Customer';
import {registerModel as registerProductModel} from '../models/Product';
import {registerModel as registerOrderModel} from '../models/Order';

const registerModels = () => {
	registerCustomerModel(dynamo);
	registerOrderModel(dynamo);
	registerProductModel(dynamo);
};

export default async () => {
	try {
		dynamo.AWS.config.update({accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, region: config.region});
		registerModels();
		await dynamo.createTables();
		console.log('Tables created');
		return;
	} catch (err) {
		console.error('Error creating tables: ', err);
		throw new Error(err);
	}
};

