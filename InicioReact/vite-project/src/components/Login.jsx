import React, { useState } from 'react';
import LogoFruver from '../assets/logo-fruver.png';

import appfirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(appfirebase);

const Login = () => {
  const [registrando, setRegistrando] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  const autenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.username.value;
    const contraseña = e.target.password.value;

    try {
      // Reiniciamos el estado del mensaje de error antes de intentar el inicio de sesión
      setErrorMessage('');
      // Lógica para iniciar sesión
      await signInWithEmailAndPassword(auth, correo, contraseña);
      console.log('Inicio de sesión exitoso');
    } catch (error) {
      // Aquí puedes controlar el tipo de error
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('La contraseña es incorrecta.');
      } else if (error.code === 'auth/user-not-found') {
        setErrorMessage('El usuario no existe.');
      } else {
        setErrorMessage('Error al iniciar sesión. Verifica tus datos.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={LogoFruver} alt="Logo" className="logo-login" />
        <h1>Iniciar Sesión</h1>
        
        {/* Formulario de inicio de sesión */}
        <form onSubmit={autenticacion}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Ingrese su usuario"
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
          />

          <button type="submit">Ingresar</button>
        </form>

        {/* Mostrar mensaje de error si hay uno */}
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Link a FontAwesome para iconos */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </div>
    </div>
  );
};

export default Login;
