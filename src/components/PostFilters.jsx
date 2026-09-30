import { useState } from 'react';

export default function PostFilters({ onSubmit }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('new');

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ search: search.trim(), sort });
  };

  return (
    <form className="filter" onSubmit={submit}>
      <label className="field grow">
        Sarlavha bo'yicha qidirish
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="masalan: nestjs"
        />
      </label>
      <label className="field" style={{ width: 200 }}>
        Saralash
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="new">Avval yangilari</option>
          <option value="old">Avval eskilari</option>
          <option value="az">Sarlavha (A–Z)</option>
        </select>
      </label>
      <button className="btn primary big">Qidirish</button>
    </form>
  );
}
