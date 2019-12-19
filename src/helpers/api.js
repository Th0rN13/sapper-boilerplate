import nodeFetch from 'node-fetch';
import { apiURL } from 'helpers/config';

const fetch = process.browser ? window.fetch : nodeFetch;

export async function post(endpoint, data) {
  const result = await fetch(`${apiURL}/${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await result.json();
}

export async function get(endpoint) {
  const result = await fetch(`${apiURL}/${endpoint}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return await result.json();
}
