import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

export const reactQueryclient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={reactQueryclient}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
