import AES from "crypto-js/aes";
import SHA512 from "crypto-js/sha512";
import core from "crypto-js/core";

export const hash512 = (message) => SHA512(message).toString();

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

export const encryptAES = (obj: any, key: string) => {
	try {
		return AES.encrypt(JSON.stringify(obj), key).toString();
	} catch (error) {
		return -1;
	}
};

export const decryptAES = (encrypted: string, key: string) => {
	try {
		const decrypted = AES.decrypt(encrypted, key);
		return JSON.parse(decrypted.toString(core.enc.Utf8));
	} catch (error) {
		return -1;
	}
};

if (require.main === module) {
	// console.log(generateHash("KAi"));
	// message = 'zenosama';
	// passphase = 'ZNEOSAMAEAJSKLHJLKALJLKAKLLKAJAJKLJAKLK';
	// encrypted = messageEncrypt(message, passphase);
	// decrypted = messageDecrypt(encrypted, passphase);
	// console.log('Encrypted :' + encrypted);
	// console.log('Size of Encrypted :' + sizeof(encrypted));
	// console.log('Decrypted: ' + decrypted);
	// console.log(sizeof('U2FsdGVkX19+SiLlnUMiuz+mNakFA6PDrrHWmxldZSA='));
}
