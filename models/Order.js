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
		orderStatus: Joi.number().positive().required().min(1).max(5),
	},
};

export const registerModel = dynamo => {
	Order = dynamo.define('Order', OrderModel);
};

export const getOrderStatusKey = orderStatusValue =>
	Object.keys(orderStatusMap).find(key => orderStatusMap[key] === orderStatusValue);

export const setOrderStatusObject = order => {
	order.attrs.orderStatus = {
		id: order.get('orderStatus'),
		name: getOrderStatusKey(order.get('orderStatus')),
	};
};

export const orderStatusMap = {
	PENDING: 1,
	SHIPPED: 2,
	CANCELED: 3,
	COMPLETED: 4,
	REFUNDED: 5,
};

export const createSK = (orderId = uuid()) => `ORDER-${orderId}`;

export {Order as default};
