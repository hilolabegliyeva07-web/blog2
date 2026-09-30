import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserPosts } from '../api/users.js';
import PostGrid from '../components/PostGrid.jsx';

export default function ProfilePage() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(username).then(setPosts).catch(() => setPosts([]));
  }, [username]);

  return (
    <>
      <h1>{username}</h1>
      <p className="sub">Muallifning postlari: {posts.length} ta</p>
      <PostGrid posts={posts} />
    </>
  );
}
