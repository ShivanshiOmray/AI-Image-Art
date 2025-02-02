import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import Cookies from "js-cookie";
import Head from "next/head";

import { Auth } from "../Components/index";

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(true);
  useEffect(() => {
    const storedCookiedValue = Cookies.get("token");
    if (storedCookiedValue) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);
  return (
    <>
      <Head>
        <title>AI Image ART</title>
        <meta name="description" content="AI Image Art Generator" />
        <link rel="shortcut icon" href="/assets/favicon.ico" />
      </Head>
      {auth && <Auth />}
      <Component {...pageProps} />
    </>
  );
}
