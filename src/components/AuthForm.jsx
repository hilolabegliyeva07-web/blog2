import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthForm({ mode }) {
  const isRegister = mode === 'register';
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) await register(form);
      else await login({ email: form.email, password: form.password });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card-form" onSubmit={submit}>
      <h1>{isRegister ? "Ro'yxatdan o'tish" : 'Kirish'}</h1>
      {isRegister && (
        <label className="field">
          Foydalanuvchi nomi
          <input value={form.username} onChange={set('username')} required minLength={3} />
        </label>
      )}
      <label className="field">
        Email
        <input type="email" value={form.email} onChange={set('email')} required />
      </label>
      <label className="field">
        Parol
        <input type="password" value={form.password} onChange={set('password')} required minLength={6} />
      </label>
      {error && <p className="err">{error}</p>}
      <button className="btn primary big">{isRegister ? "Ro'yxatdan o'tish" : 'Kirish'}</button>
      <p className="alt">
        {isRegister
          ? <>Akkauntingiz bormi? <Link to="/login">Kirish</Link></>
          : <>Akkauntingiz yo'qmi? <Link to="/register">Ro'yxatdan o'tish</Link></>}
      </p>
    </form>
  );
}
