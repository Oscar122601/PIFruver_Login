import { useState } from 'react'

import appfirebase from './credenciales'

import {getAuth, onAuthStateChanged} from 'firebase/auth'
import './App.css'

const auth = getAuth(appfirebase)

//importar componentes
import Login from './components/Login'
import Home from './components/Home'

function App() {
  const [usuario, setUsuario] = useState(null)
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase){
      setUsuario(usuarioFirebase)
    }
    else
    {
      setUsuario(null)
    }
  })


  return (
    <div>
      {usuario ? <Home  correoUsuario = {usuario.email} /> : <Login/>}
    </div>
  )
}

export default App
