import express from 'express';
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (_, res) => {
	res.send('DynamoDB demo application');
});

module.exports = router;
