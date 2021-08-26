import Joi from 'joi';
import config from '../config/environment';
import {uuid} from 'uuidv4';

let Product;

const ProductModel = {
	hashKey: 'PK',
	rangeKey: 'SK',
	tableName: config.tableName,
	timestamps: true,
	schema: {
		PK: Joi.string().required(),
		SK: Joi.string().required(),
		name: Joi.string().required(),
		price: Joi.number().positive().required(),
	},
};

export const registerModel = dynamo => {
	Product = dynamo.define('Product', ProductModel);
};

export const createSK = (orderId = uuid(), productId = uuid()) => `ORDER-${orderId}-PRODUCT-${productId}`;

export default Product;
