'use client';

import React, { useState, useEffect } from 'react';

interface Credentials {
  identifier: string;
  password: string;
}

interface LoginPageProps {
  onLoginSuccess: (user: any) => void;
  onGoToRegister: () => void;
}

// Base de données simple d'utilisateurs par défaut (pour démo)
const DEFAULT_USERS = [
  { identifier: '123456789', email: 'test@bnpparibas.fr', password: 'BNP2024!', fullName: 'BNP Paribas' },
  { identifier: '987654321', email: 'pro@example.com', password: 'Secure123!', fullName: 'Client Professionnel' },
  { identifier: '555666777', email: 'demo@bnp.fr', password: 'Demo2024!', fullName: 'Demo User' }
];

export default function LoginPage({ onLoginSuccess, onGoToRegister }: LoginPageProps) {
  const [credentials, setCredentials] = useState<Credentials>({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validUsers, setValidUsers] = useState<any[]>([]);

  // Charger les utilisateurs depuis localStorage à la première visite
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('bnp_users') || '[]');
    setValidUsers([...DEFAULT_USERS, ...storedUsers]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!credentials.identifier || !credentials.password) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      // Chercher l'utilisateur par identifier et vérifier le mot de passe
      const user = validUsers.find(u => 
        u.identifier === credentials.identifier &&
        u.password === credentials.password
      );

      if (!user) {
        setError('Identifiant ou mot de passe incorrect');
        setLoading(false);
        return;
      }

      // Connexion réussie
      onLoginSuccess({
        email: user.email,
        fullName: user.fullName,
        identifier: user.identifier
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body, html {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .login-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #00965e 0%, #006b45 50%, #004d35 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .login-stars {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          opacity: 0.6;
          animation: twinkle 3s infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        .login-container {
          position: relative;
          z-index: 10;
          background: white;
          padding: 48px 40px;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 420px;
          width: 90%;
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .login-logo {
          height: 60px;
          width: auto;
          object-fit: contain;
          margin-bottom: 20px;
        }

        .login-title {
          font-size: 28px;
          font-weight: 700;
          color: #00965e;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .login-subtitle {
          font-size: 14px;
          color: #999;
          font-weight: 500;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 700;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 14px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: #00965e;
          box-shadow: 0 0 0 3px rgba(0, 150, 94, 0.1);
        }

        .form-input::placeholder {
          color: #ccc;
        }

        .form-icon {
          position: absolute;
          left: 12px;
          width: 16px;
          height: 16px;
          color: #999;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: #999;
          padding: 4px 8px;
          transition: color 0.3s ease;
          font-size: 16px;
        }

        .password-toggle:hover {
          color: #00965e;
        }

        .error-message {
          font-size: 13px;
          color: #c91f16;
          background: #fff5f5;
          padding: 12px;
          border-radius: 6px;
          border-left: 3px solid #c91f16;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-button {
          padding: 14px;
          background: linear-gradient(135deg, #00965e 0%, #006b45 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 150, 94, 0.2);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 8px;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 150, 94, 0.3);
        }

        .login-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 20px 0;
          color: #ccc;
          font-size: 13px;
        }

        .login-divider::before,
        .login-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e0e0e0;
        }

        .login-footer {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e0e0e0;
          text-align: center;
          font-size: 13px;
          color: #666;
        }

        .login-link {
          color: #00965e;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.3s ease;
          background: none;
          border: none;
          padding: 0;
        }

        .login-link:hover {
          color: #006b45;
          text-decoration: underline;
        }

        .security-notice {
          background: #f0f8ff;
          border: 1px solid #cce7ff;
          padding: 14px;
          border-radius: 6px;
          font-size: 12px;
          color: #0066cc;
          line-height: 1.5;
          margin-top: 16px;
        }

        .security-notice strong {
          font-weight: 700;
          color: #004499;
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 28px 18px;
          }

          .login-logo {
            height: 48px;
            margin-bottom: 16px;
          }

          .login-title {
            font-size: 22px;
            margin-bottom: 6px;
          }

          .login-subtitle {
            font-size: 13px;
          }

          .login-header {
            margin-bottom: 28px;
          }

          .login-form {
            gap: 16px;
          }

          .form-group {
            gap: 6px;
          }

          .form-label {
            font-size: 12px;
            letter-spacing: 0.4px;
          }

          .form-input {
            padding: 11px 14px 11px 36px;
            font-size: 13px;
            border-width: 1.5px;
          }

          .form-icon {
            left: 10px;
            width: 14px;
            height: 14px;
          }

          .password-toggle {
            right: 10px;
            padding: 3px 6px;
            font-size: 14px;
          }

          .error-message {
            font-size: 12px;
            padding: 10px;
            border-radius: 4px;
          }

          .login-button {
            padding: 12px;
            font-size: 14px;
            letter-spacing: 0.3px;
            margin-top: 6px;
          }

          .login-divider {
            gap: 12px;
            margin: 16px 0;
            font-size: 12px;
          }

          .login-footer {
            gap: 12px;
            margin-top: 16px;
            padding-top: 16px;
            font-size: 12px;
          }

          .login-link {
            font-size: 12px;
          }

          .security-notice {
            padding: 10px;
            font-size: 11px;
            margin-top: 12px;
            line-height: 1.4;
          }
        }
      `}</style>

      <div className="login-wrapper" style={styles.loginWrapper}>
        <div className="login-stars" style={styles.loginStars}>
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's'
              }}
            />
          ))}
        </div>

        <div className="login-container" style={styles.loginContainer}>
          <div className="login-header" style={styles.loginHeader}>
            <img src="/bnp-Logo.png" alt="BNP Paribas" className="login-logo" style={styles.loginLogo} />
            <h1 className="login-title" style={styles.loginTitle}>BNP Paribas</h1>
            <p className="login-subtitle" style={styles.loginSubtitle}>Accès sécurisé à vos comptes</p>
          </div>

          <form className="login-form" onSubmit={handleLogin} style={styles.loginForm}>
            {error && <div className="error-message" style={styles.errorMessage}>{error}</div>}

            <div className="form-group" style={styles.formGroup}>
              <label className="form-label" style={styles.formLabel}>Identifiant</label>
              <div className="form-input-wrapper" style={styles.formInputWrapper}>
                <svg className="form-icon" style={styles.formIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input
                  type="text"
                  name="identifier"
                  value={credentials.identifier}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="votre numéro d'identifiant"
                  disabled={loading}
                  style={styles.formInput}
                />
              </div>
            </div>

            <div className="form-group" style={styles.formGroup}>
              <label className="form-label" style={styles.formLabel}>Mot de passe</label>
              <div className="form-input-wrapper" style={styles.formInputWrapper}>
                <svg className="form-icon" style={styles.formIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                  disabled={loading}
                  style={styles.formInput}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                >
                  {showPassword ? 'Masquer' : 'Afficher'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="login-button" style={styles.loginButton}>
              {loading ? 'Connexion en cours...' : 'Se Connecter'}
            </button>
          </form>

          <div className="login-divider" style={styles.loginDivider}>Ou</div>

          <div className="login-footer" style={styles.loginFooter}>
            <div>
              Vous n'avez pas de compte ?{' '}
              <button className="login-link" onClick={onGoToRegister} style={styles.loginLink}>
                S'inscrire
              </button>
            </div>
            <button className="login-link" style={styles.loginLink}>
              Mot de passe oublié ?
            </button>
          </div>

          <div className="security-notice" style={styles.securityNotice}>
            Vos informations sont protégées
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'" } as React.CSSProperties,
  loginWrapper: { minHeight: '100vh', background: 'linear-gradient(135deg, #00965e 0%, #006b45 50%, #004d35 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' } as React.CSSProperties,
  loginStars: { position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 1 } as React.CSSProperties,
  loginContainer: { position: 'relative', zIndex: 10, background: 'white', padding: '32px 28px', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)', maxWidth: '380px', width: '90%' } as React.CSSProperties,
  loginHeader: { textAlign: 'center', marginBottom: '28px' } as React.CSSProperties,
  loginLogo: { height: '80px', width: 'auto', objectFit: 'contain', marginBottom: '16px', margin: '0 auto 16px auto', display: 'block' } as React.CSSProperties,
  loginTitle: { fontSize: '24px', fontWeight: 700, color: '#00965e', marginBottom: '8px', letterSpacing: '-0.5px' } as React.CSSProperties,
  loginSubtitle: { fontSize: '13px', color: '#999', fontWeight: 500 } as React.CSSProperties,
  loginForm: { display: 'flex', flexDirection: 'column', gap: '18px' } as React.CSSProperties,
  formGroup: { display: 'flex', flexDirection: 'column', gap: '7px' } as React.CSSProperties,
  formLabel: { fontSize: '12px', fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: '0.5px' } as React.CSSProperties,
  formInputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' } as React.CSSProperties,
  formInput: { width: '100%', padding: '11px 16px 11px 38px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '13px', transition: 'all 0.3s ease', fontFamily: 'inherit' } as React.CSSProperties,
  formIcon: { position: 'absolute', left: '12px', width: '16px', height: '16px', color: '#999', pointerEvents: 'none' } as React.CSSProperties,
  passwordToggle: { position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#00965e', padding: '4px 8px', transition: 'color 0.3s ease', fontSize: '11px', fontWeight: 600, display: 'block' } as React.CSSProperties,
  errorMessage: { fontSize: '12px', color: '#c91f16', background: '#fff5f5', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #c91f16' } as React.CSSProperties,
  loginButton: { padding: '13px', background: 'linear-gradient(135deg, #00965e 0%, #006b45 100%)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(0, 150, 94, 0.2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '8px' } as React.CSSProperties,
  loginDivider: { display: 'flex', alignItems: 'center', gap: '16px', margin: '16px 0', color: '#ccc', fontSize: '12px' } as React.CSSProperties,
  loginFooter: { display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e0e0e0', textAlign: 'center', fontSize: '12px', color: '#666' } as React.CSSProperties,
  loginLink: { color: '#00965e', textDecoration: 'none', fontWeight: 600, cursor: 'pointer', transition: 'color 0.3s ease', background: 'none', border: 'none', padding: 0 } as React.CSSProperties,
  securityNotice: { background: '#f0f8ff', border: '1px solid #cce7ff', padding: '12px', borderRadius: '6px', fontSize: '11px', color: '#0066cc', lineHeight: '1.5', marginTop: '14px', textAlign: 'center' } as React.CSSProperties
};