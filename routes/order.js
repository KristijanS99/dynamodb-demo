import express from 'express';
import Order, {createSK, orderStatusMap, setOrderStatusObject} from '../models/Order';
import {createPK} from '../models/Customer';
// eslint-disable-next-line new-cap
const router = express.Router();

const BASE = '/customer/:customerId';

router.post(`${BASE}/order`, async (req, res) => {
	const {totalAmount, quantity} = req.body;
	const orderStatus = orderStatusMap.PENDING;
	const {customerId} = req.params;
	const PK = createPK(customerId);
	const SK = createSK();

	try {
		const order = new Order({PK, SK, totalAmount, quantity, orderStatus});
		await order.save();
		res.status(201).send(order);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.get(`${BASE}/order/:orderId`, async (req, res) => {
	const {customerId, orderId} = req.params;

	try {
		const order = await Order.get(createPK(customerId), createSK(orderId));
		if (!order) {
			res.status(404).send();
		}

		setOrderStatusObject(order);

		res.send(order);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.patch(`${BASE}/order/:orderId`, async (req, res) => {
	const {totalAmount, quantity, orderStatus} = req.body;
	const {customerId, orderId} = req.params;
	const PK = createPK(customerId);
	const SK = createSK(orderId);

	try {
		const order = await Order.update({PK, SK, totalAmount, quantity, orderStatus});
		if (!order) {
			res.status(404).send();
		}

		setOrderStatusObject(order);

		res.status(201).send(order);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.delete(`${BASE}/order/:orderId`, async (req, res) => {
	const {customerId, orderId} = req.params;
	try {
		await Order.destroy(createPK(customerId), createSK(orderId));
		res.send();
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

export default router;
