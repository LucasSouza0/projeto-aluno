import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { server } from '../services/api';
import { AuthProps, UserProps, auth, findUser } from '../functions/user';

interface UserLocal {
  id: number;
  name: string;
}

interface AuthContextData {
  user?: UserProps;
  userLocal?: UserLocal;
  login: (props: AuthProps) => Promise<boolean>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigation = useNavigate();
  const [user, setUser] = useState<UserProps>();
  const [userLocal, setUserLocal] = useState<UserLocal>();
  
  const login = useCallback(async (props: AuthProps) => {
    return await auth(props).then(async response => {
      if (!response) {
        return false;
      }

      const { access_token, user } = response;
      (server.defaults.headers as any)['Authorization'] = `Bearer ${access_token}`;

      const tmpUser: UserLocal = {
        id: user.id,
        name: user.name,
      };

      localStorage.setItem('user', JSON.stringify(tmpUser));
      setCookie(undefined, 'app.accessToken', access_token, {
        maxAge: 60 * 60 * 24 * 1, // 1 dia de duração o token do usuário
        path: '/',
      });

      setUser(user);
      setUserLocal(tmpUser);
      return true;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
    setUserLocal(undefined);
    destroyCookie(undefined, 'app.accessToken');
    localStorage.clear();
    navigation('/');
  }, []);

  useEffect(() => {
    const tmpUser = localStorage.getItem('user');
    const { 'app.accessToken': token } = parseCookies();

    if (tmpUser && token) {  
      const tmpUserLocal: UserLocal = JSON.parse(tmpUser);
      setUserLocal(tmpUserLocal);

      findUser(tmpUserLocal.id).then(response => {
        if (!response) {
          logout();
          return;
        }

        const newUser: UserLocal = { 
          id: response.id,
          name: response.name,
        };
  
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(response);
        setUserLocal(newUser);
      });
    } else {
      logout();
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      userLocal,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}
