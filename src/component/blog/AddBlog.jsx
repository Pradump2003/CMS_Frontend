import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import BgImage from '../../assets/BgImage.jpg'

export default function AddBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/blog/${id}`
        );
        const blogData = response.data.data;
        setValue('title', blogData.title);
        setValue('tags', blogData.tags);
        setValue('content', blogData.content);
        setValue('writer', blogData.writer);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      let response;
      if (id) {
        response = await axios.put(
          `http://localhost:8080/api/blog/${id}`,
          data
        );
      } else {
        response = await axios.post('http://localhost:8080/api/blog', data);
      }
      if (response.status === 200 || response.status === 201) {
        const msg = id
          ? 'Blog updated successfully!'
          : 'Blog Created successfully!';
        alert(msg);
        navigate('/');
      } else {
        alert('Failed to submit form!');
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=" max-w-md mx-auto">
        <div style={{ backgroundImage: `url(${BgImage})` }} className="w-full grid items-center border-2 border-black rounded-md m-10 text-black p-8 gap-4 ">
          <div className="grid">
            <p className=" font-bold font-serif">Title* </p>
            <input
              type="text"
              placeholder="Enter title "
              className={`bg-gray-100 text-black border-2 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:shadow-[0_4px_6px_rgba(0,0,255,0.7)] ${
                errors.title ? 'border-red-500' : ' border-black'
              }`}
              {...register('title', {
                required: 'title is required',
                maxLength: { value: 30, message: 'Max Length is 30' }
              })}
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <p className="font-bold font-serif"> Content* </p>
            <textarea
              placeholder="Enter content"
              className={`bg-gray-100 text-black border-2 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:shadow-[0_4px_6px_rgba(0,0,255,0.7)] ${
                errors.content ? 'border-red-500' : ' border-black'
              }`}
              {...register('content', {
                required: 'content is required',
                minLength: { value: 3, message: 'Min Length at least 3' }
              })}
              rows="3"
              cols="10"
            ></textarea>
          </div>
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
          <div className="grid gap-1">
            <p className="font-bold font-serif">Tags*</p>
            <input
              type="text"
              placeholder="Enter Tags"
              className={`bg-gray-100 text-black border-2 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:shadow-[0_4px_6px_rgba(0,0,255,0.7)] ${
                errors.tags ? 'border-red-500' : ' border-black'
              }`}
              {...register('tags', {
                required: 'tags is required',
                pattern: {
                  value: /^[a-zA-Z0-9, ]*$/,
                  message: 'Tags must be alphanumeric and comma-separated'
                }
              })}
            />
            {errors.tags && (
              <p className="text-red-500">{errors.tags.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <p className="font-bold font-serif">Writer*</p>
            <input
              type="text"
              name="writer"
              placeholder="Enter writer name "
              className={`bg-gray-100 text-black border-2 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:shadow-[0_4px_6px_rgba(0,0,255,0.7)] ${
                errors.writer ? 'border-red-500' : ' border-black'
              }`}
              {...register('writer', {
                required: 'writer name is required',
                maxLength: { value: 30, message: 'Max Length is 30' }
              })}
            />
            {errors.writer && (
              <p className="text-red-500">{errors.writer.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <button
                type="submit"
                className="w-full border border-black rounded py-2 text-white font-bold bg-blue-500 hover:bg-blue-800 font-serif"
              >
                {id ? 'Update' : 'Submit'}
              </button>
            </div>
            <div>
              <button
                type="submit"
                onClick={() => navigate('/')}
                className="w-full border border-black rounded py-2 text-white font-bold bg-blue-500 hover:bg-blue-800 font-serif"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
