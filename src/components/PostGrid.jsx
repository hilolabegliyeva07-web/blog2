import PostCard from './PostCard.jsx';

export default function PostGrid({ posts }) {
  if (!posts.length) return <div className="empty">Hech narsa topilmadi.</div>;
  return (
    <div className="grid">
      {posts.map((p) => <PostCard key={p.id} post={p} />)}
    </div>
  );
}
