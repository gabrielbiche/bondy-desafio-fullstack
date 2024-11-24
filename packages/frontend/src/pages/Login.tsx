import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from 'src/hooks/auth/useLogin';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ variables: { email, password } });

      if (response.data?.login) {
        localStorage.setItem('token', response.data.login.token);
        navigate('/user-details');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const renderErrorMessage = () => {
    if (!error || !error.message) return null;

    if (error.message === 'AUTH_LOGIN_ERROR' || error.message === 'USER_NOT_FOUND') {
      return <p style={{ color: 'red' }}>O e-mail ou a senha fornecidos são inválidos. Verifique e tente novamente.</p>;
    }
    
    if (error.message === 'USER_PASS_EMPTY') {
      return <p style={{ color: 'red' }}>A senha é obrigatória. Por favor, forneça a sua senha e tente novamente..</p>;
    }
    
    return <p style={{ color: 'red' }}>Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde.</p>;
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px',  }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '95%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '95%', padding: '8px', marginTop: '5px'}}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
            fontSize: '16px',
          }}
        >
          {loading ? 'Carregando...' : 'Login'}
        </button>
      </form>
      {renderErrorMessage()}
    </div>
  );
};

export default LoginPage;
