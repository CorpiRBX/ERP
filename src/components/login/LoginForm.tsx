import React, { useState, FormEvent } from 'react';
import { loginUser } from '../../services/Login/LoginServices';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar que los campos no están vacíos
    if (!username || !password) {
      setErrorMessage('Por favor, ingresa tu usuario y contraseña');
      return;
    }


    try {
      await login(username, password); // Llamamos al servicio de login      
      // setIsAuthenticated(true);
      navigate('/home')
    } catch (error) {
      setErrorMessage('Credenciales inválidas o error al iniciar sesión.');
    }
  };

  return (
    <div className="login-wrapper">
      
      <img
        src="../../../src/assets/logos/LogoRBXRobot.png"
        className="logo-robot"
        alt="Robot"
      />
      <img
        src="../../../src/assets/logos/RBXWhite.jpg"
        className="logo-RBX-White"
        alt="RBX"
      />
      <div
        className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className='icon-position'>
              <img
                src="../../../src/assets/icons/IconUsuario.png"
                className="icon-user"
                alt="User"
              />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
              />
            </div>
          </div>
          <div className="form-group">
            <div className='icon-position'>
              <img
                src="../../../src/assets/icons/IconCandado.png"
                className="icon-user"
                alt="Password"
              />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <a className="container-password-forgotten" href="/register">Has olvidado tu contraseña?</a>
          </div>
          <div className='form-button-container'>
            <button className='button-form' type="submit">Login</button>
          </div>
        </form>
        <div className="error-message-container">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
    
  );
}

export default LoginForm;
