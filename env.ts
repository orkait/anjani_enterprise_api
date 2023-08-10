import dotenv from "dotenv";
dotenv.config({});

const env = {
	MODE: process.env.MODE,
	SERVER_URL: {
		dev: process.env.SERVER_URL_DEV,
		prod: process.env.SERVER_URL_PROD,
	},
	DB_URL: process.env.DB_URL,
};

export default env;
