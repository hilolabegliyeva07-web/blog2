import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts.js';
import { fileToDataUrl } from '../utils/fileToDataUrl.js';

const MAX_FILE_MB = 5;

export default function CreatePostPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [image, setImage] = useState(null); // data URL
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const pickImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('Faqat rasm faylini tanlang');
    if (file.size > MAX_FILE_MB * 1024 * 1024) return setError(`Rasm ${MAX_FILE_MB} MB dan oshmasin`);
    try {
      setError('');
      setImage(await fileToDataUrl(file));
    } catch (err) {
      setError(err.message);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createPost({
        title: form.title,
        content: form.content,
        imageUrl: image || undefined,
        tags: form.tags.split(',').map((t) => t.trim().replace(/^#/, '')).filter(Boolean),
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card-form wide" onSubmit={submit}>
      <h1>Yangi post</h1>
      <label className="field">
        Sarlavha
        <input value={form.title} onChange={set('title')} required minLength={3} />
      </label>
      <label className="field">
        Matn
        <textarea rows={6} value={form.content} onChange={set('content')} required />
      </label>

      <div className="field">
        Rasm (ixtiyoriy)
        {image ? (
          <div className="preview">
            <img src={image} alt="Tanlangan rasm" />
            <button type="button" className="btn" onClick={() => setImage(null)}>Olib tashlash</button>
          </div>
        ) : (
          <input type="file" accept="image/*" onChange={pickImage} />
        )}
      </div>

      <label className="field">
        Teglar (vergul bilan)
        <input value={form.tags} onChange={set('tags')} placeholder="nestjs, typescript" />
      </label>
      {error && <p className="err">{error}</p>}
      <button className="btn primary big">Nashr qilish</button>
    </form>
  );
}