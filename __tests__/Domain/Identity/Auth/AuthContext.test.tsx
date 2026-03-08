import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../../../src/Domain/Identity/Auth/AuthContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should initialize with null user if sessionStorage is empty', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
  });

  it('should initialize with user from sessionStorage if available', () => {
    sessionStorage.setItem('username', 'testuser');
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBe('testuser');
  });

  it('should set user on login', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login('newuser');
    });
    expect(result.current.user).toBe('newuser');
    expect(sessionStorage.getItem('username')).toBe('newuser');
  });

  it('should clear user on logout', () => {
    sessionStorage.setItem('username', 'testuser');
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.logout();
    });
    expect(result.current.user).toBeNull();
    expect(sessionStorage.getItem('username')).toBeNull();
  });

  it('should throw error if useAuth is used outside AuthProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useAuth())).toThrow('useAuth must be used within an AuthProvider');
    consoleSpy.mockRestore();
  });
});
