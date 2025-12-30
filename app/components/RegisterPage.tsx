'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, Mail, Shield, Check, AlertCircle } from 'lucide-react';

interface RegisterPageProps {
  onBackToLogin: () => void;
  onRegisterSuccess: (user: any) => void;
}

export default function RegisterPage({ onBackToLogin, onRegisterSuccess }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    identifier: '',
    password: '',
    fullName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;
    setPasswordStrength(strength);
  };

  const handleRegister = async () => {
    setError('');
    setLoading(true);

    if (!formData.email || !formData.identifier || !formData.password || !formData.fullName) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    // Vérifier que l'identifiant est numérique
    if (!/^\d+$/.test(formData.identifier)) {
      setError('L\'identifiant doit contenir uniquement des chiffres');
      setLoading(false);
      return;
    }

    if (passwordStrength < 2) {
      setError('Le mot de passe doit être plus fort');
      setLoading(false);
      return;
    }

    // Vérifier si l'identifiant existe déjà
    const existingUsers = JSON.parse(localStorage.getItem('bnp_users') || '[]');
    if (existingUsers.some((u: any) => u.identifier === formData.identifier)) {
      setError('Cet identifiant est déjà utilisé');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      // Sauvegarder le nouvel utilisateur dans localStorage
      const newUser = {
        identifier: formData.identifier,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      };
      existingUsers.push(newUser);
      localStorage.setItem('bnp_users', JSON.stringify(existingUsers));

      onRegisterSuccess({
        fullName: formData.fullName,
        identifier: formData.identifier,
        email: formData.email
      });
      setLoading(false);
    }, 1000);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-300';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-orange-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    const texts = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
    return texts[passwordStrength] || 'Très faible';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-800 rounded-full opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10">
          <div className="flex justify-center mb-6 md:mb-8">
            <img src="/bnp_logo.webp" alt="BNP Paribas" className="h-12 md:h-16 object-contain" />
          </div>

          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">Inscription</h2>
            <p className="text-sm md:text-base text-gray-600 text-center">Créez votre compte BNP Paribas</p>
          </div>

          {error && (
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs md:text-sm flex gap-3">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
              <div className="relative">
                <User size={18} className="md:w-5 md:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 md:pl-11 pr-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none text-sm md:text-base"
                  placeholder="Votre nom complet"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="md:w-5 md:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 md:pl-11 pr-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none text-sm md:text-base"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">Identifiant (Numérique)</label>
              <div className="relative">
                <User size={18} className="md:w-5 md:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.identifier}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value.replace(/\D/g, '') })}
                  className="w-full pl-10 md:pl-11 pr-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none text-sm md:text-base"
                  placeholder="Ex: 123456789"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock size={18} className="md:w-5 md:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    checkPasswordStrength(e.target.value);
                  }}
                  className="w-full pl-10 md:pl-11 pr-10 md:pr-12 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none text-sm md:text-base"
                  placeholder="Mot de passe sécurisé"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getPasswordStrengthColor()} transition-all`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Utilisez majuscules, minuscules, chiffres et caractères spéciaux
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-2.5 md:py-3.5 rounded-xl font-semibold text-sm md:text-base hover:from-emerald-700 hover:to-emerald-800 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-3 md:mt-4"
            >
              {loading ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </div>

          <p className="mt-3 md:mt-4 text-xs text-gray-500 text-center">
            En créant un compte, vous acceptez nos <a href="#" className="text-emerald-600 hover:underline">conditions d'utilisation</a>
          </p>

          <div className="mt-4 md:mt-6 text-center border-t border-gray-200 pt-4 md:pt-6">
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">Vous avez déjà un compte ?</p>
            <button
              onClick={onBackToLogin}
              className="w-full text-emerald-600 hover:text-emerald-700 font-semibold text-sm md:text-base hover:underline py-2"
            >
              Se connecter maintenant
            </button>
          </div>
        </div>

        <p className="text-center text-xs md:text-sm text-emerald-100 mt-4 md:mt-6">
          © 2025 BNP Paribas. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}