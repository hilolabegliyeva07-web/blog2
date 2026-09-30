import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate.js';

export default function PostCard({ post }) {
  const { title, content, imageUrl, tags, author, createdAt } = post;

  return (
    <article className="post">
      {imageUrl ? (
        <img className="thumb" src={imageUrl} alt="" />
      ) : (
        <div className="thumb ph">{title[0]}</div>
      )}
      <div className="body">
        <div className="tags">
          {tags.map((t) => (
            <Link key={t.id} className="tag" to={`/?tag=${t.name}`}>#{t.name}</Link>
          ))}
        </div>
        <h3>{title}</h3>
        <p>{content}</p>
        <div className="by">
          <div className="av">{author.username[0].toUpperCase()}</div>
          <div>
            <Link to={`/users/${author.username}`}><b>{author.username}</b></Link>
            <small>{formatDate(createdAt)}</small>
          </div>
        </div>
      </div>
    </article>
  );
}
