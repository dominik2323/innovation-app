import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import absoluteUrl from '../helpers/absoluteUrl';

export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [cookies, setCookies, removeCookies] = useCookies();
  const [userData, setUserData] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const lang = useRouter().query.lang;

  useEffect(() => {
    async function verifyUser() {
      try {
        const baseUrl = absoluteUrl(null, 'localhost:3000');
        const verifyApi =
          process.env.NODE_ENV === 'production'
            ? `${baseUrl}/api/verify-user`
            : `http://localhost:9999/api/verify-user`;
        const res = await axios.post(
          verifyApi,
          {
            token: cookies.userData,
          },
          {
            headers: {
              contentType: 'application/json',
            },
          }
        );
        setUserData(res.data.userData);
        setLoading(false);
      } catch (e) {
        setUserData(null);
        setLoading(false);
      }
    }
    verifyUser();
  }, [cookies.userData]);

  const isAuthenticated = !!userData;
  const isAllowed = userData && userData[`https://inolog.cz/isAllowed`];

  return (
    <AuthContext.Provider
      value={{
        isAllowed,
        isAuthenticated,
        isLoading,
        logout: () => {
          removeCookies('userData', {
            sameSite: true,
            secure: true,
          });
          Router.push('/[lang]/login', `/${lang}/login`);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
