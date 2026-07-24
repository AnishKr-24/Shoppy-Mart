/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const parseErrorMessage = async (response, fallback) => {
  try {
    const data = await response.json();
    return data.message || fallback;
  } catch {
    return fallback;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(() => !!localStorage.getItem('user'));

  useEffect(() => {
    const refreshUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setLoading(false);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        if (!parsedUser?.token) {
          setLoading(false);
          return;
        }

        const response = await fetch('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`
          }
        });

        if (!response.ok) {
          localStorage.removeItem('user');
          setUser(null);
          return;
        }

        const freshUser = await response.json();
        const nextUser = { ...parsedUser, ...freshUser };
        setUser(nextUser);
        localStorage.setItem('user', JSON.stringify(nextUser));
      } catch (error) {
        console.error('Error refreshing user:', error);
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    refreshUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await parseErrorMessage(response, 'Login failed');
        return { success: false, error };
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Unable to connect to the server. Please try again.' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        const error = await parseErrorMessage(response, 'Signup failed');
        return { success: false, error };
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Unable to connect to the server. Please try again.' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        const updatedUser = { ...user, ...updatedUserData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true, user: updatedUser };
      } else {
        const error = await parseErrorMessage(response, 'Update failed');
        return { success: false, error };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Unable to connect to the server. Please try again.' };
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthContext;
