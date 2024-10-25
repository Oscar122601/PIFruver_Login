import React, { useState } from 'react';
import LogoFruver from '../assets/logo-fruver.png'; // Importa la imagen del logo

// Importa Firebase y las funciones de autenticación
import appfirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(appfirebase); // Inicializa la autenticación con Firebase

// Componente principal de Login
const Login = () => {
  const [registrando, setRegistrando] = useState(false); // Estado para alternar entre registro e inicio de sesión
  const [errorMessage, setErrorMessage] = useState(''); // Estado para almacenar mensajes de error de autenticación

  // Función de autenticación, que gestiona el inicio de sesión
  const autenticacion = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const correo = e.target.username.value; // Obtiene el valor del campo de usuario
    const contraseña = e.target.password.value; // Obtiene el valor del campo de contraseña

    try {
      // Reinicia el mensaje de error antes de intentar el inicio de sesión
      setErrorMessage('');
      
      // Lógica para iniciar sesión con Firebase
      await signInWithEmailAndPassword(auth, correo, contraseña);
      console.log('Inicio de sesión exitoso'); // Muestra mensaje en consola si la autenticación es exitosa
    } catch (error) {
      // Maneja diferentes tipos de errores de autenticación
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
        {/* Muestra el logo de la aplicación */}
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

        {/* Muestra mensaje de error si existe alguno */}
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Link a FontAwesome para los iconos */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </div>
    </div>
  );
};

export default Login; // Exporta el componente Login para su uso en otras partes de la aplicación

