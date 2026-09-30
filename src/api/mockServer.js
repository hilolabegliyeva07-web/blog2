// Backend yo'qligida ishlaydigan soxta server.
// Ma'lumotlar brauzerning localStorage ida saqlanadi.

const KEY = 'mock_db';

const SEED = {
  users: [{ id: 1, username: 'john_doe', email: 'john@example.com', password: '123456' }],
  posts: [
    { id: 1, title: 'My first post', content: 'Post content...', imageUrl: null,
      tags: ['nestjs', 'typescript'], authorId: 1, createdAt: '2026-09-28T09:00:00Z' },
    { id: 2, title: 'My second post', content: 'Post content...', imageUrl: null,
      tags: ['nestjs', 'typescript'], authorId: 1, createdAt: '2026-09-28T10:00:00Z' },
  ],
};

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? structuredClone(SEED);
  } catch {
    return structuredClone(SEED);
  }
};
const save = (db) => localStorage.setItem(KEY, JSON.stringify(db));
const wait = (ms = 200) => new Promise((r) => setTimeout(r, ms));

const session = (user) => ({
  token: `mock-${user.id}`,
  user: { id: user.id, username: user.username },
});

const currentUser = (db) => {
  const token = localStorage.getItem('token') ?? '';
  const id = Number(token.replace('mock-', ''));
  return db.users.find((u) => u.id === id);
};

const view = (db, p) => {
  const author = db.users.find((u) => u.id === p.authorId);
  return {
    id: p.id,
    title: p.title,
    content: p.content,
    imageUrl: p.imageUrl,
    createdAt: p.createdAt,
    tags: p.tags.map((name, i) => ({ id: `${p.id}-${i}`, name })),
    author: { id: author.id, username: author.username },
  };
};

const routes = {
  'POST /auth/register'(db, { body }) {
    const { username, email, password } = body;
    if (db.users.some((u) => u.email === email || u.username === username)) {
      throw new Error('Bu email yoki username band');
    }
    const user = { id: Date.now(), username, email, password };
    db.users.push(user);
    save(db);
    return session(user);
  },

  'POST /auth/login'(db, { body }) {
    const user = db.users.find((u) => u.email === body.email && u.password === body.password);
    if (!user) throw new Error("Email yoki parol noto'g'ri");
    return session(user);
  },

  'GET /posts'(db, { params = {} }) {
    const { search, tag, author, sort } = params;
    let list = db.posts.map((p) => view(db, p));
    if (search) list = list.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (tag) list = list.filter((p) => p.tags.some((t) => t.name === tag));
    if (author) list = list.filter((p) => p.author.username === author);

    const byDate = (a, b) => new Date(a.createdAt) - new Date(b.createdAt) || a.id - b.id;
    if (sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === 'old') list.sort(byDate);
    else list.sort((a, b) => byDate(b, a));
    return list;
  },

  'POST /posts'(db, { body }) {
    const user = currentUser(db);
    if (!user) throw new Error('Avval tizimga kiring');
    const post = {
      id: Date.now(),
      title: body.title,
      content: body.content,
      imageUrl: body.imageUrl ?? null,
      tags: [...new Set((body.tags ?? []).map((t) => t.toLowerCase()))],
      authorId: user.id,
      createdAt: new Date().toISOString(),
    };
    db.posts.push(post);
    save(db);
    return view(db, post);
  },

  'GET /tags'(db) {
    const count = {};
    db.posts.forEach((p) => p.tags.forEach((t) => { count[t] = (count[t] ?? 0) + 1; }));
    return Object.entries(count).map(([name, c]) => ({ name, count: c }));
  },
};

export async function mockRequest(path, { method = 'GET', body, params } = {}) {
  await wait();
  const handler = routes[`${method} ${path}`];
  if (!handler) throw new Error(`Mock: ${method} ${path} topilmadi`);
  return handler(load(), { body, params });
}
