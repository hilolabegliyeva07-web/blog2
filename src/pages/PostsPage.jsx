import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPosts } from '../api/posts.js';
import PostFilters from '../components/PostFilters.jsx';
import PostGrid from '../components/PostGrid.jsx';

export default function PostsPage() {
  const [params] = useSearchParams();
  const tag = params.get('tag');
  const [filters, setFilters] = useState({ search: '', sort: 'new' });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts({ ...filters, tag }).then(setPosts).catch(() => setPosts([]));
  }, [filters, tag]);

  return (
    <>
      <h1>Postlar</h1>
      <p className="sub">Hamjamiyat yozgan maqolalarni o'qing va o'zingiznikini yozing.</p>
      <PostFilters onSubmit={setFilters} />
      {tag && (
        <p className="sub">
          Teg: <Link className="tag" to="/">#{tag} ✕</Link>
        </p>
      )}
      <PostGrid posts={posts} />
    </>
  );
}
