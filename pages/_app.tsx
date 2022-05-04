import { AppProps } from "next/app";

import "styles/globals.css";
import AppProvider from "lib/AppProvider";
import Layout from "components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
};

export default MyApp;
