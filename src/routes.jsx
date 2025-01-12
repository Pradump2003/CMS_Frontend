import { Routes, Route } from "react-router-dom";
import BlogList from "./component/blog/BlogList";
import AddBlog from "./component/blog/AddBlog";
import EditBlog from "./component/blog/EditBlog";
import NotFound from "./component/NotFound";

export default function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/add-blog" element={<AddBlog />} />
      <Route path="/edit-blog/:id" element={<EditBlog/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
