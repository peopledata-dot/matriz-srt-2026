import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, onValue, set } from "firebase/database";
import { User, Lock, LogOut, CheckCircle, XCircle } from 'lucide-react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [personal, setPersonal] = useState([]);

  // Cargar datos de Firebase
  useEffect(() => {
    if (isLoggedIn) {
      const personalRef = ref(database, 'asistencia');
      onValue(personalRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const lista = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          setPersonal(lista);
        }
      });
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === 'ADMCanguro' && pass === 'SRT2026') {
      setIsLoggedIn(true);
    } else {
      alert('Error: Usuario o Clave incorrectos');
    }
  };

  const toggleAsistencia = (id, estadoActual) => {
    const nuevoEstado = estadoActual === 'PRESENTE' ? 'AUSENTE' : 'PRESENTE';
    set(ref(database, `asistencia/${id}/estado`), nuevoEstado);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-box">
          <h2 style={{color: '#ffd900', marginBottom: '20px'}}>MATRIZ SRT 2026</h2>
          <div className="input-group">
            <User size={20} color="#ffd900" />
            <input type="text" placeholder="Usuario" onChange={(e) => setUser(e.target.value)} required />
          </div>
          <div className="input-group">
            <Lock size={20} color="#ffd900" />
            <input type="password" placeholder="Contraseña" onChange={(e) => setPass(e.target.value)} required />
          </div>
          <button type="submit" className="btn-login">INGRESAR AL SISTEMA</button>
        </form>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="header">
        <h1>CONTROL DE ASISTENCIA CANGURO 2026</h1>
        <button onClick={() => setIsLoggedIn(false)} className="btn-logout">
          <LogOut size={18} /> Salir
        </button>
      </header>
      
      <div className="grid-container">
        {personal.length > 0 ? (
          personal.map((p) => (
            <div key={p.id} className={`card ${p.estado === 'PRESENTE' ? 'presente' : 'ausente'}`} onClick={() => toggleAsistencia(p.id, p.estado)}>
              <div className="card-info">
                <span className="nombre">{p.nombre}</span>
                <span className="puesto">{p.puesto}</span>
              </div>
              <div className="status-icon">
                {p.estado === 'PRESENTE' ? <CheckCircle color="#00ff00" /> : <XCircle color="#ff0000" />}
              </div>
            </div>
          ))
        ) : (
          <p style={{textAlign: 'center', width: '100%'}}>Cargando personal de Firebase...</p>
        )}
      </div>
    </div>
  );
}

export default App;
