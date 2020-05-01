export const fetchOptions = {
	method: 'GET',
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json',
	},
};

export async function post(endpoint, data) {
	const result = await fetch(endpoint, {
		...fetchOptions,
		method: 'POST',
		body: JSON.stringify(data),
	});
	return await result.json();
}

export async function get(endpoint) {
	const result = await fetch(endpoint, fetchOptions);
	return await result.json();
}
