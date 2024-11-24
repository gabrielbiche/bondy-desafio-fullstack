import React from 'react';
import { GET_ME_QUERY } from '../graphql/queries/me';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const UserDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_ME_QUERY);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate("/");
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro: {error.message}</p>;

  const { me } = data;

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Detalhes do Usuário</h1>

      <div style={{ marginTop: '20px', marginLeft: '5px' }}>
        <p><strong>Nome:</strong> {me?.name}</p>
        <p><strong>Email:</strong> {me?.email}</p>
        <p><strong>Empresa:</strong> {me?.company}</p>
      </div>

      <button
        onClick={handleLogout}
        style={{
          display: 'block',
          width: '100%',
          padding: '10px',
          marginTop: '20px',
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Sair
      </button>
    </div>
  );
};

export default UserDetailsPage;
