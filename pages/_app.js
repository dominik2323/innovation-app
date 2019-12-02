import React from "react";
import App from "next/app";

// redux
import withRedux from "next-redux-wrapper";
import { initializeStore } from "../store/reducer";
import { Provider } from "react-redux";

import { AnimatePresence } from "framer-motion";
import DataContextProvider from "../helpers/dataContext";

// components
import Navbar from "../components/Navbar";
import Div100vh from "react-div-100vh";

class MyApp extends App {
  render() {
    const { Component, pageProps, store, router } = this.props;
    return (
      <Provider store={store}>
        <Div100vh
          style={{
            position: "absolute",
            inset: "0 0 0 0",
            width: `100vw`,
            height: `100rvh`,
            overflow: `hidden`
          }}
        >
          <DataContextProvider
            innovations={pageProps.innovations}
            humans={pageProps.humans}
            about={pageProps.about}
          >
            <Navbar />
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
