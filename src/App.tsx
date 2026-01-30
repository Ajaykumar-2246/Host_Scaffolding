import React from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from './pages/common/ErrorBoundary';
import AppRoutes from './pages/content/Routes';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <header style={{
          background: '#282c34',
          padding: '20px',
          color: 'white',
        }}>
          <h1>MFE Host Application</h1>
          <nav>
            <Link to="/" style={{ color: 'white', marginRight: '20px' }}>
              Home
            </Link>
            <Link to="/about" style={{ color: 'white', marginRight: '20px' }}>
              About
            </Link>
            <Link to="/dashboard" style={{ color: 'white' }}>
              Dashboard
            </Link>
          </nav>
        </header>

        <main style={{ padding: '20px' }}>
          <AppRoutes />
        </main>

        <footer style={{
          background: '#f1f1f1',
          padding: '10px',
          textAlign: 'center',
          marginTop: '40px',
        }}>
          <p>© 2026 MFE Host Application</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;
