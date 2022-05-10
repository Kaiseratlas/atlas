import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AppLayout from '../components/AppLayout';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ApolloProvider>
  );
}

export default MyApp;
