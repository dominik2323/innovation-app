import React from 'react';
import App from 'next/app';
import dynamic from 'next/dynamic';
import Div100vh from 'react-div-100vh';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { withCookies, Cookies } from 'react-cookie';

import '../scss/index.scss';

import { initializeStore } from '../store/reducer';
import DataContextProvider from '../helpers/dataContext';
import { fetchData } from '../helpers/fetchData';
import { appLangs } from '../helpers/consts';

import { AuthProvider } from '../hocs/auth';
import absoluteUrl from '../helpers/absoluteUrl';
import { getPreferableLang } from '../helpers/getPreferableLang';

// components
// ? workaround – useRouter in Navbar component is not defined on server
const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });

class MyApp extends App {
  static async getInitialProps({ ctx }) {
    if (!ctx.req) return;

    // prepare regex of avaible languages
    // and check if lang in req matched with avaible langs
    const appLangsRegex = new RegExp(`^\/(${Object.keys(appLangs).join('|')})`);
    const matchLang = ctx.req.url.match(appLangsRegex);

    if (matchLang) {
      const data = await fetchData(ctx.req, appLangs[matchLang[1]]);
      const baseUrl = absoluteUrl(ctx.req);

      return { data, baseUrl: baseUrl };
    } else {
      ctx.res.writeHead(302, {
        Location: `/${getPreferableLang(ctx) + ctx.req.url}`,
      });
      ctx.res.end();
    }
  }

  render() {
    const { Component, pageProps, store, router, data, baseUrl } = this.props;

    return (
      <DataContextProvider
        innovations={data?.innovations}
        humans={data?.humans}
        about={data?.about}
      >
        <AuthProvider>
          <Provider store={store}>
            <Div100vh
              style={{
                position: 'absolute',
                inset: '0 0 0 0',
                width: `100vw`,
                height: `100rvh`,
                overflow: `hidden`,
              }}
            >
              <Component {...pageProps} key={router.pathname} />
            </Div100vh>
          </Provider>
        </AuthProvider>
      </DataContextProvider>
    );
  }
}

export default withRedux(initializeStore)(withCookies(MyApp));
