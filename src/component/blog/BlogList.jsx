import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BlogList() {
  const [blogList, setBlogList] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/blog");
      if (response && response.data && response.data.status === 200) {
        setBlogList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = axios
        .delete(`http://localhost:8080/api/blog/${_id}`)
        .then(() => getData());
      alert("Form deleted successfully!");
      console.log("Backend Response:", response.data.data);
      setBlogList(blogList.filter((data) => data._id !== _id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-4">
      <table className="text-black w-full border border-blue-400">
        <thead>
          <tr>
            <th className="border border-blue-400 px-4 py-2"> Title </th>
            <th className="border border-blue-400 px-4 py-2"> Content </th>
            <th className="border border-blue-400 px-4 py-2"> Tags </th>
            <th className="border border-blue-400 px-4 py-2"> Writer </th>
            <th className="border border-blue-400 px-4 py-2"> Created_at </th>
            <th className="border border-blue-400 px-4 py-2"> Updated_at </th>
            <th className="border border-blue-400 px-4 py-2"> View Blogs</th>
            <th className="border border-blue-400 px-4 py-2"> Edit Blog</th>
            <th className="border border-blue-400 px-4 py-2"> Delete Blogs</th>
          </tr>
        </thead>
        <tbody>
          {blogList &&
            blogList.length &&
            blogList.map((data, index) => (
              <tr key={index}>
                <td className="border border-blue-400 px-4 py-2">
                  {data.title}
                </td>
                <td className="border border-blue-400 px-4 py-2">
                  {data.content}
                </td>
                <td className="border border-blue-400 px-4 py-2">
                  {data.tags}
                </td>
                <td className="border border-blue-400 px-4 py-2">
                  {data.writer}
                </td>
                <td className="border border-blue-400 px-4 py-2">
                  {new Date(data.createdAt).toLocaleString()}
                </td>
                <td className="border border-blue-400 px-4 py-2">
                  {new Date(data.updatedAt).toLocaleString()}
                </td>
                <td className="border border-blue-400 px-4 py-2">
                  <button className="text-white bg-green-500 px-2 py-1 rounded">
                    View
                  </button>
                </td>
                <td className="border border-blue-400 px-4 py-2">
                  <button
                    onClick={() => navigate(`/edit-blog/${data._id}`)}
                    className="text-white bg-green-500 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
                <td className="border border-blue-400 px-4 py-2">
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="text-white bg-red-500 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
