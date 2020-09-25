import React, { useState, useEffect, useContext } from 'react';
import { parseCookies, destroyCookie } from 'nookies';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import absoluteUrl from '../helpers/absoluteUrl';

export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const lang = useRouter().query.lang;

  useEffect(() => {
    async function verifyUser() {
      try {
        const baseUrl = absoluteUrl(null, 'localhost:9999');
        const verifyApi = `${baseUrl}api/verify-user`;

        const res = await axios.post(
          verifyApi,
          {
            token: parseCookies().userData,
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
  }, [parseCookies().userData]);

  const isAuthenticated = !!userData;
  const metaData = userData && userData[`https://inolog.cz/isAllowed`];

  return (
    <AuthContext.Provider
      value={{
        isAllowed: metaData?.isAllowed,
        isAuthenticated,
        isBlocked: metaData?.isBlocked,
        isLoading,
        logout: () => {
          destroyCookie({}, 'userData', { path: `/` });
          Router.push(`/${lang}/login`);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
