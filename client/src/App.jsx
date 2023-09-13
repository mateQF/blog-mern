import "./App.css";

import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext.jsx";
import { PostContextProvider } from "./context/PostContext.jsx";

import Layout from "./Layout";

import Home from "./components/Home";
import CreatePost from "./components/CreatePost";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import EditPost from "./components/EditPost";
import UserPostPage from "./pages/UserPostPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <UserContextProvider>
      <PostContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route element={<ProtectedRoute redirect="/login" />}>
              <Route path="/create" element={<CreatePost />} />
              <Route path="/profile" element={<UserPostPage />} />
              <Route path="/update/:id" element={<EditPost />} />
            </Route>
          </Route>
        </Routes>
      </PostContextProvider>
    </UserContextProvider>
  );
}

export default App;
