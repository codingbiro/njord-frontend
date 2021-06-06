import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Routes from './Routes';
import AutoLogIn from './components/AutoLogin';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

function App() {
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

export default App;
