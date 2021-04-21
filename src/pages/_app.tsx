import React from "react";
import "ress";
import { AppProps } from "next/app";
import "src/styles/global.css";
import { Provider } from "react-redux";
import { store } from "src/app/store";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
