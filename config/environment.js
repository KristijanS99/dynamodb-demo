import dotenv from 'dotenv';

dotenv.config();

let config;

if (!config) {
	config = {
		PORT: process.env.PORT || 3000,
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
		region: process.env.REGION,
		tableName: process.env.TABLE_NAME,
		autoCreateTables: process.env.AUTO_CREATE_TABLES === 'true',
	};
}

export default config;
