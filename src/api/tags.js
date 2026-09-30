import { request } from './client.js';

export const getTags = () => request('/tags');
