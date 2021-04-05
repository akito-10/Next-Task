import React, { useEffect } from "react";
import "ress";
import { AppProps } from "next/app";
import "src/styles/global.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return <Component {...pageProps} />;
}
