import dotenv from 'dotenv';

dotenv.config();

let config;

if (!config) {
	config = {
		PORT: process.env.PORT || 3000,
		accessKeyId: process.env.ACCESS_KEY,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
		region: process.env.REGION,
	};
}

export default config;
