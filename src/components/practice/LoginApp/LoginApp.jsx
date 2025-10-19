import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Dashboard from './Dashboard';
import styles from './LoginApp.module.css';

// Loading component
const LoadingSpinner = () => (
  <div className={styles.loading}>
    <div className={styles.spinner}></div>
  </div>
);

// Main auth component (inside provider)
const AuthContent = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return showRegister ? (
    <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
  ) : (
    <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
  );
};

// Main LoginApp component
const LoginApp = () => {
  return (
    <div className={styles.container}>
      <AuthProvider>
        <AuthContent />
      </AuthProvider>
    </div>
  );
};

export default LoginApp;