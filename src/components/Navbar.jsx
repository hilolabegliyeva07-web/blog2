import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div className="wrap nav">
        <Link to="/" className="logo">Blog</Link>

        <nav className="links">
          <NavLink to="/" end>Postlar</NavLink>
          <NavLink to="/tags">Teglar</NavLink>
        </nav>

        <div className="auth">
          {user ? (
            <>
              <Link to="/posts/new" className="btn primary">Yangi post</Link>
              <Link to={`/users/${user.username}`} className="me">{user.username}</Link>
              <button className="btn" onClick={onLogout}>Chiqish</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Kirish</Link>
              <Link to="/register" className="btn primary">Ro'yxatdan o'tish</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
