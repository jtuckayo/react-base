// API configuration and methods for authentication
const API_BASE_URL = "http://localhost:3001";

class ApiService {
  constructor() {
    this.accessToken = null;
    this.refreshToken = localStorage.getItem("refreshToken");
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  // Set tokens
  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  }

  // Clear tokens
  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem("refreshToken");
  }

  // Get stored refresh token
  getRefreshToken() {
    return this.refreshToken || localStorage.getItem("refreshToken");
  }

  // Process failed queue after token refresh
  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }

  // Refresh access token
  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      this.setTokens(data.accessToken, data.refreshToken);

      return data.accessToken;
    } catch (error) {
      this.clearTokens();
      throw error;
    }
  }

  // Make authenticated request with automatic token refresh
  async request(url, options = {}) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add access token if available
    if (this.accessToken) {
      config.headers.Authorization = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, config);

    // If token is expired, try to refresh
    if (response.status === 403 && this.getRefreshToken()) {
      if (this.isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject });
        }).then(() => {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
          return fetch(`${API_BASE_URL}${url}`, config);
        });
      }

      this.isRefreshing = true;

      try {
        const newAccessToken = await this.refreshAccessToken();
        this.isRefreshing = false;
        this.processQueue(null, newAccessToken);

        // Retry original request with new token
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return fetch(`${API_BASE_URL}${url}`, config);
      } catch (refreshError) {
        this.isRefreshing = false;
        this.processQueue(refreshError, null);
        throw refreshError;
      }
    }

    return response;
  }

  // Authentication methods
  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    this.setTokens(data.accessToken, data.refreshToken);
    return data;
  }

  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    this.setTokens(data.accessToken, data.refreshToken);
    return data;
  }

  async logout() {
    const refreshToken = this.getRefreshToken();

    if (refreshToken) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (error) {
        console.error("Logout request failed:", error);
      }
    }

    this.clearTokens();
  }

  async getCurrentUser() {
    const response = await this.request("/auth/me");

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to get user");
    }

    return response.json();
  }

  async getProtectedData() {
    const response = await this.request("/api/protected");

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to get protected data");
    }

    return response.json();
  }
}

export default new ApiService();
