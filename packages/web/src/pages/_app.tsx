import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { FocusStyleManager } from "@blueprintjs/core";
import { appWithTranslation } from "next-i18next";
import Layout from "../common/components/Layout";

FocusStyleManager.onlyShowFocusOnTabs();

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
