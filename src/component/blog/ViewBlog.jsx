import React from 'react';
import Modal from '../Modal';

export default function ViewBlog({ closeModal, modalData }) {
  return (
    <Modal closeModel={closeModal}>
      <h1 className="font-bold text-xl text-black my-4 font-serif"> Blog </h1>
      <div className="overflow-auto border-2 rounded-lg border-black">
        <table className="text-black w-full font-serif">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2 ">
                Field{' '}
              </th>
              <th className="border border-black px-4 py-2 ">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-4 py-2 font-bold text-center">
                Tittle
              </td>
              <td className="border border-black px-4 text-center">
                {modalData?.title}
              </td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2 font-bold text-center">
                Content
              </td>
              <td className="border border-black px-4 py-2 text-center">
                {modalData?.content}
              </td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2 font-bold text-center">
                Tags
              </td>
              <td className="border border-black px-4 py-2 text-center">
                {modalData?.tags}
              </td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2 font-bold text-center">
                Writer
              </td>
              <td className="border border-black px-4 py-2 text-center">
                {modalData?.writer}
              </td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2 font-bold text-center">
                Created_at
              </td>
              <td className="border border-black px-4 py-2 text-center">
                {new Date(modalData?.createdAt).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border border-black px-4 py-2 font-bold text-center">
                Updated_at
              </td>
              <td className="border border-black px-4 py-2 text-center">
                {new Date(modalData?.updatedAt).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
