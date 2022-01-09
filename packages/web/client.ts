import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log('process.env.API_URL', process.env.NEXT_PUBLIC_API_URL)

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
});

export default client;
