import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import apiService from './api';
import styles from './LoginApp.module.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [protectedData, setProtectedData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataError, setDataError] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchProtectedData = async () => {
    setIsLoadingData(true);
    setDataError(null);
    
    try {
      const data = await apiService.getProtectedData();
      setProtectedData(data);
    } catch (error) {
      setDataError(error.message);
      console.error('Failed to fetch protected data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };



  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h2 className={styles.welcomeMessage}>
          Welcome, {user?.name}!
        </h2>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Logout
        </button>
      </div>

      <div className={styles.userInfo}>
        <h3 className={styles.userInfoTitle}>Your Account Information</h3>
        <div className={styles.userDetail}>
          <span className={styles.userLabel}>Name:</span>
          <span className={styles.userValue}>{user?.name}</span>
        </div>
        <div className={styles.userDetail}>
          <span className={styles.userLabel}>Email:</span>
          <span className={styles.userValue}>{user?.email}</span>
        </div>
        <div className={styles.userDetail}>
          <span className={styles.userLabel}>User ID:</span>
          <span className={styles.userValue}>{user?.id}</span>
        </div>
      </div>

      <div className={styles.protectedSection}>
        <h3 className={styles.protectedTitle}>Protected API Test</h3>
        <p>Test the authentication system by fetching protected data from the server.</p>
        
        <button
          onClick={fetchProtectedData}
          className={styles.testButton}
          disabled={isLoadingData}
        >
          {isLoadingData ? 'Loading...' : 'Fetch Protected Data'}
        </button>

        {dataError && (
          <div className={styles.globalError}>
            Error: {dataError}
          </div>
        )}

        {protectedData && (
          <div className={styles.protectedData}>
            {JSON.stringify(protectedData, null, 2)}
          </div>
        )}
      </div>

      <div className={styles.protectedSection}>
        <h3 className={styles.protectedTitle}>Authentication Features</h3>
        <ul style={{ paddingLeft: '20px', color: '#666' }}>
          <li>✅ JWT Access Tokens (15 minutes)</li>
          <li>✅ Refresh Tokens (7 days)</li>
          <li>✅ Automatic Token Refresh</li>
          <li>✅ Token Rotation on Refresh</li>
          <li>✅ Secure Password Hashing</li>
          <li>✅ Protected Routes</li>
          <li>✅ Persistent Login Sessions</li>
          <li>✅ Secure Logout (Token Revocation)</li>
        </ul>
      </div>

      <div className={styles.protectedSection}>
        <h3 className={styles.protectedTitle}>Technical Details</h3>
        <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
          <p><strong>Access Token:</strong> Stored in memory, expires in 15 minutes</p>
          <p><strong>Refresh Token:</strong> Stored in localStorage, expires in 7 days</p>
          <p><strong>Auto-refresh:</strong> Happens automatically when access token expires</p>
          <p><strong>Security:</strong> Tokens are rotated on each refresh for maximum security</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;