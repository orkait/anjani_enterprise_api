import env from "./env";
import { v4 as uuidv4 } from 'uuid';

export const getQuery = (req) => {
	return JSON.parse(JSON.stringify(req.query));
};

// generate crypto safe random string
export function randomToken() {
    return uuidv4().replace(/-/g, '')
}

export interface commonResponseType {
	msg: string;
	code: number;
	status: "exited" | "success" | "failed" | "unauthorized" | "overflow";
	error?: Error;
	extra?: any;
	data?: any;
	fix?: any;
}

const modeRunMaker = (mode: string) => {
	const inner = (callback: any) => {
		if (env.MODE === mode) {
			// check if callback is a function
			if (typeof callback === "function") {
				return callback();
			} else {
				return callback;
			}
		}
		return "";
	};
	return inner;
};

export const runDev = modeRunMaker("dev");
export const runProd = modeRunMaker("prod");

export const withMode = (object) => {
	if (env.MODE === "prod" || env.MODE === "PROD") {
		return object.prod;
	} else {
		return object.dev;
	}
};


export function cres(object: commonResponseType) {
	return object;
}

export const fakeNumString = (length = 5) => {
	const inner = (length) => {
		let temp = "";
		for (let x = 0; x <= length; x++) {
			temp += Math.floor(Math.random() * 10);
		}
		return temp;
	};
	return inner(length);
};

export const isEmpty = (arg) => {
	try {
		if (arg == null) {
			return true;
		} else if (typeof arg === "undefined") {
			return true;
		} else if (arg.length === 0) {
			return true;
		} else if (typeof arg === "object" && Object.keys(arg).length === 0) {
			return true;
		}
		return false;
	} catch (error) {
		return false;
	}
};

export const showError = (Error: Error) => {
	return {
		exists: true,
		error: {
			message: Error.message,
			stack: runDev(Error.stack),
		},
	};
};

export const showAJVErrors = (errors: any) => {
	return errors?.map((err) => {
		return {
			key: err.instancePath.split("/")[1],
			message: err.message,
			params: err.params,
		};
	});
};