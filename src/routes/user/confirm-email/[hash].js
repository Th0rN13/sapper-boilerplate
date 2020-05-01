import { confirmEmail } from 'helpers/db.js';

export async function get(req, res) {
	const { hash } = req.params;
	const result = await confirmEmail(hash);
	res.end(JSON.stringify(result));
}
