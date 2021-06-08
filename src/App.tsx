import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

import Routes from './Routes';
import AutoLogIn from './components/AutoLogin';

const restLink = new RestLink({ uri: `${process.env.REACT_APP_API_ROOT}/job/`, headers: {
  Authorization: `Bearer ${localStorage.getItem('uToken')}`
} });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: restLink,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router>
          <AutoLogIn>
            <Routes />
          </AutoLogIn>
        </Router>
      </Suspense>
    </ApolloProvider>
  );
}
