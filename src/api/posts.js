import { request } from './client.js';

export const getPosts = (params) => request('/posts', { params });
export const createPost = (body) => request('/posts', { method: 'POST', body });
