import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTags } from '../api/tags.js';

export default function TagsPage() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags().then(setTags).catch(() => setTags([]));
  }, []);

  return (
    <>
      <h1>Teglar</h1>
      <p className="sub">Teg bo'yicha postlarni toping.</p>
      <div className="tagcloud">
        {tags.map((t) => (
          <Link key={t.name} className="tag lg" to={`/?tag=${t.name}`}>
            #{t.name} ({t.count})
          </Link>
        ))}
      </div>
      {!tags.length && <div className="empty">Hozircha teglar yo'q.</div>}
    </>
  );
}
