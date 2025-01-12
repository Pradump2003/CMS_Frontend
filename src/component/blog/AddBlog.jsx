
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    writer: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Testing 1", formData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/blog",
        formData
      );
      if (response.status === 200 || response.status === 201) {
        alert("Form submitted successfully!");
        console.log("Backend Response:", response.data);
        setFormData(formData);
        navigate("/");
      } else {
        alert("Failed to submit form!");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="m-4 text-black">
      <form>
        <div className="flex gap-2 mb-4">
          <span className=" font-bold">Title :</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title "
            className="bg-white text-black border border-black rounded font-normal"
          ></input>
        </div>
        <div className="flex gap-2 mb-4">
          <span className="font-bold"> Content: </span>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className=" bg-white border border-black rounded"
            rows="5"
            cols="20"
          ></textarea>
        </div>
        <div className="flex gap-2 mb-4">
          <span className="font-bold">Tags :</span>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter Tags "
            className="bg-white text-black border border-black rounded font-normal"
          ></input>
        </div>
        <div className="flex gap-2 mb-4">
          <span className="font-bold">Writer :</span>
          <input
            type="text"
            name="writer"
            value={formData.writer}
            onChange={handleChange}
            placeholder="Enter wrinte name "
            className="bg-white text-black border border-black rounded font-normal"
          ></input>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="border border-black rounded px-4 py-2 text-white font-bold bg-blue-500"
          >
            Submit
          </button>
          <button
            type="submit"
            onClick={() => navigate("/")}
            className="border border-black rounded px-4 py-2 text-white font-bold bg-blue-500"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
