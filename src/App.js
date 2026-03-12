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
      <div className="login-container" style={{backgroundColor: '#000', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
        <form onSubmit={handleLogin} style={{background: '#111', padding: '40px', borderRadius: '12px', border: '1px solid #ffd900', textAlign: 'center'}}>
          <h2 style={{color: '#ffd900'}}>MATRIZ SRT 2026</h2>
          <input type="text" placeholder="Usuario" onChange={(e) => setUser(e.target.value)} style={{display: 'block', margin: '10px auto', padding: '10px'}} required />
          <input type="password" placeholder="Contraseña" onChange={(e) => setPass(e.target.value)} style={{display: 'block', margin: '10px auto', padding: '10px'}} required />
          <button type="submit" style={{background: '#ffd900', color: 'black', padding: '10px 20px', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>INGRESAR</button>
        </form>
      </div>
    );
  }

  return (
    <div className="dashboard" style={{backgroundColor: '#000', minHeight: '100vh', color: 'white', padding: '20px'}}>
      <header style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px'}}>
        <h1>ASISTENCIA CANGURO 2026</h1>
        <button onClick={() => setIsLoggedIn(false)} style={{background: 'red', color: 'white', border: 'none', padding: '5px 15px', cursor: 'pointer'}}>Salir</button>
      </header>
      <div className="grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px'}}>
        {personal.length > 0 ? personal.map(p => (
          <div key={p.id} onClick={() => toggleAsistencia(p.id, p.estado)} style={{background: '#222', padding: '15px', borderRadius: '8px', cursor: 'pointer', border: p.estado === 'PRESENTE' ? '2px solid green' : '2px solid red'}}>
            <h3>{p.nombre}</h3>
            <p>{p.puesto}</p>
            <strong>{p.estado}</strong>
          </div>
        )) : <p>No hay personal cargado en Firebase...</p>}
      </div>
    </div>
  );
}

export default App;
