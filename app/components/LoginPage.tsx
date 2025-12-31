'use client';

import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: (user: any) => void;
  onGoToRegister: () => void;
}

export default function LoginPage({
  onLoginSuccess,
  onGoToRegister,
}: LoginPageProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Vérifier d'abord les utilisateurs créés dans localStorage
      const savedUsers = JSON.parse(localStorage.getItem('bpm_users') || '[]');
      const user = savedUsers.find((u: any) => u.identifier === identifier);

      // Si l'utilisateur existe dans localStorage
      if (user && user.password === password) {
        onLoginSuccess({ 
          identifier, 
          email: user.email,
          fullName: user.fullName
        });
        setLoading(false);
        return;
      }

      // Sinon, vérifier les identifiants par défaut
      if (identifier !== '123456789' || password !== 'BPM2024!') {
        setError('Identifiant ou mot de passe incorrect');
        setLoading(false);
        return;
      }

      onLoginSuccess({ identifier, email: 'demo@agricole.com', fullName: 'Utilisateur Démo' });
      setLoading(false);
    }, 900);
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
        }

        body {
          background: #f5f7fa;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ffffff 0%, #f0f8f4 15%, #00873e 30%, #005f31 50%, #f0f8f4 70%, #00873e 85%, #ffffff 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          position: relative;
          overflow: hidden;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .login-page::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(0, 135, 62, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 95, 49, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(0, 135, 62, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 40%);
          animation: float 20s ease-in-out infinite;
          pointer-events: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -30px) rotate(180deg); }
        }
        
        .login-page::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.05) 35px, rgba(255, 255, 255, 0.05) 70px),
            repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(0, 95, 49, 0.03) 35px, rgba(0, 95, 49, 0.03) 70px);
          pointer-events: none;
        }
        
        .login-page > .login-card {
          position: relative;
          z-index: 10;
        }

        .login-card {
          background: #ffffff;
          width: 360px;
          padding: 40px 36px;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          text-align: center;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-card:hover {
          box-shadow: 0 25px 60px rgba(0,0,0,0.15);
        }

        .login-logo {
          height: 80px;
          margin-bottom: 24px;
          display: block;
          margin-left: auto;
          margin-right: auto;
          object-fit: contain;
        }

        h1 {
          color: #005f31;
          font-size: 22px;
          margin-bottom: 6px;
        }

        .subtitle {
          font-size: 13px;
          color: #555;
          margin-bottom: 24px;
        }

        .error {
          background: #f0f8f4;
          color: #d4641b;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 14px;
          font-size: 13px;
          border-left: 3px solid #d4641b;
        }

        .field {
          margin-bottom: 18px;
          position: relative;
        }

        .field input {
          width: 100%;
          padding: 13px 40px 13px 12px;
          border-radius: 8px;
          border: 1.5px solid #ddd;
          font-size: 14px;
        }

        .field input:focus {
          outline: none;
          border-color: #005f31;
          box-shadow: 0 0 0 3px rgba(0, 95, 49, 0.1);
        }

        .field-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 12px;
          color: #005f31;
          border: none;
          background: none;
        }

        .submit {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #005f31 0%, #00873e 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 95, 49, 0.2);
        }

        .submit:hover {
          background: linear-gradient(135deg, #00873e 0%, #006837 100%);
          box-shadow: 0 6px 16px rgba(0, 95, 49, 0.3);
        }

        .submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .links {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .links button {
          border: none;
          background: none;
          color: #005f31;
          font-weight: 600;
          cursor: pointer;
          font-size: 13px;
        }

        .links button:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-card {
            width: 90%;
            padding: 30px 24px;
          }
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <img src="/agricole.webp" alt="Banque Agricole" className="login-logo" />
          <h1>Banque Agricole</h1>
          <p className="subtitle">Accédez à vos comptes en toute sécurité</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="field">
              <input
                type="text"
                placeholder="Identifiant"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="field">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="field-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Masquer' : 'Afficher'}
              </button>
            </div>

            <button className="submit" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="links">
            <button onClick={onGoToRegister}>Créer un compte</button>
            <button>Mot de passe oublié ?</button>
          </div>
        </div>
      </div>
    </>
  );
}
