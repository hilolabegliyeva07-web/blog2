import { getPosts } from './posts.js';

// Muallifning barcha postlari
export const getUserPosts = (username, sort = 'new') =>
  getPosts({ author: username, sort });
