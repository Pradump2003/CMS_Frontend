import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    writer: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/blog/${id}`
        );
        setFormData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/blog/${id}`,
        formData
      );
      console.log('Response:', response.data.data);
      alert('Blog updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Error updating blog.');
    }
  };

  return (
    <div className="m-4 text-black">
      <form>
        <div className="flex gap-2 mb-4">
          <span className="text-black font-bold">Title :</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-white text-black border border-black rounded font-normal"
          ></input>
        </div>
        <div className="flex gap-2 mb-4">
          <span className="font-bold mb-4"> Content: </span>
          <textarea
            name="content"
            className=" bg-white border border-black rounded"
            rows="5"
            cols="20"
            value={formData.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex gap-2 mb-4">
          <span className="text-black font-bold">Tags :</span>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="bg-white text-black border border-black rounded font-normal"
          ></input>
        </div>
        <div className="flex gap-2 mb-4">
          <span className="text-black font-bold">Writer :</span>
          <input
            type="text"
            name="writer"
            value={formData.writer}
            onChange={handleChange}
            className="bg-white text-black border border-black rounded font-normal"
          ></input>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            onClick={handleUpdate}
            className="border border-black rounded px-4 py-2 text-white font-bold bg-blue-500"
          >
            Update
          </button>
          <button
            type="submit"
            onClick={() => navigate('/')}
            className="border border-black rounded px-4 py-2 text-white font-bold bg-blue-500"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
