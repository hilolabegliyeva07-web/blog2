import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PostsPage from './pages/PostsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import TagsPage from './pages/TagsPage.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="wrap">
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users/:username" element={<ProfilePage />} />
          <Route
            path="/posts/new"
            element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>}
          />
          <Route path="*" element={<div className="empty">Sahifa topilmadi.</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
