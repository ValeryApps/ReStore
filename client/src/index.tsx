import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserHistory } from 'history';
import reportWebVitals from './reportWebVitals';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { StoreProvider } from './context/StoreContext';
import { Provider } from 'react-redux';
import { store } from './store/configStore';


export const history = createBrowserHistory({ window })
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <Provider store={store} >
        {/* <BrowserRouter> */}
        <HistoryRouter history={history} >
          <App />
        </HistoryRouter>
        {/* </BrowserRouter> */}
      </Provider>

    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
