import React, { useState, useEffect } from 'react';
import { database } from './firebase'; // Asegúrate de tener el archivo firebase.js o intégralo aquí
import { ref, onValue, set } from "firebase/database";
import { User, Lock, CheckCircle, XCircle, Clock } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [asistencia, setAsistencia] = useState({});

  // Credenciales fijas
  const handleLogin = (e) => {
    e.preventDefault();
    if (user === 'ADMCanguro' && pass === 'SRT2026') {
      setIsLoggedIn(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-box">
          <h2>MATRIZ SRT 2026</h2>
          <div className="input-group">
            <User size={20} />
            <input type="text" placeholder="Usuario" onChange={(e) => setUser(e.target.value)} />
          </div>
          <div className="input-group">
            <Lock size={20} />
            <input type="password" placeholder="Contraseña" onChange={(e) => setPass(e.target.value)} />
          </div>
          <button type="submit">INGRESAR</button>
        </form>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header>
        <h1>CONTROL DE ASISTENCIA CANGURO 2026</h1>
        <button onClick={() => setIsLoggedIn(false)}>Cerrar Sesión</button>
      </header>
      <div className="grid-personal">
        {/* Aquí mapearías los datos de Firebase */}
        <p style={{color: 'white'}}>Conectado a la base de datos en tiempo real...</p>
      </div>
    </div>
  );
}

export default App;
