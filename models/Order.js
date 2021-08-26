import Joi from 'joi';
import config from '../config/environment';
import {uuid} from 'uuidv4';

let Order;

const OrderModel = {
	hashKey: 'PK',
	rangeKey: 'SK',
	tableName: config.tableName,
	timestamps: true,
	schema: {
		PK: Joi.string().required(),
		SK: Joi.string().required(),
		totalAmount: Joi.number().positive().required(),
		quantity: Joi.number().positive().required(),
		orderStatus: Joi.number().positive().required(),
	},
};

export const registerModel = dynamo => {
	Order = dynamo.define('Order', OrderModel);
};

export const orderStatusMap = {
	PENDING: 1,
	SHIPPED: 2,
	CANCELED: 3,
	COMPLETED: 4,
	REFUNDED: 5,
};

export const createSK = (orderId = uuid()) => `ORDER-${orderId}`;

export default Order;
