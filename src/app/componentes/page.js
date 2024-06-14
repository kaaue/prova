"use client"
import NovoPostModal from './NovoPostModal';
import React, { useState, useEffect } from 'react';


const MeuComponente = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [corpo, setCorpo] = useState("");
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);

        if (data.length > 0) {
          setUserId(data[0].userId);
          setId(data[0].id);
          setTitulo(data[0].title);
          setCorpo(data[0].body);
        }
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleNewButtonClick = () => {
    setModalIsOpen(true);
    setEditingPost(null);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
    setEditingPost(null);
  };
  const handleSavePost = (newPost) => {
    setPosts([...posts, newPost]);
    setFilteredPosts([...filteredPosts, newPost]);
  };

  const handleDelete = (postId) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir este post?');
  
    if (confirmed) {
      // Filtra os posts, excluindo o post com o ID fornecido
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
  
      // Filtra os posts filtrados, caso estejam sendo exibidos
      const updatedFilteredPosts = filteredPosts.filter(post => post.id !== postId);
      setFilteredPosts(updatedFilteredPosts);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post); // Define os dados do post a ser editado
    setModalIsOpen(true); // Abre o modal de edição
  };

  const handleSave = (editedPost) => {
    const updatedPosts = posts.map(post =>
      post.id === editedPost.id ? editedPost : post
    );
    setPosts(updatedPosts);

    const updatedFilteredPosts = filteredPosts.map(post =>
      post.id === editedPost.id ? editedPost : post
    );
    setFilteredPosts(updatedFilteredPosts);

    setEditingPost(null);
    setModalIsOpen(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Pesquisar pelo título"
          value={searchTerm}
          onChange={handleSearch}
          style={styles.input}
        />
        <button id="handleNewButtonClick" onClick={handleNewButtonClick} style={styles.button}>Novo</button>
      </div>
      
      <h1 style={styles.title}>Lista de Posts</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>UserId</th>
            <th>Id</th>
            <th>Título</th>
            <th>Corpo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map(post => (
            <tr key={post.id}>
              <td>{post.userId}</td>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <button onClick={() => handleEdit(post)} style={styles.editButton}>Editar</button>
                <button onClick={() => handleDelete(post.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <NovoPostModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        onSave={handleSavePost}
        editingPost={editingPost}
        onSaveEditedPost={handleSave} // Passando a função para salvar a edição
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '600px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    maxWidth: '800px',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  editButton: {
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
  },
};

export default MeuComponente;
