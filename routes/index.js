import express from 'express';
import CustomerRoutes from './customer';
import OrderRoutes from './order';
import ProductRoutes from './product';
// eslint-disable-next-line new-cap
const router = express.Router();

router.use(CustomerRoutes);
router.use(OrderRoutes);
router.use(ProductRoutes);

router.get('/', (_, res) => {
	res.send('DynamoDB demo application');
});

export default router;
