import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewBlog from './ViewBlog';
import Pagination from '../Pagination';

export default function BlogList() {
  const [blogList, setBlogList] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/blog?page=${currentPage}&limit=7`,
          {
            params: {
              search,
              sortField,
              sortOrder,
              filters: JSON.stringify(filters)
            }
          }
        );
        setBlogList(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error Fetching data', error);
      }
    }
    getData();
  }, [search, currentPage, sortField, sortOrder, filters]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIndicator = (field) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? '🔼' : '🔽';
    }
    return '⬍';
  };

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

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleDebouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    handleDebouncedSearch(value);
  };

  return (
    <div className="m-4">
      {showModal && <ViewBlog closeModal={closeModal} modalData={modalData} />}
      <div className="grid grid-cols-4 justify-start">
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={searchInput}
          className="bg-white items-center mb-2 py-1 px-2 border-2 border-blue-500 rounded-md text-black"
          onChange={handleSearchChange}
        />
      </div>
      <table className="text-black w-full overflow-hidden border-2 border-blue-500">
        <thead>
          <tr>
            <th
              onClick={() => handleSort('title')}
              className="border border-blue-400 px-4 py-2 cursor-pointer"
            >
              Title {getSortIndicator('title')}
            </th>
            <th
              onClick={() => handleSort('content')}
              className="border border-blue-400 px-4 py-2 cursor-pointer"
            >
              Content {getSortIndicator('content')}
            </th>
            <th
              onClick={() => handleSort('tags')}
              className="border border-blue-400 px-4 py-2 cursor-pointer"
            >
              Tags {getSortIndicator('tags')}
            </th>
            <th
              onClick={() => handleSort('writer')}
              className="border border-blue-400 px-4 py-2 cursor-pointer"
            >
              Writer {getSortIndicator('writer')}
            </th>
            <th
              onClick={() => handleSort('created_at')}
              className="border border-blue-400 px-4 py-2 cursor-pointer"
            >
              Created_at {getSortIndicator('created_at')}
            </th>
            <th
              onClick={() => handleSort('updated_at')}
              className="border border-blue-400 px-4 py-2 cursor-pointer"
            >
              Updated_at {getSortIndicator('updated_at')}
            </th>
            <th className="border border-blue-400 px-4 py-2"> View Blogs</th>
            <th className="border border-blue-400 px-4 py-2"> Edit Blog</th>
            <th className="border border-blue-400 px-4 py-2"> Delete Blogs</th>
          </tr>
        </thead>
        <tbody>
          {blogList && blogList.length ? (
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
                    className="text-white bg-blue-500  hover:bg-blue-700 px-4 py-1 rounded font-serif"
                  >
                    View
                  </button>
                </td>
                <td className="border border-blue-400 px-4 py-2 text-center">
                  <button
                    onClick={() => navigate(`/edit-blog/${data._id}`)}
                    className="text-white bg-green-500 px-4 py-1 rounded font-serif hover:bg-green-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="border border-blue-400 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="text-white bg-red-500 px-2 py-1 rounded font-serif hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <span>No data found</span>
            </tr>
          )}
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
