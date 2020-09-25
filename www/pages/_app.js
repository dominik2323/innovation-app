import React from 'react';
import Div100vh from 'react-div-100vh';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';

import '../scss/index.scss';

import { initializeStore } from '../store/reducer';
import { AuthProvider } from '../hocs/auth';

function MyApp({ Component, router, pageProps, store }) {
  return (
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
  );
}

export default withRedux(initializeStore)(MyApp);
