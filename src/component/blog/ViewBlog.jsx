import React from 'react';
import Modal from '../Modal';

export default function ViewBlog({ closeModal, id }) {
  return (
    <Modal closeModel={closeModal}>
      <div className="grid text-black gap-2">
        <div>
          <h2 className="font-bold text-xl"> Blog </h2>
        </div>
        <div className="font-bold">
          <p>Tittle : {modalData?.title}</p>
          <p>Content :{modalData?.content}</p>
          <p>Tags : {modalData?.tags}</p>
          <p>Writer : {modalData?.writer}</p>
          <p>Created_at : {modalData?.createdAt}</p>
          <p>Updated_at : {modalData?.updatedAt}</p>
        </div>
      </div>
    </Modal>
  );
}
