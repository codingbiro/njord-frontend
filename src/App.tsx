import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient, ApolloLink, ApolloProvider, InMemoryCache,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { I18nextProvider } from 'react-i18next';

import Routes from './Routes';
import AutoLogIn from './components/AutoLogin';
import i18n from './i18next';

const authRestLink = new ApolloLink((operation, forward) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  operation.setContext(({ headers }: any) => ({
    headers: {
      ...headers,
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('uToken')}`,
    },
  }));
  return forward(operation).map((result) => {
    const { restResponses } = operation.getContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authTokenResponse = restResponses.find((res: any) => res.headers.has('Authorization'));
    if (authTokenResponse) {
      localStorage.setItem('uToken', authTokenResponse.headers.get('Authorization'));
    }
    return result;
  });
});

const restLink = new RestLink({
  uri: `${process.env.REACT_APP_API_ROOT}/job/`,
});

export const createLink = () => ApolloLink.from([authRestLink, restLink]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: createLink(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Router>
            <AutoLogIn>
              <Routes />
            </AutoLogIn>
          </Router>
        </Suspense>
      </I18nextProvider>
    </ApolloProvider>
  );
}
