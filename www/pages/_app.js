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
import { appLangs, defaultAppLang } from '../helpers/consts';

import { Auth0Provider } from '../helpers/auth';
import authConfig from '../helpers/auth0.config.json';
import absoluteUrl from '../helpers/absoluteUrl';

// components
// ? workaround – useRouter in Navbar component is not defined on server
const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });

class MyApp extends App {
  static async getInitialProps({ ctx }) {
    if (ctx.req) {
      const appLangsRegex = new RegExp(
        `^\/(${Object.keys(appLangs).join('|')})`
      );
      const matchLang = ctx.req.url.match(appLangsRegex);
      const baseUrl = absoluteUrl(ctx.req);

      if (matchLang) {
        const data = await fetchData(ctx.req, appLangs[matchLang[1]]);
        return { data, baseUrl: baseUrl };
      } else {
        /*
        > if the first two letters in uri doesnt match the applangs and we are on the server,
        > then try to redirect user with his url to the localized page
       */
        const browserLanguages = ctx.req.headers['accept-language'].match(
          /[a-z]{2}/g
        );
        const bestLang = Object.keys(appLangs).find(lang =>
          browserLanguages.includes(lang)
        );
        ctx.res.writeHead(302, {
          Location: `/${bestLang + ctx.req.url}`,
        });
        ctx.res.end();
      }
    }
  }

  render() {
    const {
      Component,
      pageProps,
      store,
      router,
      data,
      baseUrl,
      cookies,
    } = this.props;
    // A function that routes the user to the right place
    // after login
    const onRedirectCallback = () => {
      cookies.remove('inologLang');
    };
    // console.log(this.props);
    return (
      <Auth0Provider
        domain={authConfig.domain}
        client_id={authConfig.clientId}
        redirect_uri={baseUrl}
        onRedirectCallback={onRedirectCallback}
        loginLang={router.query.lang}
      >
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
            <DataContextProvider
              innovations={data?.innovations}
              humans={data?.humans}
              about={data?.about}
            >
              <Navbar router={router} />
              <AnimatePresence initial={false}>
                <Component {...pageProps} key={router.pathname} />
              </AnimatePresence>
            </DataContextProvider>
          </Div100vh>
        </Provider>
      </Auth0Provider>
    );
  }
}

export default withRedux(initializeStore)(withCookies(MyApp));
