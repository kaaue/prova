"use client"


import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#handleNewButtonClick'); // Define o elemento raiz para acessibilidade

const NovoPostModal = ({ isOpen, onClose, onSave, initialValues }) => {
  const [newPost, setNewPost] = useState(initialValues || {
    userId: '',
    title: '',
    body: '',
  });

  useEffect(() => {
    setNewPost(initialValues || { userId: '', title: '', body: '' });
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPost(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(newPost);
    setNewPost({ userId: '', title: '', body: '' });
    onClose();
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '80%',
      maxHeight: '80%',
      overflow: 'auto',
      padding: '20px',
    },
  };

  const inputStyles = {
    marginBottom: '10px',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  };

  const buttonStyles = {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '20px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Novo Post"
    >
      <h2>Novo Post</h2>
      <input
        type="text"
        id="userId"
        name="userId"
        value={newPost.userId}
        onChange={handleChange}
        placeholder="UserId"
        style={inputStyles}
      />
      <br />
      <input
        type="text"
        id="title"
        name="title"
        value={newPost.title}
        onChange={handleChange}
        placeholder="Título"
        style={inputStyles}
      />
      <br />
      <textarea
        id="body"
        name="body"
        value={newPost.body}
        onChange={handleChange}
        placeholder="Corpo"
        rows="4"
        style={inputStyles}
      />
      <br />
      <button onClick={handleSave} style={{ ...buttonStyles, backgroundColor: '#007bff', color: '#fff' }}>Salvar</button>
      <button onClick={onClose} style={{ ...buttonStyles, backgroundColor: '#dc3545', color: '#fff' }}>Cancelar</button>
    </Modal>
  );
};

export default NovoPostModal;

