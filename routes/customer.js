import express from 'express';
import Customer, {createPK, BASE_SK} from '../models/Customer';
import {isProduct} from '../models/Product';
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/customer', async (req, res) => {
	const {name, address, email} = req.body;
	const PK = createPK();

	try {
		const customer = new Customer({PK, name, address, email});
		await customer.save();
		res.status(201).send(customer);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.get('/customer/:id', async (req, res) => {
	const {id} = req.params;

	try {
		const customer = await Customer.get(createPK(id), BASE_SK);
		if (!customer) {
			res.status(404).send();
		}

		res.send(customer);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.get('/customer/:id/orders', async (req, res) => {
	const {id} = req.params;

	try {
		Customer.query(createPK(id))
			.where('SK').beginsWith('ORDER-')
			.exec((err, data) => {
				if (err) {
					res.status(500).json(err);
				} else {
					// Map all orders
					const orders = data?.Items?.map(item => {
						if (!item?.get('SK')?.includes('PRODUCT-')) {
							return item;
						}

						return null;
					}).filter(el => el);

					// Find all products for each Order based on SK prefix
					orders.forEach(order => {
						order.attrs.products = data?.Items
							?.filter(item => item?.get('SK')?.includes(order.get('SK'))
							&& isProduct(item));
					});

					res.send(orders);
				}
			});
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.get('/customer/email/:emailAddress', async (req, res) => {
	const {emailAddress} = req.params;

	try {
		Customer.query('PROFILE')
			.where('PK').beginsWith('CUSTOMER-')
			.filter('email').equals(emailAddress)
			.usingIndex('GSI')
			.exec((err, data) => {
				const customer = data?.Items?.[0];
				if (!customer || err) {
					res.status(404).send();
				}

				res.send(customer);
			});
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.get('/customer/name/:name', async (req, res) => {
	const {name} = req.params;

	try {
		Customer.query('PROFILE')
			.where('PK').beginsWith('CUSTOMER-')
			.filter('name').equals(name)
			.usingIndex('GSI')
			.exec((err, data) => {
				const customer = data?.Items?.[0];
				if (!customer || err) {
					res.status(404).send();
				}

				res.send(customer);
			});
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.patch('/customer/:id', async (req, res) => {
	const {name, address, email} = req.body;
	const {id} = req.params;
	const PK = createPK(id);

	try {
		const customer = await Customer.update({PK, SK: BASE_SK, name, address, email});
		res.send(customer);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

router.delete('/customer/:id', async (req, res) => {
	const {id} = req.params;

	try {
		await Customer.destroy(createPK(id), BASE_SK);
		res.send();
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

export default router;
