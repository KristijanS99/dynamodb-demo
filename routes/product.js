import express from 'express';
import Product, {createSK} from '../models/Product';
import {createPK} from '../models/Customer';
// eslint-disable-next-line new-cap
const router = express.Router();

const BASE = '/customer/:customerId/order/:orderId';

router.post(`${BASE}/product`, async (req, res) => {
	const {name, price} = req.body;
	const {customerId, orderId} = req.params;
	const PK = createPK(customerId);
	const SK = createSK(orderId);

	try {
		const product = new Product({PK, SK, name, price});
		await product.save();
		res.status(201).send(product);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.get(`${BASE}/product/:productId`, async (req, res) => {
	const {customerId, orderId, productId} = req.params;

	try {
		const product = await Product.get(createPK(customerId), createSK(orderId, productId));
		if (!product) {
			res.status(404).send();
		}

		res.send(product);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.patch(`${BASE}/product/:productId`, async (req, res) => {
	const {name, price} = req.body;
	const {customerId, orderId, productId} = req.params;
	const PK = createPK(customerId);
	const SK = createSK(orderId, productId);

	try {
		const product = await Product.update({PK, SK, name, price});
		if (!product) {
			res.status(404).send();
		}

		res.status(201).send(product);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.delete(`${BASE}/product/:productId`, async (req, res) => {
	const {customerId, orderId, productId} = req.params;
	try {
		await Product.destroy(createPK(customerId), createSK(orderId, productId));
		res.send();
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

export default router;
