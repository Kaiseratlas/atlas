import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { FocusStyleManager } from "@blueprintjs/core";
import { appWithTranslation } from "next-i18next";
import Layout from "../common/components/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "../../client";
import { wrapper } from "../common/store";

FocusStyleManager.onlyShowFocusOnTabs();

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default appWithTranslation(wrapper.withRedux(App));
