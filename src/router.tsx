import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./views/Login";
import Register from "./views/Register";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";
import SlugView from "./views/SlugView";
import NotFoundView from "./views/NotFoundView";
import HomeView from "./views/HomeView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/create" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index={true} element={<LinkTreeView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>
        <Route path="/:slug" element={<AuthLayout />}>
          <Route index={true} element={<SlugView />} />
        </Route>
        <Route path="/404" element={<AuthLayout />}>
          <Route index={true} element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
