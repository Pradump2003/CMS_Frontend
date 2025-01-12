import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../button/Button";

export default function Sidebar() {
  const handleButtonClick = async () => {
    // try {
    //   const response = await axios.post("http://localhost:8080/api/blog", {
    //     title: "test blog 1",
    //     content: "test blog test blog",
    //     author: "Pradum",
    //   });
    //   console.log("Success", response.data);
    //   alert("Blog created successfuly");
    // } catch (error) {
    //   console.log("Error:", error);
    //   alert("An error occures while creating the blog");
    // }
  };

  return (
    <div className="h-screen w-full bg-white">
      <div className="flex justify-end p-4">
        <Button
          onClick={handleButtonClick}
          className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            className="w-4 h-4 me-4 items-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Blog
        </Button>
      </div>
      {/* <div className="grid items-center w-[100%] text-black">
        <table>
          <tr>
            <th> Title</th>
            <th> Content</th>
            <th> Tag</th>
            <th> Writer Name</th>
          </tr>
        </table>
      </div> */}
    </div>
  );
}
