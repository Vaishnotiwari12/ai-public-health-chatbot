import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

/**
 * LOGIN MODAL COMPONENT
 * Reusable login interface for authentication
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback when modal is closed
 * @param {Function} props.onLogin - Callback when login is successful
 * @param {string} [props.currentLanguage='en'] - Current language for translations
 */
const LoginModal = ({ isOpen, onClose, onLogin, currentLanguage = 'en' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const translations = {
    en: {
      title: 'Sign In to Pulse',
      subtitle: 'Access your health command center',
      email: 'Email Address',
      password: 'Password',
      login: 'Sign In',
      cancel: 'Cancel',
      forgotPassword: 'Forgot Password?',
      guestAccess: 'Continue as Guest'
    },
    hi: {
      title: 'पल्स में साइन इन करें',
      subtitle: 'अपने स्वास्थ्य कमांड सेंटर तक पहुंचें',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      login: 'साइन इन',
      cancel: 'रद्द करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      guestAccess: 'गेस्ट के रूप में जारी रखें'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const handleSubmit = (e) => {
    e?.preventDefault();
    console.log('Login attempt:', { email, password });
    // TODO: Implement actual authentication
    onLogin();
  };

  if (!isOpen) return null;

  // Animation classes for smooth transitions with better mobile support
  const modalClasses = `fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-6 transition-opacity duration-300 overflow-y-auto ${
    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`;

  const contentClasses = `bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ${
    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
  }`;

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={modalClasses} onClick={handleBackdropClick}>
      <div className={`${contentClasses} max-h-[90vh] overflow-y-auto`}>
        <div className="p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Icon name="HeartPulse" size={32} color="white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{t?.title}</h2>
            <p className="text-gray-600 text-base">{t?.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                {t?.email}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Mail" size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={currentLanguage === 'hi' ? 'आपका ईमेल' : 'your.email@example.com'}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t?.password}
                </label>
                <button
                  type="button"
                  onClick={() => {}}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {t?.forgotPassword}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Lock" size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e?.target?.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={currentLanguage === 'hi' ? '••••••••' : '••••••••'}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                {t?.login}
              </Button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {currentLanguage === 'hi' ? 'या जारी रखें' : 'Or continue with'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center space-x-2 transition-colors"
            >
              <Icon name="User" size={16} className="text-gray-500" />
              <span>{t?.guestAccess}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
