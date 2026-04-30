const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = {
  // Generic request handler
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  },

  // Auth endpoints
  auth: {
    register(username, email, password) {
      return api.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });
    },

    login(username, password) {
      return api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }).then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('currentUser', JSON.stringify({
            userId: data.userId,
            username: data.username,
            email: data.email,
            role: data.role,
          }));
        }
        return data;
      });
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
    },

    getCurrentUser() {
      return api.request('/auth/me');
    },

    isLoggedIn() {
      return !!localStorage.getItem('token');
    },

    getToken() {
      return localStorage.getItem('token');
    }
  },

  // College endpoints
  colleges: {
    getAll(region = 'all') {
      const query = region && region !== 'all' ? `?region=${encodeURIComponent(region)}` : '';
      return api.request(`/colleges${query}`);
    },

    search(query) {
      return api.request(`/colleges/search?query=${encodeURIComponent(query)}`);
    },

    getDetails(slug) {
      return api.request(`/colleges/${encodeURIComponent(slug)}`);
    },

    compare(name) {
      return api.request(`/colleges/compare?name=${encodeURIComponent(name)}`);
    }
  },

  // Notification endpoints
  notifications: {
    registerDevice(token, deviceType = 'WEB', deviceName = navigator.userAgent) {
      return api.request('/notifications/register-device', {
        method: 'POST',
        body: JSON.stringify({ token, deviceType, deviceName }),
      });
    },

    unregisterDevice(token) {
      return api.request('/notifications/unregister-device', {
        method: 'POST',
        body: JSON.stringify({ token }),
      });
    },

    getDevices() {
      return api.request('/notifications/devices');
    },

    sendNotification(title, body, imageUrl = '') {
      return api.request('/notifications/send', {
        method: 'POST',
        body: JSON.stringify({ title, body, imageUrl }),
      });
    }
  },

  // Admin endpoints
  admin: {
    getUsers() {
      return api.request('/admin/users');
    }
  },

  // Social Media endpoints
  social: {
    getShareLinks(url, title = '') {
      return api.request(`/social/share-links?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
    },

    getFacebookShareUrl(url) {
      return api.request(`/social/share/facebook?url=${encodeURIComponent(url)}`);
    },

    getTwitterShareUrl(url, title = '') {
      return api.request(`/social/share/twitter?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
    },

    getLinkedInShareUrl(url) {
      return api.request(`/social/share/linkedin?url=${encodeURIComponent(url)}`);
    },

    getWhatsAppShareUrl(url, title = '') {
      return api.request(`/social/share/whatsapp?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
    },

    getRedditShareUrl(url, title = '') {
      return api.request(`/social/share/reddit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
    }
  }
};

export default api;
