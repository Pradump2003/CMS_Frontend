import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewBlog from './ViewBlog';
import Pagination from '../Pagination';


export default function BlogList() {
  const [blogList, setBlogList] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/blog?page=${currentPage}&limit=8`
        );
        setBlogList(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error Fetching data', error);
      }
    }
    getData();
  }, [currentPage]);

  const handleDelete = async (_id) => {
    try {
      const response = axios
        .delete(`http://localhost:8080/api/blog/${_id}`)
        .then(() => getData());
      alert('Form deleted successfully!');
      setBlogList(blogList.filter((data) => data._id !== _id));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="m-4">
      {showModal && <ViewBlog closeModal={closeModal} modalData={modalData} />}
      <table className="text-black w-full overflow-hidden border-2 border-blue-500">
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
                <td className="border border-blue-400 px-4 py-2 text-center">
                  <button
                    onClick={() => {
                      setModalData(data);
                      setShowModal(true);
                    }}
                    className="text-white bg-green-500  hover:bg-green-700 px-4 py-1 rounded hover:ring-2 hover:ring-blue-500"
                  >
                    View
                  </button>
                </td>
                <td className="border border-blue-400 px-4 py-2 text-center">
                  <button
                    onClick={() => navigate(`/edit-blog/${data._id}`)}
                    className="text-white bg-green-500 px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
                <td className="border border-blue-400 px-4 py-2 text-center">
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
