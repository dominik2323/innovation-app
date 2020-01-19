import React from 'react';
import App from 'next/app';
import dynamic from 'next/dynamic';
import Div100vh from 'react-div-100vh';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import { initializeStore } from '../store/reducer';
import DataContextProvider from '../helpers/dataContext';
import { fetchData } from '../helpers/fetchData';

// components
// ? workaround – useRouter in Navbar component is not defined on server
const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });

class MyApp extends App {
  static async getInitialProps({ ctx }) {
    const data = await fetchData(ctx.req);
    return { data };
  }
  render() {
    const { Component, pageProps, store, router, data } = this.props;
    return (
      <Provider store={store}>
        <Div100vh
          style={{
            position: 'absolute',
            inset: '0 0 0 0',
            width: `100vw`,
            height: `100rvh`,
            overflow: `hidden`,
          }}>
          <DataContextProvider
            innovations={data.innovations}
            humans={data.humans}
            about={data.about}>
            <Navbar router={router} />
            <AnimatePresence initial={false}>
              <Component {...pageProps} key={router.pathname} />
            </AnimatePresence>
          </DataContextProvider>
        </Div100vh>
      </Provider>
    );
  }
}

export default withRedux(initializeStore)(MyApp);
