import { getToken } from '../utils/storage.js';
import { mockRequest } from './mockServer.js';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
// .env da VITE_USE_MOCK=false qilsangiz, haqiqiy backendga so'rov ketadi
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function request(path, options = {}) {
  if (USE_MOCK) return mockRequest(path, options);

  const { method = 'GET', body, params } = options;
  const query = params
    ? '?' + new URLSearchParams(Object.entries(params).filter(([, v]) => v))
    : '';
  const token = getToken();

  const res = await fetch(BASE + path + query, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const m = data.message;
    throw new Error(Array.isArray(m) ? m.join(', ') : m || 'Xatolik yuz berdi');
  }
  return data;
}
