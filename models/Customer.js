import Joi from 'joi';
import config from '../config/environment';

const BASE_SK = 'PROFILE';

let Customer;

const CustomerModel = {
	hashKey: 'PK',
	rangeKey: 'SK',
	tableName: config.tableName,
	timestamps: true,
	schema: {
		PK: Joi.string().required(),
		SK: Joi.string().default(BASE_SK),
		name: Joi.string().required(),
		address: Joi.string().required(),
		email: Joi.string().email().required(),
	},
	indexes: [{
		hashKey: 'SK', rangeKey: 'PK', name: 'GSI', type: 'global',
	}],
};

export const registerModel = dynamo => {
	Customer = dynamo.define('Customer', CustomerModel);
};

export default Customer;
