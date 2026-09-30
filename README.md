# Blog — frontend (React + Vite)

    npm install
    npm run dev              # http://localhost:5173

Backend hali yo'q, shuning uchun `.env` da `VITE_USE_MOCK=true`:
ma'lumotlar brauzerda (localStorage) saqlanadi.
Test foydalanuvchi: john@example.com / 123456

Backend tayyor bo'lganda `.env` da `VITE_USE_MOCK=false` qiling va
`VITE_API_URL` ni backend manziliga sozlang.

## Tuzilma
    src/api/         API so'rovlari (client, auth, posts, tags, users, mockServer)
    src/components/  Navbar, Footer, PostCard, PostGrid, PostFilters, AuthForm, ProtectedRoute
    src/context/     AuthContext (kirgan foydalanuvchi holati)
    src/pages/       PostsPage, TagsPage, LoginPage, RegisterPage, CreatePostPage, ProfilePage
    src/utils/       storage, formatDate
