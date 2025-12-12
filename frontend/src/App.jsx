import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null); // Aquí se guarda toda la info del usuario (id, name, email)

  return (
    <div>
      {/* Si NO hay usuario, mostramos Login */}
      {!user ? (
        <Login onLogin={(userData) => setUser(userData)} />
      ) : (
        /* IMPORTANTE: Aquí pasamos el usuario al Dashboard para que funcione el Multitenant */
        <Dashboard user={user} />
      )}
    </div>
  );
}

export default App;